import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import components
import { Button, Card } from './src/components/ui';
import { COLORS } from './src/constants';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import AuthNavigator from './src/navigation/AuthNavigator';
import ProfileNavigator from './src/navigation/ProfileNavigator';
import MainNavigator from './src/navigation/MainNavigator';
import DiscoveryScreen from './src/screens/discovery/DiscoveryScreen';
import FirestoreConfig from './src/components/config/FirestoreConfig';


const Stack = createStackNavigator();

// Styles temporaires sans TailwindCSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  logo: {
    width: 96,
    height: 96,
    backgroundColor: COLORS.primary[500],
    borderRadius: 48,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    marginVertical: 8,
  },
  featuresContainer: {
    marginTop: 32,
    width: '100%',
    maxWidth: 300,
  },
  featuresTitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  featureItem: {
    alignItems: 'center',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: '#4b5563',
  },
});

// Welcome Screen Component
const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.content}>
        {/* Logo/Icon placeholder */}
        <View style={styles.logo}>
          <Text style={styles.logoText}>LV</Text>
        </View>
        
        {/* Welcome Card */}
        <Card style={{ width: '100%', maxWidth: 400 }}>
          <Text style={styles.title}>
            Bienvenue sur LogeVite
          </Text>
          
          <Text style={styles.subtitle}>
            Trouvez votre logement idéal en Guinée. Connectez-vous avec des 
            professionnels de l'immobilier et découvrez les meilleures opportunités.
          </Text>
          
          <View>
                      <View style={styles.buttonContainer}>
            <Button
              title="Se connecter"
              onPress={() => navigation.navigate('Auth')}
              variant="primary"
              size="lg"
            />
          </View>
            
            <View style={styles.buttonContainer}>
              <Button
                title="Découvrir l'application"
                onPress={() => navigation.navigate('Discovery')}
                variant="outline"
                size="lg"
              />
            </View>
          </View>
        </Card>
        
        {/* Features Preview */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>
            Fonctionnalités principales :
          </Text>
          
          <View style={styles.featuresRow}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#d1fae5' }]}>
                <Text style={{ color: COLORS.primary[600], fontSize: 20 }}>🏠</Text>
              </View>
              <Text style={styles.featureText}>Annonces</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#fef3c7' }]}>
                <Text style={{ color: COLORS.secondary[600], fontSize: 20 }}>💬</Text>
              </View>
              <Text style={styles.featureText}>Messagerie</Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: '#dbeafe' }]}>
                <Text style={{ color: COLORS.accent[600], fontSize: 20 }}>📍</Text>
              </View>
              <Text style={styles.featureText}>Géolocalisation</Text>
            </View>
          </View>
        </View>


      </View>
      
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};



// Composant de navigation conditionnelle
const NavigationApp = () => {
  const { utilisateur, profilUtilisateur, chargement } = useAuth();

  if (chargement) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.content}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>LV</Text>
          </View>
          <Text style={styles.title}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Déterminer la route initiale selon l'état de l'utilisateur
  let initialRouteName = "Welcome";
  if (utilisateur) {
    if (profilUtilisateur?.profilComplet) {
      // Si profil complet (même minimal), aller à Main
      initialRouteName = "Main";
    } else {
      // Si pas de profil, aller à Profile pour le créer
      initialRouteName = "Profile";
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={initialRouteName}
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.primary[500],
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {!utilisateur ? (
          // Écrans pour utilisateurs non connectés
          <>
            <Stack.Screen 
              name="Welcome" 
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Discovery" 
              component={DiscoveryScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Auth" 
              component={AuthNavigator}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          // Utilisateur connecté
          <>
            <Stack.Screen 
              name="Main" 
              component={MainNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Profile" 
              component={ProfileNavigator}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Main App Component
export default function App() {
  return (
    <SafeAreaProvider>
      <FirestoreConfig>
        <AuthProvider>
          <NavigationApp />
        </AuthProvider>
      </FirestoreConfig>
    </SafeAreaProvider>
  );
}
