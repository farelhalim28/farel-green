// ================================================
// LETAK FILE: src/components/StatCard.jsx
// JENIS: Data Display Component
// ================================================

import Card from "./Card";

export default function StatCard({ icon, label, value, unit, trend, trendUp = true, color = "blue" }) {
    const colors = {
        blue:   "bg-blue-50",
        green:  "bg-green-50",
        purple: "bg-purple-50",
        yellow: "bg-yellow-50",
        red:    "bg-red-50",
    };

    return (
        <Card>
            <div className={`w-11 h-11 ${colors[color]} rounded-xl flex items-center justify-center text-xl mb-4`}>
                {icon}
            </div>
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-gray-800">{value}</span>
                {unit && <span className="text-sm text-gray-400">{unit}</span>}
            </div>
            {trend && (
                <p className={`text-xs mt-2 font-medium ${trendUp ? "text-green-600" : "text-red-500"}`}>
                    {trendUp ? "↑" : "↓"} {trend}
                </p>
            )}
            <p className="text-xs mt-2 text-blue-600 font-medium cursor-pointer hover:underline">
                Lihat detail →
            </p>
        </Card>
    );
}

// Cara pakai:
// <StatCard
//     icon="🦷"
//     label="Janji Temu Hari Ini"
//     value="8"
//     unit="Pasien"
//     trend="12% dari kemarin"
//     trendUp={true}
//     color="blue"
// />