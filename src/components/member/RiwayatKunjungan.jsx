import {
  MdHistory,
  MdSearch,
  MdCalendarToday,
  MdMedicalServices,
  MdAttachMoney,
  MdStar,
  MdCheckCircle,
} from "react-icons/md";

export default function RiwayatKunjungan() {
  const kunjungan = [
    {
      id: 1,
      tanggal: "04 Juni 2026",
      layanan: "Scaling Gigi",
      dokter: "drg. Farel Abdul Halim",
      biaya: "Rp 350.000",
      status: "Selesai",
      rating: 5,
    },
    {
      id: 2,
      tanggal: "12 Mei 2026",
      layanan: "Tambal Gigi",
      dokter: "drg. Farel Abdul Halim",
      biaya: "Rp 500.000",
      status: "Selesai",
      rating: 5,
    },
    {
      id: 3,
      tanggal: "20 April 2026",
      layanan: "Konsultasi Gigi",
      dokter: "drg. Farel Abdul Halim",
      biaya: "Rp 100.000",
      status: "Selesai",
      rating: 4,
    },
    {
      id: 4,
      tanggal: "15 Maret 2026",
      layanan: "Pembersihan Karang Gigi",
      dokter: "drg. Farel Abdul Halim",
      biaya: "Rp 300.000",
      status: "Selesai",
      rating: 5,
    },
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold">
              Riwayat Kunjungan
            </h1>

            <p className="text-blue-100 mt-2">
              Lihat seluruh aktivitas dan histori perawatan Anda.
            </p>
          </div>

          <div className="hidden lg:block text-7xl">
            📋
          </div>

        </div>
      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <MdHistory className="text-blue-600 text-4xl" />
          <h2 className="text-3xl font-bold mt-3">24</h2>
          <p className="text-gray-500">
            Total Kunjungan
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <MdAttachMoney className="text-green-600 text-4xl" />
          <h2 className="text-3xl font-bold mt-3">
            Rp 8,2 Jt
          </h2>
          <p className="text-gray-500">
            Total Perawatan
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <MdMedicalServices className="text-purple-600 text-4xl" />
          <h2 className="text-3xl font-bold mt-3">
            Scaling
          </h2>
          <p className="text-gray-500">
            Perawatan Terakhir
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <MdStar className="text-yellow-500 text-4xl" />
          <h2 className="text-3xl font-bold mt-3">
            4.9
          </h2>
          <p className="text-gray-500">
            Rating Kepuasan
          </p>
        </div>

      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-3xl p-5 shadow-md">

        <div className="relative">

          <MdSearch className="absolute left-4 top-4 text-gray-400 text-xl" />

          <input
            type="text"
            placeholder="Cari riwayat kunjungan..."
            className="w-full pl-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-300 outline-none"
          />

        </div>

      </div>

      {/* TIMELINE */}
      <div className="bg-white rounded-3xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-6">
          Timeline Kunjungan
        </h2>

        <div className="space-y-5">

          {kunjungan.map((item) => (
            <div
              key={item.id}
              className="border border-gray-100 rounded-2xl p-5 hover:bg-blue-50 transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>

                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    <MdCalendarToday />
                    {item.tanggal}
                  </div>

                  <h3 className="text-xl font-bold mt-2">
                    {item.layanan}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Dokter: {item.dokter}
                  </p>

                </div>

                <div className="flex flex-col items-start lg:items-end gap-2">

                  <span className="font-bold text-green-600 text-lg">
                    {item.biaya}
                  </span>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    <MdCheckCircle className="inline mr-1" />
                    {item.status}
                  </span>

                  <div className="flex text-yellow-500">
                    {"⭐".repeat(item.rating)}
                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>

      </div>

      {/* SUMMARY */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-lg">

        <h2 className="text-2xl font-bold">
          Ringkasan Aktivitas Anda
        </h2>

        <p className="mt-2 text-blue-100">
          Anda telah melakukan 24 kunjungan dengan total transaksi
          Rp 8.200.000 dan mendapatkan 2.850 poin loyalty.
        </p>

      </div>

    </div>
  );
}