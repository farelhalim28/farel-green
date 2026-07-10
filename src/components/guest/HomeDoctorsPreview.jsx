import { MdStar, MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function HomeDoctorsPreview() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400" alt="Dokter 1" className="rounded-2xl h-60 w-full object-cover" />
          <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400" alt="Dokter 2" className="rounded-2xl h-60 w-full object-cover mt-6" />
        </div>
        
        <div>
          <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Tim Medis</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-3 leading-tight">Ditangani Oleh Dokter Spesialis Bersertifikat</h2>
          <p className="text-gray-500 mt-4 leading-relaxed">
            Klinik SIGIGI didukung oleh dokter gigi umum dan spesialis (Ortodonti, Bedah Mulut, Konservasi Gigi) lulusan universitas ternama yang siap memberikan konsultasi terbaik bagi Anda.
          </p>
          <div className="flex gap-6 my-8">
            <div>
              <h4 className="text-3xl font-bold text-blue-600">15+</h4>
              <p className="text-sm text-gray-500">Dokter Aktif</p>
            </div>
            <div className="border-l border-slate-200 pl-6">
              <h4 className="text-3xl font-bold text-yellow-500 inline-flex items-center gap-1"><MdStar /> 4.9</h4>
              <p className="text-sm text-gray-500">Rating Kepuasan</p>
            </div>
          </div>
          <button 
            onClick={() => navigate("/dokter")} 
            className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl inline-flex items-center gap-2 hover:bg-slate-800 transition"
          >
            Cek Jadwal Dokter <MdArrowForward />
          </button>
        </div>
      </div>
    </section>
  );
}