import {
    MdStar,
    MdFormatQuote,
} from "react-icons/md";

const testimonials = [
    {
        id: 1,
        name: "Andi Pratama",
        role: "Pasien Bleaching",
        image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500",
        rating: 5,
        review:
            "Pelayanan sangat profesional dan ramah. Hasil bleaching memuaskan dan membuat saya lebih percaya diri.",
    },
    {
        id: 2,
        name: "Sarah Wijaya",
        role: "Pasien Behel",
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500",
        rating: 5,
        review:
            "Dokter menjelaskan prosedur dengan detail dan sabar. Klinik bersih dan modern, sangat nyaman.",
    },
    {
        id: 3,
        name: "Michael Tan",
        role: "Pasien Scaling",
        image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
        rating: 5,
        review:
            "Booking online mudah, reminder WhatsApp sangat membantu. Pelayanan cepat dan hasil memuaskan.",
    },
];

export default function TestimonialSection() {
    return (
        <section
            id="testimonials"
            className="py-24 bg-white"
        >
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">

                    <span className="text-blue-600 font-semibold uppercase tracking-widest">
                        Testimoni Pasien
                    </span>

                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4">
                        Apa Kata
                        <span className="text-blue-600">
                            {" "}Pasien Kami
                        </span>
                    </h2>

                    <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600">
                        Ribuan pasien telah mempercayakan kesehatan gigi
                        dan senyum terbaik mereka kepada SIGIGI Dental Clinic.
                    </p>

                </div>

                {/* Testimonial Cards */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {testimonials.map((item) => (

                        <div
                            key={item.id}
                            className="
                                bg-gray-50
                                rounded-3xl
                                p-8
                                border
                                border-gray-100
                                hover:shadow-2xl
                                hover:-translate-y-2
                                transition-all
                                duration-300
                            "
                        >

                            <MdFormatQuote
                                className="text-blue-500 mb-5"
                                size={50}
                            />

                            <p className="text-gray-600 leading-relaxed">
                                "{item.review}"
                            </p>

                            <div className="flex gap-1 mt-5">

                                {[...Array(item.rating)].map((_, index) => (

                                    <MdStar
                                        key={index}
                                        className="text-yellow-400"
                                        size={22}
                                    />

                                ))}

                            </div>

                            <div className="flex items-center gap-4 mt-8">

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="
                                        w-16
                                        h-16
                                        rounded-full
                                        object-cover
                                    "
                                />

                                <div>

                                    <h4 className="font-bold text-gray-900">
                                        {item.name}
                                    </h4>

                                    <p className="text-sm text-gray-500">
                                        {item.role}
                                    </p>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Rating Summary */}
                <div
                    className="
                        mt-20
                        bg-gradient-to-r
                        from-blue-600
                        via-cyan-500
                        to-blue-600
                        rounded-3xl
                        p-10
                        text-white
                        shadow-xl
                    "
                >

                    <div className="grid md:grid-cols-3 gap-8 text-center">

                        <div>

                            <h3 className="text-5xl font-bold">
                                4.9/5
                            </h3>

                            <p className="text-blue-100 mt-2">
                                Rating Pasien
                            </p>

                        </div>

                        <div>

                            <h3 className="text-5xl font-bold">
                                10.000+
                            </h3>

                            <p className="text-blue-100 mt-2">
                                Pasien Terdaftar
                            </p>

                        </div>

                        <div>

                            <h3 className="text-5xl font-bold">
                                98%
                            </h3>

                            <p className="text-blue-100 mt-2">
                                Tingkat Kepuasan
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}