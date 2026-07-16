import { useState } from "react";
import { 
  MdStars, 
  MdWorkspacePremium, 
  MdLeaderboard,
  MdCardGiftcard, 
  MdHealing,
  MdMedicalServices
} from "react-icons/md";

export default function LoyaltyPoint() {
  // Simulasi state point Budi Santoso (Silver menuju Platinum)
  const [currentPoints, setCurrentPoints] = useState(2350);
  const targetPoints = 5000; // Target poin untuk unlock Platinum Tier
  const pointsNeeded = targetPoints - currentPoints;
  const progressPercentage = (currentPoints / targetPoints) * 100;

  return (
    <div className="p-6 space-y-8 bg-slate-50/50 min-h-screen font-sans">
      
      {/* ========================================================= */}
      {/* 1. HERO BANNER - SOLID BLUE PREMIUM (ANTI-NORAK)          */}
      {/* ========================================================= */}
      <div className="relative bg-blue-600 rounded-3xl p-8 md:p-10 text-white shadow-sm overflow-hidden">
        {/* Pola grid halus transparan agar terlihat profesional */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-blue-100">
              <MdStars className="animate-spin text-amber-300" style={{ animationDuration: '8s' }} />
              Loyalty Program Active
            </span>
            <h1 className="text-3xl font-black tracking-tight">Loyalty Point</h1>
            <p className="text-blue-100/80 text-xs md:text-sm font-medium max-w-xl leading-relaxed">
              Kumpulkan poin loyalitas dari setiap tindakan perawatan gigi Anda di SIGIGI. Tukarkan langsung dengan benefit eksklusif dan reward pilihan di bawah ini.
            </p>
          </div>
          
          <div className="bg-white/10 border border-white/15 p-5 rounded-2xl flex items-center gap-4 shrink-0 shadow-sm backdrop-blur-sm">
            <div className="p-3 bg-blue-500 rounded-xl">
              <MdWorkspacePremium size={24} className="text-white" />
            </div>
            <div>
              <span className="text-[9px] text-blue-200 font-extrabold uppercase tracking-widest block">Tingkat Anda</span>
              <span className="text-base font-black text-white">Tier Silver</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. STATS OVERVIEW CARDS (SOLID BASE COLOR)                */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Poin Aktif */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center justify-between hover:border-blue-200 hover:shadow-md transition duration-300 group">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-extrabold tracking-wider uppercase block">TOTAL POIN AKTIF</span>
            <h4 className="text-2xl font-black text-blue-600 tracking-tight">{currentPoints} Pts</h4>
          </div>
          <span className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition duration-300">
            <MdStars size={24} />
          </span>
        </div>

        {/* Level Keanggotaan */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center justify-between hover:border-blue-200 hover:shadow-md transition duration-300 group">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-extrabold tracking-wider uppercase block">LEVEL KEANGGOTAAN</span>
            <h4 className="text-2xl font-black text-blue-600 tracking-tight">Tier Silver</h4>
          </div>
          <span className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition duration-300">
            <MdWorkspacePremium size={24} />
          </span>
        </div>

        {/* Peringkat Pasien */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center justify-between hover:border-blue-200 hover:shadow-md transition duration-300 group">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-extrabold tracking-wider uppercase block">PERINGKAT PASIEN</span>
            <h4 className="text-2xl font-black text-blue-600 tracking-tight">#12 Klinik</h4>
          </div>
          <span className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition duration-300">
            <MdLeaderboard size={24} />
          </span>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. PROGRESS METRIC TO PLATINUM (SINKRON DATA BUDI)         */}
      {/* ========================================================= */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-black text-slate-800 uppercase tracking-widest">Progress Menuju Tier Platinum</span>
          <span className="bg-blue-50 border border-blue-100 text-blue-700 px-3.5 py-1 rounded-full text-xs font-black font-mono">
            {currentPoints} / {targetPoints} Pts
          </span>
        </div>
        
        <div className="relative">
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-1000" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <p className="text-xs text-slate-400 font-semibold">
          Butuh <strong className="text-blue-600">{pointsNeeded} poin</strong> lagi untuk otomatis naik ke tingkat <strong className="text-slate-800">Tier Platinum</strong>.
        </p>
      </div>

      {/* ========================================================= */}
      {/* 4. REWARDS CATALOG SECTION                                */}
      {/* ========================================================= */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <MdCardGiftcard className="text-blue-600" size={20} />
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Reward Dapat Ditukar</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Item 1 - Voucher Diskon */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-blue-200 hover:-translate-y-1 transition duration-300 space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100/30">
                <MdCardGiftcard size={24} />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-black text-slate-800">Voucher Diskon Perawatan 10%</h5>
                <p className="text-[11px] text-slate-400 font-medium">Berlaku untuk semua jenis tindakan perawatan gigi non-bedah.</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <span className="text-xs font-black text-blue-600 font-mono">150 Pts</span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black px-4 py-2 rounded-xl transition shadow-sm">
                Tukarkan
              </button>
            </div>
          </div>

          {/* Item 2 - Scaling Gigi */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-blue-200 hover:-translate-y-1 transition duration-300 space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100/30">
                <MdHealing size={24} />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-black text-slate-800">Free Treatment Scaling Premium</h5>
                <p className="text-[11px] text-slate-400 font-medium">Pembersihan karang gigi komprehensif menggunakan teknologi terbaru.</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <span className="text-xs font-black text-blue-600 font-mono">500 Pts</span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black px-4 py-2 rounded-xl transition shadow-sm">
                Tukarkan
              </button>
            </div>
          </div>

          {/* Item 3 - Konsultasi Dokter Spesialis */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:border-blue-200 hover:-translate-y-1 transition duration-300 space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100/30">
                <MdMedicalServices size={24} />
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-black text-slate-800">Konsultasi VIP Dokter Spesialis</h5>
                <p className="text-[11px] text-slate-400 font-medium">Konsultasi prioritas tatap muka langsung dengan dokter spesialis pilihan.</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <span className="text-xs font-black text-blue-600 font-mono">350 Pts</span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black px-4 py-2 rounded-xl transition shadow-sm">
                Tukarkan
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}