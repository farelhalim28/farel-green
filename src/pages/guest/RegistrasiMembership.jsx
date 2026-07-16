import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { pasienAPI } from "../../services/pasienAPI"; // Pastikan path import benar
import {
  MdWorkspacePremium,
  MdPerson,
  MdEmail,
  MdPhone,
  MdLock,
  MdLocationOn,
  MdCake,
  MdWc
} from "react-icons/md";

export default function RegistrasiMembership() {
  const navigate = useNavigate();
  const [membership, setMembership] = useState("Regular"); // Default disamakan dengan db 'Regular'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // State untuk form control
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_telp: "",
    jenis_kelamin: "Laki-laki",
    tanggal_lahir: "",
    alamat: "",
    password: "",
    konfirmasiPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.konfirmasiPassword) {
      setError("Konfirmasi password tidak cocok!");
      return;
    }

    setLoading(true);
    try {
      // Generate kode_pasien acak, contoh: PSN-734
      const randomCode = `PSN-${Math.floor(100 + Math.random() * 900)}`;

      const dataBaru = {
        kode_pasien: randomCode,
        nama: formData.nama,
        jenis_kelamin: formData.jenis_kelamin,
        tanggal_lahir: formData.tanggal_lahir,
        no_telp: formData.no_telp,
        alamat: formData.alamat,
        membership: membership,
        email: formData.email,
        password: formData.password // Simpan plain/hash string sesuai kebutuhan simulasi
      };

      await pasienAPI.createPasien(dataBaru);
      alert(`Registrasi Membership ${membership} Berhasil! Silakan Login.`);
      navigate("/login-member");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal melakukan registrasi. Email atau kode mungkin sudah terdaftar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-28 pb-16 px-4 font-sans">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        
        {/* LEFT PANEL */}
        <div className="bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-500 rounded-3xl p-10 text-white shadow-xl h-fit">
          <div className="flex items-center gap-3">
            <MdWorkspacePremium size={40} />
            <h1 className="text-4xl font-bold">Membership SIGIGI</h1>
          </div>
          <p className="mt-6 text-lg text-blue-100">
            Bergabunglah menjadi member dan nikmati berbagai keuntungan eksklusif untuk perawatan kesehatan gigi Anda.
          </p>
          <div className="mt-10 space-y-4">
            <div className="bg-white/10 p-4 rounded-2xl">⭐ Diskon Perawatan Hingga 15%</div>
            <div className="bg-white/10 p-4 rounded-2xl">🎁 Promo Ulang Tahun</div>
            <div className="bg-white/10 p-4 rounded-2xl">🏆 Loyalty Point Reward</div>
            <div className="bg-white/10 p-4 rounded-2xl">📅 Prioritas Booking Appointment</div>
          </div>
        </div>

        {/* RIGHT PANEL - FORM REGISTRASI */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800">Daftar Membership</h2>
          <p className="text-gray-500 mt-2">Lengkapi data medis & akun berikut untuk bergabung.</p>

          {error && (
            <div className="mt-4 bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-xl text-xs font-bold">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {/* Nama */}
            <div>
              <label className="text-xs font-bold text-slate-500">NAMA LENGKAP</label>
              <div className="relative mt-1">
                <MdPerson className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input name="nama" type="text" onChange={handleChange} placeholder="Masukkan nama lengkap" className="w-full border rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Jenis Kelamin */}
              <div>
                <label className="text-xs font-bold text-slate-500">JENIS KELAMIN</label>
                <div className="relative mt-1">
                  <MdWc className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <select name="jenis_kelamin" onChange={handleChange} className="w-full border rounded-xl pl-12 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              {/* Tanggal Lahir */}
              <div>
                <label className="text-xs font-bold text-slate-500">TANGGAL LAHIR</label>
                <div className="relative mt-1">
                  <MdCake className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input name="tanggal_lahir" type="date" onChange={handleChange} className="w-full border rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
            </div>

            {/* Email & WA */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500">EMAIL</label>
                <div className="relative mt-1">
                  <MdEmail className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input name="email" type="email" onChange={handleChange} placeholder="nama@email.com" className="w-full border rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500">NO WHATSAPP</label>
                <div className="relative mt-1">
                  <MdPhone className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input name="no_telp" type="text" onChange={handleChange} placeholder="08xxxxxxxxxx" className="w-full border rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
            </div>

            {/* Alamat */}
            <div>
              <label className="text-xs font-bold text-slate-500">ALAMAT TEMPAT TINGGAL</label>
              <div className="relative mt-1">
                <MdLocationOn className="absolute left-4 top-3.5 text-gray-400" size={18} />
                <input name="alamat" type="text" onChange={handleChange} placeholder="Jl. Raya No. X, Pekanbaru" className="w-full border rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>

            {/* Pilihan Membership */}
            <div>
              <label className="text-xs font-bold text-slate-500">PILIH MEMBERSHIP TIER</label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {["Regular", "Gold", "Silver", "Platinum"].map((item) => (
                  <button key={item} type="button" onClick={() => setMembership(item)} className={`py-2 px-1 rounded-xl border text-xs font-bold transition ${membership === item ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white hover:border-blue-500 text-gray-700"}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Password */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-500">PASSWORD</label>
                <div className="relative mt-1">
                  <MdLock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input name="password" type="password" onChange={handleChange} placeholder="********" className="w-full border rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500">KONFIRMASI PASSWORD</label>
                <div className="relative mt-1">
                  <MdLock className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input name="konfirmasiPassword" type="password" onChange={handleChange} placeholder="********" className="w-full border rounded-xl pl-12 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-md hover:scale-[1.01] transition shadow-md disabled:opacity-50">
              {loading ? "Mendaftarkan Akun..." : `DAFTAR MEMBERSHIP (${membership.toUpperCase()})`}
            </button>

            <p className="text-center text-xs text-gray-500">
              Sudah punya akun? 
              <Link to="/login-member" className="text-blue-600 font-bold ml-1 hover:underline">Login Sekarang</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}