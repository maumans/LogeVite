/**
 * Écran unifié de création de profil
 * 
 * S'affiche automatiquement après l'inscription pour compléter le profil
 * Gère à la fois les particuliers et professionnels
 */

import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, Button, Input } from '../../components/ui';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';

const CreationProfilScreen = ({ navigation, route }) => {
  const { user, mettreAJourProfil } = useAuth();
  const [chargement, setChargement] = useState(false);
  const [typeCompte, setTypeCompte] = useState(route.params?.typeCompte || null);
  
  // État du formulaire
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    email: user?.email || '',
    // Champs professionnels (optionnels selon le type)
    typeProfessionnel: '',
    nomEntreprise: '',
    descriptionEntreprise: '',
    adresseEntreprise: '',
    localisation: {
      ville: '',
      quartier: '',
      commune: ''
    },
    // Préférences (pour particuliers)
    preferences: {
      typeBien: [],
      budgetMin: '',
      budgetMax: '',
      surfaceMin: '',
      surfaceMax: '',
      nombreChambres: ''
    },
    // Spécialités (pour professionnels)
    specialites: [],
    services: {
      vente: false,
      location: false,
      gestion: false,
      expertise: false
    }
  });

  // Types de compte
  const typesCompte = useMemo(() => [
    {
      id: 'particulier',
      titre: 'Particulier',
      description: 'Je cherche à acheter, louer ou vendre',
      icone: '👤'
    },
    {
      id: 'professionnel',
      titre: 'Professionnel',
      description: 'Je suis agence, démarcheur ou promoteur',
      icone: '🏢'
    }
  ], []);

  // Types de biens (pour particuliers)
  const typesBiens = useMemo(() => [
    { id: 'appartement', label: 'Appartement' },
    { id: 'maison', label: 'Maison' },
    { id: 'villa', label: 'Villa' },
    { id: 'studio', label: 'Studio' },
    { id: 'terrain', label: 'Terrain' },
    { id: 'bureau', label: 'Bureau/Commerce' }
  ], []);

  // Types de professionnels
  const typesProfessionnels = useMemo(() => [
    { id: 'agence', label: 'Agence Immobilière' },
    { id: 'demarcheur', label: 'Démarcheur Indépendant' },
    { id: 'promoteur', label: 'Promoteur Immobilier' },
    { id: 'expert', label: 'Expert Immobilier' },
    { id: 'gestionnaire', label: 'Gestionnaire de Biens' }
  ], []);

  // Spécialités (pour professionnels)
  const specialites = useMemo(() => [
    { id: 'residentiel', label: 'Résidentiel' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'terrain', label: 'Terrains' },
    { id: 'luxe', label: 'Luxe/Haut de gamme' },
    { id: 'investissement', label: 'Investissement' },
    { id: 'nouveaute', label: 'Nouveautés' }
  ], []);

  // Villes de Guinée
  const villes = useMemo(() => [
    'Conakry', 'Kankan', 'Labé', 'N\'Zérékoré', 'Kindia', 
    'Kissidougou', 'Faranah', 'Boké', 'Mamou', 'Siguiri'
  ], []);

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateLocalisation = (field, value) => {
    setFormData(prev => ({
      ...prev,
      localisation: {
        ...(prev?.localisation || {}),
        [field]: value
      }
    }));
  };

  const updatePreferences = (field, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...(prev?.preferences || {}),
        [field]: value
      }
    }));
  };

  const toggleTypeBien = (typeId) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...(prev?.preferences || {}),
        typeBien: (prev?.preferences?.typeBien || []).includes(typeId)
          ? (prev?.preferences?.typeBien || []).filter(id => id !== typeId)
          : [...(prev?.preferences?.typeBien || []), typeId]
      }
    }));
  };

  const toggleSpecialite = (specialiteId) => {
    setFormData(prev => ({
      ...prev,
      specialites: (prev?.specialites || []).includes(specialiteId)
        ? (prev?.specialites || []).filter(id => id !== specialiteId)
        : [...(prev?.specialites || []), specialiteId]
    }));
  };

  const toggleService = (service) => {
    setFormData(prev => ({
      ...prev,
      services: {
        ...(prev?.services || {}),
        [service]: !(prev?.services?.[service] || false)
      }
    }));
  };

  const validerFormulaire = () => {
    const erreurs = [];

    if (!formData.prenom.trim()) erreurs.push('Le prénom est requis');
    if (!formData.nom.trim()) erreurs.push('Le nom est requis');
    if (!formData.telephone.trim()) erreurs.push('Le téléphone est requis');
    if (!formData.localisation.ville) erreurs.push('La ville est requise');

    if (typeCompte === 'particulier') {
      if ((formData.preferences?.typeBien || []).length === 0) {
        erreurs.push('Sélectionnez au moins un type de bien');
      }
    } else if (typeCompte === 'professionnel') {
      if (!formData.typeProfessionnel) erreurs.push('Le type de professionnel est requis');
      if (!formData.nomEntreprise.trim()) erreurs.push('Le nom de l\'entreprise est requis');
      if (formData.specialites.length === 0) erreurs.push('Sélectionnez au moins une spécialité');
    }

    if (erreurs.length > 0) {
      Alert.alert('Champs manquants', erreurs.join('\n'));
      return false;
    }

    return true;
  };

  const sauvegarderProfil = async () => {
    if (!validerFormulaire()) return;

    setChargement(true);
    try {
      const donneesProfil = {
        typeUtilisateur: typeCompte,
        ...formData,
        derniereActivite: new Date().toISOString(),
        profilComplet: true
      };

      await mettreAJourProfil(user.uid, donneesProfil);
      
      Alert.alert(
        'Profil créé !', 
        'Votre profil a été créé avec succès. Bienvenue sur LogeVite !',
        [
          {
            text: 'Commencer',
            onPress: () => navigation.navigate('Home')
          }
        ]
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du profil:', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la sauvegarde du profil.');
    } finally {
      setChargement(false);
    }
  };

  // Si le type de compte n'est pas encore sélectionné
  if (!typeCompte) {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View style={{ padding: 16 }}>
          <View style={{ marginBottom: 24 }}>
            <Text style={{ 
              fontSize: 28, 
              fontWeight: 'bold', 
              color: COLORS.text.primary,
              marginBottom: 8
            }}>
              Choisissez votre profil
            </Text>
            <Text style={{ 
              fontSize: 16, 
              color: COLORS.text.secondary,
              lineHeight: 24
            }}>
              Sélectionnez le type de compte qui correspond le mieux à vos besoins
            </Text>
          </View>

          <View style={{ gap: 16, marginBottom: 32 }}>
            {typesCompte.map((type) => (
              <Card 
                key={type.id}
                style={{
                  borderWidth: 2,
                  borderColor: typeCompte === type.id ? COLORS.primary : COLORS.border,
                  backgroundColor: typeCompte === type.id ? '#F0FDF4' : COLORS.background,
                  padding: 20
                }}
                onPress={() => setTypeCompte(type.id)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 32, marginRight: 16 }}>
                    {type.icone}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ 
                      fontSize: 20, 
                      fontWeight: 'bold', 
                      color: COLORS.text.primary,
                      marginBottom: 4
                    }}>
                      {type.titre}
                    </Text>
                    <Text style={{ 
                      fontSize: 14, 
                      color: COLORS.text.secondary,
                      lineHeight: 20
                    }}>
                      {type.description}
                    </Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View style={{ padding: 16 }}>
          {/* En-tête */}
          <View style={{ marginBottom: 24 }}>
            <Text style={{ 
              fontSize: 28, 
              fontWeight: 'bold', 
              color: COLORS.text.primary,
              marginBottom: 8
            }}>
              {typeCompte === 'particulier' ? 'Votre profil' : 'Profil Professionnel'}
            </Text>
            <Text style={{ 
              fontSize: 16, 
              color: COLORS.text.secondary,
              lineHeight: 24
            }}>
              {typeCompte === 'particulier' 
                ? 'Complétez votre profil pour personnaliser votre expérience'
                : 'Créez votre profil professionnel pour commencer à publier vos annonces'
              }
            </Text>
          </View>

          {/* Informations personnelles */}
          <Card style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: COLORS.text.primary,
              marginBottom: 16
            }}>
              👤 Informations personnelles
            </Text>
            
            <View style={{ gap: 16 }}>
              <Input
                label="Prénom *"
                value={formData.prenom}
                onChangeText={(text) => updateFormData('prenom', text)}
                placeholder="Votre prénom"
              />
              
              <Input
                label="Nom *"
                value={formData.nom}
                onChangeText={(text) => updateFormData('nom', text)}
                placeholder="Votre nom"
              />
              
              <Input
                label="Téléphone *"
                value={formData.telephone}
                onChangeText={(text) => updateFormData('telephone', text)}
                placeholder="+224 XXX XXX XXX"
                keyboardType="phone-pad"
              />
              
              {typeCompte === 'professionnel' && (
                <Input
                  label="Email professionnel"
                  value={formData.email}
                  onChangeText={(text) => updateFormData('email', text)}
                  placeholder="contact@votreentreprise.com"
                  keyboardType="email-address"
                />
              )}
            </View>
          </Card>

          {/* Informations professionnelles (si professionnel) */}
          {typeCompte === 'professionnel' && (
            <Card style={{ marginBottom: 20 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: 'bold', 
                color: COLORS.text.primary,
                marginBottom: 16
              }}>
                🏢 Informations professionnelles
              </Text>
              
              <View style={{ gap: 16 }}>
                <View>
                  <Text style={{ 
                    fontSize: 16, 
                    fontWeight: '600', 
                    color: COLORS.text.primary,
                    marginBottom: 12
                  }}>
                    Type de professionnel *
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {typesProfessionnels.map((type) => (
                      <Button
                        key={type.id}
                        title={type.label}
                        onPress={() => updateFormData('typeProfessionnel', type.id)}
                        variant={formData.typeProfessionnel === type.id ? 'primary' : 'outline'}
                        size="sm"
                      />
                    ))}
                  </View>
                </View>

                <Input
                  label="Nom de l'entreprise *"
                  value={formData.nomEntreprise}
                  onChangeText={(text) => updateFormData('nomEntreprise', text)}
                  placeholder="Nom de votre agence ou entreprise"
                />
                
                <Input
                  label="Description de l'entreprise"
                  value={formData.descriptionEntreprise}
                  onChangeText={(text) => updateFormData('descriptionEntreprise', text)}
                  placeholder="Présentez votre entreprise..."
                  multiline
                  numberOfLines={3}
                />
              </View>
            </Card>
          )}

          {/* Localisation */}
          <Card style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: COLORS.text.primary,
              marginBottom: 16
            }}>
              📍 Localisation
            </Text>
            
            <View style={{ gap: 16 }}>
              <Input
                label="Ville *"
                value={formData.localisation.ville}
                onChangeText={(text) => updateLocalisation('ville', text)}
                placeholder="Sélectionnez votre ville"
              />
              
              {formData.localisation.ville === 'Conakry' && (
                <Input
                  label="Commune"
                  value={formData.localisation.commune}
                  onChangeText={(text) => updateLocalisation('commune', text)}
                  placeholder="Sélectionnez votre commune"
                />
              )}
              
              <Input
                label="Quartier"
                value={formData.localisation.quartier}
                onChangeText={(text) => updateLocalisation('quartier', text)}
                placeholder="Votre quartier"
              />
            </View>
          </Card>

          {/* Préférences (pour particuliers) */}
          {typeCompte === 'particulier' && (
            <Card style={{ marginBottom: 20 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: 'bold', 
                color: COLORS.text.primary,
                marginBottom: 16
              }}>
                🏠 Préférences de recherche
              </Text>
              
              <View style={{ marginBottom: 16 }}>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '600', 
                  color: COLORS.text.primary,
                  marginBottom: 12
                }}>
                  Types de biens recherchés *
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {typesBiens.map((type) => (
                    <Button
                      key={type.id}
                      title={type.label}
                      onPress={() => toggleTypeBien(type.id)}
                      variant={formData.preferences.typeBien.includes(type.id) ? 'primary' : 'outline'}
                      size="sm"
                    />
                  ))}
                </View>
              </View>

              <View style={{ gap: 16 }}>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Input
                      label="Budget minimum (GNF)"
                      value={formData.preferences.budgetMin}
                      onChangeText={(text) => updatePreferences('budgetMin', text)}
                      placeholder="0"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Input
                      label="Budget maximum (GNF)"
                      value={formData.preferences.budgetMax}
                      onChangeText={(text) => updatePreferences('budgetMax', text)}
                      placeholder="Illimité"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>
            </Card>
          )}

          {/* Spécialités (pour professionnels) */}
          {typeCompte === 'professionnel' && (
            <Card style={{ marginBottom: 20 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: 'bold', 
                color: COLORS.text.primary,
                marginBottom: 16
              }}>
                🎯 Spécialités
              </Text>
              
              <View style={{ marginBottom: 16 }}>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '600', 
                  color: COLORS.text.primary,
                  marginBottom: 12
                }}>
                  Vos spécialités *
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {specialites.map((specialite) => (
                    <Button
                      key={specialite.id}
                      title={specialite.label}
                      onPress={() => toggleSpecialite(specialite.id)}
                      variant={formData.specialites.includes(specialite.id) ? 'primary' : 'outline'}
                      size="sm"
                    />
                  ))}
                </View>
              </View>

              <View>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '600', 
                  color: COLORS.text.primary,
                  marginBottom: 12
                }}>
                  Services proposés
                </Text>
                <View style={{ gap: 8 }}>
                  {Object.entries(formData.services).map(([service, actif]) => (
                    <Button
                      key={service}
                      title={service.charAt(0).toUpperCase() + service.slice(1)}
                      onPress={() => toggleService(service)}
                      variant={actif ? 'primary' : 'outline'}
                      size="sm"
                    />
                  ))}
                </View>
              </View>
            </Card>
          )}

          {/* Bouton de sauvegarde */}
          <Button
            title={chargement ? "Sauvegarde..." : "Créer mon profil"}
            onPress={sauvegarderProfil}
            variant="primary"
            size="lg"
            disabled={chargement}
          />

          {/* Note informative */}
          <View style={{ 
            marginTop: 24, 
            padding: 16, 
            backgroundColor: typeCompte === 'particulier' ? '#DBEAFE' : '#FEF3C7', 
            borderRadius: 12,
            borderLeftWidth: 4,
            borderLeftColor: typeCompte === 'particulier' ? COLORS.accent : COLORS.secondary
          }}>
            <Text style={{ 
              fontSize: 14, 
              color: typeCompte === 'particulier' ? '#1E40AF' : '#92400E',
              lineHeight: 20
            }}>
              <Text style={{ fontWeight: 'bold' }}>
                {typeCompte === 'particulier' ? 'Conseil :' : 'Important :'}
              </Text> 
              {typeCompte === 'particulier' 
                ? ' Plus votre profil est complet, plus nos suggestions d\'annonces seront pertinentes pour vous.'
                : ' Votre profil sera vérifié par notre équipe avant activation complète. Cela peut prendre 24-48h.'
              }
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreationProfilScreen;
