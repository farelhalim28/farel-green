// ================================
// KontakSosmed.js
// Letakkan file ini di: src/components/KontakSosmed.js
// ================================

function KontakSosmed({ email, noHp, instagram, github, linkedin }) {
  return (
    <div className="card">
      <div className="kontak-section">
        <h2>📱 Kontak & Sosial Media</h2>

        <div className="kontak-list">

          <div className="kontak-item">
            <span className="kontak-icon">📧</span>
            <div className="kontak-info">
              <label>Email</label>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          </div>

          <div className="kontak-item">
            <span className="kontak-icon">📞</span>
            <div className="kontak-info">
              <label>No. HP / WhatsApp</label>
              <p>{noHp}</p>
            </div>
          </div>

          <div className="kontak-item">
            <span className="kontak-icon">📸</span>
            <div className="kontak-info">
              <label>Instagram</label>
              <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer">
                @{instagram}
              </a>
            </div>
          </div>

          <div className="kontak-item">
            <span className="kontak-icon">🐙</span>
            <div className="kontak-info">
              <label>GitHub</label>
              <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer">
                github.com/{github}
              </a>
            </div>
          </div>

          <div className="kontak-item">
            <span className="kontak-icon">💼</span>
            <div className="kontak-info">
              <label>LinkedIn</label>
              <a href={`https://linkedin.com/in/${linkedin}`} target="_blank" rel="noreferrer">
                linkedin.com/in/{linkedin}
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default KontakSosmed;