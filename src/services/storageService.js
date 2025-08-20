/**
 * Service de gestion du stockage Firebase Storage
 * 
 * Gère l'upload, la suppression et la récupération des fichiers
 * Principalement utilisé pour les photos de profil et les images d'annonces
 */

import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  uploadBytesResumable
} from 'firebase/storage';
import { app } from '../config/firebase';

// Initialiser le service de stockage
const storage = getStorage(app);

/**
 * Upload une photo de profil utilisateur
 * @param {string} userId - ID de l'utilisateur
 * @param {string} uri - URI locale de l'image
 * @param {Function} onProgress - Callback pour suivre le progrès (optionnel)
 * @returns {Promise<string>} URL de téléchargement de l'image
 */
export const uploaderPhotoProfile = async (userId, uri, onProgress = null) => {
  try {
    // Préparer les données de l'image
    const response = await fetch(uri);
    const blob = await response.blob();
    
    // Créer une référence unique pour l'image
    const timestamp = Date.now();
    const filename = `photo_profil_${timestamp}.jpg`;
    const imageRef = ref(storage, `utilisateurs/${userId}/profil/${filename}`);
    
    if (onProgress) {
      // Upload avec suivi du progrès
      const uploadTask = uploadBytesResumable(imageRef, blob);
      
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress);
          },
          (error) => {
            console.error('Erreur upload photo profil:', error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    } else {
      // Upload simple sans suivi
      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    }
  } catch (error) {
    console.error('Erreur lors de l\'upload de la photo de profil:', error);
    throw new Error('Impossible d\'uploader la photo de profil');
  }
};

/**
 * Upload une image d'annonce immobilière
 * @param {string} userId - ID de l'utilisateur propriétaire
 * @param {string} annonceId - ID de l'annonce
 * @param {string} uri - URI locale de l'image
 * @param {number} index - Index de l'image dans la liste
 * @param {Function} onProgress - Callback pour suivre le progrès (optionnel)
 * @returns {Promise<string>} URL de téléchargement de l'image
 */
export const uploaderImageAnnonce = async (userId, annonceId, uri, index = 0, onProgress = null) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    
    const filename = `image_${index}_${Date.now()}.jpg`;
    const imageRef = ref(storage, `annonces/${userId}/${annonceId}/${filename}`);
    
    if (onProgress) {
      const uploadTask = uploadBytesResumable(imageRef, blob);
      
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress, index);
          },
          (error) => {
            console.error('Erreur upload image annonce:', error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    } else {
      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    }
  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image d\'annonce:', error);
    throw new Error('Impossible d\'uploader l\'image');
  }
};

/**
 * Supprimer une image du storage
 * @param {string} imageUrl - URL complète de l'image à supprimer
 * @returns {Promise<void>}
 */
export const supprimerImage = async (imageUrl) => {
  try {
    if (!imageUrl || !imageUrl.includes('firebase')) {
      console.log('URL invalide ou image non hébergée sur Firebase');
      return;
    }
    
    // Extraire le chemin depuis l'URL Firebase
    const urlParts = imageUrl.split('/');
    const bucket = urlParts.find(part => part.includes('appspot.com'));
    const pathIndex = urlParts.indexOf('o') + 1;
    const encodedPath = urlParts.slice(pathIndex).join('/').split('?')[0];
    const path = decodeURIComponent(encodedPath);
    
    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
    
    console.log('Image supprimée avec succès');
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'image:', error);
    // Ne pas faire échouer l'opération si la suppression échoue
  }
};

/**
 * Obtenir l'URL de téléchargement d'une image
 * @param {string} path - Chemin de l'image dans le storage
 * @returns {Promise<string>} URL de téléchargement
 */
export const obtenirUrlImage = async (path) => {
  try {
    const imageRef = ref(storage, path);
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'URL:', error);
    throw new Error('Impossible de récupérer l\'image');
  }
};

/**
 * Nettoyer les anciennes photos de profil d'un utilisateur
 * Garde seulement la photo la plus récente
 * @param {string} userId - ID de l'utilisateur
 * @param {string} currentPhotoUrl - URL de la photo actuelle à conserver
 * @returns {Promise<void>}
 */
export const nettoyerAnciennesPhotos = async (userId, currentPhotoUrl) => {
  try {
    // Cette fonction pourrait être implémentée avec Cloud Functions
    // pour une meilleure performance, mais pour l'instant on laisse
    // Firebase Storage gérer automatiquement
    console.log('Nettoyage des anciennes photos à implémenter');
  } catch (error) {
    console.error('Erreur lors du nettoyage:', error);
  }
};

export default {
  uploaderPhotoProfile,
  uploaderImageAnnonce,
  supprimerImage,
  obtenirUrlImage,
  nettoyerAnciennesPhotos
};
