import {
    MdPeople,
    MdMedicalServices,
    MdStar,
    MdCalendarMonth,
} from "react-icons/md";

export default function StatsSection() {
    const stats = [
        {
            icon: <MdPeople />,
            value: "10.000+",
            title: "Pasien Terdaftar",
            desc: "Telah mempercayakan kesehatan giginya kepada kami",
        },
        {
            icon: <MdMedicalServices />,
            value: "15+",
            title: "Dokter Profesional",
            desc: "Dokter gigi berpengalaman dan tersertifikasi",
        },
        {
            icon: <MdStar />,
            value: "98%",
            title: "Kepuasan Pasien",
            desc: "Tingkat kepuasan berdasarkan review pasien",
        },
        {
            icon: <MdCalendarMonth />,
            value: "24/7",
            title: "Booking Online",
            desc: "Reservasi janji temu kapan saja",
        },
    ];

    return (
        <section className="bg-white py-20">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-14">

                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                        Statistik Klinik
                    </span>

                    <h2 className="text-4xl font-bold text-gray-900 mt-5">
                        Dipercaya Ribuan Pasien
                    </h2>

                    <p className="text-gray-500 max-w-2xl mx-auto mt-4">
                        Kami berkomitmen memberikan pelayanan terbaik
                        dengan teknologi modern dan tim dokter profesional.
                    </p>

                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

                    {stats.map((item, index) => (

                        <div
                            key={index}
                            className="bg-slate-50 border border-slate-100 rounded-3xl p-8 text-center hover:-translate-y-2 hover:shadow-xl transition duration-300"
                        >

                            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-4xl">

                                {item.icon}

                            </div>

                            <h3 className="text-5xl font-bold text-gray-900 mt-6">
                                {item.value}
                            </h3>

                            <h4 className="font-semibold text-xl mt-3 text-gray-800">
                                {item.title}
                            </h4>

                            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                                {item.desc}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}