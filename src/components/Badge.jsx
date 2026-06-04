// ================================================
// LETAK FILE: src/components/Badge.jsx
// JENIS: Basic Component
// ================================================

export default function Badge({ children, type = "primary" }) {
    const types = {
        primary:   "bg-blue-100 text-blue-700",
        secondary: "bg-gray-100 text-gray-700",
        success:   "bg-green-100 text-green-700",
        danger:    "bg-red-100 text-red-700",
        warning:   "bg-yellow-100 text-yellow-700",
        purple:    "bg-purple-100 text-purple-700",
    };

    return (
        <span className={`${types[type]} px-3 py-1 rounded-full text-xs font-semibold`}>
            {children}
        </span>
    );
}

// Cara pakai:
// <Badge type="success">Confirmed</Badge>
// <Badge type="warning">Pending</Badge>
// <Badge type="danger">Cancelled</Badge>