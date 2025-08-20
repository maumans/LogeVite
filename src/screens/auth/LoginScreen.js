/**
 * Écran de Connexion - LogeVite
 * 
 * Permet aux utilisateurs de se connecter avec :
 * - Email et mot de passe
 * - Numéro de téléphone (SMS)
 * - Comptes Google et Facebook
 * - Redirection vers l'inscription
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
import { 
  seConnecterEmail, 
  seConnecterTelephone, 
  seConnecterGoogle, 
  seConnecterFacebook,
  envoyerCodeSMS 
} from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';

const LoginScreen = ({ navigation }) => {
  // États locaux
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [codeSMS, setCodeSMS] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [modeConnexion, setModeConnexion] = useState('email'); // 'email' ou 'telephone'
  const [chargement, setChargement] = useState(false);
  const [etapeSMS, setEtapeSMS] = useState(1); // 1: téléphone, 2: code

  // Contexte d'authentification
  const { mettreAJourProfilLocal } = useAuth();

  // Styles mémorisés pour éviter les re-renders
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
    inputFocus: {
      borderColor: COLORS.primary[500],
      borderWidth: 2,
    },
    switchMode: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 24,
    },
    switchButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginHorizontal: 8,
      borderRadius: 20,
    },
    switchButtonActive: {
      backgroundColor: COLORS.primary[500],
    },
    switchButtonInactive: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: COLORS.border.medium,
    },
    switchText: {
      fontSize: 14,
      fontWeight: '500',
    },
    switchTextActive: {
      color: 'white',
    },
    switchTextInactive: {
      color: COLORS.text.secondary,
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: 24,
    },
    forgotPasswordText: {
      color: COLORS.primary[500],
      fontSize: 14,
      fontWeight: '500',
    },
    socialButtons: {
      marginTop: 24,
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: COLORS.border.medium,
      backgroundColor: 'white',
    },
    socialButtonText: {
      marginLeft: 12,
      fontSize: 16,
      fontWeight: '500',
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

  // Connexion avec email/mot de passe
  const handleConnexionEmail = useCallback(async () => {
    if (!email || !motDePasse) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setChargement(true);
    
    // Timeout de sécurité pour éviter les blocages
    const timeoutId = setTimeout(() => {
      setChargement(false);
      Alert.alert('Erreur', 'Délai d\'attente dépassé. Veuillez réessayer.');
    }, 30000); // 30 secondes

    try {
      const resultat = await seConnecterEmail(email, motDePasse);
      clearTimeout(timeoutId);
      
      if (resultat.success) {
        console.log('Connexion réussie');
        // L'utilisateur est maintenant connecté, le contexte d'authentification 
        // devrait automatiquement naviguer vers l'écran principal
        // Pas besoin d'alerte ni de navigation manuelle
      }
    } catch (error) {
      clearTimeout(timeoutId);
      Alert.alert('Erreur de connexion', error.message);
    } finally {
      setChargement(false);
    }
  }, [email, motDePasse]);

  // Envoi du code SMS
  const handleEnvoiSMS = useCallback(async () => {
    if (!telephone) {
      Alert.alert('Erreur', 'Veuillez entrer votre numéro de téléphone');
      return;
    }

    // Formatage du numéro de téléphone
    let numeroFormate = telephone;
    if (!numeroFormate.startsWith('+')) {
      if (numeroFormate.startsWith('224')) {
        numeroFormate = '+' + numeroFormate;
      } else if (numeroFormate.startsWith('0')) {
        numeroFormate = '+224' + numeroFormate.substring(1);
      } else {
        numeroFormate = '+224' + numeroFormate;
      }
    }

    setChargement(true);
    try {
      const resultat = await envoyerCodeSMS(numeroFormate);
      if (resultat.success) {
        setVerificationId(resultat.verificationId);
        setEtapeSMS(2);
        Alert.alert('Code envoyé', 'Un code de vérification a été envoyé à votre téléphone');
      }
    } catch (error) {
      Alert.alert('Erreur', error.message);
    } finally {
      setChargement(false);
    }
  }, [telephone]);

  // Vérification du code SMS
  const handleVerificationSMS = useCallback(async () => {
    if (!codeSMS || !verificationId) {
      Alert.alert('Erreur', 'Code SMS manquant');
      return;
    }

    setChargement(true);
    try {
      const resultat = await seConnecterTelephone(telephone, codeSMS, verificationId);
      if (resultat.success) {
        console.log('Connexion SMS réussie');
        // L'utilisateur est maintenant connecté, le contexte d'authentification 
        // devrait automatiquement naviguer vers l'écran principal
      }
    } catch (error) {
      Alert.alert('Erreur de vérification', error.message);
    } finally {
      setChargement(false);
    }
  }, [codeSMS, verificationId, telephone]);

  // Connexion avec Google
  const handleConnexionGoogle = useCallback(async () => {
    setChargement(true);
    try {
      const resultat = await seConnecterGoogle();
      if (resultat.success) {
        console.log('Connexion Google réussie');
        // L'utilisateur est maintenant connecté, le contexte d'authentification 
        // devrait automatiquement naviguer vers l'écran principal
      }
    } catch (error) {
      Alert.alert('Erreur de connexion Google', error.message);
    } finally {
      setChargement(false);
    }
  }, []);

  // Connexion avec Facebook
  const handleConnexionFacebook = useCallback(async () => {
    setChargement(true);
    try {
      const resultat = await seConnecterFacebook();
      if (resultat.success) {
        console.log('Connexion Facebook réussie');
        // L'utilisateur est maintenant connecté, le contexte d'authentification 
        // devrait automatiquement naviguer vers l'écran principal
      }
    } catch (error) {
      Alert.alert('Erreur de connexion Facebook', error.message);
    } finally {
      setChargement(false);
    }
  }, []);

  // Récupération de mot de passe
  const handleMotDePasseOublie = useCallback(() => {
    navigation.navigate('MotDePasseOublie');
  }, [navigation]);

  // Navigation vers l'inscription
  const handleInscription = useCallback(() => {
    navigation.navigate('Inscription');
  }, [navigation]);

  // Changement de mode de connexion
  const handleChangementMode = useCallback((mode) => {
    setModeConnexion(mode);
    setEtapeSMS(1);
    setEmail('');
    setMotDePasse('');
    setTelephone('');
    setCodeSMS('');
    setVerificationId(null);
  }, []);

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
            <Text style={styles.title}>Connexion</Text>
            <Text style={styles.subtitle}>
              Accédez à votre compte LogeVite
            </Text>
          </View>

          {/* Sélecteur de mode de connexion */}
          <View style={styles.switchMode}>
            <TouchableOpacity
              style={[
                styles.switchButton,
                modeConnexion === 'email' ? styles.switchButtonActive : styles.switchButtonInactive
              ]}
              onPress={() => handleChangementMode('email')}
            >
              <Text
                style={[
                  styles.switchText,
                  modeConnexion === 'email' ? styles.switchTextActive : styles.switchTextInactive
                ]}
              >
                Email
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.switchButton,
                modeConnexion === 'telephone' ? styles.switchButtonActive : styles.switchButtonInactive
              ]}
              onPress={() => handleChangementMode('telephone')}
            >
              <Text
                style={[
                  styles.switchText,
                  modeConnexion === 'telephone' ? styles.switchTextActive : styles.switchTextInactive
                ]}
              >
                Téléphone
              </Text>
            </TouchableOpacity>
          </View>

          {/* Formulaire de connexion */}
          <Card style={styles.card}>
            {modeConnexion === 'email' ? (
              // Mode Email
              <>
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
                  placeholder="Mot de passe"
                  value={motDePasse}
                  onChangeText={setMotDePasse}
                  secureTextEntry
                  autoCapitalize="none"
                  editable={!chargement}
                />

                <TouchableOpacity 
                  style={styles.forgotPassword} 
                  onPress={handleMotDePasseOublie}
                  disabled={chargement}
                >
                  <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
                </TouchableOpacity>

                <Button
                  title="Se connecter"
                  onPress={handleConnexionEmail}
                  variant="primary"
                  size="lg"
                  loading={chargement}
                />
              </>
            ) : (
              // Mode Téléphone
              <>
                {etapeSMS === 1 ? (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Numéro de téléphone (+224...)"
                      value={telephone}
                      onChangeText={setTelephone}
                      keyboardType="phone-pad"
                      editable={!chargement}
                    />
                    
                    <Button
                      title="Envoyer le code SMS"
                      onPress={handleEnvoiSMS}
                      variant="primary"
                      size="lg"
                      loading={chargement}
                    />
                  </>
                ) : (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Code de vérification (6 chiffres)"
                      value={codeSMS}
                      onChangeText={setCodeSMS}
                      keyboardType="number-pad"
                      maxLength={6}
                      editable={!chargement}
                    />
                    
                    <Button
                      title="Vérifier le code"
                      onPress={handleVerificationSMS}
                      variant="primary"
                      size="lg"
                      loading={chargement}
                    />
                    
                    <TouchableOpacity
                      style={{ alignSelf: 'center', marginTop: 16 }}
                      onPress={() => setEtapeSMS(1)}
                      disabled={chargement}
                    >
                      <Text style={styles.forgotPasswordText}>Modifier le numéro</Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}
          </Card>

          {/* Boutons de connexion sociale */}
          <View style={styles.socialButtons}>
            <Text style={[styles.subtitle, { marginBottom: 16 }]}>
              Ou connectez-vous avec
            </Text>
            
            <TouchableOpacity 
              style={styles.socialButton} 
              onPress={handleConnexionGoogle}
              disabled={chargement}
            >
              <Text style={{ color: '#DB4437', fontSize: 20 }}>🔴</Text>
              <Text style={[styles.socialButtonText, { color: '#DB4437' }]}>
                Continuer avec Google
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.socialButton} 
              onPress={handleConnexionFacebook}
              disabled={chargement}
            >
              <Text style={{ color: '#4267B2', fontSize: 20 }}>🔵</Text>
              <Text style={[styles.socialButtonText, { color: '#4267B2' }]}>
                Continuer avec Facebook
              </Text>
            </TouchableOpacity>
          </View>

          {/* Pied de page */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Pas encore de compte ?</Text>
            <TouchableOpacity onPress={handleInscription} disabled={chargement}>
              <Text style={styles.footerLink}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
