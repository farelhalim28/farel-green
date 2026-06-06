// ================================================
// LETAK FILE: src/pages/guest/FAQPage.jsx
// ================================================

import { useState } from "react";
import {
    MdKeyboardArrowDown,
    MdKeyboardArrowUp,
    MdHelpOutline,
} from "react-icons/md";

export default function FAQPage() {

    const [active, setActive] = useState(null);

    const faqs = [
        {
            question: "Berapa biaya scaling gigi?",
            answer:
                "Biaya scaling mulai dari Rp250.000 tergantung kondisi gigi pasien.",
        },
        {
            question: "Apakah bisa booking online?",
            answer:
                "Ya. Pasien dapat melakukan booking melalui website dan mendapatkan konfirmasi otomatis.",
        },
        {
            question: "Apakah menerima BPJS?",
            answer:
                "Saat ini beberapa layanan tertentu dapat menggunakan BPJS sesuai ketentuan yang berlaku.",
        },
        {
            question: "Berapa lama proses bleaching?",
            answer:
                "Proses bleaching biasanya memerlukan waktu sekitar 60-90 menit.",
        },
        {
            question: "Apakah tersedia pembayaran cicilan?",
            answer:
                "Ya, tersedia pembayaran menggunakan kartu kredit dan beberapa layanan cicilan partner.",
        },
        {
            question: "Bagaimana sistem membership bekerja?",
            answer:
                "Pasien akan mendapatkan poin setiap transaksi yang dapat ditukar dengan voucher dan promo eksklusif.",
        },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">

            {/* HERO */}

            <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-24 text-center">

                    <MdHelpOutline
                        size={70}
                        className="mx-auto mb-4"
                    />

                    <h1 className="text-5xl font-bold">
                        Frequently Asked Questions
                    </h1>

                    <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
                        Temukan jawaban dari pertanyaan yang
                        paling sering ditanyakan pasien.
                    </p>

                </div>

            </section>

            {/* FAQ */}

            <section className="max-w-4xl mx-auto px-6 py-20">

                <div className="space-y-4">

                    {faqs.map((faq, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-3xl shadow-sm overflow-hidden"
                        >

                            <button
                                onClick={() =>
                                    setActive(
                                        active === index
                                            ? null
                                            : index
                                    )
                                }
                                className="w-full flex items-center justify-between p-6 text-left"
                            >

                                <span className="font-semibold text-lg">
                                    {faq.question}
                                </span>

                                {active === index ? (
                                    <MdKeyboardArrowUp size={28} />
                                ) : (
                                    <MdKeyboardArrowDown size={28} />
                                )}

                            </button>

                            {active === index && (

                                <div className="px-6 pb-6 text-gray-600 leading-relaxed">

                                    {faq.answer}

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            </section>

            {/* CTA */}

            <section className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white">

                <div className="max-w-6xl mx-auto px-6 py-20 text-center">

                    <h2 className="text-4xl font-bold">
                        Masih Punya Pertanyaan?
                    </h2>

                    <p className="mt-4 text-blue-100">
                        Tim kami siap membantu Anda kapan saja.
                    </p>

                    <button
                        className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
                    >
                        Hubungi Kami
                    </button>

                </div>

            </section>

        </div>
    );
}