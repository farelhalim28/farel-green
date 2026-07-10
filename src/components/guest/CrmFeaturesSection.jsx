import {
  MdCalendarMonth,
  MdAssignmentInd,
  MdCardMembership,
  MdReceiptLong,
  MdAutoAwesome
} from "react-icons/md";

export default function CrmFeaturesSection() {
  const crmFeatures = [
    {
      icon: <MdCalendarMonth />,
      title: "Sistem Janji Temu Pintar",
      desc: "Booking jadwal dokter gigi favorit secara realtime tanpa antre lama di klinik. Dilengkapi pengingat otomatis.",
      badge: "Pasien & Admin"
    },
    {
      icon: <MdAssignmentInd />,
      title: "Rekam Medis Digital Terintegrasi",
      desc: "Riwayat kondisi gigi, rontgen, dan catatan dokter tercatat aman dalam sistem untuk penanganan yang akurat.",
      badge: "Aman & Enkripsi"
    },
    {
      icon: <MdCardMembership />,
      title: "Manajemen Otomatisasi Membership",
      desc: "Sistem otomatisasi tier membership (Silver, Gold, VIP) beserta akumulasi poin loyalty dari setiap transaksi.",
      badge: "Loyalty Tier"
    },
    {
      icon: <MdReceiptLong />,
      title: "Invoicing & Transparansi Biaya",
      desc: "Detail rincian biaya tindakan medis dikirim langsung ke dashboard akun member Anda tanpa biaya tersembunyi.",
      badge: "Realtime Data"
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <span className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-1.5">
            <MdAutoAwesome /> Integrasi Sistem CRM SIGIGI
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mt-5 leading-tight">
            Pelayanan Klinik & Teknologi <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Inovasi Digital Dalam Satu Genggaman</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            Kami menghubungkan manajemen internal admin dengan kenyamanan akses pasien lewat ekosistem digital terpadu untuk efisiensi layanan medis.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {crmFeatures.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col sm:flex-row gap-6 p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 group"
            >
              {/* ICON CONTAINER */}
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-3xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition duration-300">
                {item.icon}
              </div>
              
              {/* TEXT CONTENT */}
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-bold text-xl text-slate-900 tracking-tight">{item.title}</h3>
                  <span className="text-xs bg-slate-100 font-bold text-slate-600 px-2.5 py-1 rounded-md border border-slate-200/50">
                    {item.badge}
                  </span>
                </div>
                <p className="text-gray-500 mt-3 leading-relaxed text-sm md:text-base">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}