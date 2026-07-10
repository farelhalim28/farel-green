import { useState, useEffect } from "react";
// 1. IMPORT API SERVICE DAN API_KEY/URL UNTUK CHANNEL REALTIME
import { janjiTemuAPI } from "../services/janjiTemuAPI"; 
import { createClient } from "@supabase/supabase-js";

// Buat instance lokal khusus realtime channel jika dibutuhkan langsung di page
const supabaseRealtime = createClient(
    "https://hbhzdvmegcebkwalhfmh.supabase.co",
    "sb_publishable_pOmGQPpegTn7tQMgmE1M1Q_wGvEPcJQ"
);

import {
    MdCalendarMonth,
    MdAccessTime,
    MdPayments,
    MdMedicalServices,
    MdAdd,
    MdEdit,
    MdDelete,
    MdNavigateNext,
    MdNavigateBefore
} from "react-icons/md";

// Batasi 6 item per halaman supaya pas di grid 3 kolom dan tidak memanjang ke bawah
const ITEMS_PER_PAGE = 6;

export default function JanjiTemu() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentData, setCurrentData] = useState(null);

    // STATE UTAMA PAGINATION
    const [currentPage, setCurrentPage] = useState(1);

    const [formData, setFormData] = useState({
        nama_pasien: "",
        no_rm: "",
        no_telepon: "",
        dokter: "drg. Farel Abdul Halim",
        tanggal: "",
        jam_mulai: "",
        jam_selesai: "",
        jenis_perawatan: "Pembersihan Karang Gigi",
        kategori: "Perawatan Umum",
        keluhan: "-",
        biaya: 350000,
        status: "Pending",
        metode_bayar: "Tunai"
    });

    // FETCH DATA UTAMA & REALTIME SINKRONISASI SUPABASE
    useEffect(() => {
        fetchAppointments();

        const channel = supabaseRealtime
            .channel("realtime-appointments")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "appointments" },
                (payload) => {
                    console.log("Ada perubahan data dari Guest/Sistem!", payload);
                    
                    if (payload.eventType === "INSERT") {
                        setAppointments((prev) => [payload.new, ...prev]);
                    } else if (payload.eventType === "UPDATE") {
                        setAppointments((prev) =>
                            prev.map((item) => (item.id === payload.new.id ? payload.new : item))
                        );
                    } else if (payload.eventType === "DELETE") {
                        setAppointments((prev) => prev.filter((item) => item.id !== payload.old.id));
                    }
                }
            )
            .subscribe();

        return () => {
            supabaseRealtime.removeChannel(channel);
        };
    }, []);

    // Proteksi halaman: Reset ke page terakhir jika data menyusut akibat dihapus
    useEffect(() => {
        const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [appointments, currentPage]);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const data = await janjiTemuAPI.fetchAppointments();
            setAppointments(data || []);
        } catch (error) {
            console.error("Gagal menarik data:", error);
        }
        setLoading(false);
    };

    // LOGIKA MATEMATIKA PAGINATION SINKRON
    const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = appointments.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Efek smooth scroll ke atas daftar janji temu saat pindah halaman
        window.scrollTo({ top: 260, behavior: 'smooth' });
    };

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
            biaya: harga
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "jenis_perawatan") {
            handlePerawatanChange(value);
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: name === "biaya" ? Number(value) : value
            }));
        }
    };

    const openCreateModal = () => {
        setCurrentData(null);
        const uniqueNumber = Math.floor(100 + Math.random() * 900);
        setFormData({
            nama_pasien: "",
            no_rm: `RM-2026-${uniqueNumber}`,
            no_telepon: "",
            dokter: "drg. Farel Abdul Halim",
            tanggal: new Date().toISOString().split("T")[0],
            jam_mulai: "09:00",
            jam_selesai: "09:30",
            jenis_perawatan: "Pembersihan Karang Gigi",
            kategori: "Perawatan Umum",
            keluhan: "-",
            biaya: 350000,
            status: "Pending",
            metode_bayar: "Tunai"
        });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setCurrentData(item);
        setFormData({
            nama_pasien: item.nama_pasien,
            no_rm: item.no_rm,
            no_telepon: item.no_telepon,
            dokter: item.dokter,
            tanggal: item.tanggal,
            jam_mulai: item.jam_mulai,
            jam_selesai: item.jam_selesai,
            jenis_perawatan: item.jenis_perawatan,
            kategori: item.kategori,
            keluhan: item.keluhan || "-",
            biaya: item.biaya,
            status: item.status,
            metode_bayar: item.metode_bayar
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentData) {
                await janjiTemuAPI.updateAppointment(currentData.id, formData);
            } else {
                const payloadNew = {
                    ...formData,
                    no_antrian: "ANT-" + Math.floor(100 + Math.random() * 900),
                    foto: "https://avatar.iran.liara.run/public/boy/1"
                };
                await janjiTemuAPI.createAppointment(payloadNew);
            }
            setIsModalOpen(false);
            fetchAppointments();
        } catch (error) {
            alert("Operasi database gagal: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus jadwal janji temu ini?")) {
            try {
                await janjiTemuAPI.deleteAppointment(id);
                fetchAppointments();
            } catch (error) {
                alert("Gagal menghapus data: " + error.message);
            }
        }
    };

    const renderInitialAvatar = (name) => {
        if (!name) return "?";
        const initial = name.charAt(0).toUpperCase();
        const colors = ["bg-blue-600 text-white", "bg-teal-600 text-white", "bg-purple-600 text-white"];
        const charCode = initial.charCodeAt(0) || 0;
        return (
            <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl ${colors[charCode % colors.length]}`}>
                {initial}
            </div>
        );
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Selesai": return "bg-green-100 text-green-700";
            case "Confirmed": return "bg-blue-100 text-blue-700";
            case "Pending": return "bg-yellow-100 text-yellow-700";
            case "Cancelled": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* TOP HEADER HERO */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Janji Temu Pasien (Live DB)</h1>
                    <p className="text-blue-100 mt-2">Kelola jadwal otomatis sinkron berkala dengan halaman booking guest pasien.</p>
                </div>
                <button onClick={openCreateModal} className="bg-white text-blue-700 font-bold px-5 py-3 rounded-2xl shadow-md hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer text-sm">
                    <MdAdd className="text-xl" /> Tambah Janji Temu Admin
                </button>
            </div>

            {/* LIVE KONTROL STATISTIK */}
            <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h4 className="text-gray-500 font-medium text-sm">Total Jadwal DB</h4>
                    <p className="text-3xl font-bold text-gray-800">{appointments.length}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h4 className="text-gray-500 font-medium text-sm">Confirmed</h4>
                    <p className="text-3xl font-bold text-blue-600">{appointments.filter((x) => x.status === "Confirmed").length}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h4 className="text-gray-500 font-medium text-sm">Pending</h4>
                    <p className="text-3xl font-bold text-yellow-600">{appointments.filter((x) => x.status === "Pending").length}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h4 className="text-gray-500 font-medium text-sm">Selesai</h4>
                    <p className="text-3xl font-bold text-green-600">{appointments.filter((x) => x.status === "Selesai").length}</p>
                </div>
            </div>

            {/* CARD LIST DENGAN SOLUSI PAGINATION FINAL */}
            {loading ? (
                <div className="text-center py-20 font-semibold text-gray-400 text-lg">Menghubungkan ke Supabase...</div>
            ) : appointments.length === 0 ? (
                <div className="text-center py-20 font-semibold text-gray-400 text-lg bg-white rounded-3xl border border-gray-100 shadow-sm">Tidak ada janji temu ditemukan.</div>
            ) : (
                <div className="space-y-8">
                    {/* Grid List Item Slicing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {currentItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <div className="flex items-start justify-between gap-2 mb-5">
                                        <div className="flex items-center gap-4">
                                            {renderInitialAvatar(item.nama_pasien)}
                                            <div>
                                                <span className="text-[10px] uppercase tracking-wider bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">Dokter: {item.dokter}</span>
                                                <h3 className="font-bold text-lg text-gray-800 mt-0.5">{item.nama_pasien}</h3>
                                                <p className="text-gray-400 text-xs font-semibold">{item.no_rm} | Antrian: {item.no_antrian}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                                            <button onClick={() => openEditModal(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"><MdEdit size={16} /></button>
                                            <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"><MdDelete size={16} /></button>
                                        </div>
                                    </div>
                                    <div className="space-y-3 text-sm border-t border-gray-50 pt-4">
                                        <div className="flex items-center gap-3"><MdCalendarMonth className="text-gray-400 text-lg" /><p className="text-gray-600 font-medium">Tanggal: <span className="text-gray-900 font-semibold">{item.tanggal}</span></p></div>
                                        <div className="flex items-center gap-3"><MdAccessTime className="text-gray-400 text-lg" /><p className="text-gray-600 font-medium">Waktu: <span className="text-gray-900 font-semibold">{item.jam_mulai} - {item.jam_selesai} WIB</span></p></div>
                                        <div className="flex items-center gap-3"><MdMedicalServices className="text-gray-400 text-lg" /><p className="text-gray-600 font-medium">Perawatan: <span className="text-gray-900 font-semibold">{item.jenis_perawatan}</span></p></div>
                                        <div className="flex items-center gap-3"><MdPayments className="text-gray-400 text-lg" /><p className="text-gray-600 font-medium">Biaya: <span className="text-blue-600 font-bold">Rp {item.biaya?.toLocaleString("id-ID")}</span></p></div>
                                        {item.keluhan && <div className="bg-slate-50 p-2 text-xs rounded-lg text-gray-500"><strong>Keluhan:</strong> {item.keluhan}</div>}
                                    </div>
                                </div>
                                <div className="mt-5 pt-3.5 border-t border-gray-100 flex justify-between items-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status)}`}>{item.status}</span>
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg font-bold">{item.metode_bayar}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* BLOK INTEGRASI UTAMA PAGINATION KOTAK ROUNDED ORANYE */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-12 pt-4 pb-12">
                            {/* Tombol Back (<) */}
                            <button
                                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-gray-200 text-gray-800 bg-white font-bold hover:bg-gray-50 transition-all disabled:opacity-30 disabled:hover:bg-white cursor-pointer"
                            >
                                <MdNavigateBefore size={24} />
                            </button>

                            {/* Mapping Angka Nomor Halaman */}
                            {Array.from({ length: totalPages }, (_, index) => {
                                const pageNum = index + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`w-12 h-12 flex items-center justify-center rounded-2xl font-bold text-base transition-all cursor-pointer ${
                                            currentPage === pageNum
                                                ? "bg-[#ff7d44] text-white shadow-lg shadow-orange-100 border-b-2 border-orange-600"
                                                : "border-2 border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            {/* Tombol Next (>) */}
                            <button
                                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-gray-200 text-gray-800 bg-white font-bold hover:bg-gray-50 transition-all disabled:opacity-30 disabled:hover:bg-white cursor-pointer"
                            >
                                <MdNavigateNext size={24} />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* MODAL WINDOWS FORM (CREATE / UPDATE) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentData ? "📝 Modifikasi Janji Temu" : "✨ Buat Jadwal Internal Baru"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Pasien</label>
                                    <input type="text" name="nama_pasien" required value={formData.nama_pasien} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-blue-500 focus:outline-none"/>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">No Telepon</label>
                                    <input type="tel" name="no_telepon" required value={formData.no_telepon} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-blue-500 focus:outline-none"/>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">No. Rekam Medis</label>
                                    <input type="text" name="no_rm" disabled value={formData.no_rm} className="w-full px-4 py-2.5 bg-gray-100 text-gray-400 font-medium text-sm rounded-xl cursor-not-allowed"/>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dokter Pemeriksa</label>
                                    <select name="dokter" value={formData.dokter} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
                                        <option value="drg. Farel Abdul Halim">drg. Farel Abdul Halim</option>
                                        <option value="drg. Sarah Amanda">drg. Sarah Amanda</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tanggal</label><input type="date" name="tanggal" required value={formData.tanggal} onChange={handleInputChange} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs"/></div>
                                <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Jam Mulai</label><input type="time" name="jam_mulai" required value={formData.jam_mulai} onChange={handleInputChange} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs"/></div>
                                <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Jam Selesai</label><input type="time" name="jam_selesai" required value={formData.jam_selesai} onChange={handleInputChange} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-xs"/></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Jenis Perawatan</label>
                                    <select name="jenis_perawatan" value={formData.jenis_perawatan} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
                                        <option value="Pembersihan Karang Gigi">Pembersihan Karang Gigi</option>
                                        <option value="Tambal Gigi">Tambal Gigi</option>
                                        <option value="Cabut Gigi">Cabut Gigi</option>
                                        <option value="Bleaching / Pemutihan">Bleaching / Pemutihan</option>
                                        <option value="Pemasangan Behel">Pemasangan Behel</option>
                                        <option value="Implant Gigi">Implant Gigi</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kategori</label>
                                    <select name="kategori" value={formData.kategori} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
                                        <option value="Perawatan Umum">Perawatan Umum</option>
                                        <option value="Perawatan Khusus">Perawatan Khusus</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div><label className="block text-xs font-bold text-gray-500 uppercase mb-1">Biaya (Rp)</label><input type="number" name="biaya" required value={formData.biaya} onChange={handleInputChange} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm"/></div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Selesai">Selesai</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Metode Bayar</label>
                                    <select name="metode_bayar" value={formData.metode_bayar} onChange={handleInputChange} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
                                        <option value="Tunai">Tunai</option>
                                        <option value="Transfer">Transfer</option>
                                        <option value="Qris">Qris</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Keluhan Pasien</label>
                                <textarea name="keluhan" rows="2" value={formData.keluhan} onChange={handleInputChange} className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm" placeholder="Tulis keluhan singkat..."></textarea>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-gray-500 bg-gray-100 font-bold text-sm">Batal</button>
                                <button type="submit" className="px-5 py-2.5 rounded-xl text-white bg-blue-600 font-bold text-sm shadow-md">Simpan ke DB</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}