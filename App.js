import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import components
import { Button, Card } from './src/components/ui';
import { COLORS } from './src/constants';

const Stack = createStackNavigator();

// Welcome Screen Component
const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center px-6">
        {/* Logo/Icon placeholder */}
        <View className="w-24 h-24 bg-primary-500 rounded-full mb-8 items-center justify-center">
          <Text className="text-white text-3xl font-bold">LV</Text>
        </View>
        
        {/* Welcome Card */}
        <Card style={{ width: '100%', maxWidth: 400 }}>
          <Text className="text-3xl font-bold text-gray-900 text-center mb-4">
            Bienvenue sur LogeVite
          </Text>
          
          <Text className="text-base text-gray-600 text-center mb-8">
            Trouvez votre logement idéal en Guinée. Connectez-vous avec des 
            professionnels de l'immobilier et découvrez les meilleures opportunités.
          </Text>
          
          <View className="space-y-4">
            <Button
              title="Commencer"
              onPress={() => navigation.navigate('Home')}
              variant="primary"
              size="lg"
            />
            
            <Button
              title="Découvrir l'app"
              onPress={() => console.log('Discover pressed')}
              variant="outline"
              size="lg"
            />
          </View>
        </Card>
        
        {/* Features Preview */}
        <View className="mt-8 w-full max-w-sm">
          <Text className="text-sm text-gray-500 text-center mb-4">
            Fonctionnalités principales :
          </Text>
          
          <View className="flex-row justify-around">
            <View className="items-center">
              <View className="w-12 h-12 bg-primary-100 rounded-full items-center justify-center mb-2">
                <Text className="text-primary-600 text-xl">🏠</Text>
              </View>
              <Text className="text-xs text-gray-600">Annonces</Text>
            </View>
            
            <View className="items-center">
              <View className="w-12 h-12 bg-secondary-100 rounded-full items-center justify-center mb-2">
                <Text className="text-secondary-600 text-xl">💬</Text>
              </View>
              <Text className="text-xs text-gray-600">Messagerie</Text>
            </View>
            
            <View className="items-center">
              <View className="w-12 h-12 bg-accent-100 rounded-full items-center justify-center mb-2">
                <Text className="text-accent-600 text-xl">📍</Text>
              </View>
              <Text className="text-xs text-gray-600">Géolocalisation</Text>
            </View>
          </View>
        </View>
      </View>
      
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

// Home Screen Component (placeholder)
const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        <Card>
          <Text className="text-2xl font-bold text-gray-900 text-center mb-4">
            Écran d'accueil
          </Text>
          <Text className="text-base text-gray-600 text-center">
            L'interface principale de LogeVite sera bientôt disponible !
          </Text>
        </Card>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
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
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'LogeVite' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
