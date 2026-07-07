import { useState, useCallback, useMemo } from 'react';
import { getAppointments, addAppointment, deleteAppointment } from '../data/storage';
import { FormCard, ListGroup, EmptyState } from '../components/common';
import { useForm } from '../hooks/useCustom';

const INITIAL_FORM_STATE = {
  date: '',
  time: '',
  doctor: '',
  reason: ''
};

function Planning() {
  const [appointments, setAppointments] = useState(() => getAppointments());
  const { formData, handleChange, handleReset } = useForm(INITIAL_FORM_STATE);

  const handleAddAppointment = useCallback((e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.time || !formData.doctor || !formData.reason) {
      alert('Veuillez remplir tous les champs!');
      return;
    }

    addAppointment(formData);
    setAppointments(getAppointments());
    handleReset();
  }, [formData, handleReset]);

  const handleDeleteAppointment = useCallback((id) => {
    deleteAppointment(id);
    setAppointments(getAppointments());
  }, []);

  // Tri des rendez-vous (mémorisé)
  const sortedAppointments = useMemo(() => 
    [...appointments].sort((a, b) => 
      new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
    ),
    [appointments]
  );

  return (
    <div className="container-fluid">
      <h2>Planning Médical</h2>

      <FormCard title="Ajouter un rendez-vous" onSubmit={handleAddAppointment}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="time" className="form-label">Heure</label>
            <input
              type="time"
              className="form-control"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="doctor" className="form-label">Médecin/Spécialiste</label>
          <input
            type="text"
            className="form-control"
            id="doctor"
            name="doctor"
            placeholder="Dr. Dupont"
            value={formData.doctor}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reason" className="form-label">Raison</label>
          <input
            type="text"
            className="form-control"
            id="reason"
            name="reason"
            placeholder="Consultation générale"
            value={formData.reason}
            onChange={handleChange}
          />
        </div>
      </FormCard>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Rendez-vous ({appointments.length})</h5>
          {appointments.length === 0 ? (
            <EmptyState message="Aucun rendez-vous pour le moment." icon="📅" />
          ) : (
            <ListGroup
              items={sortedAppointments}
              keyField="id"
              renderItem={(apt) => (
                <>
                  <h6 className="mb-1">{apt.doctor}</h6>
                  <p className="mb-1 text-muted">
                    {apt.date} à {apt.time}
                  </p>
                  <p className="mb-0">{apt.reason}</p>
                </>
              )}
              onDelete={handleDeleteAppointment}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Planning;
