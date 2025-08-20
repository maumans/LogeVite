/**
 * Navigateur Principal avec Bottom Tabs
 * 
 * Navigation moderne avec onglets en bas d'écran
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { COLORS } from '../constants/colors';
import { useAuth } from '../contexts/AuthContext';

// Import des écrans temporaires (à remplacer par les vrais)
import HomeScreen from '../screens/main/HomeScreen';
import SearchScreen from '../screens/main/SearchScreen';
import PublishScreen from '../screens/main/PublishScreen';
import MessagesScreen from '../screens/main/MessagesScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Tab = createBottomTabNavigator();

// Composant pour les icônes personnalisées
const TabIcon = ({ name, focused, color, size = 24 }) => {
  const icons = {
    home: focused ? '🏠' : '🏡',
    search: focused ? '🔍' : '🔎',
    publish: focused ? '➕' : '✚',
    messages: focused ? '💬' : '💭',
    profile: focused ? '👤' : '👥'
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size, marginBottom: 2 }}>
        {icons[name] || '❓'}
      </Text>
    </View>
  );
};

const MainNavigator = () => {
  const { profilUtilisateur } = useAuth();
  const userType = profilUtilisateur?.typeUtilisateur || 'non_defini';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon
            name={route.name.toLowerCase()}
            focused={focused}
            color={color}
            size={20}
          />
        ),
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray[500],
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.gray[200],
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2
          },
          shadowOpacity: 0.1,
          shadowRadius: 4
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4
        },
        headerShown: false
      })}
    >
      {/* Onglet Accueil - Toujours visible */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Accueil',
          tabBarBadge: userType === 'non_defini' ? '!' : undefined
        }}
      />

      {/* Onglet Recherche - Visible pour tous sauf les pros pure */}
      {userType !== 'professionnel' && (
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: 'Rechercher'
          }}
        />
      )}

      {/* Onglet Publication - Visible pour mixte et professionnel */}
      {(userType === 'mixte' || userType === 'professionnel') && (
        <Tab.Screen
          name="Publish"
          component={PublishScreen}
          options={{
            title: 'Publier',
            tabBarButton: (props) => (
              <View
                {...props}
                style={[
                  props.style,
                  {
                    backgroundColor: COLORS.primary,
                    borderRadius: 25,
                    marginHorizontal: 10,
                    marginBottom: 10,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 4,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4
                  }
                ]}
              >
                <Text style={{ fontSize: 24, color: COLORS.white }}>➕</Text>
              </View>
            )
          }}
        />
      )}

      {/* Onglet Messages - Toujours visible */}
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          title: 'Messages',
          tabBarBadge: 3 // Exemple de badge pour nouveaux messages
        }}
      />

      {/* Onglet Profil - Toujours visible */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profil'
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
