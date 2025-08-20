/**
 * Hook de validation de formulaires pour LogeVite
 * 
 * Utilise Yup pour valider les données de formulaire
 * et retourne les erreurs de façon formatée pour ErrorDisplay
 */

import { useState, useCallback } from 'react';
import * as yup from 'yup';

export const useFormValidation = (schema) => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Valider un champ spécifique
  const validateField = useCallback(async (fieldName, value) => {
    if (!schema || typeof schema.validateAt !== 'function') {
      console.error('Schema de validation invalide');
      return {
        message: 'Erreur de configuration de validation',
        severity: 'error',
        type: 'validation'
      };
    }

    try {
      await schema.validateAt(fieldName, { [fieldName]: value });
      
      // Supprimer l'erreur si la validation réussit
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
      
      return null;
    } catch (error) {
      const fieldError = {
        message: error.message || 'Erreur de validation',
        severity: 'error',
        type: 'validation'
      };
      
      setErrors(prev => ({
        ...prev,
        [fieldName]: fieldError
      }));
      
      return fieldError;
    }
  }, [schema]);

  // Valider tout le formulaire
  const validateForm = useCallback(async (values) => {
    if (!schema || typeof schema.validate !== 'function') {
      console.error('Schema de validation invalide');
      return {
        general: {
          message: 'Erreur de configuration de validation',
          severity: 'error',
          type: 'validation'
        }
      };
    }

    try {
      await schema.validate(values, { abortEarly: false });
      
      setErrors({});
      setIsValid(true);
      return null;
    } catch (error) {
      const formErrors = {};
      
      if (error.inner && Array.isArray(error.inner)) {
        error.inner.forEach(err => {
          formErrors[err.path] = {
            message: err.message,
            severity: 'error',
            type: 'validation'
          };
        });
      } else {
        formErrors.general = {
          message: error.message || 'Erreur de validation',
          severity: 'error',
          type: 'validation'
        };
      }
      
      setErrors(formErrors);
      setIsValid(false);
      return formErrors;
    }
  }, [schema]);

  // Effacer toutes les erreurs
  const clearErrors = useCallback(() => {
    setErrors({});
    setIsValid(false);
  }, []);

  // Effacer l'erreur d'un champ spécifique
  const clearFieldError = useCallback((fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  return {
    errors,
    isValid,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError
  };
};
