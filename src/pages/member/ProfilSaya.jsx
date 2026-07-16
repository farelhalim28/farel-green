import { useState } from "react";
import { 
  MdEdit, 
  MdDownload, 
  MdVerified, 
  MdPhone, 
  MdEmail, 
  MdBadge,
  MdWaterDrop,
  MdWarningAmber,
  MdLocalHospital,
  MdEventRepeat,
  MdCelebration,
  MdCheckCircle
} from "react-icons/md";

export default function ProfilSaya() {
  // State interaktif untuk simulasi edit data akun
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nama: "Budi Santoso",
    email: "budi.santoso@gmail.com",
    no_telp: "081234567890",
    gol_darah: "O",
    alergi: "Antibiotik Penisilin",
    pj_medis: "drg. Farel Abdul Halim"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Kredensial profil pasien berhasil diperbarui dalam database lokal!");
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen font-sans selection:bg-blue-100">
      
      {/* ========================================================= */}
      {/* 1. PREMIUM BRANDED HEADER (DYNAMIC BLUE TO CYAN GRADIENT)  */}
      {/* ========================================================= */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-[32px] p-8 text-white shadow-xl shadow-blue-500/10 relative overflow-hidden group">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition duration-500"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              Portal Rekam Medis Pasien
            </span>
            <h1 className="text-3xl font-black tracking-tight">Profil Keanggotaan Saya</h1>
            <p className="text-blue-100 text-xs font-medium max-w-md leading-relaxed">
              Kelola informasi kredensial akun pribadi, hak eksklusif tingkat keanggotaan, serta akses rekam medis personal Anda secara real-time.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. LIVE PROFILE CARD - DATA BUDI SANTOSO                 */}
      {/* ========================================================= */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {/* Custom Initial Avatar */}
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-md shadow-blue-500/20 shrink-0">
              BS
            </div>
            
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{userData.nama}</h2>
                <span className="px-3 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider rounded-md border border-emerald-100 flex items-center gap-1">
                  <MdVerified size={12} /> Verified Active
                </span>
              </div>
              <p className="text-xs text-slate-400 font-bold flex items-center justify-center sm:justify-start gap-1">
                <MdBadge className="text-slate-400" size={14} /> ID Rekam Medis: <span className="font-mono text-slate-700 font-black bg-slate-100 px-1.5 py-0.5 rounded">RM-2026-088</span>
              </p>
              
              <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-md">
                  Silver Member Tier
                </span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-row lg:flex-col gap-2 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
            <button 
              onClick={() => setIsEditing(true)}
              className="flex-1 lg:flex-none justify-center bg-slate-900 text-white text-xs font-black uppercase tracking-wider px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-slate-800 transition shadow-sm"
            >
              <MdEdit size={16} /> Edit Data Akun
            </button>
            <button 
              onClick={() => alert("Mengunduh Kartu Digital E-Card SIGIGI Premium...")}
              className="flex-1 lg:flex-none justify-center bg-white text-slate-700 border border-slate-200 text-xs font-black uppercase tracking-wider px-4 py-3 rounded-xl flex items-center gap-2 hover:bg-slate-50 transition shadow-sm"
            >
              <MdDownload size={16} /> Unduh E-Card
            </button>
          </div>

        </div>

        {/* STATS COUNT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Loyalty Point</p>
            <h4 className="text-xl font-black text-blue-600 tracking-tight mt-1">0 Pts</h4>
          </div>
          <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Total Kunjungan</p>
            <h4 className="text-xl font-black text-slate-800 tracking-tight mt-1">12 Kali</h4>
          </div>
          <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Keanggotaan</p>
            <h4 className="text-xl font-black text-slate-800 tracking-tight mt-1">Silver Tier</h4>
          </div>
          <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100/60">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Terdaftar Sejak</p>
            <h4 className="text-xl font-black text-slate-800 tracking-tight mt-1">10 Jan 2024</h4>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. THE DIFFERENCE FEATURE: INTERACTIVE HEALTH ASSESSMENT   */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* INDEKS KESEHATAN GIGI (AI-HEALTH RADAR) */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <MdCheckCircle size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Dental Health Index (AI Evaluator)</h3>
              <p className="text-[10px] text-slate-400 font-medium">Kondisi kesehatan klinis mulut berdasarkan kunjungan terakhir.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/80 text-center">
              <span className="text-xs font-bold text-slate-400 block">Indeks Plak</span>
              <span className="text-2xl font-black text-emerald-600 block mt-1">0.8</span>
              <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block">Sangat Baik</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/80 text-center">
              <span className="text-xs font-bold text-slate-400 block">Kalkulus Gigi</span>
              <span className="text-2xl font-black text-amber-600 block mt-1">1.4</span>
              <span className="text-[9px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block">Sedang</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/80 text-center">
              <span className="text-xs font-bold text-slate-400 block">Resiko Karies</span>
              <span className="text-2xl font-black text-blue-600 block mt-1">Rendah</span>
              <span className="text-[9px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded mt-1 inline-block">Aman</span>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl flex items-start gap-3">
            <MdCelebration className="text-blue-600 shrink-0 mt-0.5" size={18} />
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              <strong className="text-slate-800">Catatan AI Dokter:</strong> Kebersihan mulut Budi dalam status prima. Pertahankan intensitas menyikat gigi 2 kali sehari dan kurangi konsumsi kafein berlebih untuk mencegah perubahan warna lapisan enamel.
            </p>
          </div>
        </div>

        {/* AUTOMATED NEXT CONTROL ALERTS */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
              <div className="p-2 bg-cyan-50 text-cyan-600 rounded-xl">
                <MdEventRepeat size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">Pengingat Kontrol Rutin</h3>
                <p className="text-[10px] text-slate-400 font-medium">Penjadwalan otomatis periodik.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Jadwal Scaling Berikutnya</span>
              <h5 className="text-sm font-black text-slate-800">05 Januari 2027</h5>
              <span className="text-[9px] font-medium text-slate-400 block">(Tepat 6 Bulan Sejak Perawatan Terakhir)</span>
            </div>
          </div>

          <button 
            onClick={() => alert("Mengalihkan ke modul AppointmentSaya.jsx untuk reservasi prioritas...")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider py-3 rounded-xl transition shadow-sm"
          >
            Klaim Antrean Prioritas
          </button>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 4. CLINICAL MEDICAL INFO & CONTACT PERSONAL                */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* INFORMASI PERSONAL KONTAK */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Informasi Personal Kontak</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100/40">
              <MdPhone className="text-blue-600 shrink-0" size={18} />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">Nomor Telepon Aktif</span>
                <span className="text-xs font-mono font-bold text-slate-700">{userData.no_telp}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100/40">
              <MdEmail className="text-blue-600 shrink-0" size={18} />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">Alamat Surat Elektronik</span>
                <span className="text-xs font-medium text-slate-700">{userData.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RINGKASAN INDIKASI MEDIS KLINIK */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Ringkasan Indikasi Medis Klinik</h3>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <MdWaterDrop className="text-rose-500 mx-auto mb-1" size={18} />
              <span className="text-[9px] text-slate-400 font-bold block">Gol. Darah</span>
              <span className="text-sm font-black text-slate-800">{userData.gol_darah}</span>
            </div>
            
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <MdWarningAmber className="text-amber-500 mx-auto mb-1" size={18} />
              <span className="text-[9px] text-slate-400 font-bold block">Kontraindikasi</span>
              <span className="text-[10px] font-black text-slate-800 line-clamp-1" title={userData.alergi}>{userData.alergi}</span>
            </div>
            
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <MdLocalHospital className="text-blue-600 mx-auto mb-1" size={18} />
              <span className="text-[9px] text-slate-400 font-bold block">PJ Medis Utama</span>
              <span className="text-[9px] font-black text-slate-800 line-clamp-1" title={userData.pj_medis}>{userData.pj_medis}</span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 5. EDIT DATA POPUP MODAL SCREEN (INTERACTIVE STATE)        */}
      {/* ========================================================= */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all">
          <form 
            onSubmit={handleSave} 
            className="bg-white rounded-[28px] max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 transform transition-all animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                Perbarui Profil Akun
              </h3>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)} 
                className="text-xs font-bold text-slate-400 hover:text-slate-600 px-2 py-1 rounded-lg hover:bg-slate-50 transition"
              >
                Tutup
              </button>
            </div>
            
            <div className="space-y-3 text-xs font-bold text-slate-700">
              <div>
                <label className="text-[10px] text-slate-400 font-black uppercase block mb-1">Nama Lengkap Pasien</label>
                <input 
                  type="text" 
                  name="nama"
                  required 
                  className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition text-slate-800 font-semibold" 
                  value={userData.nama} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div>
                <label className="text-[10px] text-slate-400 font-black uppercase block mb-1">Alamat Email</label>
                <input 
                  type="email" 
                  name="email"
                  required 
                  className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition text-slate-800 font-semibold" 
                  value={userData.email} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div>
                <label className="text-[10px] text-slate-400 font-black uppercase block mb-1">Nomor Handphone (WhatsApp)</label>
                <input 
                  type="text" 
                  name="no_telp"
                  required 
                  className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition text-slate-800 font-mono" 
                  value={userData.no_telp} 
                  onChange={handleInputChange} 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-400 font-black uppercase block mb-1">Golongan Darah</label>
                  <input 
                    type="text" 
                    name="gol_darah"
                    className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition text-slate-800 text-center font-bold" 
                    value={userData.gol_darah} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 font-black uppercase block mb-1">Kontraindikasi Alergi</label>
                  <input 
                    type="text" 
                    name="alergi"
                    className="w-full border border-slate-200 p-3 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition text-slate-800 font-semibold" 
                    value={userData.alergi} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 text-xs">
              <button 
                type="button" 
                onClick={() => setIsEditing(false)} 
                className="px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 font-black text-slate-400 transition uppercase tracking-wide"
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition uppercase tracking-wide shadow-sm"
              >
                Simpan Profil
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}