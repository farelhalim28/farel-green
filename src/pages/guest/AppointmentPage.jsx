// ================================================
// LETAK FILE: src/pages/guest/AppointmentPage.jsx
// ================================================

import { useState } from "react";
import {
    MdCalendarMonth,
    MdPerson,
    MdPhone,
    MdMedicalServices,
    MdAccessTime,
    MdCheckCircle,
} from "react-icons/md";

export default function AppointmentPage() {

    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccess(true);
    };

    return (
        <div className="bg-slate-50 min-h-screen">

            {/* HERO */}

            <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-24">

                    <h1 className="text-5xl font-bold">
                        Booking Janji Temu
                    </h1>

                    <p className="mt-4 text-blue-100 max-w-3xl">
                        Jadwalkan konsultasi dan perawatan gigi
                        dengan mudah melalui sistem booking online SIGIGI.
                    </p>

                </div>

            </section>

            {/* CONTENT */}

            <section className="max-w-7xl mx-auto px-6 py-20">

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* FORM */}

                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm">

                        <h2 className="text-3xl font-bold mb-8">
                            Form Booking
                        </h2>

                        {success && (

                            <div className="mb-6 bg-green-100 text-green-700 p-4 rounded-xl flex items-center gap-3">

                                <MdCheckCircle size={24} />

                                Booking berhasil dikirim.
                                Tim kami akan segera menghubungi Anda.

                            </div>

                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <div>

                                <label className="font-medium">
                                    Nama Lengkap
                                </label>

                                <div className="relative mt-2">

                                    <MdPerson
                                        className="absolute left-4 top-4 text-gray-400"
                                        size={20}
                                    />

                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                        placeholder="Masukkan Nama"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="font-medium">
                                    Nomor Telepon
                                </label>

                                <div className="relative mt-2">

                                    <MdPhone
                                        className="absolute left-4 top-4 text-gray-400"
                                        size={20}
                                    />

                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                        placeholder="08xxxxxxxxxx"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="font-medium">
                                    Pilih Perawatan
                                </label>

                                <div className="relative mt-2">

                                    <MdMedicalServices
                                        className="absolute left-4 top-4 text-gray-400"
                                        size={20}
                                    />

                                    <select
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                    >
                                        <option>Scaling</option>
                                        <option>Tambal Gigi</option>
                                        <option>Cabut Gigi</option>
                                        <option>Bleaching</option>
                                        <option>Behel</option>
                                        <option>Veneer</option>
                                    </select>

                                </div>

                            </div>

                            <div className="grid md:grid-cols-2 gap-5">

                                <div>

                                    <label className="font-medium">
                                        Tanggal
                                    </label>

                                    <div className="relative mt-2">

                                        <MdCalendarMonth
                                            className="absolute left-4 top-4 text-gray-400"
                                            size={20}
                                        />

                                        <input
                                            type="date"
                                            required
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                        />

                                    </div>

                                </div>

                                <div>

                                    <label className="font-medium">
                                        Jam
                                    </label>

                                    <div className="relative mt-2">

                                        <MdAccessTime
                                            className="absolute left-4 top-4 text-gray-400"
                                            size={20}
                                        />

                                        <input
                                            type="time"
                                            required
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500"
                                        />

                                    </div>

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition"
                            >
                                Booking Sekarang
                            </button>

                        </form>

                    </div>

                    {/* INFO */}

                    <div className="space-y-6">

                        <div className="bg-white rounded-3xl p-6 shadow-sm">

                            <h3 className="text-xl font-bold">
                                Jam Operasional
                            </h3>

                            <div className="mt-4 space-y-2 text-gray-600">

                                <p>Senin - Jumat : 08.00 - 20.00</p>
                                <p>Sabtu : 08.00 - 17.00</p>
                                <p>Minggu : Tutup</p>

                            </div>

                        </div>

                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-6">

                            <h3 className="text-xl font-bold">
                                Kenapa Booking Online?
                            </h3>

                            <ul className="mt-4 space-y-3">

                                <li>✓ Praktis dan cepat</li>
                                <li>✓ Pilih jadwal sendiri</li>
                                <li>✓ Reminder otomatis</li>
                                <li>✓ Prioritas pelayanan</li>

                            </ul>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}