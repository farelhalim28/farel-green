import {
    MdLocalOffer,
    MdAccessTime,
    MdArrowForward,
} from "react-icons/md";

const promos = [
    {
        id: 1,
        title: "Bleaching Smile Package",
        discount: "20%",
        description:
            "Dapatkan senyum lebih cerah dengan promo bleaching eksklusif bulan ini.",
        image:
            "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800",
        color: "from-blue-600 to-cyan-500",
    },
    {
        id: 2,
        title: "Scaling + Check Up",
        discount: "15%",
        description:
            "Paket perawatan rutin untuk menjaga kesehatan gigi dan mulut Anda.",
        image:
            "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800",
        color: "from-green-500 to-emerald-600",
    },
    {
        id: 3,
        title: "Family Dental Package",
        discount: "25%",
        description:
            "Promo spesial keluarga untuk pemeriksaan dan perawatan bersama.",
        image:
            "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800",
        color: "from-purple-600 to-pink-500",
    },
];

export default function PromoSection() {
    return (
        <section
            id="promo"
            className="py-24 bg-gray-50"
        >
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">

                    <span className="text-blue-600 font-semibold uppercase tracking-widest">
                        Promo Spesial
                    </span>

                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
                        Penawaran Terbaik
                        <span className="text-blue-600">
                            {" "}Untuk Senyum Anda
                        </span>
                    </h2>

                    <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600">
                        Nikmati berbagai promo menarik dan diskon eksklusif
                        untuk treatment favorit Anda.
                    </p>

                </div>

                {/* Promo Cards */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {promos.map((promo) => (

                        <div
                            key={promo.id}
                            className="
                                bg-white
                                rounded-3xl
                                overflow-hidden
                                shadow-sm
                                hover:shadow-2xl
                                hover:-translate-y-2
                                transition-all
                                duration-300
                            "
                        >

                            {/* Image */}
                            <div className="relative h-60 overflow-hidden">

                                <img
                                    src={promo.image}
                                    alt={promo.title}
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                        hover:scale-110
                                        transition
                                        duration-500
                                    "
                                />

                                <div
                                    className={`
                                        absolute
                                        top-4
                                        left-4
                                        bg-gradient-to-r
                                        ${promo.color}
                                        text-white
                                        px-4
                                        py-2
                                        rounded-full
                                        font-bold
                                    `}
                                >
                                    Diskon {promo.discount}
                                </div>

                            </div>

                            {/* Content */}
                            <div className="p-6">

                                <div className="flex items-center gap-2 text-orange-500 mb-3">

                                    <MdLocalOffer />

                                    <span className="font-semibold">
                                        Promo Terbatas
                                    </span>

                                </div>

                                <h3 className="text-2xl font-bold text-gray-900">
                                    {promo.title}
                                </h3>

                                <p className="text-gray-600 mt-3">
                                    {promo.description}
                                </p>

                                <div className="flex items-center gap-2 mt-5 text-gray-500">

                                    <MdAccessTime />

                                    <span>
                                        Berlaku sampai akhir bulan
                                    </span>

                                </div>

                                <button
                                    className="
                                        mt-6
                                        w-full
                                        bg-blue-600
                                        hover:bg-blue-700
                                        text-white
                                        py-3
                                        rounded-xl
                                        font-semibold
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        transition
                                    "
                                >
                                    Klaim Promo
                                    <MdArrowForward />
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

                {/* CRM Promo Automation Banner */}
                <div
                    className="
                        mt-20
                        bg-gradient-to-r
                        from-blue-600
                        via-cyan-500
                        to-blue-600
                        rounded-3xl
                        p-10
                        text-white
                        text-center
                        shadow-xl
                    "
                >

                    <h3 className="text-3xl font-bold">
                        Promo Otomatis Untuk Member
                    </h3>

                    <p className="max-w-3xl mx-auto mt-4 text-blue-100">
                        Sistem CRM SIGIGI secara otomatis mengirimkan
                        promo treatment, diskon ulang tahun,
                        dan penawaran khusus berdasarkan
                        level membership pasien.
                    </p>

                    <button
                        className="
                            mt-6
                            bg-white
                            text-blue-600
                            px-8
                            py-3
                            rounded-xl
                            font-bold
                            hover:scale-105
                            transition
                        "
                    >
                        Lihat Semua Promo
                    </button>

                </div>

            </div>
        </section>
    );
}