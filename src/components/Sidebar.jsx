// =========================================================================
// LETAK FILE: src/components/Sidebar.jsx
// =========================================================================
import { NavLink } from "react-router-dom";
import {
    MdDashboard,
    MdCalendarMonth,
    MdPeople,
    MdMedicalServices,
    MdAssignment,
    MdPayment,
    MdBarChart,
    MdSettings,
    MdGridView,
    MdSupervisorAccount // Icon baru khusus untuk Manajemen User Admin
} from "react-icons/md";
import { FaTooth } from "react-icons/fa";

// SEMUA PATH SUDAH DISINKRONKAN MENGGUNAKAN AWALAN /admin SESUAI FILE App.jsx LU
const menuItems = [
    {
        icon: MdDashboard,
        label: "Dashboard",
        path: "/admin/dashboard",
    },
    {
        icon: MdCalendarMonth,
        label: "Janji Temu",
        path: "/admin/janji-temu",
    },
    {
        icon: MdPeople,
        label: "Pasien",
        path: "/admin/pasien",
    },
    {
        icon: MdMedicalServices,
        label: "Perawatan",
        path: "/admin/perawatan",
    },
    {
        icon: MdAssignment,
        label: "Rekam Medis",
        path: "/admin/rekam-medis",
    },
    {
        icon: MdPayment,
        label: "Pembayaran",
        path: "/admin/pembayaran",
    },
    {
        icon: MdBarChart,
        label: "Laporan",
        path: "/admin/laporan",
    },
    {
        icon: MdSupervisorAccount, // MENU USER YANG HILANG SUDAH MUNCUL DI SINI, BRO!
        label: "Manajemen User",
        path: "/admin/user",
    },
    {
        icon: MdSettings,
        label: "Pengaturan",
        path: "/admin/pengaturan",
    },
    {
        icon: MdGridView,
        label: "Components",
        path: "/admin/components",
    },
];

export default function Sidebar() {
    const menuClass = ({ isActive }) =>
        `
        flex items-center gap-3
        px-4 py-3 rounded-xl
        mb-2 text-sm font-medium
        transition-all duration-200

        ${
            isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
        }
    `;

    return (
        <aside className="w-[260px] h-screen bg-white border-r border-gray-100 flex flex-col sticky top-0 z-20">

            {/* Logo */}
            <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                        <FaTooth className="text-white text-xl" />
                    </div>

                    <div>
                        <h1 className="font-bold text-gray-800 text-lg">
                            SIGIGI
                        </h1>
                        <p className="text-xs text-gray-400">
                            Klinik Sehat Senyum
                        </p>
                    </div>
                </div>
            </div>

            {/* Menu Navigasi Utama */}
            <nav className="flex-1 overflow-y-auto px-4 py-5">
                {menuItems.map(({ icon: Icon, label, path }) => (
                    <NavLink
                        key={label}
                        to={path}
                        className={menuClass}
                    >
                        <Icon className="text-[20px]" />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Promo Card & Profile Pengguna */}
            <div className="px-4 pb-4">
                <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-3xl p-5 text-center">
                    <div className="text-5xl mb-3">
                        🦷
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        Jadwalkan perawatan rutin untuk menjaga kesehatan gigi pasien.
                    </p>
                    <NavLink
                        to="/admin/janji-temu"
                        className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-sm shadow-sm"
                    >
                        Buat Janji Temu
                    </NavLink>
                </div>

                {/* Profile Widget */}
                <div className="mt-4 flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition">
                    <img
                        src="/img/Dokter.jpg"
                        alt="dokter"
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2"
                    />
                    <div className="flex-1 overflow-hidden">
                        <h3 className="font-semibold text-gray-800 truncate">
                            Administrator
                        </h3>
                        <p className="text-xs text-gray-400">
                            Super Admin
                        </p>
                    </div>
                    <span className="text-gray-400">
                        ▾
                    </span>
                </div>
            </div>
        </aside>
    );
}