import { useState, useMemo } from "react";
import wisataData from "./wisata.json";

const PER_PAGE = 8;

const KATEGORI_COLOR = {
  Pantai:  { bg: "rgba(14,165,233,0.15)",  border: "rgba(14,165,233,0.4)",  text: "#38bdf8"  },
  Budaya:  { bg: "rgba(245,158,11,0.15)",  border: "rgba(245,158,11,0.4)",  text: "#fbbf24"  },
  Alam:    { bg: "rgba(16,185,129,0.15)",  border: "rgba(16,185,129,0.4)",  text: "#34d399"  },
  Bahari:  { bg: "rgba(59,130,246,0.15)",  border: "rgba(59,130,246,0.4)",  text: "#60a5fa"  },
  Sejarah: { bg: "rgba(139,92,246,0.15)",  border: "rgba(139,92,246,0.4)",  text: "#a78bfa"  },
};

export default function AdminView() {
  const [dataForm, setDataForm] = useState({ searchTerm: "", selectedKategori: "", selectedProvinsi: "" });
  const [sort, setSort] = useState({ key: "id", dir: "asc" });
  const [page, setPage] = useState(1);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
    setPage(1);
  };

  const handleSort = (key) => {
    setSort((prev) => ({ key, dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc" }));
  };

  const allKategori = useMemo(() => [...new Set(wisataData.map((w) => w.kategori))], []);
  const allProvinsi = useMemo(() => [...new Set(wisataData.map((w) => w.provinsi))].sort(), []);

  const filtered = useMemo(() => {
    const term = dataForm.searchTerm.toLowerCase();
    let data = wisataData.filter((w) => {
      const matchS = w.nama.toLowerCase().includes(term) || w.provinsi.toLowerCase().includes(term) || w.lokasi.kota.toLowerCase().includes(term);
      const matchK = dataForm.selectedKategori ? w.kategori === dataForm.selectedKategori : true;
      const matchP = dataForm.selectedProvinsi ? w.provinsi === dataForm.selectedProvinsi : true;
      return matchS && matchK && matchP;
    });
    return [...data].sort((a, b) => {
      let av = a[sort.key] ?? "", bv = b[sort.key] ?? "";
      if (typeof av === "string") { av = av.toLowerCase(); bv = bv.toLowerCase(); }
      return av < bv ? (sort.dir === "asc" ? -1 : 1) : av > bv ? (sort.dir === "asc" ? 1 : -1) : 0;
    });
  }, [dataForm, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const rows = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const stats = [
    { label: "Total Destinasi", val: wisataData.length,                               icon: "🏝️" },
    { label: "Hasil Filter",    val: filtered.length,                                  icon: "🔍" },
    { label: "Tiket Gratis",    val: wisataData.filter(w => w.harga_tiket === 0).length, icon: "🎫" },
    { label: "Rata-rata Rating",val: (wisataData.reduce((a,b)=>a+b.rating,0)/wisataData.length).toFixed(1), icon: "⭐" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        .av-page {
          background:#0a0a0f; font-family:'DM Sans',sans-serif;
          color:#f0f0f8; min-height:100vh; padding-bottom:5rem;
        }

        /* Topbar */
        .av-topbar {
          background:#111118; border-bottom:1px solid rgba(255,255,255,0.07);
          padding:1rem 1.5rem; display:flex; align-items:center; justify-content:space-between;
          position:sticky; top:0; z-index:20;
        }
        .av-topbar-left { display:flex; align-items:center; gap:0.75rem; }
        .av-logo {
          width:36px; height:36px; border-radius:10px;
          background:linear-gradient(135deg,#6c63ff,#00e5ff);
          display:flex; align-items:center; justify-content:center;
          font-weight:800; font-size:0.9rem; color:#fff; flex-shrink:0;
        }
        .av-topbar h1 { font-family:'Syne',sans-serif; font-size:1.1rem; font-weight:700; color:#fff; margin:0; }
        .av-topbar p { font-size:0.7rem; color:rgba(240,240,248,0.4); margin:0; }
        .av-online { display:flex; align-items:center; gap:6px; font-size:0.75rem; color:rgba(240,240,248,0.5); background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); padding:5px 12px; border-radius:99px; }
        .av-dot { width:7px; height:7px; border-radius:50%; background:#34d399; }

        /* Layout */
        .av-body { max-width:1400px; margin:0 auto; padding:2rem 1.5rem; }

        /* Stats */
        .av-stats { display:grid; grid-template-columns:repeat(2,1fr); gap:1rem; margin-bottom:2rem; }
        @media(min-width:768px){ .av-stats { grid-template-columns:repeat(4,1fr); } }
        .av-stat {
          background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
          border-radius:16px; padding:1.1rem 1.25rem;
          display:flex; align-items:center; gap:0.85rem;
        }
        .av-stat-icon { font-size:1.6rem; flex-shrink:0; }
        .av-stat strong { font-size:1.6rem; font-weight:800; color:#fff; font-family:'Syne',sans-serif; display:block; line-height:1; }
        .av-stat span { font-size:0.7rem; color:rgba(240,240,248,0.45); text-transform:uppercase; letter-spacing:0.07em; margin-top:2px; display:block; }

        /* Filter */
        .av-filter-box {
          background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07);
          border-radius:16px; padding:1.25rem; margin-bottom:1.5rem;
        }
        .av-filter-label { font-size:0.7rem; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; color:rgba(240,240,248,0.4); margin-bottom:0.75rem; }
        .av-filter-row { display:flex; gap:0.75rem; flex-wrap:wrap; }
        .av-input, .av-select {
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);
          color:#f0f0f8; padding:0.7rem 1rem; border-radius:10px; outline:none;
          font-family:'DM Sans',sans-serif; font-size:0.85rem; transition:border-color 0.2s;
        }
        .av-input:focus, .av-select:focus { border-color:rgba(108,99,255,0.6); }
        .av-input { flex:2; min-width:200px; }
        .av-select { flex:1; min-width:150px; cursor:pointer; }
        .av-select option { background:#1a1a2e; }
        .av-btn-reset {
          background:rgba(255,107,157,0.1); border:1px solid rgba(255,107,157,0.3);
          color:#ff6b9d; padding:0.7rem 1rem; border-radius:10px; cursor:pointer;
          font-size:0.85rem; font-family:'DM Sans',sans-serif; font-weight:500; white-space:nowrap;
        }

        /* Table container */
        .av-table-wrap {
          background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07);
          border-radius:16px; overflow:hidden;
        }
        .av-table-header {
          padding:1rem 1.25rem; border-bottom:1px solid rgba(255,255,255,0.07);
          display:flex; align-items:center; justify-content:space-between;
        }
        .av-table-header p { font-size:0.9rem; font-weight:600; color:#fff; margin:0; }
        .av-table-header span { font-size:0.75rem; color:rgba(240,240,248,0.4); }
        .av-scroll { overflow-x:auto; }

        /* TABLE */
        table.av-table {
          width:100%; border-collapse:collapse;
          font-size:0.85rem;
        }
        table.av-table thead tr {
          background:rgba(255,255,255,0.05);
          border-bottom:1px solid rgba(255,255,255,0.08);
        }
        table.av-table thead th {
          padding:0.85rem 1rem; text-align:left;
          font-size:0.7rem; font-weight:600; text-transform:uppercase;
          letter-spacing:0.07em; color:rgba(240,240,248,0.45);
          white-space:nowrap; user-select:none;
        }
        table.av-table thead th.sortable { cursor:pointer; }
        table.av-table thead th.sortable:hover { color:#a29dff; }
        table.av-table thead th .sort-icon { margin-left:4px; font-size:0.65rem; opacity:0.6; }
        table.av-table tbody tr {
          border-bottom:1px solid rgba(255,255,255,0.05);
          transition:background 0.15s;
        }
        table.av-table tbody tr:last-child { border-bottom:none; }
        table.av-table tbody tr:hover { background:rgba(108,99,255,0.06); }
        table.av-table tbody td { padding:0.85rem 1rem; vertical-align:middle; color:rgba(240,240,248,0.8); }

        /* Cell specific */
        .td-num { font-family:monospace; font-size:0.75rem; color:rgba(240,240,248,0.35); }
        .td-foto img {
          width:56px; height:44px; object-fit:cover; border-radius:8px;
          border:1px solid rgba(255,255,255,0.1);
        }
        .td-nama strong { display:block; font-weight:600; color:#f0f0f8; font-size:0.88rem; }
        .td-nama small { font-size:0.75rem; color:rgba(240,240,248,0.4); }
        .td-nama .td-desc { font-size:0.75rem; color:rgba(240,240,248,0.35); margin-top:2px; max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .td-badge {
          display:inline-block; font-size:0.7rem; font-weight:600;
          padding:3px 10px; border-radius:99px;
        }
        .td-rating { display:flex; align-items:center; gap:5px; font-weight:700; color:#fbbf24; }
        .td-gratis { display:inline-block; font-size:0.75rem; font-weight:600; background:rgba(52,211,153,0.15); border:1px solid rgba(52,211,153,0.35); color:#34d399; padding:3px 10px; border-radius:99px; }
        .td-harga { font-weight:600; color:#60a5fa; font-size:0.82rem; }
        .td-jam { font-size:0.78rem; color:rgba(240,240,248,0.4); white-space:nowrap; }
        .td-fas { display:flex; flex-wrap:wrap; gap:4px; max-width:160px; }
        .td-fas-tag { font-size:0.68rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); color:rgba(240,240,248,0.5); padding:2px 7px; border-radius:6px; }

        /* Empty */
        .av-empty { text-align:center; padding:4rem 1rem; color:rgba(240,240,248,0.3); }
        .av-empty div { font-size:3rem; margin-bottom:0.75rem; }

        /* Pagination */
        .av-pagination {
          border-top:1px solid rgba(255,255,255,0.07);
          padding:0.85rem 1.25rem; display:flex; align-items:center;
          justify-content:space-between; flex-wrap:wrap; gap:0.75rem;
        }
        .av-pagination p { font-size:0.78rem; color:rgba(240,240,248,0.4); margin:0; }
        .av-pagination p strong { color:#f0f0f8; }
        .av-pages { display:flex; gap:6px; align-items:center; }
        .av-page-btn {
          min-width:32px; height:32px; padding:0 8px; border-radius:8px;
          background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08);
          color:rgba(240,240,248,0.5); font-size:0.8rem; cursor:pointer;
          display:flex; align-items:center; justify-content:center; transition:all 0.15s;
        }
        .av-page-btn:hover:not(:disabled) { background:rgba(108,99,255,0.2); border-color:rgba(108,99,255,0.5); color:#fff; }
        .av-page-btn.active { background:rgba(108,99,255,0.3); border-color:rgba(108,99,255,0.6); color:#fff; font-weight:600; }
        .av-page-btn:disabled { opacity:0.25; cursor:not-allowed; }
      `}</style>

      <div className="av-page">
        {/* ── TOPBAR ── */}
        <div className="av-topbar">
          <div className="av-topbar-left">
            <div className="av-logo">W</div>
            <div>
              <h1>WisataAdmin</h1>
              <p>Manajemen Destinasi Wisata Indonesia</p>
            </div>
          </div>
          <div className="av-online">
            <div className="av-dot" />
            Admin
          </div>
        </div>

        <div className="av-body">
          {/* ── STAT CARDS ── */}
          <div className="av-stats">
            {stats.map((s) => (
              <div key={s.label} className="av-stat">
                <div className="av-stat-icon">{s.icon}</div>
                <div>
                  <strong>{s.val}</strong>
                  <span>{s.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── FILTER ── */}
          <div className="av-filter-box">
            <p className="av-filter-label">Pencarian & Filter</p>
            <div className="av-filter-row">
              <input
                type="text" name="searchTerm" value={dataForm.searchTerm}
                onChange={handleChange} placeholder="Cari nama, kota, provinsi..."
                className="av-input"
              />
              <select name="selectedKategori" value={dataForm.selectedKategori} onChange={handleChange} className="av-select">
                <option value="">Semua Kategori</option>
                {allKategori.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
              <select name="selectedProvinsi" value={dataForm.selectedProvinsi} onChange={handleChange} className="av-select">
                <option value="">Semua Provinsi</option>
                {allProvinsi.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              {(dataForm.searchTerm || dataForm.selectedKategori || dataForm.selectedProvinsi) && (
                <button className="av-btn-reset"
                  onClick={() => { setDataForm({ searchTerm: "", selectedKategori: "", selectedProvinsi: "" }); setPage(1); }}>
                  ✕ Reset
                </button>
              )}
            </div>
          </div>

          {/* ── TABLE ── */}
          <div className="av-table-wrap">
            <div className="av-table-header">
              <p>Daftar Destinasi Wisata</p>
              <span>{filtered.length} data ditemukan</span>
            </div>

            <div className="av-scroll">
              <table className="av-table">
                {/* HEAD */}
                <thead>
                  <tr>
                    <th style={{width:"48px"}}>#</th>
                    <th style={{width:"72px"}}>Foto</th>
                    <th className="sortable" onClick={() => handleSort("nama")}>
                      Nama & Lokasi <span className="sort-icon">{sort.key==="nama"?(sort.dir==="asc"?"▲":"▼"):"⇅"}</span>
                    </th>
                    <th className="sortable" onClick={() => handleSort("kategori")}>
                      Kategori <span className="sort-icon">{sort.key==="kategori"?(sort.dir==="asc"?"▲":"▼"):"⇅"}</span>
                    </th>
                    <th className="sortable" onClick={() => handleSort("provinsi")}>
                      Provinsi <span className="sort-icon">{sort.key==="provinsi"?(sort.dir==="asc"?"▲":"▼"):"⇅"}</span>
                    </th>
                    <th className="sortable" onClick={() => handleSort("rating")}>
                      Rating <span className="sort-icon">{sort.key==="rating"?(sort.dir==="asc"?"▲":"▼"):"⇅"}</span>
                    </th>
                    <th className="sortable" onClick={() => handleSort("harga_tiket")}>
                      Harga Tiket <span className="sort-icon">{sort.key==="harga_tiket"?(sort.dir==="asc"?"▲":"▼"):"⇅"}</span>
                    </th>
                    <th>Jam Operasional</th>
                    <th>Fasilitas</th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={9}>
                        <div className="av-empty">
                          <div>🔭</div>
                          <p>Tidak ada data yang cocok</p>
                        </div>
                      </td>
                    </tr>
                  ) : rows.map((item) => {
                    const kStyle = KATEGORI_COLOR[item.kategori] || { bg:"rgba(255,255,255,0.08)", border:"rgba(255,255,255,0.15)", text:"#aaa" };
                    return (
                      <tr key={item.id}>
                        {/* # */}
                        <td className="td-num">{String(item.id).padStart(2,"0")}</td>

                        {/* Foto */}
                        <td className="td-foto">
                          <img src={item.gambar} alt={item.nama}
                            onError={(e) => { e.target.src=`https://picsum.photos/seed/${item.id}a/80/60`; }} />
                        </td>

                        {/* Nama & Lokasi */}
                        <td className="td-nama">
                          <strong>{item.nama}</strong>
                          <small>📍 {item.lokasi.kota}, {item.provinsi}</small>
                          <div className="td-desc">{item.deskripsi}</div>
                        </td>

                        {/* Kategori */}
                        <td>
                          <span className="td-badge"
                            style={{ background: kStyle.bg, border: `1px solid ${kStyle.border}`, color: kStyle.text }}>
                            {item.kategori}
                          </span>
                        </td>

                        {/* Provinsi */}
                        <td style={{fontSize:"0.82rem",whiteSpace:"nowrap"}}>{item.provinsi}</td>

                        {/* Rating */}
                        <td>
                          <div className="td-rating">
                            <span>★</span>
                            <span>{item.rating}</span>
                          </div>
                        </td>

                        {/* Harga */}
                        <td>
                          {item.harga_tiket === 0
                            ? <span className="td-gratis">Gratis</span>
                            : <span className="td-harga">Rp {item.harga_tiket.toLocaleString("id-ID")}</span>
                          }
                        </td>

                        {/* Jam */}
                        <td className="td-jam">
                          {item.jam_operasional.buka} – {item.jam_operasional.tutup}
                        </td>

                        {/* Fasilitas */}
                        <td>
                          <div className="td-fas">
                            {item.fasilitas.slice(0, 2).map((f) => (
                              <span key={f} className="td-fas-tag">{f}</span>
                            ))}
                            {item.fasilitas.length > 2 && (
                              <span className="td-fas-tag">+{item.fasilitas.length - 2}</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="av-pagination">
                <p>Halaman <strong>{page}</strong> / <strong>{totalPages}</strong> &mdash; {filtered.length} total data</p>
                <div className="av-pages">
                  <button className="av-page-btn" disabled={page===1} onClick={() => setPage(p=>p-1)}>←</button>
                  {[...Array(totalPages)].map((_,i) => (
                    <button key={i} className={`av-page-btn${page===i+1?" active":""}`} onClick={() => setPage(i+1)}>{i+1}</button>
                  ))}
                  <button className="av-page-btn" disabled={page===totalPages} onClick={() => setPage(p=>p+1)}>→</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}