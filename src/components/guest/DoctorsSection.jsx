import {
    MdVerified,
    MdStar,
    MdCalendarMonth,
} from "react-icons/md";

const doctors = [
    {
        id: 1,
        name: "drg. Farel Abdul Halim",
        specialist: "Dokter Gigi Umum",
        experience: "8 Tahun",
        rating: "4.9",
        schedule: "Senin - Jumat",
        image:
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500",
    },
    {
        id: 2,
        name: "drg. Sarah Amanda",
        specialist: "Spesialis Ortodonti",
        experience: "10 Tahun",
        rating: "5.0",
        schedule: "Senin - Sabtu",
        image:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500",
    },
    {
        id: 3,
        name: "drg. Michael Wijaya",
        specialist: "Spesialis Bedah Mulut",
        experience: "12 Tahun",
        rating: "4.8",
        schedule: "Selasa - Sabtu",
        image:
            "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500",
    },
];

export default function DoctorsSection() {
    return (
        <section
            id="doctors"
            className="py-24 bg-white"
        >
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">

                    <span className="text-blue-600 font-semibold uppercase tracking-widest">
                        Tim Dokter Profesional
                    </span>

                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
                        Dokter Berpengalaman
                        <span className="text-blue-600">
                            {" "}Untuk Senyum Terbaik Anda
                        </span>
                    </h2>

                    <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600">
                        Ditangani langsung oleh dokter gigi profesional,
                        berpengalaman dan bersertifikasi untuk memberikan
                        pelayanan terbaik bagi kesehatan gigi dan mulut Anda.
                    </p>

                </div>

                {/* Card Dokter */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {doctors.map((doctor) => (

                        <div
                            key={doctor.id}
                            className="
                                bg-white
                                rounded-3xl
                                overflow-hidden
                                border
                                border-gray-100
                                shadow-sm
                                hover:shadow-2xl
                                hover:-translate-y-2
                                transition-all
                                duration-300
                            "
                        >

                            {/* Image */}
                            <div className="p-8 flex justify-center">

                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="
                                        w-40
                                        h-40
                                        rounded-full
                                        object-cover
                                        border-4
                                        border-blue-100
                                    "
                                />

                            </div>

                            {/* Content */}
                            <div className="px-8 pb-8 text-center">

                                <h3 className="text-2xl font-bold text-gray-900">
                                    {doctor.name}
                                </h3>

                                <p className="text-blue-600 font-semibold mt-2">
                                    {doctor.specialist}
                                </p>

                                <div className="mt-6 space-y-3">

                                    <div className="flex items-center justify-center gap-2 text-gray-600">
                                        <MdVerified className="text-green-500" />
                                        <span>
                                            Pengalaman {doctor.experience}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 text-gray-600">
                                        <MdStar className="text-yellow-500" />
                                        <span>
                                            Rating {doctor.rating}/5
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 text-gray-600">
                                        <MdCalendarMonth className="text-blue-500" />
                                        <span>
                                            {doctor.schedule}
                                        </span>
                                    </div>

                                </div>

                                <button
                                    className="
                                        mt-8
                                        w-full
                                        bg-blue-600
                                        hover:bg-blue-700
                                        text-white
                                        py-3
                                        rounded-xl
                                        font-semibold
                                        transition
                                    "
                                >
                                    Buat Janji Temu
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
}