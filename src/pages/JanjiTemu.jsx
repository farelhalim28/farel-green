import { useState, useEffect } from "react";
import { janjiTemuAPI } from "../services/janjiTemuAPI"; 
import { pasienAPI } from "../services/pasienAPI"; 
import { dokterAPI } from "../services/dokterAPI";
import { perawatanAPI } from "../services/perawatanAPI"; 
import { createClient } from "@supabase/supabase-js";

const supabaseRealtime = createClient(
    "https://hbhzdvmegcebkwalhfmh.supabase.co",
    "sb_publishable_pOmGQPpegTn7tQMGmE1M1Q_wGvEPcJQ"
);

import {
    MdCalendarMonth,
    MdAccessTime,
    MdPayments,
    MdMedicalServices,
    MdAdd,
    MdEdit,
    MdDelete,
    MdVisibility,
    MdNavigateNext,
    MdNavigateBefore
} from "react-icons/md";

const ITEMS_PER_PAGE = 6;

const toLocalDateString = (dateInput) => {
    const date = dateInput ? new Date(dateInput) : new Date();
    const tzOffset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
};

export default function JanjiTemu() {
    const [appointments, setAppointments] = useState([]);
    const [pasienList, setPasienList] = useState([]);
    const [dokterList, setDokterList] = useState([]);
    const [layananList, setLayananList] = useState([]); 
    
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentData, setCurrentData] = useState(null);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Menggunakan perawatan_rencana_id sesuai kolom database asli
    const [formData, setFormData] = useState({
        kode_janji: "",
        pasien_id: "",
        dokter_id: "",
        perawatan_rencana_id: "", 
        tanggal_janji: "",
        keluhan: "-",
        status_janji: "Menunggu"
    });

    useEffect(() => {
        fetchInitialData();
        fetchAppointments();

        const channel = supabaseRealtime
            .channel("realtime-janji-temu")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "janji_temu" },
                () => {
                    fetchAppointments();
                }
            )
            .subscribe();

        return () => {
            supabaseRealtime.removeChannel(channel);
        };
    }, []);

    useEffect(() => {
        const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [appointments, currentPage]);

    const fetchInitialData = async () => {
        try {
            const [pasienData, dokterData, layananData] = await Promise.all([
                pasienAPI.fetchPasien ? pasienAPI.fetchPasien() : pasienAPI.fetchPatients(),
                dokterAPI.fetchDokter(),
                perawatanAPI.fetchPerawatan()
            ]);
            setPasienList(pasienData || []);
            setDokterList(dokterData || []);
            setLayananList(layananData || []);
        } catch (error) {
            console.error("Gagal menarik data master:", error);
        }
    };

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const data = await janjiTemuAPI.fetchAppointments();
            setAppointments(data || []);
        } catch (error) {
            console.error("Gagal menarik data janji temu:", error);
        }
        setLoading(false);
    };

    const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = appointments.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 260, behavior: 'smooth' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const openCreateModal = () => {
        setCurrentData(null);
        const uniqueNumber = Math.floor(100 + Math.random() * 900);
        setFormData({
            kode_janji: `APT-2026-${uniqueNumber}`,
            pasien_id: pasienList[0]?.id || "",
            dokter_id: dokterList[0]?.id || "",
            perawatan_rencana_id: layananList[0]?.id || "", 
            tanggal_janji: toLocalDateString(new Date()),
            keluhan: "-",
            status_janji: "Menunggu"
        });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setCurrentData(item);
        setFormData({
            kode_janji: item.kode_janji,
            pasien_id: item.pasien_id ? item.pasien_id.toString() : "",
            dokter_id: item.dokter_id ? item.dokter_id.toString() : "",
            perawatan_rencana_id: item.perawatan_rencana_id ? item.perawatan_rencana_id.toString() : "", 
            tanggal_janji: item.tanggal_janji ? toLocalDateString(item.tanggal_janji) : "",
            keluhan: item.keluhan || "-",
            status_janji: item.status_janji
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                kode_janji: formData.kode_janji,
                pasien_id: parseInt(formData.pasien_id, 10),
                dokter_id: parseInt(formData.dokter_id, 10),
                perawatan_rencana_id: parseInt(formData.perawatan_rencana_id, 10), 
                tanggal_janji: formData.tanggal_janji,
                keluhan: formData.keluhan,
                status_janji: formData.status_janji
            };

            if (currentData) {
                await janjiTemuAPI.updateJanjiTemu(currentData.id, payload);
            } else {
                await janjiTemuAPI.createJanjiTemu(payload);
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
                await janjiTemuAPI.deleteJanjiTemu(id);
                fetchAppointments();
            } catch (error) {
                alert("Gagal menghapus data: " + error.message);
            }
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Selesai": return "bg-green-100 text-green-700";
            case "Menunggu": return "bg-yellow-100 text-yellow-700";
            case "Batal": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Janji Temu Pasien (Live DB)</h1>
                    <p className="text-blue-100 mt-2">Kelola jadwal otomatis sinkron berkala dengan database Supabase.</p>
                </div>
                <button onClick={openCreateModal} className="bg-white text-blue-700 font-bold px-5 py-3 rounded-2xl shadow-md hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer text-sm">
                    <MdAdd className="text-xl" /> Tambah Janji Temu Admin
                </button>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h4 className="text-gray-500 font-medium text-sm">Total Jadwal DB</h4>
                    <p className="text-3xl font-bold text-gray-800">{appointments.length}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h4 className="text-gray-500 font-medium text-sm">Menunggu</h4>
                    <p className="text-3xl font-bold text-yellow-600">{appointments.filter((x) => x.status_janji === "Menunggu").length}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h4 className="text-gray-500 font-medium text-sm">Selesai</h4>
                    <p className="text-3xl font-bold text-green-600">{appointments.filter((x) => x.status_janji === "Selesai").length}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h4 className="text-gray-500 font-medium text-sm">Batal</h4>
                    <p className="text-3xl font-bold text-red-600">{appointments.filter((x) => x.status_janji === "Batal").length}</p>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 font-semibold text-gray-400 text-lg">Menghubungkan ke Supabase...</div>
            ) : appointments.length === 0 ? (
                <div className="text-center py-20 font-semibold text-gray-400 text-lg bg-white rounded-3xl border border-gray-100 shadow-sm">Tidak ada janji temu ditemukan.</div>
            ) : (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {currentItems.map((item) => {
                            // Ambil data relasi perawatan yang ditarik lewat alias "perawatan"
                            const detailLayanan = item.perawatan;
                            return (
                                <div key={item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                                    <div>
                                        <div className="flex items-start justify-between gap-2 mb-5">
                                            <div>
                                                {/* Menggunakan item.dokter.nama sesuai database asli */}
                                                <span className="text-[10px] uppercase tracking-wider bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">Dokter: {item.dokter?.nama || "-"}</span>
                                                <h3 className="font-bold text-lg text-gray-800 mt-0.5">{item.pasien?.nama || "Guest Pasien"}</h3>
                                                <p className="text-gray-400 text-xs font-semibold">Kode: {item.kode_janji}</p>
                                            </div>
                                            <div className="flex gap-1 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                                                <button onClick={() => setSelectedDetail(item)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg cursor-pointer">
                                                    <MdVisibility size={16} />
                                                </button>
                                                <button onClick={() => openEditModal(item)} className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-lg cursor-pointer">
                                                    <MdEdit size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer">
                                                    <MdDelete size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-3 text-sm border-t border-gray-50 pt-4">
                                            <div className="flex items-center gap-3">
                                                <MdCalendarMonth className="text-gray-400 text-lg" />
                                                <p className="text-gray-600 font-medium">Tanggal: <span className="text-gray-900 font-semibold">{item.tanggal_janji ? new Date(item.tanggal_janji).toLocaleDateString("id-ID") : "-"}</span></p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <MdAccessTime className="text-gray-400 text-lg" />
                                                <p className="text-gray-600 font-medium">Waktu: <span className="text-gray-900 font-semibold">{item.tanggal_janji ? new Date(item.tanggal_janji).toLocaleTimeString("id-ID", {hour: '2-digit', minute:'2-digit'}) : "-"} WIB</span></p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <MdMedicalServices className="text-gray-400 text-lg" />
                                                <p className="text-gray-600 font-medium">Layanan: <span className="text-gray-900 font-semibold">{detailLayanan?.nama_perawatan || "-"}</span></p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <MdPayments className="text-gray-400 text-lg" />
                                                <p className="text-gray-600 font-medium">Biaya: <span className="text-blue-600 font-bold">Rp {detailLayanan?.harga?.toLocaleString("id-ID") || "0"}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 pt-3.5 border-t border-gray-100 flex justify-between items-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(item.status_janji)}`}>{item.status_janji}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-12 pt-4 pb-12">
                            <button
                                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-gray-200 text-gray-800 bg-white font-bold hover:bg-gray-50 transition-all disabled:opacity-30 disabled:hover:bg-white cursor-pointer"
                            >
                                <MdNavigateBefore size={24} />
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => {
                                const pageNum = index + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`w-12 h-12 flex items-center justify-center rounded-2xl font-bold text-base transition-all cursor-pointer ${
                                            currentPage === pageNum ? "bg-blue-600 text-white shadow-md" : "border-2 border-gray-200 text-gray-700 bg-white hover:bg-gray-50"
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

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

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentData ? "📝 Modifikasi Janji Temu" : "✨ Buat Jadwal Baru"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kode Janji</label>
                                    <input type="text" name="kode_janji" disabled value={formData.kode_janji} className="w-full px-4 py-2.5 bg-gray-100 text-gray-400 font-medium text-sm rounded-xl cursor-not-allowed"/>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Pilih Pasien</label>
                                    <select name="pasien_id" value={formData.pasien_id} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
                                        <option value="" disabled>-- Pilih Pasien --</option>
                                        {pasienList.map((p) => (
                                            <option key={p.id} value={p.id}>{p.nama} ({p.kode_pasien || 'Pasien'})</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Dokter</label>
                                    <select name="dokter_id" value={formData.dokter_id} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
                                        <option value="" disabled>-- Pilih Dokter --</option>
                                        {dokterList.map((d) => (
                                            <option key={d.id} value={d.id}>{d.nama}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Perawatan / Layanan</label>
                                    <select name="perawatan_rencana_id" value={formData.perawatan_rencana_id} onChange={handleInputChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
                                        <option value="" disabled>-- Pilih Perawatan --</option>
                                        {layananList.map((w) => (
                                            <option key={w.id} value={w.id}>{w.nama_perawatan}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tanggal Waktu</label>
                                    <input type="datetime-local" name="tanggal_janji" required value={formData.tanggal_janji} onChange={handleInputChange} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm"/>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Status</label>
                                    <select name="status_janji" value={formData.status_janji} onChange={handleInputChange} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
                                        <option value="Menunggu">Menunggu</option>
                                        <option value="Selesai">Selesai</option>
                                        <option value="Batal">Batal</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Keluhan</label>
                                <textarea name="keluhan" rows="2" value={formData.keluhan} onChange={handleInputChange} className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm"></textarea>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-gray-500 bg-gray-100 font-bold text-sm">Batal</button>
                                <button type="submit" className="px-5 py-2.5 rounded-xl text-white bg-blue-600 font-bold text-sm shadow-md">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {selectedDetail && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4 flex items-center gap-2 text-blue-600">
                            <MdVisibility /> Detail Janji Temu
                        </h2>
                        {(() => {
                            const detailLayanan = selectedDetail.perawatan;
                            return (
                                <div className="space-y-4 text-sm text-gray-700">
                                    <p><strong>Kode Janji:</strong> {selectedDetail.kode_janji}</p>
                                    <p><strong>Pasien:</strong> {selectedDetail.pasien?.nama || "-"}</p>
                                    <p><strong>Dokter:</strong> {selectedDetail.dokter?.nama || "-"}</p>
                                    <p><strong>Layanan:</strong> {detailLayanan?.nama_perawatan || "-"}</p>
                                    <p><strong>Biaya:</strong> Rp {detailLayanan?.harga?.toLocaleString("id-ID") || "0"}</p>
                                    <p><strong>Keluhan:</strong> {selectedDetail.keluhan || "-"}</p>
                                    <div className="flex justify-end pt-4">
                                        <button type="button" onClick={() => setSelectedDetail(null)} className="px-5 py-2 rounded-xl text-white bg-blue-600 font-bold text-sm">Tutup</button>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
}