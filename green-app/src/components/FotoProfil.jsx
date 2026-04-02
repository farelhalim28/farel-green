// ================================
// FotoProfil.js
// Letakkan file ini di: src/components/FotoProfil.js
// ================================

function FotoProfil({ nama, profesi, foto }) {
  return (
    <div className="foto-profil-wrapper">
      {foto ? (
        <img
          src={foto}
          alt={nama}
          className="foto-profil-img"
        />
      ) : (
        <div className="foto-profil-placeholder">👤</div>
      )}
      <h1>{nama}</h1>
      <p>{profesi}</p>
    </div>
  );
}

export default FotoProfil;