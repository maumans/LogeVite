/**
 * Configuration Firestore pour LogeVite
 * 
 * Gère l'initialisation et la configuration de Firestore
 * pour réduire les avertissements de connexion WebChannel
 */

import { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { verifierConnexionFirestore } from '../../services/firestoreService';

/**
 * Hook pour configurer Firestore
 */
export const useFirestoreConfig = () => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const configureFirestore = async () => {
      try {
        console.log('Configuration Firestore en cours...');
        
        // Attendre un peu pour laisser Firestore s'initialiser
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Vérifier la connexion
        const isConnected = await verifierConnexionFirestore();
        
        if (isConnected) {
          console.log('Firestore configuré avec succès');
          setIsConfigured(true);
        } else {
          throw new Error('Impossible de configurer Firestore');
        }
      } catch (err) {
        console.error('Erreur lors de la configuration Firestore:', err);
        setError(err.message);
        // Ne pas bloquer l'application si Firestore échoue
        setIsConfigured(true);
      }
    };

    configureFirestore();
  }, []);

  return { isConfigured, error };
};

/**
 * Composant de configuration Firestore
 */
const FirestoreConfig = ({ children }) => {
  const { isConfigured, error } = useFirestoreConfig();

  if (error) {
    console.warn('Avertissement Firestore:', error);
  }

  // Toujours rendre les enfants, même si Firestore n'est pas configuré
  return children;
};

export default FirestoreConfig;
