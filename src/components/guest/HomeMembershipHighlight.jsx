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
          Sistem CRM kami mengonversi biaya perawatan Anda menjadi poin reward yang bisa ditukarkan dengan potongan harga langsung sesuai level keanggotaan Anda.
        </p>
        
        {/* Grid Card - 4 Kolom (Reguler, Silver, Gold, Platinum) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 text-left">
          
          {/* Reguler Tier */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl hover:shadow-xl transition duration-300 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-slate-600 text-lg flex items-center gap-2">
                🥉 Reguler Tier
              </h4>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                Tingkat awal pasca registrasi. Kumpulkan poin dasar setiap kunjungan dan dapatkan pengingat jadwal periksa otomatis.
              </p>
            </div>
          </div>
          
          {/* Silver Tier */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl hover:shadow-xl transition duration-300 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-blue-600 text-lg flex items-center gap-2">
                🥈 Silver Tier
              </h4>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                Dapatkan potongan 5% untuk setiap pembersihan karang gigi dan tindakan pencegahan dasar setelah mencapai 500 poin.
              </p>
            </div>
          </div>
          
          {/* Gold Tier */}
          <div className="bg-white border-2 border-blue-500 p-6 rounded-3xl shadow-md relative transition duration-300 flex flex-col justify-between">
            <span className="absolute -top-3 left-6 bg-blue-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
              Paling Populer
            </span>
            <div>
              <h4 className="font-bold text-amber-500 text-lg flex items-center gap-2 mt-1">
                🥇 Gold Tier
              </h4>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                Potongan 10% untuk semua tindakan, prioritas antrean, serta tambahan poin bonus setelah mengumpulkan 1.000 poin.
              </p>
            </div>
          </div>
          
          {/* Platinum Tier */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl hover:shadow-xl transition duration-300 flex flex-col justify-between">
            <div>
              <h4 className="font-bold text-purple-600 text-lg flex items-center gap-2">
                💎 Platinum Tier
              </h4>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                Diskon mutlak 15% semua tindakan medis + gratis konsultasi berkala dengan dokter spesialis saat poin mencapai 2.000.
              </p>
            </div>
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