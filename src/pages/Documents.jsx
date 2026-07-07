import { useState, useCallback, useMemo } from 'react';
import { getDocuments, addDocument, deleteDocument } from '../data/storage';
import { DataTable, FilterSelect, EmptyState } from '../components/common';
import { useForm } from '../hooks/useCustom';

const INITIAL_FORM_STATE = {
  fileName: '',
  fileType: '',
  description: '',
};

const DOC_TYPE_OPTIONS = [
  { value: '', label: '-- Sélectionner --' },
  { value: 'Ordonnance', label: 'Ordonnance' },
  { value: 'Bilan sanguin', label: 'Bilan sanguin' },
  { value: 'Radiographie', label: 'Radiographie' },
  { value: 'Courrier médical', label: 'Courrier médical' },
  { value: 'Autre', label: 'Autre' },
];

function Documents() {
  const [documents, setDocuments] = useState(() => getDocuments());
  const [filterType, setFilterType] = useState('');
  const { formData: docFormData, handleChange, handleReset } = useForm(INITIAL_FORM_STATE);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!docFormData.fileName || !docFormData.fileType) {
      alert('Veuillez remplir tous les champs!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const newDocument = {
        name: docFormData.fileName,
        type: docFormData.fileType,
        description: docFormData.description,
        fileData: event.target.result,
        fileSize: file.size,
      };

      addDocument(newDocument);
      setDocuments(getDocuments());
      handleReset();
      e.target.value = '';
    };

    reader.readAsArrayBuffer(file);
  }, [docFormData, handleReset]);

  const handleDeleteDocument = useCallback((id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce document?')) {
      deleteDocument(id);
      setDocuments(getDocuments());
    }
  }, []);

  const handleFilterChange = useCallback((e) => {
    setFilterType(e.target.value);
  }, []);

  // Documents filtrés (mémorisé)
  const filteredDocuments = useMemo(() =>
    filterType ? documents.filter(doc => doc.type === filterType) : documents,
    [documents, filterType]
  );

  // Types de documents disponibles (mémorisé)
  const documentTypes = useMemo(() => [
    { value: '', label: '-- Tous les documents --' },
    ...[...new Set(documents.map(doc => doc.type))].map(type => ({ value: type, label: type }))
  ], [documents]);

  const columns = useMemo(() => [
    { key: 'name', label: 'Nom' },
    { key: 'type', label: 'Type', render: (val) => <span className="badge bg-info">{val}</span> },
    { key: 'description', label: 'Description', render: (val) => val || '-' },
    { 
      key: 'uploadDate', 
      label: 'Date', 
      render: (val) => new Date(val).toLocaleDateString('fr-FR') 
    },
  ], []);

  return (
    <div className="container-fluid">
      <h2>Mes Documents Médicaux</h2>

      {/* Formulaire d'upload */}
      <div className="card mb-4 mt-4">
        <div className="card-body">
          <h5 className="card-title">Ajouter un document</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="fileName" className="form-label">Nom du document</label>
              <input
                type="text"
                className="form-control"
                id="fileName"
                placeholder="Ex: Bilan sanguin"
                name="fileName"
                value={docFormData.fileName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="fileType" className="form-label">Type de document</label>
              <select
                className="form-select"
                id="fileType"
                name="fileType"
                value={docFormData.fileType}
                onChange={handleChange}
              >
                {DOC_TYPE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description (optionnel)</label>
            <textarea
              className="form-control"
              id="description"
              rows="2"
              placeholder="Ajoutez une description..."
              name="description"
              value={docFormData.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fileInput" className="form-label">Sélectionner un fichier</label>
            <input
              type="file"
              className="form-control"
              id="fileInput"
              onChange={handleFileUpload}
            />
          </div>
        </div>
      </div>

      {/* Filtre */}
      {documentTypes.length > 1 && (
        <FilterSelect
          label="Filtrer par type:"
          value={filterType}
          onChange={handleFilterChange}
          options={documentTypes}
        />
      )}

      {/* Liste des documents */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Mes Documents ({filteredDocuments.length})</h5>
          {filteredDocuments.length === 0 ? (
            <EmptyState message="Aucun document pour le moment." icon="📄" />
          ) : (
            <DataTable
              columns={columns}
              data={filteredDocuments}
              onDelete={handleDeleteDocument}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Documents;
