// ================================================
// LETAK FILE: src/pages/Laporan.jsx
// MANAJEMEN LAPORAN & CRUD APPOINTMENT OPERASIONAL
// ================================================

import { useState, useEffect, useRef } from "react";
import {
    MdAttachMoney,
    MdCalendarMonth,
    MdPendingActions,
    MdCheckCircle,
    MdPeople,
    MdMedicalServices,
    MdAdd,
    MdVisibility,
    MdEdit,
    MdDelete,
    MdSearch,
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

import initialAppointments from "../data/appointments.json";

export default function Laporan() {
    const [appointmentsList, setAppointmentsList] = useState(initialAppointments);
    const [search, setSearch] = useState("");

    // State Modal Management
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("detail"); // detail / tambah / edit / hapus

    // State Form Kontrol Input Janji Temu
    const [formNamaPasien, setFormNamaPasien] = useState("");
    const [formNoRM, setFormNoRM] = useState("");
    const [formJenisPerawatan, setFormJenisPerawatan] = useState("Scaling");
    const [formTanggal, setFormTanggal] = useState("2026-07-08");
    const [formBiaya, setFormBiaya] = useState("");
    const [formStatus, setFormStatus] = useState("Pending");
    const [formFoto, setFormFoto] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200");

    const searchInputRef = useRef(null);

    useEffect(() => {
        document.title = "Laporan & Performa Operasional — SIGIGI";
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // ── HITUNG METRICS & KONTROL GRAFIK SECARA DINAMIS ──
    const totalPendapatan = appointmentsList
        .filter((item) => item.status === "Selesai")
        .reduce((total, item) => total + Number(item.biaya), 0);

    const selesai = appointmentsList.filter((item) => item.status === "Selesai").length;
    const pending = appointmentsList.filter((item) => item.status === "Pending").length;
    const confirmed = appointmentsList.filter((item) => item.status === "Confirmed").length;
    const totalPasien = new Set(appointmentsList.map((item) => item.no_rm)).size;

    // Filter Pencarian Pasien
    const filteredAppointments = appointmentsList.filter((item) =>
        item.nama_pasien.toLowerCase().includes(search.toLowerCase()) ||
        item.no_rm.toLowerCase().includes(search.toLowerCase())
    );

    // Pewarnaan Badge Status
    const getStatusColor = (status) => {
        switch (status) {
            case "Selesai": return "bg-green-100 text-green-700";
            case "Confirmed": return "bg-blue-100 text-blue-700";
            case "Pending": return "bg-yellow-100 text-yellow-700";
            case "Cancelled": return "bg-red-100 text-red-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    // ── OPERASI MANAJEMEN CRUD APPOINTMENTS ──
    const openTambahAppointment = () => {
        setFormNamaPasien("");
        setFormNoRM("");
        setFormJenisPerawatan("Scaling");
        setFormTanggal("2026-07-08");
        setFormBiaya("");
        setFormStatus("Pending");
        setFormFoto("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"); // default avatar
        setDialogMode("tambah");
        setDialogOpen(true);
    };

    const openDetailAppointment = (item) => {
        setSelectedAppointment(item);
        setDialogMode("detail");
        setDialogOpen(true);
    };

    const openEditAppointment = (item) => {
        setSelectedAppointment(item);
        setFormNamaPasien(item.nama_pasien);
        setFormNoRM(item.no_rm);
        setFormJenisPerawatan(item.jenis_perawatan);
        setFormTanggal(item.tanggal);
        setFormBiaya(item.biaya);
        setFormStatus(item.status);
        setFormFoto(item.foto);
        setDialogMode("edit");
        setDialogOpen(true);
    };

    const openHapusAppointment = (item) => {
        setSelectedAppointment(item);
        setDialogMode("hapus");
        setDialogOpen(true);
    };

    const handleCreateAppointment = (e) => {
        e.preventDefault();
        const newApp = {
            id: Date.now(),
            nama_pasien: formNamaPasien,
            no_rm: formNoRM,
            jenis_perawatan: formJenisPerawatan,
            tanggal: formTanggal,
            biaya: parseInt(formBiaya, 10) || 0,
            status: formStatus,
            foto: formFoto
        };
        setAppointmentsList([newApp, ...appointmentsList]);
        setDialogOpen(false);
    };

    const handleUpdateAppointment = (e) => {
        e.preventDefault();
        setAppointmentsList(appointmentsList.map(a => 
            a.id === selectedAppointment.id ? {
                ...a,
                nama_pasien: formNamaPasien,
                no_rm: formNoRM,
                jenis_perawatan: formJenisPerawatan,
                tanggal: formTanggal,
                biaya: parseInt(formBiaya, 10) || 0,
                status: formStatus
            } : a
        ));
        setDialogOpen(false);
    };

    const handleDeleteAppointment = (id) => {
        setAppointmentsList(appointmentsList.filter(a => a.id !== id));
        setDialogOpen(false);
    };

    return (
        <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen font-sans">
            
            {/* HEADER BANNER */}
            <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-md relative overflow-hidden">
                <div className="flex justify-between items-center z-10 relative">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight">Laporan Klinik Gigi</h1>
                        <p className="text-blue-100 mt-1.5 text-sm font-medium opacity-90">
                            Ringkasan performa operasional, data janji temu, serta analitik pendapatan klinik gigi.
                        </p>
                    </div>
                    <div className="hidden lg:block text-[80px] opacity-20 select-none">📊</div>
                </div>
            </div>

            {/* ACTION BAR & LIVE SEARCH */}
            <div className="grid sm:grid-cols-3 gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="sm:col-span-2 relative">
                    <MdSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Cari riwayat berdasarkan nama pasien atau No. RM..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 text-xs font-semibold rounded-xl border border-gray-100 bg-slate-50/60 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                    />
                </div>
                <button
                    onClick={openTambahAppointment}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                    <MdAdd size={16} /> Tambah Log Perawatan
                </button>
            </div>

            {/* KPI METRICS METERS */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <MdAttachMoney className="text-3xl text-green-600 mb-2" />
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Pendapatan</p>
                    <h2 className="text-lg font-black text-green-600 mt-1">Rp {totalPendapatan.toLocaleString("id-ID")}</h2>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <MdCheckCircle className="text-3xl text-blue-600 mb-2" />
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Selesai</p>
                    <h2 className="text-2xl font-black text-blue-600 mt-1">{selesai}</h2>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <MdPendingActions className="text-3xl text-yellow-500 mb-2" />
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Pending</p>
                    <h2 className="text-2xl font-black text-yellow-500 mt-1">{pending}</h2>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                    <MdCalendarMonth className="text-3xl text-purple-600 mb-2" />
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Confirmed</p>
                    <h2 className="text-2xl font-black text-purple-600 mt-1">{confirmed}</h2>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition col-span-2 md:col-span-1">
                    <MdPeople className="text-3xl text-cyan-600 mb-2" />
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Pasien Unik</p>
                    <h2 className="text-2xl font-black text-cyan-600 mt-1">{totalPasien}</h2>
                </div>
            </div>

            {/* SECTION STATISTIK & GRAFIK PROGRESS */}
            <div className="grid lg:grid-cols-3 gap-5">
                
                {/* Diagram Progress Status Bar */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <h2 className="font-extrabold text-sm text-gray-800 mb-5 uppercase tracking-wider">Status Appointment</h2>
                    <div className="space-y-4 text-xs font-bold text-gray-600">
                        <div>
                            <div className="flex justify-between mb-1.5">
                                <span>Selesai</span> <span className="text-gray-900">{selesai}</span>
                            </div>
                            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-2.5 bg-green-500 rounded-full transition-all duration-500" style={{ width: `${appointmentsList.length ? (selesai / appointmentsList.length) * 100 : 0}%` }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1.5">
                                <span>Confirmed</span> <span className="text-gray-900">{confirmed}</span>
                            </div>
                            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-2.5 bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${appointmentsList.length ? (confirmed / appointmentsList.length) * 100 : 0}%` }} />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1.5">
                                <span>Pending</span> <span className="text-gray-900">{pending}</span>
                            </div>
                            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-2.5 bg-yellow-500 rounded-full transition-all duration-500" style={{ width: `${appointmentsList.length ? (pending / appointmentsList.length) * 100 : 0}%` }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Treatment Terpopuler */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
                    <h2 className="font-extrabold text-sm text-gray-800 mb-5 uppercase tracking-wider">Treatment Terpopuler</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-blue-50/70 rounded-2xl p-4 border border-blue-100/40">
                            <MdMedicalServices className="text-2xl text-blue-600 mb-2" />
                            <h3 className="font-bold text-xs text-gray-800">Scaling Gigi</h3>
                            <p className="text-[11px] text-gray-400 mt-1 font-medium">Perawatan higienis rutin berkala.</p>
                        </div>
                        <div className="bg-green-50/70 rounded-2xl p-4 border border-green-100/40">
                            <MdMedicalServices className="text-2xl text-green-600 mb-2" />
                            <h3 className="font-bold text-xs text-gray-800">Tambal Gigi</h3>
                            <p className="text-[11px] text-gray-400 mt-1 font-medium">Solusi restorasi gigi berlubang.</p>
                        </div>
                        <div className="bg-purple-50/70 rounded-2xl p-4 border border-purple-100/40">
                            <MdMedicalServices className="text-2xl text-purple-600 mb-2" />
                            <h3 className="font-bold text-xs text-gray-800">Bleaching Gigi</h3>
                            <p className="text-[11px] text-gray-400 mt-1 font-medium">Estetik mencerahkan warna gigi.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABEL DATA RIWAYAT UTAMA */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                    <h2 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider">Riwayat Perawatan Pasien</h2>
                    <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-bold">{filteredAppointments.length} Record</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-gray-100 text-slate-400 text-[11px] uppercase font-bold tracking-wider">
                                <th className="p-4 text-left">Pasien</th>
                                <th className="p-4 text-left">Perawatan</th>
                                <th className="p-4 text-left">Tanggal</th>
                                <th className="p-4 text-left">Biaya</th>
                                <th className="p-4 text-center">Status</th>
                                <th className="p-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-semibold text-gray-600 divide-y divide-gray-50">
                            {filteredAppointments.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-400 font-medium">❌ Log perawatan medis kosong.</td>
                                </tr>
                            ) : (
                                filteredAppointments.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={item.foto} alt="" className="w-9 h-9 rounded-full object-cover border border-slate-100" />
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{item.nama_pasien}</h4>
                                                    <p className="text-[11px] text-gray-400 font-mono">{item.no_rm}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-700">{item.jenis_perawatan}</td>
                                        <td className="p-4 text-gray-400 font-medium">{item.tanggal}</td>
                                        <td className="p-4 font-extrabold text-green-600">Rp {item.biaya.toLocaleString("id-ID")}</td>
                                        <td className="p-4 text-center">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusColor(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <button onClick={() => openDetailAppointment(item)} title="Detail Log" className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer">
                                                    <MdVisibility size={16} />
                                                </button>
                                                <button onClick={() => openEditAppointment(item)} title="Ubah Log Perawatan" className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer">
                                                    <MdEdit size={16} />
                                                </button>
                                                <button onClick={() => openHapusAppointment(item)} title="Hapus Record" className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer">
                                                    <MdDelete size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* DIALOG/MODAL ACTIONS CRUDS SYSTEM */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md rounded-3xl p-6 bg-white border border-gray-100 shadow-xl">
                    
                    {/* FORM INPUT: TAMBAH & EDIT */}
                    {(dialogMode === "tambah" || dialogMode === "edit") && (
                        <form onSubmit={dialogMode === "tambah" ? handleCreateAppointment : handleUpdateAppointment} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                                    {dialogMode === "tambah" ? "Tambah Rekam Kunjungan Baru" : "Edit Log Janji Temu"}
                                </DialogTitle>
                                <DialogDescription className="text-xs text-gray-400">
                                    Pengisian form valid mempengaruhi kalkulasi finansial pada dashboard utama laporan secara dinamis.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-3 text-xs">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Nama Pasien *</label>
                                        <input type="text" required placeholder="E.g. Siti Aisyah" value={formNamaPasien} onChange={(e)=>setFormNamaPasien(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-500/25" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">No. Rekam Medis *</label>
                                        <input type="text" required placeholder="RM-2026-XXX" value={formNoRM} onChange={(e)=>setFormNoRM(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 font-mono font-bold tracking-wider outline-none focus:ring-2 focus:ring-blue-500/25" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Jenis Tindakan / Perawatan</label>
                                        <select value={formJenisPerawatan} onChange={(e)=>setFormJenisPerawatan(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 outline-none">
                                            <option value="Pembersihan Karang Gigi">Pembersihan Karang Gigi</option>
                                            <option value="Tambal Gigi">Tambal Gigi</option>
                                            <option value="Bleaching Gigi">Bleaching Gigi</option>
                                            <option value="Cabut Gigi">Cabut Gigi</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Tanggal Kunjungan</label>
                                        <input type="date" value={formTanggal} onChange={(e)=>setFormTanggal(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 font-semibold text-gray-700 outline-none" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Biaya Tindakan (Rp) *</label>
                                        <input type="number" required placeholder="300000" value={formBiaya} onChange={(e)=>setFormBiaya(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 font-bold text-green-600 text-sm outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Status Tindakan</label>
                                        <select value={formStatus} onChange={(e)=>setFormStatus(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 outline-none">
                                            <option value="Pending">⏳ Pending</option>
                                            <option value="Confirmed">🔵 Confirmed</option>
                                            <option value="Selesai">✅ Selesai</option>
                                            <option value="Cancelled">❌ Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="pt-2 gap-2 sm:gap-0">
                                <DialogClose asChild>
                                    <button type="button" className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold cursor-pointer">Batal</button>
                                </DialogClose>
                                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold cursor-pointer hover:bg-blue-700 transition">
                                    {dialogMode === "tambah" ? "Simpan Log Baru" : "Update Berkas"}
                                </button>
                            </DialogFooter>
                        </form>
                    )}

                    {/* DETAIL OPERASIONAL */}
                    {dialogMode === "detail" && selectedAppointment && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-sm font-extrabold text-gray-900">📋 Detail Rekam Jejak Kunjungan Medis</DialogTitle>
                            </DialogHeader>
                            <div className="my-4 p-4 bg-slate-50/80 rounded-2xl border border-gray-100 text-xs font-semibold space-y-2.5 text-gray-700">
                                <div className="flex items-center gap-3 pb-3 border-b border-gray-200/50">
                                    <img src={selectedAppointment.foto} alt="" className="w-12 h-12 rounded-full object-cover" />
                                    <div>
                                        <h3 className="text-sm font-black text-gray-900">{selectedAppointment.nama_pasien}</h3>
                                        <p className="text-[11px] text-gray-400 font-mono">{selectedAppointment.no_rm}</p>
                                    </div>
                                </div>
                                <p><span className="text-gray-400 font-medium">Jenis Perawatan :</span> {selectedAppointment.jenis_perawatan}</p>
                                <p><span className="text-gray-400 font-medium">Tanggal Periksa :</span> {selectedAppointment.tanggal}</p>
                                <p className="text-sm text-green-600 font-black"><span className="text-gray-400 font-medium text-xs">Total Biaya    :</span> Rp {selectedAppointment.biaya.toLocaleString("id-ID")}</p>
                                <p><span className="text-gray-400 font-medium">Status Medis   :</span> <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getStatusColor(selectedAppointment.status)}`}>{selectedAppointment.status}</span></p>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <button className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold cursor-pointer">Tutup Detail</button>
                                </DialogClose>
                            </DialogFooter>
                        </>
                    )}

                    {/* DELETE ARCHIVE */}
                    {dialogMode === "hapus" && selectedAppointment && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-base font-bold text-gray-900">Hapus Log Medis Pasien?</DialogTitle>
                                <DialogDescription className="text-xs text-gray-400">
                                    Penghapusan arsip ini akan menghapus log riwayat periksa pasien serta memotong jumlah akumulasi laporan keuangan.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="my-3 p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs">
                                <p className="font-bold text-gray-900">{selectedAppointment.nama_pasien} ({selectedAppointment.no_rm})</p>
                                <p className="text-gray-400 mt-0.5">{selectedAppointment.jenis_perawatan} — Rp {selectedAppointment.biaya.toLocaleString("id-ID")}</p>
                            </div>
                            <DialogFooter className="gap-2 sm:gap-0">
                                <DialogClose asChild>
                                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold cursor-pointer">Batal</button>
                                </DialogClose>
                                <button onClick={() => handleDeleteAppointment(selectedAppointment.id)} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold cursor-pointer transition">
                                    Ya, Hapus Record
                                </button>
                            </DialogFooter>
                        </>
                    )}

                </DialogContent>
            </Dialog>

        </div>
    );
}