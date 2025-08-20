/**
 * Composant Recaptcha Container pour l'authentification SMS
 * 
 * Gère l'affichage du recaptcha invisible pour Firebase Phone Auth
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../../config/firebase';

const RecaptchaContainer = ({ onRecaptchaReady }) => {
  const recaptchaRef = useRef(null);

  useEffect(() => {
    // Créer le recaptcha verifier
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          console.log('Recaptcha résolu avec succès');
          if (onRecaptchaReady) {
            onRecaptchaReady(response);
          }
        },
        'expired-callback': () => {
          console.log('Recaptcha expiré');
        }
      });
    }

    // Nettoyer lors du démontage
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, [onRecaptchaReady]);

  return (
    <View 
      id="recaptcha-container"
      ref={recaptchaRef}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -9999,
    left: -9999,
    width: 1,
    height: 1,
    opacity: 0,
  },
});

export default RecaptchaContainer;
