// ================================================
// LETAK FILE: src/components/AppointmentCard.jsx
// JENIS: Data Display Component
// ================================================

import Avatar from "./Avatar";
import Badge from "./Badge";

export default function AppointmentCard({ time, endTime, name, treatment, avatar, status }) {
    const statusType = {
        "confirmed": "success",
        "pending":   "warning",
        "cancelled": "danger",
    };

    const statusLabel = {
        "confirmed": "Confirmed",
        "pending":   "Pending",
        "cancelled": "Cancelled",
    };

    return (
        <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
            {/* Waktu */}
            <div className="text-right min-w-[48px]">
                <p className="text-xs font-bold text-gray-700">{time}</p>
                <p className="text-[10px] text-gray-400">{endTime}</p>
            </div>

            {/* Avatar */}
            <Avatar name={name} src={avatar} size="sm" />

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-700 truncate">{name}</p>
                <p className="text-xs text-gray-400 truncate">{treatment}</p>
            </div>

            {/* Status */}
            <Badge type={statusType[status] || "primary"}>
                {statusLabel[status] || status}
            </Badge>
        </div>
    );
}

// Cara pakai:
// <AppointmentCard
//     time="09:00"
//     endTime="09:30"
//     name="Siti Aisyah"
//     treatment="Pembersihan Karang Gigi"
//     status="confirmed"
// />