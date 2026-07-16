import {
  MdHistory,
  MdMedicalServices,
  MdCalendarMonth,
  MdPayments,
  MdVerified,
  MdReceiptLong,
  MdFileDownload,
  MdPerson
} from "react-icons/md";

export default function RiwayatKunjungan() {
  const riwayat = [
    {
      id: 1,
      tanggal: "05 Juli 2026",
      layanan: "Scaling Gigi Premium",
      dokter: "drg. Farel Abdul Halim",
      biaya: "Rp350.000",
      status: "Selesai",
      // Gambar Scaling/Pembersihan Gigi Profesional
      gambar: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      tanggal: "20 Juni 2026",
      layanan: "Tambal Gigi Estetik",
      dokter: "drg. Farel Abdul Halim",
      biaya: "Rp450.000",
      status: "Selesai",
      // Gambar Tambal Gigi / Dental Care Estetik
      gambar: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      tanggal: "12 Mei 2026",
      layanan: "Pembersihan Karang Gigi",
      dokter: "drg. Farel Abdul Halim",
      biaya: "Rp300.000",
      status: "Selesai",
      // Gambar Alat Dental / Pemeriksaan Gigi
      gambar: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 4,
      tanggal: "15 April 2026",
      layanan: "Bleaching Gigi Laser",
      dokter: "drg. Farel Abdul Halim",
      biaya: "Rp1.200.000",
      status: "Selesai",
      // Gambar Laser Whitening / Smile Estetik
      gambar: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=300&q=80"
    },
  ];

  return (
    <div className="p-6 space-y-8 font-sans bg-gradient-to-tr from-slate-50 via-white to-blue-50/10 min-h-screen selection:bg-indigo-100">

      {/* ========================================================= */}
      {/* 1. PREMIUM HEADER BANNER (ROYAL INDIGO GRADIENT)         */}
      {/* ========================================================= */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-650 to-indigo-800 rounded-[32px] p-8 md:p-10 text-white shadow-xl shadow-indigo-900/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-cyan-300">
              Medical Records
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Riwayat Kunjungan</h1>
            <p className="text-blue-100/80 text-xs md:text-sm font-medium max-w-xl leading-relaxed">
              Tinjau keseluruhan log rekam medis, rincian tindakan perawatan gigi, dan catatan invoice klinis terenkripsi Anda di platform SIGIGI.
            </p>
          </div>
          
          <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shrink-0 shadow-lg">
            <MdHistory size={32} className="text-white" />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SUMMARY STATS KPI GRID (MODERN FLOATING CARDS)         */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Total Kunjungan</p>
            <h3 className="text-2xl font-black text-slate-850 tracking-tight">28 Kali</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition duration-300">
            <MdHistory size={24} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Total Jenis Tindakan</p>
            <h3 className="text-2xl font-black text-slate-850 tracking-tight">15 Perawatan</h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition duration-300">
            <MdMedicalServices size={24} />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-300 flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Investasi Kesehatan</p>
            <h3 className="text-2xl font-black text-emerald-600 tracking-tight">Rp8,5 Jt</h3>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition duration-300">
            <MdPayments size={24} />
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. JURNAL TIMELINE CARDS WITH VISUAL IMAGES               */}
      {/* ========================================================= */}
      <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <MdReceiptLong size={22} />
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
              Jurnal Kronologis Tindakan Medis
            </h2>
            <p className="text-[10px] text-slate-400 font-medium">Log aktivitas kunjungan dengan visual rekam tindakan nyata</p>
          </div>
        </div>

        <div className="space-y-5">
          {riwayat.map((item) => (
            <div
              key={item.id}
              className="border-l-4 border-indigo-600 bg-slate-50/40 rounded-2xl p-5 hover:bg-white hover:border-l-8 hover:shadow-lg hover:shadow-indigo-900/[0.02] transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-5 items-start">
                
                {/* 📸 Thumbnail Gambar Medis Perawatan */}
                <div className="w-full md:w-32 h-24 shrink-0 rounded-xl overflow-hidden border border-slate-200/60 shadow-inner bg-slate-100">
                  <img 
                    src={item.gambar} 
                    alt={item.layanan} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80"; // Fallback image jika gagal load
                    }}
                  />
                </div>

                {/* 📝 Detail Konten & Informasi Dokter */}
                <div className="flex-1 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 w-full">
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-xs font-black font-mono">
                        <MdCalendarMonth size={14} className="text-indigo-600" />
                        {item.tanggal}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-slate-150/80 text-slate-600 px-3 py-1 rounded-lg text-xs font-semibold">
                        <MdPerson size={14} className="text-slate-400" />
                        {item.dokter}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <div>
                        <h3 className="font-extrabold text-slate-800 text-base hover:text-indigo-650 transition">
                          {item.layanan}
                        </h3>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                          Tindakan medis tercatat dalam database rekam medis terenkripsi klinik SIGIGI CRM.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 💰 Harga, Status & Tombol Unduh */}
                  <div className="flex sm:flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 shrink-0 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-200/50 w-full lg:w-auto">
                    <div className="text-left lg:text-right">
                      <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Biaya Perawatan</span>
                      <span className="text-base font-black text-slate-800 tracking-tight font-mono">{item.biaya}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm shadow-emerald-500/10">
                        <MdVerified size={13} />
                        {item.status}
                      </span>
                      
                      {/* Unduh button */}
                      <button className="p-2 bg-slate-100 hover:bg-indigo-600 text-slate-500 hover:text-white rounded-xl transition-all duration-200 border border-slate-200/40" title="Unduh Invoice">
                        <MdFileDownload size={18} />
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. CLINICAL SUMMARY FOOTER BOX                            */}
      {/* ========================================================= */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-48 h-48 bg-indigo-50/50 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 space-y-3">
          <span className="inline-block text-[10px] font-black tracking-widest bg-indigo-50 text-indigo-600 px-3 py-1 rounded-xl uppercase">
            Status Ringkasan
          </span>
          <h3 className="text-base font-black text-slate-800">
            Pasien Loyal Terverifikasi Aktif
          </h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-4xl">
            Berdasarkan akumulasi berkala, Anda tercatat telah menyelesaikan total 28 kunjungan klinis secara berkala di ekosistem SIGIGI CRM. Seluruh riwayat perawatan di atas berdampak langsung pada hak prioritas antrean reservasi Anda saat ini.
          </p>
        </div>
      </div>

    </div>
  );
}