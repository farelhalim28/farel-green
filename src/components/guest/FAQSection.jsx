import { useState } from "react";
import {
    MdAdd,
    MdRemove,
} from "react-icons/md";

const faqs = [
    {
        question: "Berapa biaya scaling gigi?",
        answer:
            "Biaya scaling mulai dari Rp250.000 tergantung kondisi gigi dan tingkat karang gigi pasien.",
    },
    {
        question: "Apakah bisa menggunakan BPJS?",
        answer:
            "Untuk layanan tertentu kami menerima BPJS sesuai ketentuan yang berlaku.",
    },
    {
        question: "Bagaimana cara booking online?",
        answer:
            "Pasien dapat melakukan booking melalui website, WhatsApp, atau aplikasi CRM SIGIGI.",
    },
    {
        question: "Apakah tersedia cicilan pembayaran?",
        answer:
            "Ya, beberapa treatment seperti behel dan veneer tersedia opsi cicilan.",
    },
    {
        question: "Apakah ada promo untuk member?",
        answer:
            "Member Silver, Gold, dan Platinum mendapatkan promo serta diskon treatment sesuai level membership.",
    },
    {
        question: "Jam operasional klinik?",
        answer:
            "Klinik buka setiap hari Senin - Minggu pukul 08.00 hingga 21.00 WIB.",
    },
];

export default function FAQSection() {

    const [active, setActive] = useState(null);

    const toggleFAQ = (index) => {
        setActive(active === index ? null : index);
    };

    return (
        <section
            id="faq"
            className="py-24 bg-gray-50"
        >
            <div className="max-w-5xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">

                    <span className="text-blue-600 font-semibold uppercase tracking-widest">
                        Frequently Asked Questions
                    </span>

                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
                        Pertanyaan Yang
                        <span className="text-blue-600">
                            {" "}Sering Ditanyakan
                        </span>
                    </h2>

                    <p className="text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
                        Temukan jawaban atas pertanyaan yang paling sering
                        ditanyakan pasien sebelum melakukan perawatan.
                    </p>

                </div>

                {/* FAQ List */}
                <div className="space-y-5">

                    {faqs.map((faq, index) => (

                        <div
                            key={index}
                            className="
                                bg-white
                                rounded-3xl
                                shadow-sm
                                border
                                border-gray-100
                                overflow-hidden
                            "
                        >

                            <button
                                onClick={() => toggleFAQ(index)}
                                className="
                                    w-full
                                    flex
                                    items-center
                                    justify-between
                                    p-6
                                    text-left
                                "
                            >

                                <h3 className="font-semibold text-lg text-gray-800">
                                    {faq.question}
                                </h3>

                                {active === index ? (
                                    <MdRemove
                                        size={28}
                                        className="text-blue-600"
                                    />
                                ) : (
                                    <MdAdd
                                        size={28}
                                        className="text-blue-600"
                                    />
                                )}

                            </button>

                            {active === index && (

                                <div className="px-6 pb-6">

                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

                {/* Bottom CTA */}
                <div
                    className="
                        mt-20
                        bg-gradient-to-r
                        from-blue-600
                        via-cyan-500
                        to-blue-600
                        rounded-3xl
                        p-10
                        text-center
                        text-white
                        shadow-xl
                    "
                >

                    <h3 className="text-3xl font-bold">
                        Masih Punya Pertanyaan?
                    </h3>

                    <p className="text-blue-100 mt-4 max-w-2xl mx-auto">
                        Tim kami siap membantu Anda kapan saja
                        untuk konsultasi, booking, maupun informasi treatment.
                    </p>

                    <button
                        className="
                            mt-6
                            bg-white
                            text-blue-600
                            px-8
                            py-3
                            rounded-xl
                            font-bold
                            hover:scale-105
                            transition
                        "
                    >
                        Hubungi Kami
                    </button>

                </div>

            </div>
        </section>
    );
}