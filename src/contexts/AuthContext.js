/**
 * Contexte d'Authentification LogeVite
 * 
 * Fournit l'état d'authentification à toute l'application :
 * - Utilisateur connecté/déconnecté
 * - Données du profil utilisateur
 * - Fonctions d'authentification
 * - État de chargement
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { 
  recupererUtilisateur, 
  seDeconnecter, 
  sinscrireEmail, 
  seConnecterEmail,
  envoyerCodeSMS,
  seConnecterTelephone,
  seConnecterGoogle,
  seConnecterFacebook,
  recupererMotDePasse,
  mettreAJourProfil,
  recupererProfil
} from '../services/authService';

// Création du contexte
const AuthContext = createContext();

/**
 * Hook personnalisé pour utiliser le contexte d'authentification
 * @returns {object} Contexte d'authentification
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
};

/**
 * Fournisseur du contexte d'authentification
 * @param {React.ReactNode} children - Composants enfants
 */
export const AuthProvider = ({ children }) => {
  // États locaux
  const [utilisateur, setUtilisateur] = useState(null);
  const [profilUtilisateur, setProfilUtilisateur] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // Écouter les changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          // Utilisateur connecté
          setUtilisateur(user);
          
          // Récupérer les données du profil depuis Firestore
          try {
            const resultat = await recupererUtilisateur(user.uid);
            if (resultat.success) {
              setProfilUtilisateur(resultat.data);
            } else {
              console.warn('Profil non trouvé:', resultat.error);
              setProfilUtilisateur(null);
            }
          } catch (error) {
            console.warn('Erreur récupération profil:', error);
            // Profil non trouvé, sera créé lors de la première utilisation
            setProfilUtilisateur(null);
          }
        } else {
          // Utilisateur déconnecté
          setUtilisateur(null);
          setProfilUtilisateur(null);
        }
      } catch (error) {
        console.error('Erreur contexte auth:', error);
        setErreur(error.message);
      } finally {
        setChargement(false);
      }
    });

    // Nettoyage de l'écouteur
    return () => unsubscribe();
  }, []);

  // Fonction pour mettre à jour le profil utilisateur
  const mettreAJourProfilLocal = (nouvellesDonnees) => {
    setProfilUtilisateur(prev => ({
      ...(prev || {}),
      ...nouvellesDonnees
    }));
  };

  // Fonction pour effacer l'erreur
  const effacerErreur = () => {
    setErreur(null);
  };

  // Valeur du contexte
  const valeur = {
    // États
    utilisateur,
    profilUtilisateur,
    chargement,
    erreur,
    
    // Fonctions d'authentification
    seDeconnecter,
    sinscrireEmail,
    seConnecterEmail,
    envoyerCodeSMS,
    seConnecterTelephone,
    seConnecterGoogle,
    seConnecterFacebook,
    recupererMotDePasse,
    mettreAJourProfil,
    recupererProfil,
    
    // Fonctions locales
    mettreAJourProfilLocal,
    effacerErreur,
    
    // Utilitaires
    estConnecte: !!utilisateur,
    aProfilComplet: profilUtilisateur?.profilComplet || false,
    // Alias pour compatibilité
    user: utilisateur,
  };

  return (
    <AuthContext.Provider value={valeur}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
