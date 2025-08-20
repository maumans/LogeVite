/**
 * Test du gestionnaire d'erreurs Firebase
 * 
 * Ce fichier permet de tester le fonctionnement du gestionnaire d'erreurs
 * sans avoir à lancer l'application complète
 */

import { handleFirebaseError, formatErrorForUser } from './errorHandler';

// Simuler une erreur Firebase
const simulateFirebaseError = (errorCode) => {
  const error = new Error('Erreur Firebase simulée');
  error.code = errorCode;
  return error;
};

// Test des différents types d'erreurs
const testErrorHandler = () => {
  console.log('🧪 Test du gestionnaire d\'erreurs Firebase\n');

  // Test de l'erreur auth/invalid-credential
  console.log('1. Test erreur auth/invalid-credential:');
  const invalidCredentialError = simulateFirebaseError('auth/invalid-credential');
  const invalidCredentialInfo = handleFirebaseError(invalidCredentialError, 'login');
  console.log('   Erreur brute:', invalidCredentialError);
  console.log('   Erreur traitée:', invalidCredentialInfo);
  console.log('   Formaté pour utilisateur:', formatErrorForUser(invalidCredentialInfo));
  console.log('');

  // Test de l'erreur auth/user-not-found
  console.log('2. Test erreur auth/user-not-found:');
  const userNotFoundError = simulateFirebaseError('auth/user-not-found');
  const userNotFoundInfo = handleFirebaseError(userNotFoundError, 'login');
  console.log('   Erreur brute:', userNotFoundError);
  console.log('   Erreur traitée:', userNotFoundInfo);
  console.log('   Formaté pour utilisateur:', formatErrorForUser(userNotFoundInfo));
  console.log('');

  // Test de l'erreur auth/weak-password
  console.log('3. Test erreur auth/weak-password:');
  const weakPasswordError = simulateFirebaseError('auth/weak-password');
  const weakPasswordInfo = handleFirebaseError(weakPasswordError, 'signup');
  console.log('   Erreur brute:', weakPasswordError);
  console.log('   Erreur traitée:', weakPasswordInfo);
  console.log('   Formaté pour utilisateur:', formatErrorForUser(weakPasswordInfo));
  console.log('');

  // Test d'une erreur inconnue
  console.log('4. Test erreur inconnue:');
  const unknownError = simulateFirebaseError('auth/unknown-error');
  const unknownErrorInfo = handleFirebaseError(unknownError, 'general');
  console.log('   Erreur brute:', unknownError);
  console.log('   Erreur traitée:', unknownErrorInfo);
  console.log('   Formaté pour utilisateur:', formatErrorForUser(unknownErrorInfo));
  console.log('');

  // Test des actions suggérées
  console.log('5. Actions suggérées selon le contexte:');
  console.log('   Login + invalid-credential:', invalidCredentialInfo.userAction);
  console.log('   Signup + weak-password:', weakPasswordInfo.userAction);
  console.log('   Login + user-not-found:', userNotFoundInfo.userAction);
  console.log('');

  return {
    invalidCredential: invalidCredentialInfo,
    userNotFound: userNotFoundInfo,
    weakPassword: weakPasswordInfo,
    unknown: unknownErrorInfo
  };
};

// Exporter la fonction de test
export { testErrorHandler };

// Si ce fichier est exécuté directement (développement)
if (__DEV__) {
  console.log('🚀 Test automatique du gestionnaire d\'erreurs...');
  testErrorHandler();
}
