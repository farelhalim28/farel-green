import {
    MdMedicalServices,
    MdSchedule,
    MdVerified,
    MdArrowForward,
} from "react-icons/md";

const services = [
    {
        id: 1,
        nama: "Scaling Gigi",
        harga: "Rp 250.000",
        durasi: "30 Menit",
        deskripsi:
            "Membersihkan karang gigi dan menjaga kesehatan gusi.",
    },
    {
        id: 2,
        nama: "Tambal Gigi",
        harga: "Rp 350.000",
        durasi: "45 Menit",
        deskripsi:
            "Mengatasi gigi berlubang dengan material berkualitas.",
    },
    {
        id: 3,
        nama: "Cabut Gigi",
        harga: "Rp 500.000",
        durasi: "45 Menit",
        deskripsi:
            "Tindakan pencabutan gigi dengan prosedur aman.",
    },
    {
        id: 4,
        nama: "Bleaching",
        harga: "Rp 1.500.000",
        durasi: "60 Menit",
        deskripsi:
            "Mencerahkan warna gigi hingga beberapa tingkat.",
    },
    {
        id: 5,
        nama: "Behel",
        harga: "Rp 4.500.000",
        durasi: "90 Menit",
        deskripsi:
            "Perawatan ortodonti untuk merapikan susunan gigi.",
    },
    {
        id: 6,
        nama: "Veneer",
        harga: "Rp 2.000.000",
        durasi: "90 Menit",
        deskripsi:
            "Meningkatkan estetika senyum dengan veneer premium.",
    },
    {
        id: 7,
        nama: "Implan Gigi",
        harga: "Rp 8.000.000",
        durasi: "120 Menit",
        deskripsi:
            "Penggantian gigi permanen dengan teknologi modern.",
    },
    {
        id: 8,
        nama: "Gigi Palsu",
        harga: "Rp 2.500.000",
        durasi: "90 Menit",
        deskripsi:
            "Solusi kehilangan gigi agar kembali percaya diri.",
    },
];

export default function ServicesPage() {
    return (
        <div className="bg-slate-50">

            {/* HERO */}
            <section className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-24">

                    <div className="text-center">

                        <h1 className="text-5xl font-bold">
                            Layanan Klinik Gigi
                        </h1>

                        <p className="mt-5 text-xl text-blue-100 max-w-3xl mx-auto">
                            Berbagai layanan perawatan gigi modern
                            dengan dokter berpengalaman dan teknologi terkini.
                        </p>

                    </div>

                </div>

            </section>

            {/* INTRO */}
            <section className="max-w-7xl mx-auto px-6 py-16">

                <div className="text-center mb-14">

                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                        Professional Dental Care
                    </span>

                    <h2 className="text-4xl font-bold mt-5 text-slate-800">
                        Solusi Lengkap Untuk Kesehatan Gigi Anda
                    </h2>

                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                        Kami menyediakan layanan kesehatan dan estetika gigi
                        dengan standar internasional untuk seluruh keluarga.
                    </p>

                </div>

                {/* SERVICES GRID */}
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

                    {services.map((item) => (

                        <div
                            key={item.id}
                            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition duration-300"
                        >

                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-5">

                                <MdMedicalServices
                                    className="text-blue-600"
                                    size={32}
                                />

                            </div>

                            <h3 className="text-xl font-bold text-slate-800">
                                {item.nama}
                            </h3>

                            <p className="text-slate-500 mt-3 text-sm leading-relaxed">
                                {item.deskripsi}
                            </p>

                            <div className="mt-5 space-y-3">

                                <div className="flex items-center gap-2 text-green-600 font-semibold">
                                    <MdVerified />
                                    {item.harga}
                                </div>

                                <div className="flex items-center gap-2 text-blue-600">
                                    <MdSchedule />
                                    {item.durasi}
                                </div>

                            </div>

                            <button
                                className="
                                mt-6
                                w-full
                                bg-gradient-to-r
                                from-blue-600
                                to-cyan-500
                                text-white
                                py-3
                                rounded-xl
                                font-semibold
                                flex
                                items-center
                                justify-center
                                gap-2
                                hover:scale-105
                                transition
                            "
                            >
                                Booking Sekarang
                                <MdArrowForward />
                            </button>

                        </div>

                    ))}

                </div>

            </section>

            {/* WHY CHOOSE US */}
            <section className="bg-white py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-12">

                        <h2 className="text-4xl font-bold text-slate-800">
                            Kenapa Memilih SIGIGI?
                        </h2>

                        <p className="text-slate-500 mt-4">
                            Klinik gigi modern dengan kualitas pelayanan terbaik.
                        </p>

                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-blue-50 p-8 rounded-3xl">

                            <h3 className="font-bold text-xl text-blue-700">
                                Dokter Profesional
                            </h3>

                            <p className="mt-3 text-slate-600">
                                Ditangani dokter gigi berpengalaman
                                dan bersertifikasi.
                            </p>

                        </div>

                        <div className="bg-green-50 p-8 rounded-3xl">

                            <h3 className="font-bold text-xl text-green-700">
                                Teknologi Modern
                            </h3>

                            <p className="mt-3 text-slate-600">
                                Menggunakan alat terkini untuk hasil maksimal.
                            </p>

                        </div>

                        <div className="bg-purple-50 p-8 rounded-3xl">

                            <h3 className="font-bold text-xl text-purple-700">
                                Pelayanan Premium
                            </h3>

                            <p className="mt-3 text-slate-600">
                                Pelayanan ramah dengan sistem booking online.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* CTA */}
            <section className="py-20">

                <div className="max-w-5xl mx-auto px-6">

                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[40px] p-12 text-center text-white">

                        <h2 className="text-4xl font-bold">
                            Siap Memiliki Senyum Sehat?
                        </h2>

                        <p className="mt-4 text-blue-100">
                            Jadwalkan konsultasi sekarang bersama dokter terbaik kami.
                        </p>

                        <button
                            className="
                            mt-8
                            bg-white
                            text-blue-600
                            px-8
                            py-4
                            rounded-2xl
                            font-bold
                            hover:scale-105
                            transition
                        "
                        >
                            Buat Janji Temu
                        </button>

                    </div>

                </div>

            </section>

        </div>
    );
}