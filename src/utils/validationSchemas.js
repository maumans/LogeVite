/**
 * Schémas de validation Yup pour LogeVite
 * 
 * Validation complète des formulaires avec messages d'erreur en français
 * et gestion des erreurs Firebase
 */

import * as yup from 'yup';

// Messages d'erreur personnalisés en français
const messages = {
  required: 'Ce champ est obligatoire',
  email: 'Adresse email invalide',
  min: 'Ce champ doit contenir au moins {{min}} caractères',
  max: 'Ce champ ne peut pas dépasser {{max}} caractères',
  matches: 'Format invalide',
  oneOf: 'Les valeurs ne correspondent pas',
  phone: 'Numéro de téléphone invalide',
  password: 'Mot de passe trop faible',
  confirmPassword: 'Les mots de passe ne correspondent pas'
};

// Validation du numéro de téléphone guinéen
const phoneRegex = /^(?:(?:\+224|224|00224)?)(?:6[0-9]{8}|7[0-9]{8})$/;

// Validation de la force du mot de passe
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

/**
 * Schéma de validation pour la connexion email
 */
export const schemaConnexionEmail = yup.object().shape({
  email: yup
    .string()
    .required('L\'email est obligatoire')
    .email('Format d\'email invalide'),

  motDePasse: yup
    .string()
    .required('Le mot de passe est obligatoire')
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
});

/**
 * Schéma de validation pour la connexion téléphone
 */
export const schemaConnexionTelephone = yup.object().shape({
  telephone: yup
    .string()
    .required('Le numéro de téléphone est obligatoire')
    .matches(phoneRegex, 'Numéro de téléphone guinéen invalide'),

  codeSMS: yup
    .string()
    .when('etape', {
      is: 2,
      then: (schema) => schema
        .required('Le code SMS est obligatoire')
        .length(6, 'Le code SMS doit contenir 6 chiffres')
        .matches(/^\d{6}$/, 'Le code SMS doit contenir uniquement des chiffres'),
      otherwise: (schema) => schema.optional()
    })
});

/**
 * Schéma de validation pour l'inscription
 */
export const inscriptionSchema = yup.object().shape({
  prenom: yup
    .string()
    .required(messages.required)
    .min(2, messages.min)
    .max(50, messages.max)
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le prénom ne peut contenir que des lettres, espaces, tirets et apostrophes'),

  nom: yup
    .string()
    .required(messages.required)
    .min(2, messages.min)
    .max(50, messages.max)
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes'),

  email: yup
    .string()
    .required(messages.required)
    .email(messages.email)
    .max(100, messages.max),

  telephone: yup
    .string()
    .required(messages.required)
    .matches(phoneRegex, 'Numéro de téléphone guinéen invalide (ex: +224 6XX XXX XXX)'),

  motDePasse: yup
    .string()
    .required(messages.required)
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .matches(
      passwordRegex,
      'Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial'
    )
    .max(128, messages.max),

  confirmerMotDePasse: yup
    .string()
    .required(messages.required)
    .oneOf([yup.ref('motDePasse')], messages.confirmPassword),

  typeUtilisateur: yup
    .string()
    .required(messages.required)
    .oneOf(['particulier', 'professionnel'], 'Type d\'utilisateur invalide'),

  typeProfessionnel: yup
    .string()
    .when('typeUtilisateur', {
      is: 'professionnel',
      then: (schema) => schema
        .required('Type de professionnel requis')
        .oneOf(['agence', 'demarcheur', 'promoteur', 'consultant'], 'Type de professionnel invalide'),
      otherwise: (schema) => schema.notRequired(),
    }),

  nomEntreprise: yup
    .string()
    .when('typeUtilisateur', {
      is: 'professionnel',
      then: (schema) => schema
        .required('Nom de l\'entreprise requis')
        .min(2, messages.min)
        .max(100, messages.max),
      otherwise: (schema) => schema.notRequired(),
    }),

  descriptionEntreprise: yup
    .string()
    .when('typeUtilisateur', {
      is: 'professionnel',
      then: (schema) => schema
        .max(500, 'La description ne peut pas dépasser 500 caractères'),
      otherwise: (schema) => schema.notRequired(),
    }),

  accepteConditions: yup
    .boolean()
    .oneOf([true], 'Vous devez accepter les conditions d\'utilisation'),

  acceptePolitiqueConfidentialite: yup
    .boolean()
    .oneOf([true], 'Vous devez accepter la politique de confidentialité')
});

/**
 * Schéma de validation pour la connexion
 */
export const connexionSchema = yup.object().shape({
  email: yup
    .string()
    .required(messages.required)
    .email(messages.email),

  motDePasse: yup
    .string()
    .required(messages.required)
    .min(1, 'Le mot de passe est requis')
});

/**
 * Schéma de validation pour la connexion par téléphone
 */
export const connexionTelephoneSchema = yup.object().shape({
  telephone: yup
    .string()
    .required(messages.required)
    .matches(phoneRegex, 'Numéro de téléphone guinéen invalide'),

  codeSMS: yup
    .string()
    .required('Code SMS requis')
    .length(6, 'Le code SMS doit contenir exactement 6 chiffres')
    .matches(/^\d{6}$/, 'Le code SMS ne doit contenir que des chiffres')
});

/**
 * Schéma de validation pour la réinitialisation du mot de passe
 */
export const reinitialisationMotDePasseSchema = yup.object().shape({
  email: yup
    .string()
    .required(messages.required)
    .email(messages.email)
});

/**
 * Schéma de validation pour la modification du profil
 */
export const modificationProfilSchema = yup.object().shape({
  prenom: yup
    .string()
    .min(2, messages.min)
    .max(50, messages.max)
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le prénom ne peut contenir que des lettres, espaces, tirets et apostrophes'),

  nom: yup
    .string()
    .min(2, messages.min)
    .max(50, messages.max)
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes'),

  telephone: yup
    .string()
    .matches(phoneRegex, 'Numéro de téléphone guinéen invalide'),

  biographie: yup
    .string()
    .max(1000, 'La biographie ne peut pas dépasser 1000 caractères'),

  localisation: yup
    .object().shape({
      ville: yup.string().max(100, messages.max),
      region: yup.string().max(100, messages.max),
      pays: yup.string().max(100, messages.max)
    })
});

/**
 * Schéma de validation pour la création d'annonce
 */
export const annonceSchema = yup.object().shape({
  titre: yup
    .string()
    .required(messages.required)
    .min(10, 'Le titre doit contenir au moins 10 caractères')
    .max(100, 'Le titre ne peut pas dépasser 100 caractères'),

  description: yup
    .string()
    .required(messages.required)
    .min(50, 'La description doit contenir au moins 50 caractères')
    .max(2000, 'La description ne peut pas dépasser 2000 caractères'),

  prix: yup
    .number()
    .required(messages.required)
    .positive('Le prix doit être positif')
    .max(999999999, 'Le prix est trop élevé'),

  surface: yup
    .number()
    .required(messages.required)
    .positive('La surface doit être positive')
    .max(999999, 'La surface est trop élevée'),

  nombreChambres: yup
    .number()
    .min(0, 'Le nombre de chambres ne peut pas être négatif')
    .max(20, 'Le nombre de chambres est trop élevé'),

  nombreSallesDeBain: yup
    .number()
    .min(0, 'Le nombre de salles de bain ne peut pas être négatif')
    .max(20, 'Le nombre de salles de bain est trop élevé'),

  adresse: yup
    .object().shape({
      rue: yup.string().required('Adresse requise'),
      ville: yup.string().required('Ville requise'),
      region: yup.string().required('Région requise'),
      codePostal: yup.string().max(10, 'Code postal trop long')
    })
});

/**
 * Validation personnalisée pour la force du mot de passe
 */
export const validerForceMotDePasse = (motDePasse) => {
  const resultats = {
    longueur: motDePasse.length >= 8,
    minuscule: /[a-z]/.test(motDePasse),
    majuscule: /[A-Z]/.test(motDePasse),
    chiffre: /\d/.test(motDePasse),
    caractereSpecial: /[@$!%*?&]/.test(motDePasse)
  };

  const score = Object.values(resultats).filter(Boolean).length;
  const force = score < 3 ? 'faible' : score < 4 ? 'moyenne' : 'forte';

  return {
    score,
    force,
    resultats,
    isValid: score >= 4
  };
};

/**
 * Validation du numéro de téléphone guinéen
 */
export const validerTelephoneGuinee = (telephone) => {
  return phoneRegex.test(telephone);
};

/**
 * Validation de l'email
 */
export const validerEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Nettoyer et formater un numéro de téléphone guinéen
 */
export const formaterTelephoneGuinee = (telephone) => {
  // Supprimer tous les caractères non numériques
  const numeros = telephone.replace(/\D/g, '');
  
  // Ajouter le préfixe +224 si nécessaire
  if (numeros.startsWith('224')) {
    return `+${numeros}`;
  } else if (numeros.startsWith('6') || numeros.startsWith('7')) {
    return `+224${numeros}`;
  } else if (numeros.length === 9 && (numeros.startsWith('6') || numeros.startsWith('7'))) {
    return `+224${numeros}`;
  }
  
  return telephone;
};

export default {
  inscriptionSchema,
  connexionSchema,
  connexionTelephoneSchema,
  reinitialisationMotDePasseSchema,
  modificationProfilSchema,
  annonceSchema,
  validerForceMotDePasse,
  validerTelephoneGuinee,
  validerEmail,
  formaterTelephoneGuinee
};
