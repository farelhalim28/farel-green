// ================================================
// LETAK FILE: src/components/Alert.jsx
// JENIS: Feedback Component
// ================================================

export default function Alert({ children, type = "info", onClose }) {
    const types = {
        info:    "bg-blue-50 border-blue-200 text-blue-700",
        success: "bg-green-50 border-green-200 text-green-700",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
        danger:  "bg-red-50 border-red-200 text-red-700",
    };

    const icons = {
        info:    "ℹ️",
        success: "✅",
        warning: "⚠️",
        danger:  "❌",
    };

    return (
        <div className={`${types[type]} border rounded-xl px-4 py-3 flex items-start gap-3 text-sm`}>
            <span className="flex-shrink-0">{icons[type]}</span>
            <span className="flex-1">{children}</span>
            {onClose && (
                <button onClick={onClose} className="flex-shrink-0 opacity-60 hover:opacity-100 font-bold">
                    ✕
                </button>
            )}
        </div>
    );
}

// Cara pakai:
// <Alert type="success">Janji temu berhasil disimpan!</Alert>
// <Alert type="danger" onClose={() => setError("")}>Terjadi kesalahan!</Alert>