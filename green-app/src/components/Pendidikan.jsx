// ================================
// Pendidikan.js
// Letakkan file ini di: src/components/Pendidikan.js
// ================================

function Pendidikan({ riwayatPendidikan }) {
  return (
    <div className="card">
      <div className="pendidikan-section">
        <h2>🎓 Riwayat Pendidikan</h2>

        {riwayatPendidikan.map((item, index) => (
          <div className="pendidikan-item" key={index}>
            <div className="pendidikan-icon">{item.icon}</div>
            <div className="pendidikan-info">
              <p>{item.nama}</p>
              <span>{item.jurusan} · {item.tahun}</span>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Pendidikan;