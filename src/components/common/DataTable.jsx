// Composant réutilisable pour les tableaux de données
function DataTable({ columns, data, onDelete, keyField = 'id' }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm">
        <thead className="table-light">
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
            {onDelete && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row[keyField]}>
              {columns.map(col => (
                <td key={`${row[keyField]}-${col.key}`}>
                  {col.render ? col.render(row[col.key], row) : row[col.key] || '-'}
                </td>
              ))}
              {onDelete && (
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(row[keyField])}
                  >
                    Supprimer
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
