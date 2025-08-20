/**
 * Écran de Messages
 * 
 * Interface de messagerie avec conversations
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import Header from '../../components/ui/Header';
import Card from '../../components/ui/Card';

const MessagesScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Messages"
        subtitle="Vos conversations"
        onProfilePress={() => navigation.navigate('Profile')}
      />
      
      <View style={styles.content}>
        <Card style={styles.comingSoonCard}>
          <Text style={styles.comingSoonTitle}>💬 Messagerie</Text>
          <Text style={styles.comingSoonText}>
            Chat en temps réel, notifications push, partage de documents et intégration avec WhatsApp/Telegram.
          </Text>
          <Text style={styles.comingSoonSubtext}>
            Bientôt disponible...
          </Text>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'center'
  },
  comingSoonCard: {
    padding: 32,
    alignItems: 'center'
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
    textAlign: 'center'
  },
  comingSoonText: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16
  },
  comingSoonSubtext: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600'
  }
});

export default MessagesScreen;
