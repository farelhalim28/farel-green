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
      localStorage.setItem("user_session", JSON.stringify(member));
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="w-full max-w-md space-y-6">
        
        {/* MAIN CARD LOGIN */}
        <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-blue-900/5 border border-slate-100 relative overflow-hidden">
          
          {/* Efek Lingkaran Estetik */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
          
          <div className="text-center space-y-2 relative">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">
              Portal Pasien
            </h2>
            <p className="text-sm text-slate-400 font-medium">
              Silakan masuk untuk cek point & janji temu kamu
            </p>
          </div>
          
          {error && (
            <div className="mt-5 bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-2xl text-xs font-bold animate-shake">
              ⚠️ {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {/* INPUT EMAIL */}
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1.5 tracking-wider uppercase">
                Email Member
              </label>
              <div className="relative flex items-center">
                <MdEmail className="absolute left-4 text-slate-400 text-xl" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full bg-slate-50/80 border border-slate-200 pl-12 pr-4 py-3.5 rounded-2xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-slate-400 text-slate-700" 
                  placeholder="masukkan email terdaftar..." 
                  required 
                />
              </div>
            </div>

            {/* INPUT PASSWORD */}
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1.5 tracking-wider uppercase">
                Kata Sandi
              </label>
              <div className="relative flex items-center">
                <MdLock className="absolute left-4 text-slate-400 text-xl" />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full bg-slate-50/80 border border-slate-200 pl-12 pr-4 py-3.5 rounded-2xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder-slate-400 text-slate-700" 
                  placeholder="••••••••" 
                  required 
                />
              </div>
            </div>

            {/* TOMBOL SUBMIT */}
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3.5 rounded-2xl font-bold text-sm hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <MdLogin size={18} />
              {loading ? "Menyinkronkan Akun..." : "Masuk ke Portal Member"}
            </button>
          </form>
        </div>

        {/* INFO BOX AKUN TESTING UNTUK DOSEN */}
        <div 
          onClick={injectTestingAccount}
          className="bg-cyan-50/60 hover:bg-cyan-50 border border-cyan-100 p-4 rounded-2xl cursor-pointer transition-all duration-200 group relative overflow-hidden shadow-sm"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-extrabold bg-cyan-600 text-white px-2 py-0.5 rounded-md uppercase tracking-wider">
                Demo Akun Testing (Klik untuk Auto-Fill)
              </span>
              <div className="mt-2 space-y-0.5 font-mono text-xs text-slate-600">
                <p><span className="font-bold text-slate-500">Email:</span> siti@gmail.com</p>
                <p><span className="font-bold text-slate-500">Pass :</span> member123</p>
              </div>
            </div>
            <div className="p-2 bg-white rounded-xl text-cyan-600 border border-cyan-100 group-hover:scale-105 transition-transform shadow-sm">
              <MdContentCopy size={16} />
            </div>
          </div>
          
          {copied && (
            <div className="absolute inset-0 bg-cyan-600/90 flex items-center justify-center text-white text-xs font-bold animate-fadeIn">
              ✓ Berhasil Disalin & Diisi Otomatis!
            </div>
          )}
        </div>

      </div>
    </div>
  );
}