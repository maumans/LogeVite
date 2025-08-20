/**
 * Composant Carte de Statistiques
 * 
 * Affiche des statistiques avec icône, valeur et variation
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  trend, // 'up', 'down', 'stable'
  trendValue,
  color = COLORS.primary,
  style,
  ...props
}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return COLORS.success;
      case 'down':
        return COLORS.error;
      default:
        return COLORS.gray[500];
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '➡️';
    }
  };

  return (
    <View style={[styles.container, style]} {...props}>
      {/* En-tête avec icône */}
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
          <Text style={[styles.icon, { color }]}>{icon}</Text>
        </View>
        
        {trend && trendValue && (
          <View style={styles.trendContainer}>
            <Text style={[styles.trendIcon]}>{getTrendIcon()}</Text>
            <Text style={[styles.trendValue, { color: getTrendColor() }]}>
              {trendValue}
            </Text>
          </View>
        )}
      </View>

      {/* Contenu principal */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.value, { color }]}>{value}</Text>
        {subtitle && (
          <Text style={styles.subtitle}>{subtitle}</Text>
        )}
      </View>
    </View>
  );
};

const StatsGrid = ({ stats }) => (
  <View style={styles.grid}>
    {stats.map((stat, index) => (
      <StatsCard
        key={index}
        {...stat}
        style={styles.gridItem}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    fontSize: 20
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  trendIcon: {
    fontSize: 12
  },
  trendValue: {
    fontSize: 12,
    fontWeight: '600'
  },
  content: {},
  title: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 4
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.text.secondary
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 16
  },
  gridItem: {
    width: '47%'
  }
});

export { StatsCard, StatsGrid };
export default StatsCard;
