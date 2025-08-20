/**
 * Écran de profil pour les professionnels
 * 
 * Formulaire de création/complétion du profil utilisateur
 * pour les utilisateurs de type "professionnel" (agences, démarcheurs)
 */

import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, Button, Input } from '../../components/ui';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';

const ProfilProfessionnelScreen = ({ navigation }) => {
  const { user, mettreAJourProfil } = useAuth();
  const [chargement, setChargement] = useState(false);
  
  // État du formulaire
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    typeProfessionnel: '',
    nomEntreprise: '',
    descriptionEntreprise: '',
    adresseEntreprise: '',
    localisation: {
      ville: '',
      quartier: '',
      commune: ''
    },
    informations: {
      dateCreation: '',
      nombreEmployes: '',
      specialites: [],
      certifications: [],
      siteWeb: '',
      reseauxSociaux: {
        facebook: '',
        whatsapp: '',
        telegram: ''
      }
    },
    services: {
      vente: false,
      location: false,
      gestion: false,
      expertise: false
    },
    preferences: {
      notifications: {
        nouvellesDemandes: true,
        messages: true,
        statistiques: true,
        marketing: false
      }
    }
  });

  // Types de professionnels
  const typesProfessionnels = useMemo(() => [
    { id: 'agence', label: 'Agence Immobilière' },
    { id: 'demarcheur', label: 'Démarcheur Indépendant' },
    { id: 'promoteur', label: 'Promoteur Immobilier' },
    { id: 'expert', label: 'Expert Immobilier' },
    { id: 'gestionnaire', label: 'Gestionnaire de Biens' }
  ], []);

  // Spécialités disponibles
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

  const updateInformations = (field, value) => {
    setFormData(prev => ({
      ...prev,
      informations: {
        ...(prev?.informations || {}),
        [field]: value
      }
    }));
  };

  const updateReseauxSociaux = (reseau, value) => {
    setFormData(prev => ({
      ...prev,
      informations: {
        ...(prev?.informations || {}),
        reseauxSociaux: {
          ...(prev?.informations?.reseauxSociaux || {}),
          [reseau]: value
        }
      }
    }));
  };

  const toggleSpecialite = (specialiteId) => {
    setFormData(prev => ({
      ...prev,
      informations: {
        ...(prev?.informations || {}),
        specialites: (prev?.informations?.specialites || []).includes(specialiteId)
          ? (prev?.informations?.specialites || []).filter(id => id !== specialiteId)
          : [...(prev?.informations?.specialites || []), specialiteId]
      }
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
    if (!formData.typeProfessionnel) erreurs.push('Le type de professionnel est requis');
    if (!formData.nomEntreprise.trim()) erreurs.push('Le nom de l\'entreprise est requis');
    if (!formData.localisation.ville) erreurs.push('La ville est requise');
    if ((formData.informations?.specialites || []).length === 0) erreurs.push('Sélectionnez au moins une spécialité');

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
        typeUtilisateur: 'professionnel',
        ...formData,
        derniereActivite: new Date().toISOString()
      };

      await mettreAJourProfil(user.uid, donneesProfil);
      
             Alert.alert(
         'Profil créé !', 
         'Votre profil professionnel a été créé avec succès. Vous pouvez maintenant publier vos annonces.',
         [
           {
             text: 'Commencer',
             onPress: () => navigation.reset({
               index: 0,
               routes: [{ name: 'Main' }],
             })
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
              Profil Professionnel
            </Text>
            <Text style={{ 
              fontSize: 16, 
              color: COLORS.text.secondary,
              lineHeight: 24
            }}>
              Créez votre profil professionnel pour commencer à publier vos annonces
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
              
              <Input
                label="Email professionnel"
                value={formData.email}
                onChangeText={(text) => updateFormData('email', text)}
                placeholder="contact@votreentreprise.com"
                keyboardType="email-address"
              />
            </View>
          </Card>

          {/* Informations professionnelles */}
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
              {/* Type de professionnel */}
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
              
              <Input
                label="Adresse de l'entreprise"
                value={formData.adresseEntreprise}
                onChangeText={(text) => updateFormData('adresseEntreprise', text)}
                placeholder="Adresse complète"
              />
            </View>
          </Card>

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

          {/* Spécialités */}
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
                    variant={formData.informations.specialites.includes(specialite.id) ? 'primary' : 'outline'}
                    size="sm"
                  />
                ))}
              </View>
            </View>

            {/* Services proposés */}
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

          {/* Informations complémentaires */}
          <Card style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: COLORS.text.primary,
              marginBottom: 16
            }}>
              ℹ️ Informations complémentaires
            </Text>
            
            <View style={{ gap: 16 }}>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <Input
                    label="Date de création"
                    value={formData.informations.dateCreation}
                    onChangeText={(text) => updateInformations('dateCreation', text)}
                    placeholder="Année de création"
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    label="Nombre d'employés"
                    value={formData.informations.nombreEmployes}
                    onChangeText={(text) => updateInformations('nombreEmployes', text)}
                    placeholder="Ex: 5, 10+"
                  />
                </View>
              </View>

              <Input
                label="Site web"
                value={formData.informations.siteWeb}
                onChangeText={(text) => updateInformations('siteWeb', text)}
                placeholder="https://votre-site.com"
                keyboardType="url"
              />
            </View>
          </Card>

          {/* Réseaux sociaux */}
          <Card style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: COLORS.text.primary,
              marginBottom: 16
            }}>
              📱 Réseaux sociaux
            </Text>
            
            <View style={{ gap: 16 }}>
              <Input
                label="Page Facebook"
                value={formData.informations.reseauxSociaux.facebook}
                onChangeText={(text) => updateReseauxSociaux('facebook', text)}
                placeholder="Lien vers votre page Facebook"
              />
              
              <Input
                label="WhatsApp"
                value={formData.informations.reseauxSociaux.whatsapp}
                onChangeText={(text) => updateReseauxSociaux('whatsapp', text)}
                placeholder="Numéro WhatsApp"
                keyboardType="phone-pad"
              />
              
              <Input
                label="Telegram"
                value={formData.informations.reseauxSociaux.telegram}
                onChangeText={(text) => updateReseauxSociaux('telegram', text)}
                placeholder="Nom d'utilisateur Telegram"
              />
            </View>
          </Card>

          {/* Bouton de sauvegarde */}
          <Button
            title={chargement ? "Sauvegarde..." : "Créer mon profil professionnel"}
            onPress={sauvegarderProfil}
            variant="primary"
            size="lg"
            disabled={chargement}
          />

          {/* Note informative */}
          <View style={{ 
            marginTop: 24, 
            padding: 16, 
            backgroundColor: '#FEF3C7', 
            borderRadius: 12,
            borderLeftWidth: 4,
            borderLeftColor: COLORS.secondary
          }}>
            <Text style={{ 
              fontSize: 14, 
              color: '#92400E',
              lineHeight: 20
            }}>
              <Text style={{ fontWeight: 'bold' }}>Important :</Text> Votre profil sera vérifié par notre équipe avant activation complète. Cela peut prendre 24-48h.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfilProfessionnelScreen;
