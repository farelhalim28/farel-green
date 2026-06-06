import records from "../data/medical_records.json";
import {
    MdMedicalServices,
    MdPerson,
    MdCalendarMonth
} from "react-icons/md";

export default function RekamMedis() {

    return (
        <div className="p-6 space-y-6">

            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Rekam Medis
                </h1>

                <p className="text-gray-500">
                    Riwayat pemeriksaan dan tindakan pasien
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-5">

                {records.map(item => (

                    <div
                        key={item.id}
                        className="bg-white rounded-3xl shadow-lg p-6"
                    >

                        <div className="flex items-center justify-between mb-5">

                            <div>

                                <h3 className="font-bold text-lg">
                                    {item.no_rm}
                                </h3>

                                <p className="text-gray-500">
                                    Patient ID : {item.patient_id}
                                </p>

                            </div>

                            <div className="bg-blue-100 p-3 rounded-2xl">
                                <MdMedicalServices
                                    className="text-blue-600 text-2xl"
                                />
                            </div>

                        </div>

                        <div className="space-y-3">

                            <p className="flex items-center gap-2">
                                <MdCalendarMonth />
                                {item.tanggal}
                            </p>

                            <p>
                                <strong>Keluhan :</strong>
                                <br />
                                {item.keluhan}
                            </p>

                            <p>
                                <strong>Diagnosa :</strong>
                                <br />
                                {item.diagnosa}
                            </p>

                            <p>
                                <strong>Tindakan :</strong>
                                <br />
                                {item.tindakan}
                            </p>

                            <p>
                                <strong>Catatan Dokter :</strong>
                                <br />
                                {item.catatan_dokter}
                            </p>

                            <div className="pt-3 border-t">

                                <p className="flex items-center gap-2 text-blue-600 font-semibold">
                                    <MdPerson />
                                    {item.dokter}
                                </p>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}