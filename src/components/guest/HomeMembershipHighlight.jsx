import { MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function HomeMembershipHighlight() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Header Section */}
        <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
          Program Loyalitas Pasien
        </span>
        <h2 className="text-4xl font-bold text-slate-900 mt-3 leading-tight">
          Makin Sering Kontrol, Makin Banyak Untung
        </h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto text-base">
          Sistem CRM kami mengonversi biaya perawatan Anda menjadi poin reward yang bisa ditukarkan dengan potongan harga langsung.
        </p>
        
        {/* Grid Card Versi Terang & Elegan */}
        <div className="grid md:grid-cols-3 gap-6 mt-14 text-left">
          
          {/* Silver Tier */}
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:shadow-xl transition duration-300">
            <h4 className="font-bold text-blue-600 text-xl flex items-center gap-2">
              🥈 Silver Tier
            </h4>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Dapatkan potongan 5% untuk setiap pembersihan karang gigi dan tindakan pencegahan dasar.
            </p>
          </div>
          
          {/* Gold Tier */}
          <div className="bg-white border-2 border-blue-500 p-8 rounded-3xl shadow-md md:-translate-y-2 relative transition duration-300">
            <span className="absolute -top-3 left-6 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Paling Populer
            </span>
            <h4 className="font-bold text-amber-500 text-xl flex items-center gap-2">
              🥇 Gold Tier
            </h4>
            <p className="text-slate-600 text-sm mt-3 leading-relaxed">
              Potongan 10% semua tindakan dan dapatkan prioritas booking tanpa antrean kasir.
            </p>
          </div>
          
          {/* VIP Platinum */}
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:shadow-xl transition duration-300">
            <h4 className="font-bold text-purple-600 text-xl flex items-center gap-2">
              💎 VIP Platinum
            </h4>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Diskon 15% semua tindakan medis + gratis konsultasi berkala langsung dengan dokter spesialis.
            </p>
          </div>
          
        </div>

        {/* Tombol CTA */}
        <div className="mt-14">
          <button 
            onClick={() => navigate("/membership")} 
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-2xl inline-flex items-center gap-2 transition duration-300 shadow-lg shadow-cyan-500/20"
          >
            Pelajari Sistem Tiering
            <MdArrowForward className="text-xl" />
          </button>
        </div>
        
      </div>
    </section>
  );
}