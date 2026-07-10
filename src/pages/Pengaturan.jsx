// =========================================================================
// LETAK FILE: src/pages/Pengaturan.jsx
// PENGATURAN GLOBAL INTEGRASI 3 PORTAL: ADMIN, GUEST WEBSITE, & MEMBER APP
// =========================================================================

import { useState, useEffect } from "react";
import { 
    MdBusiness, 
    MdNotificationsActive, 
    MdCardMembership, 
    MdDns, 
    MdSave, 
    MdWeb, 
    MdLock,
    MdCheckCircle
} from "react-icons/md";

export default function Pengaturan() {
    const [activeTab, setActiveTab] = useState("klinik");
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // 1. STATE: INTERNAL KLINIK
    const [namaKlinik, setNamaKlinik] = useState("SIGIGI Dental Clinic");
    const [emailKlinik, setEmailKlinik] = useState("admin@sigigi.com");
    const [telepon, setTelepon] = useState("081234567890");
    const [jamBuka, setJamBuka] = useState("08:00");
    const [jamTutup, setJamTutup] = useState("20:00");
    const [alamat, setAlamat] = useState("Jl. Soekarno Hatta No. 123, Pekanbaru, Riau");

    // 2. STATE: CMS WEBSITE PUBLIK (GUEST)
    const [heroTitle, setHeroTitle] = useState("Klinik Gigi Modern & Terpercaya Untuk Keluarga Anda");
    const [textPromo, setTextPromo] = useState("Diskon 20% khusus untuk scaling gigi pertama bagi pengguna baru website!");
    const [statusPengumuman, setStatusPengumuman] = useState("Buka Normal");

    // 3. STATE: PORTAL MEMBER & BENEFIT PASIEN
    const [poinSilver, setPoinSilver] = useState("500");
    const [poinGold, setPoinGold] = useState("1000");
    const [poinVIP, setPoinVIP] = useState("2000");
    const [diskonVIP, setDiskonVIP] = useState("15");
    const [diskonGold, setDiskonGold] = useState("10");

    // 4. STATE: NOTIFIKASI
    const [reminderJanji, setReminderJanji] = useState(true);
    const [notifWA, setNotifWA] = useState(true);
    const [notifEmail, setNotifEmail] = useState(false);

    // 5. STATE: KEAMANAN ADMIN
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        document.title = "Pengaturan Sistem — SIGIGI";
    }, []);

    const handleSaveChanges = (e) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1000);
    };

    return (
        <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen font-sans">
            
            {/* HEADER BANNER */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-6 text-white shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black tracking-tight">Pengaturan Sistem</h1>
                    <p className="text-blue-100 mt-1 text-xs font-medium opacity-90">
                        Pusat kendali konfigurasi operasional klinik, sinkronisasi konten website publik, dan regulasi poin aplikasi member.
                    </p>
                </div>
                {saveSuccess && (
                    <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md border border-emerald-400 animate-pulse">
                        <MdCheckCircle size={18} /> Perubahan Berhasil Disinkronkan!
                    </div>
                )}
            </div>

            {/* CORE LAYOUT */}
            <div className="grid lg:grid-cols-4 gap-6 items-start">
                
                {/* SIDEBAR TABS NAVIGASI */}
                <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 space-y-1">
                    <button
                        type="button"
                        onClick={() => setActiveTab("klinik")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                            activeTab === "klinik" ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-slate-50 hover:text-gray-900"
                        }`}
                    >
                        <MdBusiness size={18} /> Profil & Kontak Klinik
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("website")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                            activeTab === "website" ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-slate-50 hover:text-gray-900"
                        }`}
                    >
                        <MdWeb size={18} /> Konten Website Publik
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => setActiveTab("member")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                            activeTab === "member" ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-slate-50 hover:text-gray-900"
                        }`}
                    >
                        <MdCardMembership size={18} /> Aturan & Portal Member
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => setActiveTab("notifikasi")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                            activeTab === "notifikasi" ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-slate-50 hover:text-gray-900"
                        }`}
                    >
                        <MdNotificationsActive size={18} /> Otomasi Notifikasi CRM
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("keamanan")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                            activeTab === "keamanan" ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-slate-50 hover:text-gray-900"
                        }`}
                    >
                        <MdLock size={18} /> Kredensial & Keamanan
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("sistem")}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                            activeTab === "sistem" ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-slate-50 hover:text-gray-900"
                        }`}
                    >
                        <MdDns size={18} /> Status Core Engine System
                    </button>
                </div>

                {/* CONTENT AREA */}
                <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <form onSubmit={handleSaveChanges}>
                        
                        {/* TAB 1: PROFIL KLINIK */}
                        {activeTab === "klinik" && (
                            <div className="p-6 space-y-4">
                                <div className="border-b border-slate-100 pb-3">
                                    <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">Profil & Kontak Klinik</h2>
                                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">Informasi dasar operasional internal klinik gigi utama.</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 text-xs font-semibold">
                                    <div>
                                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Nama Resmi Klinik</label>
                                        <input type="text" value={namaKlinik} onChange={(e)=>setNamaKlinik(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 text-gray-800" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Email Korespondensi</label>
                                        <input type="email" value={emailKlinik} onChange={(e)=>setEmailKlinik(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 text-gray-800" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Nomor Telepon Hotline</label>
                                        <input type="text" value={telepon} onChange={(e)=>setTelepon(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 text-gray-800" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Jam Operasional Kerja</label>
                                        <div className="flex items-center gap-2">
                                            <input type="time" value={jamBuka} onChange={(e)=>setJamBuka(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 text-center" />
                                            <span className="text-gray-400 text-xs font-bold">s/d</span>
                                            <input type="time" value={jamTutup} onChange={(e)=>setJamTutup(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 text-center" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xs font-semibold">
                                    <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Alamat Fisik Lengkap</label>
                                    <textarea rows="2" value={alamat} onChange={(e)=>setAlamat(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 resize-none" />
                                </div>
                            </div>
                        )}

                        {/* TAB 2: CMS WEBSITE GUEST (BARU!) */}
                        {activeTab === "website" && (
                            <div className="p-6 space-y-4">
                                <div className="border-b border-slate-100 pb-3">
                                    <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">Konten Website Publik (CMS)</h2>
                                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">Kelola teks dan maklumat yang tampil langsung di landing page publik (halaman guest).</p>
                                </div>
                                <div className="text-xs font-semibold space-y-4">
                                    <div>
                                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Judul Utama Halaman Depan (Hero Title)</label>
                                        <input type="text" value={heroTitle} onChange={(e)=>setHeroTitle(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 text-gray-800" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Banner Pengumuman / Berita Promo</label>
                                        <textarea rows="2" value={textPromo} onChange={(e)=>setTextPromo(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 resize-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Status Banner Alert Operasional Klinik</label>
                                        <select value={statusPengumuman} onChange={(e)=>setStatusPengumuman(e.target.value)} className="p-2.5 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 outline-none">
                                            <option value="Buka Normal">🟢 Buka Normal & Menerima Janji Temu</option>
                                            <option value="Tutup Sementara">🔴 Tutup Sementara (Libur Raya/Pemberitahuan)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 3: PORTAL MEMBER RULES (DIOPTIMALKAN!) */}
                        {activeTab === "member" && (
                            <div className="p-6 space-y-5">
                                <div className="border-b border-slate-100 pb-3">
                                    <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">Aturan & Portal Member Pasien</h2>
                                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">Konfigurasi batas pencapaian poin akun pasien beserta keuntungan diskon per-level tier.</p>
                                </div>
                                <div className="grid md:grid-cols-3 gap-4 text-xs font-semibold">
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <span className="text-[10px] font-black text-slate-400 uppercase">Batas Poin Silver</span>
                                        <input type="number" value={poinSilver} onChange={(e)=>setPoinSilver(e.target.value)} className="w-full mt-2 p-2 rounded-xl bg-white border border-gray-200 text-center font-bold" />
                                    </div>
                                    <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100/40">
                                        <span className="text-[10px] font-black text-amber-600 uppercase">Batas Poin Gold</span>
                                        <input type="number" value={poinGold} onChange={(e)=>setPoinGold(e.target.value)} className="w-full mt-2 p-2 rounded-xl bg-white border border-gray-200 text-center font-bold" />
                                    </div>
                                    <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100/40">
                                        <span className="text-[10px] font-black text-blue-600 uppercase">Batas Poin VIP</span>
                                        <input type="number" value={poinVIP} onChange={(e)=>setPoinVIP(e.target.value)} className="w-full mt-2 p-2 rounded-xl bg-white border border-gray-200 text-center font-bold" />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 text-xs font-semibold pt-2">
                                    <div>
                                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Insentif Potongan Harga Tier Gold (%)</label>
                                        <input type="number" value={diskonGold} onChange={(e)=>setDiskonGold(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 font-bold text-gray-800" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Insentif Potongan Harga Tier VIP (%)</label>
                                        <input type="number" value={diskonVIP} onChange={(e)=>setDiskonVIP(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 font-bold text-gray-800" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 4: CRM AUTOMATION */}
                        {activeTab === "notifikasi" && (
                            <div className="p-6 space-y-4">
                                <div className="border-b border-slate-100 pb-3">
                                    <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">Otomasi Notifikasi CRM</h2>
                                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">Kelola pemicu pengiriman bot WhatsApp/Email otomatis.</p>
                                </div>
                                <div className="divide-y divide-gray-50 text-xs font-semibold">
                                    <div className="flex items-center justify-between py-3">
                                        <div>
                                            <h4 className="text-gray-800 font-bold">Reminder Janji Temu Otomatis</h4>
                                            <p className="text-[11px] text-gray-400 font-medium">Kirim broadcast pengingat H-1 ke WhatsApp pasien.</p>
                                        </div>
                                        <input type="checkbox" checked={reminderJanji} onChange={()=>setReminderJanji(!reminderJanji)} className="w-9 h-5 bg-gray-200 rounded-full appearance-none checked:bg-blue-600 relative before:content-[''] before:absolute before:h-4 before:w-4 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-4 before:transition-all cursor-pointer" />
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <div>
                                            <h4 className="text-gray-800 font-bold">Integrasi WhatsApp Gateway</h4>
                                            <p className="text-[11px] text-gray-400 font-medium">Gunakan engine pihak ketiga untuk pengiriman slip rekam medis.</p>
                                        </div>
                                        <input type="checkbox" checked={notifWA} onChange={()=>setNotifWA(!notifWA)} className="w-9 h-5 bg-gray-200 rounded-full appearance-none checked:bg-blue-600 relative before:content-[''] before:absolute before:h-4 before:w-4 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-4 before:transition-all cursor-pointer" />
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <div>
                                            <h4 className="text-gray-800 font-bold">Laporan Email Broadcast</h4>
                                            <p className="text-[11px] text-gray-400 font-medium">Kirim salinan digital otomatis pasca transaksi ke email pasien.</p>
                                        </div>
                                        <input type="checkbox" checked={notifEmail} onChange={()=>setNotifEmail(!notifEmail)} className="w-9 h-5 bg-gray-200 rounded-full appearance-none checked:bg-blue-600 relative before:content-[''] before:absolute before:h-4 before:w-4 before:bg-white before:rounded-full before:top-[2px] before:left-[2px] checked:before:translate-x-4 before:transition-all cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 5: KEAMANAN (BARU!) */}
                        {activeTab === "keamanan" && (
                            <div className="p-6 space-y-4">
                                <div className="border-b border-slate-100 pb-3">
                                    <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">Kredensial & Keamanan</h2>
                                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">Perbarui kunci kata sandi akun administrator utama lu di sini.</p>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4 text-xs font-semibold">
                                    <div>
                                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Kata Sandi Lama</label>
                                        <input type="password" placeholder="••••••••" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Kata Sandi Baru</label>
                                        <input type="password" placeholder="Minimal 8 karakter" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* TAB 6: READONLY SISTEM */}
                        {activeTab === "sistem" && (
                            <div className="p-6 space-y-4">
                                <div className="border-b border-slate-100 pb-3">
                                    <h2 className="text-sm font-black text-gray-800 uppercase tracking-wider">Status Core Engine System</h2>
                                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">Informasi diagnostik status arsitektur microservices SIGIGI.</p>
                                </div>
                                <div className="grid sm:grid-cols-3 gap-4 text-xs font-semibold">
                                    <div className="p-4 bg-blue-50/40 rounded-2xl border border-blue-100/30">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Versi Sistem</p>
                                        <p className="text-sm font-black text-blue-600 mt-1">CRM Dental v1.0.4-prod</p>
                                    </div>
                                    <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100/30">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Status Server Node</p>
                                        <p className="text-sm font-black text-emerald-600 mt-1 flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span> Online
                                        </p>
                                    </div>
                                    <div className="p-4 bg-purple-50/40 rounded-2xl border border-purple-100/30">
                                        <p className="text-[10px] text-gray-400 uppercase font-bold">Koneksi Database</p>
                                        <p className="text-sm font-black text-purple-600 mt-1">Connected (PostgreSQL)</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SAVE ACTION BAR BUTTON */}
                        {activeTab !== "sistem" && (
                            <div className="bg-slate-50/80 px-6 py-4 border-t border-slate-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                                >
                                    <MdSave size={16} /> {isSaving ? "Sinkronisasi..." : "Simpan Konfigurasi"}
                                </button>
                            </div>
                        )}

                    </form>
                </div>

            </div>
        </div>
    );
}