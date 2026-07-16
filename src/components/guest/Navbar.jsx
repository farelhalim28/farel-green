// ================================================
// LETAK FILE: src/components/guest/Navbar.jsx
// ================================================

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import {
    MdMenu,
    MdClose,
    MdPersonAdd,
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

                    {/* LOGO FIX UKURAN PAS & TULISAN JELAS */}
                    <Link
                        to="/"
                        className="flex items-center justify-center h-20 w-[190px] overflow-hidden"
                    >
                        {/* - h-28: Memberikan ruang vertikal agar gambar membesar maksimal
                          - scale-[1.3]: Zoom dinaikkan ke 130% supaya teks logo tidak buram/kecil
                          - mt-[-2px]: Posisi vertikal disesuaikan agar center sempurna
                        */}
                        <img 
                            src="/img/logo.png" 
                            alt="Logo SIGIGI" 
                            className="h-28 w-full object-contain scale-[1.3] transform mt-[-2px]" 
                        />
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden lg:flex items-center gap-8">

                        {menu.map((item) => (

                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600 font-semibold text-[15px]"
                                        : "text-slate-700 hover:text-blue-600 transition font-medium text-[15px]"
                                }
                            >
                                {item.name}
                            </NavLink>

                        ))}

                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-3">

                        {/* TOMBOL DAFTAR */}
                        <Link
                            to="/register-member"
                            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition text-slate-700 font-medium text-[14px]"
                        >
                            <MdPersonAdd className="text-blue-600" />
                            Daftar
                        </Link>

                        <Link
                            to="/login-member"
                            className="hidden md:block px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition text-[14px]"
                        >
                            Login
                        </Link>

                        <Link
                            to="/appointment"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-105 transition text-[14px]"
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
                            to="/register-member"
                            onClick={() => setOpen(false)}
                            className="mt-2 px-4 py-3 rounded-xl bg-slate-100 text-center text-slate-700 font-medium"
                        >
                            Daftar Member
                        </Link>

                        <Link
                            to="/login-member"
                            onClick={() => setOpen(false)}
                            className="px-4 py-3 rounded-xl border text-center"
                        >
                            Login Pasien
                        </Link>

                    </div>

                </div>

            )}

        </nav>
    );
}