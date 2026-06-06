import {
    MdCalendarMonth,
    MdArrowForward,
    MdVerified,
    MdPeople,
    MdMedicalServices,
} from "react-icons/md";

export default function HeroSection() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900"
        >
            {/* Background Blur */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]" />

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto px-6 py-32 w-full">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT CONTENT */}
                    <div>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-cyan-300 mb-8">

                            <MdVerified />

                            Klinik Gigi Modern & Terpercaya

                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">

                            Senyum Sehat

                            <span className="block text-cyan-400">
                                Dimulai Dari Sini
                            </span>

                        </h1>

                        <p className="mt-8 text-lg text-slate-300 leading-relaxed max-w-xl">

                            SIGIGI Dental Clinic menghadirkan layanan
                            kesehatan gigi modern dengan teknologi terkini,
                            dokter berpengalaman, dan pelayanan terbaik
                            untuk menjaga kesehatan serta estetika senyum Anda.

                        </p>

                        {/* CTA BUTTON */}
                        <div className="flex flex-wrap gap-4 mt-10">

                            <button className="px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold flex items-center gap-2 shadow-2xl transition">

                                <MdCalendarMonth />

                                Buat Janji Temu

                            </button>

                            <button className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold flex items-center gap-2 hover:bg-white/20 transition">

                                Lihat Layanan

                                <MdArrowForward />

                            </button>

                        </div>

                        {/* FEATURE */}
                        <div className="grid grid-cols-2 gap-5 mt-12">

                            <div className="flex items-center gap-3">

                                <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">

                                    <MdPeople size={24} />

                                </div>

                                <div>

                                    <h4 className="font-bold text-white">
                                        10.000+
                                    </h4>

                                    <p className="text-slate-400 text-sm">
                                        Pasien Terdaftar
                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">

                                    <MdMedicalServices size={24} />

                                </div>

                                <div>

                                    <h4 className="font-bold text-white">
                                        15+
                                    </h4>

                                    <p className="text-slate-400 text-sm">
                                        Dokter Profesional
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="relative">

                        {/* FOTO DOKTER */}
                        <div className="relative z-10">

                            <img
                                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800"
                                alt="Dokter Gigi"
                                className="rounded-[40px] shadow-2xl object-cover h-[650px] w-full"
                            />

                        </div>

                        {/* FLOATING CARD 1 */}
                        <div className="absolute -left-10 top-20 bg-white rounded-3xl p-5 shadow-2xl z-20">

                            <h3 className="text-3xl font-bold text-blue-600">
                                98%
                            </h3>

                            <p className="text-gray-500">
                                Kepuasan Pasien
                            </p>

                        </div>

                        {/* FLOATING CARD 2 */}
                        <div className="absolute -right-5 bottom-20 bg-white rounded-3xl p-5 shadow-2xl z-20">

                            <h3 className="text-3xl font-bold text-green-600">
                                24 Jam
                            </h3>

                            <p className="text-gray-500">
                                Booking Online
                            </p>

                        </div>

                        {/* FLOATING CARD 3 */}
                        <div className="absolute left-20 bottom-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-3xl p-6 shadow-2xl z-20">

                            <h3 className="text-2xl font-bold">
                                Membership
                            </h3>

                            <p className="text-cyan-100">
                                Silver • Gold • VIP
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}