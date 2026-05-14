// ================================================
// LETAK FILE: src/pages/Dashboard.jsx
// ================================================

import { MdCalendarMonth, MdPeople, MdMedicalServices } from "react-icons/md";
import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import AppointmentList from "../components/AppointmentList";
import MiniCalendar from "../components/MiniCalendar";
import QuickActions from "../components/QuickActions";

const stats = [
    {
        icon: <MdCalendarMonth className="text-primary text-xl" />,
        label: "Janji Temu Hari Ini",
        value: "8",
        unit: "Pasien",
        bg: "bg-blue-50",
        color: "text-primary",
    },
    {
        icon: <MdPeople className="text-success text-xl" />,
        label: "Pasien Aktif",
        value: "126",
        unit: "Pasien",
        bg: "bg-green-50",
        color: "text-success",
    },
    {
        icon: <span className="text-purple text-xl">🦷</span>,
        label: "Perawatan Bulan Ini",
        value: "32",
        unit: "Tindakan",
        bg: "bg-purple-50",
        color: "text-purple",
    },
    {
        icon: <span className="text-warning text-xl">💰</span>,
        label: "Pendapatan Bulan Ini",
        value: "Rp 18.450.000",
        unit: "",
        bg: "bg-yellow-50",
        color: "text-warning",
    },
];

export default function Dashboard() {
    return (
        <div className="p-6 space-y-5">

            {/* Welcome Banner */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center justify-between overflow-hidden relative">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <p className="text-lg font-semibold text-gray-700 mt-1">
                        Selamat pagi, drg. Farel Abdul Halim 👋
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                        Berikut ringkasan aktivitas klinik hari ini.
                    </p>
                </div>
                {/* Ilustrasi */}
                <div className="text-[80px] opacity-80 select-none hidden md:block">
                    🦷
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <StatCard key={i} {...s} />
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <RevenueChart />
                </div>
                <MiniCalendar />
            </div>

            {/* Appointments + Calendar */}
            <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <AppointmentList />
                </div>
                <div className="space-y-4">
                    <QuickActions />
                </div>
            </div>

        </div>
    );
}