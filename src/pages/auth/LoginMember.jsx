import { Link, useNavigate } from "react-router-dom";
import {
  MdEmail,
  MdLock,
  MdWorkspacePremium,
  MdStars,
  MdCalendarMonth,
  MdArrowForward,
} from "react-icons/md";

export default function LoginMember() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Login Member Berhasil");

    navigate("/member/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 flex items-center justify-center px-6 py-10">

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}

        <div className="text-white">

          <div className="flex items-center gap-4 mb-8">

            <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <MdWorkspacePremium size={40} />
            </div>

            <div>
              <h1 className="text-5xl font-bold">
                SIGIGI Member
              </h1>

              <p className="text-blue-100 mt-1">
                Loyalty & Membership Portal
              </p>
            </div>

          </div>

          <h2 className="text-5xl font-bold leading-tight">
            Kelola Membership
            <br />
            dan Loyalty Point
            <br />
            dengan Mudah
          </h2>

          <p className="mt-6 text-blue-100 text-lg max-w-xl">
            Pantau poin loyalty, riwayat kunjungan,
            membership aktif, promo eksklusif,
            dan appointment Anda dalam satu portal.
          </p>

          <div className="grid md:grid-cols-3 gap-5 mt-12">

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
              <MdStars size={35} />

              <h3 className="text-3xl font-bold mt-3">
                850+
              </h3>

              <p className="text-blue-100">
                Loyalty Point
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
              <MdCalendarMonth size={35} />

              <h3 className="text-3xl font-bold mt-3">
                12+
              </h3>

              <p className="text-blue-100">
                Appointment
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6">
              <MdWorkspacePremium size={35} />

              <h3 className="text-3xl font-bold mt-3">
                Gold
              </h3>

              <p className="text-blue-100">
                Membership
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="bg-white rounded-[35px] shadow-2xl p-10">

          <div className="text-center">

            <div className="w-20 h-20 mx-auto rounded-3xl bg-blue-100 flex items-center justify-center">
              <MdWorkspacePremium
                size={40}
                className="text-blue-600"
              />
            </div>

            <h2 className="text-4xl font-bold text-gray-800 mt-5">
              Login Member
            </h2>

            <p className="text-gray-500 mt-2">
              Masuk ke akun membership Anda
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <div>

              <label className="text-sm font-medium">
                Email
              </label>

              <div className="relative mt-2">

                <MdEmail
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />

                <input
                  type="email"
                  placeholder="nama@email.com"
                  className="w-full border rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            <div>

              <label className="text-sm font-medium">
                Password
              </label>

              <div className="relative mt-2">

                <MdLock
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />

                <input
                  type="password"
                  placeholder="********"
                  className="w-full border rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>

            </div>

            <div className="text-right">

              <Link
                to="/forgot"
                className="text-blue-600 text-sm hover:underline"
              >
                Lupa Password?
              </Link>

            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] transition flex items-center justify-center gap-2"
            >
              Login Member

              <MdArrowForward size={20} />

            </button>

            <div className="text-center text-gray-500">

              Belum punya akun?

              <Link
                to="/membership/register"
                className="text-blue-600 font-semibold ml-1"
              >
                Daftar Membership
              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}