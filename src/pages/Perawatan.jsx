import treatments from "../data/treatments.json";
import { FaTooth } from "react-icons/fa";

export default function Perawatan() {

    return (
        <div className="p-6 space-y-6">

            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Master Perawatan
                </h1>

                <p className="text-gray-500">
                    Daftar seluruh layanan klinik gigi
                </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

                {treatments.map(item => (

                    <div
                        key={item.id}
                        className="bg-white rounded-3xl shadow-lg p-5 hover:-translate-y-1 transition"
                    >

                        <div className="flex justify-between items-center mb-4">

                            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                                <FaTooth className="text-blue-600 text-xl" />
                            </div>

                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                                {item.status}
                            </span>

                        </div>

                        <h3 className="font-bold text-lg mb-2">
                            {item.nama_perawatan}
                        </h3>

                        <p className="text-sm text-gray-500 mb-3">
                            {item.kategori}
                        </p>

                        <div className="space-y-2 text-sm">

                            <p>
                                <strong>Kode :</strong> {item.kode_perawatan}
                            </p>

                            <p>
                                <strong>Durasi :</strong> {item.durasi}
                            </p>

                            <p className="font-bold text-blue-600">
                                Rp {item.harga.toLocaleString("id-ID")}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}