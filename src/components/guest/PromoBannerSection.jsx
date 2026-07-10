import { MdOutlineStars, MdArrowForward } from "react-icons/md";

export default function PromoBannerSection() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-blue-700 via-blue-800 to-cyan-600 p-10 md:p-16 shadow-2xl text-white">
          {/* Dekorasi Ornamen Lingkaran */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
          
          <div className="relative z-10 grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-cyan-200 font-medium text-sm backdrop-blur-md mb-6">
                <MdOutlineStars className="text-lg" />
                Penawaran Terbatas Bulan Ini
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Gabung Member SIGIGI, Dapatkan Diskon Scaling Up To 30%!
              </h2>
              <p className="text-blue-100 mt-4 text-base md:text-lg max-w-xl leading-relaxed">
                Kumpulkan poin dari setiap transaksi perawatan gigi Anda, naikkan tier membermu dari Silver ke VIP, dan nikmati reward khususnya!
              </p>
            </div>
            <div className="flex lg:justify-end">
              <button className="w-full lg:w-auto px-8 py-4 bg-white text-blue-700 hover:bg-cyan-50 font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:-translate-y-1 transition duration-300">
                Daftar Member Sekarang
                <MdArrowForward className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}