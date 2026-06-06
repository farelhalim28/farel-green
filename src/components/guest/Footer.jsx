import {
    MdLocalHospital,
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdFacebook,
} from "react-icons/md";

import {
    FaInstagram,
    FaWhatsapp,
    FaTiktok,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-white">

            <div className="max-w-7xl mx-auto px-6 py-16">

                <div className="grid lg:grid-cols-4 gap-10">

                    {/* LOGO */}
                    <div>

                        <div className="flex items-center gap-3">

                            <div className="bg-blue-600 p-3 rounded-xl">
                                <MdLocalHospital size={28} />
                            </div>

                            <div>

                                <h2 className="text-2xl font-bold">
                                    SIGIGI
                                </h2>

                                <p className="text-slate-400 text-sm">
                                    Dental Clinic CRM
                                </p>

                            </div>

                        </div>

                        <p className="mt-5 text-slate-400 leading-relaxed">
                            Klinik gigi modern dengan teknologi terkini,
                            pelayanan profesional, serta sistem CRM
                            dan Membership yang terintegrasi.
                        </p>

                    </div>

                    {/* QUICK LINKS */}
                    <div>

                        <h3 className="font-bold text-lg mb-5">
                            Navigasi
                        </h3>

                        <div className="space-y-3 text-slate-400">

                            <a href="#home" className="block hover:text-white transition">
                                Home
                            </a>

                            <a href="#about" className="block hover:text-white transition">
                                Tentang Kami
                            </a>

                            <a href="#services" className="block hover:text-white transition">
                                Layanan
                            </a>

                            <a href="#doctors" className="block hover:text-white transition">
                                Dokter
                            </a>

                            <a href="#membership" className="block hover:text-white transition">
                                Membership
                            </a>

                        </div>

                    </div>

                    {/* LAYANAN */}
                    <div>

                        <h3 className="font-bold text-lg mb-5">
                            Layanan Populer
                        </h3>

                        <div className="space-y-3 text-slate-400">

                            <p>Scaling Gigi</p>
                            <p>Tambal Gigi</p>
                            <p>Bleaching</p>
                            <p>Behel Orthodonti</p>
                            <p>Dental Implant</p>

                        </div>

                    </div>

                    {/* CONTACT */}
                    <div>

                        <h3 className="font-bold text-lg mb-5">
                            Kontak
                        </h3>

                        <div className="space-y-4 text-slate-400">

                            <div className="flex gap-3">

                                <MdLocationOn
                                    className="mt-1"
                                    size={20}
                                />

                                <span>
                                    Jl. Soekarno Hatta No.88
                                    Pekanbaru, Riau
                                </span>

                            </div>

                            <div className="flex gap-3">

                                <MdPhone size={20} />

                                <span>
                                    +62 812 3456 7890
                                </span>

                            </div>

                            <div className="flex gap-3">

                                <MdEmail size={20} />

                                <span>
                                    admin@sigigi.com
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                {/* SOCIAL */}
                <div className="border-t border-slate-800 mt-12 pt-8">

                    <div className="flex flex-col md:flex-row justify-between items-center gap-5">

                        <p className="text-slate-500 text-sm">
                            © 2026 SIGIGI Dental Clinic CRM.
                            All Rights Reserved.
                        </p>

                        <div className="flex gap-4">

                            <button className="bg-slate-800 hover:bg-blue-600 transition p-3 rounded-xl">
                                <FaInstagram />
                            </button>

                            <button className="bg-slate-800 hover:bg-green-600 transition p-3 rounded-xl">
                                <FaWhatsapp />
                            </button>

                            <button className="bg-slate-800 hover:bg-sky-600 transition p-3 rounded-xl">
                                <MdFacebook />
                            </button>

                            <button className="bg-slate-800 hover:bg-pink-600 transition p-3 rounded-xl">
                                <FaTiktok />
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </footer>
    );
}