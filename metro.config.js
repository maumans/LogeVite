/**
 * Configuration Metro pour LogeVite
 * 
 * Metro est le bundler JavaScript utilisé par React Native.
 * Configuration simplifiée pour éviter les conflits
 */

const { getDefaultConfig } = require('expo/metro-config');

// Récupération de la configuration par défaut d'Expo
const config = getDefaultConfig(__dirname);

module.exports = config;
