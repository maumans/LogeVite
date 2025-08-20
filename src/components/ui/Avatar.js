/**
 * Composant Avatar moderne
 * 
 * Avatar avec image, initiales et indicateurs de statut
 */

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

const Avatar = ({
  size = 'md', // 'sm', 'md', 'lg', 'xl'
  image,
  name,
  email,
  showStatus = false,
  status = 'online', // 'online', 'offline', 'busy'
  style,
  ...props
}) => {
  // Tailles d'avatar
  const sizes = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96
  };

  const avatarSize = sizes[size];
  const statusSize = avatarSize * 0.25;

  // Couleurs de statut
  const statusColors = {
    online: '#10B981',
    offline: '#6B7280',
    busy: '#EF4444'
  };

  // Générer les initiales à partir du nom ou email
  const getInitials = () => {
    if (name) {
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .substring(0, 2)
        .toUpperCase();
    }
    
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    
    return '?';
  };

  // Générer une couleur de fond basée sur le nom/email
  const getBackgroundColor = () => {
    const colors = [
      '#EF4444', '#F97316', '#F59E0B', '#EAB308',
      '#84CC16', '#22C55E', '#10B981', '#14B8A6',
      '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1',
      '#8B5CF6', '#A855F7', '#D946EF', '#EC4899'
    ];
    
    const text = name || email || 'default';
    const index = text.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <View style={[styles.container, style]} {...props}>
      <View
        style={[
          styles.avatar,
          {
            width: avatarSize,
            height: avatarSize,
            borderRadius: avatarSize / 2,
            backgroundColor: image ? COLORS.gray[200] : getBackgroundColor()
          }
        ]}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={[
              styles.image,
              {
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarSize / 2
              }
            ]}
          />
        ) : (
          <Text
            style={[
              styles.initials,
              {
                fontSize: avatarSize * 0.4,
                color: COLORS.white
              }
            ]}
          >
            {getInitials()}
          </Text>
        )}
      </View>

      {showStatus && (
        <View
          style={[
            styles.statusIndicator,
            {
              width: statusSize,
              height: statusSize,
              borderRadius: statusSize / 2,
              backgroundColor: statusColors[status],
              bottom: 0,
              right: 0
            }
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  image: {
    resizeMode: 'cover'
  },
  initials: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  statusIndicator: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: COLORS.white
  }
});

export default Avatar;