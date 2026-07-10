// ================================================
// LETAK FILE: src/pages/RekamMedis.jsx
// VERSI FULL SINKRON: CRUD REKAM MEDIS LENGKAP + UI PREMIUM
// ================================================

import { useState, useEffect, useRef } from "react";
import { 
    MdSearch, MdVisibility, MdDelete, MdEdit, 
    MdAdd, MdFilterList, MdCalendarMonth, MdPerson,
    MdAssignment, MdSick, MdHealing, MdRateReview,
    MdMedicalServices
} from "react-icons/md";

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

import recordsData from "../data/medical_records.json";

export default function RekamMedis() {
    const [recordsList, setRecordsList] = useState(recordsData);
    const [search, setSearch] = useState("");
    const [filterDokter, setFilterDokter] = useState("Semua");

    // State Modal & CRUD Management
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("detail"); // tambah, detail, edit, hapus

    // State Form Input untuk Tambah & Edit Rekam Medis
    const [formNoRM, setFormNoRM] = useState("");
    const [formPatientId, setFormPatientId] = useState("");
    const [formTanggal, setFormTanggal] = useState("2026-07-08");
    const [formKeluhan, setFormKeluhan] = useState("");
    const [formDiagnosa, setFormDiagnosa] = useState("");
    const [formTindakan, setFormTindakan] = useState("");
    const [formCatatan, setFormCatatan] = useState("");
    const [formDokter, setFormDokter] = useState("drg. Farel Abdul Halim");

    const searchInputRef = useRef(null);

    useEffect(() => {
        document.title = "Rekam Medis — SIGIGI";
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // ── KUMPULAN AKSI CRUD ──
    const openTambah = () => {
        setFormNoRM("");
        setFormPatientId("");
        setFormTanggal("2026-07-08");
        setFormKeluhan("");
        setFormDiagnosa("");
        setFormTindakan("");
        setFormCatatan("");
        setFormDokter("drg. Farel Abdul Halim");
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
        setFormNoRM(item.no_rm);
        setFormPatientId(item.patient_id);
        setFormTanggal(item.tanggal);
        setFormKeluhan(item.keluhan);
        setFormDiagnosa(item.diagnosa);
        setFormTindakan(item.tindakan);
        setFormCatatan(item.catatan_dokter);
        setFormDokter(item.dokter);
        setDialogMode("edit");
        setDialogOpen(true);
    };

    const openHapus = (item) => {
        setSelectedRecord(item);
        setDialogMode("hapus");
        setDialogOpen(true);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        if (!formNoRM || !formKeluhan || !formDiagnosa) return alert("Nomor RM, Keluhan, dan Diagnosa wajib diisi!");

        const nextId = recordsList.length > 0 ? Math.max(...recordsList.map(r => r.id)) + 1 : 1;
        const newRecord = {
            id: nextId,
            no_rm: formNoRM,
            patient_id: formPatientId || String(nextId),
            tanggal: formTanggal,
            keluhan: formKeluhan,
            diagnosa: formDiagnosa,
            tindakan: formTindakan || "Konsultasi",
            catatan_dokter: formCatatan || "Tidak ada catatan khusus",
            dokter: formDokter
        };

        setRecordsList([newRecord, ...recordsList]);
        setDialogOpen(false);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setRecordsList(recordsList.map(r => {
            if (r.id === selectedRecord.id) {
                return {
                    ...r,
                    no_rm: formNoRM,
                    patient_id: formPatientId,
                    tanggal: formTanggal,
                    keluhan: formKeluhan,
                    diagnosa: formDiagnosa,
                    tindakan: formTindakan,
                    catatan_dokter: formCatatan,
                    dokter: formDokter
                };
            }
            return r;
        }));
        setDialogOpen(false);
    };

    const handleDelete = (id) => {
        setRecordsList(recordsList.filter(r => r.id !== id));
        setDialogOpen(false);
    };

    // ── FILTER DATA LOGIC ──
    const filteredRecords = recordsList.filter((item) => {
        const matchSearch = 
            item.no_rm.toLowerCase().includes(search.toLowerCase()) ||
            String(item.patient_id).toLowerCase().includes(search.toLowerCase()) ||
            item.diagnosa.toLowerCase().includes(search.toLowerCase());
        const matchDokter = 
            filterDokter === "Semua" || item.dokter === filterDokter;

        return matchSearch && matchDokter;
    });

    const listDokterUnik = ["Semua", ...new Set(recordsList.map(r => r.dokter))];

    return (
        <div className="p-6 space-y-6 bg-gray-50/40 min-h-screen font-sans">
            
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white rounded-3xl p-6 shadow-sm border border-gray-100 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                        <MdAssignment className="text-blue-600 text-3xl" /> Rekam Medis
                    </h1>
                    <p className="text-sm font-medium text-gray-400 mt-1">
                        Daftar riwayat pemeriksaan, diagnosa klinis, dan catatan tindakan medis pasien secara realtime.
                    </p>
                </div>
                <button
                    onClick={openTambah}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 h-11 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-200 hover:scale-[1.02] cursor-pointer w-full sm:w-auto justify-center"
                >
                    <MdAdd size={18} /> Tambah Rekam Medis
                </button>
            </div>

            {/* FILTER & PENCARIAN BAR */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:flex-1">
                    <MdSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Cari berdasarkan No. RM, Patient ID, atau jenis diagnosa..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 text-sm font-medium rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                    />
                </div>

                <div className="flex gap-3 w-full sm:w-auto items-center justify-between">
                    <div className="flex flex-col w-full sm:w-[200px]">
                        <span className="text-[10px] font-bold text-gray-400 uppercase mb-1 px-1 tracking-wider">Dokter Pemeriksa</span>
                        <Select value={filterDokter} onValueChange={setFilterDokter}>
                            <SelectTrigger className="rounded-xl border-gray-200 font-semibold text-xs h-11 bg-slate-50/50">
                                <SelectValue placeholder="Semua Dokter" />
                            </SelectTrigger>
                            <SelectContent className="bg-white rounded-xl shadow-lg border-gray-100">
                                {listDokterUnik.map((doc, i) => (
                                    <SelectItem key={i} value={doc}>{doc === "Semua" ? "Semua Dokter" : doc}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="hidden sm:flex self-end h-11 px-4 items-center justify-center bg-blue-50 text-blue-600 rounded-xl text-xs font-bold gap-1">
                        <MdFilterList size={16} /> {filteredRecords.length} Data
                    </div>
                </div>
            </div>

            {/* GRID LAYOUT KARTU REKAM MEDIS */}
            {filteredRecords.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 text-gray-400 font-medium text-sm">
                    ❌ Tidak ada rekam medis pasien yang sesuai dengan pencarian atau filter dokter.
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredRecords.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative"
                        >
                            <div>
                                {/* Atas: Info Identitas Utama */}
                                <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-3">
                                    <div>
                                        <h3 className="font-extrabold text-gray-800 text-lg tracking-tight group-hover:text-blue-600 transition-colors">
                                            {item.no_rm}
                                        </h3>
                                        <p className="text-xs font-semibold text-gray-400 mt-0.5">
                                            Patient ID : <span className="font-mono text-gray-600">{item.patient_id}</span>
                                        </p>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                        <MdMedicalServices size={20} />
                                    </div>
                                </div>

                                {/* Konten Tengah: Tanggal & Detail Klinis */}
                                <div className="space-y-3.5 text-sm font-medium">
                                    <p className="flex items-center gap-1.5 text-xs text-gray-400 font-bold">
                                        <MdCalendarMonth size={16} /> {item.tanggal}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                                        <div className="p-2.5 bg-slate-50/60 rounded-xl border border-gray-50/50">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><MdSick/> Keluhan</span>
                                            <p className="text-gray-700 mt-1 font-semibold leading-relaxed line-clamp-2">{item.keluhan}</p>
                                        </div>
                                        <div className="p-2.5 bg-blue-50/30 rounded-xl border border-blue-50/40">
                                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider flex items-center gap-1"><MdHealing/> Diagnosa</span>
                                            <p className="text-blue-900 mt-1 font-bold leading-relaxed line-clamp-2">{item.diagnosa}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 text-xs pt-1">
                                        <p className="text-gray-700"><strong className="text-gray-400 font-bold uppercase text-[10px] tracking-wider block">Tindakan Medis:</strong> {item.tindakan}</p>
                                        <p className="text-gray-600 italic bg-gray-50/80 p-2.5 rounded-xl border border-gray-100 text-xs"><strong className="text-gray-400 font-bold uppercase text-[10px] tracking-wider block not-italic mb-0.5">Catatan Dokter:</strong> "{item.catatan_dokter}"</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bawah: Info Dokter & Aksi Kontrol (SINKRON) */}
                            <div className="mt-5 pt-3 border-t border-gray-50 flex items-center justify-between">
                                <p className="flex items-center gap-1.5 text-blue-600 font-bold text-xs bg-blue-50/50 px-3 py-1.5 rounded-xl">
                                    <MdPerson size={16} /> {item.dokter}
                                </p>

                                <div className="flex items-center gap-0.5">
                                    <button 
                                        onClick={() => openDetail(item)}
                                        title="Lihat Berkas"
                                        className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                                    >
                                        <MdVisibility size={18} />
                                    </button>
                                    <button 
                                        onClick={() => openEdit(item)}
                                        title="Ubah Berkas"
                                        className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                                    >
                                        <MdEdit size={18} />
                                    </button>
                                    <button 
                                        onClick={() => openHapus(item)}
                                        title="Hapus Berkas"
                                        className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                                    >
                                        <MdDelete size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* SYSTEM DIALOG / MODAL (TAMBAH, DETAIL, EDIT, HAPUS) */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md rounded-3xl p-6 bg-white shadow-2xl border border-gray-100 overflow-hidden">
                    
                    {/* FORM TAMBAH & EDIT */}
                    {(dialogMode === "tambah" || dialogMode === "edit") && (
                        <form onSubmit={dialogMode === "tambah" ? handleCreate : handleUpdate} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                        {dialogMode === "tambah" ? <MdAdd size={20}/> : <MdEdit size={20}/>}
                                    </div>
                                    {dialogMode === "tambah" ? "Tambah Rekam Medis Baru" : "Perbarui Rekam Medis"}
                                </DialogTitle>
                                <DialogDescription className="text-xs text-gray-400">
                                    Pastikan data diagnosis dan tindakan klinis diisi dengan akurat.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-3 text-xs">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">No. Rekam Medis *</label>
                                        <input 
                                            type="text" required placeholder="RM-2026-00X" value={formNoRM} onChange={(e)=>setFormNoRM(e.target.value)}
                                            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold tracking-wide"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Patient ID</label>
                                        <input 
                                            type="text" placeholder="ID Pasien" value={formPatientId} onChange={(e)=>setFormPatientId(e.target.value)}
                                            className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Tanggal Periksa</label>
                                        <input 
                                            type="date" value={formTanggal} onChange={(e)=>setFormTanggal(e.target.value)}
                                            className="w-full p-3 rounded-xl border border-gray-200 outline-none font-medium text-gray-700 bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Dokter Penanggung Jawab</label>
                                        <select value={formDokter} onChange={(e)=>setFormDokter(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 bg-white font-semibold text-gray-700">
                                            <option value="drg. Farel Abdul Halim">drg. Farel Abdul Halim</option>
                                            <option value="drg. Sarah Amalia">drg. Sarah Amalia</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Keluhan Pasien *</label>
                                    <textarea 
                                        required rows={2} placeholder="Tuliskan keluhan utama gigi pasien..." value={formKeluhan} onChange={(e)=>setFormKeluhan(e.target.value)}
                                        className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Diagnosa Klinis *</label>
                                    <input 
                                        type="text" required placeholder="Contoh: Pulpitis Akut / Karies Gigi" value={formDiagnosa} onChange={(e)=>setFormDiagnosa(e.target.value)}
                                        className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500/20 font-bold text-blue-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Tindakan Medis</label>
                                    <input 
                                        type="text" placeholder="Contoh: Tambal Composite / Scaling Gigi" value={formTindakan} onChange={(e)=>setFormTindakan(e.target.value)}
                                        className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500/20 font-medium"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Catatan Tambahan Dokter</label>
                                    <input 
                                        type="text" placeholder="Contoh: Hindari dingin, kontrol kembali 6 bulan" value={formCatatan} onChange={(e)=>setFormCatatan(e.target.value)}
                                        className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500/20 font-medium text-gray-600"
                                    />
                                </div>
                            </div>

                            <DialogFooter className="pt-2 gap-2 sm:gap-0">
                                <DialogClose asChild>
                                    <button type="button" className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer">Batal</button>
                                </DialogClose>
                                <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-100 cursor-pointer transition">
                                    {dialogMode === "tambah" ? "Simpan Berkas" : "Simpan Perubahan"}
                                </button>
                            </DialogFooter>
                        </form>
                    )}

                    {/* DETAIL REKAM MEDIS COMPREHENSIVE */}
                    {dialogMode === "detail" && selectedRecord && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <MdAssignment size={18}/>
                                    </div> 
                                    Lembar Dokumen Rekam Medis
                                </DialogTitle>
                                <DialogDescription className="text-xs text-gray-400 font-medium">
                                    Dokumen klinis resmi rekam kesehatan gigi pasien.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="my-4 space-y-3 text-xs">
                                <div className="p-3 bg-slate-50 border border-gray-100 rounded-2xl flex justify-between items-center">
                                    <div>
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Nomor Berkas RM</p>
                                        <p className="text-sm font-extrabold text-gray-800 mt-0.5">{selectedRecord.no_rm}</p>
                                    </div>
                                    <span className="font-mono text-xs font-bold text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-lg">
                                        Patient ID: {selectedRecord.patient_id}
                                    </span>
                                </div>

                                <div className="p-3 bg-slate-50/50 border border-gray-100 rounded-xl space-y-1">
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1"><MdCalendarMonth/> Waktu Pemeriksaan</span>
                                    <p className="text-xs font-bold text-gray-700">{selectedRecord.tanggal}</p>
                                </div>

                                <div className="p-3 bg-amber-50/30 border border-amber-100/50 rounded-xl space-y-1">
                                    <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1"><MdSick/> Keluhan Utama</span>
                                    <p className="text-xs font-semibold text-gray-700 leading-relaxed">{selectedRecord.keluhan}</p>
                                </div>

                                <div className="p-3 bg-blue-50/30 border border-blue-100/50 rounded-xl space-y-1">
                                    <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wider flex items-center gap-1"><MdHealing/> Diagnosa Akhir</span>
                                    <p className="text-sm font-extrabold text-blue-900">{selectedRecord.diagnosa}</p>
                                </div>

                                <div className="p-3 bg-slate-50/50 border border-gray-100 rounded-xl space-y-1">
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Tindakan Medis Realisasi</span>
                                    <p className="text-xs font-bold text-gray-800">{selectedRecord.tindakan}</p>
                                </div>

                                <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl space-y-1 italic text-gray-600">
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider not-italic flex items-center gap-1"><MdRateReview/> Advise & Catatan Dokter</span>
                                    <p className="text-xs font-medium">"{selectedRecord.catatan_dokter}"</p>
                                </div>

                                <div className="p-3 bg-blue-600 rounded-2xl text-white flex items-center gap-2 shadow-md shadow-blue-100">
                                    <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white"><MdPerson size={16}/></div>
                                    <div>
                                        <p className="text-[9px] opacity-70 uppercase font-bold tracking-wider">Dokter Pemeriksa</p>
                                        <p className="text-xs font-bold">{selectedRecord.dokter}</p>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <button className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer">
                                        Selesai Meninjau
                                    </button>
                                </DialogClose>
                            </DialogFooter>
                        </>
                    )}

                    {/* KONFIRMASI HAPUS (DELETE) */}
                    {dialogMode === "hapus" && selectedRecord && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-lg font-bold text-gray-800">Hapus Berkas Rekam Medis</DialogTitle>
                                <DialogDescription className="text-xs text-gray-400 font-medium">
                                    Tindakan ini permanen. Menghapus lembar rekam medis akan menghilangkan riwayat klinis tindakan pasien dari log database SIGIGI.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="my-4 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex justify-between items-center">
                                <div>
                                    <p className="font-extrabold text-gray-800 text-base">{selectedRecord.no_rm}</p>
                                    <p className="text-xs text-rose-700 font-bold mt-0.5">Diagnosa: {selectedRecord.diagnosa}</p>
                                </div>
                                <span className="text-xs text-gray-400 font-bold">{selectedRecord.tanggal}</span>
                            </div>

                            <DialogFooter className="gap-2 sm:gap-0">
                                <DialogClose asChild>
                                    <button className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold cursor-pointer">
                                        Batalkan
                                    </button>
                                </DialogClose>
                                <button 
                                    onClick={() => handleDelete(selectedRecord.id)}
                                    className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-sm"
                                >
                                    Ya, Hapus Berkas
                                </button>
                            </DialogFooter>
                        </>
                    )}

                </DialogContent>
            </Dialog>

        </div>
    );
}