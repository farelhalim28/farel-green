// ================================================
// LETAK FILE: src/pages/guest/AppointmentPage.jsx
// ================================================

import { useState } from "react";
// Mengimport objek janjiTemuAPI sesuai struktur baru
import { janjiTemuAPI } from "../../services/janjiTemuAPI"; 
import axios from "axios"; // Digunakan untuk bypass langsung dengan headers lengkap
import {
    MdCalendarMonth,
    MdPerson,
    MdPhone,
    MdMedicalServices,
    MdAccessTime,
    MdCheckCircle,
    MdAssignment,
    MdAttachMoney,
} from "react-icons/md";

export default function AppointmentPage() {
    const [formData, setFormData] = useState({
        nama_pasien: "",
        no_telepon: "",
        dokter: "drg. Farel Abdul Halim", 
        tanggal: "",
        jam_mulai: "",
        jam_selesai: "",
        jenis_perawatan: "Pembersihan Karang Gigi", 
        kategori: "Perawatan Umum",
        keluhan: "",
        biaya: 350000, 
        metode_bayar: "Tunai",
    });

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [errorMsg, setErrorMsg] = useState("");

    const handlePerawatanChange = (perawatan) => {
        let harga = 350000;
        if (perawatan === "Tambal Gigi") harga = 450000; 
        if (perawatan === "Cabut Gigi") harga = 500000;
        if (perawatan === "Bleaching / Pemutihan") harga = 1500000;
        if (perawatan === "Pemasangan Behel") harga = 6000000;
        if (perawatan === "Implant Gigi") harga = 8000000;

        setFormData((prev) => ({
            ...prev,
            jenis_perawatan: perawatan,
            biaya: harga,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "jenis_perawatan") {
            handlePerawatanChange(value);
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setErrorMsg("");

        // Format payload data sesuai struktur tabel appointments kamu di Supabase
        const payloadData = {
            nama_pasien: formData.nama_pasien,
            no_telepon: formData.no_telepon,
            dokter: formData.dokter,
            tanggal: formData.tanggal,
            jam_mulai: formData.jam_mulai,
            jam_selesai: formData.jam_selesai,
            jenis_perawatan: formData.jenis_perawatan,
            kategori: formData.kategori,
            biaya: formData.biaya,
            metode_bayar: formData.metode_bayar,
            patient_id: null, 
            no_antrian: "ANT-" + Math.floor(100 + Math.random() * 900), 
            no_rm: "RM-2026-" + Math.floor(100 + Math.random() * 900), 
            foto: "https://avatar.iran.liara.run/public/boy/1", 
            catatan_dokter: null,
            status: "Pending", 
            keluhan: formData.keluhan.trim() === "" ? "-" : formData.keluhan, 
        };
        
        try {
            // URL & API KEY DATA KAMU SUDAH AKU PASANG DISINI BRO! GAK AKAN KENA 401 LAGI
            const URL_SUPABASE = "https://hbhzdvmegcebkwalhfmh.supabase.co/rest/v1/appointments";
            const ANON_KEY = "sb_publishable_pOmGQPpegTn7tQMGmE1M1Q_wGvEPcJQ"; 

            // Kirim direct POST request dengan headers keamanan lengkap bawaan akun kamu
            await axios.post(URL_SUPABASE, payloadData, {
                headers: {
                    "apikey": ANON_KEY,
                    "Authorization": `Bearer ${ANON_KEY}`,
                    "Content-Type": "application/json",
                    "Prefer": "return=representation"
                }
            });

            setSuccess(true);
            setFormData({
                nama_pasien: "",
                no_telepon: "",
                dokter: "drg. Farel Abdul Halim",
                tanggal: "",
                jam_mulai: "",
                jam_selesai: "",
                jenis_perawatan: "Pembersihan Karang Gigi",
                kategori: "Perawatan Umum",
                keluhan: "",
                biaya: 350000,
                metode_bayar: "Tunai",
            });
        } catch (error) {
            console.error("Gagal melakukan booking:", error.response?.data || error.message);
            setErrorMsg("Gagal mengirim data janji temu. Silakan periksa koneksi atau database Anda.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* HERO BAR */}
            <section className="bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-500 text-white">
                <div className="max-w-7xl mx-auto px-6 py-24">
                    <h1 className="text-5xl font-bold">Booking Janji Temu</h1>
                    <p className="mt-4 text-blue-100 max-w-3xl">
                        Jadwalkan konsultasi dan perawatan gigi dengan mudah melalui sistem booking online SIGIGI.
                    </p>
                </div>
            </section>

            {/* MAIN CONTENT FORM */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm">
                        <h2 className="text-3xl font-bold mb-8">Form Booking Pasien</h2>

                        {success && (
                            <div className="mb-6 bg-green-100 text-green-700 p-4 rounded-xl flex items-center gap-3">
                                <MdCheckCircle size={24} className="shrink-0" />
                                <div>
                                    <p className="font-semibold">Booking berhasil dikirim!</p>
                                    <p className="text-sm">Data janji temu Anda telah dicatat dan terintegrasi langsung ke dashboard klinik.</p>
                                </div>
                            </div>
                        )}

                        {errorMsg && (
                            <div className="mb-6 bg-red-100 text-red-700 p-4 rounded-xl flex items-center gap-3">
                                <div>
                                    <p className="font-semibold">Oops! Terjadi kesalahan</p>
                                    <p className="text-sm">{errorMsg}</p>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="font-medium text-gray-700">Nama Pasien</label>
                                    <div className="relative mt-2">
                                        <MdPerson className="absolute left-4 top-4 text-gray-400" size={20} />
                                        <input
                                            type="text"
                                            name="nama_pasien"
                                            value={formData.nama_pasien}
                                            onChange={handleChange}
                                            required
                                            disabled={loading}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 disabled:bg-gray-100"
                                            placeholder="Nama Lengkap Pasien"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="font-medium text-gray-700">Nomor Telepon</label>
                                    <div className="relative mt-2">
                                        <MdPhone className="absolute left-4 top-4 text-gray-400" size={20} />
                                        <input
                                            type="tel"
                                            name="no_telepon"
                                            value={formData.no_telepon}
                                            onChange={handleChange}
                                            required
                                            disabled={loading}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 disabled:bg-gray-100"
                                            placeholder="08xxxxxxxxxx"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="font-medium text-gray-700">Pilih Dokter Gigi</label>
                                    <div className="relative mt-2">
                                        <MdPerson className="absolute left-4 top-4 text-gray-400" size={20} />
                                        <select
                                            name="dokter"
                                            value={formData.dokter}
                                            onChange={handleChange}
                                            disabled={loading}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white disabled:bg-gray-100"
                                        >
                                            <option value="drg. Farel Abdul Halim">drg. Farel Abdul Halim (Dokter Gigi Umum)</option>
                                            <option value="drg. Sarah Amanda">drg. Sarah Amanda (Orthodontist)</option>
                                            <option value="drg. Michael Wijaya">drg. Michael Wijaya (Aesthetic Dentist)</option>
                                            <option value="drg. Olivia Putri">drg. Olivia Putri (Implant Specialist)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="font-medium text-gray-700">Kategori Perawatan</label>
                                    <div className="relative mt-2">
                                        <MdAssignment className="absolute left-4 top-4 text-gray-400" size={20} />
                                        <select
                                            name="kategori"
                                            value={formData.kategori}
                                            onChange={handleChange}
                                            disabled={loading}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white disabled:bg-gray-100"
                                        >
                                            <option value="Perawatan Umum">Perawatan Umum</option>
                                            <option value="Perawatan Khusus">Perawatan Khusus</option>
                                            <option value="Konsultasi Rutin">Konsultasi Rutin</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="font-medium text-gray-700">Jenis Perawatan Gigi</label>
                                    <div className="relative mt-2">
                                        <MdMedicalServices className="absolute left-4 top-4 text-gray-400" size={20} />
                                        <select
                                            name="jenis_perawatan"
                                            value={formData.jenis_perawatan}
                                            onChange={handleChange}
                                            disabled={loading}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white disabled:bg-gray-100"
                                        >
                                            <option value="Pembersihan Karang Gigi">Pembersihan Karang Gigi (Scaling)</option>
                                            <option value="Tambal Gigi">Tambal Gigi</option>
                                            <option value="Cabut Gigi">Cabut Gigi</option>
                                            <option value="Bleaching / Pemutihan">Bleaching / Pemutihan</option>
                                            <option value="Pemasangan Behel">Pemasangan Behel</option>
                                            <option value="Implant Gigi">Implant Gigi</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="font-medium text-gray-700">Metode Pembayaran</label>
                                    <div className="relative mt-2">
                                        <MdAttachMoney className="absolute left-4 top-4 text-gray-400" size={20} />
                                        <select
                                            name="metode_bayar"
                                            value={formData.metode_bayar}
                                            onChange={handleChange}
                                            disabled={loading}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 bg-white disabled:bg-gray-100"
                                        >
                                            <option value="Tunai">Tunai</option>
                                            <option value="Transfer Bank">Transfer Bank</option>
                                            <option value="BPJS">BPJS</option>
                                            <option value="Qris">Qris / Debit</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="font-medium text-gray-700">Tanggal Periksa</label>
                                    <div className="relative mt-2">
                                        <MdCalendarMonth className="absolute left-4 top-4 text-gray-400" size={20} />
                                        <input
                                            type="date"
                                            name="tanggal"
                                            value={formData.tanggal}
                                            onChange={handleChange}
                                            required
                                            disabled={loading}
                                            className="w-full pl-11 pr-2 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 text-sm disabled:bg-gray-100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="font-medium text-gray-700">Jam Mulai</label>
                                    <div className="relative mt-2">
                                        <MdAccessTime className="absolute left-4 top-4 text-gray-400" size={20} />
                                        <input
                                            type="time"
                                            name="jam_mulai"
                                            value={formData.jam_mulai}
                                            onChange={handleChange}
                                            required
                                            disabled={loading}
                                            className="w-full pl-11 pr-2 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 text-sm disabled:bg-gray-100"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="font-medium text-gray-700">Jam Selesai</label>
                                    <div className="relative mt-2">
                                        <MdAccessTime className="absolute left-4 top-4 text-gray-400" size={20} />
                                        <input
                                            type="time"
                                            name="jam_selesai"
                                            value={formData.jam_selesai}
                                            onChange={handleChange}
                                            required
                                            disabled={loading}
                                            className="w-full pl-11 pr-2 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 text-sm disabled:bg-gray-100"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="font-medium text-gray-700">Keluhan Gigi (Opsional)</label>
                                <div className="mt-2">
                                    <textarea
                                        name="keluhan"
                                        rows="3"
                                        value={formData.keluhan}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className="w-full p-4 border border-gray-200 rounded-xl outline-none focus:border-blue-500 disabled:bg-gray-100"
                                        placeholder="Tuliskan keluhan atau gejala sakit gigi yang dirasakan..."
                                    ></textarea>
                                </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center text-blue-950 border border-blue-100">
                                <span className="font-medium">Total Biaya Perawatan:</span>
                                <span className="text-2xl font-bold">Rp {formData.biaya.toLocaleString("id-ID")}</span>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-semibold transition shadow-md hover:shadow-lg flex justify-center items-center"
                            >
                                {loading ? "Sedang Memproses..." : "Booking Sekarang"}
                            </button>
                        </form>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-800">Jam Operasional</h3>
                            <div className="mt-4 space-y-2 text-gray-600">
                                <p>Senin - Jumat : 08.00 - 20.00</p>
                                <p>Sabtu : 08.00 - 17.00</p>
                                <p>Minggu : Tutup</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-6 shadow-sm">
                            <h3 className="text-xl font-bold">Kenapa Booking Online?</h3>
                            <ul className="mt-4 space-y-3">
                                <li>✓ Praktis dan Cepat</li>
                                <li>✓ Pilih Jadwal Dokter Sendiri</li>
                                <li>✓ Terintegrasi Langsung ke Sistem Admin</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}