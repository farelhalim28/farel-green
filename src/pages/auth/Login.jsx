// ================================================
// LETAK FILE: src/pages/auth/Login.jsx
// ================================================

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
    MdEmail,
    MdLock,
    MdArrowForward,
    MdLocalHospital,
    MdVerified,
    MdPeople,
    MdCalendarMonth,
} from "react-icons/md";

export default function Login() {

    const navigate = useNavigate();

    const [error, setError] = useState("");

    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(dataForm.email)) {
        setError("Masukkan email yang valid.");
        return;
    }

    if (!dataForm.password.trim()) {
        setError("Password wajib diisi.");
        return;
    }

    // simpan status login
    localStorage.setItem("isLogin", "true");

    // masuk ke dashboard
    navigate("/dashboard");

    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex lg:w-1/2 p-12 text-white flex-col justify-between">

                <div>

                    <div className="flex items-center gap-4">

                        <div className="bg-white/20 backdrop-blur-lg p-4 rounded-2xl">
                            <MdLocalHospital size={40} />
                        </div>

                        <div>
                            <h1 className="text-4xl font-bold">
                                SIGIGI CRM
                            </h1>

                            <p className="text-blue-100">
                                Klinik Sehat Senyum
                            </p>
                        </div>

                    </div>

                    <div className="mt-14">

                        <h2 className="text-5xl font-bold leading-tight">
                            Sistem CRM Modern
                            untuk Klinik Gigi
                        </h2>

                        <p className="mt-6 text-lg text-blue-100 leading-relaxed">
                            Kelola pasien, membership, loyalty point,
                            janji temu, rekam medis, pembayaran,
                            dan komunikasi pasien dalam satu platform.
                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-5">

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5">
                        <MdPeople size={35} />
                        <h3 className="mt-3 text-3xl font-bold">
                            10+
                        </h3>
                        <p className="text-blue-100">
                            Pasien Terdaftar
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-5">
                        <MdCalendarMonth size={35} />
                        <h3 className="mt-3 text-3xl font-bold">
                            24/7
                        </h3>
                        <p className="text-blue-100">
                            Monitoring Data
                        </p>
                    </div>

                </div>

                <div>

                    <div className="flex items-center gap-2 text-blue-100">
                        <MdVerified />
                        Membership Management
                    </div>

                    <div className="flex items-center gap-2 text-blue-100 mt-2">
                        <MdVerified />
                        Appointment Reminder
                    </div>

                    <div className="flex items-center gap-2 text-blue-100 mt-2">
                        <MdVerified />
                        Loyalty Point System
                    </div>

                    <div className="flex items-center gap-2 text-blue-100 mt-2">
                        <MdVerified />
                        WhatsApp Integration
                    </div>

                    <p className="mt-8 text-sm text-blue-200">
                        Jl. Soekarno Hatta, Pekanbaru - Riau
                    </p>

                </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6">

                <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

                    <div className="text-center">

                        <div className="inline-flex bg-blue-100 p-4 rounded-2xl mb-4">

                            <MdLocalHospital
                                className="text-blue-600"
                                size={40}
                            />

                        </div>

                        <h2 className="text-3xl font-bold text-gray-800">
                            Welcome Back 👋
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Masuk ke Dashboard SIGIGI CRM
                        </p>

                    </div>

                    {error && (
                        <div className="mt-6 bg-red-100 text-red-700 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8"
                    >

                        <div className="mb-5">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>

                            <div className="relative">

                                <MdEmail
                                    className="absolute left-4 top-4 text-gray-400"
                                    size={20}
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={dataForm.email}
                                    onChange={handleChange}
                                    placeholder="admin@gmail.com"
                                    className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                />

                            </div>

                        </div>

                        <div className="mb-5">

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <MdLock
                                    className="absolute left-4 top-4 text-gray-400"
                                    size={20}
                                />

                                <input
                                    type="password"
                                    name="password"
                                    value={dataForm.password}
                                    onChange={handleChange}
                                    placeholder="Masukkan Password"
                                    className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                />

                            </div>

                        </div>

                        <div className="text-right mb-6">

                            <Link
                                to="/forgot"
                                className="text-blue-600 hover:underline text-sm"
                            >
                                Lupa Password?
                            </Link>

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                        >
                            Login
                            <MdArrowForward />
                        </button>

                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">

                        Belum punya akun?{" "}

                        <Link
                            to="/register"
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            Daftar Sekarang
                        </Link>

                    </p>

                    <div className="border-t mt-8 pt-5 text-center">

                        <p className="text-xs text-gray-400">
                            © 2026 SIGIGI CRM
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                            Klinik Sehat Senyum • Pekanbaru
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}