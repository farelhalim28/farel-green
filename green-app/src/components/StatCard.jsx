// ================================================
// LETAK FILE: src/components/StatCard.jsx
// ================================================

export default function StatCard({ icon, label, value, unit, detail, color, bg }) {
    return (
        <div className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center text-xl`}>
                    {icon}
                </div>
            </div>
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-gray-800">{value}</span>
                <span className="text-sm text-gray-400">{unit}</span>
            </div>
            <p className={`text-xs mt-2 font-medium ${color} cursor-pointer hover:underline`}>
                Lihat detail →
            </p>
        </div>
    );
}