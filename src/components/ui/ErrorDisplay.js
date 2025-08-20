/**
 * Composant d'affichage d'erreurs professionnel pour LogeVite
 * 
 * Design simple, moderne et professionnel sans fantaisie
 * Focus sur la clarté du message et l'action utilisateur
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { COLORS } from '../../constants/colors';
import Icon, { Icons } from './Icon';

const ErrorDisplay = ({ 
  error, 
  onRetry, 
  onDismiss, 
  showActions = true,
  style 
}) => {
  if (!error) return null;

  return (
    <View style={[styles.container, style]}>
      {/* Message d'erreur principal */}
      <View style={styles.errorHeader}>
        <View style={styles.iconContainer}>
          <Icon 
            {...Icons.error} 
            size={24} 
            color="#DC2626" 
          />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.errorMessage}>
            {error.message}
          </Text>
          {error.solution && (
            <Text style={styles.errorSolution}>
              {error.solution}
            </Text>
          )}
        </View>
      </View>

      {/* Actions */}
      {showActions && (onRetry || onDismiss) && (
        <View style={styles.actionsContainer}>
          {onRetry && (
            <TouchableOpacity 
              style={styles.retryButton} 
              onPress={onRetry}
              activeOpacity={0.8}
            >
              <Icon 
                {...Icons.refresh} 
                size={16} 
                color="white" 
                style={{ marginRight: 8 }}
              />
              <Text style={styles.retryButtonText}>Réessayer</Text>
            </TouchableOpacity>
          )}
          {onDismiss && (
            <TouchableOpacity 
              style={styles.dismissButton} 
              onPress={onDismiss}
              activeOpacity={0.8}
            >
              <Icon 
                {...Icons.close} 
                size={16} 
                color="#DC2626" 
                style={{ marginRight: 8 }}
              />
              <Text style={styles.dismissButtonText}>Fermer</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF2F2', // Rouge très clair
    borderWidth: 1,
    borderColor: '#FECACA', // Rouge clair
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  errorHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  messageContainer: {
    flex: 1,
  },
  errorMessage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#DC2626', // Rouge foncé
    marginBottom: 4,
    lineHeight: 22,
  },
  errorSolution: {
    fontSize: 14,
    color: '#7F1D1D', // Rouge très foncé
    lineHeight: 20,
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 12,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  dismissButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DC2626',
  },
  dismissButtonText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ErrorDisplay;