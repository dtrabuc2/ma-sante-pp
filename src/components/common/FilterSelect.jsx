// Composant réutilisable pour les filtres
function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="mb-3">
      {label && <label className="form-label">{label}</label>}
      <select
        className="form-select"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterSelect;
