import { useState, useEffect } from "react";
import {
  MdWorkspacePremium,
  MdStars,
  MdCalendarMonth,
  MdLocalOffer,
  MdTrendingUp,
  MdHistory,
  MdEmojiEvents,
  MdCheckCircle,
  MdInfoOutline
} from "react-icons/md";

export default function DashboardMember() {
  const [userData, setUserData] = useState({
    nama: "Budi Santoso",
    membership: "Silver",
    points: 1250,
    kunjungan: 16,
    promo: 4
  });

  const [activeChart, setActiveChart] = useState("kebersihan"); // "kebersihan" atau "poin"

  // Ambil data session agar dinamis
  useEffect(() => {
    const session = localStorage.getItem("user_session") || localStorage.getItem("currentMember");
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setUserData(prev => ({
          ...prev,
          nama: parsed.nama || prev.nama,
          membership: parsed.membership || prev.membership,
          points: parsed.points || prev.points
        }));
      } catch (e) {
        console.error("Gagal membaca session di dashboard", e);
      }
    }
  }, []);

  return (
    <div className="space-y-6 p-1 font-sans">
      
      {/* ========================================================= */}
      {/* 1. HERO CARD: EXCLUSIVE MEMBERSHIP PROMO (SEKARANG PALING ATAS) */}
      {/* ========================================================= */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        {/* Dekorasi Cahaya Modern */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-cyan-400/10 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <span className="bg-white/15 border border-white/20 text-blue-100 text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full">
              👑 {userData.membership} Member Benefit Active
            </span>
            <h2 className="text-3xl font-black tracking-tight pt-1 leading-tight">
              Senyum Sehat, Keuntungan Berlipat!
            </h2>
            <p className="text-blue-100/90 text-sm font-medium">
              Nikmati fasilitas prioritas reservasi, potongan langsung perawatan bulanan, dan kumpulkan poin loyalitas di setiap kunjungan Anda bersama SIGIGI.
            </p>
          </div>

          <button className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3.5 rounded-2xl text-xs font-black tracking-wide shadow-lg shadow-blue-900/10 hover:scale-[1.02] transition-all duration-200 shrink-0">
            Reservasi Sekarang
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. GRID KPI / METRIC CARDS                                */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* TIER */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center mb-4">
            <MdWorkspacePremium className="text-2xl text-amber-500" />
          </div>
          <span className="text-slate-400 text-[10px] font-bold tracking-wider uppercase">Level Anda</span>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-1">{userData.membership}</h3>
        </div>

        {/* POINTS */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
            <MdStars className="text-2xl text-indigo-500" />
          </div>
          <span className="text-slate-400 text-[10px] font-bold tracking-wider uppercase">Total Poin</span>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-1">{userData.points} Pts</h3>
        </div>

        {/* VISITS */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <MdCalendarMonth className="text-2xl text-blue-500" />
          </div>
          <span className="text-slate-400 text-[10px] font-bold tracking-wider uppercase">Kunjungan</span>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-1">{userData.kunjungan}x</h3>
        </div>

        {/* PROMO */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
            <MdLocalOffer className="text-2xl text-emerald-500" />
          </div>
          <span className="text-slate-400 text-[10px] font-bold tracking-wider uppercase">Promo Aktif</span>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-1">{userData.promo} Voucher</h3>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. GRAFIK KESEHATAN MULUT MODERN & MUDAH DIBACA           */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center">
              <MdTrendingUp className="text-blue-600 text-xl" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-800 tracking-tight">Personal Dental Analytics</h3>
              <p className="text-slate-400 text-[10px] font-bold tracking-wider uppercase">Visualisasi Klinis Pasien: {userData.nama}</p>
            </div>
          </div>

          {/* Toggle Switch Model Tab */}
          <div className="bg-slate-50 p-1.5 rounded-2xl flex gap-1 self-start sm:self-auto border border-slate-100">
            <button 
              onClick={() => setActiveChart("kebersihan")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeChart === "kebersihan" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-700"}`}
            >
              Tren Kebersihan Mulut
            </button>
            <button 
              onClick={() => setActiveChart("poin")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeChart === "poin" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-700"}`}
            >
              Akumulasi Loyalty Point
            </button>
          </div>
        </div>

        {/* GRAFIK CONTAINER */}
        <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100 relative">
          
          {activeChart === "kebersihan" ? (
            <div>
              {/* Header Parameter */}
              <div className="flex justify-between items-center mb-8">
                <span className="bg-blue-100/60 border border-blue-200/50 text-blue-800 text-[10px] font-black px-3.5 py-1.5 rounded-xl uppercase tracking-wider">
                  Parameter: Indeks Plak & Karies (Target: &lt; 1.0)
                </span>
                <span className="bg-emerald-500/10 text-emerald-600 text-[10px] font-extrabold px-3 py-1 rounded-full border border-emerald-200/30">
                  KONDISI PRIMA
                </span>
              </div>

              {/* Batang Grafik Kebersihan Mulut */}
              <div className="grid grid-cols-4 items-end gap-6 h-48 relative border-b border-slate-200/80 pb-2">
                {/* Jan '26 (Tinggi: 85%) */}
                <div className="flex flex-col items-center gap-2 group">
                  <span className="opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-lg transition-opacity absolute mb-36">1.9 (Kotor)</span>
                  <div className="w-full bg-gradient-to-t from-blue-300 to-blue-400 rounded-2xl h-36 transition-all duration-300 hover:scale-[1.02]"></div>
                  <span className="text-[10px] font-bold text-slate-400">Jan '26</span>
                </div>

                {/* Mar '26 (Tinggi: 65%) */}
                <div className="flex flex-col items-center gap-2 group">
                  <span className="opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-lg transition-opacity absolute mb-28">1.4 (Sedang)</span>
                  <div className="w-full bg-gradient-to-t from-blue-400 to-blue-500 rounded-2xl h-28 transition-all duration-300 hover:scale-[1.02]"></div>
                  <span className="text-[10px] font-bold text-slate-400">Mar '26</span>
                </div>

                {/* Mei '26 (Tinggi: 45%) */}
                <div className="flex flex-col items-center gap-2 group">
                  <span className="opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-[10px] px-2 py-1 rounded-lg transition-opacity absolute mb-20">1.1 (Sehat)</span>
                  <div className="w-full bg-gradient-to-t from-blue-500 via-blue-600 to-indigo-600 rounded-2xl h-20 transition-all duration-300 hover:scale-[1.02]"></div>
                  <span className="text-[10px] font-bold text-slate-400">Mei '26</span>
                </div>

                {/* Jul '26 (Tinggi: 25%) */}
                <div className="flex flex-col items-center gap-2 group">
                  <span className="opacity-0 group-hover:opacity-100 bg-emerald-600 text-white text-[10px] px-2 py-1 rounded-lg transition-opacity absolute mb-12">0.8 (Sehat!)</span>
                  <div className="w-full bg-gradient-to-t from-emerald-400 to-emerald-500 rounded-2xl h-12 transition-all duration-300 hover:scale-[1.02] border border-emerald-300"></div>
                  <span className="text-[10px] font-bold text-emerald-600">Jul '26 (Now)</span>
                </div>
              </div>

              {/* ⚠️ PENJELASAN TENTANG GRAFIK BIAR PASIEN FAHAM */}
              <div className="mt-5 flex gap-3 items-start bg-blue-50/50 border border-blue-100/50 p-4 rounded-2xl">
                <MdInfoOutline className="text-blue-500 mt-0.5 shrink-0" size={18} />
                <div className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Bagaimana cara membaca grafik ini?</strong><br />
                  Sumbu vertikal menunjukkan tingkat plak dan kotoran gigi Anda. <span className="text-emerald-600 font-bold">Semakin pendek batangnya, berarti gigi Anda semakin bersih, prima, dan bebas kuman!</span> Selamat! Kebiasaan sikat gigi Anda bulan ini sangat luar biasa.
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Grafik Poin Loyalty */}
              <div className="flex justify-between items-center mb-8">
                <span className="bg-amber-100/60 border border-amber-200/50 text-amber-800 text-[10px] font-black px-3.5 py-1.5 rounded-xl uppercase tracking-wider">
                  Total Akumulasi Poin Member
                </span>
                <span className="text-amber-600 text-[10px] font-extrabold">+450 Pts Bulan Ini</span>
              </div>

              {/* Batang Grafik Loyalty Poin */}
              <div className="grid grid-cols-4 items-end gap-6 h-48 relative border-b border-slate-200/80 pb-2">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full bg-slate-200 rounded-2xl h-16 transition-all duration-300"></div>
                  <span className="text-[10px] font-bold text-slate-400">Apr '26</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full bg-slate-300 rounded-2xl h-24 transition-all duration-300"></div>
                  <span className="text-[10px] font-bold text-slate-400">Mei '26</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full bg-amber-200 rounded-2xl h-36 transition-all duration-300"></div>
                  <span className="text-[10px] font-bold text-slate-400">Jun '26</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full bg-gradient-to-t from-amber-400 to-orange-500 rounded-2xl h-44 transition-all duration-300"></div>
                  <span className="text-[10px] font-bold text-amber-600">Jul '26 (Now)</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. MEMBERSHIP PROGRESS TIMELINE                           */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <MdTrendingUp className="text-blue-600 text-2xl" />
          <h2 className="text-base font-black text-slate-800 tracking-tight">Progress Membership</h2>
        </div>

        <div className="flex justify-between mb-2 text-xs font-bold text-slate-700">
          <span>Tier {userData.membership}</span>
          <span className="font-mono text-blue-600">{userData.points} / 2.000 Pts</span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner p-[2px]">
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-500" style={{ width: "62.5%" }}></div>
        </div>

        <p className="mt-3 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <span>🚀</span> Kumpulkan <strong className="text-slate-800">750 poin</strong> lagi untuk otomatis naik kelas ke <strong className="text-indigo-600">Platinum Membership</strong>.
        </p>
      </div>

      {/* ========================================================= */}
      {/* 5. BENEFITS & NEXT APPOINTMENTS GRID                      */}
      {/* ========================================================= */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* BENEFIT SECTION */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <h2 className="text-base font-black text-slate-800 tracking-tight mb-5">Benefit Level Gold</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Diskon Perawatan 10%",
              "Priority Booking Utama",
              "Reminder Kontrol Otomatis",
              "Promo Spesial Ulang Tahun",
              "Loyalty Point Reward 1.5x",
              "Konsultasi Online Gratis"
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3">
                <MdCheckCircle className="text-emerald-500 shrink-0" size={16} />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* NEXT APPOINTMENT */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <h2 className="text-base font-black text-slate-800 tracking-tight mb-5">Appointment Berikutnya</h2>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 rounded-3xl p-5 relative overflow-hidden">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Tanggal Kunjungan</p>
                <h3 className="font-extrabold text-sm text-slate-800 mt-1">20 Juni 2026</h3>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">Dokter Gigi Anda</p>
                <h3 className="font-extrabold text-sm text-slate-800 mt-1">Drg. Administrator</h3>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-blue-200/40 flex justify-between items-center">
              <span className="text-[10px] font-black text-blue-600 bg-blue-100/55 px-3 py-1 rounded-lg">TERJADWAL</span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-xs font-black shadow-md shadow-blue-100 transition-all duration-200">
                Lihat Detail
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 6. PROMO & RECENT ACTIVITIES                              */}
      {/* ========================================================= */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* PROMO */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MdEmojiEvents className="text-amber-500 text-2xl" />
            <h2 className="text-base font-black text-slate-800 tracking-tight">Promo Menarik Minggu Ini</h2>
          </div>

          <div className="space-y-3">
            {[
              { label: "Diskon Scaling Gigi 15%", style: "bg-amber-500/5 text-amber-800 border-amber-100" },
              { label: "Cashback 100 Point Setiap Tambal Gigi", style: "bg-blue-500/5 text-blue-800 border-blue-100" },
              { label: "Bonus Konsultasi Implan Gigi Gratis", style: "bg-emerald-500/5 text-emerald-800 border-emerald-100" }
            ].map((p, i) => (
              <div key={i} className={`p-4 rounded-2xl border text-xs font-bold flex justify-between items-center ${p.style}`}>
                <span>{p.label}</span>
                <span className="text-[10px] font-black bg-white px-2.5 py-1 rounded-lg shadow-sm">KLAIM</span>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITIES */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <MdHistory className="text-blue-500 text-2xl" />
            <h2 className="text-base font-black text-slate-800 tracking-tight">Aktivitas Terakhir Anda</h2>
          </div>

          <div className="space-y-4">
            {[
              { detail: "Scaling Gigi Premium - Selesai", date: "04 Juni 2026", color: "border-blue-500" },
              { detail: "Mendapat +150 Loyalty Point dari Transaksi", date: "04 Juni 2026", color: "border-emerald-500" },
              { detail: "Selamat! Keanggotaan Berhasil Naik Ke Level Gold", date: "01 Juni 2026", color: "border-amber-500" }
            ].map((act, i) => (
              <div key={i} className={`border-l-4 ${act.color} pl-4 py-1`}>
                <h4 className="text-xs font-bold text-slate-800 leading-tight">{act.detail}</h4>
                <span className="text-[10px] font-bold text-slate-400 mt-1 inline-block">{act.date}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}