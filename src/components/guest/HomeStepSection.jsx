import { MdAppRegistration, MdCalendarMonth, MdCheckCircleOutline } from "react-icons/md";

export default function HomeStepSection() {
  const steps = [
    {
      icon: <MdAppRegistration />,
      step: "01",
      title: "Daftar Akun Member",
      desc: "Buat akun pasien digital Anda dalam 1 menit secara gratis untuk membuka fitur loyalty poin."
    },
    {
      icon: <MdCalendarMonth />,
      step: "02",
      title: "Reservasi Jadwal",
      desc: "Pilih dokter gigi spesialis pilihan Anda dan tentukan jam kunjungan yang sesuai kesibukan Anda."
    },
    {
      icon: <MdCheckCircleOutline />,
      step: "03",
      title: "Datang & Rawat Gigi",
      desc: "Tunjukkan QR Code member Anda ke resepsionis, nikmati perawatan, dan otomatis kumpulkan poin reward."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Alur Pasien</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">Semudah Itu Menggunakan Sistem SIGIGI</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative group hover:shadow-md transition">
              <span className="absolute top-6 right-8 text-5xl font-black text-slate-100 group-hover:text-blue-50 transition selection:bg-transparent">
                {item.step}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-6">
                {item.icon}
              </div>
              <h3 className="font-bold text-xl text-slate-900">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}