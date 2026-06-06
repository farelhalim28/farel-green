// ================================================
// LETAK FILE: src/pages/guest/DoctorsPage.jsx
// ================================================

import {
    MdVerified,
    MdSchool,
    MdMedicalServices,
    MdCalendarMonth,
} from "react-icons/md";

export default function DoctorsPage() {

    const doctors = [
        {
            id: 1,
            nama: "drg. Farel Abdul Halim",
            spesialis: "Dokter Gigi Umum",
            pengalaman: "8 Tahun",
            sertifikasi: "PDGI Certified",
            jadwal: "Senin - Jumat",
            foto: "https://i.pravatar.cc/300?img=12",
        },
        {
            id: 2,
            nama: "drg. Sarah Amanda",
            spesialis: "Orthodontist",
            pengalaman: "10 Tahun",
            sertifikasi: "Orthodontic Specialist",
            jadwal: "Senin - Sabtu",
            foto: "https://i.pravatar.cc/300?img=32",
        },
        {
            id: 3,
            nama: "drg. Michael Wijaya",
            spesialis: "Aesthetic Dentist",
            pengalaman: "7 Tahun",
            sertifikasi: "Dental Esthetic Certified",
            jadwal: "Selasa - Minggu",
            foto: "https://i.pravatar.cc/300?img=15",
        },
        {
            id: 4,
            nama: "drg. Olivia Putri",
            spesialis: "Implant Specialist",
            pengalaman: "12 Tahun",
            sertifikasi: "International Implant Academy",
            jadwal: "Senin - Jumat",
            foto: "https://i.pravatar.cc/300?img=25",
        },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">

            {/* HERO */}

            <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-24">

                    <h1 className="text-5xl font-bold">
                        Tim Dokter Profesional
                    </h1>

                    <p className="mt-4 text-blue-100 max-w-3xl">
                        Ditangani oleh dokter gigi berpengalaman,
                        bersertifikasi, dan menggunakan teknologi
                        modern untuk memberikan pelayanan terbaik.
                    </p>

                </div>

            </section>

            {/* STATS */}

            <section className="max-w-7xl mx-auto px-6 py-10">

                <div className="grid md:grid-cols-4 gap-5">

                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <h2 className="text-4xl font-bold text-blue-600">
                            15+
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Dokter Aktif
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <h2 className="text-4xl font-bold text-green-600">
                            20+
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Sertifikasi
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <h2 className="text-4xl font-bold text-purple-600">
                            10K+
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Pasien Ditangani
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <h2 className="text-4xl font-bold text-orange-500">
                            98%
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Kepuasan Pasien
                        </p>
                    </div>

                </div>

            </section>

            {/* DOKTER */}

            <section className="max-w-7xl mx-auto px-6 pb-20">

                <div className="text-center mb-12">

                    <h2 className="text-4xl font-bold text-gray-800">
                        Dokter Kami
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Tim dokter terbaik untuk menjaga kesehatan senyum Anda
                    </p>

                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

                    {doctors.map((doctor) => (

                        <div
                            key={doctor.id}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
                        >

                            <img
                                src={doctor.foto}
                                alt={doctor.nama}
                                className="w-full h-72 object-cover"
                            />

                            <div className="p-6">

                                <h3 className="text-xl font-bold text-gray-800">
                                    {doctor.nama}
                                </h3>

                                <p className="text-blue-600 font-medium mt-1">
                                    {doctor.spesialis}
                                </p>

                                <div className="space-y-3 mt-5 text-sm">

                                    <div className="flex items-center gap-2">
                                        <MdMedicalServices className="text-blue-600" />
                                        {doctor.pengalaman}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MdSchool className="text-green-600" />
                                        {doctor.sertifikasi}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MdCalendarMonth className="text-purple-600" />
                                        {doctor.jadwal}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MdVerified className="text-green-500" />
                                        Dokter Terverifikasi
                                    </div>

                                </div>

                                <button
                                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                                >
                                    Buat Janji Temu
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

            {/* CTA */}

            <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-20 text-center">

                    <h2 className="text-4xl font-bold">
                        Konsultasi Dengan Dokter Terbaik
                    </h2>

                    <p className="mt-4 text-blue-100">
                        Booking online hanya dalam beberapa menit.
                    </p>

                    <button
                        className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
                    >
                        Booking Sekarang
                    </button>

                </div>

            </section>

        </div>
    );
}
