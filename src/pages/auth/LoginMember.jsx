// =========================================================================
// LETAK FILE: src/pages/auth/LoginMember.jsx
// =========================================================================
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";
import { MdEmail, MdLock, MdLogin, MdContentCopy } from "react-icons/md";

export default function LoginMember() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const member = await userService.loginMember(email, password);
      // Menggunakan key session yang konsisten dengan kebutuhan dashboard portal member
      localStorage.setItem("user_session", JSON.stringify(member));
      localStorage.setItem("currentMember", JSON.stringify(member));
      navigate("/member/dashboard");
    } catch (err) {
      setError(err.message || "Kombinasi email & password salah.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi pembantu dosen biar bisa auto-fill kredensial testing sekali klik
  const injectTestingAccount = () => {
    setEmail("siti@gmail.com");
    setPassword("member123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex font-sans bg-white">
      
      {/* SISI KIRI: Banner Informasi Promo/Branding (Sinkron dengan Login Admin) */}
      <div className="hidden lg:flex lg:w-7/12 bg-gradient-to-br from-blue-600 to-cyan-500 p-12 flex-col justify-between relative overflow-hidden">
        {/* Efek Ornamen Latar Belakang */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>

        {/* Logo / Brand Header */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-700/20">
            <span className="text-blue-600 font-black text-xl">S</span>
          </div>
          <div>
            <h3 className="text-white font-black tracking-tight text-base leading-none">SIGIGI CRM</h3>
            <span className="text-blue-100 text-[10px] font-semibold tracking-wider">Klinik Sehat Senyum</span>
          </div>
        </div>

        {/* Konten Promosi Tengah */}
        <div className="max-w-xl my-auto relative z-10 space-y-4">
          <h1 className="text-5xl font-black text-white leading-tight tracking-tight">
            Portal Digital <br />Pasien & Membership
          </h1>
          <p className="text-blue-50/90 text-sm font-medium leading-relaxed max-w-md">
            Pantau perolehan loyalty point kamu, cek riwayat kunjungan medis, serta lakukan reservasi janji temu dokter gigi secara praktis dalam satu platform terintegrasi.
          </p>
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center text-xs text-blue-100/70 border-t border-white/10 pt-6 relative z-10 font-medium">
          <p>24/7 Monitoring Layanan Pasien</p>
          <p>© 2026 SIGIGI Health System</p>
        </div>
      </div>

      {/* SISI KANAN: Form Input Kredensial Login Pasien */}
      <div className="w-full lg:w-5/12 flex flex-col justify-center items-center px-6 py-12 bg-slate-50/50">
        <div className="w-full max-w-md space-y-7">
          
          {/* Main Card Wrapper */}
          <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl shadow-slate-900/5 border border-slate-100/80 relative">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                Welcome Back 👋
              </h2>
              <p className="text-xs text-slate-400 font-semibold tracking-wide">
                Masuk ke Dashboard Portal Pasien
              </p>
            </div>

            {/* INFO BOX AKUN TESTING UNTUK DOSEN */}
            <div 
              onClick={injectTestingAccount}
              className="mt-6 bg-blue-50/80 hover:bg-blue-50 border border-blue-100 p-4 rounded-2xl cursor-pointer transition-all duration-200 group relative overflow-hidden shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold bg-blue-600 text-white px-2 py-0.5 rounded-md uppercase tracking-wider">
                    AKSES LOGIN PENGUJIAN DOSEN
                  </span>
                  <div className="mt-2 space-y-0.5 font-sans text-xs text-slate-600 font-medium">
                    <p>📧 <span className="text-slate-400">Email:</span> <span className="font-bold text-slate-700">siti@gmail.com</span></p>
                    <p>🔑 <span className="text-slate-400">Password:</span> <span className="font-bold text-slate-700">member123</span></p>
                  </div>
                </div>
                <div className="p-2 bg-white rounded-xl text-blue-600 border border-blue-100 group-hover:scale-105 transition-transform shadow-sm">
                  <MdContentCopy size={16} />
                </div>
              </div>
              
              {copied && (
                <div className="absolute inset-0 bg-blue-600 flex items-center justify-center text-white text-xs font-bold animate-fadeIn">
                  ✓ Berhasil Disalin & Diisi Otomatis!
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-2xl text-xs font-bold animate-shake">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              {/* INPUT EMAIL */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1.5 tracking-widest uppercase">
                  EMAIL MEMBER
                </label>
                <div className="relative flex items-center">
                  <MdEmail className="absolute left-4 text-slate-400 text-lg" />
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full bg-slate-50/60 border border-slate-200 pl-11 pr-4 py-3 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-slate-400 text-slate-700" 
                    placeholder="nama@email.com" 
                    required 
                  />
                </div>
              </div>

              {/* INPUT PASSWORD */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1.5 tracking-widest uppercase">
                  PASSWORD
                </label>
                <div className="relative flex items-center">
                  <MdLock className="absolute left-4 text-slate-400 text-lg" />
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full bg-slate-50/60 border border-slate-200 pl-11 pr-4 py-3 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder-slate-400 text-slate-700" 
                    placeholder="••••••••" 
                    required 
                  />
                </div>
              </div>

              {/* TOMBOL SUBMIT */}
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3.5 rounded-xl font-bold text-xs hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/10 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50"
              >
                <MdLogin size={16} />
                {loading ? "Menyinkronkan Akun..." : "MASUK KE PORTAL MEMBER"}
              </button>
            </form>
          </div>

          <p className="text-[11px] text-center text-slate-400 font-medium">
            Belum punya akun member? <span className="text-blue-600 font-bold hover:underline cursor-pointer">Daftar Sekarang</span>
          </p>
        </div>
      </div>

    </div>
  );
}