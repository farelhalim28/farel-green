// ================================================
// LETAK FILE: src/components/ProfileDropdown.jsx
// ================================================

import { useState } from "react";
import { MdExpandMore, MdPerson, MdSettings, MdLogout } from "react-icons/md";

export default function ProfileDropdown() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2.5 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-xl transition-colors"
            >
                <img
                    src="/img/Dokter.jpg"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-primary ring-offset-1"
                    alt="profile"
                />
                <div className="hidden md:block">
                    <p className="text-sm font-semibold text-gray-700 leading-tight">Administrator</p>
                </div>
                <MdExpandMore className="text-gray-400" />
            </div>

            {open && (
                <div className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-2xl border border-gray-100 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-700">Administrator</p>
                        <p className="text-xs text-gray-400">admin123@kliniks.com</p>
                    </div>
                    {[
                        { icon: MdPerson,   label: "Profil Saya" },
                        { icon: MdSettings, label: "Pengaturan" },
                        { icon: MdLogout,   label: "Keluar", danger: true },
                    ].map(({ icon: Icon, label, danger }) => (
                        <div
                            key={label}
                            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors text-sm
                                ${danger ? "text-red-500 hover:bg-red-50" : "text-gray-600 hover:bg-gray-50"}`}
                        >
                            <Icon className="text-base" />
                            {label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}