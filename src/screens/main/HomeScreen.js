/**
 * Écran d'Accueil Moderne
 * 
 * Dashboard principal avec navigation, statistiques et actions rapides
 */

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS } from '../../constants/colors';

// Import des composants UI
import Header from '../../components/ui/Header';
import QuickActions from '../../components/ui/QuickActions';
import { StatsGrid } from '../../components/ui/StatsCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const HomeScreen = ({ navigation }) => {
  const { utilisateur, profilUtilisateur, seDeconnecter } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [notifications] = useState(5); // Exemple

  const userType = profilUtilisateur?.typeUtilisateur || 'non_defini';

  // Fonction de rafraîchissement
  const onRefresh = async () => {
    setRefreshing(true);
    // Simuler le rechargement des données
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  // Gestion des actions du header
  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleNotificationPress = () => {
    Alert.alert('Notifications', 'Fonctionnalité bientôt disponible !');
  };

  const handleMenuPress = () => {
    Alert.alert('Menu', 'Menu latéral bientôt disponible !');
  };

  // Gestion des actions rapides
  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'search':
        navigation.navigate('Search');
        break;
      case 'publish':
        navigation.navigate('Publish');
        break;
      case 'complete-profile':
        navigation.navigate('Profile');
        break;
      case 'messages':
        navigation.navigate('Messages');
        break;
      default:
        Alert.alert('Action', `Fonctionnalité "${actionId}" bientôt disponible !`);
    }
  };

  // Obtenir le titre et sous-titre selon le profil
  const getHeaderInfo = () => {
    const name = profilUtilisateur?.prenom || utilisateur?.displayName?.split(' ')[0] || 'Utilisateur';
    
    switch (userType) {
      case 'particulier':
        return {
          title: `Bonjour ${name} !`,
          subtitle: 'Trouvez votre logement idéal'
        };
      case 'mixte':
        return {
          title: `Bonjour ${name} !`,
          subtitle: 'Recherchez et publiez vos annonces'
        };
      case 'professionnel':
        return {
          title: `Bonjour ${name} !`,
          subtitle: 'Gérez votre portefeuille immobilier'
        };
      default:
        return {
          title: 'Bienvenue sur LogeVite !',
          subtitle: 'Explorez l\'application'
        };
    }
  };

  // Obtenir les statistiques selon le type d'utilisateur
  const getStats = () => {
    if (userType === 'non_defini') {
      return [
        {
          title: 'Annonces disponibles',
          value: '1,234',
          icon: '🏠',
          color: COLORS.primary,
          subtitle: 'Dans toute la Guinée'
        },
        {
          title: 'Nouveautés aujourd\'hui',
          value: '23',
          icon: '✨',
          color: COLORS.success,
          trend: 'up',
          trendValue: '+12%'
        }
      ];
    }

    switch (userType) {
      case 'particulier':
        return [
          {
            title: 'Favoris sauvegardés',
            value: '8',
            icon: '❤️',
            color: COLORS.error,
            subtitle: 'Annonces intéressantes'
          },
          {
            title: 'Demandes actives',
            value: '3',
            icon: '📝',
            color: COLORS.secondary,
            trend: 'stable'
          },
          {
            title: 'Messages non lus',
            value: '5',
            icon: '💬',
            color: COLORS.accent,
            trend: 'up',
            trendValue: '+2'
          },
          {
            title: 'Visites programmées',
            value: '2',
            icon: '📅',
            color: COLORS.primary,
            subtitle: 'Cette semaine'
          }
        ];

      case 'mixte':
        return [
          {
            title: 'Mes annonces',
            value: '2/5',
            icon: '🏠',
            color: COLORS.primary,
            subtitle: 'Annonces publiées'
          },
          {
            title: 'Vues cette semaine',
            value: '127',
            icon: '👀',
            color: COLORS.success,
            trend: 'up',
            trendValue: '+23%'
          },
          {
            title: 'Messages reçus',
            value: '12',
            icon: '💬',
            color: COLORS.accent,
            trend: 'up',
            trendValue: '+4'
          },
          {
            title: 'Favoris',
            value: '6',
            icon: '❤️',
            color: COLORS.error,
            subtitle: 'Annonces sauvées'
          }
        ];

      case 'professionnel':
        return [
          {
            title: 'Annonces actives',
            value: '24',
            icon: '🏢',
            color: COLORS.primary,
            subtitle: 'En ligne'
          },
          {
            title: 'Vues ce mois',
            value: '2,341',
            icon: '👀',
            color: COLORS.success,
            trend: 'up',
            trendValue: '+18%'
          },
          {
            title: 'Leads générés',
            value: '67',
            icon: '🎯',
            color: COLORS.secondary,
            trend: 'up',
            trendValue: '+12'
          },
          {
            title: 'Taux de conversion',
            value: '12%',
            icon: '📈',
            color: COLORS.accent,
            trend: 'up',
            trendValue: '+2%'
          }
        ];

      default:
        return [];
    }
  };

  const headerInfo = getHeaderInfo();
  const stats = getStats();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header moderne */}
      <Header
        user={utilisateur}
        title={headerInfo.title}
        subtitle={headerInfo.subtitle}
        onProfilePress={handleProfilePress}
        onNotificationPress={handleNotificationPress}
        onMenuPress={handleMenuPress}
        notificationCount={notifications}
      />

      {/* Contenu principal */}
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >


        {/* Statistiques */}
        {stats.length > 0 && (
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>
              {userType === 'professionnel' ? 'Tableau de Bord' : 'Aperçu'}
            </Text>
            <StatsGrid stats={stats} />
          </View>
        )}

        {/* Actions rapides */}
        <QuickActions
          userType={userType}
          onActionPress={handleQuickAction}
        />

        {/* Section promotionnelle */}
        <View style={styles.promoSection}>
          <Card style={styles.promoCard}>
            <Text style={styles.promoTitle}>🚀 Découvrez nos nouveautés</Text>
            <Text style={styles.promoText}>
              Nouvelles fonctionnalités de géolocalisation et de réalité augmentée pour vos visites virtuelles !
            </Text>
            <Button
              title="En savoir plus"
              onPress={() => Alert.alert('Nouveautés', 'Fonctionnalités bientôt disponibles !')}
              variant="outline"
              size="md"
            />
          </Card>
        </View>

        {/* Espacement pour le bottom tab */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  scrollView: {
    flex: 1
  },

  statsSection: {
    paddingVertical: 20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16,
    paddingHorizontal: 16
  },
  promoSection: {
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  promoCard: {
    padding: 20,
    backgroundColor: `${COLORS.secondary}05`,
    borderWidth: 1,
    borderColor: `${COLORS.secondary}20`
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 8
  },
  promoText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    lineHeight: 20,
    marginBottom: 16
  },
  bottomSpacer: {
    height: 20
  }
});

export default HomeScreen;
