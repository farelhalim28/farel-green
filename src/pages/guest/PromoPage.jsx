// ================================================
// LETAK FILE: src/pages/guest/PromoPage.jsx
// ================================================

import { useState } from "react";
import {
    MdCampaign,
    MdLocalOffer,
    MdAccessTime,
    MdCardGiftcard,
    MdCelebration,
    MdVerifiedUser,
    MdStar,
    MdArrowForward,
    MdChevronRight,
    MdExpandMore,
} from "react-icons/md";

export default function PromoPage() {
    // State untuk Kategori Filter Promo
    const [activeTab, setActiveTab] = useState("Semua");
    
    // State untuk Accordion FAQ
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const categories = ["Semua", "Birthday", "Loyalty", "Member Baru", "Bundling"];

    const promos = [
        {
            id: 1,
            title: "Paket Bleaching Gigi Premium",
            discount: "20%",
            tag: "HOT",
            category: "Bundling",
            description: "Dapatkan senyum putih cerah alami dengan teknologi cold light bleaching bebas ngilu + gratis konsultasi.",
            voucherCode: "SMILE20",
            image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&auto=format&fit=crop&q=80",
            color: "from-blue-600 to-cyan-500",
            duration: "4 hari 12 jam",
        },
        {
            id: 2,
            title: "Scaling + Dental Check Up",
            discount: "25%",
            tag: "NEW",
            category: "Member Baru",
            description: "Pembersihan karang gigi menyeluruh beserta dokumentasi intraoral intra-kamera. Mulai dari Rp199.000.",
            voucherCode: "SCALING25",
            image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80",
            color: "from-green-500 to-emerald-600",
            duration: "11 hari 21 jam",
        },
        {
            id: 3,
            title: "Voucher Ultah Spesial Pasien",
            discount: "20%",
            tag: "BIRTHDAY",
            category: "Birthday",
            description: "Kado spesial dari SIGIGI untuk Anda! Diskon 20% berlaku untuk seluruh treatment kosmetik medis di bulan lahir.",
            voucherCode: "GIGIBDAY",
            image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80",
            color: "from-pink-500 to-rose-500",
            duration: "Otomatis di Bulan Lahir",
        },
        {
            id: 4,
            title: "Reward Pasien Loyal (Free Treatment)",
            discount: "100%",
            tag: "HOT",
            category: "Loyalty",
            description: "Kumpulkan poin dari 9 kali kunjungan rutin, dapatkan gratis 1 kali treatment pembersihan atau penambalan.",
            voucherCode: "LOYALPASIEN",
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80",
            color: "from-purple-600 to-indigo-600",
            duration: "Loyalty Member Only",
        },
        {
            id: 5,
            title: "Voucher Welcome Member Baru",
            discount: "15%",
            tag: "WELCOME",
            category: "Member Baru",
            description: "Potongan langsung tanpa minimum transaksi khusus buat kamu yang baru pertama kali mendaftar di apps SIGIGI.",
            voucherCode: "SIGIGINEW",
            image: "https://images.unsplash.com/photo-1461532257346-82014928df77?w=800&auto=format&fit=crop&q=80",
            color: "from-amber-500 to-orange-600",
            duration: "29 hari 18 jam",
        },
        {
            id: 6,
            title: "Bundling Pasang Behel + Scaling",
            discount: "40%",
            tag: "BUNDLING",
            category: "Bundling",
            description: "Paket pemasangan orthodontik (behel) Safir/Metal, gratis pembersihan karang gigi awal dan rontgen panoramic.",
            voucherCode: "BEHELBUNDLE",
            image: "https://images.unsplash.com/photo-1513424495046-6f370e2d19f1?w=800&auto=format&fit=crop&q=80",
            color: "from-cyan-600 to-blue-700",
            duration: "19 hari 2 hours",
        },
    ];

    const filteredPromos = activeTab === "Semua" 
        ? promos 
        : promos.filter(p => p.category === activeTab);

    const faqs = [
        {
            q: "Bagaimana cara klaim kode voucher perawatan?",
            a: "Sangat mudah! Anda cukup menyalin kode voucher yang tertera di halaman ini, klik tombol 'Klaim Promo', kemudian masukkan kode tersebut pada saat melakukan pengisian form online booking medis."
        },
        {
            q: "Apakah promo diskon klinik bisa digabungkan?",
            a: "Mohon maaf, demi standarisasi sistem operasional medis, setiap transaksi kunjungan klinik hanya diperbolehkan menggunakan satu kode voucher atau satu program promo aktif saja."
        },
        {
            q: "Berapa lama masa kedaluwarsa voucher yang sudah diklaim?",
            a: "Untuk voucher promo bulanan, masa aktif tertera pada sistem hitung mundur di setiap kartu promo. Sedangkan voucher personal seperti reward poin berlaku selama 6 bulan kalender."
        },
        {
            q: "Bagaimana sistem pendeteksian voucher ulang tahun?",
            a: "Sistem CRM pintar SIGIGI mendeteksi tanggal lahir Anda yang telah tervalidasi via KTP saat mendaftar member. E-voucher diskon otomatis meluncur ke WhatsApp & Email Anda tepat di hari pertama bulan kelahiran."
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen text-slate-800">

            {/* SECTION 1: HERO METEOR BRANDING */}
            <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_40%)]" />
                <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-3xl">
                        <span className="bg-blue-800/60 text-cyan-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-4">
                            <MdCampaign className="text-sm animate-bounce" /> Promo Terbatas Bulan Ini
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                            Diskon Hingga <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-200">30%</span> Untuk Senyum Sehatmu
                        </h1>
                        <p className="mt-4 text-blue-100 text-lg leading-relaxed max-w-2xl">
                            Nikmati berbagai penawaran harga spesial untuk servis scaling rutin, pemutihan gigi instan, voucher member loyalitas, hingga kado ulang tahun eksklusif bagi keluarga SIGIGI.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <a href="#daftar-member" className="bg-white text-blue-700 font-bold px-7 py-3.5 rounded-xl shadow-lg hover:bg-slate-100 transition duration-200">
                                Gabung Membership
                            </a>
                            <a href="#semua-promo" className="bg-blue-600/50 text-white border border-blue-400/30 font-bold px-7 py-3.5 rounded-xl hover:bg-blue-600/80 transition duration-200">
                                Lihat Semua Promo
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: LIVE STATS LIVE COUNTER */}
            <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center border-r border-slate-100 last:border-0">
                        <div className="text-3xl md:text-4xl font-extrabold text-blue-600">20+</div>
                        <p className="text-gray-400 font-medium text-xs md:text-sm mt-1">Promo Aktif Hari Ini</p>
                    </div>
                    <div className="text-center md:border-r border-slate-100 last:border-0">
                        <div className="text-3xl md:text-4xl font-extrabold text-teal-500">4.500+</div>
                        <p className="text-gray-400 font-medium text-xs md:text-sm mt-1">Voucher Terklaim</p>
                    </div>
                    <div className="text-center border-r border-slate-100 last:border-0">
                        <div className="text-3xl md:text-4xl font-extrabold text-purple-600">8.000+</div>
                        <p className="text-gray-400 font-medium text-xs md:text-sm mt-1">Member Pasien Aktif</p>
                    </div>
                    <div className="text-center last:border-0">
                        <div className="text-3xl md:text-4xl font-extrabold text-amber-500">99%</div>
                        <p className="text-gray-400 font-medium text-xs md:text-sm mt-1">Tingkat Kepuasan</p>
                    </div>
                </div>
            </section>

            {/* SECTION 3: KARTU PROMO DENGAN FILTER TAB INTERAKTIF */}
            <section id="semua-promo" className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <span className="text-blue-600 font-bold uppercase tracking-widest text-sm flex items-center gap-1">
                            <MdStar className="text-amber-500" /> Katalog Penawaran
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-1">Temukan Diskon Perawatanmu</h2>
                    </div>
                    
                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2 bg-slate-200/60 p-1.5 rounded-2xl overflow-x-auto">
                        {categories.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-200 ${
                                    activeTab === tab 
                                        ? "bg-blue-600 text-white shadow-sm" 
                                        : "text-slate-600 hover:text-slate-900"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Grid Promo Card */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPromos.map((promo) => (
                        <div 
                            key={promo.id} 
                            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between border border-slate-100"
                        >
                            <div className="relative">
                                {/* Badge Diskon Pojok Atas Kiri */}
                                <div className={`absolute top-4 left-4 bg-gradient-to-r ${promo.color} text-white px-4 py-2 rounded-2xl font-black text-lg shadow-lg z-10`}>
                                    {promo.discount}
                                </div>
                                {/* Badge Status Atas Kanan */}
                                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider z-10">
                                    🔥 {promo.tag}
                                </div>
                                <div className="h-52 overflow-hidden relative">
                                    <img 
                                        src={promo.image} 
                                        alt={promo.title}
                                        className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 bg-amber-50 w-fit px-2.5 py-1 rounded-md mb-3">
                                        <MdAccessTime /> {promo.duration}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{promo.title}</h3>
                                    <p className="text-gray-500 mt-2 text-sm line-clamp-2 leading-relaxed">{promo.description}</p>
                                </div>
                            </div>

                            {/* Bagian Bawah Kartu Voucher */}
                            <div className="px-6 pb-6 pt-2 bg-slate-50/50 border-t border-slate-100/60">
                                <div className="flex items-center justify-between mb-4 bg-white p-2.5 rounded-xl border border-dashed border-slate-300">
                                    <span className="text-xs text-gray-400 font-medium pl-1">Kode Voucher:</span>
                                    <span className="font-mono font-bold text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-md tracking-wider">{promo.voucherCode}</span>
                                </div>
                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-200 flex items-center justify-center gap-1.5 text-sm shadow-sm">
                                    Klaim Voucher Promo <MdArrowForward />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 4: STEP CARA MENDAPATKAN VOUCHER */}
            <section className="bg-white py-20 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <span className="text-xs font-bold text-blue-600 tracking-widest uppercase">Alur Penggunaan</span>
                    <h2 className="text-3xl font-bold text-slate-900 mt-1 mb-16">Cara Mudah Menggunakan Promo</h2>
                    
                    <div className="grid md:grid-cols-4 gap-8 relative">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner mb-4">1</div>
                            <h4 className="font-bold text-slate-900 text-base">Registrasi Member</h4>
                            <p className="text-gray-500 text-xs mt-2 max-w-xs">Daftar akun gratis Anda secara instan lewat website SIGIGI.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner mb-4">2</div>
                            <h4 className="font-bold text-slate-900 text-base">Salin Kode Unik</h4>
                            <p className="text-gray-500 text-xs mt-2 max-w-xs">Pilih kode promosi perawatan medis gigi yang Anda butuhkan di atas.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner mb-4">3</div>
                            <h4 className="font-bold text-slate-900 text-base">Lakukan Booking</h4>
                            <p className="text-gray-500 text-xs mt-2 max-w-xs">Isi form jadwal kedatangan dokter lalu tempel kode kupon Anda.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner mb-4">4</div>
                            <h4 className="font-bold text-slate-900 text-base">Potongan Otomatis</h4>
                            <p className="text-gray-500 text-xs mt-2 max-w-xs">Sistem kasir kas klinik langsung mendiskon biaya nota transaksi Anda.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: CRM AUTOMATION & BENEFITS GABUNGAN */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="bg-slate-900 rounded-3xl p-8 md:p-14 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
                    <div className="absolute -left-24 -top-24 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />

                    <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider block mb-2">✦ Smart CRM Automation System</span>
                            <h3 className="text-3xl md:text-4xl font-bold leading-tight">Sistem Privilege Loyalty Pasien SIGIGI</h3>
                            <p className="text-slate-400 mt-4 text-sm md:text-base leading-relaxed">
                                Tidak perlu repot mencari manual, kecerdasan buatan dari database rekam medis kami akan mendistribusikan reward khusus langsung berdasarkan histori kesehatan gigi Anda.
                            </p>
                            
                            <div className="grid sm:grid-cols-2 gap-4 mt-8">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="text-cyan-400 font-bold text-sm flex items-center gap-1.5"><MdCelebration /> Birthday Autocheck</div>
                                    <p className="text-xs text-slate-400 mt-1.5">Kado diskon 20% otomatis masuk via WA tepat di hari ulang tahun.</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5"><MdAccessTime /> Reminder Scaling</div>
                                    <p className="text-xs text-slate-400 mt-1.5">Insentif promo pembersihan otomatis setiap 6 bulan sekali.</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="text-purple-400 font-bold text-sm flex items-center gap-1.5"><MdCardGiftcard /> Tukar Poin Reward</div>
                                    <p className="text-xs text-slate-400 mt-1.5">Poin akumulasi transaksi bebas ditukar treatment estetika premium.</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <div className="text-amber-400 font-bold text-sm flex items-center gap-1.5"><MdVerifiedUser /> Prioritas Booking</div>
                                    <p className="text-xs text-slate-400 mt-1.5">Bebas antre lama di ruang tunggu klinik, alur penjadwalan VIP.</p>
                                </div>
                            </div>
                        </div>

                        {/* Banner Samping Eksklusif Ulang Tahun */}
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 relative">
                            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black px-4 py-1 text-xs uppercase rounded-bl-xl rounded-tr-xl">Eksklusif</div>
                            <div className="text-4xl mb-4">🎂</div>
                            <h4 className="text-xl font-bold">Voucher Perayaan Ulang Tahun</h4>
                            <p className="text-slate-400 text-sm mt-2">Dapatkan diskon potongan 20% tanpa batas minimum transaksi, dikirim instan lewat integrasi WhatsApp bot klinik resmi kami.</p>
                            
                            <ul className="space-y-2.5 mt-6 text-xs text-slate-300">
                                <li className="flex items-center gap-2"><MdChevronRight className="text-cyan-400" /> Kupon Diskon Otomatis Terbit</li>
                                <li className="flex items-center gap-2"><MdChevronRight className="text-cyan-400" /> Masa Berlaku Kupon Panjang 30 Hari</li>
                                <li className="flex items-center gap-2"><MdChevronRight className="text-cyan-400" /> Berlaku Untuk Seluruh Dokter Gigi</li>
                            </ul>
                            
                            <a href="#daftar-member" className="mt-8 w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold py-3 rounded-xl transition duration-200 text-center block text-sm">
                                Amankan Keanggotaan Sekarang
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6: FAQ ACCORDION INTERAKTIF */}
            <section className="max-w-4xl mx-auto px-6 py-12 pb-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900">Pertanyaan Seputar Promo</h2>
                    <p className="text-gray-500 mt-2 text-sm">Semua informasi detail regulasi penggunaan kupon potongan harga klinik gigi SIGIGI</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-200"
                        >
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-800 hover:bg-slate-50/80 transition text-sm md:text-base gap-4"
                            >
                                <span>{faq.q}</span>
                                <MdExpandMore 
                                    className={`text-xl text-gray-400 transition-transform duration-300 ${openFaq === index ? "rotate-180 text-blue-600" : ""}`} 
                                />
                            </button>
                            
                            <div 
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                    openFaq === index ? "max-h-40 border-t border-slate-50" : "max-h-0"
                                }`}
                            >
                                <p className="p-6 text-gray-500 text-xs md:text-sm leading-relaxed bg-slate-50/40">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 7: PENUTUP BIG CALLED OUT */}
            <section id="daftar-member" className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white text-center py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-4xl md:text-5xl mb-6">🎁</div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Belum Menjadi Member Keluarga SIGIGI?</h2>
                    <p className="mt-4 text-blue-100 text-sm md:text-base max-w-xl mx-auto opacity-90">
                        Daftarkan diri Anda sekarang dan langsung nikmati promo eksklusif member baru, akses poin loyalitas, serta alur prioritas booking medis tanpa mengantre.
                    </p>
                    <button className="mt-8 bg-white text-blue-700 font-extrabold px-10 py-4 rounded-xl shadow-xl hover:scale-105 transition duration-300 text-sm">
                        Gabung Membership Gratis
                    </button>
                </div>
            </section>

        </div>
    );
}