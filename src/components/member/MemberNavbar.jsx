import { useState, useEffect } from "react";
import { 
  MdNotificationsNone, 
  MdSearch, 
  MdStars, 
  MdWorkspacePremium,
  MdLayers
} from "react-icons/md";

export default function MemberNavbar() {
  const [userData, setUserData] = useState({
    nama: "Budi Santoso",
    membership: "Silver",
    points: 850 // Mengambil log status poin terintegrasi
  });

  // Ambil data session secara dinamis agar selalu sinkron
  useEffect(() => {
    const session = localStorage.getItem("user_session") || localStorage.getItem("currentMember");
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setUserData({
          nama: parsed.nama || "Budi Santoso",
          membership: parsed.membership || "Silver",
          points: parsed.points || 850
        });
      } catch (e) {
        console.error("Gagal membaca session di navbar", e);
      }
    }
  }, []);

  return (
    <header className="bg-white h-20 shadow-sm border border-slate-100 rounded-2xl px-6 flex items-center justify-between font-sans mt-4 mx-4">
      
      {/* ========================================================= */}
      {/* 1. LEFT CONTROLS: SMART SEARCH BAR                        */}
      {/* ========================================================= */}
      <div className="relative hidden md:block">
        <MdSearch className="absolute left-4 top-3.5 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Cari riwayat medis, poin, atau reservasi..."
          className="w-[360px] bg-slate-50/70 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-600 text-slate-700 transition-all duration-200"
        />
      </div>
      <div className="block md:hidden">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></div>
          <h2 className="text-sm font-black text-slate-800 tracking-tight">SIGIGI Member</h2>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. RIGHT CONTROLS: LOYALTY STATS & AVATAR AI INTEGRATED   */}
      {/* ========================================================= */}
      <div className="flex items-center gap-4">
        
        {/* LAUNCH BADGE 1: LOYALTY POINTS STATS (MATCH IMAGE SCREENSHOT EFFECT) */}
        <div className="hidden lg:flex items-center gap-2 bg-amber-500/5 border border-amber-200/60 px-3 py-1.5 rounded-xl text-xs font-black shadow-inner">
          <MdStars className="text-amber-500 animate-spin" style={{ animationDuration: '10s' }} size={16} />
          <span className="text-amber-800 font-mono">{userData.points} Pts</span>
        </div>

        {/* LAUNCH BADGE 2: TIER STATUS STATS */}
        <div className="hidden lg:flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl text-xs font-black shadow-inner">
          <MdWorkspacePremium className="text-blue-600" size={16} />
          <span className="text-blue-700 font-sans">Tier {userData.membership}</span>
        </div>

        <div className="h-6 w-[1px] bg-slate-200 hidden lg:block"></div>

        {/* NOTIFICATION CONTROLS WITH GLOW EFFECT */}
        <button className="p-2.5 bg-slate-50 text-slate-500 hover:text-blue-600 rounded-xl relative hover:bg-blue-50 hover:border-blue-200/40 transition duration-200 border border-slate-100 shadow-inner">
          <MdNotificationsNone size={18} />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"></span>
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
        </button>

        <div className="h-6 w-[1px] bg-slate-200"></div>

        {/* PATIENT AVATAR PROFILE (INLINE AI VECTOR PATTERN) */}
        <div className="flex items-center gap-3 pl-1">
          {/* 📸 VECTOR FACE GENERATOR (100% AKURAT LANGSUNG MUNCUL) */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100 bg-indigo-50 shrink-0 flex items-center justify-center shadow-md">
            <svg viewBox="0 0 128 128" className="w-full h-full">
              <circle cx="64" cy="64" r="64" fill="#EEF2FF" />
              <path d="M64,80 L64,96 L40,110 L88,110 Z" fill="#4F46E5" />
              <path d="M52,80 L64,90 L76,80 Z" fill="#FDBA74" />
              <circle cx="64" cy="60" r="26" fill="#FDBA74" />
              <path d="M38,55 C38,30 50,22 64,22 C78,22 90,30 90,55 C90,55 86,40 64,40 C42,40 38,55 38,55 Z" fill="#1E293B" />
              <rect x="44" y="52" width="16" height="10" rx="3" fill="none" stroke="#1E293B" strokeWidth="4" />
              <rect x="68" y="52" width="16" height="10" rx="3" fill="none" stroke="#1E293B" strokeWidth="4" />
              <line x1="60" y1="57" x2="68" y2="57" stroke="#1E293B" strokeWidth="4" />
              <path d="M58,72 Q64,77 70,72" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          
          <div className="text-left hidden sm:block max-w-[120px]">
            <h4 className="text-xs font-black text-slate-800 leading-tight truncate">
              {userData.nama}
            </h4>
            <p className="text-[9px] text-blue-600 font-black tracking-widest uppercase mt-0.5 flex items-center gap-0.5">
              {userData.membership} LEVEL
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}