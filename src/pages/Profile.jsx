import { useState, useCallback } from 'react';
import { getProfile, updateProfile } from '../data/storage';
import { useNotification } from '../hooks/useCustom';

function Profile() {
  const [profile, setProfile] = useState(() => getProfile());
  const [isEditing, setIsEditing] = useState(false);
  const { message, showMessage } = useNotification();

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleToggleEdit = useCallback(() => {
    setIsEditing(prev => !prev);
  }, []);

  const handleSave = useCallback(() => {
    updateProfile(profile);
    showMessage('✅ Profil sauvegardé avec succès!');
    setIsEditing(false);
  }, [profile, showMessage]);

  const handleCancel = useCallback(() => {
    setProfile(getProfile());
    setIsEditing(false);
  }, []);

  const renderField = useCallback((label, name, type = 'text', options = null) => (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      {type === 'select' ? (
        <select
          className="form-select"
          id={name}
          name={name}
          value={profile[name]}
          onChange={handleInputChange}
          disabled={!isEditing}
        >
          <option value="">-- Sélectionner --</option>
          {options && options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          className="form-control"
          id={name}
          name={name}
          rows="2"
          value={profile[name]}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      ) : (
        <input
          type={type}
          className="form-control"
          id={name}
          name={name}
          value={profile[name]}
          onChange={handleInputChange}
          disabled={!isEditing}
        />
      )}
    </div>
  ), [profile, isEditing, handleInputChange]);

  return (
    <div className="container-fluid">
      <h2>Mon Profil Patient</h2>

      {message && <div className="alert alert-success mt-3">{message}</div>}

      <div className="card mt-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title">Informations Personnelles</h5>
            <div className="gap-2 d-flex">
              {isEditing ? (
                <>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={handleSave}
                  >
                    Enregistrer
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={handleCancel}
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleToggleEdit}
                >
                  Modifier
                </button>
              )}
            </div>
          </div>

          <form>
            <div className="row">
              <div className="col-md-6">
                {renderField('Prénom', 'firstName')}
              </div>
              <div className="col-md-6">
                {renderField('Nom', 'lastName')}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                {renderField('Date de naissance', 'dateOfBirth', 'date')}
              </div>
              <div className="col-md-6">
                {renderField('Groupe sanguin', 'bloodType', 'select', ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'])}
              </div>
            </div>

            {renderField('Allergies', 'allergies', 'textarea')}
            {renderField('Maladies chroniques', 'chronicDiseases', 'textarea')}
            {renderField('Notes supplémentaires', 'notes', 'textarea')}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
