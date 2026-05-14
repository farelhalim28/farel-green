import { useState, useMemo, useEffect, useRef } from "react";
import wisataData from "./wisata.json";

const KATEGORI_ICON = {
  Pantai: "🏖️", Budaya: "🏛️", Alam: "🌿", Bahari: "🤿", Sejarah: "🏰",
};

const ACCENT_COLORS = [
  { bg: "rgba(108,99,255,0.2)",  border: "rgba(108,99,255,0.4)",  text: "#a29dff" },
  { bg: "rgba(0,229,255,0.15)",  border: "rgba(0,229,255,0.35)",  text: "#00e5ff" },
  { bg: "rgba(255,107,157,0.15)",border: "rgba(255,107,157,0.35)",text: "#ff6b9d" },
  { bg: "rgba(52,211,153,0.15)", border: "rgba(52,211,153,0.35)", text: "#34d399" },
  { bg: "rgba(251,191,36,0.15)", border: "rgba(251,191,36,0.35)", text: "#fbbf24" },
];

export default function GuestView() {
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedKategori: "",
    selectedProvinsi: "",
  });
  const cardRefs = useRef([]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const allKategori = useMemo(() => [...new Set(wisataData.map((w) => w.kategori))], []);
  const allProvinsi = useMemo(() => [...new Set(wisataData.map((w) => w.provinsi))].sort(), []);

  const filtered = useMemo(() => {
    const term = dataForm.searchTerm.toLowerCase();
    return wisataData.filter((w) => {
      const matchSearch =
        w.nama.toLowerCase().includes(term) ||
        w.deskripsi.toLowerCase().includes(term) ||
        w.provinsi.toLowerCase().includes(term);
      const matchKat = dataForm.selectedKategori ? w.kategori === dataForm.selectedKategori : true;
      const matchProv = dataForm.selectedProvinsi ? w.provinsi === dataForm.selectedProvinsi : true;
      return matchSearch && matchKat && matchProv;
    });
  }, [dataForm]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, filtered.length);
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      setTimeout(() => {
        card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, i * 60);
    });
  }, [filtered]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .gv-page {
          background: #0a0a0f;
          font-family: 'DM Sans', sans-serif;
          color: #f0f0f8;
          min-height: 100vh;
          padding: 2.5rem 1.25rem 6rem;
          position: relative;
          overflow-x: hidden;
        }
        .gv-orb { position:fixed; border-radius:50%; filter:blur(90px); opacity:0.12; pointer-events:none; z-index:0; }
        .gv-orb-1 { width:500px; height:500px; background:#6c63ff; top:-150px; right:-100px; }
        .gv-orb-2 { width:400px; height:400px; background:#00e5ff; bottom:5%; left:-120px; }
        .gv-orb-3 { width:300px; height:300px; background:#ff6b9d; bottom:35%; right:8%; }
        .gv-wrap { position:relative; z-index:1; max-width:1200px; margin:0 auto; }

        /* Header */
        .gv-header { text-align:center; margin-bottom:3rem; }
        .gv-header h1 {
          font-family:'Syne',sans-serif;
          font-size:clamp(2.4rem,6vw,4rem);
          font-weight:800;
          background:linear-gradient(135deg,#00e5ff,#6c63ff,#ff6b9d);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          letter-spacing:-0.02em; line-height:1.1; margin-bottom:0.5rem;
        }
        .gv-header p { color:rgba(240,240,248,0.5); font-size:1rem; font-weight:300; }
        .gv-stats { display:flex; justify-content:center; gap:1rem; margin-top:1.5rem; flex-wrap:wrap; }
        .gv-stat { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:0.6rem 1.4rem; text-align:center; }
        .gv-stat strong { display:block; font-size:1.4rem; font-weight:800; color:#fff; font-family:'Syne',sans-serif; }
        .gv-stat span { font-size:0.68rem; color:rgba(240,240,248,0.4); text-transform:uppercase; letter-spacing:0.08em; }

        /* Controls */
        .gv-controls { display:flex; gap:0.75rem; margin-bottom:1rem; flex-wrap:wrap; }
        .gv-input, .gv-select {
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);
          color:#f0f0f8; padding:0.8rem 1rem; border-radius:12px; outline:none;
          font-family:'DM Sans',sans-serif; font-size:0.875rem; transition:border-color 0.2s;
        }
        .gv-input:focus, .gv-select:focus { border-color:rgba(108,99,255,0.6); }
        .gv-input { flex:2; min-width:220px; }
        .gv-select { flex:1; min-width:160px; cursor:pointer; }
        .gv-select option { background:#1a1a2e; color:#f0f0f8; }
        .gv-btn-reset {
          background:rgba(255,107,157,0.1); border:1px solid rgba(255,107,157,0.3);
          color:#ff6b9d; padding:0.8rem 1rem; border-radius:12px;
          cursor:pointer; font-size:0.875rem; font-family:'DM Sans',sans-serif;
          font-weight:500; white-space:nowrap; transition:background 0.2s;
        }
        .gv-btn-reset:hover { background:rgba(255,107,157,0.2); }
        .gv-result { font-size:0.8rem; color:rgba(240,240,248,0.4); margin-bottom:1.5rem; }
        .gv-result strong { color:#00e5ff; }

        /* Responsive Grid */
        .gv-grid { display:grid; gap:1.25rem; grid-template-columns:1fr; }
        @media(min-width:640px)  { .gv-grid { grid-template-columns:repeat(2,1fr); } }
        @media(min-width:1024px) { .gv-grid { grid-template-columns:repeat(3,1fr); } }
        @media(min-width:1280px) { .gv-grid { grid-template-columns:repeat(4,1fr); } }

        /* Card */
        .gv-card {
          background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
          border-radius:20px; overflow:hidden; opacity:0; transform:translateY(20px);
          transition:border-color 0.25s,box-shadow 0.25s; display:flex; flex-direction:column;
        }
        .gv-card:hover {
          border-color:rgba(108,99,255,0.45);
          box-shadow:0 20px 50px rgba(0,0,0,0.6),0 0 0 1px rgba(108,99,255,0.15);
          transform:translateY(-4px) !important;
        }
        .gv-img-wrap { position:relative; height:160px; overflow:hidden; flex-shrink:0; }
        .gv-img-wrap img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s; }
        .gv-card:hover .gv-img-wrap img { transform:scale(1.07); }
        .gv-img-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(10,10,15,0.85) 0%,transparent 55%); }
        .gv-kat-badge {
          position:absolute; top:10px; left:10px; font-size:10px; font-weight:600;
          padding:3px 10px; border-radius:99px; backdrop-filter:blur(8px);
          background:rgba(10,10,15,0.65); border:1px solid rgba(255,255,255,0.15); color:#fff;
        }
        .gv-rating {
          position:absolute; top:10px; right:10px; font-size:11px; font-weight:700;
          padding:3px 8px; border-radius:99px; background:rgba(10,10,15,0.7);
          border:1px solid rgba(251,191,36,0.45); color:#fbbf24;
        }
        .gv-body { padding:1.25rem; flex:1; display:flex; flex-direction:column; gap:0.6rem; }
        .gv-body-top { display:flex; align-items:flex-start; justify-content:space-between; gap:0.5rem; }
        .gv-icon { width:38px; height:38px; border-radius:10px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:1.1rem; }
        .gv-id { font-size:10px; color:rgba(240,240,248,0.35); background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); padding:3px 8px; border-radius:99px; }
        .gv-body h3 { font-family:'Syne',sans-serif; font-size:1.05rem; font-weight:700; color:#f0f0f8; margin:0; line-height:1.2; }
        .gv-loc { font-size:0.75rem; color:rgba(240,240,248,0.4); display:flex; align-items:center; gap:4px; }
        .gv-desc { font-size:0.82rem; color:rgba(240,240,248,0.5); line-height:1.6; flex:1; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
        .gv-tags { display:flex; flex-wrap:wrap; gap:5px; }
        .gv-tag { font-size:9px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; padding:3px 9px; border-radius:99px; }
        .gv-footer { border-top:1px solid rgba(255,255,255,0.06); padding-top:0.75rem; margin-top:auto; display:flex; justify-content:space-between; align-items:center; }
        .gv-price { font-size:0.82rem; font-weight:700; }
        .gv-jam { font-size:0.7rem; color:rgba(240,240,248,0.35); }
        .gv-empty { text-align:center; padding:5rem 1rem; color:rgba(240,240,248,0.3); }
        .gv-empty-icon { font-size:3.5rem; margin-bottom:1rem; }
      `}</style>

      <div className="gv-page">
        <div className="gv-orb gv-orb-1" />
        <div className="gv-orb gv-orb-2" />
        <div className="gv-orb gv-orb-3" />

        <div className="gv-wrap">
          {/* ── HEADER ── */}
          <header className="gv-header">
            <h1>Wisata Indonesia</h1>
            <p>🇮🇩 Jelajahi keindahan destinasi Nusantara</p>
            <div className="gv-stats">
              <div className="gv-stat"><strong>{wisataData.length}</strong><span>Destinasi</span></div>
              <div className="gv-stat"><strong>{allProvinsi.length}</strong><span>Provinsi</span></div>
              <div className="gv-stat"><strong>{allKategori.length}</strong><span>Kategori</span></div>
              <div className="gv-stat"><strong>{wisataData.filter(w => w.harga_tiket === 0).length}</strong><span>Gratis</span></div>
            </div>
          </header>

          {/* ── SEARCH & FILTER ── */}
          <div className="gv-controls">
            <input
              type="text"
              name="searchTerm"
              value={dataForm.searchTerm}
              onChange={handleChange}
              placeholder="Cari destinasi, kota, provinsi..."
              className="gv-input"
            />
            <select name="selectedKategori" value={dataForm.selectedKategori} onChange={handleChange} className="gv-select">
              <option value="">Semua Kategori</option>
              {allKategori.map((k) => <option key={k} value={k}>{KATEGORI_ICON[k]} {k}</option>)}
            </select>
            <select name="selectedProvinsi" value={dataForm.selectedProvinsi} onChange={handleChange} className="gv-select">
              <option value="">Semua Provinsi</option>
              {allProvinsi.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            {(dataForm.searchTerm || dataForm.selectedKategori || dataForm.selectedProvinsi) && (
              <button className="gv-btn-reset"
                onClick={() => setDataForm({ searchTerm: "", selectedKategori: "", selectedProvinsi: "" })}>
                ✕ Reset
              </button>
            )}
          </div>
          <p className="gv-result">
            Menampilkan <strong>{filtered.length}</strong> dari {wisataData.length} destinasi
          </p>

          {/* ── GRID ── */}
          {filtered.length === 0 ? (
            <div className="gv-empty">
              <div className="gv-empty-icon">🔭</div>
              <p>Destinasi tidak ditemukan. Coba kata kunci lain.</p>
            </div>
          ) : (
            <div className="gv-grid">
              {filtered.map((item, i) => {
                const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
                return (
                  <div key={item.id} className="gv-card" ref={(el) => (cardRefs.current[i] = el)}>
                    {/* Image */}
                    <div className="gv-img-wrap">
                      <img src={item.gambar} alt={item.nama}
                        onError={(e) => { e.target.src = `https://picsum.photos/seed/${item.id}w/400/300`; }} />
                      <div className="gv-img-overlay" />
                      <span className="gv-kat-badge">{KATEGORI_ICON[item.kategori]} {item.kategori}</span>
                      <span className="gv-rating">★ {item.rating}</span>
                    </div>

                    {/* Body */}
                    <div className="gv-body">
                      <div className="gv-body-top">
                        <div className="gv-icon" style={{ background: accent.bg, border: `1px solid ${accent.border}` }}>
                          {KATEGORI_ICON[item.kategori]}
                        </div>
                        <span className="gv-id">#{String(item.id).padStart(2, "0")}</span>
                      </div>
                      <h3>{item.nama}</h3>
                      <div className="gv-loc"><span>📍</span><span>{item.lokasi.kota}, {item.provinsi}</span></div>
                      <p className="gv-desc">{item.deskripsi}</p>
                      <div className="gv-tags">
                        {item.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="gv-tag"
                            style={{ background: accent.bg, border: `1px solid ${accent.border}`, color: accent.text }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="gv-footer">
                        <span className="gv-price" style={{ color: item.harga_tiket === 0 ? "#34d399" : "#00e5ff" }}>
                          {item.harga_tiket === 0 ? "🎫 Gratis" : `Rp ${item.harga_tiket.toLocaleString("id-ID")}`}
                        </span>
                        <span className="gv-jam">{item.jam_operasional.buka} – {item.jam_operasional.tutup}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}