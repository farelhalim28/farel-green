import { MdShield, MdCleanHands, MdHealthAndSafety } from "react-icons/md";

export default function DoctorProcedureInfo() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">Standar Medis</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">Prosedur Keamanan & Higienitas Tim Medis</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl text-2xl"><MdShield /></div>
            <div>
              <h4 className="font-bold text-slate-900">Sterilisasi 4 Tahap</h4>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">Semua instrumen medis melalui proses autoclave bersuhu tinggi standar internasional.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl text-2xl"><MdCleanHands /></div>
            <div>
              <h4 className="font-bold text-slate-900">APD Level 2 Lengkap</h4>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">Dokter dan asisten wajib mengenakan APD steril baru untuk setiap sesi pasien.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl text-2xl"><MdHealthAndSafety /></div>
            <div>
              <h4 className="font-bold text-slate-900">Uji Klinis Berkala</h4>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">Seluruh tim medis aktif terverifikasi oleh PDGI dan bebas dari riwayat penyakit menular.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}