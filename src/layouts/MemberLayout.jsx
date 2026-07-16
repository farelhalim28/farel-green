// =========================================================================
// LETAK FILE: src/layouts/MemberLayout.jsx
// =========================================================================

import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdWorkspacePremium,
  MdStars,
  MdHistory,
  MdEventAvailable,
  MdPerson,
  MdLogout,
  MdNotificationsNone,
  MdSearch,
  MdHelpOutline,
  MdArrowForward,
  MdBolt
} from "react-icons/md";

export default function MemberLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null); 

  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [showNotif, setShowNotif] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const panduanFitur = [
    {
      fitur: "Dashboard",
      deskripsi: "Pantau kesehatan klinis gigi Anda lewat grafik interaktif serta ringkasan janji temu terdekat.",
      icon: "📊"
    },
    {
      fitur: "Membership Saya",
      deskripsi: "Cek tier level (Silver/Gold/Platinum) dan klaim berbagai benefit khusus perawatan Anda.",
      icon: "👑"
    },
    {
      fitur: "Loyalty Point",
      deskripsi: "Kumpulkan poin dari setiap perawatan gigi di klinik dan tukarkan dengan voucher diskon.",
      icon: "⭐"
    },
    {
      fitur: "Riwayat & Janji Temu",
      deskripsi: "Melihat rekam medis perawatan terdahulu atau menjadwalkan kunjungan kontrol baru dengan dokter.",
      icon: "📅"
    }
  ];

  const menu = [
    {
      title: "Dashboard",
      path: "/member/dashboard",
      icon: <MdDashboard />,
      keywords: ["home", "beranda", "grafik", "ringkasan", "utama"]
    },
    {
      title: "Membership Saya",
      path: "/member/membership",
      icon: <MdWorkspacePremium />,
      keywords: ["level", "tier", "silver", "gold", "platinum", "benefit", "kartu"]
    },
    {
      title: "Loyalty Point",
      path: "/member/loyalty",
      icon: <MdStars />,
      keywords: ["poin", "hadiah", "voucher", "diskon", "tukar", "loyalty"]
    },
    {
      title: "Riwayat Kunjungan",
      path: "/member/riwayat",
      icon: <MdHistory />,
      keywords: ["rekam medis", "medis", "perawatan", "dokter", "gigi", "lalu", "history"]
    },
    {
      title: "Appointment Saya",
      path: "/member/appointment",
      icon: <MdEventAvailable />,
      keywords: ["janji temu", "jadwal", "booking", "periksa", "kontrol", "dokter"]
    },
    {
      title: "Profil Saya",
      path: "/member/profil",
      icon: <MdPerson />,
      keywords: ["akun", "password", "nama", "email", "telepon", "edit", "setting"]
    },
  ];

  const quickActions = [
    {
      title: "Keluar dari Aplikasi",
      action: () => handleLogout(),
      icon: <MdLogout className="text-rose-500" />,
      keywords: ["logout", "keluar", "signout", "exit"]
    },
    {
      title: "Hubungi Bantuan SIGIGI",
      action: () => alert("Menghubungkan ke WhatsApp Customer Service SIGIGI..."),
      icon: <MdHelpOutline className="text-emerald-500" />,
      keywords: ["bantuan", "help", "tanya", "admin", "cs", "whatsapp", "wa"]
    }
  ];

  useEffect(() => {
    const session = localStorage.getItem("user_session") || localStorage.getItem("currentMember");
    if (session) {
      try {
        setMemberData(JSON.parse(session));
      } catch (e) {
        console.error("Gagal membaca session data", e);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotif(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotifClick = () => {
    setShowNotif(!showNotif);
    setHasUnread(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_session");
    localStorage.removeItem("currentMember");
    navigate("/login-member", { replace: true });
  };

  const getFilteredResults = () => {
    if (!searchQuery.trim()) return { menus: [], actions: [] };
    const query = searchQuery.toLowerCase();

    const filteredMenus = menu.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.keywords.some(keyword => keyword.includes(query))
    );

    const filteredActions = quickActions.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.keywords.some(keyword => keyword.includes(query))
    );

    return { menus: filteredMenus, actions: filteredActions };
  };

  const { menus: searchMenuResults, actions: searchActionResults } = getFilteredResults();
  const hasSearchResults = searchMenuResults.length > 0 || searchActionResults.length > 0;

  const getDynamicHeader = () => {
    const currentPath = location.pathname;
    if (currentPath.includes("/dashboard")) {
      return { title: "Dashboard Utama", subtitle: "Pantau kesehatan gigi & aktivitas membership Anda" };
    }
    if (currentPath.includes("/membership")) {
      return { title: "Membership Saya", subtitle: "Lihat tier level, benefit, dan target poin berikutnya" };
    }
    if (currentPath.includes("/loyalty")) {
      return { title: "Loyalty Point", subtitle: "Tukarkan poin akumulasi Anda dengan promo menarik" };
    }
    if (currentPath.includes("/riwayat")) {
      return { title: "Riwayat Kunjungan", subtitle: "Catatan rekam medis & riwayat perawatan klinik Anda" };
    }
    if (currentPath.includes("/appointment")) {
      return { title: "Appointment Saya", subtitle: "Kelola jadwal kunjungan dan konsultasi dengan dokter" };
    }
    if (currentPath.includes("/profil")) {
      return { title: "Profil Saya", subtitle: "Perbarui informasi akun dan keamanan data Anda" };
    }
    return { title: "Portal Member", subtitle: "Layanan kesehatan gigi premium SIGIGI" };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!memberData) {
    return <Navigate to="/login-member" replace />;
  }

  const namaLengkap = memberData.nama || "Member";
  const tierMembership = memberData.membership || "Silver";
  const { title, subtitle } = getDynamicHeader();

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans antialiased">
      
      {/* ========================================================= */}
      {/* 1. SIDEBAR (WHITE THEME)                                   */}
      {/* ========================================================= */}
      <div className="relative w-80 bg-white text-slate-800 shadow-xl border-r border-slate-100 flex flex-col justify-between shrink-0 hidden lg:flex">

        <div className="relative z-10">
          
          {/* BAGIAN LOGO */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center h-24">
            <div
              role="img"
              aria-label="Logo SIGIGI"
              style={{
                width: '122px',
                height: '56px',
                backgroundImage: "url('/img/logo.png')",
                backgroundSize: '137px 131px',
                backgroundPosition: '-9px -35px',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>

          {/* Info Singkat Member */}
          <div className="m-5 bg-slate-50 border border-slate-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-blue-100 bg-white shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 128 128" className="w-full h-full">
                  <circle cx="64" cy="64" r="64" fill="#E0F2FE" />
                  <path d="M64,80 L64,96 L40,110 L88,110 Z" fill="#0369A1" />
                  <path d="M52,80 L64,90 L76,80 Z" fill="#FDBA74" />
                  <circle cx="64" cy="60" r="26" fill="#FDBA74" />
                  <path d="M38,55 C38,30 50,22 64,22 C78,22 90,30 90,55 C90,55 86,40 64,40 C42,40 38,55 38,55 Z" fill="#0F172A" />
                  <rect x="44" y="52" width="16" height="10" rx="3" fill="none" stroke="#0F172A" strokeWidth="4" />
                  <rect x="68" y="52" width="16" height="10" rx="3" fill="none" stroke="#0F172A" strokeWidth="4" />
                  <line x1="60" y1="57" x2="68" y2="57" stroke="#0F172A" strokeWidth="4" />
                  <path d="M58,72 Q64,77 70,72" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              
              <div className="min-w-0 flex-1">
                <h3 className="font-extrabold text-sm truncate text-slate-800 leading-tight">
                  {namaLengkap}
                </h3>
                <p className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md inline-block mt-1.5 font-black uppercase tracking-wider">
                  Tier {tierMembership}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Navigasi Portal Member */}
          <div className="px-4 space-y-1">
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-xs font-bold tracking-wide ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                  }`
                }
              >
                <span className="text-lg shrink-0">{item.icon}</span>
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Tombol Logout Aplikasi */}
        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full bg-rose-500 hover:bg-rose-600 active:scale-95 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 font-bold text-xs tracking-wider uppercase shadow-md shadow-rose-100 text-white"
          >
            <MdLogout size={16} />
            Keluar Aplikasi
          </button>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 2. CONTENT AREA CONTAINER (WITH TOPBAR SEARCH)            */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 px-8 py-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-100 shadow-sm">
          
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight leading-tight">{title}</h2>
            <p className="text-xs text-slate-400 font-bold mt-1 tracking-wide">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 self-end sm:self-auto">
            
            {/* Global Search */}
            <div className="relative hidden xl:block" ref={searchRef}>
              <MdSearch className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" size={16} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="Cari fitur, menu, bantuan..." 
                className="w-64 bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs font-semibold text-slate-700 transition-all duration-250 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white"
              />

              {/* Search Dropdown */}
              {showSearchDropdown && searchQuery.trim() !== "" && (
                <div className="absolute right-0 mt-3.5 w-80 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in origin-top-right">
                  <div className="p-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Hasil Pencarian</span>
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-bold flex items-center gap-0.5">
                      <MdBolt size={10} /> Quick Search
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                    
                    {searchMenuResults.length > 0 && (
                      <div className="p-2">
                        <span className="block text-[9px] text-slate-400 font-bold px-3 py-1 uppercase tracking-wider">Halaman Fitur</span>
                        {searchMenuResults.map((item) => (
                          <button
                            key={item.path}
                            onClick={() => {
                              navigate(item.path);
                              setSearchQuery("");
                              setShowSearchDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50/50 flex items-center justify-between text-slate-700 hover:text-blue-600 transition group"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base text-slate-400 group-hover:text-blue-500">{item.icon}</span>
                              <span className="text-xs font-bold">{item.title}</span>
                            </div>
                            <MdArrowForward size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                          </button>
                        ))}
                      </div>
                    )}

                    {searchActionResults.length > 0 && (
                      <div className="p-2">
                        <span className="block text-[9px] text-slate-400 font-bold px-3 py-1 uppercase tracking-wider">Aksi Cepat</span>
                        {searchActionResults.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              item.action();
                              setSearchQuery("");
                              setShowSearchDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between text-slate-700 transition group"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base">{item.icon}</span>
                              <span className="text-xs font-bold text-slate-700">{item.title}</span>
                            </div>
                            <MdArrowForward size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                          </button>
                        ))}
                      </div>
                    )}

                    {!hasSearchResults && (
                      <div className="p-8 text-center text-slate-400 space-y-2">
                        <span className="text-2xl block">🔍</span>
                        <p className="text-xs font-semibold">Tidak ada hasil ditemukan untuk <strong className="text-slate-700">"{searchQuery}"</strong></p>
                      </div>
                    )}

                  </div>
                </div>
              )}
            </div>

            {/* Notification Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={handleNotifClick}
                className={`p-2 rounded-xl relative transition border transition-all duration-200 ${
                  showNotif 
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200" 
                    : "bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border-slate-100"
                }`}
              >
                <MdNotificationsNone size={18} />
                {hasUnread && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white animate-pulse"></span>
                )}
              </button>

              {showNotif && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in origin-top-right">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
                    <div className="flex items-center gap-2">
                      <MdHelpOutline size={18} />
                      <h4 className="font-extrabold text-xs uppercase tracking-wider">Panduan Fitur Portal</h4>
                    </div>
                    <p className="text-[10px] text-blue-100 mt-1">Pelajari fungsi setiap menu di dashboard baru Anda.</p>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                    {panduanFitur.map((item, index) => (
                      <div key={index} className="p-4 hover:bg-slate-50/80 transition duration-150 flex gap-3">
                        <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                        <div>
                          <h5 className="text-xs font-extrabold text-slate-800">{item.fitur}</h5>
                          <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-1">{item.deskripsi}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-50/50 border-t border-slate-100 text-center">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">SIGIGI — Senyum Sehat Anda</p>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>

            {/* Dynamic Level Stats */}
            <div className="flex items-center gap-2 text-[10px] font-black">
              <div className="bg-amber-500/5 text-amber-800 border border-amber-200/50 px-3 py-1.5 rounded-xl shadow-inner flex items-center gap-1">
                <span>⭐</span> {memberData.total_point || 0} Pts
              </div>
              <div className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-xl shadow-inner uppercase tracking-wide">
                ✨ Tier {tierMembership}
              </div>
            </div>
          </div>

        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}