// ================================================
// LETAK FILE: src/components/Sidebar.jsx
// ================================================

import { NavLink } from "react-router-dom";
import {
    MdDashboard, MdCalendarMonth, MdPeople,
    MdMedicalServices, MdAssignment, MdPayment,
    MdInventory, MdBarChart, MdSettings
} from "react-icons/md";
import { FaTooth } from "react-icons/fa";

const menuItems = [
    { icon: MdDashboard,        label: "Dashboard",        path: "/" },
    { icon: MdCalendarMonth,    label: "Janji Temu",       path: "/janji-temu" },
    { icon: MdPeople,           label: "Pasien",           path: "/pasien" },
    { icon: MdMedicalServices,  label: "Perawatan",        path: "/perawatan" },
    { icon: MdAssignment,       label: "Rekam Medis",      path: "/rekam-medis" },
    { icon: MdPayment,          label: "Pembayaran",       path: "/pembayaran" },
    { icon: MdInventory,        label: "Stok & Inventaris",path: "/stok" },
    { icon: MdBarChart,         label: "Laporan",          path: "/laporan" },
    { icon: MdSettings,         label: "Pengaturan",       path: "/pengaturan" },
];

export default function Sidebar() {
    const menuClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all duration-150 ${
            isActive
                ? "bg-primary text-white shadow-md shadow-blue-200"
                : "text-gray-500 hover:bg-blue-50 hover:text-primary"
        }`;

    return (
        <aside className="flex flex-col h-screen w-[220px] bg-white shadow-sm flex-shrink-0 z-10 sticky top-0">

            {/* Logo */}
            <div className="px-5 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
                        <FaTooth className="text-white text-lg" />
                    </div>
                    <div>
                        <p className="font-bold text-gray-800 text-sm leading-tight">SIGIGI</p>
                        <p className="text-[11px] text-gray-400">Klinik Sehat Senyum</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
                {menuItems.map(({ icon: Icon, label, path }) => (
                    <NavLink key={label} to={path} className={menuClass}>
                        <Icon className="text-[18px] flex-shrink-0" />
                        <span className="text-[13px]">{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Promo Card */}
            <div className="px-3 pb-4">
                <div className="bg-blue-50 rounded-2xl p-4 text-center mb-3">
                    <div className="text-4xl mb-2">🦷</div>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                        Jadwalkan perawatan rutin untuk senyum sehat!
                    </p>
                    <button className="bg-primary text-white text-[12px] font-semibold px-4 py-2 rounded-xl w-full hover:bg-primary-dark transition-colors">
                        Buat Janji Temu
                    </button>
                </div>

                {/* Profile kecil di bawah */}
                <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 cursor-pointer">
                    <img
                        src="/img/Dokter.jpg"
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-primary ring-offset-1"
                        alt="profile"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-gray-700 truncate">drg. Farel Abdul Halim</p>
                        <p className="text-[10px] text-gray-400">Dokter Gigi</p>
                    </div>
                    <span className="text-gray-400 text-xs">▾</span>
                </div>
            </div>
        </aside>
    );
}