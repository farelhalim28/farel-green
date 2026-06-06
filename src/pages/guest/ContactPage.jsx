// ================================================
// LETAK FILE: src/pages/guest/ContactPage.jsx
// ================================================

import {
    MdLocationOn,
    MdPhone,
    MdEmail,
    MdAccessTime,
    MdSend,
} from "react-icons/md";

export default function ContactPage() {

    return (
        <div className="bg-slate-50 min-h-screen">

            {/* HERO */}

            <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-24 text-center">

                    <h1 className="text-5xl font-bold">
                        Hubungi Kami
                    </h1>

                    <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
                        Tim SIGIGI siap membantu kebutuhan kesehatan gigi Anda.
                        Hubungi kami kapan saja melalui berbagai kanal komunikasi.
                    </p>

                </div>

            </section>

            {/* CONTACT */}

            <section className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid lg:grid-cols-2 gap-10">

                    {/* LEFT */}

                    <div>

                        <h2 className="text-3xl font-bold text-gray-800">
                            Informasi Klinik
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Kami siap melayani konsultasi, booking janji temu,
                            serta informasi seputar layanan klinik gigi.
                        </p>

                        <div className="space-y-5 mt-10">

                            <div className="bg-white p-5 rounded-3xl shadow-sm flex gap-4">

                                <div className="bg-blue-100 p-3 rounded-2xl h-fit">

                                    <MdLocationOn
                                        size={28}
                                        className="text-blue-600"
                                    />

                                </div>

                                <div>

                                    <h3 className="font-bold">
                                        Alamat Klinik
                                    </h3>

                                    <p className="text-gray-500 mt-1">
                                        Jl. Soekarno Hatta No. 123,
                                        Pekanbaru, Riau
                                    </p>

                                </div>

                            </div>

                            <div className="bg-white p-5 rounded-3xl shadow-sm flex gap-4">

                                <div className="bg-green-100 p-3 rounded-2xl h-fit">

                                    <MdPhone
                                        size={28}
                                        className="text-green-600"
                                    />

                                </div>

                                <div>

                                    <h3 className="font-bold">
                                        Telepon
                                    </h3>

                                    <p className="text-gray-500 mt-1">
                                        +62 812-3456-7890
                                    </p>

                                </div>

                            </div>

                            <div className="bg-white p-5 rounded-3xl shadow-sm flex gap-4">

                                <div className="bg-purple-100 p-3 rounded-2xl h-fit">

                                    <MdEmail
                                        size={28}
                                        className="text-purple-600"
                                    />

                                </div>

                                <div>

                                    <h3 className="font-bold">
                                        Email
                                    </h3>

                                    <p className="text-gray-500 mt-1">
                                        info@sigigi.com
                                    </p>

                                </div>

                            </div>

                            <div className="bg-white p-5 rounded-3xl shadow-sm flex gap-4">

                                <div className="bg-orange-100 p-3 rounded-2xl h-fit">

                                    <MdAccessTime
                                        size={28}
                                        className="text-orange-600"
                                    />

                                </div>

                                <div>

                                    <h3 className="font-bold">
                                        Jam Operasional
                                    </h3>

                                    <p className="text-gray-500 mt-1">
                                        Senin - Jumat : 08.00 - 20.00
                                    </p>

                                    <p className="text-gray-500">
                                        Sabtu : 08.00 - 17.00
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}

                    <div className="bg-white rounded-3xl p-8 shadow-sm">

                        <h2 className="text-3xl font-bold text-gray-800">
                            Kirim Pesan
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Tinggalkan pesan dan tim kami akan segera menghubungi Anda.
                        </p>

                        <form className="mt-8 space-y-5">

                            <input
                                type="text"
                                placeholder="Nama Lengkap"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                            />

                            <input
                                type="text"
                                placeholder="Nomor Telepon"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                            />

                            <textarea
                                rows="5"
                                placeholder="Tulis pesan Anda..."
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                            />

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                            >
                                <MdSend />
                                Kirim Pesan
                            </button>

                        </form>

                    </div>

                </div>

            </section>

            {/* MAP */}

            <section className="max-w-7xl mx-auto px-6 pb-20">

                <div className="bg-white rounded-3xl overflow-hidden shadow-sm">

                    <div className="p-6 border-b">

                        <h2 className="text-2xl font-bold">
                            Lokasi Klinik
                        </h2>

                    </div>

                    <div className="h-[400px] bg-slate-200 flex items-center justify-center">

                        <p className="text-gray-500 text-lg">
                            Google Maps Integration
                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
}