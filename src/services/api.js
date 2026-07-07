const API_BASE_URL = 'http://localhost:5000/api';

// Service pour les appels authentifiés
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expiré - déconnecter
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de l\'appel API');
  }

  return data;
};

// Fonctions d'appointements
export const appointmentAPI = {
  getAll: () => apiCall('/appointments'),
  create: (appointment) => apiCall('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointment),
  }),
  delete: (id) => apiCall(`/appointments/${id}`, {
    method: 'DELETE',
  }),
};

// Fonctions de documents
export const documentAPI = {
  getAll: () => apiCall('/documents'),
  create: (document) => apiCall('/documents', {
    method: 'POST',
    body: JSON.stringify(document),
  }),
  delete: (id) => apiCall(`/documents/${id}`, {
    method: 'DELETE',
  }),
};

// Fonctions de constantes vitales
export const vitalAPI = {
  getAll: () => apiCall('/vitals'),
  create: (vital) => apiCall('/vitals', {
    method: 'POST',
    body: JSON.stringify(vital),
  }),
  delete: (id) => apiCall(`/vitals/${id}`, {
    method: 'DELETE',
  }),
};

export default apiCall;
