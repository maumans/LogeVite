/**
 * Composant Header moderne
 * 
 * En-tête avec avatar, notifications, recherche et actions
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Avatar from './Avatar';
import { COLORS } from '../../constants/colors';

const Header = ({
  user,
  onProfilePress,
  onNotificationPress,
  onMenuPress,
  notificationCount = 0,
  title,
  subtitle,
  showSearch = false,
  style,
  ...props
}) => {
  return (
    <SafeAreaView style={[styles.container, style]} edges={['top']} {...props}>
      <View style={styles.header}>
        {/* Section gauche - Menu et info utilisateur */}
        <View style={styles.leftSection}>
          {onMenuPress && (
            <TouchableOpacity
              style={styles.menuButton}
              onPress={onMenuPress}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
          )}
          
          <View style={styles.userInfo}>
            {title && (
              <Text style={styles.title}>{title}</Text>
            )}
            {subtitle && (
              <Text style={styles.subtitle}>{subtitle}</Text>
            )}
          </View>
        </View>

        {/* Section droite - Notifications et Avatar */}
        <View style={styles.rightSection}>
          {/* Bouton notifications */}
          {onNotificationPress && (
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={onNotificationPress}
              activeOpacity={0.7}
            >
              <Text style={styles.notificationIcon}>🔔</Text>
              {notificationCount > 0 && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}>
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {/* Avatar utilisateur */}
          <TouchableOpacity onPress={onProfilePress} activeOpacity={0.7}>
            <Avatar
              size="md"
              image={user?.photoURL}
              name={user?.displayName}
              email={user?.email}
              showStatus={true}
              status="online"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 60
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  menuIcon: {
    fontSize: 18,
    color: COLORS.gray[600]
  },
  userInfo: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 2
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.text.secondary
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  notificationIcon: {
    fontSize: 20
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white
  },
  notificationCount: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.white
  }
});

export default Header;

