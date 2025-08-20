/**
 * Navigateur d'Authentification - LogeVite
 * 
 * Gère la navigation entre les écrans d'authentification :
 * - Connexion
 * - Inscription
 * - Mot de passe oublié
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import InscriptionScreen from '../screens/auth/InscriptionScreen';
import MotDePasseOublieScreen from '../screens/auth/MotDePasseOublieScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Inscription" component={InscriptionScreen} />
      <Stack.Screen name="MotDePasseOublie" component={MotDePasseOublieScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
