import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
    return (
        <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="
                fixed
                bottom-6
                right-6
                z-50
                w-16
                h-16
                rounded-full
                bg-green-500
                text-white
                flex
                items-center
                justify-center
                shadow-xl
                hover:scale-110
                transition
            "
        >
            <FaWhatsapp size={34} />
        </a>
    );
}