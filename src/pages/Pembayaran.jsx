import { useState } from "react";
import payments from "../data/payments.json";

import {
    MdPayments,
    MdAttachMoney,
    MdPendingActions,
    MdReceiptLong,
    MdSearch,
} from "react-icons/md";

export default function Pembayaran() {

    const [search, setSearch] = useState("");

    const filteredPayments = payments.filter(
        (item) =>
            item.invoice.toLowerCase().includes(search.toLowerCase()) ||
            item.no_rm.toLowerCase().includes(search.toLowerCase())
    );

    const totalPendapatan = payments
        .filter((item) => item.status === "Lunas")
        .reduce((a, b) => a + b.nominal, 0);

    const totalPending = payments.filter(
        (item) => item.status === "Pending"
    ).length;

    return (
        <div className="p-6 space-y-6">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-xl">

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-4xl font-bold">
                            Pembayaran
                        </h1>

                        <p className="mt-2 text-blue-100">
                            Monitoring transaksi pembayaran pasien klinik.
                        </p>

                    </div>

                    <div className="hidden lg:block text-[80px]">
                        💳
                    </div>

                </div>

            </div>

            {/* KPI */}
            <div className="grid md:grid-cols-4 gap-5">

                <div className="bg-white rounded-3xl p-6 shadow-md">

                    <MdReceiptLong className="text-4xl text-blue-600 mb-3" />

                    <p className="text-gray-500 text-sm">
                        Total Invoice
                    </p>

                    <h2 className="text-4xl font-bold text-blue-600 mt-2">
                        {payments.length}
                    </h2>

                </div>

                <div className="bg-white rounded-3xl p-6 shadow-md">

                    <MdAttachMoney className="text-4xl text-green-600 mb-3" />

                    <p className="text-gray-500 text-sm">
                        Pendapatan
                    </p>

                    <h2 className="text-2xl font-bold text-green-600 mt-2">
                        Rp {totalPendapatan.toLocaleString("id-ID")}
                    </h2>

                </div>

                <div className="bg-white rounded-3xl p-6 shadow-md">

                    <MdPendingActions className="text-4xl text-yellow-500 mb-3" />

                    <p className="text-gray-500 text-sm">
                        Pending
                    </p>

                    <h2 className="text-4xl font-bold text-yellow-500 mt-2">
                        {totalPending}
                    </h2>

                </div>

                <div className="bg-white rounded-3xl p-6 shadow-md">

                    <MdPayments className="text-4xl text-indigo-600 mb-3" />

                    <p className="text-gray-500 text-sm">
                        Metode Pembayaran
                    </p>

                    <h2 className="text-4xl font-bold text-indigo-600 mt-2">
                        4
                    </h2>

                </div>

            </div>

            {/* SEARCH */}
            <div className="bg-white rounded-3xl p-5 shadow-md">

                <div className="relative">

                    <MdSearch className="absolute left-4 top-4 text-gray-400 text-xl" />

                    <input
                        type="text"
                        placeholder="Cari Invoice atau Nomor Rekam Medis..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-300"
                    />

                </div>

            </div>

            {/* TABLE */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">

                <div className="p-6 border-b border-gray-100 flex items-center justify-between">

                    <h2 className="text-xl font-bold text-gray-800">
                        Daftar Pembayaran
                    </h2>

                    <span className="text-blue-600 font-medium">
                        {filteredPayments.length} Transaksi
                    </span>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-blue-600 text-white">

                            <tr>

                                <th className="p-4 text-left">
                                    Invoice
                                </th>

                                <th className="p-4 text-left">
                                    No RM
                                </th>

                                <th className="p-4 text-left">
                                    Tanggal
                                </th>

                                <th className="p-4 text-left">
                                    Metode
                                </th>

                                <th className="p-4 text-left">
                                    Nominal
                                </th>

                                <th className="p-4 text-left">
                                    Status
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredPayments.map((item) => (

                                <tr
                                    key={item.id}
                                    className="border-b border-gray-100 hover:bg-blue-50 transition"
                                >

                                    <td className="p-4 font-semibold text-gray-800">
                                        {item.invoice}
                                    </td>

                                    <td className="p-4">
                                        {item.no_rm}
                                    </td>

                                    <td className="p-4">
                                        {item.tanggal}
                                    </td>

                                    <td className="p-4">
                                        {item.metode}
                                    </td>

                                    <td className="p-4 font-bold text-green-600">
                                        Rp {item.nominal.toLocaleString("id-ID")}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                item.status === "Lunas"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {item.status}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}