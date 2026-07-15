import { useState, useEffect, useRef } from "react";
import { 
    MdSearch, MdVisibility, MdDelete, MdEdit, 
    MdAdd, MdNavigateBefore, MdNavigateNext,
    MdWorkspacePremium, MdAccessTime, MdHistoryEdu
} from "react-icons/md";
import { FaUserMd } from "react-icons/fa";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Import API Service Dokter
import { dokterAPI } from "../services/dokterAPI";

const LIST_SPESIALISASI = [
    "Dokter Gigi Umum",
    "Spesialis Konservasi Gigi (Endodontis)",
    "Spesialis Ortodonsia (Orthodontist)",
    "Spesialis Bedah Mulut (Oral Surgeon)",
    "Spesialis Kedokteran Gigi Anak (Pedodontist)",
    "Spesialis Periodonsia (Periodontist)",
    "Aesthetic Dentist"
];

export default function Dokter() {
    const [dokterList, setDokterList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterSpesialisasi, setFilterSpesialisasi] = useState("Semua");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Modal State
    const [selectedItem, setSelectedItem] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("detail");

    // Form State
    const [formNama, setFormNama] = useState("");
    const [formSpesialisasi, setFormSpesialisasi] = useState("");
    const [formPengalaman, setFormPengalaman] = useState("");
    const [formSertifikasi, setFormSertifikasi] = useState("");
    const [formJadwal, setFormJadwal] = useState("");
    const [formFoto, setFormFoto] = useState("");

    const searchInputRef = useRef(null);

    // ── SISTEM AI AVATAR FALLBACK GENERATOR ──
    // Membuat avatar kartun/ilustrasi AI otomatis yang konsisten menggunakan seed nama dokter
    const getAvatarUrl = (nama, fotoCustom) => {
        if (fotoCustom && fotoCustom.trim() !== "" && fotoCustom.startsWith("http")) {
            return fotoCustom;
        }
        // Menggunakan library API Dicebear style 'lorelei' (avatar kartun estetik)
        return `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(nama || "dokter")}&backgroundColor=b6e3f4,c0aade,d1f4c9`;
    };

    const fetchDokterData = async () => {
        try {
            setLoading(true);
            const data = await dokterAPI.fetchDokter();
            setDokterList(data || []);
        } catch (error) {
            console.error("Gagal mengambil data dokter:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Katalog Dokter Gigi — SIGIGI";
        fetchDokterData();
        if (searchInputRef.current) searchInputRef.current.focus();
    }, []);

    // Filter Pencarian & Spesialisasi
    const filteredDokter = dokterList.filter((item) => {
        const namaDokter = item.nama || "";
        const spesialisasiText = item.spesialisasi || "";

        const matchesSearch = namaDokter.toLowerCase().includes(search.toLowerCase());
        const matchesSpesialisasi = filterSpesialisasi === "Semua" || spesialisasiText === filterSpesialisasi;

        return matchesSearch && matchesSpesialisasi;
    });

    // Pagination Formula
    const totalPages = Math.ceil(filteredDokter.length / itemsPerPage) || 1;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredDokter.slice(indexOfFirstItem, indexOfLastItem);

    // Render Pagination Pintar (Batasi Jumlah Angka Agar Rapi)
    const renderPaginationButtons = () => {
        const buttons = [];
        const maxVisible = 3;
        
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        if (startPage > 1) {
            buttons.push(
                <button key={1} onClick={() => setCurrentPage(1)} className="w-8 h-8 font-bold rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 text-xs cursor-pointer">1</button>
            );
            if (startPage > 2) {
                buttons.push(<span key="dots1" className="text-gray-400 px-1 text-xs">...</span>);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-8 h-8 font-bold rounded-lg transition text-xs cursor-pointer ${
                        currentPage === i
                            ? "bg-blue-600 text-white shadow-sm border border-blue-600"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(<span key="dots2" className="text-gray-400 px-1 text-xs">...</span>);
            }
            buttons.push(
                <button key={totalPages} onClick={() => setCurrentPage(totalPages)} className="w-8 h-8 font-bold rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 text-xs cursor-pointer">{totalPages}</button>
            );
        }

        return buttons;
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [search, filterSpesialisasi]);

    // Modal Handlers
    const openTambah = () => {
        setFormNama("");
        setFormSpesialisasi(LIST_SPESIALISASI[0]);
        setFormPengalaman("3 Tahun");
        setFormSertifikasi("Sertifikasi Konservasi Gigi Nasional");
        setFormJadwal("Senin - Jumat (09:00 - 15:00)");
        setFormFoto(""); // Dikosongkan agar otomatis memakai fallback Avatar AI
        setDialogMode("tambah");
        setDialogOpen(true);
    };

    const openDetail = (item) => {
        setSelectedItem(item);
        setDialogMode("detail");
        setDialogOpen(true);
    };

    const openEdit = (item) => {
        setSelectedItem(item);
        setFormNama(item.nama || "");
        setFormSpesialisasi(item.spesialisasi || LIST_SPESIALISASI[0]);
        setFormPengalaman(item.pengalaman || "");
        setFormSertifikasi(item.sertifikasi || "");
        setFormJadwal(item.jadwal || "");
        setFormFoto(item.foto || "");
        setDialogMode("edit");
        setDialogOpen(true);
    };

    const openHapus = (item) => {
        setSelectedItem(item);
        setDialogMode("hapus");
        setDialogOpen(true);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const payload = {
            nama: formNama,
            spesialisasi: formSpesialisasi,
            pengalaman: formPengalaman,
            sertifikasi: formSertifikasi,
            jadwal: formJadwal,
            foto: formFoto
        };

        try {
            await dokterAPI.createDokter(payload);
            fetchDokterData();
            setDialogOpen(false);
        } catch (error) {
            alert("Gagal menambahkan dokter: " + error.message);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const payload = {
            nama: formNama,
            spesialisasi: formSpesialisasi,
            pengalaman: formPengalaman,
            sertifikasi: formSertifikasi,
            jadwal: formJadwal,
            foto: formFoto
        };

        try {
            await dokterAPI.updateDokter(selectedItem.id, payload);
            fetchDokterData();
            setDialogOpen(false);
        } catch (error) {
            alert("Gagal memperbarui dokter: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await dokterAPI.deleteDokter(id);
            setDokterList(dokterList.filter(d => d.id !== id));
            setDialogOpen(false);
        } catch (error) {
            alert("Gagal menghapus dokter: " + error.message);
        }
    };

    return (
        <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen font-sans">
            
            {/* BANNER HEADER */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 rounded-3xl p-8 text-white shadow-md flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                        <FaUserMd /> Manajemen Dokter Gigi
                    </h1>
                    <p className="text-blue-100 mt-1.5 text-sm font-medium opacity-90">
                        Kelola data dokter lengkap beserta spesialisasi, pengalaman, sertifikasi, jadwal klinik, dan foto profil.
                    </p>
                </div>
            </div>

            {/* BAR FILTER & PENCARIAN */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex-1 relative">
                    <MdSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Cari dokter berdasarkan nama..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 text-xs font-semibold rounded-xl border border-gray-100 bg-slate-50/60 outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <span className="text-gray-400 text-[11px] font-bold uppercase whitespace-nowrap">Spesialisasi:</span>
                    <Select value={filterSpesialisasi} onValueChange={setFilterSpesialisasi}>
                        <SelectTrigger className="w-[200px] h-[40px] rounded-xl text-xs font-bold border-gray-100 bg-white">
                            <SelectValue placeholder="Semua Spesialis" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-100">
                            <SelectItem value="Semua" className="text-xs font-bold">Semua Spesialis</SelectItem>
                            {LIST_SPESIALISASI.map((spec) => (
                                <SelectItem key={spec} value={spec} className="text-xs font-semibold">
                                    {spec.replace("Spesialis ", "")}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    
                    <button
                        onClick={openTambah}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 h-[40px] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer whitespace-nowrap"
                    >
                        <MdAdd size={16} /> Tambah Dokter
                    </button>
                </div>
            </div>

            {/* TABEL DATA UTAMA */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-gray-100 text-slate-400 text-[11px] uppercase font-bold tracking-wider">
                                <th className="p-4 text-left w-20">ID</th>
                                <th className="p-4 text-left">Dokter</th>
                                <th className="p-4 text-left">Spesialisasi</th>
                                <th className="p-4 text-left">Pengalaman</th>
                                <th className="p-4 text-left">Jadwal Praktek</th>
                                <th className="p-4 text-center w-36">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-semibold text-gray-600 divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-400 font-medium animate-pulse">🔄 Mengunduh data dokter...</td>
                                </tr>
                            ) : currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-400 font-medium">❌ Data dokter tidak ditemukan.</td>
                                </tr>
                            ) : (
                                currentItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 text-indigo-600 font-bold font-mono">
                                            #{item.id}
                                        </td>
                                        <td className="p-4 flex items-center gap-3">
                                            {/* AI Avatar Fallback System */}
                                            <img 
                                                src={getAvatarUrl(item.nama, item.foto)} 
                                                alt={item.nama} 
                                                className="w-10 h-10 object-cover rounded-xl shadow-sm border border-slate-100 bg-slate-100"
                                                onError={(e) => {
                                                    // Jika link foto database rusak/404, fallback ke Dicebear SVG langsung
                                                    e.target.src = `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(item.nama || "dokter")}&backgroundColor=b6e3f4`;
                                                }}
                                            />
                                            <div>
                                                <h4 className="font-bold text-gray-900">{item.nama || "-"}</h4>
                                                <p className="text-[10px] text-gray-400 font-medium truncate max-w-[150px]" title={item.sertifikasi}>
                                                    {item.sertifikasi || "Belum ada sertifikasi"}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-700 font-bold">
                                            {item.spesialisasi || "-"}
                                        </td>
                                        <td className="p-4 text-emerald-700 font-medium">
                                            <span className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg w-fit text-[11px] font-bold">
                                                <MdWorkspacePremium size={14} /> {item.pengalaman || "0 Tahun"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-500 font-medium">
                                            <span className="flex items-center gap-1 text-slate-700">
                                                <MdAccessTime size={14} className="text-blue-500" /> {item.jadwal || "-"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            {/* RE-STYLING TOMBOL CRUD: WARNA TAJAM & INTERAKTIF */}
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button onClick={() => openDetail(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer" title="Lihat Detail">
                                                    <MdVisibility size={18} className="text-blue-600" />
                                                </button>
                                                <button onClick={() => openEdit(item)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-all cursor-pointer" title="Edit Data">
                                                    <MdEdit size={18} className="text-amber-500" />
                                                </button>
                                                <button onClick={() => openHapus(item)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer" title="Hapus Permanen">
                                                    <MdDelete size={18} className="text-rose-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* SINKRONISASI PAGINATION ── FIX RENDER MELUBER */}
                <div className="p-4 bg-slate-50 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-xs font-bold text-gray-500">
                    
                    {/* Sisi Kiri */}
                    <p className="text-center md:text-left order-2 md:order-1">
                        Menampilkan <span className="text-gray-800">{currentItems.length ? indexOfFirstItem + 1 : 0}</span>-
                        <span className="text-gray-800">{indexOfFirstItem + currentItems.length}</span> dari <span className="text-blue-600">{filteredDokter.length}</span> dokter
                    </p>
                    
                    {/* Sisi Tengah (PAGINATION RAPI & RINGKAS) */}
                    <div className="flex items-center justify-center gap-1.5 order-1 md:order-2">
                        <button 
                            disabled={currentPage === 1 || loading}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="w-8 h-8 bg-white rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition cursor-pointer flex items-center justify-center shadow-sm"
                        >
                            <MdNavigateBefore size={18} />
                        </button>

                        {renderPaginationButtons()}

                        <button 
                            disabled={currentPage === totalPages || loading}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className="w-8 h-8 bg-white rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition cursor-pointer flex items-center justify-center shadow-sm"
                        >
                            <MdNavigateNext size={18} />
                        </button>
                    </div>

                    {/* Sisi Kanan */}
                    <div className="hidden md:block order-3"></div>
                </div>
            </div>

            {/* DIALOGS SYSTEM */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md rounded-3xl p-6 bg-white border border-gray-100 shadow-xl">
                    
                    {/* FORM TAMBAH / EDIT DOKTER */}
                    {(dialogMode === "tambah" || dialogMode === "edit") && (
                        <form onSubmit={dialogMode === "tambah" ? handleCreate : handleUpdate} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle className="text-base font-extrabold text-gray-900">
                                    {dialogMode === "tambah" ? "Registrasi Dokter Baru" : "Edit Profil Dokter"}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3 pt-2">
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Nama Lengkap Dokter</label>
                                    <input required type="text" value={formNama} onChange={(e) => setFormNama(e.target.value)} placeholder="Contoh: drg. Farel Abdul Halim" className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none"/>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Spesialisasi</label>
                                        <Select value={formSpesialisasi} onValueChange={setFormSpesialisasi}>
                                            <SelectTrigger className="w-full h-[36px] text-xs font-semibold border-gray-200 rounded-xl">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-gray-100">
                                                {LIST_SPESIALISASI.map(s => <SelectItem key={s} value={s} className="text-xs font-medium">{s}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Pengalaman Kerja</label>
                                        <input required type="text" value={formPengalaman} onChange={(e) => setFormPengalaman(e.target.value)} placeholder="Contoh: 5 Tahun" className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none"/>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Sertifikasi / Keahlian</label>
                                    <input required type="text" value={formSertifikasi} onChange={(e) => setFormSertifikasi(e.target.value)} placeholder="Contoh: Sertifikasi Ortodonsia Internasional" className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none"/>
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Jadwal Praktik Klinik</label>
                                    <input required type="text" value={formJadwal} onChange={(e) => setFormJadwal(e.target.value)} placeholder="Contoh: Senin - Sabtu (08:00 - 16:00)" className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none"/>
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">URL Foto Profil Dokter (Opsional)</label>
                                    <input type="text" value={formFoto} onChange={(e) => setFormFoto(e.target.value)} placeholder="Kosongkan untuk memakai Avatar AI otomatis" className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none"/>
                                </div>
                            </div>
                            <DialogFooter className="pt-4 flex gap-2 justify-end">
                                <DialogClose asChild>
                                    <button type="button" className="px-4 py-2 border border-gray-200 hover:bg-slate-50 text-gray-500 font-bold text-xs rounded-xl cursor-pointer">Batal</button>
                                </DialogClose>
                                <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm">Simpan</button>
                            </DialogFooter>
                        </form>
                    )}

                    {/* MODAL VIEW DETAIL LENGKAP */}
                    {dialogMode === "detail" && selectedItem && (
                        <div className="space-y-4">
                            <DialogHeader>
                                <DialogTitle className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                                    <FaUserMd className="text-blue-600" /> Profil Detil Rekam Dokter
                                </DialogTitle>
                            </DialogHeader>
                            
                            {/* AI Avatar Display di Detail */}
                            <div className="flex justify-center pb-2">
                                <img 
                                    src={getAvatarUrl(selectedItem.nama, selectedItem.foto)} 
                                    alt={selectedItem.nama} 
                                    className="w-24 h-24 object-cover rounded-2xl ring-4 ring-blue-500/10 shadow-sm bg-slate-100"
                                />
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-4 space-y-3 border border-gray-100 text-xs font-semibold">
                                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                                    <span className="text-gray-400">ID Dokter</span>
                                    <span className="text-indigo-600 font-bold font-mono">#{selectedItem.id}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                                    <span className="text-gray-400">Nama Lengkap</span>
                                    <span className="text-gray-800 font-bold">{selectedItem.nama || "-"}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                                    <span className="text-gray-400">Spesialisasi</span>
                                    <span className="text-gray-700 font-bold">{selectedItem.spesialisasi || "-"}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                                    <span className="text-gray-400">Pengalaman Klinik</span>
                                    <span className="text-emerald-700 font-bold">{selectedItem.pengalaman || "-"}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                                    <span className="text-gray-400">Jadwal Praktek</span>
                                    <span className="text-slate-800 font-bold text-right max-w-[200px]">{selectedItem.jadwal || "-"}</span>
                                </div>
                                <div className="flex flex-col gap-1 pt-1">
                                    <span className="text-gray-400 flex items-center gap-1"><MdHistoryEdu /> Sertifikasi Kedokteran</span>
                                    <span className="text-slate-600 font-medium leading-relaxed bg-white border border-slate-200/60 p-2 rounded-xl mt-1">
                                        {selectedItem.sertifikasi || "Tidak ada sertifikasi khusus tercantum."}
                                    </span>
                                </div>
                            </div>
                            <DialogFooter className="pt-2">
                                <DialogClose asChild>
                                    <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer">Tutup Detail</button>
                                </DialogClose>
                            </DialogFooter>
                        </div>
                    )}

                    {/* MODAL HAPUS */}
                    {dialogMode === "hapus" && selectedItem && (
                        <div className="space-y-4">
                            <DialogHeader>
                                <DialogTitle className="text-base font-extrabold text-rose-600">Hapus Data Dokter?</DialogTitle>
                            </DialogHeader>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                Apakah Anda yakin ingin menghapus data dokter <span className="font-bold text-gray-800">"{selectedItem.nama}"</span>? Tindakan ini bersifat permanen pada database Supabase.
                            </p>
                            <DialogFooter className="pt-2 flex gap-2 justify-end">
                                <DialogClose asChild>
                                    <button className="px-4 py-2 border border-gray-200 hover:bg-slate-50 text-gray-500 font-bold text-xs rounded-xl cursor-pointer">Batal</button>
                                </DialogClose>
                                <button onClick={() => handleDelete(selectedItem.id)} className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm">Hapus Permanen</button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}