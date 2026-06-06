// ================================================
// LETAK FILE: src/pages/guest/PromoPage.jsx
// ================================================

import {
    MdLocalOffer,
    MdCampaign,
    MdCardGiftcard,
    MdCelebration,
} from "react-icons/md";

export default function PromoPage() {

    const promos = [
        {
            title: "Bleaching Gigi 20% OFF",
            description:
                "Dapatkan senyum lebih cerah dengan diskon bleaching hingga 20%.",
            color: "from-blue-600 to-cyan-500",
            icon: <MdLocalOffer size={40} />,
        },
        {
            title: "Scaling + Check Up",
            description:
                "Paket perawatan rutin dengan harga spesial mulai Rp199.000.",
            color: "from-green-500 to-emerald-600",
            icon: <MdCardGiftcard size={40} />,
        },
        {
            title: "Promo Ulang Tahun",
            description:
                "Member mendapatkan diskon spesial saat bulan ulang tahun.",
            color: "from-pink-500 to-rose-600",
            icon: <MdCelebration size={40} />,
        },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">

            {/* HERO */}

            <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-24">

                    <div className="flex items-center gap-4">

                        <MdCampaign size={60} />

                        <div>

                            <h1 className="text-5xl font-bold">
                                Promo & Penawaran Spesial
                            </h1>

                            <p className="mt-4 text-blue-100 max-w-3xl">
                                Nikmati berbagai promo menarik,
                                diskon member, dan program loyalitas
                                eksklusif untuk seluruh pasien SIGIGI.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* PROMO LIST */}

            <section className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid lg:grid-cols-3 gap-8">

                    {promos.map((promo, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
                        >

                            <div
                                className={`bg-gradient-to-r ${promo.color} text-white p-8`}
                            >

                                {promo.icon}

                                <h2 className="text-2xl font-bold mt-4">
                                    {promo.title}
                                </h2>

                            </div>

                            <div className="p-8">

                                <p className="text-gray-600">
                                    {promo.description}
                                </p>

                                <button
                                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                                >
                                    Klaim Promo
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

            {/* MARKETING AUTOMATION */}

            <section className="max-w-7xl mx-auto px-6 pb-20">

                <div className="bg-white rounded-3xl p-10 shadow-sm">

                    <h2 className="text-3xl font-bold text-center text-gray-800">
                        Promo Otomatis Untuk Member
                    </h2>

                    <p className="text-center text-gray-500 mt-3">
                        Sistem CRM SIGIGI secara otomatis memberikan
                        promo berdasarkan aktivitas pasien.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mt-10">

                        <div className="bg-blue-50 rounded-2xl p-6">

                            <h3 className="font-bold text-blue-700">
                                Birthday Promo
                            </h3>

                            <p className="mt-2 text-gray-600">
                                Diskon khusus saat bulan ulang tahun pasien.
                            </p>

                        </div>

                        <div className="bg-green-50 rounded-2xl p-6">

                            <h3 className="font-bold text-green-700">
                                Reminder Scaling
                            </h3>

                            <p className="mt-2 text-gray-600">
                                Promo otomatis setelah 6 bulan tidak kontrol.
                            </p>

                        </div>

                        <div className="bg-purple-50 rounded-2xl p-6">

                            <h3 className="font-bold text-purple-700">
                                Loyalty Reward
                            </h3>

                            <p className="mt-2 text-gray-600">
                                Tukarkan poin dengan voucher perawatan.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            {/* CTA */}

            <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-20 text-center">

                    <h2 className="text-4xl font-bold">
                        Jangan Lewatkan Promo Terbaru
                    </h2>

                    <p className="mt-4 text-blue-100">
                        Daftar sebagai member dan dapatkan promo eksklusif.
                    </p>

                    <button
                        className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
                    >
                        Gabung Membership
                    </button>

                </div>

            </section>

        </div>
    );
}