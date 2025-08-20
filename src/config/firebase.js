/**
 * Configuration Firebase pour LogeVite
 * 
 * Ce fichier configure la connexion à Firebase et initialise
 * tous les services nécessaires (Auth, Firestore, Storage)
 * Utilise Firebase Web pour la compatibilité avec Expo Go
 */

import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, enableNetwork, disableNetwork, initializeFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuration Firebase - À remplacer par vos vraies clés
const firebaseConfig = {
    apiKey: "AIzaSyDGpOk6qDxj9FD0d2pwWfFd3vtEXOYkcZI",
    authDomain: "logevite-96eda.firebaseapp.com",
    projectId: "logevite-96eda",
    storageBucket: "logevite-96eda.firebasestorage.app",
    messagingSenderId: "1094006078773",
    appId: "1:1094006078773:web:c563441bc652f57824a07c",
    measurementId: "G-K6NSCG4728"
};

// Initialisation de l'application Firebase
const app = initializeApp(firebaseConfig);

// Configuration de l'authentification avec persistance AsyncStorage
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Initialisation des services Firestore avec configuration optimisée pour React Native
const db = initializeFirestore(app, {
    cacheSizeBytes: 1048576, // Cache minimum de 1MB (requis par Firebase)
    experimentalForceLongPolling: true, // Forcer le long polling pour React Native
    useFetchStreams: false, // Désactiver les streams fetch
    ignoreUndefinedProperties: true, // Ignorer les propriétés undefined
    experimentalAutoDetectLongPolling: false, // Désactiver la détection automatique
});

// Initialisation du storage
const storage = getStorage(app);

export { app, auth, db, storage };
export default app;
