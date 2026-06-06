// ================================================
// LETAK FILE: src/pages/guest/MembershipPage.jsx
// ================================================

import {
    MdWorkspacePremium,
    MdStars,
    MdCardGiftcard,
    MdVerified,
} from "react-icons/md";

export default function MembershipPage() {

    const memberships = [
        {
            name: "Silver",
            point: "500 Poin",
            color: "from-gray-400 to-gray-600",
            benefit: [
                "Diskon 5% Semua Perawatan",
                "Reminder Kontrol Otomatis",
                "Poin Loyalty",
                "Promo Member"
            ]
        },
        {
            name: "Gold",
            point: "1000 Poin",
            color: "from-yellow-400 to-orange-500",
            benefit: [
                "Diskon 10%",
                "Prioritas Booking",
                "Promo Ulang Tahun",
                "Poin Loyalty Lebih Besar"
            ]
        },
        {
            name: "Platinum",
            point: "2000 Poin",
            color: "from-cyan-500 to-blue-600",
            benefit: [
                "Diskon 15%",
                "Free Konsultasi",
                "Priority Service",
                "Promo Eksklusif"
            ]
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen">

            {/* HERO */}

            <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-24">

                    <h1 className="text-5xl font-bold">
                        Membership Program
                    </h1>

                    <p className="mt-4 text-blue-100 max-w-3xl">
                        Nikmati berbagai keuntungan eksklusif,
                        loyalty point, promo spesial,
                        dan layanan prioritas untuk seluruh anggota.
                    </p>

                </div>

            </section>

            {/* BENEFIT */}

            <section className="max-w-7xl mx-auto px-6 py-16">

                <div className="grid md:grid-cols-3 gap-6">

                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <MdCardGiftcard className="text-5xl text-blue-600 mb-4" />
                        <h3 className="font-bold text-xl">
                            Loyalty Point
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Kumpulkan poin dari setiap transaksi
                            dan tukarkan dengan voucher menarik.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <MdStars className="text-5xl text-yellow-500 mb-4" />
                        <h3 className="font-bold text-xl">
                            Promo Eksklusif
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Dapatkan promo spesial
                            yang hanya tersedia untuk member.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm">
                        <MdWorkspacePremium className="text-5xl text-purple-600 mb-4" />
                        <h3 className="font-bold text-xl">
                            Priority Service
                        </h3>
                        <p className="text-gray-500 mt-2">
                            Booking lebih cepat
                            dan pelayanan prioritas.
                        </p>
                    </div>

                </div>

            </section>

            {/* MEMBERSHIP CARD */}

            <section className="max-w-7xl mx-auto px-6 pb-20">

                <div className="text-center mb-12">

                    <h2 className="text-4xl font-bold text-gray-800">
                        Pilih Membership Anda
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Semakin tinggi level membership,
                        semakin besar keuntungan yang didapat.
                    </p>

                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {memberships.map((item, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition"
                        >

                            <div
                                className={`bg-gradient-to-r ${item.color} text-white p-8`}
                            >

                                <h3 className="text-3xl font-bold">
                                    {item.name}
                                </h3>

                                <p className="mt-2 opacity-90">
                                    Minimum {item.point}
                                </p>

                            </div>

                            <div className="p-8">

                                <ul className="space-y-4">

                                    {item.benefit.map((benefit, idx) => (

                                        <li
                                            key={idx}
                                            className="flex items-center gap-3"
                                        >

                                            <MdVerified className="text-green-500" />

                                            {benefit}

                                        </li>

                                    ))}

                                </ul>

                                <button
                                    className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                                >
                                    Gabung Membership
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
                        Mulai Kumpulkan Poin Hari Ini
                    </h2>

                    <p className="mt-4 text-blue-100">
                        Semakin sering melakukan perawatan,
                        semakin banyak keuntungan yang Anda dapatkan.
                    </p>

                    <button
                        className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
                    >
                        Daftar Membership
                    </button>

                </div>

            </section>

        </div>
    );
}