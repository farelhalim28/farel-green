import {
    MdWorkspacePremium,
    MdStars,
    MdTrendingUp,
    MdCardGiftcard,
    MdVerified,
    MdDiamond,
} from "react-icons/md";

export default function MembershipSaya() {
    const member = {
        nama: "Andi Saputra",
        membership: "Gold",
        poin: 2350,
        targetNext: 3000,
        memberSejak: "11 Maret 2023",
        status: "Aktif",
    };

    const progress = (member.poin / member.targetNext) * 100;

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 rounded-3xl p-8 text-white shadow-xl">

                <div className="flex justify-between items-center">

                    <div>

                        <h1 className="text-4xl font-bold">
                            Membership Saya
                        </h1>

                        <p className="mt-2 text-yellow-100">
                            Kelola status membership dan nikmati seluruh benefit eksklusif.
                        </p>

                    </div>

                    <MdWorkspacePremium size={90} />

                </div>

            </div>

            {/* CARD MEMBER */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-white shadow-lg">

                <div className="flex justify-between items-center">

                    <div>

                        <p className="text-yellow-100">
                            Membership Aktif
                        </p>

                        <h2 className="text-4xl font-bold mt-2">
                            {member.membership}
                        </h2>

                        <p className="mt-2">
                            Member sejak {member.memberSejak}
                        </p>

                    </div>

                    <div className="text-center">

                        <MdDiamond size={70} />

                        <p className="mt-2 font-semibold">
                            Status {member.status}
                        </p>

                    </div>

                </div>

            </div>

            {/* KPI */}
            <div className="grid md:grid-cols-4 gap-5">

                <div className="bg-white p-6 rounded-3xl shadow-md">

                    <MdStars className="text-purple-500 text-4xl" />

                    <h2 className="text-3xl font-bold mt-3">
                        {member.poin}
                    </h2>

                    <p className="text-gray-500">
                        Total Poin
                    </p>

                </div>

                <div className="bg-white p-6 rounded-3xl shadow-md">

                    <MdTrendingUp className="text-green-500 text-4xl" />

                    <h2 className="text-3xl font-bold mt-3">
                        Platinum
                    </h2>

                    <p className="text-gray-500">
                        Target Berikutnya
                    </p>

                </div>

                <div className="bg-white p-6 rounded-3xl shadow-md">

                    <MdCardGiftcard className="text-blue-500 text-4xl" />

                    <h2 className="text-3xl font-bold mt-3">
                        12
                    </h2>

                    <p className="text-gray-500">
                        Voucher Digunakan
                    </p>

                </div>

                <div className="bg-white p-6 rounded-3xl shadow-md">

                    <MdVerified className="text-yellow-500 text-4xl" />

                    <h2 className="text-3xl font-bold mt-3">
                        Aktif
                    </h2>

                    <p className="text-gray-500">
                        Status Membership
                    </p>

                </div>

            </div>

            {/* PROGRESS */}
            <div className="bg-white rounded-3xl p-6 shadow-md">

                <div className="flex justify-between mb-3">

                    <h2 className="text-xl font-bold">
                        Progress Upgrade Membership
                    </h2>

                    <span className="font-semibold text-orange-600">
                        {member.poin} / {member.targetNext} poin
                    </span>

                </div>

                <div className="w-full bg-gray-200 rounded-full h-5">

                    <div
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-5 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>

                </div>

                <p className="mt-4 text-gray-600">
                    Kumpulkan {member.targetNext - member.poin} poin lagi
                    untuk naik ke Membership Platinum.
                </p>

            </div>

            {/* BENEFIT */}
            <div className="bg-white rounded-3xl p-6 shadow-md">

                <h2 className="text-xl font-bold mb-5">
                    Benefit Membership Gold
                </h2>

                <div className="grid md:grid-cols-2 gap-4">

                    <div className="p-4 bg-yellow-50 rounded-xl">
                        ✅ Diskon 10% Semua Perawatan
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-xl">
                        ✅ Prioritas Booking
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-xl">
                        ✅ Promo Ulang Tahun
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-xl">
                        ✅ Loyalty Point Lebih Besar
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-xl">
                        ✅ Reminder Kontrol Otomatis
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-xl">
                        ✅ Promo Member Eksklusif
                    </div>

                </div>

            </div>

            {/* RIWAYAT LEVEL */}
            <div className="bg-white rounded-3xl p-6 shadow-md">

                <h2 className="text-xl font-bold mb-6">
                    Riwayat Membership
                </h2>

                <div className="space-y-4">

                    <div className="flex justify-between p-4 bg-gray-50 rounded-xl">

                        <div>
                            <h3 className="font-semibold">
                                Bronze
                            </h3>

                            <p className="text-sm text-gray-500">
                                11 Maret 2023
                            </p>
                        </div>

                        <span className="font-bold text-blue-500">
                            Awal Bergabung
                        </span>

                    </div>

                    <div className="flex justify-between p-4 bg-gray-50 rounded-xl">

                        <div>
                            <h3 className="font-semibold">
                                Silver
                            </h3>

                            <p className="text-sm text-gray-500">
                                15 Oktober 2023
                            </p>
                        </div>

                        <span className="font-bold text-gray-500">
                            Upgrade
                        </span>

                    </div>

                    <div className="flex justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">

                        <div>
                            <h3 className="font-semibold">
                                Gold
                            </h3>

                            <p className="text-sm text-gray-500">
                                10 Januari 2025
                            </p>
                        </div>

                        <span className="font-bold text-yellow-600">
                            Membership Saat Ini
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}