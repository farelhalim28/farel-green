// ================================================
// LETAK FILE: src/components/Avatar.jsx
// JENIS: Basic Component
// ================================================

export default function Avatar({ name, src, size = "md" }) {
    const sizes = {
        sm: "w-8 h-8 text-xs",
        md: "w-10 h-10 text-sm",
        lg: "w-14 h-14 text-lg",
    };

    if (src) {
        return (
            <img
                src={src}
                alt={name}
                className={`${sizes[size]} rounded-full object-cover ring-2 ring-blue-100`}
            />
        );
    }

    return (
        <div className={`${sizes[size]} rounded-full bg-blue-600 text-white flex items-center justify-center font-bold`}>
            {name?.charAt(0).toUpperCase()}
        </div>
    );
}

// Cara pakai:
// <Avatar name="Siti Aisyah" />
// <Avatar name="Budi" src="https://..." size="lg" />