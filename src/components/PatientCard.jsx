// ================================================
// LETAK FILE: src/components/PatientCard.jsx
// JENIS: Data Display Component
// ================================================

import Card from "./Card";
import Avatar from "./Avatar";
import Badge from "./Badge";

export default function PatientCard({ name, age, lastVisit, treatment, status }) {
    const statusType = {
        "Aktif":    "success",
        "Selesai":  "secondary",
        "Pending":  "warning",
    };

    return (
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
                <Avatar name={name} size="md" />
                <div>
                    <p className="font-semibold text-gray-800 text-sm">{name}</p>
                    <p className="text-xs text-gray-400">{age} tahun</p>
                </div>
                <div className="ml-auto">
                    <Badge type={statusType[status] || "primary"}>{status}</Badge>
                </div>
            </div>
            <div className="border-t border-gray-50 pt-3 space-y-1">
                <p className="text-xs text-gray-500">
                    <span className="font-medium">Tindakan:</span> {treatment}
                </p>
                <p className="text-xs text-gray-500">
                    <span className="font-medium">Kunjungan terakhir:</span> {lastVisit}
                </p>
            </div>
        </Card>
    );
}

// Cara pakai:
// <PatientCard
//     name="Siti Aisyah"
//     age={28}
//     lastVisit="15 Mei 2026"
//     treatment="Pembersihan Karang Gigi"
//     status="Aktif"
// />