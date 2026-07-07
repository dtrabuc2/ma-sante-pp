// Composant réutilisable pour les cartes statistiques
function StatCard({ title, value, subtitle, variant = 'primary' }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className={`display-4 text-${variant}`}>{value}</p>
        {subtitle && <small className="text-muted">{subtitle}</small>}
      </div>
    </div>
  );
}

export default StatCard;
