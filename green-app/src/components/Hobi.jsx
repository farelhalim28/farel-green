// ================================
// Hobi.js
// Letakkan file ini di: src/components/Hobi.js
// ================================

function Hobi({ daftarHobi }) {
  return (
    <div className="card">
      <div className="hobi-section">
        <h2>🎯 Hobi & Minat</h2>

        <div className="hobi-grid">
          {daftarHobi.map((hobi, index) => (
            <div className="hobi-item" key={index}>
              <span>{hobi.emoji}</span>
              <span>{hobi.nama}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Hobi;