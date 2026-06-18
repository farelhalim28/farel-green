// ================================================
// LETAK FILE: src/components/guest/Navbar.jsx
// ================================================

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
    MdMenu,
    MdClose,
    MdPhone,
    MdCalendarMonth,
} from "react-icons/md";

export default function Navbar() {

    const [open, setOpen] = useState(false);

    const menu = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Layanan",
            path: "/services",
        },
        {
            name: "Dokter",
            path: "/doctors",
        },
        {
            name: "Membership",
            path: "/membership",
        },
        {
            name: "Promo",
            path: "/promo",
        },
        {
            name: "FAQ",
            path: "/faq",
        },
        {
            name: "Kontak",
            path: "/contact",
        },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">

            <div className="max-w-7xl mx-auto px-6">

                <div className="h-20 flex items-center justify-between">

                    {/* LOGO */}

                    <Link
                        to="/"
                        className="flex items-center gap-3"
                    >

                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white text-2xl shadow-lg">

                            🦷

                        </div>

                        <div>

                            <h1 className="font-bold text-xl text-slate-800">
                                SIGIGI
                            </h1>

                            <p className="text-xs text-slate-500">
                                Dental Clinic CRM
                            </p>

                        </div>

                    </Link>

                    {/* DESKTOP MENU */}

                    <div className="hidden lg:flex items-center gap-8">

                        {menu.map((item) => (

                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 font-semibold"
                                        : "text-slate-700 hover:text-blue-600 transition font-medium"
                                }
                            >
                                {item.name}
                            </NavLink>

                        ))}

                    </div>

                    {/* CTA */}

                    <div className="flex items-center gap-3">

                        <button
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition text-slate-700 font-medium"
                        >
                            <MdPhone />
                            WhatsApp
                        </button>

                        <Link
                            to="/login-member"
                            className="hidden md:block px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
                        >
                            Login
                        </Link>

                        <Link
                            to="/appointment"
                            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-105 transition"
                        >
                            <MdCalendarMonth />
                            Janji Temu
                        </Link>

                        {/* MOBILE BUTTON */}

                        <button
                            onClick={() => setOpen(!open)}
                            className="lg:hidden text-3xl text-slate-700"
                        >

                            {open ? (
                                <MdClose />
                            ) : (
                                <MdMenu />
                            )}

                        </button>

                    </div>

                </div>

            </div>

            {/* MOBILE MENU */}

            {open && (

                <div className="lg:hidden bg-white border-t border-slate-100 shadow-lg">

                    <div className="flex flex-col p-5 gap-4">

                        {menu.map((item) => (

                            <NavLink
                                key={item.name}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 font-semibold"
                                        : "text-slate-700"
                                }
                            >
                                {item.name}
                            </NavLink>

                        ))}

                        <Link
                            to="/login-member"
                            className="mt-2 px-4 py-3 rounded-xl border text-center"
                        >
                            Login Pasien
                        </Link>

                    </div>

                </div>

            )}

        </nav>
    );
}