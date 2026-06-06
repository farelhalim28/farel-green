// ================================================
// LETAK FILE: src/pages/auth/Register.jsx
// ================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    MdEmail,
    MdLock,
    MdPerson,
    MdArrowBack,
    MdCheckCircle,
} from "react-icons/md";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        nama: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!form.nama || !form.email || !form.password) {
            setError("Semua field wajib diisi.");
            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(form.email)) {
            setError("Format email tidak valid.");
            return;
        }

        const userData = {
            nama: form.nama,
            email: form.email,
            password: form.password,
        };

        localStorage.setItem(
            "crmUser",
            JSON.stringify(userData)
        );

        setSuccess(
            "Akun berhasil dibuat. Mengalihkan ke halaman login..."
        );

        setTimeout(() => {
            navigate("/login");
        }, 2000);
    };

    return (
        <div className="min-h-screen flex">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 text-white p-12 flex-col justify-between">

                <div>

                    <div className="flex items-center gap-3 mb-10">

                        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
                            🦷
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold">
                                SIGIGI CRM
                            </h1>

                            <p className="text-blue-100">
                                Klinik Sehat Senyum
                            </p>
                        </div>

                    </div>

                    <h2 className="text-5xl font-bold leading-tight">
                        Buat Akun Baru
                        <br />
                        Dalam Hitungan Detik
                    </h2>

                    <p className="mt-6 text-lg text-blue-100 leading-relaxed">
                        Bergabunglah dengan sistem CRM Klinik Gigi modern
                        untuk mengelola pasien, janji temu,
                        rekam medis, pembayaran dan membership
                        secara terintegrasi.
                    </p>

                </div>

                <div className="bg-white/10 backdrop-blur rounded-3xl p-6">

                    <h3 className="font-bold text-xl mb-3">
                        Keunggulan Sistem
                    </h3>

                    <ul className="space-y-3 text-blue-100">
                        <li>✅ Manajemen Pasien Lengkap</li>
                        <li>✅ Rekam Medis Digital</li>
                        <li>✅ Membership & Loyalty Point</li>
                        <li>✅ Reminder Kontrol Otomatis</li>
                        <li>✅ Dashboard Real-Time</li>
                    </ul>

                </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">

                <div className="w-full max-w-md">

                    <div className="bg-white rounded-3xl shadow-xl p-8 border">

                        <div className="text-center mb-8">

                            <div className="text-5xl mb-3">
                                ✨
                            </div>

                            <h2 className="text-3xl font-bold text-gray-800">
                                Registrasi
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Buat akun baru untuk mulai menggunakan sistem
                            </p>

                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-5 text-sm">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 text-green-600 p-4 rounded-xl mb-5 text-sm flex items-center gap-2">
                                <MdCheckCircle />
                                {success}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Nama Lengkap
                                </label>

                                <div className="relative">

                                    <MdPerson className="absolute left-4 top-4 text-gray-400 text-xl" />

                                    <input
                                        type="text"
                                        name="nama"
                                        value={form.nama}
                                        onChange={handleChange}
                                        placeholder="Masukkan nama lengkap"
                                        className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Email
                                </label>

                                <div className="relative">

                                    <MdEmail className="absolute left-4 top-4 text-gray-400 text-xl" />

                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="nama@gmail.com"
                                        className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="block text-sm font-medium mb-2">
                                    Password
                                </label>

                                <div className="relative">

                                    <MdLock className="absolute left-4 top-4 text-gray-400 text-xl" />

                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Masukkan password"
                                        className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition text-white py-3 rounded-xl font-semibold shadow-lg"
                            >
                                Daftar Sekarang
                            </button>

                        </form>

                        <div className="text-center mt-6">

                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
                            >
                                <MdArrowBack />
                                Kembali ke Login
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}