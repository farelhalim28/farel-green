import { useState } from "react";
import { 
  MdVerified, 
  MdCardMembership, 
  MdStars, 
  MdEventAvailable, 
  MdChevronRight,
  MdCheckCircle,
  MdHistoryEdu,
  MdWorkspacePremium,
  MdLocalFireDepartment
} from "react-icons/md";

export default function MembershipSaya() {
  return (
    <div className="p-6 space-y-8 bg-gradient-to-tr from-slate-50 via-white to-blue-50/20 min-h-screen font-sans selection:bg-blue-100">
      
      {/* ========================================================= */}
      {/* 1. ULTRA-PREMIUM HERO CARD - DEEP BLUE & CYAN GLOW        */}
      {/* ========================================================= */}
      <div className="relative bg-gradient-to-r from-indigo-950 via-blue-900 to-blue-700 rounded-[36px] p-8 md:p-10 text-white shadow-2xl shadow-blue-950/20 overflow-hidden group">
        
        {/* Background Ambient Lights (Glow Effects) */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/20 rounded-full blur-[80px] -mr-20 -mt-20"></div>
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-[60px]"></div>
        
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          
          {/* Patient Profile Info */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider text-cyan-300 uppercase">
              <MdWorkspacePremium size={16} className="text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              Premium Silver Member
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
                Budi Santoso
                <MdVerified className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" size={28} />
              </h1>
              <p className="text-blue-200/80 text-sm font-medium">
                ID Pasien Aktif: <span className="font-mono text-white bg-white/10 px-2 py-0.5 rounded">PAS-2024-0089B</span>
              </p>
            </div>
          </div>

          {/* Glowing Loyalty Point Display (Glassmorphism) */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 flex items-center gap-6 shadow-2xl shadow-black/20 shrink-0 w-full lg:w-auto hover:border-white/30 transition duration-300">
            <div className="p-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl shadow-lg shadow-amber-500/20">
              <MdStars size={32} className="text-white" />
            </div>
            <div>
              <span className="text-[10px] text-blue-200 font-extrabold tracking-widest uppercase block">LOYALTY POINT ANDA</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-4xl font-black text-white tracking-tight">850</span>
                <span className="text-xs font-bold text-amber-300">Points</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. STATS CARDS GRID (4 MODERN DESIGN CARDS)               */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Status Member */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center justify-between hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 group">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-black tracking-wider uppercase block">STATUS MEMBER</span>
            <h4 className="text-xl font-black text-slate-800">Aktif</h4>
          </div>
          <span className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition duration-300">
            <MdCheckCircle size={24} />
          </span>
        </div>

        {/* Total Kunjungan */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center justify-between hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 group">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-black tracking-wider uppercase block">TOTAL KUNJUNGAN</span>
            <h4 className="text-xl font-black text-slate-800">12 Kali</h4>
          </div>
          <span className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition duration-300">
            <MdHistoryEdu size={24} />
          </span>
        </div>

        {/* Saldo Point */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center justify-between hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 group">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-black tracking-wider uppercase block">SALDO POINT</span>
            <h4 className="text-xl font-black text-slate-800">850 Pts</h4>
          </div>
          <span className="p-3 bg-amber-50 text-amber-500 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition duration-300">
            <MdStars size={24} />
          </span>
        </div>

        {/* Tingkat Lanjut */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center justify-between hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 group">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-black tracking-wider uppercase block">TINGKAT LANJUT</span>
            <h4 className="text-xl font-black text-slate-800">Gold</h4>
          </div>
          <span className="p-3 bg-cyan-50 text-cyan-600 rounded-2xl group-hover:bg-cyan-500 group-hover:text-white transition duration-300">
            <MdWorkspacePremium size={24} />
          </span>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. VISUAL MILESTONE PROGRESS TRACKER                      */}
      {/* ========================================================= */}
      <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <MdLocalFireDepartment size={20} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">PROGRESS MENUJU GOLD MEMBER</h3>
            <p className="text-[10px] text-slate-400 font-medium">Satu langkah lagi untuk menikmati keuntungan tingkat lanjut</p>
          </div>
        </div>

        <div className="space-y-6 pt-2">
          {/* Progress Bar Container */}
          <div className="relative">
            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
              <div 
                className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-1000 shadow-inner relative"
                style={{ width: '85%' }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-2 bg-white/40 animate-ping rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Milestone Metrics */}
          <div className="flex justify-between items-center text-xs font-bold">
            <div className="space-y-1">
              <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Poin Saat Ini</span>
              <span className="text-blue-600 text-sm font-black">850 Points</span>
            </div>
            
            <span className="bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full font-black text-[11px] shadow-sm">
              85% Selesai
            </span>

            <div className="space-y-1 text-right">
              <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Target Berikutnya</span>
              <span className="text-slate-800 text-sm font-black">1.000 Points</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. BOTTOM SECTION: BENEFITS & TIMELINE                    */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* BENEFIT KEANGGOTAAN */}
        <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <MdCardMembership size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">BENEFIT KEANGGOTAAN</h3>
              <p className="text-[10px] text-slate-400 font-medium font-semibold">Keuntungan eksklusif khusus level Silver Member</p>
            </div>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-100 hover:bg-blue-50/10 transition duration-300">
              <div className="flex items-center gap-3">
                <span className="p-1 bg-blue-100 text-blue-600 rounded-lg">
                  <MdCheckCircle size={18} />
                </span>
                <span className="text-xs font-bold text-slate-700">Diskon Perawatan 15% All Treatment</span>
              </div>
              <span className="text-[10px] bg-blue-50 border border-blue-100 text-blue-600 px-2.5 py-1 rounded-lg font-black uppercase">AKTIF</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-100 hover:bg-blue-50/10 transition duration-300">
              <div className="flex items-center gap-3">
                <span className="p-1 bg-blue-100 text-blue-600 rounded-lg">
                  <MdCheckCircle size={18} />
                </span>
                <span className="text-xs font-bold text-slate-700">Prioritas Akses Jalur Antrean Booking</span>
              </div>
              <span className="text-[10px] bg-blue-50 border border-blue-100 text-blue-600 px-2.5 py-1 rounded-lg font-black uppercase">AKTIF</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50/60 border border-slate-100/60 rounded-2xl opacity-60">
              <div className="flex items-center gap-3">
                <span className="p-1 bg-slate-100 text-slate-400 rounded-lg">
                  <MdCheckCircle size={18} />
                </span>
                <span className="text-xs font-bold text-slate-400">Gratis Konsultasi Dokter Spesialis (Gold Only)</span>
              </div>
              <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-400 px-2.5 py-1 rounded-lg font-black uppercase">LOCK</span>
            </div>
          </div>
        </div>

        {/* GARIS WAKTU ANGGOTA (TIMELINE) */}
        <div className="bg-white border border-slate-100 rounded-[32px] p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 bg-cyan-50 text-cyan-600 rounded-xl">
              <MdEventAvailable size={20} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">GARIS WAKTU ANGGOTA</h3>
              <p className="text-[10px] text-slate-400 font-medium">Rekam jejak loyalitas keanggotaan Budi Santoso</p>
            </div>
          </div>

          <div className="relative pl-6 border-l-2 border-blue-100 space-y-6 ml-2">
            
            {/* Timeline Item 1 */}
            <div className="relative">
              {/* Glowing Bullet */}
              <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">2026</span>
                <p className="text-xs font-black text-slate-800 mt-1">Status Membership Aktif</p>
                <p className="text-[11px] text-slate-400 font-medium">Tingkat keanggotaan terverifikasi dan pemeliharaan berkala berjalan sangat lancar.</p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative">
              {/* Bullet */}
              <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-300 border-4 border-white"></span>
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">2025</span>
                <p className="text-xs font-black text-slate-800 mt-1">Sertifikasi & Loyalitas Instan</p>
                <p className="text-[11px] text-slate-400 font-medium">Menerima bonus loyalitas instan atas penyelesaian perawatan gigi komprehensif.</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}