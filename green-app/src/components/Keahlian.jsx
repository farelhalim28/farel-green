// ================================
// Keahlian.js
// Letakkan file ini di: src/components/Keahlian.js
// ================================

function Keahlian({ daftarKeahlian }) {
  return (
    <div className="card">
      <div className="keahlian-section">
        <h2>💡 Keahlian</h2>

        <div className="skill-list">
          {daftarKeahlian.map((skill, index) => (
            <span className="skill-badge" key={index}>
              {skill}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Keahlian;