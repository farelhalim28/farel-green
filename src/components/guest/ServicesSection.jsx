import {
    MdCleaningServices,
    MdMedicalServices,
    MdOutlineHealthAndSafety,
    MdOutlineAutoFixHigh,
    MdOutlineFaceRetouchingNatural,
    MdOutlineVerified,
} from "react-icons/md";

const services = [
    {
        icon: <MdCleaningServices size={40} />,
        title: "Scaling Gigi",
        description:
            "Membersihkan karang gigi dan menjaga kesehatan gusi secara menyeluruh.",
        price: "Mulai Rp150.000",
        duration: "30 - 45 Menit",
    },
    {
        icon: <MdMedicalServices size={40} />,
        title: "Tambal Gigi",
        description:
            "Perawatan gigi berlubang dengan bahan berkualitas tinggi dan tahan lama.",
        price: "Mulai Rp200.000",
        duration: "30 - 60 Menit",
    },
    {
        icon: <MdOutlineHealthAndSafety size={40} />,
        title: "Cabut Gigi",
        description:
            "Tindakan pencabutan aman dengan prosedur steril dan minim rasa sakit.",
        price: "Mulai Rp250.000",
        duration: "30 Menit",
    },
    {
        icon: <MdOutlineAutoFixHigh size={40} />,
        title: "Bleaching",
        description:
            "Mencerahkan warna gigi untuk mendapatkan senyum yang lebih percaya diri.",
        price: "Mulai Rp1.200.000",
        duration: "60 Menit",
    },
    {
        icon: <MdOutlineFaceRetouchingNatural size={40} />,
        title: "Veneer Gigi",
        description:
            "Perbaikan estetika gigi dengan tampilan natural dan elegan.",
        price: "Mulai Rp2.500.000",
        duration: "2 - 3 Kunjungan",
    },
    {
        icon: <MdOutlineVerified size={40} />,
        title: "Behel Ortodonti",
        description:
            "Merapikan susunan gigi untuk fungsi dan estetika yang optimal.",
        price: "Mulai Rp4.500.000",
        duration: "Kontrol Berkala",
    },
];

export default function ServicesSection() {
    return (
        <section
            id="services"
            className="py-24 bg-gradient-to-b from-white to-blue-50"
        >
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">

                    <span className="text-blue-600 font-semibold uppercase tracking-widest">
                        Layanan Kami
                    </span>

                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
                        Solusi Lengkap
                        <span className="text-blue-600">
                            {" "}Kesehatan Gigi
                        </span>
                    </h2>

                    <p className="max-w-3xl mx-auto mt-6 text-gray-600 text-lg">
                        Kami menyediakan berbagai layanan perawatan gigi
                        modern dengan teknologi terkini dan dokter
                        profesional untuk menjaga kesehatan serta
                        estetika senyum Anda.
                    </p>

                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {services.map((service, index) => (

                        <div
                            key={index}
                            className="
                                bg-white
                                rounded-3xl
                                p-8
                                border border-gray-100
                                shadow-sm
                                hover:shadow-2xl
                                hover:-translate-y-2
                                transition-all
                                duration-300
                            "
                        >

                            <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                                {service.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900">
                                {service.title}
                            </h3>

                            <p className="text-gray-600 mt-4 leading-relaxed">
                                {service.description}
                            </p>

                            <div className="mt-6 space-y-2">

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Harga
                                    </span>

                                    <span className="font-semibold text-blue-600">
                                        {service.price}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Durasi
                                    </span>

                                    <span className="font-semibold text-gray-800">
                                        {service.duration}
                                    </span>
                                </div>

                            </div>

                            <button
                                className="
                                    mt-8
                                    w-full
                                    bg-blue-600
                                    hover:bg-blue-700
                                    text-white
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    transition
                                "
                            >
                                Buat Janji Temu
                            </button>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
}