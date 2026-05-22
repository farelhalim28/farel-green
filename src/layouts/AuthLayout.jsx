// ================================================
// LETAK FILE: src/layouts/AuthLayout.jsx
// ================================================

import { Outlet } from "react-router-dom";
import { FaTooth } from "react-icons/fa";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">

                {/* Logo Dokter Gigi */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 mb-3">
                        <FaTooth className="text-white text-2xl" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-800">SIGIGI</h1>
                    <p className="text-xs text-gray-400">Klinik Sehat Senyum</p>
                </div>

                {/* Outlet = tempat Login / Register / Forgot ditampilkan */}
                <Outlet />

                <p className="text-center text-sm text-gray-500 mt-6">
                    © 2025 Klinik Sehat Senyum. All rights reserved.
                </p>
            </div>
        </div>
    )
}