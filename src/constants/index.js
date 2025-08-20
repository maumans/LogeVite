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

// Collections Firebase
export const COLLECTIONS = {
  UTILISATEURS: 'utilisateurs',
  ANNONCES: 'annonces',
  DEMANDES: 'demandes',
  CONVERSATIONS: 'conversations',
  MESSAGES: 'messages',
  NOTIFICATIONS: 'notifications',
  FAVORIS: 'favoris',
  AVIS: 'avis',
  SIGNALEMENTS: 'signalements',
  STATISTIQUES: 'statistiques',
  PLANS_ABONNEMENT: 'plansAbonnement',
  TRANSACTIONS: 'transactions',
};

// Types d'utilisateurs
export const TYPES_UTILISATEURS = {
  PARTICULIER: 'particulier',
  PROFESSIONNEL: 'professionnel',
};

// Types de professionnels
export const TYPES_PROFESSIONNELS = {
  AGENCE: 'agence',
  DEMARCHEUR: 'demarcheur',
  PROMOTEUR: 'promoteur',
};

// Types de biens
export const TYPES_BIENS = {
  APPARTEMENT: 'appartement',
  MAISON: 'maison',
  VILLA: 'villa',
  TERRAIN: 'terrain',
  BUREAU: 'bureau',
  COMMERCE: 'commerce',
  ENTREPOT: 'entrepot',
};

// Types de transactions
export const TYPES_TRANSACTIONS = {
  VENTE: 'vente',
  LOCATION: 'location',
};

// Statuts d'annonces
export const STATUTS_ANNONCES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  VENDUE: 'vendue',
  LOUEE: 'louee',
  BROUILLON: 'brouillon',
  EXPIREE: 'expiree',
};

// Régions et villes de Guinée
export const LOCALISATIONS_GUINEE = {
  CONAKRY: {
    nom: 'Conakry',
    communes: [
      'Kaloum',
      'Dixinn',
      'Matam',
      'Ratoma',
      'Matoto',
    ],
  },
  KANKAN: {
    nom: 'Kankan',
    communes: ['Kankan'],
  },
  LABE: {
    nom: 'Labé',
    communes: ['Labé'],
  },
  NZEREKORE: {
    nom: 'N\'Zérékoré',
    communes: ['N\'Zérékoré'],
  },
  KINDIA: {
    nom: 'Kindia',
    communes: ['Kindia'],
  },
  BOKE: {
    nom: 'Boké',
    communes: ['Boké'],
  },
  FARANAH: {
    nom: 'Faranah',
    communes: ['Faranah'],
  },
  MAMOU: {
    nom: 'Mamou',
    communes: ['Mamou'],
  },
};

// Formats de numéros de téléphone
export const FORMATS_TELEPHONE = {
  PREFIXE_GUINEE: '+224',
  OPERATEURS: {
    ORANGE: ['62', '64', '65', '66', '67'],
    MTN: ['61', '63', '68', '69'],
    CELLCOM: ['60'],
  },
};

// Règles de validation
export const VALIDATION = {
  LONGUEUR_MIN_MOT_DE_PASSE: 6,
  LONGUEUR_TELEPHONE: 8, // Sans indicatif pays
  MAX_IMAGES_PAR_ANNONCE: 10,
  TAILLE_MAX_IMAGE_MB: 5,
  LONGUEUR_MAX_DESCRIPTION: 1000,
  PRIX_MIN: 10000, // 10 000 GNF
  PRIX_MAX: 10000000000, // 10 milliards GNF
};

// Plateformes de réseaux sociaux
export const PLATEFORMES_SOCIALES = {
  FACEBOOK: 'facebook',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram',
  MESSENGER: 'messenger',
};

// Types de notifications
export const TYPES_NOTIFICATIONS = {
  CORRESPONDANCE: 'correspondance',
  MESSAGE: 'message',
  CORRESPONDANCES_DEMANDE: 'correspondances_demande',
  ANNONCE_EXPIREE: 'annonce_expiree',
  ABONNEMENT_EXPIRE: 'abonnement_expire',
};

// Plans d'abonnement
export const PLANS_ABONNEMENT = {
  GRATUIT: {
    id: 'gratuit',
    nom: 'Gratuit',
    prix: 0,
    duree: 30, // jours
    maxAnnonces: 3,
    fonctionnalites: ['Publication d\'annonces limitée', 'Messages de base'],
  },
  BASIC: {
    id: 'basic',
    nom: 'Basic',
    prix: 50000, // 50 000 GNF
    duree: 30,
    maxAnnonces: 10,
    fonctionnalites: ['Plus d\'annonces', 'Support prioritaire', 'Statistiques de base'],
  },
  PREMIUM: {
    id: 'premium',
    nom: 'Premium',
    prix: 150000, // 150 000 GNF
    duree: 30,
    maxAnnonces: 50,
    fonctionnalites: [
      'Annonces illimitées',
      'Boost automatique',
      'Statistiques avancées',
      'Support 24/7',
    ],
  },
  PRO: {
    id: 'pro',
    nom: 'Professionnel',
    prix: 300000, // 300 000 GNF
    duree: 30,
    maxAnnonces: -1, // illimité
    fonctionnalites: [
      'Tout Premium +',
      'Accès API',
      'Intégrations avancées',
      'Manager dédié',
    ],
  },
};

// Valeurs par défaut
export const VALEURS_DEFAUT = {
  RAYON_RECHERCHE: 10, // km
  JOURS_EXPIRATION_ANNONCE: 90,
  MAX_MESSAGES_CONVERSATION: 1000,
  QUALITE_IMAGE: 0.8,
  LIMITE_PAGINATION: 20,
};
