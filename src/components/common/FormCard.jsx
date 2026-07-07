// Composant réutilisable pour les cartes formulaires
function FormCard({ title, onSubmit, children, submitButtonText = 'Enregistrer' }) {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <form onSubmit={onSubmit}>
          {children}
          <button type="submit" className="btn btn-primary">
            {submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormCard;
