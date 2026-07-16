import {
  MdCalendarMonth,
  MdAccessTime,
  MdPerson,
  MdCheckCircle,
  MdHourglassEmpty,
  MdAutorenew,
  MdMedicalServices,
  MdLocationOn,
  MdConfirmationNumber
} from "react-icons/md";

export default function AppointmentSaya() {
  const appointments = [
    {
      id: 1,
      layanan: "Scaling Gigi Premium",
      dokter: "drg. Farel Abdul Halim",
      tanggal: "15 Juni 2026",
      jam: "09:00 WIB",
      status: "Confirmed",
      ruangan: "Klinik Utama - Ruang 02",
      noAntrean: "A-04",
      gambar: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      layanan: "Kontrol Behel Berkala",
      dokter: "drg. Farel Abdul Halim",
      tanggal: "05 Juni 2026",
      jam: "13:00 WIB",
      status: "Completed",
      ruangan: "Klinik Spesialis - Ruang Ortho",
      noAntrean: "B-11",
      gambar: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 3,
      layanan: "Konsultasi Estetika Gigi",
      dokter: "drg. Farel Abdul Halim",
      tanggal: "20 Mei 2026",
      jam: "10:30 WIB",
      status: "Completed",
      ruangan: "Klinik Utama - Ruang 01",
      noAntrean: "A-08",
      gambar: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <div className="p-6 space-y-8 font-sans bg-gradient-to-tr from-slate-50 via-white to-blue-50/10 min-h-screen selection:bg-indigo-100">

      {/* ========================================================= */}
      {/* 1. PREMIUM HEADER BANNER (ROYAL BLUE TO INDIGO)          */}
      {/* ========================================================= */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800 rounded-[32px] p-8 md:p-10 text-white shadow-xl shadow-indigo-900/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-cyan-350">
              Reservations & Schedules
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Appointment Saya</h1>
            <p className="text-blue-100/80 text-xs md:text-sm font-medium max-w-xl leading-relaxed">
              Pantau jadwal janji temu dokter gigi Anda, kelola konfirmasi riwayat, serta lakukan reservasi ulang secara instan.
            </p>
          </div>
          
          <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shrink-0 shadow-lg">
            <MdCalendarMonth size={32} className="text-white" />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SUMMARY STATS KPI GRID (CLEAN COLOR THEMES)            */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between group">
          <div>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Total Kunjungan</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-850 tracking-tight mt-0.5">3</h3>
          </div>
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <MdCalendarMonth size={22} />
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between group">
          <div>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Dikonfirmasi</p>
            <h3 className="text-xl md:text-2xl font-black text-indigo-650 tracking-tight mt-0.5">1</h3>
          </div>
          <div className="p-2.5 bg-indigo-50 text-indigo-650 rounded-xl">
            <MdCheckCircle size={22} />
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between group">
          <div>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Menunggu</p>
            <h3 className="text-xl md:text-2xl font-black text-amber-500 tracking-tight mt-0.5">1</h3>
          </div>
          <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl">
            <MdHourglassEmpty size={22} />
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex items-center justify-between group">
          <div>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Selesai</p>
            <h3 className="text-xl md:text-2xl font-black text-slate-700 tracking-tight mt-0.5">1</h3>
          </div>
          <div className="p-2.5 bg-slate-100 text-slate-600 rounded-xl">
            <MdAutorenew size={22} />
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. CARD JANJI TEMU TERDEKAT (UPCOMING HERO CARD)         */}
      {/* ========================================================= */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl opacity-70"></div>
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-4 flex-1">
            <span className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-750 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
              ⚡ Janji Temu Terdekat Anda
            </span>
            
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
                Scaling Gigi Premium bersama drg. Farel Abdul Halim
              </h2>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                  <MdCalendarMonth className="text-indigo-600" size={15} />
                  Kamis, 15 Juni 2026
                </span>
                <span className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg font-mono text-indigo-750 font-bold">
                  <MdAccessTime className="text-indigo-600" size={15} />
                  09:00 WIB (Tepat Waktu)
                </span>
                <span className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">
                  <MdLocationOn className="text-indigo-600" size={15} />
                  Ruang 02 (Klinik Utama)
                </span>
              </div>
            </div>
          </div>

          {/* Badge Antrean */}
          <div className="flex items-center gap-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 w-full lg:w-auto shrink-0 justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">No. Antrean</p>
              <h4 className="text-2xl font-black text-indigo-700 font-mono tracking-tight">A-04</h4>
            </div>
            <div className="p-3 bg-white text-indigo-600 rounded-xl shadow-sm">
              <MdConfirmationNumber size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. DAFTAR ANTREAN & HISTORI JANJI TEMU                    */}
      {/* ========================================================= */}
      <div className="bg-white border border-slate-100 rounded-[32px] shadow-sm p-6 md:p-8 space-y-6">
        <div className="pb-4 border-b border-slate-100">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
            Daftar Antrean & Histori Janji Temu
          </h2>
          <p className="text-[10px] text-slate-400 font-medium mt-0.5">Kelola reservasi dental care Anda secara real-time</p>
        </div>

        <div className="space-y-5">
          {appointments.map((item) => (
            <div
              key={item.id}
              className={`border-l-4 ${item.status === 'Confirmed' ? 'border-indigo-650' : 'border-slate-300'} bg-slate-50/40 rounded-2xl p-5 hover:bg-white hover:border-l-8 hover:shadow-lg hover:shadow-indigo-900/[0.02] transition-all duration-300`}
            >
              <div className="flex flex-col md:flex-row gap-5 items-start">
                
                {/* Gambar Perawatan */}
                <div className="w-full md:w-36 h-24 shrink-0 rounded-xl overflow-hidden border border-slate-200/60 shadow-sm bg-slate-100">
                  <img 
                    src={item.gambar} 
                    alt={item.layanan} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=300&q=80";
                    }}
                  />
                </div>

                {/* Detail Konten Janji Temu */}
                <div className="flex-1 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 w-full">
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100/50 text-indigo-700 px-3 py-1 rounded-lg text-xs font-bold font-mono">
                        <MdCalendarMonth size={14} className="text-indigo-600" />
                        {item.tanggal}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-semibold">
                        <MdPerson size={14} className="text-slate-400" />
                        {item.dokter}
                      </span>
                      
                      {item.status === 'Confirmed' ? (
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider">
                          Confirmed
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-wider">
                          Completed
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-slate-800 text-base">
                        {item.layanan}
                      </h3>
                      <div className="flex items-center gap-4 text-[11px] text-slate-400 font-medium mt-1">
                        <span className="flex items-center gap-1">
                          <MdLocationOn size={13} className="text-slate-450" />
                          {item.ruangan}
                        </span>
                        <span className="flex items-center gap-1 font-mono font-bold text-slate-650 bg-indigo-50/50 px-1.5 py-0.5 rounded border border-indigo-100/20">
                          <MdConfirmationNumber size={13} className="text-indigo-605" />
                          Antrean: {item.noAntrean}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tombol Rebooking Premium - INDIGO BLUE (BEBAS HITAM!) */}
                  <div className="shrink-0 w-full lg:w-auto">
                    <button className="w-full lg:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/25 transition-all duration-200">
                      Booking Ulang
                    </button>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}