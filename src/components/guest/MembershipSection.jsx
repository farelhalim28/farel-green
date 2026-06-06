import {
    MdWorkspacePremium,
    MdCheckCircle,
    MdStars,
} from "react-icons/md";

const memberships = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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
            "Reminder Premium",
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
                        Nikmati berbagai keuntungan eksklusif,
                        diskon perawatan, reminder otomatis,
                        serta program loyalty point untuk
                        menjaga kesehatan gigi Anda secara rutin.
                    </p>

                </div>

                {/* Cards */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {memberships.map((item) => (

                        <div
                            key={item.id}
                            className={`
                                bg-white
                                rounded-3xl
                                p-8
                                border-2
                                ${item.color}
                                shadow-sm
                                hover:shadow-2xl
                                hover:-translate-y-2
                                transition-all
                                duration-300
                            `}
                        >

                            <div className="text-center">

                                <div className="text-6xl">
                                    {item.icon}
                                </div>

                                <h3 className="text-2xl font-bold mt-4">
                                    {item.name}
                                </h3>

                                <div className="mt-5">

                                    <p className="text-gray-500">
                                        Diskon Treatment
                                    </p>

                                    <h2 className="text-5xl font-bold text-blue-600 mt-2">
                                        {item.discount}
                                    </h2>

                                </div>

                                <div className="mt-4 flex items-center justify-center gap-2 text-yellow-500">

                                    <MdStars size={22} />

                                    <span className="font-semibold">
                                        Minimal {item.points}
                                    </span>

                                </div>

                            </div>

                            <div className="mt-8 space-y-4">

                                {item.benefits.map((benefit, index) => (

                                    <div
                                        key={index}
                                        className="flex items-start gap-3"
                                    >

                                        <MdCheckCircle
                                            className="text-green-500 mt-1"
                                            size={20}
                                        />

                                        <span className="text-gray-600">
                                            {benefit}
                                        </span>

                                    </div>

                                ))}

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
                                    ${item.button}
                                `}
                            >
                                Gabung Membership
                            </button>

                        </div>

                    ))}

                </div>

                {/* CRM Automation */}
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
                        shadow-xl
                    "
                >

                    <div className="text-center">

                        <MdWorkspacePremium
                            size={60}
                            className="mx-auto mb-4"
                        />

                        <h3 className="text-3xl font-bold">
                            Smart CRM Membership
                        </h3>

                        <p className="mt-4 text-blue-100 max-w-3xl mx-auto">
                            Sistem CRM kami akan secara otomatis
                            mengirim reminder kontrol,
                            promo ulang tahun,
                            pemberitahuan poin,
                            dan promo treatment berdasarkan
                            level membership pasien.
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
}