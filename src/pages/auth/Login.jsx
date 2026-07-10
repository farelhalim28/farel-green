// =========================================================================
// LETAK FILE: src/pages/auth/Login.jsx
// =========================================================================
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Tambahkan Link di sini
import axios from "axios";
import { MdEmail, MdLock, MdError, MdCheckCircle, MdInfo } from "react-icons/md";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");

  const handleLoginAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsgError("");
    setMsgSuccess("");

    // MEMBACA DARI FILE .env YANG UDAH LU BUAT Secara Dinamis
    const BASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    const API_URL = `${BASE_URL}/rest/v1/users`;

    try {
      const response = await axios.get(API_URL, {
        headers: {
          apikey: API_KEY,
          Authorization: `Bearer ${API_KEY}`,
        },
        params: {
          email: `eq.${email}`,
          password: `eq.${password}`
        }
      });

      if (response.data && response.data.length > 0) {
        const adminData = response.data[0];
        setMsgSuccess(`Selamat Datang, ${adminData.name || 'Admin'}!`);
        
        // Simpan token login internal
        localStorage.setItem("admin_token", adminData.id || "logged_in");
        localStorage.setItem("admin_name", adminData.name || "Admin");
        localStorage.setItem("admin_role", adminData.role || "superadmin");

        // Lempar langsung ke dashboard internal ERP klinik gigi
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
      } else {
        setMsgError("Kombinasi Email atau Password Admin salah!");
      }
    } catch (error) {
      setMsgError("Gagal terkoneksi. Pastikan VITE_SUPABASE_URL & KEY di .env sudah benar.");
      console.error("Detail Eror:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gradient-to-br from-blue-600 to-cyan-500 font-sans">
      
      {/* SISI KIRI: TAMPILAN BRANDING */}
      <div className="hidden lg:flex flex-col justify-between p-12 text-white bg-white/10 backdrop-blur-sm m-6 rounded-3xl border border-white/20 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-white text-blue-600 p-2 rounded-xl font-black shadow-md">🥼</div>
          <div>
            <h2 className="text-lg font-black tracking-wider uppercase">SIGIGI CRM</h2>
            <p className="text-[10px] font-bold text-blue-100 opacity-80">Klinik Sehat Senyum</p>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-black leading-tight tracking-tight">Sistem CRM Modern <br />untuk Klinik Gigi</h1>
          <p className="text-xs text-blue-50 font-medium leading-relaxed opacity-90 max-w-md">
            Kelola pasien, membership, loyalty point, janji temu, rekam medis, pembayaran, and komunikasi pasien dalam satu platform ERP internal terintegrasi.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
            <h4 className="text-xl font-black">10+</h4>
            <p className="text-[10px] text-blue-200 font-bold">Pasien Terdaftar</p>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
            <h4 className="text-xl font-black">24/7</h4>
            <p className="text-[10px] text-blue-200 font-bold">Monitoring Data</p>
          </div>
        </div>
      </div>

      {/* SISI KANAN: FORM INPUT LOGIN */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl space-y-6 border border-slate-100">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-800">Welcome Back 👋</h2>
            <p className="text-xs text-slate-400 font-semibold">Masuk ke Dashboard Portal Administrator</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-2xl text-slate-700 space-y-1.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-blue-700 font-black text-[11px] uppercase tracking-wider">
              <MdInfo size={16} /> Akses Login Pengujian Dosen
            </div>
            <div className="text-[11px] font-medium space-y-0.5">
              <p>📧 Email: <span className="font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200 select-all">admin@sigigi.com</span></p>
              <p>🔑 Password: <span className="font-bold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200 select-all">admin123</span></p>
            </div>
          </div>

          {msgError && <div className="flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-3 rounded-2xl text-xs font-bold border border-rose-100 animate-pulse"><MdError size={18} /> {msgError}</div>}
          {msgSuccess && <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-3 rounded-2xl text-xs font-bold border border-emerald-100"><MdCheckCircle size={18} /> {msgSuccess}</div>}

          <form onSubmit={handleLoginAdmin} className="space-y-4 text-xs font-semibold">
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-bold uppercase">Email Admin</label>
              <div className="relative flex items-center">
                <MdEmail className="absolute left-3.5 text-slate-400" size={16} />
                <input
                  type="email"
                  required
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ketik email administrator"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-slate-800 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 font-bold uppercase">Password</label>
              <div className="relative flex items-center">
                <MdLock className="absolute left-3.5 text-slate-400" size={16} />
                <input
                  type="password"
                  required
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-slate-800 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-center text-xs tracking-wider uppercase mt-2"
            >
              {loading ? "Mencocokkan Kredensial..." : "Masuk ke Sistem ERP"}
            </button>
          </form>

          {/* TAMBAHAN LINK REGISTRASI DI SINI */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-500 font-medium">
              Belum punya akun?{" "}
              <Link to="/register" className="text-blue-600 font-bold hover:underline">
                Daftar Sekarang
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

