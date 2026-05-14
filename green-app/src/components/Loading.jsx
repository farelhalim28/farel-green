// ================================================
// LETAK FILE: src/components/Loading.jsx
// ================================================

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen w-full">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Memuat halaman...</p>
            </div>
        </div>
    )
}