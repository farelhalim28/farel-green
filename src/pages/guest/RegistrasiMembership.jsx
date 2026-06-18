import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdWorkspacePremium,
  MdPerson,
  MdEmail,
  MdPhone,
  MdLock,
} from "react-icons/md";

export default function RegistrasiMembership() {
  const [membership, setMembership] = useState("Gold");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Registrasi Membership Berhasil! Silakan Login.");
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-28 pb-16 px-4">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
        {/* LEFT */}

        <div className="bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-500 rounded-3xl p-10 text-white shadow-xl h-fit">
          <div className="flex items-center gap-3">
            <MdWorkspacePremium size={40} />

            <h1 className="text-4xl font-bold">Membership SIGIGI</h1>
          </div>

          <p className="mt-6 text-lg text-blue-100">
            Bergabunglah menjadi member dan nikmati berbagai keuntungan
            eksklusif untuk perawatan kesehatan gigi Anda.
          </p>

          <div className="mt-10 space-y-4">
            <div className="bg-white/10 p-4 rounded-2xl">
              ⭐ Diskon Perawatan Hingga 15%
            </div>

            <div className="bg-white/10 p-4 rounded-2xl">
              🎁 Promo Ulang Tahun
            </div>

            <div className="bg-white/10 p-4 rounded-2xl">
              🏆 Loyalty Point Reward
            </div>

            <div className="bg-white/10 p-4 rounded-2xl">
              📅 Prioritas Booking Appointment
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Daftar Membership
          </h2>

          <p className="text-gray-500 mt-2">
            Lengkapi data berikut untuk bergabung.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Nama */}

            <div>
              <label className="font-medium">Nama Lengkap</label>

              <div className="relative mt-2">
                <MdPerson
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Email */}

            <div>
              <label className="font-medium">Email</label>

              <div className="relative mt-2">
                <MdEmail
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />

                <input
                  type="email"
                  placeholder="nama@email.com"
                  className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* WA */}

            <div>
              <label className="font-medium">No WhatsApp</label>

              <div className="relative mt-2">
                <MdPhone
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="08xxxxxxxxxx"
                  className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Membership */}

            <div>
              <label className="font-medium">Pilih Membership</label>

              <div className="grid grid-cols-3 gap-3 mt-3">
                {["Silver", "Gold", "Platinum"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMembership(item)}
                    className={`p-4 rounded-2xl border transition ${
                      membership === item
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:border-blue-500"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="font-medium">Password</label>

              <div className="relative mt-2">
                <MdLock
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />

                <input
                  type="password"
                  placeholder="********"
                  className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Konfirmasi */}

            <div>
              <label className="font-medium">Konfirmasi Password</label>

              <div className="relative mt-2">
                <MdLock
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />

                <input
                  type="password"
                  placeholder="********"
                  className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:scale-[1.02] transition"
            >
              Daftar Membership
            </button>

            <p className="text-center text-gray-500">
              Sudah punya akun?
              <Link
                to="/login-member"
                className="text-blue-600 font-semibold ml-1 hover:underline"
              >
                Login Sekarang
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
