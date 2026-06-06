import {
    MdLocationOn,
    MdPhone,
    MdEmail,
    MdAccessTime,
    MdSend,
} from "react-icons/md";

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="py-24 bg-white"
        >
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">

                    <span className="text-blue-600 font-semibold uppercase tracking-widest">
                        Hubungi Kami
                    </span>

                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
                        Konsultasikan
                        <span className="text-blue-600">
                            {" "}Senyum Terbaik Anda
                        </span>
                    </h2>

                    <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600">
                        Tim dokter kami siap membantu Anda mendapatkan
                        perawatan gigi terbaik dengan teknologi modern.
                    </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-10">

                    {/* FORM */}
                    <div
                        className="
                            bg-white
                            rounded-3xl
                            p-8
                            shadow-sm
                            border
                            border-gray-100
                        "
                    >

                        <h3 className="text-2xl font-bold mb-6">
                            Buat Janji Temu
                        </h3>

                        <div className="space-y-5">

                            <input
                                type="text"
                                placeholder="Nama Lengkap"
                                className="
                                    w-full
                                    border
                                    border-gray-200
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:border-blue-500
                                "
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                className="
                                    w-full
                                    border
                                    border-gray-200
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:border-blue-500
                                "
                            />

                            <input
                                type="text"
                                placeholder="Nomor WhatsApp"
                                className="
                                    w-full
                                    border
                                    border-gray-200
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:border-blue-500
                                "
                            />

                            <textarea
                                rows="5"
                                placeholder="Pesan atau kebutuhan perawatan..."
                                className="
                                    w-full
                                    border
                                    border-gray-200
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:border-blue-500
                                "
                            />

                            <button
                                className="
                                    w-full
                                    bg-blue-600
                                    hover:bg-blue-700
                                    text-white
                                    py-4
                                    rounded-xl
                                    font-semibold
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    transition
                                "
                            >
                                Kirim Permintaan
                                <MdSend />
                            </button>

                        </div>

                    </div>

                    {/* INFO */}
                    <div
                        className="
                            bg-gradient-to-br
                            from-blue-600
                            via-cyan-500
                            to-blue-700
                            rounded-3xl
                            p-8
                            text-white
                            shadow-xl
                        "
                    >

                        <h3 className="text-2xl font-bold mb-8">
                            Informasi Klinik
                        </h3>

                        <div className="space-y-8">

                            <div className="flex gap-4">

                                <MdLocationOn
                                    size={30}
                                    className="mt-1"
                                />

                                <div>
                                    <h4 className="font-bold">
                                        Alamat
                                    </h4>

                                    <p className="text-blue-100">
                                        Jl. Soekarno Hatta No. 88
                                        Pekanbaru, Riau
                                    </p>
                                </div>

                            </div>

                            <div className="flex gap-4">

                                <MdPhone
                                    size={30}
                                    className="mt-1"
                                />

                                <div>
                                    <h4 className="font-bold">
                                        Telepon
                                    </h4>

                                    <p className="text-blue-100">
                                        +62 812 3456 7890
                                    </p>
                                </div>

                            </div>

                            <div className="flex gap-4">

                                <MdEmail
                                    size={30}
                                    className="mt-1"
                                />

                                <div>
                                    <h4 className="font-bold">
                                        Email
                                    </h4>

                                    <p className="text-blue-100">
                                        admin@sigigi.com
                                    </p>
                                </div>

                            </div>

                            <div className="flex gap-4">

                                <MdAccessTime
                                    size={30}
                                    className="mt-1"
                                />

                                <div>
                                    <h4 className="font-bold">
                                        Jam Operasional
                                    </h4>

                                    <p className="text-blue-100">
                                        Senin - Minggu
                                    </p>

                                    <p className="text-blue-100">
                                        08.00 - 21.00 WIB
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Maps Placeholder */}
                        <div
                            className="
                                mt-10
                                h-64
                                bg-white/10
                                rounded-2xl
                                flex
                                items-center
                                justify-center
                                text-white
                                text-lg
                                font-semibold
                            "
                        >
                            📍 Google Maps Location
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}