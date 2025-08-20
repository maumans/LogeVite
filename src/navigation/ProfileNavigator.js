/**
 * Navigateur pour les écrans de profil utilisateur
 * 
 * Gère la navigation entre les différents écrans de profil :
 * - Sélection du type de compte
 * - Profil particulier
 * - Profil professionnel
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SelectionTypeCompteScreen from '../screens/profile/SelectionTypeCompteScreen';
import ProfilParticulierScreen from '../screens/profile/ProfilParticulierScreen';
import ProfilProfessionnelScreen from '../screens/profile/ProfilProfessionnelScreen';
import ProfilMixteScreen from '../screens/profile/ProfilMixteScreen';
import EditionProfilScreen from '../screens/profile/EditionProfilScreen';

const Stack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SelectionTypeCompte"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#10B981',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="SelectionTypeCompte"
        component={SelectionTypeCompteScreen}
        options={{
          title: 'Type de Compte',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfilParticulier"
        component={ProfilParticulierScreen}
        options={{
          title: 'Profil Particulier',
        }}
      />
      <Stack.Screen
        name="ProfilProfessionnel"
        component={ProfilProfessionnelScreen}
        options={{
          title: 'Profil Professionnel',
        }}
      />
      <Stack.Screen
        name="ProfilMixte"
        component={ProfilMixteScreen}
        options={{
          title: 'Profil Mixte',
        }}
      />
      <Stack.Screen
        name="EditionProfil"
        component={EditionProfilScreen}
        options={{
          title: 'Éditer le profil',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
