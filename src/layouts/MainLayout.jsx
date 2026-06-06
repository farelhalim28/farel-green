// ================================================
// LETAK FILE: src/layouts/MainLayout.jsx
// ================================================

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

export default function MainLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">

            {/* Sidebar */}
            <Sidebar />

            {/* Konten Kanan */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Header */}
                <Header />

                {/* Halaman */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>

            </div>

            {/* Floating WhatsApp */}
            <FloatingWhatsApp />

        </div>
    );
}