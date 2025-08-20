/**
 * Écran de profil pour utilisateur Mixte
 * 
 * Permet de créer un profil qui combine recherche et publication d'annonces
 * Idéal pour les particuliers qui peuvent être acheteurs ET vendeurs
 */

import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, Input } from '../../components/ui';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';

const ProfilMixteScreen = ({ navigation }) => {
  const { user, mettreAJourProfil } = useAuth();
  const [chargement, setChargement] = useState(false);

  // État du formulaire
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    email: user?.email || '',
    localisation: {
      ville: '',
      quartier: '',
      commune: ''
    },
    // Préférences de recherche
    preferences: {
      typeBien: [],
      budgetMin: '',
      budgetMax: '',
      surfaceMin: '',
      surfaceMax: '',
      nombreChambres: ''
    },
    // Informations pour la vente/location
    experienceVente: false,
    typesBiensAVendre: [],
    // Notifications
    notifications: {
      nouvelles_annonces: true,
      correspondances: true,
      messages: true,
      annonces_similaires: false
    }
  });

  // Types de biens
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

  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const updateLocalisation = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      localisation: {
        ...(prev?.localisation || {}),
        [field]: value
      }
    }));
  }, []);

  const updatePreferences = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...(prev?.preferences || {}),
        [field]: value
      }
    }));
  }, []);

  const toggleTypeBien = useCallback((typeId, isForSale = false) => {
    const field = isForSale ? 'typesBiensAVendre' : 'typeBien';
    const targetField = isForSale ? (formData.typesBiensAVendre || []) : (formData.preferences?.typeBien || []);
    
    if (isForSale) {
      setFormData(prev => ({
        ...prev,
        typesBiensAVendre: targetField.includes(typeId)
          ? targetField.filter(id => id !== typeId)
          : [...targetField, typeId]
      }));
    } else {
      updatePreferences('typeBien', 
        targetField.includes(typeId)
          ? targetField.filter(id => id !== typeId)
          : [...targetField, typeId]
      );
    }
  }, [formData.typesBiensAVendre, formData.preferences?.typeBien, updatePreferences]);

  const validerFormulaire = useCallback(() => {
    const erreurs = [];

    if (!formData.prenom.trim()) erreurs.push('Le prénom est requis');
    if (!formData.nom.trim()) erreurs.push('Le nom est requis');
    if (!formData.telephone.trim()) erreurs.push('Le téléphone est requis');
    if (!formData.localisation.ville) erreurs.push('La ville est requise');

    // Au moins une préférence de recherche OU une intention de vente
    if ((formData.preferences?.typeBien || []).length === 0 && (formData.typesBiensAVendre || []).length === 0) {
      erreurs.push('Sélectionnez au moins un type de bien recherché ou à vendre');
    }

    if (erreurs.length > 0) {
      Alert.alert('Champs manquants', erreurs.join('\n'));
      return false;
    }

    return true;
  }, [formData]);

  const sauvegarderProfil = useCallback(async () => {
    if (!validerFormulaire()) return;

    setChargement(true);
    try {
      const donneesProfil = {
        typeUtilisateur: 'mixte',
        ...formData,
        derniereActivite: new Date().toISOString(),
        profilComplet: true,
        // Limites pour compte mixte
        limiteAnnonces: 5,
        // Capacités
        peutRechercher: true,
        peutPublier: true
      };

      await mettreAJourProfil(user.uid, donneesProfil);
      
      Alert.alert(
        'Profil créé !', 
        'Votre profil mixte a été créé avec succès. Vous pouvez maintenant rechercher et publier des annonces !',
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
  }, [formData, user.uid, mettreAJourProfil, navigation, validerFormulaire]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: 16, paddingTop: 20, paddingBottom: 40 }}>
            {/* En-tête */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ 
                fontSize: 28, 
                fontWeight: 'bold', 
                color: COLORS.text.primary,
                marginBottom: 8
              }}>
                Profil Mixte 🔄
              </Text>
              <Text style={{ 
                fontSize: 16, 
                color: COLORS.text.secondary,
                lineHeight: 24
              }}>
                Créez votre profil pour rechercher ET publier des annonces immobilières
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
                  label="Email"
                  value={formData.email}
                  onChangeText={(text) => updateFormData('email', text)}
                  placeholder="votre.email@exemple.com"
                  keyboardType="email-address"
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

            {/* Préférences de recherche */}
            <Card style={{ marginBottom: 20 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: 'bold', 
                color: COLORS.text.primary,
                marginBottom: 16
              }}>
                🔍 Ce que vous recherchez
              </Text>
              
              <View style={{ marginBottom: 16 }}>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '600', 
                  color: COLORS.text.primary,
                  marginBottom: 12
                }}>
                  Types de biens recherchés
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {typesBiens.map((type) => (
                    <Button
                      key={type.id}
                      title={type.label}
                      onPress={() => toggleTypeBien(type.id, false)}
                      variant={(formData.preferences?.typeBien || []).includes(type.id) ? 'primary' : 'outline'}
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

            {/* Biens à vendre/louer */}
            <Card style={{ marginBottom: 20 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: 'bold', 
                color: COLORS.text.primary,
                marginBottom: 16
              }}>
                🏠 Ce que vous pourriez vendre/louer
              </Text>
              
              <Text style={{ 
                fontSize: 14, 
                color: COLORS.text.secondary,
                marginBottom: 16,
                lineHeight: 20
              }}>
                Sélectionnez les types de biens que vous pourriez avoir à proposer (optionnel)
              </Text>
              
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {typesBiens.map((type) => (
                  <Button
                    key={`sale-${type.id}`}
                    title={type.label}
                    onPress={() => toggleTypeBien(type.id, true)}
                                         variant={(formData.typesBiensAVendre || []).includes(type.id) ? 'secondary' : 'outline'}
                    size="sm"
                  />
                ))}
              </View>
            </Card>

            {/* Bouton de sauvegarde */}
            <Button
              title={chargement ? "Sauvegarde..." : "Créer mon profil mixte"}
              onPress={sauvegarderProfil}
              variant="primary"
              size="lg"
              disabled={chargement}
            />

            {/* Note informative */}
            <View style={{ 
              marginTop: 24, 
              padding: 16, 
              backgroundColor: '#F0F9FF', 
              borderRadius: 12,
              borderLeftWidth: 4,
              borderLeftColor: COLORS.accent
            }}>
              <Text style={{ 
                fontSize: 14, 
                color: '#0C4A6E',
                lineHeight: 20
              }}>
                <Text style={{ fontWeight: 'bold' }}>Profil Mixte :</Text> 
                {' '}Vous pourrez rechercher des biens ET publier jusqu'à 5 annonces personnelles. 
                Idéal si vous cherchez un logement tout en ayant parfois des biens à proposer.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfilMixteScreen;
