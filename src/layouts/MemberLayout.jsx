// =========================================================================
// LETAK FILE: src/layouts/MemberLayout.jsx
// =========================================================================
import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, Navigate } from "react-router-dom";
import {
  MdDashboard,
  MdWorkspacePremium,
  MdStars,
  MdHistory,
  MdEventAvailable,
  MdPerson,
  MdLogout,
  MdPeople, // Icon tambahan untuk menu Kelola User/Pasien
} from "react-icons/md";

export default function MemberLayout() {
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data session login pasien dari localStorage
    const session = localStorage.getItem("user_session");
    if (session) {
      try {
        setMemberData(JSON.parse(session));
      } catch (e) {
        console.error("Gagal membaca session data", e);
      }
    }
    setLoading(false);
  }, []);

  // Handler fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("user_session");
    navigate("/login-member", { replace: true });
  };

  const menu = [
    {
      title: "Dashboard",
      path: "/member/dashboard",
      icon: <MdDashboard />,
    },
    {
      title: "Membership Saya",
      path: "/member/membership",
      icon: <MdWorkspacePremium />,
    },
    {
      title: "Loyalty Point",
      path: "/member/loyalty",
      icon: <MdStars />,
    },
    {
      title: "Riwayat Kunjungan",
      path: "/member/riwayat",
      icon: <MdHistory />,
    },
    {
      title: "Appointment Saya",
      path: "/member/appointment",
      icon: <MdEventAvailable />,
    },
    {
      title: "Kelola Pengguna", // SINKRON: Menampilkan halaman CRUD User di dalam portal member
      path: "/member/user",
      icon: <MdPeople />,
    },
    {
      title: "Profil Saya",
      path: "/member/profil",
      icon: <MdPerson />,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Proteksi guard: Jika session user kosong, tendang langsung ke /login-member
  if (!memberData) {
    return <Navigate to="/login-member" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      
      {/* SIDEBAR */}
      <div className="relative w-72 bg-gradient-to-b from-blue-700 to-cyan-600 text-white shadow-xl flex flex-col justify-between">
        
        <div>
          {/* LOGO TITLE */}
          <div className="p-6 border-b border-white/20">
            <h1 className="text-2xl font-bold">CRM Member</h1>
            <p className="text-sm text-blue-100 mt-1">Portal Member Premium</p>
          </div>

          {/* DYNAMIC MEMBER CARD */}
          <div className="m-5 bg-white/10 rounded-2xl p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <img
                src={`https://avatar.iran.liara.run/public/${memberData.nama_lengkap.toLowerCase().includes('aisyah') ? 'girl' : 'boy'}?username=${memberData.id}`}
                alt="Avatar"
                className="w-14 h-14 rounded-full border-2 border-white/20 bg-white/5"
              />
              <div>
                <h3 className="font-semibold truncate max-w-[150px]">
                  {memberData.nama_lengkap}
                </h3>
                <p className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-md inline-block mt-1 font-medium">
                  {memberData.tier_membership || "Silver"} Member
                </p>
              </div>
            </div>
          </div>

          {/* SIDEBAR NAVIGATION MENU */}
          <div className="px-4 space-y-1.5">
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-sm ${
                    isActive
                      ? "bg-white text-blue-700 font-bold shadow-md shadow-blue-900/10"
                      : "hover:bg-white/10 text-blue-50 hover:text-white"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                {item.title}
              </NavLink>
            ))}
          </div>
        </div>

        {/* LOGOUT SYSTEM ACTION */}
        <div className="p-4 border-t border-white/10 bg-black/5">
          <button 
            onClick={handleLogout}
            className="w-full bg-rose-500 hover:bg-rose-600 py-3 rounded-xl flex items-center justify-center gap-2 transition font-bold text-sm shadow-lg shadow-rose-900/10 text-white"
          >
            <MdLogout size={18} />
            Keluar Aplikasi
          </button>
        </div>

      </div>

      {/* CONTENT AREA CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOPBAR COMPONENT */}
        <div className="bg-white shadow-sm px-8 py-5 flex justify-between items-center border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-black text-gray-800">Member Dashboard</h2>
            <p className="text-sm text-gray-400 font-medium mt-0.5">
              Selamat datang kembali, {memberData.nama_lengkap.split(" ")[0]} 👋
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <div className="bg-amber-50 text-amber-700 border border-amber-100 px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5">
              <span>⭐</span> {memberData.total_point || 0} Loyalty Point
            </div>
            <div className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-4 py-2 rounded-full shadow-sm">
              ✨ Tier {memberData.tier_membership || "Silver"}
            </div>
          </div>
        </div>

        {/* PAGE CONTENT ROUTER SUNTIKAN */}
        <div className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </div>

      </div>

    </div>
  );
}