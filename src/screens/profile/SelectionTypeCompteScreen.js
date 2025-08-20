/**
 * Écran de sélection du type de compte
 * 
 * Permet à l'utilisateur de choisir entre :
 * - Particulier (chercheur de bien)
 * - Professionnel (agence/démarcheur)
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button } from '../../components/ui';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';

const SelectionTypeCompteScreen = ({ navigation }) => {
  const [typeSelectionne, setTypeSelectionne] = useState(null);
  const [chargement, setChargement] = useState(false);
  const { user, mettreAJourProfil, mettreAJourProfilLocal } = useAuth();



  const typesCompte = [
    {
      id: 'particulier',
      titre: 'Particulier - Recherche',
      sousTitre: 'Je cherche un logement',
      description: 'Je suis à la recherche d\'un bien immobilier à acheter ou louer.',
      icone: '🔍',
      avantages: [
        'Recherche d\'annonces avancée',
        'Création de demandes personnalisées',
        'Notifications de correspondances',
        'Messagerie avec vendeurs',
        'Sauvegarde des favoris'
      ]
    },
    {
      id: 'mixte',
      titre: 'Particulier - Mixte',
      sousTitre: 'Je cherche ET je vends/loue',
      description: 'Je peux être à la fois acheteur et vendeur selon mes besoins.',
      icone: '🔄',
      avantages: [
        'Toutes les fonctionnalités de recherche',
        'Publication d\'annonces (jusqu\'à 5)',
        'Gestion simplifiée de vos biens',
        'Interface unique achat/vente',
        'Notifications bidirectionnelles'
      ]
    },
    {
      id: 'professionnel',
      titre: 'Professionnel',
      sousTitre: 'Je suis dans l\'immobilier',
      description: 'Agent, démarcheur ou promoteur avec un portefeuille de biens.',
      icone: '🏢',
      avantages: [
        'Publication d\'annonces illimitée',
        'Gestion de portefeuille avancée',
        'Statistiques détaillées',
        'Outils de prospection',
        'Mise en avant payante'
      ]
    }
  ];

  const selectionnerType = (type) => {
    setTypeSelectionne(type);
  };

  const continuer = async () => {
    if (!typeSelectionne) {
      Alert.alert('Sélection requise', 'Veuillez sélectionner un type de compte.');
      return;
    }

    setChargement(true);
    try {
      // Rediriger vers l'écran de profil approprié
      if (typeSelectionne === 'particulier') {
        navigation.navigate('ProfilParticulier');
      } else if (typeSelectionne === 'mixte') {
        navigation.navigate('ProfilMixte');
      } else {
        navigation.navigate('ProfilProfessionnel');
      }
    } catch (error) {
      console.error('Erreur lors de la sélection du type:', error);
      Alert.alert('Erreur', 'Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setChargement(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }} edges={['top', 'left', 'right']}>
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

        {/* Options de type de compte */}
        <View style={{ gap: 16, marginBottom: 32 }}>
          {typesCompte.map((type) => (
            <Card 
              key={type.id}
              style={{
                borderWidth: 2,
                borderColor: typeSelectionne === type.id ? COLORS.primary : COLORS.border,
                backgroundColor: typeSelectionne === type.id ? '#F0FDF4' : COLORS.background,
                padding: 20
              }}
              onPress={() => selectionnerType(type.id)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
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
                    color: COLORS.primary,
                    fontWeight: '600',
                    marginBottom: 8
                  }}>
                    {type.sousTitre}
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

              {/* Avantages */}
              <View style={{ gap: 8 }}>
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: '600', 
                  color: COLORS.text.primary,
                  marginBottom: 8
                }}>
                  Avantages inclus :
                </Text>
                {type.avantages.map((avantage, index) => (
                  <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ 
                      color: COLORS.primary, 
                      marginRight: 8,
                      fontSize: 16
                    }}>
                      ✓
                    </Text>
                    <Text style={{ 
                      fontSize: 14, 
                      color: COLORS.text.secondary,
                      flex: 1
                    }}>
                      {avantage}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>
          ))}
        </View>

        {/* Boutons d'action */}
        <View style={{ gap: 12 }}>
          <Button
            title={chargement ? "Chargement..." : "Continuer"}
            onPress={continuer}
            variant="primary"
            size="lg"
            disabled={!typeSelectionne || chargement}
          />
          
          <Button
            title={chargement ? "Création..." : "Passer pour l'instant"}
            onPress={async () => {
              setChargement(true);
              try {
                // Créer un profil minimal pour permettre l'accès à l'application
                const profilMinimal = {
                  typeUtilisateur: 'non_defini',
                  profilComplet: true,
                  profilMinimal: true,
                  derniereActivite: new Date().toISOString()
                };
                
                await mettreAJourProfil(user.uid, profilMinimal);
                
                // Mettre à jour le profil local immédiatement
                mettreAJourProfilLocal(profilMinimal);
                
                Alert.alert(
                  'Profil créé', 
                  'Vous pouvez maintenant explorer l\'application. Vous pourrez compléter votre profil plus tard.',
                  [
                    {
                      text: 'Continuer',
                      onPress: () => {
                        // Forcer la navigation vers Main
                        navigation.getParent()?.reset({
                          index: 0,
                          routes: [{ name: 'Main' }],
                        });
                      }
                    }
                  ]
                );
              } catch (error) {
                console.error('Erreur lors de la création du profil minimal:', error);
                Alert.alert('Erreur', 'Impossible de créer le profil minimal.');
              } finally {
                setChargement(false);
              }
            }}
            variant="outline"
            size="lg"
            disabled={chargement}
          />
        </View>

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
            <Text style={{ fontWeight: 'bold' }}>Note :</Text> Vous pourrez modifier votre type de compte plus tard dans les paramètres de votre profil.
          </Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectionTypeCompteScreen;
