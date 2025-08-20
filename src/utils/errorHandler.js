/**
 * Gestionnaire d'erreurs Firebase pour LogeVite
 * 
 * Gère toutes les erreurs Firebase avec des messages d'erreur en français
 * et des solutions suggérées pour l'utilisateur
 */

/**
 * Codes d'erreur Firebase et leurs messages en français
 */
const FIREBASE_ERROR_MESSAGES = {
  // Erreurs d'authentification
  'auth/user-not-found': {
    message: 'Aucun compte trouvé avec cette adresse email',
    solution: 'Vérifiez votre email ou créez un nouveau compte',
    type: 'auth',
    severity: 'error'
  },
  
  'auth/wrong-password': {
    message: 'Mot de passe incorrect',
    solution: 'Vérifiez votre mot de passe ou utilisez la récupération',
    type: 'auth',
    severity: 'error'
  },
  
  'auth/invalid-credential': {
    message: 'Email ou mot de passe incorrect',
    solution: 'Vérifiez vos identifiants ou utilisez la récupération de mot de passe',
    type: 'auth',
    severity: 'error'
  },
  
  'auth/invalid-email': {
    message: 'Adresse email invalide',
    solution: 'Vérifiez le format de votre adresse email',
    type: 'auth',
    severity: 'error'
  },
  
  'auth/email-already-in-use': {
    message: 'Cette adresse email est déjà utilisée',
    solution: 'Connectez-vous avec cet email ou utilisez une autre adresse',
    type: 'auth',
    severity: 'warning'
  },
  
  'auth/weak-password': {
    message: 'Mot de passe trop faible',
    solution: 'Votre mot de passe doit contenir au moins 8 caractères avec des lettres, chiffres et caractères spéciaux',
    type: 'auth',
    severity: 'error'
  },
  
  'auth/too-many-requests': {
    message: 'Trop de tentatives de connexion',
    solution: 'Attendez quelques minutes avant de réessayer',
    type: 'auth',
    severity: 'warning'
  },
  
  'auth/network-request-failed': {
    message: 'Erreur de connexion réseau',
    solution: 'Vérifiez votre connexion internet et réessayez',
    type: 'auth',
    severity: 'error'
  },
  
  'auth/user-disabled': {
    message: 'Ce compte a été désactivé',
    solution: 'Contactez le support pour plus d\'informations',
    type: 'auth',
    severity: 'error'
  },
  
  'auth/user-token-expired': {
    message: 'Session expirée',
    solution: 'Reconnectez-vous à votre compte',
    type: 'auth',
    severity: 'warning'
  },
  
  'auth/requires-recent-login': {
    message: 'Connexion récente requise',
    solution: 'Reconnectez-vous pour effectuer cette action',
    type: 'auth',
    severity: 'warning'
  },
  
  // Erreurs SMS/Phone
  'auth/invalid-verification-code': {
    message: 'Code de vérification invalide',
    solution: 'Vérifiez le code reçu par SMS et réessayez',
    type: 'sms',
    severity: 'error'
  },
  
  'auth/invalid-verification-id': {
    message: 'ID de vérification invalide',
    solution: 'Demandez un nouveau code de vérification',
    type: 'sms',
    severity: 'error'
  },
  
  'auth/quota-exceeded': {
    message: 'Quota SMS dépassé',
    solution: 'Réessayez plus tard ou utilisez la connexion par email',
    type: 'sms',
    severity: 'warning'
  },
  
  // Erreurs OAuth
  'auth/popup-closed-by-user': {
    message: 'Fenêtre de connexion fermée',
    solution: 'Réessayez la connexion avec Google ou Facebook',
    type: 'oauth',
    severity: 'warning'
  },
  
  'auth/cancelled-popup-request': {
    message: 'Connexion annulée',
    solution: 'Réessayez la connexion',
    type: 'oauth',
    severity: 'info'
  },
  
  'auth/popup-blocked': {
    message: 'Fenêtre de connexion bloquée',
    solution: 'Autorisez les popups dans votre navigateur',
    type: 'oauth',
    severity: 'warning'
  },
  
  'auth/account-exists-with-different-credential': {
    message: 'Compte existant avec des identifiants différents',
    solution: 'Utilisez la méthode de connexion originale de ce compte',
    type: 'oauth',
    severity: 'error'
  },
  
  'auth/operation-not-allowed': {
    message: 'Méthode de connexion non autorisée',
    solution: 'Contactez le support pour activer cette méthode',
    type: 'auth',
    severity: 'error'
  },
  
  // Erreurs Firestore
  'permission-denied': {
    message: 'Accès refusé',
    solution: 'Vérifiez vos permissions ou contactez le support',
    type: 'firestore',
    severity: 'error'
  },
  
  'unavailable': {
    message: 'Service temporairement indisponible',
    solution: 'Réessayez dans quelques minutes',
    type: 'firestore',
    severity: 'warning'
  },
  
  'deadline-exceeded': {
    message: 'Délai d\'attente dépassé',
    solution: 'Vérifiez votre connexion et réessayez',
    type: 'firestore',
    severity: 'warning'
  },
  
  'resource-exhausted': {
    message: 'Quota dépassé',
    solution: 'Réessayez plus tard',
    type: 'firestore',
    severity: 'warning'
  },
  
  'failed-precondition': {
    message: 'Opération impossible',
    solution: 'Vérifiez les conditions requises et réessayez',
    type: 'firestore',
    severity: 'error'
  },
  
  'aborted': {
    message: 'Opération annulée',
    solution: 'Réessayez l\'opération',
    type: 'firestore',
    severity: 'warning'
  },
  
  'out-of-range': {
    message: 'Données hors limites',
    solution: 'Vérifiez les valeurs saisies',
    type: 'firestore',
    severity: 'error'
  },
  
  'unimplemented': {
    message: 'Fonctionnalité non implémentée',
    solution: 'Contactez le support',
    type: 'firestore',
    severity: 'error'
  },
  
  'internal': {
    message: 'Erreur interne',
    solution: 'Réessayez ou contactez le support',
    type: 'firestore',
    severity: 'error'
  },
  
  'data-loss': {
    message: 'Perte de données',
    solution: 'Contactez immédiatement le support',
    type: 'firestore',
    severity: 'critical'
  },
  
  'unauthenticated': {
    message: 'Utilisateur non authentifié',
    solution: 'Connectez-vous à votre compte',
    type: 'firestore',
    severity: 'warning'
  }
};

/**
 * Gestionnaire principal d'erreurs Firebase
 * @param {Error} error - L'erreur Firebase
 * @param {string} context - Contexte de l'erreur (ex: 'login', 'signup', 'profile')
 * @returns {Object} Informations sur l'erreur formatées
 */
export const handleFirebaseError = (error, context = 'general') => {
  console.error(`Erreur Firebase dans le contexte ${context}:`, error);
  
  // Extraire le code d'erreur
  const errorCode = error.code || 'unknown';
  
  // Récupérer les informations d'erreur
  const errorInfo = FIREBASE_ERROR_MESSAGES[errorCode] || {
    message: 'Une erreur inattendue s\'est produite',
    solution: 'Veuillez réessayer ou contactez le support',
    type: 'unknown',
    severity: 'error'
  };
  
  // Informations supplémentaires selon le contexte
  const contextInfo = getContextSpecificInfo(context, errorCode);
  
  return {
    code: errorCode,
    message: errorInfo.message,
    solution: errorInfo.solution,
    type: errorInfo.type,
    severity: errorInfo.severity,
    context: context,
    contextInfo: contextInfo,
    originalError: error,
    timestamp: new Date().toISOString(),
    userAction: getSuggestedUserAction(errorCode, context)
  };
};

/**
 * Informations spécifiques au contexte
 */
const getContextSpecificInfo = (context, errorCode) => {
  switch (context) {
    case 'login':
      return getLoginContextInfo(errorCode);
    case 'signup':
      return getSignupContextInfo(errorCode);
    case 'profile':
      return getProfileContextInfo(errorCode);
    case 'password-reset':
      return getPasswordResetContextInfo(errorCode);
    case 'phone-verification':
      return getPhoneVerificationContextInfo(errorCode);
    default:
      return {};
  }
};

/**
 * Informations spécifiques à la connexion
 */
const getLoginContextInfo = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-credential':
      return {
        suggestion: 'Vérifiez que vous utilisez le bon email et mot de passe',
        alternative: 'Utilisez la récupération de mot de passe si nécessaire',
        retry: true
      };
    case 'auth/user-not-found':
      return {
        suggestion: 'Vérifiez votre email ou créez un nouveau compte',
        alternative: 'Rediriger vers l\'inscription',
        retry: false
      };
    case 'auth/too-many-requests':
      return {
        suggestion: 'Attendez 5-10 minutes avant de réessayer',
        alternative: 'Utilisez la récupération de mot de passe',
        retry: false
      };
    default:
      return { retry: true };
  }
};

/**
 * Informations spécifiques à l'inscription
 */
const getSignupContextInfo = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return {
        suggestion: 'Connectez-vous avec cet email existant',
        alternative: 'Utilisez une autre adresse email',
        retry: false
      };
    case 'auth/weak-password':
      return {
        suggestion: 'Votre mot de passe doit être plus fort',
        alternative: 'Utilisez notre générateur de mot de passe',
        retry: true
      };
    default:
      return { retry: true };
  }
};

/**
 * Actions suggérées pour l'utilisateur
 */
const getSuggestedUserAction = (errorCode, context) => {
  switch (errorCode) {
    case 'auth/invalid-credential':
      return context === 'login' ? 'retry_with_correction' : 'contact_support';
    case 'auth/user-not-found':
      return 'redirect_to_signup';
    case 'auth/email-already-in-use':
      return 'redirect_to_login';
    case 'auth/weak-password':
      return 'show_password_requirements';
    case 'auth/too-many-requests':
      return 'wait_and_retry';
    case 'auth/network-request-failed':
      return 'check_connection_and_retry';
    default:
      return 'retry_or_contact_support';
  }
};

/**
 * Formater l'erreur pour l'affichage utilisateur
 */
export const formatErrorForUser = (errorInfo) => {
  return {
    title: getErrorTitle(errorInfo.severity),
    message: errorInfo.message,
    solution: errorInfo.solution,
    action: errorInfo.userAction,
    canRetry: errorInfo.contextInfo?.retry !== false
  };
};

/**
 * Titre de l'erreur selon la sévérité
 */
const getErrorTitle = (severity) => {
  switch (severity) {
    case 'critical':
      return 'Erreur Critique';
    case 'error':
      return 'Erreur';
    case 'warning':
      return 'Attention';
    case 'info':
      return 'Information';
    default:
      return 'Erreur';
  }
};

/**
 * Vérifier si l'erreur est récupérable
 */
export const isRecoverableError = (errorInfo) => {
  return errorInfo.contextInfo?.retry !== false;
};

/**
 * Vérifier si l'erreur nécessite une action immédiate
 */
export const requiresImmediateAction = (errorInfo) => {
  return errorInfo.severity === 'critical' || 
         errorInfo.code === 'auth/user-disabled' ||
         errorInfo.code === 'data-loss';
};

/**
 * Gestionnaire d'erreurs de validation Yup
 */
export const handleValidationError = (yupError) => {
  const errors = {};
  
  yupError.inner.forEach((error) => {
    if (error.path) {
      errors[error.path] = {
        message: error.message,
        type: 'validation'
      };
    }
  });
  
  return {
    type: 'validation',
    errors: errors,
    message: 'Veuillez corriger les erreurs de validation',
    severity: 'warning'
  };
};

/**
 * Gestionnaire d'erreurs réseau
 */
export const handleNetworkError = (error) => {
  return {
    code: 'network_error',
    message: 'Erreur de connexion réseau',
    solution: 'Vérifiez votre connexion internet et réessayez',
    type: 'network',
    severity: 'error',
    retry: true
  };
};

/**
 * Gestionnaire d'erreurs génériques
 */
export const handleGenericError = (error) => {
  return {
    code: 'generic_error',
    message: 'Une erreur inattendue s\'est produite',
    solution: 'Veuillez réessayer ou contactez le support',
    type: 'unknown',
    severity: 'error',
    retry: true
  };
};

export default {
  handleFirebaseError,
  formatErrorForUser,
  isRecoverableError,
  requiresImmediateAction,
  handleValidationError,
  handleNetworkError,
  handleGenericError
};
