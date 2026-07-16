import {
    MdWorkspacePremium,
    MdCheckCircle,
    MdStars,
} from "react-icons/md";

const memberships = [
    {
        id: 1,
        name: "Reguler Member",
        color: "border-slate-200",
        button: "bg-slate-600 hover:bg-slate-700",
        icon: "🥉",
        discount: "0%",
        points: "0 Poin",
        benefits: [
            "Pendaftaran Gratis",
            "Reminder Kontrol Otomatis",
            "Point Loyalty Rewards",
            "Akses Fitur Konsultasi",
        ],
    },
    {
        id: 2,
        name: "Silver Member",
        color: "border-gray-300",
        button: "bg-gray-700 hover:bg-gray-800",
        icon: "🥈",
        discount: "5%",
        points: "500 Poin",
        benefits: [
            "Diskon Treatment 5%",
            "Reminder Kontrol Otomatis",
            "Akses Promo Member",
            "Point Loyalty Rewards",
        ],
    },
    {
        id: 3,
        name: "Gold Member",
        color: "border-yellow-400",
        button: "bg-yellow-500 hover:bg-yellow-600",
        icon: "🥇",
        discount: "10%",
        points: "1000 Poin",
        benefits: [
            "Diskon Treatment 10%",
            "Prioritas Booking",
            "Promo Ulang Tahun",
            "Reminder WhatsApp Otomatis",
            "Point Loyalty Rewards",
        ],
    },
    {
        id: 4,
        name: "Platinum Member",
        color: "border-cyan-400",
        button: "bg-cyan-500 hover:bg-cyan-600",
        icon: "💎",
        discount: "15%",
        points: "2000 Poin",
        benefits: [
            "Diskon Treatment 15%",
            "Free Konsultasi Dokter",
            "Prioritas Appointment",
            "Promo Eksklusif",
            "Double Loyalty Point",
        ],
    },
];

export default function MembershipSection() {
    return (
        <section
            id="membership"
            className="py-24 bg-gradient-to-b from-blue-50 to-white"
        >
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-semibold uppercase tracking-widest">
                        Loyalty Program
                    </span>

                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
                        Membership &
                        <span className="text-blue-600">
                            {" "}Reward Program
                        </span>
                    </h2>

                    <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600">
                        Nikmati berbagai keuntungan eksklusif, diskon perawatan, reminder otomatis, serta program loyalty point untuk menjaga kesehatan gigi Anda secara rutin berdasarkan kriteria database kami.
                    </p>
                </div>

                {/* Cards - Menjadi 4 Kolom */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {memberships.map((item) => (
                        <div
                            key={item.id}
                            className={`
                                bg-white
                                rounded-3xl
                                p-6
                                border-2
                                ${item.color}
                                shadow-sm
                                hover:shadow-2xl
                                hover:-translate-y-2
                                transition-all
                                duration-300
                                flex flex-col justify-between
                            `}
                        >
                            <div>
                                <div className="text-center">
                                    <div className="text-5xl">
                                        {item.icon}
                                    </div>

                                    <h3 className="text-xl font-bold mt-4">
                                        {item.name}
                                    </h3>

                                    <div className="mt-5">
                                        <p className="text-gray-500 text-xs uppercase tracking-wider">
                                            Diskon Treatment
                                        </p>
                                        <h2 className="text-4xl font-bold text-blue-600 mt-1">
                                            {item.discount}
                                        </h2>
                                    </div>

                                    <div className="mt-4 flex items-center justify-center gap-1.5 text-yellow-500 text-sm">
                                        <MdStars size={18} />
                                        <span className="font-semibold">
                                            Minimal {item.points}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-3.5">
                                    {item.benefits.map((benefit, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-2.5 text-sm"
                                        >
                                            <MdCheckCircle
                                                className="text-green-500 mt-0.5 shrink-0"
                                                size={18}
                                            />
                                            <span className="text-gray-600 leading-tight">
                                                {benefit}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                className={`
                                    mt-8
                                    w-full
                                    text-white
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    transition
                                    text-sm
                                    ${item.button}
                                `}
                            >
                                Gabung Membership
                            </button>
                        </div>
                    ))}
                </div>

                {/* CRM Automation */}
                <div className="mt-20 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-3xl p-10 text-white shadow-xl">
                    <div className="text-center">
                        <MdWorkspacePremium
                            size={60}
                            className="mx-auto mb-4"
                        />
                        <h3 className="text-3xl font-bold">
                            Smart CRM Membership
                        </h3>
                        <p className="mt-4 text-blue-100 max-w-3xl mx-auto">
                            Sistem CRM kami akan secara otomatis mengirim reminder kontrol, promo ulang tahun, pemberitahuan poin, dan promo treatment berdasarkan level membership aktif pasien.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}