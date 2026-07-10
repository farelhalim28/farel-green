// ================================================
// LETAK FILE: src/pages/Perawatan.jsx
// VERSI FULL SINKRON: CRUD MASTER PERAWATAN + UI PREMIUM
// ================================================

import { useState, useEffect, useRef } from "react";
import { 
    MdSearch, MdVisibility, MdDelete, MdEdit, 
    MdAdd, MdFilterList, MdLayers, MdAccessTime, 
    MdAttachMoney, MdBookmarkBorder
} from "react-icons/md";
import { FaTooth } from "react-icons/fa";

// ── Import komponen Dialog/Modal dari shadcn/ui ──
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

// ── Import komponen Select dari shadcn/ui ──
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import treatmentsData from "../data/treatments.json";

export default function Perawatan() {
    const [treatmentsList, setTreatmentsList] = useState(treatmentsData);
    const [search, setSearch] = useState("");
    const [filterKategori, setFilterKategori] = useState("Semua");
    const [filterStatus, setFilterStatus] = useState("Semua");
    
    // State Modal & CRUD Management
    const [selectedTreatment, setSelectedTreatment] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("detail"); // tambah, detail, edit, hapus

    // State Form Input untuk Tambah & Edit
    const [formNama, setFormNama] = useState("");
    const [formKategori, setFormKategori] = useState("Perawatan Rutin");
    const [formDurasi, setFormDurasi] = useState("30 Menit");
    const [formHarga, setFormHarga] = useState("");
    const [formStatus, setFormStatus] = useState("Aktif");

    const searchInputRef = useRef(null);

    useEffect(() => {
        document.title = "Master Perawatan — SIGIGI";
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // ── KUMPULAN AKSI CRUD ──
    
    const openTambah = () => {
        setFormNama("");
        setFormKategori("Perawatan Rutin");
        setFormDurasi("30 Menit");
        setFormHarga("");
        setFormStatus("Aktif");
        setDialogMode("tambah");
        setDialogOpen(true);
    };

    const openDetail = (item) => {
        setSelectedTreatment(item);
        setDialogMode("detail");
        setDialogOpen(true);
    };

    const openEdit = (item) => {
        setSelectedTreatment(item);
        setFormNama(item.nama_perawatan);
        setFormKategori(item.kategori);
        setFormDurasi(item.durasi);
        setFormHarga(item.harga);
        setFormStatus(item.status || "Aktif");
        setDialogMode("edit");
        setDialogOpen(true);
    };

    const openHapus = (item) => {
        setSelectedTreatment(item);
        setDialogMode("hapus");
        setDialogOpen(true);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        if (!formNama || !formHarga) return alert("Nama Perawatan dan Harga wajib diisi!");

        const nextId = treatmentsList.length > 0 ? Math.max(...treatmentsList.map(t => t.id)) + 1 : 1;
        const generatedKode = `PRW-${String(nextId).padStart(3, '0')}`;

        const newTreatment = {
            id: nextId,
            kode_perawatan: generatedKode,
            nama_perawatan: formNama,
            kategori: formKategori,
            durasi: formDurasi,
            harga: Number(formHarga),
            status: formStatus
        };

        setTreatmentsList([newTreatment, ...treatmentsList]);
        setDialogOpen(false);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setTreatmentsList(treatmentsList.map(t => {
            if (t.id === selectedTreatment.id) {
                return {
                    ...t,
                    nama_perawatan: formNama,
                    kategori: formKategori,
                    durasi: formDurasi,
                    harga: Number(formHarga),
                    status: formStatus
                };
            }
            return t;
        }));
        setDialogOpen(false);
    };

    const handleDelete = (id) => {
        setTreatmentsList(treatmentsList.filter(t => t.id !== id));
        setDialogOpen(false);
    };

    // ── FILTER DATA LOGIC ──
    const filteredTreatments = treatmentsList.filter((item) => {
        const matchSearch = 
            item.nama_perawatan.toLowerCase().includes(search.toLowerCase()) ||
            item.kode_perawatan.toLowerCase().includes(search.toLowerCase());
        const matchKategori = 
            filterKategori === "Semua" || item.kategori === filterKategori;
        const matchStatus = 
            filterStatus === "Semua" || (item.status || "Aktif") === filterStatus;

        return matchSearch && matchKategori && matchStatus;
    });

    // Ambil daftar kategori unik untuk dropdown filter
    const listKategoriUnik = ["Semua", ...new Set(treatmentsList.map(t => t.kategori))];

    return (
        <div className="p-6 space-y-6 bg-gray-50/40 min-h-screen font-sans">
            
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-3xl p-6 shadow-sm border border-gray-100 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                        <FaTooth className="text-blue-600 text-2xl" /> Master Perawatan
                    </h1>
                    <p className="text-sm font-medium text-gray-400 mt-1">
                        Kelola katalog layanan, paket tindakan medis, durasi operasional, dan standardisasi tarif klinik SIGIGI.
                    </p>
                </div>
                <button
                    onClick={openTambah}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 h-11 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-200 hover:scale-[1.02] cursor-pointer w-full sm:w-auto justify-center"
                >
                    <MdAdd size={18} /> Tambah Layanan
                </button>
            </div>

            {/* FILTER & PENCARIAN BAR */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="relative w-full lg:flex-1">
                    <MdSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Cari kode tindakan atau nama perawatan..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 text-sm font-medium rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                    />
                </div>

                <div className="flex gap-3 w-full lg:w-auto items-center flex-wrap sm:flex-nowrap">
                    <div className="flex flex-col w-full sm:w-[160px]">
                        <span className="text-[10px] font-bold text-gray-400 uppercase mb-1 px-1 tracking-wider">Kategori Tindakan</span>
                        <Select value={filterKategori} onValueChange={setFilterKategori}>
                            <SelectTrigger className="rounded-xl border-gray-200 font-semibold text-xs h-11 bg-slate-50/50">
                                <SelectValue placeholder="Semua Kategori" />
                            </SelectTrigger>
                            <SelectContent className="bg-white rounded-xl shadow-lg border-gray-100">
                                {listKategoriUnik.map((kat, i) => (
                                    <SelectItem key={i} value={kat}>{kat === "Semua" ? "Semua Kategori" : kat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col w-full sm:w-[140px]">
                        <span className="text-[10px] font-bold text-gray-400 uppercase mb-1 px-1 tracking-wider">Status Layanan</span>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="rounded-xl border-gray-200 font-semibold text-xs h-11 bg-slate-50/50">
                                <SelectValue placeholder="Semua" />
                            </SelectTrigger>
                            <SelectContent className="bg-white rounded-xl shadow-lg border-gray-100">
                                <SelectItem value="Semua">Semua Status</SelectItem>
                                <SelectItem value="Aktif" className="text-emerald-600 font-bold">🟢 Aktif</SelectItem>
                                <SelectItem value="Tidak Aktif" className="text-rose-500 font-bold">🔴 Non Aktif</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="hidden sm:flex self-end h-11 px-3 items-center justify-center bg-blue-50 text-blue-600 rounded-xl text-xs font-bold gap-1 min-w-[100px]">
                        <MdFilterList size={16} /> {filteredTreatments.length} Item
                    </div>
                </div>
            </div>

            {/* GRID LAYOUT KARTU PERAWATAN */}
            {filteredTreatments.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 text-gray-400 font-medium text-sm">
                    ❌ Tidak ditemukan jenis perawatan gigi yang sesuai dengan kriteria filter Anda.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                    {filteredTreatments.map((item) => {
                        const statusLayanan = item.status || "Aktif";
                        return (
                            <div
                                key={item.id}
                                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Atas: Icon & Badge Status */}
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="w-11 h-11 rounded-2xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-300">
                                            <FaTooth className="text-blue-600 group-hover:text-white text-lg transition-colors duration-300" />
                                        </div>
                                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${
                                            statusLayanan === "Aktif"
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                : "bg-rose-50 text-rose-700 border border-rose-100"
                                        }`}>
                                            {statusLayanan}
                                        </span>
                                    </div>

                                    {/* Tengah: Judul & Kategori */}
                                    <h3 className="font-bold text-gray-800 text-base leading-snug group-hover:text-blue-600 transition-colors mb-1">
                                        {item.nama_perawatan}
                                    </h3>
                                    <p className="text-xs font-semibold text-gray-400 tracking-wide uppercase mb-4 flex items-center gap-1">
                                        <MdBookmarkBorder /> {item.kategori}
                                    </p>

                                    {/* Informasi Detail Mini */}
                                    <div className="space-y-2 border-t border-gray-50 pt-3 text-xs font-medium text-gray-600">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Kode Layanan</span>
                                            <span className="font-mono font-bold text-gray-700 bg-gray-50 px-2 py-0.5 rounded text-[11px]">{item.kode_perawatan}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400">Estimasi Durasi</span>
                                            <span className="text-gray-700 flex items-center gap-1"><MdAccessTime className="text-gray-400" /> {item.durasi}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Bawah: Harga & Tombol Kontrol Tindakan */}
                                <div className="mt-5 pt-3 border-t border-gray-50 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tarif Klinik</p>
                                        <p className="font-extrabold text-blue-600 text-base">
                                            Rp {item.harga.toLocaleString("id-ID")}
                                        </p>
                                    </div>

                                    {/* SINKRON SEIRAMA DENGAN PASIEN & JANJI TEMU (VIEW - EDIT - DELETE) */}
                                    <div className="flex items-center gap-0.5 opacity-90 group-hover:opacity-100">
                                        <button 
                                            onClick={() => openDetail(item)}
                                            title="Detail Layanan"
                                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                                        >
                                            <MdVisibility size={16} />
                                        </button>
                                        <button 
                                            onClick={() => openEdit(item)}
                                            title="Ubah Layanan"
                                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                                        >
                                            <MdEdit size={16} />
                                        </button>
                                        <button 
                                            onClick={() => openHapus(item)}
                                            title="Hapus Layanan"
                                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                        >
                                            <MdDelete size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* SYSTEM DIALOG / MODAL (TAMBAH, DETAIL, EDIT, HAPUS) */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md rounded-3xl p-6 bg-white shadow-2xl border border-gray-100 overflow-hidden">
                    
                    {/* FORM TAMBAH (CREATE) & EDIT (UPDATE) */}
                    {(dialogMode === "tambah" || dialogMode === "edit") && (
                        <form onSubmit={dialogMode === "tambah" ? handleCreate : handleUpdate} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                        {dialogMode === "tambah" ? <MdAdd size={20}/> : <MdEdit size={20}/>}
                                    </div>
                                    {dialogMode === "tambah" ? "Registrasi Perawatan Baru" : "Perbarui Data Perawatan"}
                                </DialogTitle>
                                <DialogDescription className="text-xs text-gray-400">
                                    {dialogMode === "tambah" ? "Tambahkan jenis tindakan operasional gigi baru ke dalam sistem." : "Perbarui tarif, durasi, atau klasifikasi kategori tindakan."}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-3.5 text-xs">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Nama Tindakan Perawatan *</label>
                                    <input 
                                        type="text" required placeholder="Contoh: Scaling Gigi Tingkat Berat" value={formNama} onChange={(e)=>setFormNama(e.target.value)}
                                        className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500/20 font-medium text-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Kategori Kluster</label>
                                        <select value={formKategori} onChange={(e)=>setFormKategori(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 bg-white font-semibold text-gray-700">
                                            <option value="Perawatan Rutin">Perawatan Rutin</option>
                                            <option value="Perawatan Restoratif">Perawatan Restoratif</option>
                                            <option value="Pemeriksaan">Pemeriksaan</option>
                                            <option value="Estetik">Estetik</option>
                                            <option value="Bedah Mulut">Bedah Mulut</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Estimasi Waktu</label>
                                        <select value={formDurasi} onChange={(e)=>setFormDurasi(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 bg-white font-semibold text-gray-700">
                                            <option value="15 Menit">15 Menit</option>
                                            <option value="30 Menit">30 Menit</option>
                                            <option value="45 Menit">45 Menit</option>
                                            <option value="60 Menit">60 Menit</option>
                                            <option value="90 Menit">90 Menit</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Tarif Harga (Rp) *</label>
                                        <input 
                                            type="number" required placeholder="Contoh: 350000" value={formHarga} onChange={(e)=>setFormHarga(e.target.value)}
                                            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-blue-600 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Status Operasional</label>
                                        <select value={formStatus} onChange={(e)=>setFormStatus(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold text-gray-700">
                                            <option value="Aktif">🟢 Aktif</option>
                                            <option value="Tidak Aktif">🔴 Tidak Aktif</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="pt-3 gap-2 sm:gap-0">
                                <DialogClose asChild>
                                    <button type="button" className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer">Batal</button>
                                </DialogClose>
                                <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-100 cursor-pointer transition">
                                    {dialogMode === "tambah" ? "Simpan Layanan" : "Simpan Perubahan"}
                                </button>
                            </DialogFooter>
                        </form>
                    )}

                    {/* DETAIL COMPREHENSIVE (READ) */}
                    {dialogMode === "detail" && selectedTreatment && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <FaTooth size={16}/>
                                    </div> 
                                    Detail Katalog Perawatan
                                </DialogTitle>
                                <DialogDescription className="text-xs text-gray-400 font-medium">
                                    Informasi lengkap standarisasi klinis tindakan rekam medis SIGIGI.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="my-4 space-y-2.5 text-xs">
                                <div className="p-3 bg-slate-50/50 border border-gray-100 rounded-2xl flex justify-between items-center">
                                    <div>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Nama Layanan</p>
                                        <p className="text-sm font-extrabold text-gray-800 mt-0.5">{selectedTreatment.nama_perawatan}</p>
                                    </div>
                                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-lg">
                                        {selectedTreatment.kode_perawatan}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-slate-50/50 border border-gray-100 rounded-xl">
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><MdLayers/> Kategori</p>
                                        <p className="text-xs font-bold text-gray-700 mt-1">{selectedTreatment.kategori}</p>
                                    </div>
                                    <div className="p-3 bg-slate-50/50 border border-gray-100 rounded-xl">
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><MdAccessTime/> Durasi Medis</p>
                                        <p className="text-xs font-bold text-gray-700 mt-1">{selectedTreatment.durasi}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-blue-50/20 border border-blue-50 rounded-xl">
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><MdAttachMoney/> Tarif Standar</p>
                                        <p className="text-sm font-extrabold text-blue-600 mt-0.5">Rp {selectedTreatment.harga.toLocaleString("id-ID")}</p>
                                    </div>
                                    <div className="p-3 bg-slate-50/50 border border-gray-100 rounded-xl">
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Status Publikasi</p>
                                        <p className="text-xs font-bold text-gray-700 mt-1">
                                            {(selectedTreatment.status || "Aktif") === "Aktif" ? "🟢 AKTIF" : "🔴 NON-AKTIF"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <button className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer transition">
                                        Tutup Deskripsi
                                    </button>
                                </DialogClose>
                            </DialogFooter>
                        </>
                    )}

                    {/* KONFIRMASI HAPUS (DELETE) */}
                    {dialogMode === "hapus" && selectedTreatment && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-lg font-bold text-gray-800">Hapus Katalog Layanan</DialogTitle>
                                <DialogDescription className="text-xs text-gray-400 font-medium">
                                    Apakah Anda yakin ingin membuang layanan ini? Tindakan ini dapat memengaruhi data riwayat rekam medis janji temu pasien.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="my-4 flex justify-between items-center p-3.5 bg-rose-50 border border-rose-100 rounded-xl">
                                <div>
                                    <p className="font-bold text-gray-800 text-sm">{selectedTreatment.nama_perawatan}</p>
                                    <p className="text-xs font-mono font-bold text-gray-400 mt-0.5">{selectedTreatment.kode_perawatan}</p>
                                </div>
                                <p className="font-extrabold text-rose-600 text-sm">Rp {selectedTreatment.harga.toLocaleString("id-ID")}</p>
                            </div>

                            <DialogFooter className="gap-2 sm:gap-0">
                                <DialogClose asChild>
                                    <button className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer">
                                        Batalkan
                                    </button>
                                </DialogClose>
                                <button 
                                    onClick={() => handleDelete(selectedTreatment.id)}
                                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-sm"
                                >
                                    Ya, Hapus Layanan
                                </button>
                            </DialogFooter>
                        </>
                    )}

                </DialogContent>
            </Dialog>

        </div>
    );
}