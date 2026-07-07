// Composant réutilisable pour les listes
function ListGroup({ items, keyField = 'id', renderItem, onDelete }) {
  return (
    <div className="list-group">
      {items.map(item => (
        <div key={item[keyField]} className="list-group-item">
          <div className="d-flex justify-content-between align-items-start">
            <div className="flex-grow-1">
              {renderItem(item)}
            </div>
            {onDelete && (
              <button
                className="btn btn-sm btn-danger ms-2"
                onClick={() => onDelete(item[keyField])}
              >
                Supprimer
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListGroup;
