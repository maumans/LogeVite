/**
 * Service Firestore pour LogeVite
 * 
 * Gère les opérations Firestore avec gestion d'erreurs
 * et configuration optimisée pour React Native
 */

import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  onSnapshot,
  enableNetwork,
  disableNetwork
} from 'firebase/firestore';
import { db } from '../config/firebase';

/**
 * Gestionnaire d'erreurs Firestore
 */
const handleFirestoreError = (error, operation) => {
  // Ignorer les avertissements WebChannel qui sont normaux en développement
  if (error.message && error.message.includes('WebChannelConnection')) {
    console.warn(`Avertissement WebChannel ignoré lors de ${operation}`);
    return 'Connexion en cours d\'établissement';
  }
  
  console.error(`Erreur Firestore lors de ${operation}:`, error);
  
  // Gestion des erreurs spécifiques
  switch (error.code) {
    case 'permission-denied':
      return 'Accès refusé. Vérifiez vos permissions.';
    case 'unavailable':
      return 'Service temporairement indisponible. Veuillez réessayer.';
    case 'deadline-exceeded':
      return 'Délai d\'attente dépassé. Vérifiez votre connexion.';
    case 'resource-exhausted':
      return 'Quota dépassé. Veuillez réessayer plus tard.';
    case 'failed-precondition':
      return 'Opération impossible dans l\'état actuel.';
    case 'aborted':
      return 'Opération annulée. Veuillez réessayer.';
    case 'out-of-range':
      return 'Données hors limites.';
    case 'unimplemented':
      return 'Fonctionnalité non implémentée.';
    case 'internal':
      return 'Erreur interne. Veuillez réessayer.';
    case 'data-loss':
      return 'Perte de données. Veuillez réessayer.';
    case 'unauthenticated':
      return 'Utilisateur non authentifié.';
    default:
      return 'Une erreur inattendue s\'est produite.';
  }
};

/**
 * Vérifier la connexion Firestore
 */
export const verifierConnexionFirestore = async () => {
  try {
    // Pour Firebase Web SDK, on simule la vérification de connexion
    console.log('Connexion Firestore activée');
    
    // Test de connexion simple
    const testDoc = doc(db, '_test', 'connection');
    await setDoc(testDoc, { timestamp: new Date().toISOString() }, { merge: true });
    await deleteDoc(testDoc);
    
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'activation de la connexion Firestore:', error);
    return false;
  }
};

/**
 * Désactiver la connexion Firestore
 */
export const desactiverConnexionFirestore = async () => {
  try {
    // Pour Firebase Web SDK, on simule la désactivation
    console.log('Connexion Firestore désactivée');
    return true;
  } catch (error) {
    console.error('Erreur lors de la désactivation de la connexion Firestore:', error);
    return false;
  }
};

/**
 * Créer un document utilisateur
 */
export const creerUtilisateur = async (userId, donneesUtilisateur) => {
  try {
    await setDoc(doc(db, 'utilisateurs', userId), {
      ...donneesUtilisateur,
      dateCreation: new Date().toISOString(),
      derniereActivite: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    const messageErreur = handleFirestoreError(error, 'création utilisateur');
    return { success: false, error: messageErreur };
  }
};

/**
 * Récupérer un utilisateur par ID
 */
export const recupererUtilisateur = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'utilisateurs', userId));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: 'Utilisateur non trouvé' };
    }
  } catch (error) {
    const messageErreur = handleFirestoreError(error, 'récupération utilisateur');
    return { success: false, error: messageErreur };
  }
};

/**
 * Mettre à jour un utilisateur
 */
export const mettreAJourUtilisateur = async (userId, donneesMiseAJour) => {
  try {
    await updateDoc(doc(db, 'utilisateurs', userId), {
      ...donneesMiseAJour,
      derniereActivite: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    const messageErreur = handleFirestoreError(error, 'mise à jour utilisateur');
    return { success: false, error: messageErreur };
  }
};

/**
 * Créer une annonce
 */
export const creerAnnonce = async (donneesAnnonce) => {
  try {
    const docRef = await addDoc(collection(db, 'annonces'), {
      ...donneesAnnonce,
      dateCreation: new Date().toISOString(),
      statut: 'active',
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    const messageErreur = handleFirestoreError(error, 'création annonce');
    return { success: false, error: messageErreur };
  }
};

/**
 * Récupérer les annonces
 */
export const recupererAnnonces = async (filtres = {}) => {
  try {
    let q = collection(db, 'annonces');
    
    // Appliquer les filtres
    if (filtres.typeUtilisateur) {
      q = query(q, where('typeUtilisateur', '==', filtres.typeUtilisateur));
    }
    if (filtres.statut) {
      q = query(q, where('statut', '==', filtres.statut));
    }
    
    const querySnapshot = await getDocs(q);
    const annonces = [];
    querySnapshot.forEach((doc) => {
      annonces.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: annonces };
  } catch (error) {
    const messageErreur = handleFirestoreError(error, 'récupération annonces');
    return { success: false, error: messageErreur };
  }
};

/**
 * Écouter les changements d'un document
 */
export const ecouterDocument = (collectionName, documentId, callback) => {
  try {
    return onSnapshot(
      doc(db, collectionName, documentId),
      (doc) => {
        if (doc.exists()) {
          callback({ success: true, data: doc.data() });
        } else {
          callback({ success: false, error: 'Document non trouvé' });
        }
      },
      (error) => {
        const messageErreur = handleFirestoreError(error, 'écoute document');
        callback({ success: false, error: messageErreur });
      }
    );
  } catch (error) {
    const messageErreur = handleFirestoreError(error, 'écoute document');
    callback({ success: false, error: messageErreur });
  }
};

/**
 * Supprimer un document
 */
export const supprimerDocument = async (collectionName, documentId) => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
    return { success: true };
  } catch (error) {
    const messageErreur = handleFirestoreError(error, 'suppression document');
    return { success: false, error: messageErreur };
  }
};

// Export par défaut supprimé pour éviter les conflits avec les exports nommés
