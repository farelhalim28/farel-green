import {
  MdCalendarMonth,
  MdAccessTime,
  MdCheckCircle,
  MdPending,
  MdEditCalendar,
  MdCancel,
  MdAddCircle,
} from "react-icons/md";

export default function AppointmentSaya() {
  const appointments = [
    {
      id: 1,
      tanggal: "20 Juni 2026",
      jam: "09:00 WIB",
      layanan: "Scaling Gigi",
      dokter: "drg. Farel Abdul Halim",
      status: "Terkonfirmasi",
    },
    {
      id: 2,
      tanggal: "15 Juli 2026",
      jam: "13:00 WIB",
      layanan: "Kontrol Pasca Tambal",
      dokter: "drg. Farel Abdul Halim",
      status: "Menunggu",
    },
    {
      id: 3,
      tanggal: "05 Mei 2026",
      jam: "10:00 WIB",
      layanan: "Pembersihan Karang Gigi",
      dokter: "drg. Farel Abdul Halim",
      status: "Selesai",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Terkonfirmasi":
        return "bg-green-100 text-green-700";

      case "Menunggu":
        return "bg-yellow-100 text-yellow-700";

      case "Selesai":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold">
              Appointment Saya
            </h1>

            <p className="text-blue-100 mt-2">
              Kelola jadwal kunjungan dan kontrol kesehatan Anda.
            </p>
          </div>

          <div className="hidden lg:block text-7xl">
            📅
          </div>

        </div>

      </div>

      {/* KPI */}
      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <MdCalendarMonth className="text-blue-600 text-4xl" />
          <h2 className="text-3xl font-bold mt-3">
            3
          </h2>
          <p className="text-gray-500">
            Total Appointment
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <MdCheckCircle className="text-green-600 text-4xl" />
          <h2 className="text-3xl font-bold mt-3">
            1
          </h2>
          <p className="text-gray-500">
            Terkonfirmasi
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <MdPending className="text-yellow-500 text-4xl" />
          <h2 className="text-3xl font-bold mt-3">
            1
          </h2>
          <p className="text-gray-500">
            Menunggu
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">
          <MdAccessTime className="text-purple-600 text-4xl" />
          <h2 className="text-3xl font-bold mt-3">
            20 Jun
          </h2>
          <p className="text-gray-500">
            Jadwal Terdekat
          </p>
        </div>

      </div>

      {/* QUICK ACTION */}
      <div className="bg-white rounded-3xl shadow-md p-6">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-xl font-bold">
              Booking Appointment Baru
            </h2>

            <p className="text-gray-500 text-sm">
              Buat jadwal kunjungan dengan dokter pilihan Anda.
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl flex items-center gap-2">
            <MdAddCircle />
            Buat Appointment
          </button>

        </div>

      </div>

      {/* APPOINTMENT LIST */}
      <div className="bg-white rounded-3xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-6">
          Jadwal Appointment
        </h2>

        <div className="space-y-4">

          {appointments.map((item) => (
            <div
              key={item.id}
              className="border border-gray-100 rounded-2xl p-5 hover:bg-blue-50 transition"
            >

              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

                <div>

                  <h3 className="text-xl font-bold">
                    {item.layanan}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {item.dokter}
                  </p>

                  <div className="flex gap-4 mt-3 text-sm text-gray-600">

                    <span className="flex items-center gap-1">
                      <MdCalendarMonth />
                      {item.tanggal}
                    </span>

                    <span className="flex items-center gap-1">
                      <MdAccessTime />
                      {item.jam}
                    </span>

                  </div>

                </div>

                <div className="flex flex-col items-start lg:items-end gap-3">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>

                  {item.status !== "Selesai" && (
                    <div className="flex gap-2">

                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <MdEditCalendar />
                        Reschedule
                      </button>

                      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <MdCancel />
                        Cancel
                      </button>

                    </div>
                  )}

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* REMINDER */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-white shadow-lg">

        <h2 className="text-2xl font-bold">
          🔔 Reminder Kontrol Berikutnya
        </h2>

        <p className="mt-2 text-green-100">
          Anda memiliki jadwal kontrol pada
          <span className="font-bold">
            {" "}20 Juni 2026 pukul 09:00 WIB
          </span>
          .
          Mohon hadir 15 menit lebih awal untuk proses registrasi.
        </p>

      </div>

    </div>
  );
}