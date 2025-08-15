import * as yup from 'yup';
import { PHONE_FORMATS, VALIDATION } from '../constants';

/**
 * Validate Guinea phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid
 */
export const isValidGuineaPhone = (phone) => {
  if (!phone) return false;
  
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it starts with country code
  let number = cleaned;
  if (cleaned.startsWith('224')) {
    number = cleaned.slice(3);
  }
  
  // Must be 8 digits
  if (number.length !== 8) return false;
  
  // Check if starts with valid operator prefix
  const prefix = number.substring(0, 2);
  const allPrefixes = Object.values(PHONE_FORMATS.OPERATORS).flat();
  
  return allPrefixes.includes(prefix);
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with score and feedback
 */
export const validatePasswordStrength = (password) => {
  if (!password) {
    return { score: 0, feedback: 'Mot de passe requis' };
  }
  
  let score = 0;
  const feedback = [];
  
  // Length check
  if (password.length >= VALIDATION.PASSWORD_MIN_LENGTH) {
    score += 1;
  } else {
    feedback.push(`Au moins ${VALIDATION.PASSWORD_MIN_LENGTH} caractères`);
  }
  
  // Lowercase check
  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Au moins une lettre minuscule');
  }
  
  // Uppercase check
  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Au moins une lettre majuscule');
  }
  
  // Number check
  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('Au moins un chiffre');
  }
  
  // Special character check
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Au moins un caractère spécial');
  }
  
  const strength = score <= 2 ? 'Faible' : score <= 3 ? 'Moyen' : 'Fort';
  
  return {
    score,
    strength,
    feedback: feedback.length > 0 ? feedback.join(', ') : 'Mot de passe valide',
    isValid: score >= 3,
  };
};

// Yup validation schemas

// User registration schema
export const userRegistrationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Prénom requis')
    .min(2, 'Prénom trop court')
    .max(50, 'Prénom trop long'),
  
  lastName: yup
    .string()
    .required('Nom requis')
    .min(2, 'Nom trop court')
    .max(50, 'Nom trop long'),
  
  email: yup
    .string()
    .email('Email invalide')
    .required('Email requis'),
  
  phone: yup
    .string()
    .required('Numéro de téléphone requis')
    .test('valid-guinea-phone', 'Numéro de téléphone guinéen invalide', isValidGuineaPhone),
  
  password: yup
    .string()
    .required('Mot de passe requis')
    .min(VALIDATION.PASSWORD_MIN_LENGTH, `Au moins ${VALIDATION.PASSWORD_MIN_LENGTH} caractères`)
    .test('password-strength', 'Mot de passe trop faible', (value) => {
      const result = validatePasswordStrength(value);
      return result.isValid;
    }),
  
  confirmPassword: yup
    .string()
    .required('Confirmation du mot de passe requise')
    .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas'),
  
  userType: yup
    .string()
    .required('Type d\'utilisateur requis')
    .oneOf(['particulier', 'professionnel'], 'Type d\'utilisateur invalide'),
  
  professionalType: yup
    .string()
    .when('userType', {
      is: 'professionnel',
      then: (schema) => schema
        .required('Type de professionnel requis')
        .oneOf(['agence', 'demarcheur', 'promoteur'], 'Type de professionnel invalide'),
      otherwise: (schema) => schema.notRequired(),
    }),
  
  companyName: yup
    .string()
    .when('userType', {
      is: 'professionnel',
      then: (schema) => schema
        .required('Nom de l\'entreprise requis')
        .min(2, 'Nom d\'entreprise trop court')
        .max(100, 'Nom d\'entreprise trop long'),
      otherwise: (schema) => schema.notRequired(),
    }),
  
  acceptTerms: yup
    .boolean()
    .required('Vous devez accepter les conditions d\'utilisation')
    .oneOf([true], 'Vous devez accepter les conditions d\'utilisation'),
});

// Login schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email ou téléphone requis'),
  
  password: yup
    .string()
    .required('Mot de passe requis'),
});

// Listing creation schema
export const listingSchema = yup.object().shape({
  title: yup
    .string()
    .required('Titre requis')
    .min(10, 'Titre trop court')
    .max(100, 'Titre trop long'),
  
  description: yup
    .string()
    .required('Description requise')
    .min(20, 'Description trop courte')
    .max(VALIDATION.MAX_DESCRIPTION_LENGTH, 'Description trop longue'),
  
  propertyType: yup
    .string()
    .required('Type de bien requis')
    .oneOf(
      ['appartement', 'maison', 'villa', 'terrain', 'bureau', 'commerce', 'entrepot'],
      'Type de bien invalide'
    ),
  
  transactionType: yup
    .string()
    .required('Type de transaction requis')
    .oneOf(['vente', 'location'], 'Type de transaction invalide'),
  
  price: yup
    .number()
    .required('Prix requis')
    .min(VALIDATION.MIN_PRICE, `Prix minimum: ${VALIDATION.MIN_PRICE} GNF`)
    .max(VALIDATION.MAX_PRICE, `Prix maximum: ${VALIDATION.MAX_PRICE} GNF`),
  
  surface: yup
    .number()
    .required('Surface requise')
    .min(1, 'Surface minimum: 1 m²')
    .max(100000, 'Surface maximum: 100,000 m²'),
  
  rooms: yup
    .number()
    .min(0, 'Nombre de pièces invalide')
    .max(50, 'Nombre de pièces maximum: 50'),
  
  bathrooms: yup
    .number()
    .min(0, 'Nombre de salles de bain invalide')
    .max(20, 'Nombre de salles de bain maximum: 20'),
  
  location: yup.object().shape({
    address: yup
      .string()
      .required('Adresse requise')
      .min(5, 'Adresse trop courte')
      .max(200, 'Adresse trop longue'),
    
    city: yup
      .string()
      .required('Ville requise'),
    
    commune: yup
      .string()
      .required('Commune requise'),
    
    latitude: yup
      .number()
      .required('Coordonnées GPS requises')
      .min(-90, 'Latitude invalide')
      .max(90, 'Latitude invalide'),
    
    longitude: yup
      .number()
      .required('Coordonnées GPS requises')
      .min(-180, 'Longitude invalide')
      .max(180, 'Longitude invalide'),
  }),
  
  images: yup
    .array()
    .min(1, 'Au moins une image requise')
    .max(VALIDATION.MAX_IMAGES_PER_LISTING, `Maximum ${VALIDATION.MAX_IMAGES_PER_LISTING} images`),
});

// Request creation schema
export const requestSchema = yup.object().shape({
  title: yup
    .string()
    .required('Titre requis')
    .min(10, 'Titre trop court')
    .max(100, 'Titre trop long'),
  
  description: yup
    .string()
    .required('Description requise')
    .min(20, 'Description trop courte')
    .max(VALIDATION.MAX_DESCRIPTION_LENGTH, 'Description trop longue'),
  
  propertyType: yup
    .string()
    .required('Type de bien requis')
    .oneOf(
      ['appartement', 'maison', 'villa', 'terrain', 'bureau', 'commerce', 'entrepot'],
      'Type de bien invalide'
    ),
  
  transactionType: yup
    .string()
    .required('Type de transaction requis')
    .oneOf(['vente', 'location'], 'Type de transaction invalide'),
  
  budgetMin: yup
    .number()
    .required('Budget minimum requis')
    .min(VALIDATION.MIN_PRICE, `Budget minimum: ${VALIDATION.MIN_PRICE} GNF`),
  
  budgetMax: yup
    .number()
    .required('Budget maximum requis')
    .min(yup.ref('budgetMin'), 'Budget maximum doit être supérieur au minimum')
    .max(VALIDATION.MAX_PRICE, `Budget maximum: ${VALIDATION.MAX_PRICE} GNF`),
  
  surfaceMin: yup
    .number()
    .min(1, 'Surface minimum: 1 m²')
    .max(100000, 'Surface maximum: 100,000 m²'),
  
  surfaceMax: yup
    .number()
    .min(yup.ref('surfaceMin'), 'Surface maximum doit être supérieure au minimum')
    .max(100000, 'Surface maximum: 100,000 m²'),
  
  location: yup.object().shape({
    address: yup
      .string()
      .required('Zone de recherche requise')
      .min(5, 'Zone de recherche trop courte')
      .max(200, 'Zone de recherche trop longue'),
    
    city: yup
      .string()
      .required('Ville requise'),
    
    commune: yup
      .string(),
    
    latitude: yup
      .number()
      .required('Coordonnées GPS requises'),
    
    longitude: yup
      .number()
      .required('Coordonnées GPS requises'),
  }),
  
  searchRadius: yup
    .number()
    .min(1, 'Rayon minimum: 1 km')
    .max(100, 'Rayon maximum: 100 km'),
});

// Profile update schema
export const profileUpdateSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Prénom requis')
    .min(2, 'Prénom trop court')
    .max(50, 'Prénom trop long'),
  
  lastName: yup
    .string()
    .required('Nom requis')
    .min(2, 'Nom trop court')
    .max(50, 'Nom trop long'),
  
  phone: yup
    .string()
    .required('Numéro de téléphone requis')
    .test('valid-guinea-phone', 'Numéro de téléphone guinéen invalide', isValidGuineaPhone),
  
  bio: yup
    .string()
    .max(500, 'Biographie trop longue'),
  
  companyName: yup
    .string()
    .when('userType', {
      is: 'professionnel',
      then: (schema) => schema
        .required('Nom de l\'entreprise requis')
        .min(2, 'Nom d\'entreprise trop court')
        .max(100, 'Nom d\'entreprise trop long'),
      otherwise: (schema) => schema.notRequired(),
    }),
  
  companyDescription: yup
    .string()
    .max(1000, 'Description d\'entreprise trop longue'),
});

// Message schema
export const messageSchema = yup.object().shape({
  text: yup
    .string()
    .when('type', {
      is: 'text',
      then: (schema) => schema
        .required('Message requis')
        .min(1, 'Message vide')
        .max(1000, 'Message trop long'),
      otherwise: (schema) => schema.notRequired(),
    }),
  
  type: yup
    .string()
    .required('Type de message requis')
    .oneOf(['text', 'image', 'document'], 'Type de message invalide'),
});

// Review schema
export const reviewSchema = yup.object().shape({
  rating: yup
    .number()
    .required('Note requise')
    .min(1, 'Note minimum: 1')
    .max(5, 'Note maximum: 5'),
  
  comment: yup
    .string()
    .required('Commentaire requis')
    .min(10, 'Commentaire trop court')
    .max(500, 'Commentaire trop long'),
});

// Search filters schema
export const searchFiltersSchema = yup.object().shape({
  propertyType: yup
    .string()
    .oneOf(
      ['', 'appartement', 'maison', 'villa', 'terrain', 'bureau', 'commerce', 'entrepot'],
      'Type de bien invalide'
    ),
  
  transactionType: yup
    .string()
    .oneOf(['', 'vente', 'location'], 'Type de transaction invalide'),
  
  priceMin: yup
    .number()
    .min(0, 'Prix minimum invalide'),
  
  priceMax: yup
    .number()
    .min(yup.ref('priceMin'), 'Prix maximum doit être supérieur au minimum'),
  
  surfaceMin: yup
    .number()
    .min(0, 'Surface minimum invalide'),
  
  surfaceMax: yup
    .number()
    .min(yup.ref('surfaceMin'), 'Surface maximum doit être supérieure au minimum'),
  
  rooms: yup
    .number()
    .min(0, 'Nombre de pièces invalide'),
  
  bathrooms: yup
    .number()
    .min(0, 'Nombre de salles de bain invalide'),
});
