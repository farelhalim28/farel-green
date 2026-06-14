import {
  MdCalendarMonth,
  MdCheckCircle,
  MdPending,
  MdReplay,
  MdAccessTime,
} from "react-icons/md";

export default function AppointmentSaya() {
  const appointments = [
    {
      id: 1,
      dokter: "drg. Farel Abdul Halim",
      layanan: "Scaling Gigi",
      tanggal: "15 Juni 2026",
      jam: "09:00 WIB",
      status: "Confirmed",
    },
    {
      id: 2,
      dokter: "drg. Farel Abdul Halim",
      layanan: "Kontrol Behel",
      tanggal: "05 Juni 2026",
      jam: "13:00 WIB",
      status: "Completed",
    },
    {
      id: 3,
      dokter: "drg. Farel Abdul Halim",
      layanan: "Tambal Gigi",
      tanggal: "25 Juni 2026",
      jam: "10:30 WIB",
      status: "Pending",
    },
  ];

  const totalAppointment = appointments.length;

  const completed = appointments.filter(
    (item) => item.status === "Completed"
  ).length;

  const upcoming = appointments.filter(
    (item) => item.status === "Confirmed"
  ).length;

  const pending = appointments.filter(
    (item) => item.status === "Pending"
  ).length;

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Completed":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-cyan-600 via-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              Appointment Saya
            </h1>

            <p className="mt-2 text-cyan-100">
              Kelola seluruh jadwal kunjungan dan janji temu Anda dengan mudah.
            </p>

          </div>

          <div className="text-7xl">
            📅
          </div>

        </div>

      </div>

      {/* KPI */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <MdCalendarMonth
            size={45}
            className="text-blue-600 mb-3"
          />

          <p className="text-gray-500">
            Total Appointment
          </p>

          <h2 className="text-4xl font-bold text-blue-600">
            {totalAppointment}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <MdCheckCircle
            size={45}
            className="text-green-600 mb-3"
          />

          <p className="text-gray-500">
            Confirmed
          </p>

          <h2 className="text-4xl font-bold text-green-600">
            {upcoming}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <MdPending
            size={45}
            className="text-yellow-600 mb-3"
          />

          <p className="text-gray-500">
            Pending
          </p>

          <h2 className="text-4xl font-bold text-yellow-600">
            {pending}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md">

          <MdReplay
            size={45}
            className="text-purple-600 mb-3"
          />

          <p className="text-gray-500">
            Completed
          </p>

          <h2 className="text-4xl font-bold text-purple-600">
            {completed}
          </h2>

        </div>

      </div>

      {/* NEXT APPOINTMENT */}

      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-md">

        <div className="flex items-center gap-4">

          <MdAccessTime size={45} />

          <div>

            <h2 className="text-2xl font-bold">
              Appointment Berikutnya
            </h2>

            <p className="mt-1">
              Scaling Gigi bersama drg. Farel Abdul Halim
            </p>

            <p className="text-green-100">
              15 Juni 2026 • 09:00 WIB
            </p>

          </div>

        </div>

      </div>

      {/* LIST APPOINTMENT */}

      <div className="bg-white rounded-3xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-5">
          Daftar Appointment
        </h2>

        <div className="space-y-4">

          {appointments.map((item) => (

            <div
              key={item.id}
              className="border rounded-2xl p-5 hover:shadow-lg transition"
            >

              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                <div>

                  <h3 className="text-lg font-bold text-gray-800">
                    {item.layanan}
                  </h3>

                  <p className="text-gray-500">
                    {item.dokter}
                  </p>

                  <p className="mt-2 text-sm text-gray-600">
                    📅 {item.tanggal}
                  </p>

                  <p className="text-sm text-gray-600">
                    ⏰ {item.jam}
                  </p>

                </div>

                <div className="flex flex-col items-start md:items-end gap-3">

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition">
                    Booking Ulang
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* REMINDER */}

      <div className="bg-white rounded-3xl shadow-md p-6">

        <h2 className="text-xl font-bold mb-4">
          Reminder Kontrol
        </h2>

        <div className="border-l-4 border-blue-500 pl-4">

          <h3 className="font-semibold text-lg">
            Kontrol Behel
          </h3>

          <p className="text-gray-600">
            Jadwal kontrol berikutnya pada
            <span className="font-bold text-blue-600">
              {" "}20 Juli 2026
            </span>
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Jangan lupa hadir tepat waktu untuk menjaga hasil perawatan tetap optimal.
          </p>

        </div>

      </div>

    </div>
  );
}