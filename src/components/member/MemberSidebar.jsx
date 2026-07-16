import { useState, useEffect } from "react";
import { 
  MdDashboard, 
  MdWorkspacePremium, 
  MdStars, 
  MdHistory, 
  MdCalendarMonth, 
  MdPeople, 
  MdPerson,
  MdLogout
} from "react-icons/md";

export default function MemberSidebar({ currentTab, setActiveTab }) {
  const [userData, setUserData] = useState({
    nama: "Budi Santoso",
    membership: "Silver"
  });

  // Sinkronisasi data user dari localStorage
  useEffect(() => {
    const session = localStorage.getItem("user_session") || localStorage.getItem("currentMember");
    if (session) {
      try {
        setUserData(JSON.parse(session));
      } catch (e) {
        console.error("Gagal membaca session", e);
      }
    }
  }, []);

  const menus = [
    { id: "dashboard", title: "Dashboard", icon: <MdDashboard size={20} /> },
    { id: "membership", title: "Membership Saya", icon: <MdWorkspacePremium size={20} /> },
    { id: "loyalty", title: "Loyalty Point", icon: <MdStars size={20} /> },
    { id: "riwayat", title: "Riwayat Kunjungan", icon: <MdHistory size={20} /> },
    { id: "appointment", title: "Appointment Saya", icon: <MdCalendarMonth size={20} /> },
    { id: "kelola", title: "Kelola Pengguna", icon: <MdPeople size={20} /> },
    { id: "profil", title: "Profil Saya", icon: <MdPerson size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login-member";
  };

  return (
    <aside className="w-72 bg-[#1e5af7] text-white flex flex-col shrink-0 min-h-screen font-sans shadow-xl">
      
      {/* ========================================================= */}
      {/* 1. KOTAK PUTIH LOGO (SEJAJAR DENGAN HEADER & LOGO LEBIH BESAR) */}
      {/* ========================================================= */}
      <div className="w-full h-24 bg-white border-b border-slate-100 flex items-center justify-center px-6 transition-all">
        <img 
          src="/img/logo.png" 
          alt="SIGIGI Logo" 
          className="h-12 w-auto object-contain max-w-full" 
        />
      </div>

      {/* Konten sisa di dalam Sidebar menggunakan Padding terpisah agar mengalir ke bawah */}
      <div className="flex flex-col gap-6 p-6 flex-1 justify-between">
        
        <div className="flex flex-col gap-6">
          {/* ========================================================= */}
          {/* 2. USER PROFILE CARD (DENGAN AI VECTOR AVATAR INLINE)     */}
          {/* ========================================================= */}
          <div className="bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-md">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 bg-indigo-50 shrink-0 flex items-center justify-center shadow-md">
              <svg viewBox="0 0 128 128" className="w-full h-full">
                <circle cx="64" cy="64" r="64" fill="#E0E7FF" />
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

            <div className="truncate">
              <h4 className="text-xs font-black text-white truncate leading-tight">
                {userData.nama}
              </h4>
              <span className="text-[9px] font-black text-[#1e5af7] bg-white px-2 py-0.5 rounded-md uppercase tracking-wider mt-1.5 inline-block shadow-sm">
                Tier {userData.membership || "Silver"}
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. LIST MENU NAVIGASI                                     */}
          {/* ========================================================= */}
          <nav className="space-y-1">
            {menus.map((menu) => {
              const isActive = currentTab === menu.id;

              return (
                <button
                  key={menu.id}
                  onClick={() => setActiveTab(menu.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 group ${
                    isActive
                      ? "bg-white text-[#1e5af7] shadow-md font-black"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-[#1e5af7]" : "text-blue-200 group-hover:text-white"}`}>
                    {menu.icon}
                  </div>
                  <span>{menu.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* ========================================================= */}
        {/* 4. BUTTON LOGOUT                                          */}
        {/* ========================================================= */}
        <div className="border-t border-white/10 pt-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 hover:border-red-500 rounded-xl text-xs font-black tracking-wider uppercase text-red-200 transition-all duration-200"
          >
            <MdLogout size={16} />
            Keluar Platform
          </button>
        </div>

      </div>

    </aside>
  );
}