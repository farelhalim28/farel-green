import { MdOutlineMedicalServices, MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function HomeServicesPreview() {
  const navigate = useNavigate();
  
  const topServices = [
    { title: "Scaling Gigi", desc: "Pembersihan karang gigi mendalam untuk mencegah masalah gusi." },
    { title: "Tambal Gigi Estetik", desc: "Restorasi gigi berlubang menggunakan komposit resin sewarna gigi." },
    { title: "Invisalign & Behel", desc: "Perataan posisi gigi dengan teknologi ortodonti modern." },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12 items-center">
        <div className="lg:col-span-1">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Layanan Unggulan</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-3 leading-tight">Perawatan Gigi Populer Pasien Kami</h2>
          <p className="text-gray-500 mt-4 mb-8">Berikut adalah beberapa tindakan medis yang paling sering dicari oleh member SIGIGI.</p>
          <button 
            onClick={() => navigate("/layanan")} 
            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition"
          >
            Lihat Semua Layanan <MdArrowForward />
          </button>
        </div>
        
        <div className="lg:col-span-2 grid md:grid-cols-3 gap-6">
          {topServices.map((srv, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mb-4">
                <MdOutlineMedicalServices />
              </div>
              <h3 className="font-bold text-lg text-slate-900">{srv.title}</h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}