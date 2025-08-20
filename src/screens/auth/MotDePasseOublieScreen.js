/**
 * Écran de Mot de Passe Oublié - LogeVite
 * 
 * Permet aux utilisateurs de récupérer leur mot de passe
 * en envoyant un email de réinitialisation
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { Button, Card } from '../../components/ui';
import { COLORS } from '../../constants/colors';
import { recupererMotDePasse } from '../../services/authService';

const MotDePasseOublieScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
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
      marginBottom: 24,
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
    backButton: {
      alignSelf: 'center',
      marginTop: 16,
    },
    backButtonText: {
      color: COLORS.primary[500],
      fontSize: 14,
      fontWeight: '500',
    },
  }), []);

  const handleRecupererMotDePasse = useCallback(async () => {
    if (!email.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer votre adresse email');
      return;
    }

    setChargement(true);
    try {
      const resultat = await recupererMotDePasse(email.trim());
      if (resultat.success) {
        Alert.alert(
          'Email envoyé',
          'Un email de réinitialisation a été envoyé à votre adresse email. Veuillez vérifier votre boîte de réception.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login')
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Erreur', error.message);
    } finally {
      setChargement(false);
    }
  }, [email, navigation]);

  const handleRetour = useCallback(() => {
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
            <Text style={styles.title}>Mot de passe oublié</Text>
            <Text style={styles.subtitle}>
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </Text>
          </View>

          {/* Formulaire */}
          <Card style={styles.card}>
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

            <Button
              title="Envoyer l'email de réinitialisation"
              onPress={handleRecupererMotDePasse}
              variant="primary"
              size="lg"
              loading={chargement}
            />

            <TouchableOpacity
              style={styles.backButton}
              onPress={handleRetour}
              disabled={chargement}
            >
              <Text style={styles.backButtonText}>Retour à la connexion</Text>
            </TouchableOpacity>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MotDePasseOublieScreen;
