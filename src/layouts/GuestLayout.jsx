// ================================================
// LETAK FILE: src/layouts/GuestLayout.jsx
// ================================================

import { Outlet } from "react-router-dom";

import Navbar from "../components/guest/Navbar";
import Footer from "../components/guest/Footer";

export default function GuestLayout() {
    return (
        <div className="min-h-screen bg-white">

            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />

        </div>
    );
}