/**
 * Écran de profil pour les particuliers
 * 
 * Formulaire de création/complétion du profil utilisateur
 * pour les utilisateurs de type "particulier"
 */

import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, Button, Input } from '../../components/ui';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';

const ProfilParticulierScreen = ({ navigation }) => {
  const { user, mettreAJourProfil } = useAuth();
  const [chargement, setChargement] = useState(false);
  
  // État du formulaire
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    dateNaissance: '',
    profession: '',
    biographie: '',
    localisation: {
      ville: '',
      quartier: '',
      commune: ''
    },
    preferences: {
      typeBien: [],
      budgetMin: '',
      budgetMax: '',
      surfaceMin: '',
      surfaceMax: '',
      nombreChambres: '',
      notifications: {
        correspondances: true,
        nouvellesAnnonces: true,
        messages: true,
        marketing: false
      }
    }
  });

  // Types de biens disponibles
  const typesBiens = useMemo(() => [
    { id: 'appartement', label: 'Appartement' },
    { id: 'maison', label: 'Maison' },
    { id: 'villa', label: 'Villa' },
    { id: 'studio', label: 'Studio' },
    { id: 'terrain', label: 'Terrain' },
    { id: 'bureau', label: 'Bureau/Commerce' }
  ], []);

  // Villes de Guinée
  const villes = useMemo(() => [
    'Conakry', 'Kankan', 'Labé', 'N\'Zérékoré', 'Kindia', 
    'Kissidougou', 'Faranah', 'Boké', 'Mamou', 'Siguiri'
  ], []);

  // Communes de Conakry
  const communesConakry = useMemo(() => [
    'Kaloum', 'Dixinn', 'Ratoma', 'Matam', 'Matoto'
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

  const validerFormulaire = () => {
    const erreurs = [];

    if (!formData.prenom.trim()) erreurs.push('Le prénom est requis');
    if (!formData.nom.trim()) erreurs.push('Le nom est requis');
    if (!formData.telephone.trim()) erreurs.push('Le téléphone est requis');
    if (!formData.localisation.ville) erreurs.push('La ville est requise');
    if ((formData.preferences?.typeBien || []).length === 0) erreurs.push('Sélectionnez au moins un type de bien');

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
        typeUtilisateur: 'particulier',
        ...formData,
        derniereActivite: new Date().toISOString()
      };

      await mettreAJourProfil(user.uid, donneesProfil);
      
             Alert.alert(
         'Profil créé !', 
         'Votre profil a été créé avec succès. Vous pouvez maintenant commencer à utiliser l\'application.',
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
              Votre profil
            </Text>
            <Text style={{ 
              fontSize: 16, 
              color: COLORS.text.secondary,
              lineHeight: 24
            }}>
              Complétez votre profil pour personnaliser votre expérience
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
              📋 Informations personnelles
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
                label="Profession"
                value={formData.profession}
                onChangeText={(text) => updateFormData('profession', text)}
                placeholder="Votre profession"
              />
              
              <Input
                label="Biographie"
                value={formData.biographie}
                onChangeText={(text) => updateFormData('biographie', text)}
                placeholder="Parlez-nous de vous..."
                multiline
                numberOfLines={3}
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
                // TODO: Implémenter un picker pour les villes
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

          {/* Préférences de recherche */}
          <Card style={{ marginBottom: 20 }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: COLORS.text.primary,
              marginBottom: 16
            }}>
              🏠 Préférences de recherche
            </Text>
            
            {/* Types de biens */}
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

            {/* Budget */}
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

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <Input
                    label="Surface minimum (m²)"
                    value={formData.preferences.surfaceMin}
                    onChangeText={(text) => updatePreferences('surfaceMin', text)}
                    placeholder="0"
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    label="Surface maximum (m²)"
                    value={formData.preferences.surfaceMax}
                    onChangeText={(text) => updatePreferences('surfaceMax', text)}
                    placeholder="Illimité"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <Input
                label="Nombre de chambres souhaité"
                value={formData.preferences.nombreChambres}
                onChangeText={(text) => updatePreferences('nombreChambres', text)}
                placeholder="Ex: 2, 3+"
              />
            </View>
          </Card>

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
            backgroundColor: '#DBEAFE', 
            borderRadius: 12,
            borderLeftWidth: 4,
            borderLeftColor: COLORS.accent
          }}>
            <Text style={{ 
              fontSize: 14, 
              color: '#1E40AF',
              lineHeight: 20
            }}>
              <Text style={{ fontWeight: 'bold' }}>Conseil :</Text> Plus votre profil est complet, plus nos suggestions d'annonces seront pertinentes pour vous.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfilParticulierScreen;
