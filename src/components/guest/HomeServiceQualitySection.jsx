import { 
  MdOutlineShield, 
  MdPsychology, 
  MdFactCheck, 
  MdDevices 
} from "react-icons/md";

export default function HomeServiceQualitySection() {
  const qualities = [
    {
      icon: <MdOutlineShield />,
      title: "Standar Medis Steril & Aman",
      desc: "Setiap tindakan medis di SIGIGI dijamin oleh protokol sterilisasi internasional berlapis untuk keamanan mutlak Anda."
    },
    {
      icon: <MdDevices />,
      title: "Diagnosis Akurat Digital",
      desc: "Pelayanan kami didukung teknologi rontgen digital dan intraoral kamera agar hasil diagnosis gigi Anda 100% presisi."
    },
    {
      icon: <MdPsychology />,
      title: "Pendekatan Minim Rasa Sakit",
      desc: "Gak perlu takut ke dokter gigi lagi. Tim medis kami terlatih menggunakan teknik anestesi dan perawatan yang ramah & minim rasa sakit."
    },
    {
      icon: <MdFactCheck />,
      title: "Transparansi Riwayat & Biaya",
      desc: "Melalui sistem CRM, detail nota pembayaran dan rencana perawatan (treatment plan) Anda tercatat transparan tanpa biaya tersembunyi."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          
          {/* Sisi Kiri: Judul & Headline Produk Layanan */}
          <div className="lg:col-span-1">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
              Kualitas Pelayanan Kami
            </span>
            <h2 className="text-4xl font-bold text-slate-900 mt-3 leading-tight">
              Bagaimana Kami Menangani Senyum Anda?
            </h2>
            <p className="text-gray-500 mt-4 leading-relaxed">
              Bukan sekadar mengobati sakit gigi, ekosistem pelayanan di SIGIGI dirancang untuk memberikan pengalaman medis yang nyaman, modern, dan terpercaya dari hulu ke hilir.
            </p>
            <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <p className="text-sm text-slate-600 italic">
                "Kesehatan gigi adalah investasi jangka panjang. Sistem kami memastikan setiap pasien mendapatkan rekam medis yang terpantau berkala."
              </p>
            </div>
          </div>

          {/* Sisi Kanan: 4 Pilar Standar Layanan (Grid 2x2) */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {qualities.map((item, index) => (
              <div 
                key={index} 
                className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-blue-500/10 transition duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-5">
                  {item.icon}
                </div>
                <h3 className="font-bold text-xl text-slate-900">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}