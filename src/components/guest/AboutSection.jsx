import {
    MdVerified,
    MdHealthAndSafety,
    MdMedicalServices,
    MdGroups,
} from "react-icons/md";

export default function AboutSection() {

    const advantages = [
        {
            icon: <MdMedicalServices />,
            title: "Dokter Berpengalaman",
            desc: "Tim dokter profesional dan bersertifikasi dengan pengalaman bertahun-tahun.",
        },
        {
            icon: <MdHealthAndSafety />,
            title: "Sterilisasi Modern",
            desc: "Menggunakan standar sterilisasi internasional demi keamanan pasien.",
        },
        {
            icon: <MdVerified />,
            title: "Teknologi Terkini",
            desc: "Peralatan digital modern untuk diagnosis dan perawatan yang lebih akurat.",
        },
        {
            icon: <MdGroups />,
            title: "Membership & Loyalty",
            desc: "Nikmati berbagai keuntungan melalui program membership eksklusif.",
        },
    ];

    return (
        <section
            id="about"
            className="py-24 bg-slate-50"
        >

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* FOTO */}

                    <div className="relative">

                        <img
                            src="https://images.unsplash.com/photo-1588776814546-ec7e8b6ac1c4?w=1200"
                            alt="Klinik Gigi"
                            className="rounded-[32px] shadow-2xl object-cover h-[650px] w-full"
                        />

                        <div className="absolute bottom-6 left-6 bg-white p-6 rounded-3xl shadow-xl">

                            <h3 className="text-4xl font-bold text-blue-600">
                                10+
                            </h3>

                            <p className="text-gray-500">
                                Tahun Melayani Pasien
                            </p>

                        </div>

                    </div>

                    {/* CONTENT */}

                    <div>

                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                            Tentang SIGIGI
                        </span>

                        <h2 className="text-5xl font-bold text-slate-900 mt-6 leading-tight">

                            Klinik Gigi Modern Untuk
                            <span className="text-blue-600">
                                {" "}Senyum Yang Lebih Sehat
                            </span>

                        </h2>

                        <p className="text-gray-500 mt-6 leading-relaxed text-lg">

                            SIGIGI Dental Clinic hadir sebagai solusi
                            kesehatan gigi modern dengan menggabungkan
                            teknologi terkini, pelayanan profesional,
                            dan sistem CRM yang membantu menjaga hubungan
                            jangka panjang dengan pasien.

                        </p>

                        <p className="text-gray-500 mt-4 leading-relaxed text-lg">

                            Kami percaya bahwa setiap senyum memiliki
                            nilai yang berharga. Karena itu, kami selalu
                            berkomitmen memberikan pelayanan terbaik
                            dengan standar kualitas tinggi.

                        </p>

                        {/* VISI MISI */}

                        <div className="grid md:grid-cols-2 gap-5 mt-10">

                            <div className="bg-white rounded-3xl p-6 shadow-sm">

                                <h3 className="font-bold text-xl text-slate-900">
                                    Visi
                                </h3>

                                <p className="text-gray-500 mt-3">
                                    Menjadi klinik gigi modern terpercaya
                                    dengan pelayanan terbaik dan teknologi terkini.
                                </p>

                            </div>

                            <div className="bg-white rounded-3xl p-6 shadow-sm">

                                <h3 className="font-bold text-xl text-slate-900">
                                    Misi
                                </h3>

                                <p className="text-gray-500 mt-3">
                                    Memberikan layanan kesehatan gigi
                                    berkualitas tinggi untuk seluruh pasien.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* KEUNGGULAN */}

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-20">

                    {advantages.map((item, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition"
                        >

                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-3xl">

                                {item.icon}

                            </div>

                            <h3 className="font-bold text-xl mt-6 text-slate-900">
                                {item.title}
                            </h3>

                            <p className="text-gray-500 mt-3 leading-relaxed">
                                {item.desc}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}