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
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Janji Temu
                </h1>

                <p className="text-gray-500">
                    Total {appointments.length} jadwal perawatan pasien
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {appointments.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src={item.foto}
                                alt={item.nama_pasien}
                                className="w-14 h-14 rounded-full object-cover"
                            />

                            <div>
                                <h3 className="font-bold text-lg">
                                    {item.nama_pasien}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {item.no_rm}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                            <p>
                                <strong>No Antrian :</strong>{" "}
                                {item.no_antrian}
                            </p>

                            <p>
                                <strong>Tanggal :</strong>{" "}
                                {item.tanggal}
                            </p>

                            <p>
                                <strong>Jam :</strong>{" "}
                                {item.jam_mulai} - {item.jam_selesai}
                            </p>

                            <p>
                                <strong>Dokter :</strong>{" "}
                                {item.dokter}
                            </p>

                            <p>
                                <strong>Perawatan :</strong>{" "}
                                {item.jenis_perawatan}
                            </p>

                            <p>
                                <strong>Kategori :</strong>{" "}
                                {item.kategori}
                            </p>

                            <p>
                                <strong>Pembayaran :</strong>{" "}
                                {item.metode_bayar}
                            </p>

                            <p>
                                <strong>Biaya :</strong>{" "}
                                Rp {item.biaya.toLocaleString("id-ID")}
                            </p>
                        </div>

                        <div className="mt-4">
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}
                            >
                                {item.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}