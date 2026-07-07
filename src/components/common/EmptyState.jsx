// Composant réutilisable pour l'état vide
function EmptyState({ message, icon = '📋' }) {
  return (
    <div className="text-center py-5">
      <p className="display-1">{icon}</p>
      <p className="text-muted">{message}</p>
    </div>
  );
}

export default EmptyState;
