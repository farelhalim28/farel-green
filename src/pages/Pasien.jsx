import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { pasienAPI } from "../services/pasienAPI"; // Menggunakan pasienAPI sesuai nama file lu

const supabaseRealtime = createClient(
    "https://hbhzdvmegcebkwalhfmh.supabase.co",
    "sb_publishable_pOmGQPpegTn7tQMGmE1M1Q_wGvEPcJQ"
);

// Import ikon dari react-icons/md
import {
    MdPersonAdd,
    MdEdit,
    MdDelete,
    MdRemoveRedEye,
    MdNavigateNext,
    MdNavigateBefore,
    MdSearch,
    MdLocalPhone,
    MdBadge,
    MdLocationOn,
    MdWc,
    MdStar,
    MdCalendarMonth
} from "react-icons/md";

const ITEMS_PER_PAGE = 5;
const MAX_PAGE_BUTTONS = 10;

export default function Pasien() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [currentData, setCurrentData] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // State fiks hanya menggunakan kolom yang ada di database Supabase lu
    const [formData, setFormData] = useState({
        kode_pasien: "",
        nama: "",
        jenis_kelamin: "Laki-laki",
        tanggal_lahir: "",
        no_telp: "",
        alamat: "",
        membership: "Regular"
    });

    const loadPatients = async () => {
        setLoading(true);
        try {
            // Memanggil pasienAPI
            const data = pasienAPI.fetchPasien 
                ? await pasienAPI.fetchPasien() 
                : await pasienAPI.fetchPatients();
            setPatients(data || []);
        } catch (error) {
            console.error("Gagal menarik data pasien:", error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadPatients();
    }, []);

    useEffect(() => {
        const channel = supabaseRealtime
            .channel("realtime-pasien")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "pasien" },
                () => {
                    loadPatients();
                }
            )
            .subscribe();

        return () => {
            supabaseRealtime.removeChannel(channel);
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const openCreateModal = () => {
        setCurrentData(null);
        const randomNum = Math.floor(100 + Math.random() * 900);
        setFormData({
            kode_pasien: `PSN-${randomNum}`,
            nama: "",
            jenis_kelamin: "Laki-laki",
            tanggal_lahir: "",
            no_telp: "",
            alamat: "",
            membership: "Regular"
        });
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setCurrentData(item);
        setFormData({
            kode_pasien: item.kode_pasien || "",
            nama: item.nama || "",
            jenis_kelamin: item.jenis_kelamin || "Laki-laki",
            tanggal_lahir: item.tanggal_lahir || "",
            no_telp: item.no_telp || "",
            alamat: item.alamat || "",
            membership: item.membership || "Regular"
        });
        setIsModalOpen(true);
    };

    const openDetailModal = (item) => {
        setSelectedPatient(item);
        setIsDetailOpen(true);
    };

    const closeDetailModal = () => {
        setSelectedPatient(null);
        setIsDetailOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                kode_pasien: formData.kode_pasien,
                nama: formData.nama,
                jenis_kelamin: formData.jenis_kelamin,
                tanggal_lahir: formData.tanggal_lahir,
                no_telp: formData.no_telp,
                alamat: formData.alamat,
                membership: formData.membership
            };

            if (currentData) {
                await pasienAPI.updatePasien(currentData.id, payload);
            } else {
                await pasienAPI.createPasien(payload);
            }
            setIsModalOpen(false);
            loadPatients();
        } catch (error) {
            alert("Operasi database pasien gagal: " + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data pasien ini secara permanen?")) {
            try {
                await pasienAPI.deletePasien(id);
                loadPatients();
            } catch (error) {
                alert("Gagal menghapus data pasien: " + error.message);
            }
        }
    };

    // Filter data berdasarkan search query
    const filteredPatients = patients.filter((p) =>
        p.nama?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.kode_pasien?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Perhitungan pagination frontend
    const totalCount = filteredPatients.length;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);

    const getMembershipColor = (level) => {
        switch (level) {
            case "Platinum": return "bg-purple-100 text-purple-700 border-purple-200";
            case "Gold": return "bg-amber-100 text-amber-700 border-amber-200";
            case "Silver": return "bg-slate-100 text-slate-700 border-slate-200";
            default: return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen font-sans">
            {/* HERO HEADER */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Data Master Pasien</h1>
                    <p className="text-blue-100 mt-2">Kelola informasi data klinis rekam medis pasien terintegrasi database.</p>
                </div>
                <button onClick={openCreateModal} className="bg-white text-blue-700 font-bold px-5 py-3 rounded-2xl shadow-md hover:bg-blue-50 transition-all flex items-center gap-2 cursor-pointer text-sm">
                    <MdPersonAdd className="text-xl" /> Tambah Pasien Baru
                </button>
            </div>

            {/* LIVE KONTROL & PENCARIAN */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative w-full md:w-96">
                    <MdSearch className="absolute left-3 top-3.5 text-gray-400 text-xl" />
                    <input 
                        type="text" 
                        placeholder="Cari nama pasien atau kode pasien..." 
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <div className="text-sm font-semibold text-gray-500">
                    Total: <span className="text-blue-700 font-bold">{totalCount}</span> Pasien Terfilter
                </div>
            </div>

            {/* MAIN DATA TABLE VIEW */}
            {loading && patients.length === 0 ? (
                <div className="text-center py-20 font-semibold text-gray-400 text-lg bg-white rounded-3xl shadow-sm border border-gray-100">Menghubungkan ke server pasien...</div>
            ) : currentItems.length === 0 ? (
                <div className="text-center py-20 font-semibold text-gray-400 text-lg bg-white rounded-3xl border border-gray-100 shadow-sm">Tidak ada data pasien ditemukan.</div>
            ) : (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100">
                                    <th className="py-4 px-6">Profil Pasien</th>
                                    <th className="py-4 px-6">No. Telepon</th>
                                    <th className="py-4 px-6">Gender</th>
                                    <th className="py-4 px-6">Tanggal Lahir</th>
                                    <th className="py-4 px-6 text-center">Membership</th>
                                    <th className="py-4 px-6 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                                {currentItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-base shrink-0 shadow-inner">
                                                    {item.nama ? item.nama.charAt(0).toUpperCase() : "?"}
                                                </div>
                                                <div>
                                                    <span className="font-bold text-gray-800 block group-hover:text-blue-700 transition-colors">{item.nama}</span>
                                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-flex items-center gap-1 mt-0.5"><MdBadge /> {item.kode_pasien}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-gray-600 font-medium inline-flex items-center gap-1">
                                                <MdLocalPhone className="text-gray-400" /> {item.no_telp || "-"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium">
                                                <MdWc className="text-gray-400" /> {item.jenis_kelamin || "Laki-laki"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-gray-600 font-medium">
                                            {item.tanggal_lahir ? new Date(item.tanggal_lahir).toLocaleDateString("id-ID") : "-"}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getMembershipColor(item.membership)}`}>
                                                {item.membership || "Regular"}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => openDetailModal(item)} title="Detail Pasien" className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors p-1">
                                                    <MdRemoveRedEye size={18} />
                                                </button>
                                                <button onClick={() => openEditModal(item)} title="Edit Pasien" className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors p-1">
                                                    <MdEdit size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} title="Hapus Pasien" className="text-red-500 hover:text-red-700 cursor-pointer transition-colors p-1">
                                                    <MdDelete size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 py-4 bg-gray-50 border-t border-gray-100">
                            <button
                                onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-700 bg-white font-bold hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <MdNavigateBefore size={20} />
                            </button>
                            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all cursor-pointer ${
                                        currentPage === pageNum
                                            ? "bg-blue-700 text-white shadow-md"
                                            : "border border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            ))}
                            <button
                                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-700 bg-white font-bold hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <MdNavigateNext size={20} />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* MODAL FORM */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            {currentData ? "📝 Update Data Pasien" : "✨ Daftarkan Pasien Baru"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Lengkap Pasien *</label>
                                    <input type="text" name="nama" required value={formData.nama} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-blue-600 focus:outline-none" placeholder="Nama lengkap pasien..."/>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">No. Telepon / WA *</label>
                                    <input type="text" name="no_telp" required value={formData.no_telp} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-blue-600 focus:outline-none" placeholder="08xxxxxxxxxx"/>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kode Pasien</label>
                                    <input type="text" name="kode_pasien" disabled value={formData.kode_pasien} className="w-full px-4 py-2.5 bg-gray-100 text-gray-500 font-bold text-sm rounded-xl cursor-not-allowed border border-gray-200"/>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tanggal Lahir *</label>
                                    <input type="date" name="tanggal_lahir" required value={formData.tanggal_lahir} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-blue-600 focus:outline-none"/>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Jenis Kelamin</label>
                                    <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:border-blue-600 focus:outline-none">
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Membership</label>
                                    <select name="membership" value={formData.membership} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:border-blue-600 focus:outline-none">
                                        <option value="Regular">Regular</option>
                                        <option value="Silver">Silver</option>
                                        <option value="Gold">Gold</option>
                                        <option value="Platinum">Platinum</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Alamat Rumah Lengkap</label>
                                <textarea name="alamat" rows="3" value={formData.alamat} onChange={handleInputChange} className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:border-blue-600 focus:outline-none" placeholder="Tulis alamat rumah domisili pasien..."></textarea>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-gray-500 bg-gray-100 font-bold text-sm cursor-pointer hover:bg-gray-200">Batal</button>
                                <button type="submit" className="px-5 py-2.5 rounded-xl text-white bg-blue-700 font-bold text-sm shadow-md cursor-pointer hover:bg-blue-800">Simpan Pasien</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL DETAIL PASIEN */}
            {isDetailOpen && selectedPatient && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative">
                        <div className="flex items-center gap-4 border-b border-gray-100 pb-4 mb-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-700 to-blue-500 text-white flex items-center justify-center font-bold text-2xl shadow-md">
                                {selectedPatient.nama ? selectedPatient.nama.charAt(0).toUpperCase() : "?"}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">{selectedPatient.nama}</h3>
                                <p className="text-blue-600 text-xs font-bold bg-blue-50 px-2.5 py-1 rounded-md mt-1 inline-block">Kode Pasien: {selectedPatient.kode_pasien}</p>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-700">
                            <div className="grid grid-cols-2 border-b border-dashed border-gray-100 pb-2">
                                <span className="text-gray-400 font-medium">No. Telepon / WA</span>
                                <span className="font-semibold text-right text-gray-800">{selectedPatient.no_telp || "-"}</span>
                            </div>
                            <div className="grid grid-cols-2 border-b border-dashed border-gray-100 pb-2">
                                <span className="text-gray-400 font-medium">Jenis Kelamin</span>
                                <span className="font-semibold text-right text-gray-800">{selectedPatient.jenis_kelamin}</span>
                            </div>
                            <div className="grid grid-cols-2 border-b border-dashed border-gray-100 pb-2">
                                <span className="text-gray-400 font-medium">Tanggal Lahir</span>
                                <span className="font-semibold text-right text-gray-800">
                                    {selectedPatient.tanggal_lahir ? new Date(selectedPatient.tanggal_lahir).toLocaleDateString("id-ID") : "-"}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 border-b border-dashed border-gray-100 pb-2">
                                <span className="text-gray-400 font-medium">Membership Level</span>
                                <span className="font-bold text-right text-purple-600">{selectedPatient.membership || "Regular"}</span>
                            </div>
                            <div className="p-3 bg-slate-50 rounded-xl border border-gray-200 text-xs text-gray-600 flex items-start gap-2">
                                <MdLocationOn className="mt-0.5 shrink-0 text-base text-gray-400" />
                                <div>
                                    <strong className="block text-gray-500 mb-0.5">Alamat Domisili Rumah:</strong>
                                    {selectedPatient.alamat || "Tidak ada alamat lengkap tercatat."}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                            <button onClick={closeDetailModal} className="px-6 py-2 rounded-xl text-white bg-blue-700 font-bold text-sm shadow-md hover:bg-blue-800 transition-colors cursor-pointer">
                                Tutup Detail
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}