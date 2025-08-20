/**
 * Composant Actions Rapides
 * 
 * Grille d'actions rapides pour l'accueil
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const QuickAction = ({ icon, title, subtitle, onPress, color = COLORS.primary, disabled = false }) => (
  <TouchableOpacity
    style={[
      styles.actionItem,
      disabled && styles.actionItemDisabled
    ]}
    onPress={onPress}
    activeOpacity={0.7}
    disabled={disabled}
  >
    <View style={[styles.actionIcon, { backgroundColor: `${color}15` }]}>
      <Text style={[styles.iconText, { color }]}>{icon}</Text>
    </View>
    <Text style={[styles.actionTitle, disabled && styles.textDisabled]}>
      {title}
    </Text>
    {subtitle && (
      <Text style={[styles.actionSubtitle, disabled && styles.textDisabled]}>
        {subtitle}
      </Text>
    )}
  </TouchableOpacity>
);

const QuickActions = ({ userType, onActionPress }) => {
  // Actions pour particulier
  const particulierActions = [
    {
      id: 'search',
      icon: '🔍',
      title: 'Rechercher',
      subtitle: 'Trouver un bien',
      color: COLORS.primary
    },
    {
      id: 'favorites',
      icon: '❤️',
      title: 'Favoris',
      subtitle: 'Mes annonces sauvées',
      color: COLORS.error
    },
    {
      id: 'requests',
      icon: '📝',
      title: 'Mes Demandes',
      subtitle: 'Gérer mes recherches',
      color: COLORS.secondary
    },
    {
      id: 'messages',
      icon: '💬',
      title: 'Messages',
      subtitle: 'Mes conversations',
      color: COLORS.accent
    }
  ];

  // Actions pour mixte
  const mixteActions = [
    {
      id: 'search',
      icon: '🔍',
      title: 'Rechercher',
      subtitle: 'Trouver un bien',
      color: COLORS.primary
    },
    {
      id: 'publish',
      icon: '📸',
      title: 'Publier',
      subtitle: 'Nouvelle annonce',
      color: COLORS.success
    },
    {
      id: 'my-listings',
      icon: '🏠',
      title: 'Mes Annonces',
      subtitle: '0/5 publiées',
      color: COLORS.secondary
    },
    {
      id: 'messages',
      icon: '💬',
      title: 'Messages',
      subtitle: 'Conversations',
      color: COLORS.accent
    }
  ];

  // Actions pour professionnel
  const professionnelActions = [
    {
      id: 'dashboard',
      icon: '📊',
      title: 'Tableau de Bord',
      subtitle: 'Statistiques',
      color: COLORS.primary
    },
    {
      id: 'publish',
      icon: '📸',
      title: 'Publier',
      subtitle: 'Nouvelle annonce',
      color: COLORS.success
    },
    {
      id: 'portfolio',
      icon: '🏢',
      title: 'Portefeuille',
      subtitle: 'Gérer mes biens',
      color: COLORS.secondary
    },
    {
      id: 'clients',
      icon: '👥',
      title: 'Clients',
      subtitle: 'Gérer les contacts',
      color: COLORS.accent
    }
  ];

  // Actions pour non défini
  const defaultActions = [
    {
      id: 'explore',
      icon: '🌟',
      title: 'Explorer',
      subtitle: 'Découvrir l\'app',
      color: COLORS.primary
    },
    {
      id: 'complete-profile',
      icon: '👤',
      title: 'Compléter',
      subtitle: 'Mon profil',
      color: COLORS.secondary
    },
    {
      id: 'help',
      icon: '❓',
      title: 'Aide',
      subtitle: 'Comment ça marche',
      color: COLORS.accent
    },
    {
      id: 'settings',
      icon: '⚙️',
      title: 'Paramètres',
      subtitle: 'Configuration',
      color: COLORS.gray[600]
    }
  ];

  // Sélectionner les actions selon le type d'utilisateur
  const getActions = () => {
    switch (userType) {
      case 'particulier':
        return particulierActions;
      case 'mixte':
        return mixteActions;
      case 'professionnel':
        return professionnelActions;
      default:
        return defaultActions;
    }
  };

  const actions = getActions();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Actions Rapides</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action) => (
          <QuickAction
            key={action.id}
            icon={action.icon}
            title={action.title}
            subtitle={action.subtitle}
            color={action.color}
            onPress={() => onActionPress?.(action.id)}
            disabled={action.disabled}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16
  },
  actionItem: {
    width: '47%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  actionItemDisabled: {
    opacity: 0.6
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  iconText: {
    fontSize: 24
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text.primary,
    textAlign: 'center',
    marginBottom: 4
  },
  actionSubtitle: {
    fontSize: 12,
    color: COLORS.text.secondary,
    textAlign: 'center'
  },
  textDisabled: {
    color: COLORS.gray[400]
  }
});

export default QuickActions;
