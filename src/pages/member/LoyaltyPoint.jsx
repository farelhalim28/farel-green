import {
  MdStars,
  MdEmojiEvents,
  MdTrendingUp,
  MdRedeem,
  MdWorkspacePremium,
} from "react-icons/md";

export default function LoyaltyPoint() {
  const currentPoint = 2350;
  const nextLevel = 3000;

  const progress = (currentPoint / nextLevel) * 100;

  const history = [
    {
      id: 1,
      aktivitas: "Perawatan Scaling",
      tanggal: "05 Juni 2026",
      poin: "+150",
    },
    {
      id: 2,
      aktivitas: "Kontrol Rutin",
      tanggal: "28 Mei 2026",
      poin: "+100",
    },
    {
      id: 3,
      aktivitas: "Redeem Voucher",
      tanggal: "20 Mei 2026",
      poin: "-500",
    },
    {
      id: 4,
      aktivitas: "Perawatan Behel",
      tanggal: "12 Mei 2026",
      poin: "+350",
    },
  ];

  const rewards = [
    {
      hadiah: "Voucher Diskon 10%",
      poin: 1000,
      icon: "🎁",
    },
    {
      hadiah: "Free Scaling",
      poin: 2000,
      icon: "🦷",
    },
    {
      hadiah: "Konsultasi Premium",
      poin: 3000,
      icon: "👨‍⚕️",
    },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold">
              Loyalty Point
            </h1>

            <p className="mt-2 text-purple-100">
              Kumpulkan poin dari setiap transaksi dan tukarkan dengan berbagai hadiah eksklusif.
            </p>
          </div>

          <div className="text-7xl">
            ⭐
          </div>

        </div>

      </div>

      {/* KPI */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <MdStars
            size={45}
            className="text-yellow-500 mb-3"
          />

          <p className="text-gray-500">
            Total Poin
          </p>

          <h2 className="text-4xl font-bold text-purple-600">
            {currentPoint}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <MdWorkspacePremium
            size={45}
            className="text-cyan-500 mb-3"
          />

          <p className="text-gray-500">
            Level Member
          </p>

          <h2 className="text-4xl font-bold text-cyan-600">
            VIP
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <MdEmojiEvents
            size={45}
            className="text-orange-500 mb-3"
          />

          <p className="text-gray-500">
            Ranking
          </p>

          <h2 className="text-4xl font-bold text-orange-600">
            #12
          </h2>

        </div>

      </div>

      {/* PROGRESS */}

      <div className="bg-white rounded-3xl shadow-md p-6">

        <div className="flex justify-between mb-3">

          <h2 className="font-bold text-lg">
            Progress Menuju Elite Member
          </h2>

          <span className="font-semibold text-purple-600">
            {currentPoint}/{nextLevel}
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-5">

          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-5 rounded-full"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <p className="text-gray-500 mt-3">
          Tinggal {nextLevel - currentPoint} poin lagi untuk mencapai Elite Member.
        </p>

      </div>

      {/* REWARD */}

      <div className="bg-white rounded-3xl shadow-md p-6">

        <div className="flex items-center gap-2 mb-5">

          <MdRedeem
            className="text-green-600"
            size={28}
          />

          <h2 className="text-xl font-bold">
            Reward Tersedia
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-5">

          {rewards.map((item, index) => (

            <div
              key={index}
              className="border rounded-2xl p-5 hover:shadow-lg transition"
            >

              <div className="text-5xl mb-3">
                {item.icon}
              </div>

              <h3 className="font-bold text-lg">
                {item.hadiah}
              </h3>

              <p className="text-purple-600 font-semibold mt-2">
                {item.poin} Poin
              </p>

              <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl transition w-full">
                Tukar Reward
              </button>

            </div>

          ))}

        </div>

      </div>

      {/* HISTORY */}

      <div className="bg-white rounded-3xl shadow-md p-6">

        <div className="flex items-center gap-2 mb-5">

          <MdTrendingUp
            className="text-blue-600"
            size={28}
          />

          <h2 className="text-xl font-bold">
            Riwayat Poin
          </h2>

        </div>

        <div className="space-y-4">

          {history.map((item) => (

            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >

              <div>

                <h3 className="font-semibold">
                  {item.aktivitas}
                </h3>

                <p className="text-gray-500 text-sm">
                  {item.tanggal}
                </p>

              </div>

              <div
                className={`font-bold text-lg ${
                  item.poin.includes("-")
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {item.poin}
              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}