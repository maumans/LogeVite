/**
 * Hook personnalisé pour la gestion des profils utilisateurs
 * Centralise toute la logique de gestion des profils
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useProfil = () => {
  const { utilisateur, profilUtilisateur, mettreAJourProfilLocal, mettreAJourProfil } = useAuth();
  const [formData, setFormData] = useState({
    // Informations de base
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    photoProfil: null,
    
    // Type et statut
    typeUtilisateur: '',
    profilComplet: false,
    
    // Localisation
    localisation: {
      ville: '',
      quartier: '',
      commune: '',
      pays: 'Guinée'
    },
    
    // Informations professionnelles (pour professionnels et mixte)
    professionnel: {
      nomEntreprise: '',
      descriptionEntreprise: '',
      adresseEntreprise: '',
      typeProfessionnel: '',
      specialites: [],
      numeroAgrement: '',
      experience: '',
      reseauxSociaux: {
        facebook: '',
        whatsapp: '',
        telegram: '',
        siteWeb: ''
      }
    },
    
    // Préférences de recherche (pour particuliers et mixte)
    preferences: {
      typeBien: [],
      budgetMin: '',
      budgetMax: '',
      surfaceMin: '',
      surfaceMax: '',
      nombreChambres: '',
      localisationPreferentielle: [],
      criteresSpeciaux: []
    },
    
    // Capacités de publication (pour professionnels et mixte)
    capacitesPublication: {
      peutPublier: false,
      limiteAnnonces: 0,
      annoncesPubliees: 0,
      typePublication: [] // 'vente', 'location', 'achat', 'recherche'
    },
    
    // Métadonnées
    dateCreation: '',
    derniereMiseAJour: '',
    statutVerification: 'en_attente' // 'en_attente', 'verifie', 'rejete'
  });

  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState(null);

  /**
   * Initialiser le formulaire avec les données existantes
   */
  useEffect(() => {
    if (profilUtilisateur) {
      setFormData(prev => ({
        ...prev,
        // Informations de base
        prenom: profilUtilisateur.prenom || '',
        nom: profilUtilisateur.nom || '',
        telephone: profilUtilisateur.telephone || '',
        email: profilUtilisateur.email || '',
        photoProfil: profilUtilisateur.photoProfil || null,
        
        // Type et statut
        typeUtilisateur: profilUtilisateur.typeUtilisateur || '',
        profilComplet: profilUtilisateur.profilComplet || false,
        
        // Localisation
        localisation: {
          ville: profilUtilisateur.localisation?.ville || '',
          quartier: profilUtilisateur.localisation?.quartier || '',
          commune: profilUtilisateur.localisation?.commune || '',
          pays: profilUtilisateur.localisation?.pays || 'Guinée'
        },
        
        // Informations professionnelles
        professionnel: {
          nomEntreprise: profilUtilisateur.professionnel?.nomEntreprise || '',
          descriptionEntreprise: profilUtilisateur.professionnel?.descriptionEntreprise || '',
          adresseEntreprise: profilUtilisateur.professionnel?.adresseEntreprise || '',
          typeProfessionnel: profilUtilisateur.professionnel?.typeProfessionnel || '',
          specialites: profilUtilisateur.professionnel?.specialites || [],
          numeroAgrement: profilUtilisateur.professionnel?.numeroAgrement || '',
          experience: profilUtilisateur.professionnel?.experience || '',
          reseauxSociaux: {
            facebook: profilUtilisateur.professionnel?.reseauxSociaux?.facebook || '',
            whatsapp: profilUtilisateur.professionnel?.reseauxSociaux?.whatsapp || '',
            telegram: profilUtilisateur.professionnel?.reseauxSociaux?.telegram || '',
            siteWeb: profilUtilisateur.professionnel?.reseauxSociaux?.siteWeb || ''
          }
        },
        
        // Préférences de recherche
        preferences: {
          typeBien: profilUtilisateur.preferences?.typeBien || [],
          budgetMin: profilUtilisateur.preferences?.budgetMin || '',
          budgetMax: profilUtilisateur.preferences?.budgetMax || '',
          surfaceMin: profilUtilisateur.preferences?.surfaceMin || '',
          surfaceMax: profilUtilisateur.preferences?.surfaceMax || '',
          nombreChambres: profilUtilisateur.preferences?.nombreChambres || '',
          localisationPreferentielle: profilUtilisateur.preferences?.localisationPreferentielle || [],
          criteresSpeciaux: profilUtilisateur.preferences?.criteresSpeciaux || []
        },
        
        // Capacités de publication
        capacitesPublication: {
          peutPublier: profilUtilisateur.capacitesPublication?.peutPublier || false,
          limiteAnnonces: profilUtilisateur.capacitesPublication?.limiteAnnonces || 0,
          annoncesPubliees: profilUtilisateur.capacitesPublication?.annoncesPubliees || 0,
          typePublication: profilUtilisateur.capacitesPublication?.typePublication || []
        },
        
        // Métadonnées
        dateCreation: profilUtilisateur.dateCreation || new Date().toISOString(),
        derniereMiseAJour: profilUtilisateur.derniereMiseAJour || new Date().toISOString(),
        statutVerification: profilUtilisateur.statutVerification || 'en_attente'
      }));
    }
  }, [profilUtilisateur]);

  /**
   * Mettre à jour un champ simple
   */
  const mettreAJourChamp = useCallback((champ, valeur) => {
    setFormData(prev => ({
      ...prev,
      [champ]: valeur
    }));
  }, []);

  /**
   * Mettre à jour un champ de localisation
   */
  const mettreAJourLocalisation = useCallback((champ, valeur) => {
    setFormData(prev => ({
      ...prev,
      localisation: {
        ...(prev?.localisation || {}),
        [champ]: valeur
      }
    }));
  }, []);

  /**
   * Mettre à jour un champ professionnel
   */
  const mettreAJourProfessionnel = useCallback((champ, valeur) => {
    setFormData(prev => ({
      ...prev,
      professionnel: {
        ...(prev?.professionnel || {}),
        [champ]: valeur
      }
    }));
  }, []);

  /**
   * Mettre à jour un champ de préférences
   */
  const mettreAJourPreferences = useCallback((champ, valeur) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...(prev?.preferences || {}),
        [champ]: valeur
      }
    }));
  }, []);

  /**
   * Mettre à jour les réseaux sociaux
   */
  const mettreAJourReseauxSociaux = useCallback((reseau, valeur) => {
    setFormData(prev => ({
      ...prev,
      professionnel: {
        ...(prev?.professionnel || {}),
        reseauxSociaux: {
          ...(prev?.professionnel?.reseauxSociaux || {}),
          [reseau]: valeur
        }
      }
    }));
  }, []);

  /**
   * Toggle une spécialité
   */
  const toggleSpecialite = useCallback((specialiteId) => {
    setFormData(prev => ({
      ...prev,
      professionnel: {
        ...(prev?.professionnel || {}),
        specialites: (prev?.professionnel?.specialites || []).includes(specialiteId)
          ? (prev?.professionnel?.specialites || []).filter(id => id !== specialiteId)
          : [...(prev?.professionnel?.specialites || []), specialiteId]
      }
    }));
  }, []);

  /**
   * Toggle un type de bien
   */
  const toggleTypeBien = useCallback((typeId) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...(prev?.preferences || {}),
        typeBien: (prev?.preferences?.typeBien || []).includes(typeId)
          ? (prev?.preferences?.typeBien || []).filter(id => id !== typeId)
          : [...(prev?.preferences?.typeBien || []), typeId]
      }
    }));
  }, []);

  /**
   * Définir le type d'utilisateur et configurer les capacités
   */
  const definirTypeUtilisateur = useCallback((type) => {
    const capacites = {
      particulier: {
        peutPublier: false,
        limiteAnnonces: 0,
        typePublication: ['recherche']
      },
      professionnel: {
        peutPublier: true,
        limiteAnnonces: -1, // Illimité
        typePublication: ['vente', 'location']
      },
      mixte: {
        peutPublier: true,
        limiteAnnonces: 5,
        typePublication: ['recherche', 'vente', 'location']
      }
    };

    setFormData(prev => ({
      ...prev,
      typeUtilisateur: type,
      capacitesPublication: {
        ...prev.capacitesPublication,
        ...capacites[type]
      }
    }));
  }, []);

  /**
   * Valider le formulaire selon le type d'utilisateur
   */
  const validerFormulaire = useCallback(() => {
    const erreurs = [];

    // Validation de base
    if (!formData.prenom.trim()) erreurs.push('Le prénom est obligatoire');
    if (!formData.nom.trim()) erreurs.push('Le nom est obligatoire');
    if (!formData.telephone.trim()) erreurs.push('Le téléphone est obligatoire');
    if (!formData.localisation.ville.trim()) erreurs.push('La ville est obligatoire');

    // Validation selon le type
    if (formData.typeUtilisateur === 'professionnel' || formData.typeUtilisateur === 'mixte') {
      if (!formData.professionnel.nomEntreprise.trim()) {
        erreurs.push('Le nom de l\'entreprise est obligatoire pour les professionnels');
      }
      if (formData.professionnel.specialites.length === 0) {
        erreurs.push('Sélectionnez au moins une spécialité');
      }
    }

    if (formData.typeUtilisateur === 'particulier' || formData.typeUtilisateur === 'mixte') {
      if (formData.preferences.typeBien.length === 0) {
        erreurs.push('Sélectionnez au moins un type de bien recherché');
      }
    }

    return erreurs;
  }, [formData]);

  /**
   * Sauvegarder le profil
   */
  const sauvegarderProfil = useCallback(async () => {
    const erreurs = validerFormulaire();
    if (erreurs.length > 0) {
      setErreur(erreurs.join('\n'));
      return false;
    }

    setChargement(true);
    setErreur(null);

    try {
      const donneesAMettreAJour = {
        ...formData,
        profilComplet: true,
        derniereMiseAJour: new Date().toISOString()
      };

      await mettreAJourProfil(utilisateur.uid, donneesAMettreAJour);
      mettreAJourProfilLocal(donneesAMettreAJour);
      
      return true;
    } catch (error) {
      setErreur('Erreur lors de la sauvegarde: ' + error.message);
      return false;
    } finally {
      setChargement(false);
    }
  }, [formData, validerFormulaire, utilisateur.uid, mettreAJourProfil, mettreAJourProfilLocal]);

  /**
   * Vérifier si l'utilisateur peut publier des annonces
   */
  const peutPublierAnnonces = useCallback(() => {
    return formData.capacitesPublication.peutPublier && 
           (formData.capacitesPublication.limiteAnnonces === -1 || 
            formData.capacitesPublication.annoncesPubliees < formData.capacitesPublication.limiteAnnonces);
  }, [formData.capacitesPublication]);

  /**
   * Obtenir les informations d'affichage selon le type
   */
  const getInformationsAffichage = useCallback(() => {
    const base = {
      nomComplet: `${formData.prenom} ${formData.nom}`,
      localisation: formData.localisation.ville,
      photoProfil: formData.photoProfil
    };

    switch (formData.typeUtilisateur) {
      case 'particulier':
        return {
          ...base,
          type: 'Particulier',
          description: 'Recherche de biens immobiliers',
          actions: ['rechercher', 'sauvegarder', 'demander']
        };
      
      case 'professionnel':
        return {
          ...base,
          type: 'Professionnel',
          description: formData.professionnel.nomEntreprise || 'Agent immobilier',
          specialites: formData.professionnel.specialites,
          actions: ['publier', 'gérer', 'analyser']
        };
      
      case 'mixte':
        return {
          ...base,
          type: 'Mixte',
          description: 'Recherche et publication (limité)',
          actions: ['rechercher', 'publier', 'gérer'],
          limite: `${formData.capacitesPublication.annoncesPubliees}/${formData.capacitesPublication.limiteAnnonces} annonces`
        };
      
      default:
        return base;
    }
  }, [formData]);

  return {
    // État
    formData,
    chargement,
    erreur,
    
    // Actions
    mettreAJourChamp,
    mettreAJourLocalisation,
    mettreAJourProfessionnel,
    mettreAJourPreferences,
    mettreAJourReseauxSociaux,
    toggleSpecialite,
    toggleTypeBien,
    definirTypeUtilisateur,
    sauvegarderProfil,
    
    // Utilitaires
    validerFormulaire,
    peutPublierAnnonces,
    getInformationsAffichage,
    
    // Getters
    estParticulier: formData.typeUtilisateur === 'particulier',
    estProfessionnel: formData.typeUtilisateur === 'professionnel',
    estMixte: formData.typeUtilisateur === 'mixte',
    profilComplet: formData.profilComplet
  };
};
