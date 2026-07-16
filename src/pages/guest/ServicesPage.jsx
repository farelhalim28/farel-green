import {
    MdSchedule,
    MdVerified,
    MdArrowForward,
    MdStar,
} from "react-icons/md";

const services = [
    {
        id: 1,
        nama: "Scaling Gigi",
        harga: "Rp 250.000",
        durasi: "30 Menit",
        kategori: "Periodonsia",
        rating: "4.9",
        ulasan: "120+",
        image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=600",
        deskripsi: "Membersihkan karang gigi secara menyeluruh dan menjaga kekuatan gusi.",
    },
    {
        id: 2,
        nama: "Tambal Gigi",
        harga: "Rp 350.000",
        durasi: "45 Menit",
        kategori: "Konservasi Gigi",
        rating: "4.8",
        ulasan: "95+",
        image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600",
        deskripsi: "Mengatasi komponen gigi berlubang dengan material komposit estetis berkualitas tinggi.",
    },
    {
        id: 3,
        nama: "Cabut Gigi",
        harga: "Rp 500.000",
        durasi: "45 Menit",
        kategori: "Bedah Mulut",
        rating: "4.8",
        ulasan: "80+",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
        deskripsi: "Tindakan pencabutan gigi dengan prosedur aman, steril, dan minim rasa sakit.",
    },
    {
        id: 4,
        nama: "Bleaching",
        harga: "Rp 1.500.000",
        durasi: "60 Menit",
        kategori: "Estetika Gigi",
        rating: "5.0",
        ulasan: "150+",
        image: "https://images.unsplash.com/photo-1522844990619-4951c40f7ded?auto=format&fit=crop&q=80&w=600",
        deskripsi: "Mencerahkan warna gigi hingga beberapa tingkat untuk senyum berkilau alami.",
    },
    {
        id: 5,
        nama: "Behel Ortodonti",
        harga: "Rp 4.500.000",
        durasi: "90 Menit",
        kategori: "Ortodontia",
        rating: "4.9",
        ulasan: "210+",
        image: "https://images.unsplash.com/photo-1599839619420-91152a5531b2?auto=format&fit=crop&q=80&w=600",
        deskripsi: "Perawatan ortodonti terstruktur untuk merapikan susunan dan oklusi gigi.",
    },
    {
        id: 6,
        nama: "Veneer Premium",
        harga: "Rp 2.000.000",
        durasi: "90 Menit",
        kategori: "Estetika Gigi",
        rating: "4.9",
        ulasan: "85+",
        image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600",
        deskripsi: "Meningkatkan kontur dan estetika gigi depan dengan lapisan porselen premium.",
    },
    {
        id: 7,
        nama: "Implan Gigi",
        harga: "Rp 8.000.000",
        durasi: "120 Menit",
        kategori: "Implantologi",
        rating: "5.0",
        ulasan: "40+",
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=600",
        deskripsi: "Penggantian akar dan mahkota gigi permanen dengan teknologi implan modern titanium.",
    },
    {
        id: 8,
        nama: "Gigi Palsu",
        harga: "Rp 2.500.000",
        durasi: "90 Menit",
        kategori: "Prostodontia",
        rating: "4.7",
        ulasan: "65+",
        image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=600",
        deskripsi: "Solusi fungsional penggantian gigi yang hilang agar fungsi kunyah kembali normal.",
    },
];

export default function ServicesPage() {
    return (
        <div className="bg-slate-50 min-h-screen">

            {/* HERO */}
            <section className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0))]" />
                <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
                    <div className="text-center">
                        <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                            Layanan Publik Resmi
                        </span>
                        <h1 className="text-5xl font-extrabold mt-4 tracking-tight">
                            Layanan Eksklusif Klinik Gigi
                        </h1>
                        <p className="mt-5 text-xl text-blue-50 max-w-3xl mx-auto font-light">
                            Nikmati perawatan gigi modern berstandar internasional terintegrasi dengan kenyamanan fasilitas terbaik kami.
                        </p>
                    </div>
                </div>
            </section>

            {/* INTRO */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <span className="bg-blue-50 text-blue-600 border border-blue-200 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                        Professional Dental Care
                    </span>
                    <h2 className="text-4xl font-bold mt-5 text-slate-800 tracking-tight">
                        Solusi Lengkap Untuk Senyum Sehat Anda
                    </h2>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-base">
                        Pilih perawatan yang sesuai dengan kebutuhan Anda. Semua tindakan ditangani langsung oleh dokter gigi spesialis tepercaya.
                    </p>
                </div>

                {/* SERVICES GRID */}
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {services.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                        >
                            {/* Gambar & Badge Container */}
                            <div className="relative overflow-hidden aspect-[4/3]">
                                <img 
                                    src={item.image} 
                                    alt={item.nama} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        // Perbaikan: handler fungsi callback yang benar agar tidak memicu uncaught typeerror
                                        e.target.onerror = null; 
                                        e.target.src = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                                
                                {/* Badge Kategori di Pojok Kiri Atas */}
                                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-blue-700 text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm z-10">
                                    {item.kategori}
                                </span>

                                {/* Rating di Pojok Kanan Bawah Gambar */}
                                <div className="absolute bottom-4 right-4 bg-slate-950/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl flex items-center gap-1 shadow-md border border-white/10 z-10">
                                    <MdStar className="text-amber-400" size={14} />
                                    <span className="font-bold">{item.rating}</span>
                                    <span className="text-slate-300 text-[10px] ml-0.5">({item.ulasan})</span>
                                </div>
                            </div>

                            {/* Konten Teks */}
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                        {item.nama}
                                    </h3>
                                    <p className="text-slate-500 mt-2 text-sm leading-relaxed min-h-[40px] line-clamp-2">
                                        {item.deskripsi}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-50 space-y-2.5">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-400">Investasi Tarif</span>
                                        <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-base">
                                            <MdVerified size={16} />
                                            <span>{item.harga}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-400">Estimasi Waktu</span>
                                        <div className="flex items-center gap-1.5 text-blue-600 font-medium">
                                            <MdSchedule size={16} />
                                            <span>{item.durasi}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tombol Booking */}
                                <button
                                    className="
                                        mt-6
                                        w-full
                                        bg-gradient-to-r
                                        from-blue-600
                                        to-cyan-500
                                        text-white
                                        py-3.5
                                        rounded-2xl
                                        font-bold
                                        text-sm
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        shadow-md
                                        shadow-blue-200
                                        group-hover:from-blue-700
                                        group-hover:to-cyan-600
                                        transition-all
                                        duration-300
                                    "
                                >
                                    Booking Sekarang
                                    <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* WHY CHOOSE US */}
            <section className="bg-white py-24 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-800 tracking-tight">
                            Kenapa Memilih SIGIGI?
                        </h2>
                        <p className="text-slate-500 mt-4 text-base">
                            Klinik gigi modern terintegrasi dengan kualitas pelayanan medis premium.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100/50 hover:bg-blue-50/50 transition duration-300">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">01</div>
                            <h3 className="font-bold text-xl text-slate-800">Dokter Spesialis Profesional</h3>
                            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                                Ditangani langsung oleh tim dokter gigi berpengalaman yang bersertifikasi resmi dan ahli di bidangnya.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100/50 hover:bg-emerald-50/50 transition duration-300">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">02</div>
                            <h3 className="font-bold text-xl text-slate-800">Teknologi Kedokteran Modern</h3>
                            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                                Menggunakan fasilitas peralatan medis canggih terkini untuk memastikan hasil diagnosis yang akurat dan nyaman.
                            </p>
                        </div>

                        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100/50 hover:bg-purple-50/50 transition duration-300">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center font-bold text-xl mb-6">03</div>
                            <h3 className="font-bold text-xl text-slate-800">Pelayanan & Member Premium</h3>
                            <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                                Kemudahan sistem booking reservasi real-time yang didukung skema akumulasi poin loyalitas pasien.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-slate-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-xl">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.15),transparent_45%)]" />
                        <h2 className="text-4xl font-bold tracking-tight relative z-10">
                            Siap Memiliki Senyum Sehat & Percaya Diri?
                        </h2>
                        <p className="mt-4 text-slate-300 max-w-2xl mx-auto font-light relative z-10">
                            Jadwalkan janji temu konsultasi Anda sekarang bersama dokter terbaik kami tanpa perlu mengantre lama.
                        </p>
                        <button
                            className="
                                mt-8
                                bg-white
                                text-blue-700
                                px-10
                                py-4
                                rounded-2xl
                                font-bold
                                shadow-lg
                                shadow-black/10
                                hover:bg-blue-50
                                hover:scale-105
                                transition-all
                                relative
                                z-10
                            "
                        >
                            Buat Janji Temu Sekarang
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}