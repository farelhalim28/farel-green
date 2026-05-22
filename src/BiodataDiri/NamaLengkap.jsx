// ================================
// NamaLengkap.js
// Letakkan file ini di: src/components/NamaLengkap.js
// ================================

function NamaLengkap({ namaLengkap, namaPanggilan, tempatLahir, tanggalLahir, jenisKelamin, agama }) {
  return (
    <div className="card">
      <div className="nama-section">
        <h2>📋 Data Diri</h2>
        <div className="nama-grid">

          <div className="nama-item">
            <label>Nama Lengkap</label>
            <p>{namaLengkap}</p>
          </div>

          <div className="nama-item">
            <label>Nama Panggilan</label>
            <p>{namaPanggilan}</p>
          </div>

          <div className="nama-item">
            <label>Tempat Lahir</label>
            <p>{tempatLahir}</p>
          </div>

          <div className="nama-item">
            <label>Tanggal Lahir</label>
            <p>{tanggalLahir}</p>
          </div>

          <div className="nama-item">
            <label>Jenis Kelamin</label>
            <p>{jenisKelamin}</p>
          </div>

          <div className="nama-item">
            <label>Agama</label>
            <p>{agama}</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default NamaLengkap;