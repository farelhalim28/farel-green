import { useState, useEffect, useRef } from "react";
import { 
    MdSearch, MdVisibility, MdDelete, MdEdit, 
    MdAdd, MdFilterList, MdCalendarToday, MdAssignment,
    MdMedicalServices, MdRateReview, MdPerson, MdNavigateBefore, MdNavigateNext
} from "react-icons/md";
import { FaFileMedical, FaUserMd } from "react-icons/fa";

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

// ── IMPORT API SERVICES ──
import { rekamMedisAPI } from "../services/rekamMedisAPI";
import { pasienAPI } from "../services/pasienAPI";
import { perawatanAPI } from "../services/perawatanAPI";
import { dokterAPI } from "../services/dokterAPI"; 

export default function RekamMedis() {
    const [recordsList, setRecordsList] = useState([]);
    const [pasienList, setPasienList] = useState([]);
    const [perawatanList, setPerawatanList] = useState([]);
    const [dokterList, setDokterList] = useState([]); 
    
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterPerawatan, setFilterPerawatan] = useState("Semua");

    // ── Pagination State ──
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    // State Modal Management (Variabel Utama Tetap selectedRecord)
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("detail"); // "detail" | "tambah" | "edit" | "hapus"

    // Form Inputs State (SINKRON DENGAN KOLOM DATABASE SUPABASE)
    const [formPasienId, setFormPasienId] = useState("");
    const [formDokterId, setFormDokterId] = useState(""); 
    const [formPerawatanId, setFormPerawatanId] = useState("");
    const [formTanggal, setFormTanggal] = useState("");
    const [formCatatanDokter, setFormCatatanDokter] = useState(""); // Menampung catatan_dokter

    const searchInputRef = useRef(null);

    // Load semua data master dari Supabase
    const loadAllMasterData = async () => {
        try {
            setLoading(true);
            const [records, pasiens, perawatans, dokters] = await Promise.all([
                rekamMedisAPI.fetchRekamMedis(),
                pasienAPI.fetchPasien ? pasienAPI.fetchPasien() : pasienAPI.fetchPatients(),
                perawatanAPI.fetchPerawatan ? perawatanAPI.fetchPerawatan() : perawatanAPI.fetchLayanan(),
                dokterAPI.fetchDokter ? dokterAPI.fetchDokter() : dokterAPI.fetchDoctors()
            ]);

            setRecordsList(records || []);
            setPasienList(pasiens || []);
            setPerawatanList(perawatans || []);
            setDokterList(dokters || []);
        } catch (error) {
            console.error("Gagal sinkronisasi data master Rekam Medis:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllMasterData();
        if (searchInputRef.current) searchInputRef.current.focus();
    }, []);

    // Filter data berdasarkan nama pasien dan jenis perawatan
    const filteredRecords = recordsList.filter((item) => {
        const namaPasien = item.pasien?.nama || "";
        const namaPerawatan = item.perawatan?.nama_perawatan || "";

        const matchesSearch = namaPasien.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filterPerawatan === "Semua" || namaPerawatan === filterPerawatan;

        return matchesSearch && matchesFilter;
    });

    // Pagination Formula
    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);

    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-8 h-8 font-bold rounded-lg transition text-xs cursor-pointer ${
                        currentPage === i
                            ? "bg-blue-700 text-white shadow-sm border border-blue-700"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [search, filterPerawatan]);

    // Modal Actions Trigger (Sudah diperbaiki dari selectedItem -> selectedRecord)
    const openTambah = () => {
        if (pasienList.length === 0 || perawatanList.length === 0 || dokterList.length === 0) {
            alert("Harap pastikan data master Pasien, Perawatan, dan Dokter sudah tersedia!");
            return;
        }
        setSelectedRecord(null);
        setFormPasienId(pasienList[0]?.id.toString());
        setFormDokterId(dokterList[0]?.id.toString());
        setFormPerawatanId(perawatanList[0]?.id.toString());
        setFormTanggal(new Date().toISOString().split("T")[0]);
        setFormCatatanDokter("");
        setDialogMode("tambah");
        setDialogOpen(true);
    };

    const openDetail = (item) => {
        setSelectedRecord(item);
        setDialogMode("detail");
        setDialogOpen(true);
    };

    const openEdit = (item) => {
        setSelectedRecord(item);
        setFormPasienId(item.pasien_id?.toString() || item.id_pasien?.toString() || "");
        setFormDokterId(item.dokter_id?.toString() || item.id_dokter?.toString() || "");
        setFormPerawatanId(item.perawatan_id?.toString() || item.id_perawatan?.toString() || "");
        setFormTanggal(item.tanggal_periksa ? item.tanggal_periksa.split("T")[0] : "");
        setFormCatatanDokter(item.catatan_dokter || ""); // Ambil kolom catatan_dokter dari database
        setDialogMode("edit");
        setDialogOpen(true);
    };

    const openHapus = (item) => {
        setSelectedRecord(item);
        setDialogMode("hapus");
        setDialogOpen(true);
    };

    // Form Submit Handlers
    const handleCreate = async (e) => {
        e.preventDefault();
        const payload = {
            pasien_id: parseInt(formPasienId),
            dokter_id: parseInt(formDokterId),
            perawatan_id: parseInt(formPerawatanId),
            tanggal_periksa: formTanggal,
            catatan_dokter: formCatatanDokter // Sinkron key database
        };

        try {
            await rekamMedisAPI.createRekamMedis(payload);
            loadAllMasterData();
            setDialogOpen(false);
        } catch (error) {
            alert("Gagal menyimpan rekam medis baru: " + error.message);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const payload = {
            pasien_id: parseInt(formPasienId),
            dokter_id: parseInt(formDokterId),
            perawatan_id: parseInt(formPerawatanId),
            tanggal_periksa: formTanggal,
            catatan_dokter: formCatatanDokter // Sinkron key database
        };

        try {
            await rekamMedisAPI.updateRekamMedis(selectedRecord.id, payload);
            loadAllMasterData();
            setDialogOpen(false);
        } catch (error) {
            alert("Gagal mengupdate data rekam medis: " + error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            await rekamMedisAPI.deleteRekamMedis(id);
            setRecordsList(recordsList.filter((r) => r.id !== id));
            setDialogOpen(false);
        } catch (error) {
            alert("Gagal menghapus log rekam medis: " + error.message);
        }
    };

    return (
        <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen font-sans">
            
            {/* HERO HEADER */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 rounded-3xl p-8 text-white shadow-md flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                        <FaFileMedical /> Rekam Medis Pasien
                    </h1>
                    <p className="text-blue-100 mt-1.5 text-sm font-medium opacity-90">
                        Pencatatan riwayat medis gigi, tindakan klinis, dan catatan dokter pemeriksa secara terintegrasi.
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
                        placeholder="Cari pasien berdasarkan nama..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 text-xs font-semibold rounded-xl border border-gray-100 bg-slate-50/60 outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
                <div className="flex gap-3 items-center">
                    <span className="text-gray-400 text-[11px] font-bold uppercase whitespace-nowrap">Filter Perawatan:</span>
                    <Select value={filterPerawatan} onValueChange={setFilterPerawatan}>
                        <SelectTrigger className="w-[200px] h-[40px] rounded-xl text-xs font-bold border-gray-100 bg-white">
                            <SelectValue placeholder="Semua Perawatan" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-gray-100">
                            <SelectItem value="Semua" className="text-xs font-bold">Semua Perawatan</SelectItem>
                            {perawatanList.map((p) => (
                                <SelectItem key={p.id} value={p.nama_perawatan} className="text-xs font-semibold">
                                    {p.nama_perawatan}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    
                    <button
                        onClick={openTambah}
                        className="bg-blue-700 hover:bg-blue-800 text-white px-5 h-[40px] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer whitespace-nowrap"
                    >
                        <MdAdd size={16} /> Tambah Log Medis
                    </button>
                </div>
            </div>

            {/* TABEL UTAMA */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-gray-100 text-slate-400 text-[11px] uppercase font-bold tracking-wider">
                                <th className="p-4 text-left w-24">ID Log</th>
                                <th className="p-4 text-left">Pasien</th>
                                <th className="p-4 text-left">Dokter Pemeriksa</th>
                                <th className="p-4 text-left">Tindakan Perawatan</th>
                                <th className="p-4 text-left">Catatan Dokter</th>
                                <th className="p-4 text-left w-32">Tanggal Periksa</th>
                                <th className="p-4 text-center w-32">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-semibold text-gray-600 divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="p-8 text-center text-gray-400 font-medium">🔄 Sedang menyinkronkan rekam medis...</td>
                                </tr>
                            ) : currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-8 text-center text-gray-400 font-medium">❌ Belum ada riwayat rekam medis tercatat.</td>
                                </tr>
                            ) : (
                                currentItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 text-indigo-600 font-bold font-mono">#{item.id}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-bold">
                                                    <MdPerson size={16} />
                                                </div>
                                                <span className="font-bold text-gray-900">{item.pasien?.nama || "Tidak Diketahui"}</span>
                                            </div>
                                        </td>
                                        {/* KOLOM DOKTER PEMERIKSA SUDAH MUNCUL DARI DATA REAL DOKTER */}
                                        <td className="p-4 text-gray-800 font-bold">
                                            <div className="flex items-center gap-2">
                                                <FaUserMd className="text-indigo-600" size={14} />
                                                <span>{item.dokter?.nama_dokter || item.dokter?.nama || "Dokter Jaga"}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-indigo-700 font-bold">
                                            <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg">
                                                {item.perawatan?.nama_perawatan || "Tindakan Umum"}
                                            </span>
                                        </td>
                                        {/* KOLOM CATATAN DOKTER DARI DATABASE */}
                                        <td className="p-4 text-gray-500 max-w-[200px] truncate" title={item.catatan_dokter}>
                                            {item.catatan_dokter || "-"}
                                        </td>
                                        <td className="p-4 font-mono text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <MdCalendarToday className="text-gray-400" size={14} /> 
                                                {item.tanggal_periksa ? new Date(item.tanggal_periksa).toLocaleDateString("id-ID") : "-"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <button onClick={() => openDetail(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer">
                                                    <MdVisibility size={18} />
                                                </button>
                                                <button onClick={() => openEdit(item)} className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-lg transition-all cursor-pointer">
                                                    <MdEdit size={18} />
                                                </button>
                                                <button onClick={() => openHapus(item)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer">
                                                    <MdDelete size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION PANEL */}
                <div className="p-4 bg-slate-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-500">
                    <p>
                        Menampilkan <span className="text-gray-800">{currentItems.length ? indexOfFirstItem + 1 : 0}</span>-
                        <span className="text-gray-800">{indexOfFirstItem + currentItems.length}</span> dari <span className="text-blue-600">{filteredRecords.length}</span> log medis
                    </p>
                    <div className="flex items-center gap-1.5">
                        <button 
                            disabled={currentPage === 1 || loading}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="w-8 h-8 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition cursor-pointer flex items-center justify-center shadow-sm"
                        >
                            <MdNavigateBefore size={18} />
                        </button>
                        {renderPaginationButtons()}
                        <button 
                            disabled={currentPage === totalPages || loading}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className="w-8 h-8 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 transition cursor-pointer flex items-center justify-center shadow-sm"
                        >
                            <MdNavigateNext size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL DIALOG CONTROLLER */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md rounded-3xl p-6 bg-white border border-gray-100 shadow-xl">
                    
                    {/* FORM TAMBAH / EDIT */}
                    {(dialogMode === "tambah" || dialogMode === "edit") && (
                        <form onSubmit={dialogMode === "tambah" ? handleCreate : handleUpdate} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle className="text-base font-extrabold text-gray-900">
                                    {dialogMode === "tambah" ? "✨ Tambah Log Rekam Medis" : "📝 Edit Log Rekam Medis"}
                                </DialogTitle>
                            </DialogHeader>
                            
                            <div className="space-y-3 pt-2">
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Nama Pasien</label>
                                    <Select value={formPasienId} onValueChange={setFormPasienId}>
                                        <SelectTrigger className="w-full h-[36px] text-xs font-semibold border-gray-200 rounded-xl">
                                            <SelectValue placeholder="Pilih Pasien" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            {pasienList.map(p => (
                                                <SelectItem key={p.id} value={p.id.toString()} className="text-xs font-medium">{p.nama}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Dokter Pemeriksa</label>
                                    <Select value={formDokterId} onValueChange={setFormDokterId}>
                                        <SelectTrigger className="w-full h-[36px] text-xs font-semibold border-gray-200 rounded-xl">
                                            <SelectValue placeholder="Pilih Dokter" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl">
                                            {dokterList.map(d => (
                                                <SelectItem key={d.id} value={d.id.toString()} className="text-xs font-medium">
                                                    {d.nama_dokter || d.nama}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Tindakan</label>
                                        <Select value={formPerawatanId} onValueChange={setFormPerawatanId}>
                                            <SelectTrigger className="w-full h-[36px] text-xs font-semibold border-gray-200 rounded-xl">
                                                <SelectValue placeholder="Pilih Tindakan" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                {perawatanList.map(t => (
                                                    <SelectItem key={t.id} value={t.id.toString()} className="text-xs font-medium">{t.nama_perawatan}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Tanggal Periksa</label>
                                        <input required type="date" value={formTanggal} onChange={(e) => setFormTanggal(e.target.value)} className="w-full h-[36px] px-3 py-1.5 text-xs font-semibold rounded-xl border border-gray-200 outline-none"/>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Catatan Dokter</label>
                                    <textarea 
                                        required 
                                        rows={3} 
                                        value={formCatatanDokter} 
                                        onChange={(e) => setFormCatatanDokter(e.target.value)} 
                                        placeholder="Tuliskan keluhan klinis & diagnosa medis gigi di sini..." 
                                        className="w-full p-3 text-xs font-semibold rounded-xl border border-gray-200 outline-none resize-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <DialogFooter className="pt-4 flex gap-2 justify-end">
                                <DialogClose asChild>
                                    <button type="button" className="px-4 py-2 border border-gray-200 text-gray-500 font-bold text-xs rounded-xl cursor-pointer hover:bg-slate-50">Batal</button>
                                </DialogClose>
                                <button type="submit" className="px-5 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm hover:bg-blue-800">Simpan Rekam</button>
                            </DialogFooter>
                        </form>
                    )}

                    {/* DETAIL COMPONENT (selectedRecord) */}
                    {dialogMode === "detail" && selectedRecord && (
                        <div className="space-y-4">
                            <DialogHeader>
                                <DialogTitle className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                                    🔍 Lembar Rekam Medis #{selectedRecord.id}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="bg-slate-50 rounded-2xl p-4 space-y-3 text-xs font-semibold border border-gray-100">
                                <div className="flex justify-between border-b pb-2 border-gray-200/60">
                                    <span className="text-gray-400 flex items-center gap-1"><MdPerson /> Nama Pasien</span>
                                    <span className="text-gray-900 font-bold">{selectedRecord.pasien?.nama || "-"}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2 border-gray-200/60">
                                    <span className="text-gray-400 flex items-center gap-1"><FaUserMd /> Dokter Gigi</span>
                                    <span className="text-blue-600 font-bold">{selectedRecord.dokter?.nama_dokter || selectedRecord.dokter?.nama || "-"}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2 border-gray-200/60">
                                    <span className="text-gray-400 flex items-center gap-1"><MdMedicalServices /> Tindakan</span>
                                    <span className="text-indigo-700 font-bold">{selectedRecord.perawatan?.nama_perawatan || "-"}</span>
                                </div>
                                <div className="flex justify-between border-b pb-2 border-gray-200/60">
                                    <span className="text-gray-400 flex items-center gap-1"><MdCalendarToday /> Tanggal</span>
                                    <span className="text-slate-800 font-mono">{selectedRecord.tanggal_periksa ? new Date(selectedRecord.tanggal_periksa).toLocaleDateString("id-ID") : "-"}</span>
                                </div>
                                <div className="flex flex-col gap-1 pt-1">
                                    <span className="text-gray-400 flex items-center gap-1"><MdRateReview /> Catatan Penanganan Dokter</span>
                                    <p className="bg-white p-3 border border-slate-100 rounded-xl mt-1 text-slate-700 font-medium leading-relaxed">
                                        {selectedRecord.catatan_dokter || "Tidak ada catatan dokter."}
                                    </p>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <button className="w-full py-2 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer hover:bg-slate-800">Tutup Detail</button>
                                </DialogClose>
                            </DialogFooter>
                        </div>
                    )}

                    {/* DELETE COMPONENT (selectedRecord) */}
                    {dialogMode === "hapus" && selectedRecord && (
                        <div className="space-y-4">
                            <DialogHeader>
                                <DialogTitle className="text-base font-extrabold text-rose-600">⚠️ Hapus Log Rekam Medis?</DialogTitle>
                            </DialogHeader>
                            <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 text-xs">
                                <p className="font-extrabold text-gray-800 text-sm">{selectedRecord.pasien?.nama}</p>
                                <p className="text-[10px] text-rose-600 font-bold mt-0.5">Tindakan: {selectedRecord.perawatan?.nama_perawatan}</p>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">
                                Tindakan ini bersifat permanen dan akan langsung menghapus log dari server database klinismu.
                            </p>
                            <DialogFooter className="pt-2 flex gap-2 justify-end">
                                <DialogClose asChild>
                                    <button className="px-4 py-2 border border-gray-200 text-gray-500 font-bold text-xs rounded-xl cursor-pointer hover:bg-slate-50">Batal</button>
                                </DialogClose>
                                <button onClick={() => handleDelete(selectedRecord.id)} className="px-5 py-2 bg-rose-600 text-white font-bold text-xs rounded-xl cursor-pointer hover:bg-rose-700 shadow-sm">Ya, Hapus Log</button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}