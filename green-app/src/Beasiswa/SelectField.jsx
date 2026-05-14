export default function SelectField({ label, value, onChange, options, error }) {
  return (
    <div className="form-group">
      <label>{label}</label>

      <select value={value} onChange={onChange}>
        <option value="">-- Pilih --</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

