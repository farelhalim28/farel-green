import {
    MdCalendarMonth,
    MdAccessTime,
    MdPayments,
    MdMedicalServices
} from "react-icons/md";

import appointments from "../data/appointments.json";

export default function JanjiTemu() {

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
        <div className="p-6 space-y-6">

            {/* Header */}

            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-8 text-white shadow-lg">

                <h1 className="text-3xl font-bold">
                    Janji Temu Pasien
                </h1>

                <p className="text-blue-100 mt-2">
                    Kelola seluruh jadwal pemeriksaan dan perawatan pasien
                </p>

            </div>

            {/* Statistik */}

            <div className="grid md:grid-cols-4 gap-4">

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <h4 className="text-gray-500">Total Jadwal</h4>
                    <p className="text-3xl font-bold">
                        {appointments.length}
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <h4 className="text-gray-500">Confirmed</h4>
                    <p className="text-3xl font-bold text-blue-600">
                        {
                            appointments.filter(
                                (x) => x.status === "Confirmed"
                            ).length
                        }
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <h4 className="text-gray-500">Pending</h4>
                    <p className="text-3xl font-bold text-yellow-600">
                        {
                            appointments.filter(
                                (x) => x.status === "Pending"
                            ).length
                        }
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <h4 className="text-gray-500">Selesai</h4>
                    <p className="text-3xl font-bold text-green-600">
                        {
                            appointments.filter(
                                (x) => x.status === "Selesai"
                            ).length
                        }
                    </p>
                </div>

            </div>

            {/* Card */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {appointments.map((item) => (

                    <div
                        key={item.id}
                        className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                    >

                        <div className="flex items-center gap-4 mb-5">

                            <img
                                src={item.foto}
                                alt={item.nama_pasien}
                                className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100"
                            />

                            <div>

                                <h3 className="font-bold text-lg">
                                    {item.nama_pasien}
                                </h3>

                                <p className="text-gray-500 text-sm">
                                    {item.no_rm}
                                </p>

                            </div>

                        </div>

                        <div className="space-y-3 text-sm">

                            <p className="flex items-center gap-2">
                                <MdCalendarMonth />
                                {item.tanggal}
                            </p>

                            <p className="flex items-center gap-2">
                                <MdAccessTime />
                                {item.jam_mulai} - {item.jam_selesai}
                            </p>

                            <p className="flex items-center gap-2">
                                <MdMedicalServices />
                                {item.jenis_perawatan}
                            </p>

                            <p className="flex items-center gap-2">
                                <MdPayments />
                                Rp {item.biaya.toLocaleString("id-ID")}
                            </p>

                        </div>

                        <div className="mt-5 flex justify-between items-center">

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}
                            >
                                {item.status}
                            </span>

                            <span className="text-xs text-gray-500">
                                {item.metode_bayar}
                            </span>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}