import {
  MdWorkspacePremium,
  MdVerified,
  MdCardGiftcard,
  MdTrendingUp,
  MdStars,
  MdHistory,
} from "react-icons/md";

export default function MembershipSaya() {
  const member = {
    nama: "Siti Aisyah",
    membership: "Gold",
    poin: 850,
    target: 1500,
    kunjungan: 12,
    status: "Aktif",
    memberSejak: "2024",
  };

  const progress = (member.poin / member.target) * 100;

  const benefits = [
    "Diskon Perawatan 15%",
    "Prioritas Appointment",
    "Bonus Loyalty Point",
    "Promo Khusus Member",
    "Reminder Kontrol Otomatis",
  ];

  const rewards = [
    {
      nama: "Voucher Scaling",
      poin: 500,
    },
    {
      nama: "Pemeriksaan Gratis",
      poin: 1000,
    },
    {
      nama: "Diskon Perawatan 25%",
      poin: 1500,
    },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-400 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex justify-between items-center">

          <div>
            <div className="flex items-center gap-2 mb-2">
              <MdWorkspacePremium size={32} />
              <h1 className="text-3xl font-bold">
                {member.membership} MEMBER
              </h1>
            </div>

            <h2 className="text-2xl font-semibold">
              {member.nama}
            </h2>

            <p className="text-yellow-100 mt-2">
              Member sejak {member.memberSejak}
            </p>
          </div>

          <div className="text-right">
            <h2 className="text-5xl font-bold">
              {member.poin}
            </h2>

            <p className="text-yellow-100">
              Loyalty Point
            </p>
          </div>

        </div>

      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-3xl shadow-md p-6">
          <p className="text-gray-500">
            Status Member
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            Aktif
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-6">
          <p className="text-gray-500">
            Total Kunjungan
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {member.kunjungan}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-6">
          <p className="text-gray-500">
            Loyalty Point
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            {member.poin}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-md p-6">
          <p className="text-gray-500">
            Next Level
          </p>

          <h2 className="text-3xl font-bold text-orange-500 mt-2">
            Platinum
          </h2>
        </div>

      </div>

      {/* PROGRESS */}
      <div className="bg-white rounded-3xl shadow-md p-6">

        <div className="flex items-center gap-2 mb-4">
          <MdTrendingUp className="text-blue-600 text-2xl" />

          <h2 className="text-xl font-bold">
            Progress Menuju Platinum
          </h2>
        </div>

        <div className="flex justify-between mb-2">
          <span>
            {member.poin} Point
          </span>

          <span>
            {member.target} Point
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          />

        </div>

        <p className="mt-3 text-sm text-gray-500">
          {progress.toFixed(0)}% menuju Platinum Member
        </p>

      </div>

      {/* BENEFIT */}
      <div className="bg-white rounded-3xl shadow-md p-6">

        <div className="flex items-center gap-2 mb-5">
          <MdStars className="text-yellow-500 text-2xl" />

          <h2 className="text-xl font-bold">
            Benefit Membership
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          {benefits.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-green-50 p-4 rounded-xl"
            >
              <MdVerified className="text-green-600 text-xl" />

              <span className="font-medium">
                {item}
              </span>
            </div>
          ))}

        </div>

      </div>

      {/* RIWAYAT */}
      <div className="bg-white rounded-3xl shadow-md p-6">

        <div className="flex items-center gap-2 mb-5">
          <MdHistory className="text-purple-600 text-2xl" />

          <h2 className="text-xl font-bold">
            Riwayat Membership
          </h2>
        </div>

        <div className="space-y-4">

          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="font-bold">
              2024
            </h3>

            <p className="text-gray-600">
              Bergabung sebagai Gold Member
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold">
              2025
            </h3>

            <p className="text-gray-600">
              Mendapat Bonus Loyalty Point
            </p>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-bold">
              2026
            </h3>

            <p className="text-gray-600">
              Membership Aktif dan Berjalan
            </p>
          </div>

        </div>

      </div>

      {/* REWARD */}
      <div className="bg-white rounded-3xl shadow-md p-6">

        <div className="flex items-center gap-2 mb-5">
          <MdCardGiftcard className="text-red-500 text-2xl" />

          <h2 className="text-xl font-bold">
            Reward Store
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">

          {rewards.map((reward, index) => (

            <div
              key={index}
              className="border rounded-2xl p-5 hover:shadow-lg transition"
            >

              <div className="text-5xl mb-3">
                🎁
              </div>

              <h3 className="font-bold text-lg">
                {reward.nama}
              </h3>

              <p className="text-purple-600 font-bold mt-2">
                {reward.poin} Point
              </p>

              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition">
                Tukar Reward
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}