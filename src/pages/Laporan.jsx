import { useState, useEffect, useRef } from "react";
import {
    MdAttachMoney,
    MdCalendarMonth,
    MdCheckCircle,
    MdPeople,
    MdAdd,
    MdVisibility,
    MdEdit,
    MdDelete,
    MdSearch,
    MdNavigateBefore,
    MdNavigateNext
} from "react-icons/md";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

import { laporanAPI } from "../services/laporanAPI";

export default function Laporan() {
    const [reportsList, setReportsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    // State Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // State Modal Management
    const [selectedReport, setSelectedReport] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("detail");

    // State Form Kontrol
    const [formNamaPasien, setFormNamaPasien] = useState("");
    const [formNoRM, setFormNoRM] = useState("");
    const [formJenisPerawatan, setFormJenisPerawatan] = useState("Scaling Gigi");
    const [formTanggalLaporan, setFormTanggalLaporan] = useState("");
    const [formTotalTagihan, setFormTotalTagihan] = useState("");
    const [formStatusPembayaran, setFormStatusPembayaran] = useState("Belum Lunas");

    const searchInputRef = useRef(null);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const data = await laporanAPI.fetchLaporan();
            setReportsList(data || []);
        } catch (error) {
            console.error("Gagal memuat data laporan:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Laporan Finansial & Operasional — SIGIGI";
        fetchReports();
        if (searchInputRef.current) searchInputRef.current.focus();
    }, []);

    // Pemetaan Data agar aman & mudah dibaca dari relasi ERD database
    const dapatkanDataAman = (item) => {
        const pembayaran = item?.pembayaran || {};
        const rekamMedis = pembayaran?.rekam_medis || {};
        const pasien = rekamMedis?.pasien || {};
        const perawatan = rekamMedis?.perawatan || {};

        return {
            namaPasien: pasien?.nama || item?.keterangan || "-", 
            noRM: pasien?.kode_pasien || rekamMedis?.no_rekam_medis || "-",
            jenisPerawatan: perawatan?.nama_perawatan || item?.tipe_laporan || "-",
            tagihan: Number(pembayaran?.tagihan_akhir || item?.pendapatan || 0),
            status: pembayaran?.tanggal_bayar ? "Lunas" : "Belum Lunas"
        };
    };

    // Hitung Metrics Omset
    const totalOmset = reportsList
        .map(item => dapatkanDataAman(item))
        .filter(d => d.status === "Lunas")
        .reduce((total, d) => total + d.tagihan, 0);

    const lunasCount = reportsList.map(item => dapatkanDataAman(item)).filter(d => d.status === "Lunas").length;
    const belumLunasCount = reportsList.map(item => dapatkanDataAman(item)).filter(d => d.status === "Belum Lunas").length;
    const totalPasienUnik = new Set(reportsList.map(item => dapatkanDataAman(item).noRM).filter(no => no !== "-")).size;

    // Filter Pencarian Pasien
    const filteredReports = reportsList.filter((item) => {
        const data = dapatkanDataAman(item);
        return (
            data.namaPasien.toLowerCase().includes(search.toLowerCase()) ||
            data.noRM.toLowerCase().includes(search.toLowerCase())
        );
    });

    // Rumus Pagination
    const totalPages = Math.ceil(filteredReports.length / itemsPerPage) || 1;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const getStatusColor = (status) => {
        return status === "Lunas" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
    };

    // Handler Modal
    const openTambahReport = () => {
        setFormNamaPasien("");
        setFormNoRM("");
        setFormJenisPerawatan("Scaling Gigi");
        setFormTanggalLaporan(new Date().toISOString().split('T')[0]);
        setFormTotalTagihan("");
        setFormStatusPembayaran("Belum Lunas");
        setDialogMode("tambah");
        setDialogOpen(true);
    };

    const openDetailReport = (item) => {
        setSelectedReport(item);
        setDialogMode("detail");
        setDialogOpen(true);
    };

    const openEditReport = (item) => {
        const data = dapatkanDataAman(item);
        setSelectedReport(item);
        setFormNamaPasien(data.namaPasien);
        setFormNoRM(data.noRM);
        setFormJenisPerawatan(data.jenisPerawatan);
        setFormTanggalLaporan(item.tanggal_laporan || "");
        setFormTotalTagihan(data.tagihan);
        setFormStatusPembayaran(data.status);
        setDialogMode("edit");
        setDialogOpen(true);
    };

    const openHapusReport = (item) => {
        setSelectedReport(item);
        setDialogMode("hapus");
        setDialogOpen(true);
    };

    const handleCreateReport = async (e) => {
        e.preventDefault();
        const payload = {
            tipe_laporan: formJenisPerawatan,
            tanggal_laporan: formTanggalLaporan,
            pendapatan: parseInt(formTotalTagihan, 10) || 0,
            keterangan: formNamaPasien
        };

        try {
            await laporanAPI.createLaporan(payload);
            fetchReports();
            setDialogOpen(false);
        } catch (error) {
            alert("Gagal menambahkan data: " + error.message);
        }
    };

    const handleUpdateReport = async (e) => {
        e.preventDefault();
        const payload = {
            tipe_laporan: formJenisPerawatan,
            tanggal_laporan: formTanggalLaporan,
            pendapatan: parseInt(formTotalTagihan, 10) || 0,
            keterangan: formNamaPasien
        };

        try {
            await laporanAPI.updateLaporan(selectedReport.id, payload);
            fetchReports();
            setDialogOpen(false);
        } catch (error) {
            alert("Gagal memperbarui data: " + error.message);
        }
    };

    const handleDeleteReport = async (id) => {
        try {
            await laporanAPI.deleteLaporan(id);
            setReportsList(reportsList.filter(r => r.id !== id));
            setDialogOpen(false);
        } catch (error) {
            alert("Gagal menghapus data: " + error.message);
        }
    };

    return (
        <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen font-sans">
            
            {/* BANNER UTAMA */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 rounded-3xl p-8 text-white shadow-md">
                <h1 className="text-3xl font-extrabold tracking-tight">Laporan Keuangan & Operasional</h1>
                <p className="text-blue-100 mt-1.5 text-sm font-medium opacity-90">
                    Sistem rekapitulasi pembayaran medis, pengelolaan omset clinic, dan penelusuran invoice billing pasien.
                </p>
            </div>

            {/* ACTION & PENCARIAN */}
            <div className="grid sm:grid-cols-3 gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="sm:col-span-2 relative">
                    <MdSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Cari laporan berdasarkan nama pasien atau No. RM..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 text-xs font-semibold rounded-xl border border-gray-100 bg-slate-50/60 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                    />
                </div>
                <button
                    onClick={openTambahReport}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                    <MdAdd size={16} /> Tambah Data Laporan
                </button>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <MdAttachMoney className="text-3xl text-green-600 mb-2" />
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Total Pendapatan (Lunas)</p>
                    <h2 className="text-lg font-black text-green-600 mt-1">Rp {totalOmset.toLocaleString("id-ID")}</h2>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <MdCheckCircle className="text-3xl text-blue-600 mb-2" />
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Transaksi Lunas</p>
                    <h2 className="text-2xl font-black text-blue-600 mt-1">{lunasCount}</h2>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <MdCalendarMonth className="text-3xl text-red-500 mb-2" />
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Belum Lunas</p>
                    <h2 className="text-2xl font-black text-red-500 mt-1">{belumLunasCount}</h2>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <MdPeople className="text-3xl text-cyan-600 mb-2" />
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Jumlah Pasien</p>
                    <h2 className="text-2xl font-black text-cyan-600 mt-1">{totalPasienUnik}</h2>
                </div>
            </div>

            {/* TABEL UTAMA LAPORAN */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                    <h2 className="text-sm font-extrabold text-gray-800 uppercase tracking-wider">Arsip Transaksi Rekam Medis</h2>
                    <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-bold">{filteredReports.length} Entri</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-gray-100 text-slate-400 text-[11px] uppercase font-bold tracking-wider">
                                <th className="p-4 text-left">Identitas Pasien</th>
                                <th className="p-4 text-left">Jenis Perawatan</th>
                                <th className="p-4 text-left">Tanggal</th>
                                <th className="p-4 text-left">Tagihan</th>
                                <th className="p-4 text-center">Status</th>
                                <th className="p-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-semibold text-gray-600 divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-400 font-medium animate-pulse">🔄 Memuat data relasi Supabase...</td>
                                </tr>
                            ) : currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-400 font-medium">❌ Belum ada log data operasional keuangan laporan.</td>
                                </tr>
                            ) : (
                                currentItems.map((item) => {
                                    const dataData = dapatkanDataAman(item);
                                    return (
                                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="p-4">
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{dataData.namaPasien}</h4>
                                                    <p className="text-[11px] text-gray-400 font-mono">{dataData.noRM}</p>
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-700">{dataData.jenisPerawatan}</td>
                                            <td className="p-4 text-gray-400 font-medium">{item.tanggal_laporan || "-"}</td>
                                            <td className="p-4 font-extrabold text-blue-600">Rp {dataData.tagihan.toLocaleString("id-ID")}</td>
                                            <td className="p-4 text-center">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${getStatusColor(dataData.status)}`}>
                                                    {dataData.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button onClick={() => openDetailReport(item)} title="Buka Detail" className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer">
                                                        <MdVisibility size={16} />
                                                    </button>
                                                    <button onClick={() => openEditReport(item)} title="Ubah Log" className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer">
                                                        <MdEdit size={16} />
                                                    </button>
                                                    <button onClick={() => openHapusReport(item)} title="Hapus Berkas" className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer">
                                                        <MdDelete size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className="p-4 bg-slate-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-500">
                    <p>Menampilkan <span className="text-gray-800">{currentItems.length ? indexOfFirstItem + 1 : 0}</span> s/d <span className="text-gray-800">{indexOfFirstItem + currentItems.length}</span> dari <span className="text-blue-600">{filteredReports.length}</span> rekap laporan</p>
                    
                    <div className="flex items-center gap-2">
                        <button 
                            disabled={currentPage === 1 || loading}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="w-9 h-9 bg-white rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-400 transition cursor-pointer shadow-sm flex items-center justify-center"
                        >
                            <MdNavigateBefore size={20} />
                        </button>

                        {pageNumbers.map((number) => (
                            <button
                                key={number}
                                onClick={() => setCurrentPage(number)}
                                className={`w-9 h-9 font-bold rounded-xl transition cursor-pointer shadow-sm flex items-center justify-center text-xs ${
                                    currentPage === number
                                        ? "bg-blue-600 text-white shadow-blue-500/20 shadow-md border border-blue-600"
                                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                                }`}
                            >
                                {number}
                            </button>
                        ))}

                        <button 
                            disabled={currentPage === totalPages || loading}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className="w-9 h-9 bg-white rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-gray-400 transition cursor-pointer shadow-sm flex items-center justify-center"
                        >
                            <MdNavigateNext size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* MODAL SYSTEM */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md rounded-3xl p-6 bg-white border border-gray-100 shadow-xl">
                    
                    {/* FORM INPUT/EDIT */}
                    {(dialogMode === "tambah" || dialogMode === "edit") && (
                        <form onSubmit={dialogMode === "tambah" ? handleCreateReport : handleUpdateReport} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle className="text-base font-extrabold text-gray-900">
                                    {dialogMode === "tambah" ? "Tambah Nota Laporan Finansial" : "Edit Formulir Laporan Medis"}
                                </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-3 text-xs">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Nama Pasien / Keterangan *</label>
                                    <input type="text" required placeholder="E.g. Siti Rahma" value={formNamaPasien} onChange={(e)=>setFormNamaPasien(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 font-bold text-gray-800 outline-none focus:ring-2 focus:ring-blue-500/25" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Tipe / Perawatan</label>
                                        <input type="text" placeholder="Scaling / Operasional" value={formJenisPerawatan} onChange={(e)=>setFormJenisPerawatan(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 font-bold text-gray-700 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Tanggal</label>
                                        <input type="date" value={formTanggalLaporan} onChange={(e)=>setFormTanggalLaporan(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 font-semibold text-gray-700 outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Total Pendapatan (Rp) *</label>
                                    <input type="number" required placeholder="Total nominal" value={formTotalTagihan} onChange={(e)=>setFormTotalTagihan(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 font-bold text-blue-600 text-sm outline-none" />
                                </div>
                            </div>

                            <DialogFooter className="pt-2 gap-2 sm:gap-0">
                                <DialogClose asChild>
                                    <button type="button" className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold cursor-pointer">Batal</button>
                                </DialogClose>
                                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold cursor-pointer hover:bg-blue-700 transition">
                                    Simpan
                                </button>
                            </DialogFooter>
                        </form>
                    )}

                    {/* DETAIL LAPORAN */}
                    {dialogMode === "detail" && selectedReport && (() => {
                        const d = dapatkanDataAman(selectedReport);
                        return (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-sm font-extrabold text-gray-900">📄 Berkas Detail Invoice Laporan</DialogTitle>
                                </DialogHeader>
                                <div className="my-4 p-4 bg-slate-50/80 rounded-2xl border border-gray-100 text-xs font-semibold space-y-2.5 text-gray-700">
                                    <p><span className="text-gray-400 font-medium">Nama Pasien:</span> {d.namaPasien}</p>
                                    <p><span className="text-gray-400 font-medium">No. Rekam Medis:</span> {d.noRM}</p>
                                    <p><span className="text-gray-400 font-medium">Jenis Tindakan:</span> {d.jenisPerawatan}</p>
                                    <p><span className="text-gray-400 font-medium">Tanggal Transaksi:</span> {selectedReport.tanggal_laporan || "-"}</p>
                                    <p className="text-sm text-blue-600 font-black"><span className="text-gray-400 font-medium text-xs">Total Tagihan:</span> Rp {d.tagihan.toLocaleString("id-ID")}</p>
                                    <p><span className="text-gray-400 font-medium">Status Billing:</span> <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getStatusColor(d.status)}`}>{d.status}</span></p>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <button className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold cursor-pointer">Tutup</button>
                                    </DialogClose>
                                </DialogFooter>
                            </>
                        );
                    })()}

                    {/* HAPUS LAPORAN */}
                    {dialogMode === "hapus" && selectedReport && (() => {
                        const d = dapatkanDataAman(selectedReport);
                        return (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-base font-bold text-gray-900">Hapus Arsip Transaksi?</DialogTitle>
                                </DialogHeader>
                                <div className="my-3 p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs">
                                    <p className="font-bold text-gray-900">{d.namaPasien}</p>
                                    <p className="text-gray-400 mt-0.5">{d.jenisPerawatan} — Rp {d.tagihan.toLocaleString("id-ID")}</p>
                                </div>
                                <DialogFooter className="gap-2 sm:gap-0">
                                    <DialogClose asChild>
                                        <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-bold cursor-pointer">Batal</button>
                                    </DialogClose>
                                    <button onClick={() => handleDeleteReport(selectedReport.id)} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold cursor-pointer transition">
                                        Hapus Permanen
                                    </button>
                                </DialogFooter>
                            </>
                        );
                    })()}

                </DialogContent>
            </Dialog>

        </div>
    );
}