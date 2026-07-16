import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { pasienAPI } from "../../services/pasienAPI"; // Mengarah ke pasienAPI kita
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
      // Panggil fungsi login terintegrasi database pasien
      const member = await pasienAPI.loginPasien(email, password);
      
      // Menyimpan data sesi di localStorage agar dibaca komponen dashboard
      localStorage.setItem("user_session", JSON.stringify(member));
      localStorage.setItem("currentMember", JSON.stringify(member));
      
      navigate("/member/dashboard");
    } catch (err) {
      setError(err.message || "Kombinasi email & password salah.");
    } finally {
      setLoading(false);
    }
  };

  // Suntik otomatis akun pengujian dosen yang sudah terintegrasi database
  const injectTestingAccount = () => {
    setEmail("budisantoso.psn001@sigigi.com");
    setPassword("password123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex font-sans bg-white">
      
      {/* SISI KIRI: Banner Branding */}
      <div className="hidden lg:flex lg:w-7/12 bg-gradient-to-br from-blue-600 to-cyan-500 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-blue-600 font-black text-xl">S</span>
          </div>
          <div>
            <h3 className="text-white font-black tracking-tight text-base leading-none">SIGIGI CRM</h3>
            <span className="text-blue-100 text-[10px] font-semibold tracking-wider">Klinik Sehat Senyum</span>
          </div>
        </div>

        <div className="max-w-xl my-auto relative z-10 space-y-4">
          <h1 className="text-5xl font-black text-white leading-tight tracking-tight">
            Portal Digital <br />Pasien & Membership
          </h1>
          <p className="text-blue-50/90 text-sm font-medium leading-relaxed max-w-md">
            Pantau perolehan loyalty point kamu, cek riwayat kunjungan medis, serta lakukan reservasi janji temu dokter gigi secara praktis dalam satu platform terintegrasi.
          </p>
        </div>

        <div className="flex justify-between items-center text-xs text-blue-100/70 border-t border-white/10 pt-6 relative z-10 font-medium">
          <p>24/7 Monitoring Layanan Pasien</p>
          <p>© 2026 SIGIGI Health System</p>
        </div>
      </div>

      {/* SISI KANAN: Form Input */}
      <div className="w-full lg:w-5/12 flex flex-col justify-center items-center px-6 py-12 bg-slate-50/50">
        <div className="w-full max-w-md space-y-7">
          
          <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl border border-slate-100 relative">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">Welcome Back 👋</h2>
              <p className="text-xs text-slate-400 font-semibold tracking-wide">Masuk ke Dashboard Portal Pasien</p>
            </div>

            {/* AKSES TESTING DOSEN */}
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
                    <p>📧 <span className="text-slate-400">Email:</span> <span className="font-bold text-slate-700">budisantoso.psn001@sigigi.com</span></p>
                    <p>🔑 <span className="text-slate-400">Password:</span> <span className="font-bold text-slate-700">password123</span></p>
                  </div>
                </div>
                <div className="p-2 bg-white rounded-xl text-blue-600 border border-blue-100 shadow-sm">
                  <MdContentCopy size={16} />
                </div>
              </div>
              
              {copied && (
                <div className="absolute inset-0 bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                  ✓ Berhasil Disalin & Diisi Otomatis!
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-2xl text-xs font-bold">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              {/* INPUT EMAIL */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1.5 tracking-widest uppercase">EMAIL MEMBER</label>
                <div className="relative mt-2">
                  <MdEmail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 pl-11 pr-4 py-3 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700" placeholder="nama@email.com" required />
                </div>
              </div>

              {/* INPUT PASSWORD */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1.5 tracking-widest uppercase">PASSWORD</label>
                <div className="relative mt-2">
                  <MdLock className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50/60 border border-slate-200 pl-11 pr-4 py-3 rounded-xl text-xs font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700" placeholder="••••••••" required />
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3.5 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50">
                <MdLogin size={16} />
                {loading ? "Menyinkronkan Akun..." : "MASUK KE PORTAL MEMBER"}
              </button>
            </form>
          </div>

          <p className="text-[11px] text-center text-slate-400 font-medium">
            Belum punya akun member? <Link to="/register-member" className="text-blue-600 font-bold hover:underline">Daftar Sekarang</Link>
          </p>
        </div>
      </div>

    </div>
  );
}