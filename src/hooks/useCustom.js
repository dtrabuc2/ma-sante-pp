import { useState, useCallback, useEffect } from 'react';

/**
 * Hook personnalisé pour synchroniser l'état avec localStorage
 * @param {string} key - Clé du localStorage
 * @param {Function} getFunction - Fonction pour récupérer les données
 * @param {Function} updateFunction - Fonction pour mettre à jour les données
 * @returns {[Array, Function]} État et fonction de mise à jour
 */
export const useStorageData = (key, getFunction, updateFunction) => {
  const [data, setData] = useState(() => getFunction());

  const updateData = useCallback((newValue) => {
    updateFunction(newValue);
    setData(getFunction());
  }, [getFunction, updateFunction]);

  return [data, updateData];
};

/**
 * Hook personnalisé pour gérer les formulaires
 * @param {Object} initialState - État initial du formulaire
 * @returns {Object} État du formulaire et handlers
 */
export const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleReset = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  return {
    formData,
    setFormData,
    handleChange,
    handleReset
  };
};

/**
 * Hook personnalisé pour gérer les messages de notification
 * @param {number} duration - Durée en ms (par défaut 3000)
 * @returns {Object} État du message et fonctions
 */
export const useNotification = (duration = 3000) => {
  const [message, setMessage] = useState('');

  const showMessage = useCallback((msg) => {
    setMessage(msg);
    const timer = setTimeout(() => setMessage(''), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const clearMessage = useCallback(() => {
    setMessage('');
  }, []);

  return {
    message,
    showMessage,
    clearMessage
  };
};
