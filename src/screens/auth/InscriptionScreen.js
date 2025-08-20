/**
 * Écran d'Inscription - LogeVite
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { Button, Card } from '../../components/ui';
import { COLORS } from '../../constants/colors';
import { sinscrireEmail } from '../../services/authService';

const InscriptionScreen = ({ navigation }) => {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('');
  const [typeUtilisateur, setTypeUtilisateur] = useState('particulier');
  const [chargement, setChargement] = useState(false);

  const styles = useMemo(() => ({
    container: {
      flex: 1,
      backgroundColor: COLORS.background.secondary,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: 24,
      paddingVertical: 32,
    },
    header: {
      alignItems: 'center',
      marginBottom: 32,
    },
    logo: {
      width: 80,
      height: 80,
      backgroundColor: COLORS.primary[500],
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
    },
    logoText: {
      color: 'white',
      fontSize: 32,
      fontWeight: 'bold',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: COLORS.text.primary,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: COLORS.text.secondary,
      textAlign: 'center',
    },
    card: {
      marginBottom: 24,
    },
    input: {
      borderWidth: 1,
      borderColor: COLORS.border.medium,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      backgroundColor: 'white',
      marginBottom: 16,
    },
    typeSelector: {
      flexDirection: 'row',
      marginBottom: 24,
    },
    typeButton: {
      flex: 1,
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderRadius: 12,
      alignItems: 'center',
      marginHorizontal: 8,
      borderWidth: 2,
    },
    typeButtonActive: {
      backgroundColor: COLORS.primary[50],
      borderColor: COLORS.primary[500],
    },
    typeButtonInactive: {
      backgroundColor: 'white',
      borderColor: COLORS.border.medium,
    },
    typeButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    typeButtonTextActive: {
      color: COLORS.primary[500],
    },
    typeButtonTextInactive: {
      color: COLORS.text.secondary,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 32,
      paddingBottom: 20,
    },
    footerText: {
      color: COLORS.text.secondary,
      fontSize: 14,
    },
    footerLink: {
      color: COLORS.primary[500],
      fontWeight: '600',
      marginLeft: 4,
    },
  }), []);

  const handleInscription = useCallback(async () => {
    if (!prenom.trim() || !nom.trim() || !email.trim() || !motDePasse.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (motDePasse.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (motDePasse !== confirmerMotDePasse) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    setChargement(true);
    
    // Timeout de sécurité pour éviter les blocages
    const timeoutId = setTimeout(() => {
      setChargement(false);
      Alert.alert('Erreur', 'Délai d\'attente dépassé. Veuillez réessayer.');
    }, 30000); // 30 secondes

    try {
      const donneesProfil = {
        prenom: prenom.trim(),
        nom: nom.trim(),
        typeUtilisateur: typeUtilisateur,
      };

      const resultat = await sinscrireEmail(email, motDePasse, donneesProfil);
      clearTimeout(timeoutId);
      
      if (resultat.success) {
        // L'utilisateur est maintenant connecté, le contexte d'authentification 
        // devrait automatiquement naviguer vers l'écran principal
        // Pas besoin d'alerte ni de navigation manuelle
      }
    } catch (error) {
      clearTimeout(timeoutId);
      Alert.alert('Erreur d\'inscription', error.message);
    } finally {
      setChargement(false);
    }
  }, [prenom, nom, email, motDePasse, confirmerMotDePasse, typeUtilisateur, navigation]);

  const handleConnexion = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/* En-tête avec logo */}
          <View style={styles.header}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>LV</Text>
            </View>
            <Text style={styles.title}>Inscription</Text>
            <Text style={styles.subtitle}>
              Créez votre compte LogeVite
            </Text>
          </View>

          {/* Formulaire d'inscription */}
          <Card style={styles.card}>
            <Text style={[styles.subtitle, { marginBottom: 24, textAlign: 'left' }]}>
              Choisissez votre type de compte
            </Text>

            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[
                  styles.typeButton,
                  typeUtilisateur === 'particulier' ? styles.typeButtonActive : styles.typeButtonInactive
                ]}
                onPress={() => setTypeUtilisateur('particulier')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    typeUtilisateur === 'particulier' ? styles.typeButtonTextActive : styles.typeButtonTextInactive
                  ]}
                >
                  Particulier
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeButton,
                  typeUtilisateur === 'professionnel' ? styles.typeButtonActive : styles.typeButtonInactive
                ]}
                onPress={() => setTypeUtilisateur('professionnel')}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    typeUtilisateur === 'professionnel' ? styles.typeButtonTextActive : styles.typeButtonTextInactive
                  ]}
                >
                  Professionnel
                </Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Prénom"
              value={prenom}
              onChangeText={setPrenom}
              autoCapitalize="words"
              editable={!chargement}
            />

            <TextInput
              style={styles.input}
              placeholder="Nom"
              value={nom}
              onChangeText={setNom}
              autoCapitalize="words"
              editable={!chargement}
            />

            <TextInput
              style={styles.input}
              placeholder="Adresse email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!chargement}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Mot de passe (minimum 6 caractères)"
              value={motDePasse}
              onChangeText={setMotDePasse}
              secureTextEntry
              autoCapitalize="none"
              editable={!chargement}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirmer le mot de passe"
              value={confirmerMotDePasse}
              onChangeText={setConfirmerMotDePasse}
              secureTextEntry
              autoCapitalize="none"
              editable={!chargement}
            />

            <Button
              title="Créer mon compte"
              onPress={handleInscription}
              variant="primary"
              size="lg"
              loading={chargement}
            />
          </Card>

          {/* Pied de page */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Déjà un compte ?</Text>
            <TouchableOpacity onPress={handleConnexion} disabled={chargement}>
              <Text style={styles.footerLink}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InscriptionScreen;
