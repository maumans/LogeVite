// Export all constants
export * from './colors';
export * from './theme';

// App constants
export const APP_NAME = 'LogeVite';
export const APP_VERSION = '1.0.0';

// API endpoints (to be configured based on environment)
export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5001/logevite-dev/us-central1'
  : 'https://us-central1-logevite-prod.cloudfunctions.net';

// Firebase collections
export const COLLECTIONS = {
  USERS: 'users',
  LISTINGS: 'listings',
  REQUESTS: 'requests',
  CONVERSATIONS: 'conversations',
  MESSAGES: 'messages',
  NOTIFICATIONS: 'notifications',
  FAVORITES: 'favorites',
  REVIEWS: 'reviews',
  REPORTS: 'reports',
};

// User types
export const USER_TYPES = {
  PARTICULIER: 'particulier',
  PROFESSIONNEL: 'professionnel',
};

// Professional types
export const PROFESSIONAL_TYPES = {
  AGENCE: 'agence',
  DEMARCHEUR: 'demarcheur',
  PROMOTEUR: 'promoteur',
};

// Property types
export const PROPERTY_TYPES = {
  APPARTEMENT: 'appartement',
  MAISON: 'maison',
  VILLA: 'villa',
  TERRAIN: 'terrain',
  BUREAU: 'bureau',
  COMMERCE: 'commerce',
  ENTREPOT: 'entrepot',
};

// Transaction types
export const TRANSACTION_TYPES = {
  VENTE: 'vente',
  LOCATION: 'location',
};

// Listing status
export const LISTING_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SOLD: 'sold',
  RENTED: 'rented',
  DRAFT: 'draft',
  EXPIRED: 'expired',
};

// Guinea regions and cities
export const GUINEA_LOCATIONS = {
  CONAKRY: {
    name: 'Conakry',
    communes: [
      'Kaloum',
      'Dixinn',
      'Matam',
      'Ratoma',
      'Matoto',
    ],
  },
  KANKAN: {
    name: 'Kankan',
    communes: ['Kankan'],
  },
  LABE: {
    name: 'Labé',
    communes: ['Labé'],
  },
  NZEREKORE: {
    name: 'N\'Zérékoré',
    communes: ['N\'Zérékoré'],
  },
  KINDIA: {
    name: 'Kindia',
    communes: ['Kindia'],
  },
  BOKE: {
    name: 'Boké',
    communes: ['Boké'],
  },
  FARANAH: {
    name: 'Faranah',
    communes: ['Faranah'],
  },
  MAMOU: {
    name: 'Mamou',
    communes: ['Mamou'],
  },
};

// Phone number formats
export const PHONE_FORMATS = {
  GUINEA_PREFIX: '+224',
  OPERATORS: {
    ORANGE: ['62', '64', '65', '66', '67'],
    MTN: ['61', '63', '68', '69'],
    CELLCOM: ['60'],
  },
};

// Validation rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  PHONE_LENGTH: 8, // Without country code
  MAX_IMAGES_PER_LISTING: 10,
  MAX_IMAGE_SIZE_MB: 5,
  MAX_DESCRIPTION_LENGTH: 1000,
  MIN_PRICE: 10000, // 10,000 GNF
  MAX_PRICE: 10000000000, // 10 billion GNF
};

// Social media platforms
export const SOCIAL_PLATFORMS = {
  FACEBOOK: 'facebook',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram',
  MESSENGER: 'messenger',
};

// Notification types
export const NOTIFICATION_TYPES = {
  MATCH: 'match',
  MESSAGE: 'message',
  REQUEST_MATCHES: 'request_matches',
  LISTING_EXPIRED: 'listing_expired',
  SUBSCRIPTION_EXPIRED: 'subscription_expired',
};

// Subscription plans
export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Gratuit',
    price: 0,
    duration: 30, // days
    maxListings: 3,
    features: ['Publication d\'annonces limitée', 'Messages de base'],
  },
  BASIC: {
    id: 'basic',
    name: 'Basic',
    price: 50000, // 50,000 GNF
    duration: 30,
    maxListings: 10,
    features: ['Plus d\'annonces', 'Support prioritaire', 'Statistiques de base'],
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    price: 150000, // 150,000 GNF
    duration: 30,
    maxListings: 50,
    features: [
      'Annonces illimitées',
      'Boost automatique',
      'Statistiques avancées',
      'Support 24/7',
    ],
  },
  PRO: {
    id: 'pro',
    name: 'Professionnel',
    price: 300000, // 300,000 GNF
    duration: 30,
    maxListings: -1, // unlimited
    features: [
      'Tout Premium +',
      'API access',
      'Intégrations avancées',
      'Manager dédié',
    ],
  },
};

// Default values
export const DEFAULTS = {
  SEARCH_RADIUS: 10, // km
  LISTING_EXPIRY_DAYS: 90,
  MAX_CONVERSATION_MESSAGES: 1000,
  IMAGE_QUALITY: 0.8,
  PAGINATION_LIMIT: 20,
};
