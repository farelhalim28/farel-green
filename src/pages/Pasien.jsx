import patients from "../data/patients.json";

export default function Pasien() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Data Pasien
                </h1>

                <p className="text-gray-500">
                    Total {patients.length} pasien terdaftar
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="p-4 text-left">Pasien</th>
                                <th className="p-4 text-left">No RM</th>
                                <th className="p-4 text-left">Usia</th>
                                <th className="p-4 text-left">Gol Darah</th>
                                <th className="p-4 text-left">Telepon</th>
                                <th className="p-4 text-left">Dokter</th>
                                <th className="p-4 text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {patients.map((pasien) => (
                                <tr
                                    key={pasien.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={pasien.foto}
                                                alt={pasien.nama}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />

                                            <div>
                                                <p className="font-semibold">
                                                    {pasien.nama}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {pasien.jenis_kelamin}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        {pasien.no_rm}
                                    </td>

                                    <td className="p-4">
                                        {pasien.usia} Tahun
                                    </td>

                                    <td className="p-4">
                                        {pasien.golongan_darah}
                                    </td>

                                    <td className="p-4">
                                        {pasien.no_telepon}
                                    </td>

                                    <td className="p-4">
                                        {pasien.dokter}
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                pasien.status === "Aktif"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {pasien.status}
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