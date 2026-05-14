// ================================================
// LETAK FILE: src/components/AppointmentList.jsx
// ================================================

const appointments = [
    {
        time: "09:00", end: "09:30",
        name: "Siti Aisyah", action: "Pembersihan Karang Gigi",
        avatar: "https://avatar.iran.liara.run/public/girl/10",
        status: "confirmed",
    },
    {
        time: "10:00", end: "10:30",
        name: "Budi Santoso", action: "Tambal Gigi",
        avatar: "https://avatar.iran.liara.run/public/boy/10",
        status: "confirmed",
    },
    {
        time: "11:00", end: "11:30",
        name: "Dewi Lestari", action: "Konsultasi & Pemeriksaan",
        avatar: "https://avatar.iran.liara.run/public/girl/20",
        status: "confirmed",
    },
    {
        time: "13:00", end: "13:30",
        name: "Rizky Pratama", action: "Bleaching",
        avatar: "https://avatar.iran.liara.run/public/boy/20",
        status: "pending",
    },
];

const statusStyle = {
    confirmed: "bg-blue-50 text-primary",
    pending:   "bg-yellow-50 text-warning",
};

const statusLabel = {
    confirmed: "Confirmed",
    pending:   "Pending",
};

export default function AppointmentList() {
    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800 text-base">Janji Temu Hari Ini</h3>
                <span className="text-primary text-xs font-semibold cursor-pointer hover:underline">
                    Lihat semua
                </span>
            </div>
            <div className="space-y-3">
                {appointments.map((a, i) => (
                    <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                        {/* Waktu */}
                        <div className="text-right min-w-[48px]">
                            <p className="text-xs font-bold text-gray-700">{a.time}</p>
                            <p className="text-[10px] text-gray-400">{a.end}</p>
                        </div>
                        {/* Avatar */}
                        <img src={a.avatar} className="w-9 h-9 rounded-full object-cover flex-shrink-0" alt={a.name} />
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-700 truncate">{a.name}</p>
                            <p className="text-xs text-gray-400 truncate">{a.action}</p>
                        </div>
                        {/* Status */}
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg flex-shrink-0 ${statusStyle[a.status]}`}>
                            {statusLabel[a.status]}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}