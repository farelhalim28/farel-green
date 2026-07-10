// =========================================================================
// LETAK FILE: src/pages/auth/Register.jsx
// =========================================================================
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MdEmail,
  MdLock,
  MdPerson,
  MdArrowBack,
  MdCheckCircle,
  MdError,
  MdSupervisorAccount,
} from "react-icons/md";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff", 
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validasi input kosong
    if (!form.name || !form.email || !form.password || !form.role) {
      setError("Semua field wajib diisi.");
      setLoading(false);
      return;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Format email tidak valid.");
      setLoading(false);
      return;
    }

    // UPDATE: Menggunakan URL dan API KEY Supabase project lu biar sinkron!
    const API_URL = "https://hbhzdvmegcebkwalhfmh.supabase.co/rest/v1/users";
    const API_KEY = "sb_publishable_pOmGQPpegTn7tQMGmE1M1Q_wGvEPcJQ";

    try {
      await axios.post(
        API_URL,
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
        },
        {
          headers: {
            apikey: API_KEY,
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
        }
      );

      setSuccess("Akun berhasil dibuat! Mengalihkan ke halaman login...");

      // Redirect balik ke halaman login utama setelah 2 detik
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      console.error("Detail Error Registrasi:", err.response?.data || err.message);
      if (err.response && err.response.status === 409) {
        setError("Email sudah terdaftar! Gunakan email lain.");
      } else {
        setError("Gagal mendaftarkan akun. Periksa koneksi internet atau konfigurasi database.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* SISI KIRI: TAMPILAN BRANDING & INFORMASI */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-md">🦷</div>
            <div>
              <h1 className="text-3xl font-bold">SIGIGI CRM</h1>
              <p className="text-blue-100">Klinik Sehat Senyum</p>
            </div>
          </div>
          <h2 className="text-5xl font-bold leading-tight">Buat Akun Baru <br /> Dalam Hitungan Detik</h2>
          <p className="mt-6 text-lg text-blue-100 leading-relaxed">
            Bergabunglah dengan sistem CRM Klinik Gigi modern untuk mengelola pasien, janji temu, rekam medis, pembayaran dan membership secara terintegrasi.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-3xl p-6">
          <h3 className="font-bold text-xl mb-3">Keunggulan Sistem</h3>
          <ul className="space-y-3 text-blue-100">
            <li>✅ Manajemen Pasien Lengkap</li>
            <li>✅ Rekam Medis Digital</li>
            <li>✅ Membership & Loyalty Point</li>
            <li>✅ Reminder Kontrol Otomatis</li>
            <li>✅ Dashboard Real-Time</li>
          </ul>
        </div>
      </div>

      {/* SISI KANAN: FORM REGISTRASI */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">✨</div>
              <h2 className="text-3xl font-bold text-gray-800">Registrasi</h2>
              <p className="text-gray-500 mt-2">Buat akun baru untuk mulai menggunakan sistem</p>
            </div>

            {/* Alert Status Feedback */}
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-5 text-sm flex items-center gap-2 border border-red-100">
                <MdError className="text-lg flex-shrink-0" /> {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-5 text-sm flex items-center gap-2 border border-green-100">
                <MdCheckCircle className="text-lg flex-shrink-0" /> {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold">
              {/* Input Nama */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Nama Lengkap</label>
                <div className="relative flex items-center">
                  <MdPerson className="absolute left-4 text-gray-400 text-xl" />
                  <input
                    type="text"
                    name="name"
                    disabled={loading}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Input Email */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                <div className="relative flex items-center">
                  <MdEmail className="absolute left-4 text-gray-400 text-xl" />
                  <input
                    type="email"
                    name="email"
                    disabled={loading}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="nama@gmail.com"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Input Password */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Password</label>
                <div className="relative flex items-center">
                  <MdLock className="absolute left-4 text-gray-400 text-xl" />
                  <input
                    type="password"
                    name="password"
                    disabled={loading}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Masukkan password"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Pilihan Hak Akses */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Pilih Akses (Role)</label>
                <div className="relative flex items-center">
                  <MdSupervisorAccount className="absolute left-4 text-gray-400 text-xl" />
                  <select
                    name="role"
                    disabled={loading}
                    value={form.role}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none text-slate-800"
                  >
                    <option value="staff">Staff Administrasi</option>
                    <option value="dokter">Dokter Gigi</option>
                    <option value="superadmin">Super Administrator</option>
                  </select>
                </div>
              </div>

              {/* Tombol Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 active:scale-[0.98] transition-all text-white py-3 rounded-xl font-bold shadow-lg uppercase tracking-wider cursor-pointer disabled:opacity-50"
              >
                {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
              </button>
            </form>

            {/* Link Navigasi Balik */}
            <div className="text-center mt-6">
              <Link to="/login" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline text-sm">
                <MdArrowBack /> Kembali ke Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}