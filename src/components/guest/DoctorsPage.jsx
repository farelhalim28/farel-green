import {
    MdVerified,
    MdSchool,
    MdMedicalServices,
    MdCalendarMonth,
} from "react-icons/md";
import DoctorProcedureInfo from "../../components/guest/DoctorProcedureInfo";
import DoctorFaqSection from "../../components/guest/DoctorFaqSection";

export default function DoctorsPage() {

    const doctors = [
        {
            id: 1,
            nama: "drg. Farel Abdul Halim",
            spesialis: "Dokter Gigi Umum",
            pengalaman: "8 Tahun",
            sertifikasi: "PDGI Certified",
            jadwal: "Senin - Jumat",
            // Foto dokter pria ramah & profesional
            foto: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80",
        },
        {
            id: 2,
            nama: "drg. Sarah Amanda",
            spesialis: "Orthodontist",
            pengalaman: "10 Tahun",
            sertifikasi: "Orthodontic Specialist",
            jadwal: "Senin - Sabtu",
            // Foto dokter wanita tersenyum ramah
            foto: "https://images.unsplash.com/photo-1594824813573-246434e33963?w=500&auto=format&fit=crop&q=80",
        },
        {
            id: 3,
            nama: "drg. Michael Wijaya",
            spesialis: "Aesthetic Dentist",
            pengalaman: "7 Tahun",
            sertifikasi: "Dental Esthetic Certified",
            jadwal: "Selasa - Minggu",
            // Foto dokter pria kacamata formal medis (No more melet!)
            foto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=80",
        },
        {
            id: 4,
            nama: "drg. Olivia Putri",
            spesialis: "Implant Specialist",
            pengalaman: "12 Tahun",
            sertifikasi: "International Implant Academy",
            jadwal: "Senin - Jumat",
            // Foto dokter wanita senior berwibawa
            foto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80",
        },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">

            {/* HERO */}
            <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 text-white">
                <div className="max-w-7xl mx-auto px-6 py-24">
                    <h1 className="text-5xl font-bold tracking-tight">
                        Tim Dokter Profesional
                    </h1>
                    <p className="mt-4 text-blue-100 max-w-3xl text-lg leading-relaxed">
                        Ditangani oleh dokter gigi berpengalaman, bersertifikasi resmi, dan didukung oleh teknologi modern untuk memberikan pelayanan kesehatan gigi terbaik bagi Anda dan keluarga.
                    </p>
                </div>
            </section>

            {/* STATS */}
            <section className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid md:grid-cols-4 gap-5">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h2 className="text-4xl font-bold text-blue-600">15+</h2>
                        <p className="text-gray-500 mt-2 text-sm font-medium">Dokter Aktif</p>
                    </div>
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h2 className="text-4xl font-bold text-green-600">20+</h2>
                        <p className="text-gray-500 mt-2 text-sm font-medium">Sertifikasi Keahlian</p>
                    </div>
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h2 className="text-4xl font-bold text-purple-600">10K+</h2>
                        <p className="text-gray-500 mt-2 text-sm font-medium">Pasien Ditangani</p>
                    </div>
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h2 className="text-4xl font-bold text-orange-500">98%</h2>
                        <p className="text-gray-500 mt-2 text-sm font-medium">Kepuasan Pasien</p>
                    </div>
                </div>
            </section>

            {/* LIST DOKTER */}
            <section className="max-w-7xl mx-auto px-6 pt-10 pb-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900">Dokter Spesialis Kami</h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                        Tim dokter terbaik yang siap melayani kebutuhan konsultasi dan perawatan gigi Anda secara intensif.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor.id}
                            className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <img
                                    src={doctor.foto}
                                    alt={doctor.nama}
                                    className="w-full h-72 object-cover object-top bg-slate-100"
                                />
                                <div className="p-6">
                                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                                        {doctor.nama}
                                    </h3>
                                    <p className="text-blue-600 text-sm font-semibold mt-1">
                                        {doctor.spesialis}
                                    </p>
                                    <div className="space-y-3 mt-6 text-sm text-gray-600">
                                        <div className="flex items-center gap-2.5">
                                            <MdMedicalServices className="text-blue-500 text-lg" />
                                            <span>Pengalaman {doctor.pengalaman}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <MdSchool className="text-emerald-500 text-lg" />
                                            <span className="line-clamp-1">{doctor.sertifikasi}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <MdCalendarMonth className="text-purple-500 text-lg" />
                                            <span>Jadwal: {doctor.jadwal}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 pt-2 border-t border-slate-50 text-xs text-emerald-600 font-medium">
                                            <MdVerified className="text-base" />
                                            <span>Dokter Terverifikasi Komite Medis</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 pb-6">
                                <button
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-sm transition duration-200"
                                >
                                    Buat Janji Temu
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTIONS BARU BIAR HALAMAN MAKIN PANJANG & PROFESIONAL */}
            <DoctorProcedureInfo />
            
            <DoctorFaqSection />

            {/* CTA PENUTUP */}
            <section className="bg-gradient-to-r from-slate-900 to-blue-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
                <div className="max-w-7xl mx-auto px-6 py-24 text-center relative z-10">
                    <h2 className="text-4xl font-bold tracking-tight">
                        Konsultasikan Keluhan Gigi Anda Sekarang
                    </h2>
                    <p className="mt-4 text-slate-400 max-w-xl mx-auto text-base">
                        Sistem antrean digital kami menjamin kenyamanan Anda tanpa perlu mengantre lama di ruang tunggu klinik.
                    </p>
                    <button
                        className="mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-500 transition shadow-lg shadow-blue-600/20"
                    >
                        Booking Sesi Sekarang
                    </button>
                </div>
            </section>

        </div>
    );
}