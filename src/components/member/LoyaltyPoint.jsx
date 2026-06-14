import {
  MdStars,
  MdTrendingUp,
  MdCardGiftcard,
  MdHistory,
  MdWorkspacePremium,
} from "react-icons/md";

export default function LoyaltyPoint() {
  const totalPoint = 2750;
  const nextLevel = 3000;
  const progress = (totalPoint / nextLevel) * 100;

  const history = [
    {
      id: 1,
      aktivitas: "Perawatan Scaling",
      tanggal: "12 Juni 2026",
      poin: "+150",
      type: "plus",
    },
    {
      id: 2,
      aktivitas: "Pembelian Paket Whitening",
      tanggal: "08 Juni 2026",
      poin: "+300",
      type: "plus",
    },
    {
      id: 3,
      aktivitas: "Penukaran Voucher Diskon",
      tanggal: "02 Juni 2026",
      poin: "-500",
      type: "minus",
    },
    {
      id: 4,
      aktivitas: "Kontrol Rutin",
      tanggal: "25 Mei 2026",
      poin: "+100",
      type: "plus",
    },
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold">
              Loyalty Point
            </h1>

            <p className="mt-2 text-purple-100">
              Kumpulkan poin dari setiap kunjungan dan tukarkan dengan berbagai hadiah menarik.
            </p>
          </div>

          <div className="hidden lg:block text-[80px]">
            ⭐
          </div>

        </div>

      </div>

      {/* KARTU POIN */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 rounded-3xl p-8 text-white shadow-lg">

        <div className="flex justify-between items-center">

          <div>
            <p className="text-yellow-100">
              Total Loyalty Point
            </p>

            <h2 className="text-5xl font-bold mt-2">
              {totalPoint}
            </h2>

            <p className="mt-2">
              Member VIP ⭐
            </p>
          </div>

          <MdStars size={90} />

        </div>

      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <MdTrendingUp className="text-green-500 text-4xl mb-3" />

          <p className="text-gray-500">
            Poin Bulan Ini
          </p>

          <h3 className="text-3xl font-bold text-green-600">
            +550
          </h3>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <MdCardGiftcard className="text-pink-500 text-4xl mb-3" />

          <p className="text-gray-500">
            Voucher Ditukar
          </p>

          <h3 className="text-3xl font-bold text-pink-600">
            3
          </h3>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <MdWorkspacePremium className="text-purple-500 text-4xl mb-3" />

          <p className="text-gray-500">
            Status Member
          </p>

          <h3 className="text-3xl font-bold text-purple-600">
            VIP
          </h3>
        </div>

      </div>

      {/* PROGRESS LEVEL */}
      <div className="bg-white rounded-3xl p-6 shadow-md">

        <div className="flex justify-between mb-3">

          <span className="font-semibold">
            Progress Level Berikutnya
          </span>

          <span className="text-purple-600 font-bold">
            {totalPoint}/{nextLevel}
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">

          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          />

        </div>

        <p className="text-sm text-gray-500 mt-3">
          Kurang {nextLevel - totalPoint} poin lagi untuk mencapai level berikutnya.
        </p>

      </div>

      {/* BENEFIT */}
      <div className="bg-white rounded-3xl p-6 shadow-md">

        <h2 className="text-xl font-bold mb-5">
          Benefit Loyalty Point
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <div className="border rounded-2xl p-5">
            <h3 className="font-bold text-purple-600">
              500 Point
            </h3>

            <p className="text-gray-500 mt-2">
              Voucher Diskon 10%
            </p>
          </div>

          <div className="border rounded-2xl p-5">
            <h3 className="font-bold text-purple-600">
              1000 Point
            </h3>

            <p className="text-gray-500 mt-2">
              Gratis Scaling
            </p>
          </div>

          <div className="border rounded-2xl p-5">
            <h3 className="font-bold text-purple-600">
              2500 Point
            </h3>

            <p className="text-gray-500 mt-2">
              Voucher Perawatan Premium
            </p>
          </div>

        </div>

      </div>

      {/* RIWAYAT */}
      <div className="bg-white rounded-3xl p-6 shadow-md">

        <div className="flex items-center gap-2 mb-5">

          <MdHistory className="text-purple-600 text-2xl" />

          <h2 className="text-xl font-bold">
            Riwayat Point
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

                <p className="text-sm text-gray-500">
                  {item.tanggal}
                </p>
              </div>

              <span
                className={`font-bold text-lg ${
                  item.type === "plus"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {item.poin}
              </span>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}