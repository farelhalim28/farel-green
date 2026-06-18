import {
    MdCalendarMonth,
    MdPeople,
    MdAssignment,
    MdPayments,
} from "react-icons/md";

import StatCard from "../components/StatCard";
import RevenueChart from "../components/RevenueChart";
import AppointmentList from "../components/AppointmentList";
import MiniCalendar from "../components/MiniCalendar";
import QuickActions from "../components/QuickActions";

import patients from "../data/patients.json";
import appointments from "../data/appointments.json";
import payments from "../data/payments.json";
import records from "../data/medical_records.json";
import treatments from "../data/treatments.json";

export default function Dashboard() {

    const totalPasien = patients.length;

    const pasienAktif = patients.filter(
        item => item.status === "Aktif"
    ).length;

    const pasienNonAktif = patients.filter(
        item => item.status !== "Aktif"
    ).length;

    const totalJanjiTemu = appointments.length;

    const totalRekamMedis = records.length;

    const totalPendapatan = payments
        .filter(item => item.status === "Lunas")
        .reduce((total, item) => total + item.nominal, 0);

    const pembayaranLunas = payments.filter(
        item => item.status === "Lunas"
    ).length;

    const pembayaranPending = payments.filter(
        item => item.status === "Pending"
    ).length;

    const stats = [
        {
            icon: <MdPeople className="text-blue-600 text-xl" />,
            label: "Total Pasien",
            value: totalPasien,
            unit: "Pasien",
            bg: "bg-blue-50",
        },
        {
            icon: <MdCalendarMonth className="text-green-600 text-xl" />,
            label: "Janji Temu",
            value: totalJanjiTemu,
            unit: "Jadwal",
            bg: "bg-green-50",
        },
        {
            icon: <MdAssignment className="text-purple-600 text-xl" />,
            label: "Rekam Medis",
            value: totalRekamMedis,
            unit: "Data",
            bg: "bg-purple-50",
        },
        {
            icon: <MdPayments className="text-yellow-600 text-xl" />,
            label: "Pendapatan",
            value: `Rp ${totalPendapatan.toLocaleString("id-ID")}`,
            unit: "",
            bg: "bg-yellow-50",
        },
    ];

    return (
        <div className="p-6 space-y-6">

            {/* HERO */}
            <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-[30px] p-8 text-white shadow-2xl">

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Dashboard CRM Klinik Gigi
                        </h1>

                        <p className="mt-2 text-blue-100">
                            Selamat Datang, Admin klinik 👋
                        </p>

                        <p className="text-sm text-blue-200 mt-1">
                            Pantau pasien, rekam medis, pembayaran dan aktivitas klinik secara real-time.
                        </p>

                    </div>

                    <div className="hidden lg:block text-[90px]">
                        🦷
                    </div>

                </div>

            </div>

            {/* KPI */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                {stats.map((item, index) => (
                    <StatCard key={index} {...item} />
                ))}
            </div>

            {/* CRM SUMMARY */}
            <div className="grid lg:grid-cols-4 gap-5">

                <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-100">
                    <p className="text-gray-500 text-sm">
                        Pasien Aktif
                    </p>

                    <h1 className="text-4xl font-bold text-blue-600 mt-3">
                        {pasienAktif}
                    </h1>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-100">
                    <p className="text-gray-500 text-sm">
                        Pasien Non Aktif
                    </p>

                    <h1 className="text-4xl font-bold text-red-500 mt-3">
                        {pasienNonAktif}
                    </h1>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-100">
                    <p className="text-gray-500 text-sm">
                        Pembayaran Lunas
                    </p>

                    <h1 className="text-4xl font-bold text-green-600 mt-3">
                        {pembayaranLunas}
                    </h1>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-100">
                    <p className="text-gray-500 text-sm">
                        Pending Payment
                    </p>

                    <h1 className="text-4xl font-bold text-yellow-500 mt-3">
                        {pembayaranPending}
                    </h1>
                </div>

            </div>

            {/* CHART */}
            <div className="grid lg:grid-cols-3 gap-5">

                <div className="lg:col-span-2">
                    <RevenueChart />
                </div>

                <MiniCalendar />

            </div>

            {/* APPOINTMENT */}
            <div className="grid lg:grid-cols-3 gap-5">

                <div className="lg:col-span-2">
                    <AppointmentList />
                </div>

                <QuickActions />

            </div>

            {/* FINANCE + TREATMENT */}
            <div className="grid lg:grid-cols-2 gap-5">

                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-xl">

                    <h2 className="text-xl font-bold">
                        Ringkasan Keuangan
                    </h2>

                    <div className="grid grid-cols-2 gap-5 mt-5">

                        <div>
                            <p className="text-green-100">
                                Pendapatan
                            </p>

                            <h1 className="text-3xl font-bold">
                                Rp {totalPendapatan.toLocaleString("id-ID")}
                            </h1>
                        </div>

                        <div>
                            <p className="text-green-100">
                                Invoice Lunas
                            </p>

                            <h1 className="text-3xl font-bold">
                                {pembayaranLunas}
                            </h1>
                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-100">

                    <h2 className="text-xl font-bold mb-5">
                        Top Perawatan
                    </h2>

                    <div className="space-y-3">

                        {treatments.slice(0, 5).map(item => (

                            <div
                                key={item.id}
                                className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center"
                            >

                                <div>
                                    <h4 className="font-semibold">
                                        {item.nama_perawatan}
                                    </h4>

                                    <p className="text-sm text-gray-400">
                                        {item.kategori}
                                    </p>
                                </div>

                                <span className="font-bold text-blue-600">
                                    Rp {item.harga.toLocaleString("id-ID")}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {/* PASIEN TERBARU */}
            <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-100">

                <h2 className="text-xl font-bold mb-5">
                    Pasien Terbaru
                </h2>

                <div className="space-y-3">

                    {patients.slice(0, 5).map(item => (

                        <div
                            key={item.id}
                            className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between"
                        >

                            <div className="flex items-center gap-3">

                                <img
                                    src={item.foto}
                                    alt={item.nama}
                                    className="w-12 h-12 rounded-full object-cover"
                                />

                                <div>

                                    <h4 className="font-semibold">
                                        {item.nama}
                                    </h4>

                                    <p className="text-sm text-gray-400">
                                        {item.no_rm}
                                    </p>

                                </div>

                            </div>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    item.status === "Aktif"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}
                            >
                                {item.status}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

