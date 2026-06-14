import {
  MdWorkspacePremium,
  MdStars,
  MdCalendarMonth,
  MdLocalOffer,
  MdTrendingUp,
  MdHistory,
  MdEmojiEvents,
} from "react-icons/md";

export default function DashboardMember() {
  return (
    <div className="space-y-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold">
              Dashboard Member
            </h1>

            <p className="mt-2 text-blue-100">
              Selamat datang kembali. Nikmati berbagai keuntungan
              membership dan pantau aktivitas kesehatan gigi Anda.
            </p>
          </div>

          <div className="hidden lg:block text-8xl">
            👑
          </div>

        </div>

      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <MdWorkspacePremium className="text-4xl text-yellow-500 mb-3" />

          <p className="text-gray-500">
            Membership
          </p>

          <h2 className="text-3xl font-bold">
            Gold
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <MdStars className="text-4xl text-purple-500 mb-3" />

          <p className="text-gray-500">
            Loyalty Point
          </p>

          <h2 className="text-3xl font-bold">
            1.250
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <MdCalendarMonth className="text-4xl text-blue-500 mb-3" />

          <p className="text-gray-500">
            Total Kunjungan
          </p>

          <h2 className="text-3xl font-bold">
            16
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <MdLocalOffer className="text-4xl text-green-500 mb-3" />

          <p className="text-gray-500">
            Promo Aktif
          </p>

          <h2 className="text-3xl font-bold">
            4
          </h2>
        </div>

      </div>

      {/* PROGRESS */}
      <div className="bg-white rounded-3xl shadow-md p-6">

        <div className="flex items-center gap-2 mb-4">

          <MdTrendingUp className="text-blue-600 text-2xl" />

          <h2 className="text-xl font-bold">
            Progress Membership
          </h2>

        </div>

        <div className="flex justify-between mb-2">

          <span>Gold</span>

          <span className="font-bold">
            1.250 / 2.000 Poin
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full w-[62%]"></div>

        </div>

        <p className="mt-3 text-sm text-gray-500">
          Kumpulkan 750 poin lagi untuk naik ke Platinum Membership.
        </p>

      </div>

      {/* BENEFIT + APPOINTMENT */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <h2 className="text-xl font-bold mb-5">
            Benefit Membership
          </h2>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              ✅ Diskon Perawatan 10%
            </div>

            <div className="flex items-center gap-3">
              ✅ Priority Booking
            </div>

            <div className="flex items-center gap-3">
              ✅ Reminder Kontrol Otomatis
            </div>

            <div className="flex items-center gap-3">
              ✅ Promo Ulang Tahun
            </div>

            <div className="flex items-center gap-3">
              ✅ Loyalty Point Reward
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <h2 className="text-xl font-bold mb-5">
            Appointment Berikutnya
          </h2>

          <div className="bg-blue-50 p-5 rounded-2xl">

            <p className="text-gray-500">
              Tanggal
            </p>

            <h3 className="font-bold text-lg">
              20 Juni 2026
            </h3>

            <p className="mt-3 text-gray-500">
              Dokter
            </p>

            <h3 className="font-semibold">
              drg. Farel Abdul Halim
            </h3>

            <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
              Lihat Detail
            </button>

          </div>

        </div>

      </div>

      {/* PROMO + AKTIVITAS */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <div className="flex items-center gap-2 mb-4">

            <MdEmojiEvents className="text-yellow-500 text-2xl" />

            <h2 className="text-xl font-bold">
              Promo Member
            </h2>

          </div>

          <div className="space-y-3">

            <div className="bg-yellow-50 p-4 rounded-xl">
              Diskon Scaling Gigi 15%
            </div>

            <div className="bg-blue-50 p-4 rounded-xl">
              Cashback 100 Point
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              Bonus Konsultasi Gratis
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <div className="flex items-center gap-2 mb-4">

            <MdHistory className="text-blue-500 text-2xl" />

            <h2 className="text-xl font-bold">
              Aktivitas Terakhir
            </h2>

          </div>

          <div className="space-y-4">

            <div className="border-l-4 border-blue-500 pl-4">
              Scaling Gigi - 04 Juni 2026
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              Mendapat 150 Loyalty Point
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              Upgrade Membership Gold
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}