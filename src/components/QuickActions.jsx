// ================================================
// LETAK FILE: src/components/QuickActions.jsx
// ================================================

import { MdCalendarMonth, MdPersonAdd, MdMedicalServices, MdReceipt, MdInventory } from "react-icons/md";

const actions = [
    { icon: MdCalendarMonth,   label: "Buat Janji Temu",   bg: "bg-blue-50",   color: "text-primary" },
    { icon: MdPersonAdd,       label: "Tambah Pasien",      bg: "bg-green-50",  color: "text-success" },
    { icon: MdMedicalServices, label: "Tambah Perawatan",   bg: "bg-purple-50", color: "text-purple" },
    { icon: MdReceipt,         label: "Buat Invoice",       bg: "bg-orange-50", color: "text-warning" },
    { icon: MdInventory,       label: "Cek Stok",           bg: "bg-red-50",    color: "text-danger" },
];

export default function QuickActions() {
    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 text-base mb-4">Aksi Cepat</h3>
            <div className="grid grid-cols-5 gap-3">
                {actions.map(({ icon: Icon, label, bg, color }) => (
                    <div
                        key={label}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                    >
                        <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                            <Icon className={`text-2xl ${color}`} />
                        </div>
                        <span className="text-[11px] text-center text-gray-500 leading-tight">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}