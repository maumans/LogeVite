/**
 * Configuration Babel pour LogeVite
 * 
 * Configure Babel pour supporter :
 * - Expo et React Native
 * - Syntaxe Flow (utilisée par Expo)
 * - React Native Reanimated
 * 
 * NativeWind temporairement désactivé pour éviter les conflits
 */

module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',     // Preset principal pour Expo
      '@babel/preset-flow',    // Support pour la syntaxe Flow utilisée par Expo
    ],
    plugins: [
      'react-native-reanimated/plugin',      // Plugin Reanimated (doit être en dernier)
    ],
  };
};
