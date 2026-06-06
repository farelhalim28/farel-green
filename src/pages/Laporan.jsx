import appointments from "../data/appointments.json";
import {
    MdAttachMoney,
    MdCalendarMonth,
    MdPendingActions,
    MdCheckCircle,
    MdPeople,
    MdMedicalServices,
} from "react-icons/md";

export default function Laporan() {

    const totalPendapatan = appointments
        .filter((item) => item.status === "Selesai")
        .reduce((total, item) => total + item.biaya, 0);

    const selesai = appointments.filter(
        (item) => item.status === "Selesai"
    ).length;

    const pending = appointments.filter(
        (item) => item.status === "Pending"
    ).length;

    const confirmed = appointments.filter(
        (item) => item.status === "Confirmed"
    ).length;

    const totalPasien = new Set(
        appointments.map(item => item.no_rm)
    ).size;

    const getStatusColor = (status) => {

        switch (status) {

            case "Selesai":
                return "bg-green-100 text-green-700";

            case "Confirmed":
                return "bg-blue-100 text-blue-700";

            case "Pending":
                return "bg-yellow-100 text-yellow-700";

            case "Cancelled":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="p-6 space-y-6 bg-slate-50 min-h-screen">

            {/* HEADER */}

            <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-lg">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Laporan Klinik Gigi
                        </h1>

                        <p className="text-blue-100 mt-2">
                            Ringkasan performa operasional klinik
                        </p>

                    </div>

                    <div className="hidden lg:block text-[80px]">
                        📊
                    </div>

                </div>

            </div>

            {/* KPI */}

            <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-5">

                <div className="bg-white rounded-3xl p-5 shadow-sm">

                    <MdAttachMoney className="text-4xl text-green-600 mb-3" />

                    <p className="text-gray-500 text-sm">
                        Pendapatan
                    </p>

                    <h2 className="text-xl font-bold text-green-600 mt-2">
                        Rp {totalPendapatan.toLocaleString("id-ID")}
                    </h2>

                </div>

                <div className="bg-white rounded-3xl p-5 shadow-sm">

                    <MdCheckCircle className="text-4xl text-blue-600 mb-3" />

                    <p className="text-gray-500 text-sm">
                        Selesai
                    </p>

                    <h2 className="text-3xl font-bold text-blue-600 mt-2">
                        {selesai}
                    </h2>

                </div>

                <div className="bg-white rounded-3xl p-5 shadow-sm">

                    <MdPendingActions className="text-4xl text-yellow-500 mb-3" />

                    <p className="text-gray-500 text-sm">
                        Pending
                    </p>

                    <h2 className="text-3xl font-bold text-yellow-600 mt-2">
                        {pending}
                    </h2>

                </div>

                <div className="bg-white rounded-3xl p-5 shadow-sm">

                    <MdCalendarMonth className="text-4xl text-purple-600 mb-3" />

                    <p className="text-gray-500 text-sm">
                        Confirmed
                    </p>

                    <h2 className="text-3xl font-bold text-purple-600 mt-2">
                        {confirmed}
                    </h2>

                </div>

                <div className="bg-white rounded-3xl p-5 shadow-sm">

                    <MdPeople className="text-4xl text-cyan-600 mb-3" />

                    <p className="text-gray-500 text-sm">
                        Pasien
                    </p>

                    <h2 className="text-3xl font-bold text-cyan-600 mt-2">
                        {totalPasien}
                    </h2>

                </div>

            </div>

            {/* Statistik */}

            <div className="grid lg:grid-cols-3 gap-5">

                <div className="bg-white rounded-3xl p-6 shadow-sm">

                    <h2 className="font-bold text-lg mb-5">
                        Status Appointment
                    </h2>

                    <div className="space-y-5">

                        <div>

                            <div className="flex justify-between mb-2">
                                <span>Selesai</span>
                                <span>{selesai}</span>
                            </div>

                            <div className="h-3 bg-gray-100 rounded-full">
                                <div
                                    className="h-3 bg-green-500 rounded-full"
                                    style={{
                                        width: `${(selesai / appointments.length) * 100}%`
                                    }}
                                />
                            </div>

                        </div>

                        <div>

                            <div className="flex justify-between mb-2">
                                <span>Confirmed</span>
                                <span>{confirmed}</span>
                            </div>

                            <div className="h-3 bg-gray-100 rounded-full">
                                <div
                                    className="h-3 bg-blue-500 rounded-full"
                                    style={{
                                        width: `${(confirmed / appointments.length) * 100}%`
                                    }}
                                />
                            </div>

                        </div>

                        <div>

                            <div className="flex justify-between mb-2">
                                <span>Pending</span>
                                <span>{pending}</span>
                            </div>

                            <div className="h-3 bg-gray-100 rounded-full">
                                <div
                                    className="h-3 bg-yellow-500 rounded-full"
                                    style={{
                                        width: `${(pending / appointments.length) * 100}%`
                                    }}
                                />
                            </div>

                        </div>

                    </div>

                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm lg:col-span-2">

                    <h2 className="font-bold text-lg mb-5">
                        Treatment Terpopuler
                    </h2>

                    <div className="grid md:grid-cols-3 gap-4">

                        <div className="bg-blue-50 rounded-2xl p-4">

                            <MdMedicalServices className="text-3xl text-blue-600 mb-2" />

                            <h3 className="font-semibold">
                                Scaling
                            </h3>

                            <p className="text-sm text-gray-500">
                                Perawatan rutin paling banyak
                            </p>

                        </div>

                        <div className="bg-green-50 rounded-2xl p-4">

                            <MdMedicalServices className="text-3xl text-green-600 mb-2" />

                            <h3 className="font-semibold">
                                Tambal Gigi
                            </h3>

                            <p className="text-sm text-gray-500">
                                Restoratif populer
                            </p>

                        </div>

                        <div className="bg-purple-50 rounded-2xl p-4">

                            <MdMedicalServices className="text-3xl text-purple-600 mb-2" />

                            <h3 className="font-semibold">
                                Bleaching
                            </h3>

                            <p className="text-sm text-gray-500">
                                Estetik favorit pasien
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* TABLE */}

            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                <div className="p-5">

                    <h2 className="text-xl font-bold text-gray-800">
                        Riwayat Perawatan Pasien
                    </h2>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-blue-600 text-white">

                            <tr>

                                <th className="p-4 text-left">Pasien</th>
                                <th className="p-4 text-left">Perawatan</th>
                                <th className="p-4 text-left">Tanggal</th>
                                <th className="p-4 text-left">Biaya</th>
                                <th className="p-4 text-left">Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {appointments.map((item) => (

                                <tr
                                    key={item.id}
                                    className="hover:bg-blue-50 transition duration-200"
                                >

                                    <td className="p-4">

                                        <div className="flex items-center gap-3">

                                            <img
                                                src={item.foto}
                                                alt={item.nama_pasien}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />

                                            <div>

                                                <h4 className="font-semibold text-gray-800">
                                                    {item.nama_pasien}
                                                </h4>

                                                <p className="text-sm text-gray-400">
                                                    {item.no_rm}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="p-4">
                                        {item.jenis_perawatan}
                                    </td>

                                    <td className="p-4">
                                        {item.tanggal}
                                    </td>

                                    <td className="p-4 font-bold text-green-600">
                                        Rp {item.biaya.toLocaleString("id-ID")}
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}
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