import { useState, useEffect, useRef } from "react";
import { 
    MdSearch, MdVisibility, MdDelete, MdEdit, 
    MdAdd, MdAccessTime, MdAttachMoney, MdCheckCircle, 
    MdCancel, MdNavigateBefore, MdNavigateNext, MdCategory 
} from "react-icons/md";
import { FaTooth } from "react-icons/fa";

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

// Import API Service Perawatan
import { perawatanAPI } from "../services/perawatanAPI";

const LIST_KATEGORI = [
    "Periodonsia",
    "Konservasi Gigi",
    "Pedodonsia",
    "Bedah Mulut",
    "Estetik Gigi",
    "Ortodonsia"
];

export default function Perawatan() {
    const [perawatanList, setPerawatanList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterKategori, setFilterKategori] = useState("Semua");
    const [filterStatus, setFilterStatus] = useState("Semua");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; 

    // Modal State
    const [selectedItem, setSelectedItem] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("detail");

    // Form State
    const [formNama, setFormNama] = useState("");
    const [formKategori, setFormKategori] = useState("");
    const [formHarga, setFormHarga] = useState("");
    const [formDurasi, setFormDurasi] = useState("30 Menit");
    const [formStatus, setFormStatus] = useState("Aktif");
    const [formDeskripsi, setFormDeskripsi] = useState("");
    const [formFoto, setFormFoto] = useState("");

    const searchInputRef = useRef(null);

    // ── FIX LOGIKA: KUNCI 8 GAMBAR DENTAL DOKTER GIGI ASLI (ANTI RANDOM/PANTAI) ──
    const getServiceImageUrl = (nama, fotoCustom) => {
        if (fotoCustom && fotoCustom.trim() !== "" && fotoCustom.startsWith("http")) {
            return fotoCustom;
        }

        const namaLower = (nama || "").toLowerCase();

        // 1. Scaling Gigi
        if (namaLower.includes("scaling") || namaLower.includes("karang") || namaLower.includes("pembersihan")) {
            return "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=600&q=80";
        }
        // 2. Tambal Gigi
        if (namaLower.includes("tambal") || namaLower.includes("composite") || namaLower.includes("sinar")) {
            return "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=600&q=80";
        }
        // 3. Cabut Gigi
        if (namaLower.includes("cabut") || namaLower.includes("pencabutan") || namaLower.includes("sulung") || namaLower.includes("molar")) {
            return "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&w=600&q=80";
        }
        // 4. Bleaching Gigi
        if (namaLower.includes("bleaching") || namaLower.includes("pemutih") || namaLower.includes("whitening")) {
            return "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80";
        }
        // 5. Behel / Orthodontic
        if (namaLower.includes("behel") || namaLower.includes("ortho") || namaLower.includes("kawat")) {
            return "https://images.unsplash.com/photo-1513415277900-a62401e5064e?auto=format&fit=crop&w=600&q=80";
        }
        // 6. Veneer Gigi
        if (namaLower.includes("veneer")) {
            return "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=600&q=80";
        }
        // 7. Implan Gigi
        if (namaLower.includes("implan") || namaLower.includes("implant")) {
            return "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?auto=format&fit=crop&w=600&q=80";
        }
        // 8. Gigi Palsu
        if (namaLower.includes("palsu") || namaLower.includes("tiruan")) {
            return "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80";
        }

        // Jalur cadangan default utama (Pasti gambar alat/dokter gigi profesional)
        return "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=600&q=80";
    };

    const fetchPerawatanData = async () => {
        try {
            setLoading(true);
            const data = await perawatanAPI.fetchPerawatan();
            setPerawatanList(data || []);
        } catch (error) {
            console.error("Gagal mengambil data perawatan:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Katalog Perawatan — SIGIGI";
        fetchPerawatanData();
        if (searchInputRef.current) searchInputRef.current.focus();
    }, []);

    const filteredPerawatan = perawatanList.filter((item) => {
        const namaLayanan = item.nama_perawatan || item.nama || "";
        const kategoriText = item.kategori || "";
        const statusText = item.status || "Aktif";

        const matchesSearch = namaLayanan.toLowerCase().includes(search.toLowerCase());
        const matchesKategori = filterKategori === "Semua" || kategoriText === filterKategori;
        const matchesStatus = filterStatus === "Semua" || statusText === filterStatus;

        return matchesSearch && matchesKategori && matchesStatus;
    });

    // Pagination Formula
    const totalPages = Math.ceil(filteredPerawatan.length / itemsPerPage) || 1;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPerawatan.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, filterKategori, filterStatus]);

    // Modal Actions
    const openTambah = () => {
        setFormNama("");
        setFormKategori(LIST_KATEGORI[0]);
        setFormHarga("");
        setFormDurasi("30 Menit");
        setFormStatus("Aktif");
        setFormDeskripsi("");
        setFormFoto("");
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
        setFormNama(item.nama_perawatan || item.nama || "");
        setFormKategori(item.kategori || LIST_KATEGORI[0]);
        setFormHarga(item.harga || "");
        setFormDurasi(item.durasi || "30 Menit");
        setFormStatus(item.status || "Aktif");
        setFormDeskripsi(item.deskripsi || "");
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
            nama_perawatan: formNama,
            kategori: formKategori,
            harga: parseFloat(formHarga) || 0,
            durasi: formDurasi,
            status: formStatus,
            deskripsi: formDeskripsi,
            foto: formFoto
        };
        try {
            await perawatanAPI.createPerawatan(payload);
            fetchPerawatanData();
            setDialogOpen(false);
        } catch (error) {
            alert("Gagal menambah data: " + error.message);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const payload = {
            nama_perawatan: formNama,
            kategori: formKategori,
            harga: parseFloat(formHarga) || 0,
            durasi: formDurasi,
            status: formStatus,
            deskripsi: formDeskripsi,
            foto: formFoto
        };
        try {
            await perawatanAPI.updatePerawatan(selectedItem.id, payload);
            fetchPerawatanData();
            setDialogOpen(false);
        } catch (error) {
            alert("Gagal memperbarui data: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await perawatanAPI.deletePerawatan(id);
            setPerawatanList(perawatanList.filter(p => p.id !== id));
            setDialogOpen(false);
        } catch (error) {
            alert("Gagal menghapus data: " + error.message);
        }
    };

    return (
        <div className="p-6 space-y-6 bg-slate-50/40 min-h-screen font-sans">
            
            {/* BANNER HEADER */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 rounded-3xl p-8 text-white shadow-md flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                        Katalog Tindakan & Perawatan
                    </h1>
                    <p className="text-blue-100 mt-1.5 text-sm font-medium opacity-90">
                        Kelola standar tarif, durasi estimasi, dan jenis layanan klinik secara realtime.
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
                        placeholder="Cari tindakan gigi..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 text-xs font-semibold rounded-xl border border-gray-100 bg-slate-50/60 outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
                <div className="flex gap-3 items-center flex-wrap">
                    <span className="text-gray-400 text-[11px] font-bold uppercase">Kategori:</span>
                    <Select value={filterKategori} onValueChange={setFilterKategori}>
                        <SelectTrigger className="w-[150px] h-[40px] rounded-xl text-xs font-bold border-gray-100 bg-white">
                            <SelectValue placeholder="Semua Kategori" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-100">
                            <SelectItem value="Semua" className="text-xs font-bold">Semua Kategori</SelectItem>
                            {LIST_KATEGORI.map((kat) => (
                                <SelectItem key={kat} value={kat} className="text-xs font-semibold">{kat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <span className="text-gray-400 text-[11px] font-bold uppercase">Status:</span>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-[130px] h-[40px] rounded-xl text-xs font-bold border-gray-100 bg-white">
                            <SelectValue placeholder="Semua Status" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-100">
                            <SelectItem value="Semua" className="text-xs font-bold">Semua Status</SelectItem>
                            <SelectItem value="Aktif" className="text-xs font-semibold">Aktif</SelectItem>
                            <SelectItem value="Nonaktif" className="text-xs font-semibold">Nonaktif</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <button
                        onClick={openTambah}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 h-[40px] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer whitespace-nowrap"
                    >
                        <MdAdd size={16} /> Tambah Layanan Baru
                    </button>
                </div>
            </div>

            {/* GRID CARDS LAYAKNYA KERTAS JANJI TEMU */}
            {loading ? (
                <div className="p-8 text-center text-gray-400 font-medium animate-pulse">🔄 Menyinkronkan data katalog...</div>
            ) : currentItems.length === 0 ? (
                <div className="p-8 text-center text-gray-400 font-medium bg-white rounded-3xl border border-gray-100">❌ Layanan tidak ditemukan.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentItems.map((item) => (
                        <div 
                            key={item.id} 
                            className="bg-white rounded-3xl border border-gray-100/90 p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3.5">
                                    <span className="bg-blue-50 text-blue-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-lg flex items-center gap-1">
                                        <MdCategory size={12} /> {item.kategori || "Umum"}
                                    </span>
                                    
                                    {item.status === "Nonaktif" ? (
                                        <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                            <MdCancel size={12} className="text-rose-500" /> Nonaktif
                                        </span>
                                    ) : (
                                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                            <MdCheckCircle size={12} className="text-emerald-500" /> Aktif
                                        </span>
                                    )}
                                </div>

                                {/* Gambar Klinik / Dokter Gigi ─ FIX PATERN & FALLBACK */}
                                <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 bg-slate-100 border border-slate-200 relative flex items-center justify-center">
                                    <img 
                                        src={getServiceImageUrl(item.nama_perawatan || item.nama, item.foto)} 
                                        alt={item.nama_perawatan || item.nama} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            // Jika URL gagal termuat/blokir, paksa pakai gambar cadangan dental clinic universal (anti pecah)
                                            e.target.src = "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=600&q=80";
                                        }}
                                    />
                                </div>

                                <h4 className="font-extrabold text-base text-gray-900 line-clamp-1">{item.nama_perawatan || item.nama || "-"}</h4>
                                <p className="text-xs font-semibold text-gray-400 mt-1 line-clamp-2 h-8 leading-relaxed">
                                    {item.deskripsi || "Deskripsi lengkap mengenai rincian prosedur, manfaat, serta pemeliharaan pasca tindakan dental medis."}
                                </p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Investasi Tarif</p>
                                        <p className="text-sm font-extrabold text-emerald-600 flex items-center gap-0.5 mt-0.5">
                                            <MdAttachMoney size={16} className="text-emerald-500 -ml-1" /> Rp {Number(item.harga || 0).toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Estimasi Waktu</p>
                                        <p className="text-xs font-extrabold text-blue-600 flex items-center gap-1 justify-end mt-1">
                                            <MdAccessTime size={14} className="text-blue-500" /> {item.durasi || "30 Menit"}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <button onClick={() => openDetail(item)} className="py-2 border border-blue-50 text-blue-600 hover:bg-blue-50 rounded-xl text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1">
                                        <MdVisibility size={14} /> Detail
                                    </button>
                                    <button onClick={() => openEdit(item)} className="py-2 border border-amber-50 text-amber-600 hover:bg-amber-50 rounded-xl text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1">
                                        <MdEdit size={14} /> Edit
                                    </button>
                                    <button onClick={() => openHapus(item)} className="py-2 border border-rose-50 text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold cursor-pointer transition flex items-center justify-center gap-1">
                                        <MdDelete size={14} /> Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* SINKRONISASI PAGINATION ── FIX BALANCED DI TENGAH UTAMA */}
            <div className="p-4 bg-white rounded-2xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-500 relative">
                
                {/* Info Text Kiri */}
                <p className="md:absolute md:left-4 text-center md:text-left">
                    Menampilkan <span className="text-gray-800">{currentItems.length ? indexOfFirstItem + 1 : 0}</span>-
                    <span className="text-gray-800">{indexOfFirstItem + currentItems.length}</span> dari <span className="text-blue-600">{filteredPerawatan.length}</span> katalog
                </p>
                
                {/* Pagination Navigasi (Pasti Center Sempurna karena w-full + justify-center) */}
                <div className="flex items-center justify-center gap-1.5 w-full">
                    <button 
                        disabled={currentPage === 1 || loading}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        className="w-8 h-8 bg-white rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40 transition cursor-pointer flex items-center justify-center shadow-sm"
                    >
                        <MdNavigateBefore size={18} />
                    </button>

                    {Array.from({ length: totalPages }).map((_, idx) => {
                        const pageNum = idx + 1;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-8 h-8 font-bold rounded-lg transition cursor-pointer flex items-center justify-center text-xs ${
                                    currentPage === pageNum
                                        ? "bg-blue-600 text-white shadow-sm border border-blue-600"
                                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button 
                        disabled={currentPage === totalPages || loading}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        className="w-8 h-8 bg-white rounded-lg border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-40 transition cursor-pointer flex items-center justify-center shadow-sm"
                    >
                        <MdNavigateNext size={18} />
                    </button>
                </div>
            </div>

            {/* DIALOGS SYSTEM */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md rounded-3xl p-6 bg-white border border-gray-100 shadow-xl">
                    
                    {/* MODAL ACTION: TAMBAH & EDIT */}
                    {(dialogMode === "tambah" || dialogMode === "edit") && (
                        <form onSubmit={dialogMode === "tambah" ? handleCreate : handleUpdate} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle className="text-base font-extrabold text-gray-900">
                                    {dialogMode === "tambah" ? "Registrasi Perawatan Medis Baru" : "Sesuaikan Parameter Perawatan"}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3 pt-2">
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Nama Tindakan Perawatan</label>
                                    <input required type="text" value={formNama} onChange={(e) => setFormNama(e.target.value)} placeholder="Contoh: Scaling Gigi Full Mouth" className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none"/>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Kategori Utama</label>
                                        <Select value={formKategori} onValueChange={setFormKategori}>
                                            <SelectTrigger className="w-full h-[36px] text-xs font-semibold border-gray-200 rounded-xl">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-gray-100">
                                                {LIST_KATEGORI.map(k => <SelectItem key={k} value={k} className="text-xs font-medium">{k}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Estimasi Durasi</label>
                                        <input required type="text" value={formDurasi} onChange={(e) => setFormDurasi(e.target.value)} placeholder="Contoh: 45 Menit" className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none"/>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Harga Satuan (IDR)</label>
                                        <input required type="number" value={formHarga} onChange={(e) => setFormHarga(e.target.value)} placeholder="350000" className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none"/>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Status Ketersediaan</label>
                                        <Select value={formStatus} onValueChange={setFormStatus}>
                                            <SelectTrigger className="w-full h-[36px] text-xs font-semibold border-gray-200 rounded-xl">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-gray-100">
                                                <SelectItem value="Aktif" className="text-xs font-medium text-emerald-600">Aktif</SelectItem>
                                                <SelectItem value="Nonaktif" className="text-xs font-medium text-rose-600">Nonaktif</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">URL Foto Kustom (Opsional)</label>
                                    <input type="text" value={formFoto} onChange={(e) => setFormFoto(e.target.value)} placeholder="Kosongkan untuk menggunakan foto dental bawaan AI" className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none"/>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Deskripsi & Rincian Medis</label>
                                    <textarea rows={3} value={formDeskripsi} onChange={(e) => setFormDeskripsi(e.target.value)} placeholder="Berikan info deskripsi medis ringkas..." className="w-full p-3 text-xs font-semibold rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"/>
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

                    {/* MODAL ACTION: DETAIL VIEW */}
                    {dialogMode === "detail" && selectedItem && (
                        <div className="space-y-4">
                            <DialogHeader>
                                <DialogTitle className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                                    <FaTooth className="text-blue-600" /> Detail Rincian Tindakan
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex justify-center py-1">
                                <img 
                                    src={getServiceImageUrl(selectedItem.nama_perawatan || selectedItem.nama, selectedItem.foto)} 
                                    alt="Foto Layanan" 
                                    className="w-24 h-24 object-cover rounded-2xl ring-4 ring-blue-500/5 shadow-sm"
                                    onError={(e) => {
                                        e.target.src = "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=600&q=80";
                                    }}
                                />
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-4 space-y-3 border border-gray-100 text-xs font-semibold">
                                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                                    <span className="text-gray-400">Nama Layanan</span>
                                    <span className="text-gray-800 font-bold">{selectedItem.nama_perawatan || selectedItem.nama || "-"}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                                    <span className="text-gray-400">Kategori Bedah</span>
                                    <span className="text-gray-700">{selectedItem.kategori || "-"}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                                    <span className="text-gray-400">Estimasi Waktu</span>
                                    <span className="text-gray-700 font-bold">{selectedItem.durasi || "30 Menit"}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200/60 pb-2">
                                    <span className="text-gray-400">Harga Klinik</span>
                                    <span className="text-emerald-600 font-extrabold">Rp {Number(selectedItem.harga || 0).toLocaleString("id-ID")}</span>
                                </div>
                                <div className="flex flex-col gap-1 pt-1">
                                    <span className="text-gray-400">Keterangan Medis:</span>
                                    <span className="bg-white p-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium leading-relaxed mt-1">
                                        {selectedItem.deskripsi || "Tidak tersedia deskripsi singkat."}
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

                    {/* MODAL ACTION: HAPUS */}
                    {dialogMode === "hapus" && selectedItem && (
                        <div className="space-y-4">
                            <DialogHeader>
                                <DialogTitle className="text-base font-extrabold text-rose-600">Eliminasi Tindakan Perawatan?</DialogTitle>
                            </DialogHeader>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                Apakah Anda yakin ingin menghapus layanan <span className="font-bold text-gray-800">"{selectedItem.nama_perawatan || selectedItem.nama}"</span> dari katalog utama?
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