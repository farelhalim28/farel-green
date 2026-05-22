export default function InputField({ label, value, onChange, error }) {
  return (
    <div className="form-group">
      <label>{label}</label>

      <input
        type="text"
        value={value}
        onChange={onChange}
      />

      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

