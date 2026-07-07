import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAppointments } from '../data/storage';
import { StatCard, EmptyState, ListGroup } from '../components/common';

function Dashboard() {
  const [appointments] = useState(() => getAppointments());

  // Prochains rendez-vous (mémorisé)
  const upcomingAppointments = useMemo(() =>
    appointments
      .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
      .slice(0, 3),
    [appointments]
  );

  return (
    <div className="container-fluid">
      <h2>Bienvenue sur votre Dashboard</h2>

      {/* Cartes de statistiques */}
      <div className="row mt-4 mb-4">
        <div className="col-md-4">
          <StatCard title="Total Rendez-vous" value={appointments.length} />
        </div>
        <div className="col-md-4">
          <StatCard title="Documents" value="0" subtitle="À implémenter" />
        </div>
        <div className="col-md-4">
          <StatCard title="Constantes" value="0" subtitle="À implémenter" />
        </div>
      </div>

      {/* Prochains rendez-vous */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Prochains Rendez-vous</h5>
          {upcomingAppointments.length === 0 ? (
            <EmptyState message="Aucun rendez-vous à venir." icon="📅" />
          ) : (
            <>
              <ListGroup
                items={upcomingAppointments}
                keyField="id"
                renderItem={(apt) => (
                  <>
                    <h6 className="mb-1">{apt.doctor}</h6>
                    <p className="mb-1">
                      <strong>{apt.date}</strong> à <strong>{apt.time}</strong>
                    </p>
                    <p className="mb-0 text-muted">{apt.reason}</p>
                  </>
                )}
              />
              <Link to="/planning" className="btn btn-primary mt-3">
                Voir tout le planning
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Accès rapide */}
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Planning Médical</h5>
              <p>Gérez vos rendez-vous</p>
              <Link to="/planning" className="btn btn-outline-primary">Accéder</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h5 className="card-title">Documents</h5>
              <p>Consultez vos fichiers</p>
              <Link to="/documents" className="btn btn-outline-primary">Accéder</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
