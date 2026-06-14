import {
  MdWorkspacePremium,
  MdStars,
  MdCalendarMonth,
  MdHistory,
  MdTrendingUp,
  MdEmojiEvents,
} from "react-icons/md";

export default function DashboardMember() {
  return (
    <div className="space-y-6">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

          <div>
            <h1 className="text-4xl font-bold">
              Selamat Datang, Siti Aisyah 👋
            </h1>

            <p className="mt-3 text-blue-100 max-w-2xl">
              Kelola membership, pantau poin loyalitas, lihat riwayat
              perawatan, dan booking janji temu dengan mudah melalui
              Member Portal SIGIGI.
            </p>
          </div>

          <div className="text-8xl hidden lg:block">
            👑
          </div>

        </div>

      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <MdWorkspacePremium
            size={40}
            className="text-yellow-500"
          />

          <p className="mt-4 text-gray-500">
            Membership
          </p>

          <h2 className="text-3xl font-bold text-gray-800">
            Gold
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <MdStars
            size={40}
            className="text-purple-500"
          />

          <p className="mt-4 text-gray-500">
            Total Point
          </p>

          <h2 className="text-3xl font-bold text-purple-600">
            850
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <MdHistory
            size={40}
            className="text-green-500"
          />

          <p className="mt-4 text-gray-500">
            Total Kunjungan
          </p>

          <h2 className="text-3xl font-bold text-green-600">
            12
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <MdCalendarMonth
            size={40}
            className="text-blue-500"
          />

          <p className="mt-4 text-gray-500">
            Appointment Aktif
          </p>

          <h2 className="text-3xl font-bold text-blue-600">
            2
          </h2>

        </div>

      </div>

      {/* CONTENT */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* PROGRESS MEMBERSHIP */}
        <div className="bg-white rounded-3xl p-6 shadow-md">

          <div className="flex items-center gap-3">

            <MdTrendingUp
              size={28}
              className="text-blue-600"
            />

            <h2 className="font-bold text-xl">
              Progress Membership
            </h2>

          </div>

          <div className="mt-6">

            <p className="text-gray-600">
              Gold → Platinum
            </p>

            <div className="w-full h-4 bg-gray-200 rounded-full mt-3">

              <div className="w-[85%] h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>

            </div>

            <p className="mt-3 text-sm text-gray-500">
              850 / 1000 Point
            </p>

            <p className="text-green-600 font-medium mt-2">
              Tinggal 150 Point lagi menuju Platinum 🚀
            </p>

          </div>

        </div>

        {/* APPOINTMENT */}
        <div className="bg-white rounded-3xl p-6 shadow-md">

          <div className="flex items-center gap-3">

            <MdCalendarMonth
              size={28}
              className="text-cyan-600"
            />

            <h2 className="font-bold text-xl">
              Appointment Berikutnya
            </h2>

          </div>

          <div className="mt-6">

            <h3 className="font-semibold text-lg">
              Scaling Gigi
            </h3>

            <p className="text-gray-500 mt-2">
              drg. Farel Abdul Halim
            </p>

            <p className="text-blue-600 font-medium mt-2">
              12 Juli 2026
            </p>

            <span className="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              Terjadwal
            </span>

          </div>

        </div>

        {/* ACHIEVEMENT */}
        <div className="bg-white rounded-3xl p-6 shadow-md">

          <div className="flex items-center gap-3">

            <MdEmojiEvents
              size={28}
              className="text-yellow-500"
            />

            <h2 className="font-bold text-xl">
              Achievement
            </h2>

          </div>

          <div className="mt-6 space-y-3">

            <div className="bg-yellow-50 p-3 rounded-xl">
              🏆 Gold Member
            </div>

            <div className="bg-purple-50 p-3 rounded-xl">
              ⭐ 850 Loyalty Point
            </div>

            <div className="bg-blue-50 p-3 rounded-xl">
              🦷 12 Kunjungan Selesai
            </div>

          </div>

        </div>

      </div>

      {/* AKTIVITAS TERAKHIR */}
      <div className="bg-white rounded-3xl p-6 shadow-md">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Aktivitas Terakhir
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between items-center border-b pb-4">

            <div>

              <h3 className="font-semibold">
                Scaling Gigi
              </h3>

              <p className="text-sm text-gray-500">
                drg. Farel Abdul Halim
              </p>

            </div>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              Selesai
            </span>

          </div>

          <div className="flex justify-between items-center border-b pb-4">

            <div>

              <h3 className="font-semibold">
                Penambahan Loyalty Point
              </h3>

              <p className="text-sm text-gray-500">
                +150 Point
              </p>

            </div>

            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
              Berhasil
            </span>

          </div>

          <div className="flex justify-between items-center">

            <div>

              <h3 className="font-semibold">
                Upgrade Membership
              </h3>

              <p className="text-sm text-gray-500">
                Silver → Gold
              </p>

            </div>

            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
              Aktif
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}