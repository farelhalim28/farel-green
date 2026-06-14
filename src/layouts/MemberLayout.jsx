import { NavLink, Outlet } from "react-router-dom";

import {
  MdDashboard,
  MdWorkspacePremium,
  MdStars,
  MdHistory,
  MdEventAvailable,
  MdPerson,
  MdLogout,
} from "react-icons/md";

export default function MemberLayout() {
  const menu = [
    {
      title: "Dashboard",
      path: "/member",
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
      title: "Profil Saya",
      path: "/member/profil",
      icon: <MdPerson />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* SIDEBAR */}

      <div className="relative w-72 bg-gradient-to-b from-blue-700 to-cyan-600 text-white shadow-xl">

        <div className="p-6 border-b border-white/20">

          <h1 className="text-2xl font-bold">
            CRM Member
          </h1>

          <p className="text-sm text-blue-100 mt-1">
            Portal Member Premium
          </p>

        </div>

        {/* MEMBER CARD */}

        <div className="m-5 bg-white/10 rounded-2xl p-4 backdrop-blur">

          <div className="flex items-center gap-3">

            <img
              src="https://avatar.iran.liara.run/public/girl/10"
              alt=""
              className="w-14 h-14 rounded-full"
            />

            <div>

              <h3 className="font-semibold">
                Siti Aisyah
              </h3>

              <p className="text-sm text-blue-100">
                Gold Member
              </p>

            </div>

          </div>

        </div>

        {/* MENU */}

        <div className="px-4 space-y-2">

          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/member"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-white text-blue-700 font-semibold"
                    : "hover:bg-white/10"
                }`
              }
            >
              <span className="text-xl">
                {item.icon}
              </span>

              {item.title}
            </NavLink>
          ))}

        </div>

        {/* FOOTER */}

        <div className="absolute bottom-5 left-4 right-4">

          <button className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl flex items-center justify-center gap-2 transition">

            <MdLogout />

            Logout

          </button>

        </div>

      </div>

      {/* CONTENT */}

      <div className="flex-1">

        {/* TOPBAR */}

        <div className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Member Dashboard
            </h2>

            <p className="text-gray-500">
              Selamat datang kembali 👋
            </p>

          </div>

          <div className="flex items-center gap-3">

            <div className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold">

              ⭐ 850 Point

            </div>

            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

              Gold Member

            </div>

          </div>

        </div>

        {/* PAGE */}

        <div className="p-6">

          <Outlet />

        </div>

      </div>

    </div>
  );
}