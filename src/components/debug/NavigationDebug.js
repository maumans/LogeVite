/**
 * Composant de Debug Navigation - LogeVite
 * 
 * Permet de tester la navigation et diagnostiquer les problèmes
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS } from '../../constants/colors';

const NavigationDebug = ({ navigation }) => {
  const { utilisateur, chargement, estConnecte } = useAuth();

  const testNavigation = (routeName) => {
    try {
      navigation.navigate(routeName);
      Alert.alert('Succès', `Navigation vers ${routeName} réussie`);
    } catch (error) {
      Alert.alert('Erreur', `Erreur de navigation vers ${routeName}: ${error.message}`);
    }
  };

  const afficherEtatAuth = () => {
    Alert.alert(
      'État d\'Authentification',
      `Chargement: ${chargement}\nConnecté: ${estConnecte}\nUtilisateur: ${utilisateur ? 'Oui' : 'Non'}\nEmail: ${utilisateur?.email || 'N/A'}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debug Navigation</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>État d'Authentification</Text>
        <TouchableOpacity style={styles.button} onPress={afficherEtatAuth}>
          <Text style={styles.buttonText}>Afficher l'état</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Navigation</Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => testNavigation('Welcome')}
        >
          <Text style={styles.buttonText}>Vers Welcome</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => testNavigation('Auth')}
        >
          <Text style={styles.buttonText}>Vers Auth</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => testNavigation('Home')}
        >
          <Text style={styles.buttonText}>Vers Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations</Text>
        <Text style={styles.info}>
          Chargement: {chargement ? 'Oui' : 'Non'}
        </Text>
        <Text style={styles.info}>
          Connecté: {estConnecte ? 'Oui' : 'Non'}
        </Text>
        <Text style={styles.info}>
          Utilisateur: {utilisateur ? 'Présent' : 'Absent'}
        </Text>
        {utilisateur && (
          <Text style={styles.info}>
            Email: {utilisateur.email || 'N/A'}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.text.primary,
  },
  button: {
    backgroundColor: COLORS.primary[500],
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  info: {
    fontSize: 12,
    color: COLORS.text.secondary,
    marginBottom: 4,
  },
});

export default NavigationDebug;
