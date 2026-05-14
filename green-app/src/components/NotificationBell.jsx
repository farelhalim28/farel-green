// ================================================
// LETAK FILE: src/components/NotificationBell.jsx
// ================================================

import { useState } from "react";
import { MdNotifications } from "react-icons/md";

const notifications = [
    { icon: "🛒", text: "Janji temu baru dari Siti Aisyah", time: "5 menit lalu" },
    { icon: "✅", text: "Budi Santoso konfirmasi janji temu", time: "30 menit lalu" },
    { icon: "💰", text: "Pembayaran diterima Rp 350.000", time: "1 jam lalu" },
];

export default function NotificationBell() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <div
                onClick={() => setOpen(!open)}
                className="relative p-2.5 bg-gray-100 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors"
            >
                <MdNotifications className="text-gray-500 text-xl" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-white" />
            </div>

            {open && (
                <div className="absolute right-0 mt-2 w-72 bg-white shadow-xl rounded-2xl border border-gray-100 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-sm text-gray-700">Notifikasi</p>
                    </div>
                    {notifications.map((n, i) => (
                        <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                            <span className="text-lg">{n.icon}</span>
                            <div>
                                <p className="text-xs text-gray-700">{n.text}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}