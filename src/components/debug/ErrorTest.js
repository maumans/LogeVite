/**
 * Composant de test pour le gestionnaire d'erreurs Firebase
 * 
 * Permet de tester différents types d'erreurs Firebase
 * et de vérifier l'affichage des messages d'erreur
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { Button, Card, ErrorDisplay } from '../ui';
import { COLORS } from '../../constants/colors';
import { handleFirebaseError } from '../../utils/errorHandler';

const ErrorTest = () => {
  const [currentError, setCurrentError] = useState(null);

  // Simuler différentes erreurs Firebase
  const simulateError = (errorCode) => {
    const error = new Error('Erreur Firebase simulée');
    error.code = errorCode;
    
    const errorInfo = handleFirebaseError(error, 'login');
    setCurrentError(errorInfo);
    
    console.log(`Erreur simulée ${errorCode}:`, errorInfo);
  };

  const testErrors = [
    {
      code: 'auth/invalid-credential',
      label: 'Identifiants invalides',
      description: 'Email ou mot de passe incorrect'
    },
    {
      code: 'auth/user-not-found',
      label: 'Utilisateur non trouvé',
      description: 'Aucun compte avec cet email'
    },
    {
      code: 'auth/wrong-password',
      label: 'Mot de passe incorrect',
      description: 'Mot de passe erroné'
    },
    {
      code: 'auth/email-already-in-use',
      label: 'Email déjà utilisé',
      description: 'Compte existant avec cet email'
    },
    {
      code: 'auth/weak-password',
      label: 'Mot de passe faible',
      description: 'Mot de passe trop simple'
    },
    {
      code: 'auth/too-many-requests',
      label: 'Trop de tentatives',
      description: 'Limite de tentatives dépassée'
    },
    {
      code: 'auth/network-request-failed',
      label: 'Erreur réseau',
      description: 'Problème de connexion'
    }
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background.secondary,
    },
    content: {
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.text.primary,
      marginBottom: 20,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: COLORS.text.secondary,
      marginBottom: 30,
      textAlign: 'center',
    },
    errorCard: {
      marginBottom: 20,
    },
    errorButton: {
      backgroundColor: COLORS.primary[500],
      padding: 12,
      borderRadius: 8,
      marginBottom: 8,
    },
    errorButtonText: {
      color: 'white',
      fontWeight: '600',
      textAlign: 'center',
    },
    errorDescription: {
      fontSize: 12,
      color: COLORS.text.secondary,
      textAlign: 'center',
      marginBottom: 8,
    },
    clearButton: {
      backgroundColor: COLORS.error[500],
      padding: 12,
      borderRadius: 8,
      marginTop: 20,
    },
    clearButtonText: {
      color: 'white',
      fontWeight: '600',
      textAlign: 'center',
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🧪 Test Gestionnaire d'Erreurs</Text>
        <Text style={styles.subtitle}>
          Testez différents types d'erreurs Firebase
        </Text>

        {/* Affichage de l'erreur actuelle */}
        {currentError && (
          <Card style={styles.errorCard}>
            <Text style={[styles.subtitle, { marginBottom: 16 }]}>
              Erreur actuelle :
            </Text>
            <ErrorDisplay
              error={currentError}
              onRetry={() => setCurrentError(null)}
              onDismiss={() => setCurrentError(null)}
            />
          </Card>
        )}

        {/* Boutons de test */}
        <Card>
          <Text style={[styles.subtitle, { marginBottom: 20, textAlign: 'left' }]}>
            Cliquez sur une erreur pour la tester :
          </Text>
          
          {testErrors.map((testError, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
              <TouchableOpacity
                style={styles.errorButton}
                onPress={() => simulateError(testError.code)}
              >
                <Text style={styles.errorButtonText}>
                  {testError.label}
                </Text>
              </TouchableOpacity>
              <Text style={styles.errorDescription}>
                {testError.description}
              </Text>
            </View>
          ))}

          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setCurrentError(null)}
          >
            <Text style={styles.clearButtonText}>
              Effacer l'erreur
            </Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ErrorTest;
