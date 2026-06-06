import { useState } from "react";
import {
    MdPeople,
    MdSearch,
    MdVerified,
    MdWorkspacePremium,
    MdVisibility,
    MdEdit,
    MdDelete,
} from "react-icons/md";

import patients from "../data/patients.json";

export default function Pasien() {
    const [search, setSearch] = useState("");

    const filteredPatients = patients.filter(
        (item) =>
            item.nama.toLowerCase().includes(search.toLowerCase()) ||
            item.no_rm.toLowerCase().includes(search.toLowerCase())
    );

    const totalMember = patients.filter(
        (item) => item.membership
    ).length;

    const totalPoin = patients.reduce(
        (total, item) => total + item.poin,
        0
    );

    const pasienAktif = patients.filter(
        (item) => item.status === "Aktif"
    ).length;

    const getMembershipColor = (membership) => {
        switch (membership) {
            case "VIP":
                return "bg-purple-100 text-purple-700";

            case "Platinum":
                return "bg-cyan-100 text-cyan-700";

            case "Gold":
                return "bg-yellow-100 text-yellow-700";

            case "Silver":
                return "bg-gray-100 text-gray-700";

            default:
                return "bg-blue-100 text-blue-700";
        }
    };

    return (
        <div className="p-6 space-y-6">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-xl">

                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-4xl font-bold">
                            Manajemen Pasien
                        </h1>

                        <p className="mt-2 text-blue-100">
                            Kelola data pasien, membership, loyalty point dan komunikasi pasien.
                        </p>
                    </div>

                    <div className="hidden lg:block text-[80px]">
                        👨‍⚕️
                    </div>

                </div>

            </div>

            {/* KPI */}
            <div className="grid md:grid-cols-4 gap-5">

                <div className="bg-white rounded-3xl p-6 shadow-md">
                    <p className="text-gray-500 text-sm">
                        Total Pasien
                    </p>

                    <h2 className="text-4xl font-bold text-blue-600 mt-2">
                        {patients.length}
                    </h2>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-md">
                    <p className="text-gray-500 text-sm">
                        Membership Aktif
                    </p>

                    <h2 className="text-4xl font-bold text-yellow-500 mt-2">
                        {totalMember}
                    </h2>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-md">
                    <p className="text-gray-500 text-sm">
                        Total Poin Loyalty
                    </p>

                    <h2 className="text-4xl font-bold text-purple-600 mt-2">
                        {totalPoin}
                    </h2>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-md">
                    <p className="text-gray-500 text-sm">
                        Pasien Aktif
                    </p>

                    <h2 className="text-4xl font-bold text-green-600 mt-2">
                        {pasienAktif}
                    </h2>
                </div>

            </div>

            {/* SEARCH */}
            <div className="bg-white rounded-3xl p-5 shadow-md">

                <div className="relative">

                    <MdSearch className="absolute left-4 top-4 text-gray-400 text-xl" />

                    <input
                        type="text"
                        placeholder="Cari Nama Pasien atau Nomor Rekam Medis..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-300"
                    />

                </div>

            </div>

            {/* TABLE */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">

                <div className="p-6 flex items-center justify-between border-b border-gray-100">

                    <h2 className="text-xl font-bold text-gray-800">
                        Daftar Pasien
                    </h2>

                    <div className="flex items-center gap-2 text-blue-600 font-medium">
                        <MdPeople />
                        <span>{filteredPatients.length} Pasien</span>
                    </div>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-blue-600 text-white">

                            <tr>
                                <th className="p-4 text-left">Pasien</th>
                                <th className="p-4 text-left">No RM</th>
                                <th className="p-4 text-left">Telepon</th>
                                <th className="p-4 text-left">Membership</th>
                                <th className="p-4 text-left">Poin</th>
                                <th className="p-4 text-left">Last Visit</th>
                                <th className="p-4 text-left">Next Control</th>
                                <th className="p-4 text-left">Status</th>
                                <th className="p-4 text-center">Aksi</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredPatients.map((pasien) => (

                                <tr
                                    key={pasien.id}
                                    className="border-b border-gray-100 hover:bg-blue-50 transition"
                                >

                                    <td className="p-4">

                                        <div className="flex items-center gap-4">

                                            <img
                                                src={pasien.foto}
                                                alt={pasien.nama}
                                                className="w-14 h-14 rounded-full object-cover"
                                            />

                                            <div>

                                                <h3 className="font-semibold text-gray-800">
                                                    {pasien.nama}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    {pasien.email}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="p-4 font-medium">
                                        {pasien.no_rm}
                                    </td>

                                    <td className="p-4">
                                        {pasien.no_telepon}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${getMembershipColor(
                                                pasien.membership
                                            )}`}
                                        >
                                            <MdWorkspacePremium className="inline mr-1" />
                                            {pasien.membership}
                                        </span>

                                    </td>

                                    <td className="p-4 font-bold text-purple-600">
                                        {pasien.poin}
                                    </td>

                                    <td className="p-4">
                                        {pasien.last_visit}
                                    </td>

                                    <td className="p-4 font-semibold text-blue-600">
                                        {pasien.next_control}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                pasien.status === "Aktif"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            <MdVerified className="inline mr-1" />
                                            {pasien.status}
                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <div className="flex justify-center gap-2">

                                            <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition">
                                                <MdVisibility size={18} />
                                            </button>

                                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition">
                                                <MdEdit size={18} />
                                            </button>

                                            <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition">
                                                <MdDelete size={18} />
                                            </button>

                                        </div>

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