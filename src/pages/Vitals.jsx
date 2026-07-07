import { useState, useCallback, useMemo } from 'react';
import { getVitals, addVital, deleteVital } from '../data/storage';
import { FormCard, DataTable, EmptyState } from '../components/common';
import { useForm } from '../hooks/useCustom';

const INITIAL_VITAL_STATE = {
  weight: '',
  height: '',
  waistCircumference: '',
  bloodPressure: '',
  temperature: '',
  heartRate: '',
  notes: '',
};

function Vitals() {
  const [vitals, setVitals] = useState(() => getVitals());
  const { formData: vitalData, handleChange, handleReset } = useForm(INITIAL_VITAL_STATE);

  const handleAddVital = useCallback((e) => {
    e.preventDefault();
    
    if (!vitalData.weight && !vitalData.bloodPressure && !vitalData.temperature) {
      alert('Veuillez remplir au moins un champ!');
      return;
    }

    addVital(vitalData);
    setVitals(getVitals());
    handleReset();
  }, [vitalData, handleReset]);

  const handleDeleteVital = useCallback((id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette entrée?')) {
      deleteVital(id);
      setVitals(getVitals());
    }
  }, []);

  // Dernière mesure (mémorisée)
  const lastVital = useMemo(() => 
    vitals.length > 0 ? vitals[vitals.length - 1] : null,
    [vitals]
  );

  // Vitals triés en ordre inverse (mémorisé)
  const reversedVitals = useMemo(() => [...vitals].reverse(), [vitals]);

  // Colonnes (mémorisées)
  const columns = useMemo(() => [
    { key: 'date', label: 'Date', render: (val) => new Date(val).toLocaleDateString('fr-FR') },
    { key: 'weight', label: 'Poids (kg)', render: (val) => val || '-' },
    { key: 'height', label: 'Taille (cm)', render: (val) => val || '-' },
    { key: 'waistCircumference', label: 'Tour de taille (cm)', render: (val) => val || '-' },
    { key: 'bloodPressure', label: 'Tension', render: (val) => val || '-' },
    { key: 'temperature', label: 'Température (°C)', render: (val) => val || '-' },
    { key: 'heartRate', label: 'FC (bpm)', render: (val) => val || '-' },
    { key: 'notes', label: 'Notes', render: (val) => val || '-' },
  ], []);

  return (
    <div className="container-fluid">
      <h2>Constantes de Santé</h2>

      {lastVital && (
        <div className="alert alert-info mt-4">
          <strong>Dernière mise à jour:</strong> {new Date(lastVital.date).toLocaleDateString('fr-FR')} à {new Date(lastVital.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}

      <FormCard title="Ajouter une mesure" onSubmit={handleAddVital}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="weight" className="form-label">Poids (kg)</label>
            <input
              type="number"
              className="form-control"
              id="weight"
              name="weight"
              step="0.1"
              placeholder="70.5"
              value={vitalData.weight}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="height" className="form-label">Taille (cm)</label>
            <input
              type="number"
              className="form-control"
              id="height"
              name="height"
              placeholder="170"
              value={vitalData.height}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="waistCircumference" className="form-label">Tour de taille (cm)</label>
            <input
              type="number"
              className="form-control"
              id="waistCircumference"
              name="waistCircumference"
              placeholder="80"
              value={vitalData.waistCircumference}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="bloodPressure" className="form-label">Tension (mmHg) ex: 120/80</label>
            <input
              type="text"
              className="form-control"
              id="bloodPressure"
              name="bloodPressure"
              placeholder="120/80"
              value={vitalData.bloodPressure}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="temperature" className="form-label">Température (°C)</label>
            <input
              type="number"
              className="form-control"
              id="temperature"
              name="temperature"
              step="0.1"
              placeholder="37.0"
              value={vitalData.temperature}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="heartRate" className="form-label">Fréquence cardiaque (bpm)</label>
            <input
              type="number"
              className="form-control"
              id="heartRate"
              name="heartRate"
              placeholder="70"
              value={vitalData.heartRate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="notes" className="form-label">Notes</label>
          <textarea
            className="form-control"
            id="notes"
            name="notes"
            rows="2"
            placeholder="Ajoutez des observations..."
            value={vitalData.notes}
            onChange={handleChange}
          />
        </div>
      </FormCard>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Historique ({vitals.length})</h5>
          {vitals.length === 0 ? (
            <EmptyState message="Aucune mesure pour le moment." icon="📊" />
          ) : (
            <DataTable
              columns={columns}
              data={reversedVitals}
              onDelete={handleDeleteVital}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Vitals;
