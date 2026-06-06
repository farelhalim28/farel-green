// ================================================
// LETAK FILE: src/pages/auth/Forgot.jsx
// ================================================

import { useState } from "react";
import { Link } from "react-router-dom";
import {
    MdEmail,
    MdArrowBack,
    MdCheckCircle,
    MdLockReset,
} from "react-icons/md";

export default function Forgot() {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            setError("Email wajib diisi.");
            return;
        }

        if (!emailRegex.test(email)) {
            setError("Format email tidak valid.");
            return;
        }

        setSuccess(
            `Link reset password berhasil dikirim ke ${email}`
        );
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
                        Lupa Password?
                    </h2>

                    <p className="mt-6 text-lg text-blue-100 leading-relaxed">
                        Tidak perlu khawatir. Masukkan email akun Anda,
                        sistem akan mengirimkan instruksi reset password.
                    </p>

                </div>

                <div className="bg-white/10 backdrop-blur rounded-3xl p-6">

                    <h3 className="font-bold text-xl mb-4">
                        Bantuan Cepat
                    </h3>

                    <div className="space-y-3 text-blue-100">

                        <div>
                            📧 Gunakan email yang terdaftar
                        </div>

                        <div>
                            🔒 Password lama tetap aman
                        </div>

                        <div>
                            ⚡ Proses reset hanya beberapa menit
                        </div>

                        <div>
                            🦷 Dukungan Klinik Sehat Senyum
                        </div>

                    </div>

                </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">

                <div className="w-full max-w-md">

                    <div className="bg-white rounded-3xl shadow-xl p-8 border">

                        <div className="text-center mb-8">

                            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">

                                <MdLockReset
                                    size={40}
                                    className="text-blue-600"
                                />

                            </div>

                            <h2 className="text-3xl font-bold text-gray-800">
                                Reset Password
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Masukkan email untuk menerima link reset password
                            </p>

                        </div>

                        {error && (

                            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-5 text-sm">
                                {error}
                            </div>

                        )}

                        {success && (

                            <div className="bg-green-50 border border-green-200 text-green-600 p-4 rounded-xl mb-5 flex items-center gap-2 text-sm">

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
                                    Email
                                </label>

                                <div className="relative">

                                    <MdEmail className="absolute left-4 top-4 text-gray-400 text-xl" />

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="nama@gmail.com"
                                        className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-300"
                                    />

                                </div>

                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition"
                            >
                                Kirim Link Reset Password
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