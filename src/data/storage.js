// Clés du localStorage
const STORAGE_KEY_APPOINTMENTS = 'appointments';
const STORAGE_KEY_DOCUMENTS = 'documents';
const STORAGE_KEY_PROFILE = 'profile';
const STORAGE_KEY_VITALS = 'vitals';

// ===== RENDEZ-VOUS =====
export const getAppointments = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_APPOINTMENTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erreur lors de la lecture des rendez-vous:', error);
    return [];
  }
};

export const addAppointment = (appointment) => {
  try {
    const appointments = getAppointments();
    const newAppointment = {
      ...appointment,
      id: Date.now(),
    };
    appointments.push(newAppointment);
    localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(appointments));
    return appointments;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du rendez-vous:', error);
    return getAppointments();
  }
};

export const deleteAppointment = (id) => {
  try {
    let appointments = getAppointments();
    appointments = appointments.filter(apt => apt.id !== id);
    localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(appointments));
    return appointments;
  } catch (error) {
    console.error('Erreur lors de la suppression du rendez-vous:', error);
    return getAppointments();
  }
};

// ===== DOCUMENTS =====
export const getDocuments = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_DOCUMENTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erreur lors de la lecture des documents:', error);
    return [];
  }
};

export const addDocument = (document) => {
  try {
    const documents = getDocuments();
    const newDocument = {
      ...document,
      id: Date.now(),
      uploadDate: new Date().toISOString(),
    };
    documents.push(newDocument);
    localStorage.setItem(STORAGE_KEY_DOCUMENTS, JSON.stringify(documents));
    return documents;
  } catch (error) {
    console.error('Erreur lors de l\'ajout du document:', error);
    return getDocuments();
  }
};

export const deleteDocument = (id) => {
  try {
    let documents = getDocuments();
    documents = documents.filter(doc => doc.id !== id);
    localStorage.setItem(STORAGE_KEY_DOCUMENTS, JSON.stringify(documents));
    return documents;
  } catch (error) {
    console.error('Erreur lors de la suppression du document:', error);
    return getDocuments();
  }
};

// ===== PROFIL PATIENT =====
export const getProfile = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_PROFILE);
    return data ? JSON.parse(data) : {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      bloodType: '',
      allergies: '',
      chronicDiseases: '',
      notes: '',
    };
  } catch (error) {
    console.error('Erreur lors de la lecture du profil:', error);
    return {};
  }
};

export const updateProfile = (profile) => {
  try {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));
    return profile;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    return getProfile();
  }
};

// ===== CONSTANTES DE SANTÉ =====
export const getVitals = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_VITALS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erreur lors de la lecture des constantes:', error);
    return [];
  }
};

export const addVital = (vital) => {
  try {
    const vitals = getVitals();
    const newVital = {
      ...vital,
      id: Date.now(),
      date: new Date().toISOString(),
    };
    vitals.push(newVital);
    localStorage.setItem(STORAGE_KEY_VITALS, JSON.stringify(vitals));
    return vitals;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la constante:', error);
    return getVitals();
  }
};

export const deleteVital = (id) => {
  try {
    let vitals = getVitals();
    vitals = vitals.filter(v => v.id !== id);
    localStorage.setItem(STORAGE_KEY_VITALS, JSON.stringify(vitals));
    return vitals;
  } catch (error) {
    console.error('Erreur lors de la suppression de la constante:', error);
    return getVitals();
  }
};

