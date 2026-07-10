// ================================================
// LETAK FILE: src/pages/guest/FAQPage.jsx
// ================================================

import { useState } from "react";
import {
    MdKeyboardArrowDown,
    MdHelpOutline,
    MdChat,
    MdSearch,
    MdMedicalServices,
    MdAccountBalanceWallet,
    MdCalendarMonth,
    MdStars
} from "react-icons/md";

export default function FAQPage() {
    const [active, setActive] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    const categories = [
        { name: "Semua", icon: <MdHelpOutline /> },
        { name: "Tindakan Medis", icon: <MdMedicalServices /> },
        { name: "Biaya & Bayar", icon: <MdAccountBalanceWallet /> },
        { name: "Sistem Booking", icon: <MdCalendarMonth /> },
        { name: "Membership", icon: <MdStars /> },
    ];

    const faqs = [
        {
            category: "Biaya & Bayar",
            question: "Berapa biaya scaling gigi di SIGIGI?",
            answer: "Biaya pembersihan karang gigi (scaling) reguler dimulai dari Rp250.000 hingga Rp450.000. Variasi biaya ini bergantung penuh pada akumulasi ketebalan serta tingkat pengerasan karang gigi pasien (kategori ringan, sedang, berat) yang akan dicek langsung menggunakan kamera intraoral saat sesi konsultasi awal.",
        },
        {
            category: "Sistem Booking",
            question: "Apakah bisa melakukan booking online dan langsung datang?",
            answer: "Sangat bisa! Pasien disarankan melakukan booking online maksimal H-1 melalui sistem reservasi web SIGIGI. Setelah mengisi data diri dan memilih dokter spesialis, sistem CRM kami akan mengirimkan kode booking otomatis via WhatsApp. Anda tinggal datang 15 menit sebelum jadwal tanpa perlu antre di loket administrasi lagi.",
        },
        {
            category: "Biaya & Bayar",
            question: "Apakah SIGIGI menerima pasien pengguna BPJS Kesehatan?",
            answer: "Saat ini klinik pusat SIGIGI menerima layanan klaim BPJS Kesehatan khusus untuk tindakan medis dasar, seperti pencabutan gigi sulung, penambalan gigi komposit non-estetis, dan pembersihan karang gigi setahun sekali. Pastikan Anda membawa rujukan faskes tingkat 1 dan kartu BPJS aktif saat melakukan registrasi.",
        },
        {
            category: "Tindakan Medis",
            question: "Berapa lama proses bleaching gigi dan apakah ngilu?",
            answer: "Proses pencerahan gigi (In-Office Bleaching) memakan waktu sekitar 60 hingga 90 menit menggunakan teknologi aktivasi sinar Cold Light LED premium. Kami mengaplikasikan gel pelindung gusi (gingival dam) khusus sebelum tindakan untuk meminimalisir rasa ngilu, sehingga prosedur ini 95% bebas rasa sakit bagi gigi sensitif.",
        },
        {
            category: "Biaya & Bayar",
            question: "Apakah tersedia program pilihan pembayaran cicilan?",
            answer: "Tentu saja. Untuk mendukung perawatan komprehensif seperti pemasangan behel (orthodontic) atau implan gigi, kami menyediakan fasilitas cicilan 0% hingga 12 bulan menggunakan kartu kredit (Visa/Mastercard) rekanan bank, serta opsi cicilan tanpa kartu kredit melalui platform PayLater terverifikasi OJK.",
        },
        {
            category: "Membership",
            question: "Bagaimana sistem reward membership SIGIGI bekerja?",
            answer: "Setiap transaksi kelipatan Rp50.000, Anda otomatis mendapatkan 10 poin loyalitas. Poin ini terakumulasi di dalam sistem rekam medis digital Anda dan dapat langsung ditukarkan menjadi potongan harga treatment kosmetik, merchandise eksklusif klinik, atau voucher potongan scaling gratis pada kunjungan berikutnya.",
        },
        {
            category: "Tindakan Medis",
            question: "Kapan waktu yang ideal untuk melakukan kontrol gigi?",
            answer: "Berdasarkan standar internasional kesehatan gigi, Anda sangat diwajibkan melakukan kontrol rutin dan pembersihan karang gigi setiap 6 bulan sekali. Namun bagi pengguna kawat gigi aktif (behel), kontrol wajib dilakukan setiap 3 hingga 4 minggu sekali guna penyesuaian kawat orthodontik.",
        },
        {
            category: "Sistem Booking",
            question: "Bagaimana jika saya ingin mengubah jadwal (reschedule) kunjungan?",
            answer: "Perubahan jadwal atau pembatalan janji temu medis dapat dilakukan paling lambat 4 jam sebelum jadwal dokter dimulai. Anda bisa melakukan klik tombol 'Reschedule' langsung pada dashboard user website atau menghubungi WhatsApp Call Center operasional klinik kami.",
        }
    ];

    // Filter Logic: Filter berdasarkan Kategori DAN Kolom Pencarian sekaligus
    const filteredFaqs = faqs.filter((faq) => {
        const matchesCategory = selectedCategory === "Semua" || faq.category === selectedCategory;
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">

            {/* SECTION 1: HERO DENGAN INPUT SEARCH */}
            <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_50%)]" />
                <div className="max-w-7xl mx-auto px-6 py-28 text-center relative z-10">
                    <span className="bg-blue-800/50 text-cyan-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5 mb-4">
                        💡 SIGIGI Support Center
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        Ada yang Bisa Kami Bantu?
                    </h1>
                    <p className="mt-3 text-blue-100 max-w-xl mx-auto text-sm md:text-base opacity-90">
                        Cari jawaban instan seputar estimasi biaya, alur tindakan medis spesialis dokter gigi, hingga metode reservasi otomatis klinik kami.
                    </p>

                    {/* Search Bar Real-time */}
                    <div className="mt-10 max-w-2xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-5 flex items-center text-slate-400 group-focus-within:text-blue-600 transition-colors">
                            <MdSearch size={26} />
                        </div>
                        <input
                            type="text"
                            placeholder="Ketik pertanyaan Anda di sini... (misal: scaling, cicilan, behel)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white text-slate-900 pl-14 pr-6 py-4.5 rounded-2xl shadow-xl border-none outline-none focus:ring-4 focus:ring-cyan-400/40 transition-all text-sm md:text-base placeholder:text-slate-400"
                        />
                    </div>
                </div>
            </section>

            {/* SECTION 2: INTERACTIVE CATEGORY TABS */}
            <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
                <div className="bg-white rounded-2xl p-3 shadow-md border border-slate-100 flex flex-wrap justify-center gap-2 md:gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => {
                                setSelectedCategory(cat.name);
                                setActive(null); // Reset accordion saat ganti tab
                            }}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 ${
                                selectedCategory === cat.name
                                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                        >
                            <span className="text-base md:text-lg">{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </section>

            {/* SECTION 3: EXPANDABLE ACCORDION CONTAINER */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                
                {/* State Jika Hasil Cari Kosong */}
                {filteredFaqs.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
                        <div className="text-5xl mb-3">🔍</div>
                        <h3 className="text-lg font-bold text-slate-800">Pertanyaan Tidak Ditemukan</h3>
                        <p className="text-slate-400 text-sm mt-1 max-w-md mx-auto">
                            Kata kunci <span className="text-blue-600 font-semibold">"{searchQuery}"</span> tidak cocok dengan rekaman sistem FAQ kami. Silakan hubungi tombol WhatsApp di bawah.
                        </p>
                    </div>
                )}

                {/* Looping List FAQ dengan Transisi Mulus */}
                <div className="space-y-4">
                    {filteredFaqs.map((faq, index) => {
                        const isOpen = active === index;
                        return (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                                    isOpen 
                                        ? "border-blue-500 shadow-md ring-1 ring-blue-500/10" 
                                        : "border-slate-100 shadow-sm hover:border-slate-300"
                                }`}
                            >
                                <button
                                    onClick={() => setActive(isOpen ? null : index)}
                                    className="w-full flex items-center justify-between p-5 md:p-6 text-left transition-colors hover:bg-slate-50/50"
                                >
                                    <div className="flex flex-col gap-1.5 pr-4">
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-md w-fit">
                                            {faq.category}
                                        </span>
                                        <span className="font-bold text-sm md:text-base text-slate-900 leading-snug">
                                            {faq.question}
                                        </span>
                                    </div>
                                    <div className={`p-1.5 rounded-lg bg-slate-100 text-slate-500 transition-transform duration-300 ${
                                        isOpen ? "rotate-180 bg-blue-50 text-blue-600" : ""
                                    }`}>
                                        <MdKeyboardArrowDown size={22} />
                                    </div>
                                </button>

                                {/* Smooth Content Accordion menggunakan CSS Max-Height */}
                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                        isOpen ? "max-h-[300px] border-t border-slate-50" : "max-h-0"
                                    }`}
                                >
                                    <div className="p-6 text-xs md:text-sm text-slate-500 leading-relaxed bg-slate-50/60">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* SECTION 4: CALL TO ACTION (CTA) LIVE CHAT */}
            <section className="bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none" />
                <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="text-center md:text-left">
                        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                            Bantuan Langsung
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight">
                            Masih Punya Pertanyaan Medis Lain?
                        </h2>
                        <p className="mt-2 text-slate-400 text-xs md:text-sm max-w-xl">
                            Jangan ragu! Konsultan layanan medis dan customer service SIGIGI siap menjawab pertanyaan spesifik Anda secara interaktif 24/7.
                        </p>
                    </div>

                    <button
                        onClick={() => window.open("https://wa.me/6281234567890", "_blank")}
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-600/30 hover:opacity-95 transition-all flex items-center gap-2.5 whitespace-nowrap group text-sm md:text-base cursor-pointer"
                    >
                        <MdChat className="text-xl group-hover:scale-110 transition-transform" /> 
                        Hubungi Kami Via WhatsApp
                    </button>
                </div>
            </section>

        </div>
    );
}