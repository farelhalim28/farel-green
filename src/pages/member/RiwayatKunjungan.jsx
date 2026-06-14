import {
  MdHistory,
  MdMedicalServices,
  MdCalendarMonth,
  MdPayments,
  MdVerified,
} from "react-icons/md";

export default function RiwayatKunjungan() {
  const riwayat = [
    {
      id: 1,
      tanggal: "05 Juli 2026",
      layanan: "Scaling Gigi",
      dokter: "drg. Farel Abdul Halim",
      biaya: "Rp350.000",
      status: "Selesai",
    },
    {
      id: 2,
      tanggal: "20 Juni 2026",
      layanan: "Tambal Gigi",
      dokter: "drg. Farel Abdul Halim",
      biaya: "Rp450.000",
      status: "Selesai",
    },
    {
      id: 3,
      tanggal: "12 Mei 2026",
      layanan: "Pembersihan Karang Gigi",
      dokter: "drg. Farel Abdul Halim",
      biaya: "Rp300.000",
      status: "Selesai",
    },
    {
      id: 4,
      tanggal: "15 April 2026",
      layanan: "Bleaching",
      dokter: "drg. Farel Abdul Halim",
      biaya: "Rp1.200.000",
      status: "Selesai",
    },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold">
              Riwayat Kunjungan
            </h1>

            <p className="mt-2 text-blue-100">
              Lihat seluruh riwayat perawatan dan kunjungan Anda di Klinik SIGIGI.
            </p>
          </div>

          <MdHistory size={90} />
        </div>

      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <p className="text-gray-500">
            Total Kunjungan
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-2">
            28
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <p className="text-gray-500">
            Total Perawatan
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            15
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <p className="text-gray-500">
            Total Pengeluaran
          </p>

          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            Rp8,5 Jt
          </h2>
        </div>

      </div>

      {/* TIMELINE */}
      <div className="bg-white rounded-3xl shadow-md p-6">

        <div className="flex items-center gap-3 mb-6">

          <MdHistory
            className="text-blue-600"
            size={28}
          />

          <h2 className="text-2xl font-bold">
            Timeline Kunjungan
          </h2>

        </div>

        <div className="space-y-5">

          {riwayat.map((item) => (

            <div
              key={item.id}
              className="border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition"
            >

              <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

                <div className="space-y-3">

                  <div className="flex items-center gap-2 text-blue-600">
                    <MdCalendarMonth />
                    <span>{item.tanggal}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MdMedicalServices className="text-cyan-600" />
                    <span className="font-semibold">
                      {item.layanan}
                    </span>
                  </div>

                  <p className="text-gray-500">
                    Ditangani oleh {item.dokter}
                  </p>

                </div>

                <div className="flex flex-col items-start lg:items-end gap-3">

                  <div className="flex items-center gap-2 text-purple-600 font-bold">
                    <MdPayments />
                    {item.biaya}
                  </div>

                  <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold flex items-center gap-1">
                    <MdVerified />
                    {item.status}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* SUMMARY */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-6 text-white shadow-lg">

        <h2 className="text-2xl font-bold">
          Ringkasan Aktivitas
        </h2>

        <p className="mt-2 text-green-100">
          Anda merupakan pasien aktif dengan total 28 kunjungan dan berbagai perawatan yang telah dilakukan.
        </p>

      </div>

    </div>
  );
}