/**
 * Service d'authentification Firebase pour LogeVite
 * 
 * Gère toutes les méthodes d'authentification :
 * - Email/Mot de passe
 * - Numéro de téléphone (SMS)
 * - Google Sign-In
 * - Facebook Login
 */

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { 
  creerUtilisateur, 
  recupererUtilisateur, 
  mettreAJourUtilisateur 
} from './firestoreService';
import { handleFirebaseError } from '../utils/errorHandler';

// Fournisseurs d'authentification
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Configuration des fournisseurs
googleProvider.addScope('email');
googleProvider.addScope('profile');
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

/**
 * Inscription avec email et mot de passe
 */
export const sinscrireEmail = async (email, motDePasse, donneesProfil) => {
  try {
    // Créer l'utilisateur avec Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, motDePasse);
    const user = userCredential.user;

    // Mettre à jour le profil utilisateur
    await updateProfile(user, {
      displayName: `${donneesProfil.prenom} ${donneesProfil.nom}`,
      photoURL: donneesProfil.photoProfil || null
    });

    // Créer le document utilisateur dans Firestore
    const utilisateurData = {
      id: user.uid,
      prenom: donneesProfil.prenom,
      nom: donneesProfil.nom,
      email: email,
      telephone: donneesProfil.telephone || null,
      typeUtilisateur: donneesProfil.typeUtilisateur || 'particulier',
      typeProfessionnel: donneesProfil.typeProfessionnel || null,
      nomEntreprise: donneesProfil.nomEntreprise || null,
      descriptionEntreprise: donneesProfil.descriptionEntreprise || null,
      biographie: donneesProfil.biographie || null,
      photoProfil: donneesProfil.photoProfil || null,
      logoEntreprise: donneesProfil.logoEntreprise || null,
      localisation: donneesProfil.localisation || null,
      statutVerification: 'en_attente',
      jetonsFCM: [],
      preferences: {
        notifications: {
          correspondances: true,
          messages: true,
          marketing: false
        },
        langue: 'fr'
      },
      statistiques: {
        nombreAnnonces: 0,
        noteMoyenne: 0,
        nombreAvis: 0
      }
    };

    const resultat = await creerUtilisateur(user.uid, utilisateurData);
    if (!resultat.success) {
      console.warn('Erreur Firestore lors de la création du profil:', resultat.error);
      // Ne pas faire échouer l'inscription si Firestore échoue
      // L'utilisateur est créé dans Auth, le profil sera créé plus tard
    }

    return {
      success: true,
      user: user,
      utilisateurData: utilisateurData
    };
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    const errorInfo = handleFirebaseError(error, 'signup');
    // Créer une erreur enrichie avec toutes les informations
    const enrichedError = new Error(errorInfo.message);
    enrichedError.errorInfo = errorInfo;
    enrichedError.code = errorInfo.code;
    enrichedError.severity = errorInfo.severity;
    enrichedError.solution = errorInfo.solution;
    throw enrichedError;
  }
};

/**
 * Connexion avec email et mot de passe
 */
export const seConnecterEmail = async (email, motDePasse) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, motDePasse);
    const user = userCredential.user;

    // Mettre à jour la dernière activité
    const resultat = await mettreAJourUtilisateur(user.uid, {});
    if (!resultat.success) {
      console.warn('Erreur lors de la mise à jour de la dernière activité:', resultat.error);
    }

    return {
      success: true,
      user: user
    };
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    const errorInfo = handleFirebaseError(error, 'login');
    // Créer une erreur enrichie avec toutes les informations
    const enrichedError = new Error(errorInfo.message);
    enrichedError.errorInfo = errorInfo;
    enrichedError.code = errorInfo.code;
    enrichedError.severity = errorInfo.severity;
    enrichedError.solution = errorInfo.solution;
    throw enrichedError;
  }
};

/**
 * Envoi du code SMS de vérification
 */
export const envoyerCodeSMS = async (numeroTelephone) => {
  try {
    // Pour l'instant, simulation de l'envoi SMS
    // TODO: Implémenter Firebase Phone Auth avec recaptcha
    console.log('Envoi SMS simulé pour:', numeroTelephone);
    
    // Simulation d'un délai
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Retourner un ID de vérification simulé
    const verificationId = 'demo-verification-id-' + Date.now();

    return {
      success: true,
      verificationId: verificationId
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi du SMS:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Connexion avec numéro de téléphone
 */
export const seConnecterTelephone = async (numeroTelephone, codeSMS, verificationId) => {
  try {
    // Pour l'instant, simulation de la connexion téléphone
    // TODO: Implémenter Firebase Phone Auth
    console.log('Connexion téléphone simulée:', { numeroTelephone, codeSMS, verificationId });
    
    // Simulation d'un délai
    await new Promise(resolve => setTimeout(resolve, 1500));
    
          // Vérifier le code SMS (simulation)
      if (codeSMS === '123456') {
        return {
          success: true,
          user: {
            uid: 'demo-user-' + Date.now(),
            phoneNumber: numeroTelephone
          },
          shouldRedirect: true // Flag pour indiquer qu'une redirection est nécessaire
        };
      } else {
      throw new Error('Code SMS incorrect. Utilisez 123456 pour la démo.');
    }
  } catch (error) {
    console.error('Erreur lors de la connexion téléphone:', error);
    throw new Error(error.message || getErrorMessage(error.code));
  }
};

/**
 * Connexion avec Google
 */
export const seConnecterGoogle = async () => {
  try {
    // Pour React Native, nous devons utiliser une approche différente
    // car signInWithPopup ne fonctionne pas sur mobile
    // Utilisation d'une approche web pour l'instant
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    // Vérifier si l'utilisateur existe dans Firestore
    const resultatRecherche = await recupererUtilisateur(user.uid);
    
    if (!resultatRecherche.success) {
      // Créer le profil utilisateur
      const utilisateurData = {
        id: user.uid,
        prenom: user.displayName?.split(' ')[0] || 'Utilisateur',
        nom: user.displayName?.split(' ').slice(1).join(' ') || 'Google',
        email: user.email,
        telephone: user.phoneNumber || null,
        typeUtilisateur: 'particulier',
        photoProfil: user.photoURL,
        statutVerification: 'verifie',
        jetonsFCM: [],
        preferences: {
          notifications: {
            correspondances: true,
            messages: true,
            marketing: false
          },
          langue: 'fr'
        },
        statistiques: {
          nombreAnnonces: 0,
          noteMoyenne: 0,
          nombreAvis: 0
        }
      };

      const resultat = await creerUtilisateur(user.uid, utilisateurData);
      if (!resultat.success) {
        console.warn('Erreur lors de la création du profil Google:', resultat.error);
      }
    } else {
      // Mettre à jour la dernière activité
      const resultat = await mettreAJourUtilisateur(user.uid, {});
      if (!resultat.success) {
        console.warn('Erreur lors de la mise à jour de la dernière activité:', resultat.error);
      }
    }

    return {
      success: true,
      user: user
    };
  } catch (error) {
    console.error('Erreur lors de la connexion Google:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Connexion avec Facebook
 */
export const seConnecterFacebook = async () => {
  try {
    // Pour React Native, nous devons utiliser une approche différente
    // car signInWithPopup ne fonctionne pas sur mobile
    // Utilisation d'une approche web pour l'instant
    const userCredential = await signInWithPopup(auth, facebookProvider);
    const user = userCredential.user;

    // Vérifier si l'utilisateur existe dans Firestore
    const resultatRecherche = await recupererUtilisateur(user.uid);
    
    if (!resultatRecherche.success) {
      // Créer le profil utilisateur
      const utilisateurData = {
        id: user.uid,
        prenom: user.displayName?.split(' ')[0] || 'Utilisateur',
        nom: user.displayName?.split(' ').slice(1).join(' ') || 'Facebook',
        email: user.email,
        telephone: user.phoneNumber || null,
        typeUtilisateur: 'particulier',
        photoProfil: user.photoURL,
        statutVerification: 'verifie',
        jetonsFCM: [],
        preferences: {
          notifications: {
            correspondances: true,
            messages: true,
            marketing: false
          },
          langue: 'fr'
        },
        statistiques: {
          nombreAnnonces: 0,
          noteMoyenne: 0,
          nombreAvis: 0
        }
      };

      const resultat = await creerUtilisateur(user.uid, utilisateurData);
      if (!resultat.success) {
        console.warn('Erreur lors de la création du profil Facebook:', resultat.error);
      }
    } else {
      // Mettre à jour la dernière activité
      const resultat = await mettreAJourUtilisateur(user.uid, {});
      if (!resultat.success) {
        console.warn('Erreur lors de la mise à jour de la dernière activité:', resultat.error);
      }
    }

    return {
      success: true,
      user: user
    };
  } catch (error) {
    console.error('Erreur lors de la connexion Facebook:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Déconnexion
 */
export const seDeconnecter = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Récupération de mot de passe
 */
export const recupererMotDePasse = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la récupération de mot de passe:', error);
    throw new Error(getErrorMessage(error.code));
  }
};

/**
 * Mise à jour du profil utilisateur
 */
export const mettreAJourProfil = async (userId, donneesProfil) => {
  try {
    const resultat = await mettreAJourUtilisateur(userId, donneesProfil);
    if (!resultat.success) {
      throw new Error(resultat.error);
    }
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    throw new Error(error.message || getErrorMessage(error.code));
  }
};

/**
 * Récupération du profil utilisateur
 */
export const recupererProfil = async (userId) => {
  try {
    const resultat = await recupererUtilisateur(userId);
    if (!resultat.success) {
      throw new Error(resultat.error);
    }
    return {
      success: true,
      profil: resultat.data
    };
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw new Error(error.message || getErrorMessage(error.code));
  }
};

/**
 * Écouteur d'état d'authentification
 */
export const ecouterEtatAuthentification = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Conversion des codes d'erreur Firebase en messages français
 */
const getErrorMessage = (errorCode) => {
  const errorMessages = {
    'auth/user-not-found': 'Aucun utilisateur trouvé avec cet email',
    'auth/wrong-password': 'Mot de passe incorrect',
    'auth/email-already-in-use': 'Cette adresse email est déjà utilisée',
    'auth/weak-password': 'Le mot de passe doit contenir au moins 6 caractères',
    'auth/invalid-email': 'Adresse email invalide',
    'auth/too-many-requests': 'Trop de tentatives. Veuillez réessayer plus tard',
    'auth/network-request-failed': 'Erreur de connexion réseau',
    'auth/invalid-verification-code': 'Code de vérification invalide',
    'auth/invalid-verification-id': 'ID de vérification invalide',
    'auth/quota-exceeded': 'Quota SMS dépassé. Veuillez réessayer plus tard',
    'auth/account-exists-with-different-credential': 'Un compte existe déjà avec cet email',
    'auth/popup-closed-by-user': 'Fenêtre de connexion fermée',
    'auth/cancelled-popup-request': 'Connexion annulée',
    'auth/popup-blocked': 'Fenêtre de connexion bloquée par le navigateur',
    'auth/operation-not-allowed': 'Cette méthode de connexion n\'est pas autorisée',
    'auth/user-disabled': 'Ce compte a été désactivé',
    'auth/user-token-expired': 'Session expirée. Veuillez vous reconnecter',
    'auth/requires-recent-login': 'Connexion récente requise pour cette action'
  };

  return errorMessages[errorCode] || 'Une erreur inattendue s\'est produite';
};
