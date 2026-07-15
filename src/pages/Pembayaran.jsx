import { useState, useEffect, useRef } from "react";
import {
    MdPayments,
    MdAttachMoney,
    MdPendingActions,
    MdReceiptLong,
    MdSearch,
    MdAdd,
    MdVisibility,
    MdEdit,
    MdDelete,
    MdPrint,
    MdNavigateBefore,
    MdNavigateNext
} from "react-icons/md";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
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

// Import sesuai file API Axios kamu
import { pembayaranAPI } from "../services/pembayaranAPI";

export default function Pembayaran() {
    const [paymentsList, setPaymentsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("Semua");

    // ── Pagination State ──
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // State Modal Management
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("detail"); // detail / tambah / edit / hapus

    // State Form Kontrol Input (Disesuaikan dengan field database Supabase)
    const [formInvoiceNo, setFormInvoiceNo] = useState("");
    const [formRekamMedisId, setFormRekamMedisId] = useState("");
    const [formTanggalBayar, setFormTanggalBayar] = useState(new Date().toISOString().split('T')[0]);
    const [formTagihanAwal, setFormTagihanAwal] = useState("");
    const [formDiskon, setFormDiskon] = useState("0");
    const [formTagihanAkhir, setFormTagihanAkhir] = useState("");
    const [formJumlahBayar, setFormJumlahBayar] = useState("");
    const [formKembalian, setFormKembalian] = useState("0");
    const [formMetodePembayaran, setFormMetodePembayaran] = useState("Tunai");
    const [formStatusPembayaran, setFormStatusPembayaran] = useState("Pending");

    const searchInputRef = useRef(null);

    // Otomatis hitung Tagihan Akhir & Kembalian saat input berubah
    useEffect(() => {
        const awal = Number(formTagihanAwal) || 0;
        const disk = Number(formDiskon) || 0;
        const akhir = awal - disk;
        setFormTagihanAkhir(akhir >= 0 ? akhir : 0);
    }, [formTagihanAwal, formDiskon]);

    useEffect(() => {
        const akhir = Number(formTagihanAkhir) || 0;
        const bayar = Number(formJumlahBayar) || 0;
        const kembali = bayar - akhir;
        setFormKembalian(kembali >= 0 ? kembali : 0);
    }, [formTagihanAkhir, formJumlahBayar]);

    // Load Data dari Supabase via Axios pembayarnAPI
    const loadData = async () => {
        try {
            setLoading(true);
            const res = await pembayaranAPI.fetchPembayaran(); // Memanggil fetchPembayaran()
            setPaymentsList(res || []);
        } catch (err) {
            console.error("Gagal memuat data pembayaran:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.title = "Data Pembayaran Pasien — SIGIGI";
        loadData();
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // Kembalikan ke halaman 1 jika filter berubah
    useEffect(() => {
        setCurrentPage(1);
    }, [search, filterStatus]);

    // ── HITUNG METRICS STATISTIK OTOMATIS ──
    const totalInvoice = paymentsList.length;
    const totalPendapatan = paymentsList
        .filter((item) => item.status_pembayaran === "Lunas")
        .reduce((a, b) => a + Number(b.jumlah_bayar || 0), 0);
    const totalPending = paymentsList.filter((item) => item.status_pembayaran === "Pending").length;
    const jumlahMetode = new Set(paymentsList.map((item) => item.metode_pembayaran)).size;

    // ── FILTER DATA LOGIC (Mendukung cari Invoice, ID Rekmed, atau Nama Pasien) ──
    const filteredPayments = paymentsList.filter((item) => {
        const namaPasien = item.rekam_medis?.pasien?.nama || "";
        const matchSearch =
            (item.invoice_no && item.invoice_no.toLowerCase().includes(search.toLowerCase())) ||
            (item.rekam_medis_id && String(item.rekam_medis_id).includes(search)) ||
            namaPasien.toLowerCase().includes(search.toLowerCase());
            
        const matchStatus = filterStatus === "Semua" || item.status_pembayaran === filterStatus;
        return matchSearch && matchStatus;
    });

    // ── KELOLA PAGINATION ──
    const totalItems = filteredPayments.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPayments.slice(indexOfFirstItem, indexOfLastItem);

    // ── OPERASI CRUD ──
    const openTambahPembayaran = () => {
        const nextId = paymentsList.length > 0 ? Math.max(...paymentsList.map((p) => p.id || 0)) + 1 : 1;
        setFormInvoiceNo(`INV-${new Date().getFullYear()}-00${nextId}`);
        setFormRekamMedisId("");
        setFormTanggalBayar(new Date().toISOString().split('T')[0]);
        setFormTagihanAwal("");
        setFormDiskon("0");
        setFormTagihanAkhir("");
        setFormJumlahBayar("");
        setFormKembalian("0");
        setFormMetodePembayaran("Tunai");
        setFormStatusPembayaran("Pending");
        setDialogMode("tambah");
        setDialogOpen(true);
    };

    const openDetailPembayaran = (item) => {
        setSelectedPayment(item);
        setDialogMode("detail");
        setDialogOpen(true);
    };

    const openEditPembayaran = (item) => {
        setSelectedPayment(item);
        setFormInvoiceNo(item.invoice_no || "");
        setFormRekamMedisId(item.rekam_medis_id || "");
        setFormTanggalBayar(item.tanggal_bayar ? item.tanggal_bayar.substring(0, 10) : "");
        setFormTagihanAwal(item.tagihan_awal || "");
        setFormDiskon(item.diskon || "0");
        setFormTagihanAkhir(item.tagihan_akhir || "");
        setFormJumlahBayar(item.jumlah_bayar || "");
        setFormKembalian(item.kembalian || "0");
        setFormMetodePembayaran(item.metode_pembayaran || "Tunai");
        setFormStatusPembayaran(item.status_pembayaran || "Pending");
        setDialogMode("edit");
        setDialogOpen(true);
    };

    const openHapusPembayaran = (item) => {
        setSelectedPayment(item);
        setDialogMode("hapus");
        setDialogOpen(true);
    };

    const handleCreatePayment = async (e) => {
        e.preventDefault();
        if (!formRekamMedisId || !formJumlahBayar) return alert("ID Rekam Medis dan Jumlah Bayar Wajib Diisi!");

        const newPay = {
            invoice_no: formInvoiceNo,
            rekam_medis_id: parseInt(formRekamMedisId, 10),
            tanggal_bayar: new Date(formTanggalBayar).toISOString(),
            tagihan_awal: parseFloat(formTagihanAwal),
            diskon: parseFloat(formDiskon),
            tagihan_akhir: parseFloat(formTagihanAkhir),
            jumlah_bayar: parseFloat(formJumlahBayar),
            kembalian: parseFloat(formKembalian),
            metode_pembayaran: formMetodePembayaran,
            status_pembayaran: formStatusPembayaran
        };

        try {
            await pembayaranAPI.createPembayaran(newPay);
            setDialogOpen(false);
            loadData();
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    const handleUpdatePayment = async (e) => {
        e.preventDefault();
        const updatedData = {
            rekam_medis_id: parseInt(formRekamMedisId, 10),
            tanggal_bayar: new Date(formTanggalBayar).toISOString(),
            tagihan_awal: parseFloat(formTagihanAwal),
            diskon: parseFloat(formDiskon),
            tagihan_akhir: parseFloat(formTagihanAkhir),
            jumlah_bayar: parseFloat(formJumlahBayar),
            kembalian: parseFloat(formKembalian),
            metode_pembayaran: formMetodePembayaran,
            status_pembayaran: formStatusPembayaran
        };

        try {
            await pembayaranAPI.updatePembayaran(selectedPayment.id, updatedData);
            setDialogOpen(false);
            loadData();
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    const handleDeletePayment = async (id) => {
        try {
            await pembayaranAPI.deletePembayaran(id);
            setDialogOpen(false);
            loadData();
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50/40 min-h-screen font-sans">

            {/* HEADER BANNER */}
            <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-xl flex justify-between items-center relative overflow-hidden">
                <div className="z-10">
                    <h1 className="text-4xl font-extrabold tracking-tight">Pembayaran</h1>
                    <p className="mt-2 text-blue-100 max-w-xl text-sm font-medium opacity-90">
                        Monitoring arus kas, kasir klinik, validasi tagihan awal, diskon pengobatan, serta pelacakan status pembayaran pasien realtime.
                    </p>
                </div>
                <div className="hidden lg:block text-[90px] opacity-20 absolute right-10 select-none">💳</div>
            </div>

            {/* BAR OPERASI KASIR */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 gap-3">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Sistem Kasir SIGIGI Aktif
                </div>
                <button
                    onClick={openTambahPembayaran}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md shadow-blue-100"
                >
                    <MdAdd size={16} /> Buat Invoice Baru
                </button>
            </div>

            {/* METRICS METERS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                    <div>
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                            <MdReceiptLong size={22} />
                        </div>
                        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Total Invoice</p>
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 mt-2 tracking-tight">{totalInvoice}</h2>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                    <div>
                        <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-4">
                            <MdAttachMoney size={22} />
                        </div>
                        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Total Pendapatan</p>
                    </div>
                    <h2 className="text-2xl font-black text-green-600 mt-2 tracking-tight">Rp {totalPendapatan.toLocaleString("id-ID")}</h2>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                    <div>
                        <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center mb-4">
                            <MdPendingActions size={22} />
                        </div>
                        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Invoice Pending</p>
                    </div>
                    <h2 className="text-3xl font-black text-yellow-500 mt-2 tracking-tight">{totalPending}</h2>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition">
                    <div>
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                            <MdPayments size={22} />
                        </div>
                        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-wider">Metode Aktif</p>
                    </div>
                    <h2 className="text-3xl font-black text-indigo-600 mt-2 tracking-tight">{jumlahMetode}</h2>
                </div>
            </div>

            {/* FILTER & PENCARIAN */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:flex-1">
                    <MdSearch className="absolute left-4 top-3.5 text-gray-400 text-xl" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Cari berdasarkan kode Invoice, ID Rekam Medis, atau Nama Pasien..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 text-sm font-medium rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-gray-400"
                    />
                </div>

                <div className="flex gap-3 w-full md:w-auto items-center justify-end">
                    <div className="flex flex-col w-full md:w-[160px]">
                        <span className="text-[10px] font-bold text-gray-400 uppercase mb-1 px-1 tracking-wider">Filter Status</span>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                            <SelectTrigger className="rounded-xl border-gray-200 font-bold text-xs h-11 bg-slate-50/50">
                                <SelectValue placeholder="Semua Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-white rounded-xl shadow-lg border-gray-100 text-xs font-semibold">
                                <SelectItem value="Semua">Semua Tagihan</SelectItem>
                                <SelectItem value="Lunas">✅ Lunas</SelectItem>
                                <SelectItem value="Pending">⏳ Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* TABEL DATA TRANSAKSI UTAMA */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <h2 className="text-lg font-extrabold text-gray-800 tracking-tight">Daftar Arsip Pembayaran</h2>
                    <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl font-bold">{filteredPayments.length} Baris Transaksi</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-gray-100 text-slate-400 text-[11px] uppercase font-bold tracking-wider">
                                <th className="p-4 text-left">Nomor Invoice</th>
                                <th className="p-4 text-left">ID Rekmed (Pasien)</th>
                                <th className="p-4 text-left">Tanggal Bayar</th>
                                <th className="p-4 text-left">Metode</th>
                                <th className="p-4 text-left">Total Tagihan</th>
                                <th className="p-4 text-center">Status</th>
                                <th className="p-4 text-center">Aksi Berkas</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-semibold text-gray-600 divide-y divide-gray-50/60">
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="p-10 text-center text-gray-400 font-medium">
                                        ⏳ Menghubungkan ke Supabase dan memuat arsip pembayaran...
                                    </td>
                                </tr>
                            ) : currentItems.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-10 text-center text-gray-400 font-medium">
                                        ❌ Berkas tagihan tidak ditemukan.
                                    </td>
                                </tr>
                            ) : (
                                currentItems.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="p-4 font-bold text-gray-900 font-mono tracking-wide">{item.invoice_no}</td>
                                        <td className="p-4 text-gray-700">
                                            ID: {item.rekam_medis_id} 
                                            <span className="block text-[10px] text-gray-400 font-normal">
                                                {item.rekam_medis?.pasien?.nama || "Tanpa Nama"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-400 font-medium">
                                            {item.tanggal_bayar ? new Date(item.tanggal_bayar).toLocaleDateString("id-ID") : "-"}
                                        </td>
                                        <td className="p-4">
                                            <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-bold text-[10px]">{item.metode_pembayaran}</span>
                                        </td>
                                        <td className="p-4 font-black text-gray-800 text-sm">
                                            Rp {Number(item.tagihan_akhir || 0).toLocaleString("id-ID")}
                                            {Number(item.diskon) > 0 && (
                                                <span className="block text-[10px] text-rose-500 font-medium line-through">
                                                    Rp {Number(item.tagihan_awal).toLocaleString("id-ID")}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status_pembayaran === "Lunas" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                                                {item.status_pembayaran}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <button onClick={() => openDetailPembayaran(item)} title="Buka Detail Kwitansi" className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition cursor-pointer">
                                                    <MdVisibility size={16} />
                                                </button>
                                                <button onClick={() => openEditPembayaran(item)} title="Ubah Data Tagihan" className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition cursor-pointer">
                                                    <MdEdit size={16} />
                                                </button>
                                                <button onClick={() => openHapusPembayaran(item)} title="Hapus Invoice" className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer">
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

                {/* FOOTER PAGINATION */}
                <div className="p-4 bg-white border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs font-semibold text-gray-400">
                        Menampilkan <span className="text-gray-700 font-bold">{totalItems > 0 ? indexOfFirstItem + 1 : 0}</span> sampai{" "}
                        <span className="text-gray-700 font-bold">{indexOfLastItem > totalItems ? totalItems : indexOfLastItem}</span> dari{" "}
                        <span className="text-gray-700 font-bold">{totalItems}</span> total transaksi
                    </p>

                    <div className="flex items-center gap-1.5">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                            className="p-2 border border-gray-200 rounded-xl bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition flex items-center justify-center cursor-pointer"
                        >
                            <MdNavigateBefore size={16} />
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum = currentPage - 2 + i;
                                if (currentPage <= 2) pageNum = i + 1;
                                if (currentPage >= totalPages - 1) pageNum = totalPages - 4 + i;
                                if (pageNum < 1 || pageNum > totalPages) return null;

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                                            currentPage === pageNum
                                                ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                                                : "border border-gray-200 bg-white text-gray-600 hover:bg-slate-50"
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="p-2 border border-gray-200 rounded-xl bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white transition flex items-center justify-center cursor-pointer"
                        >
                            <MdNavigateNext size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* DIALOG SYSTEM (CRUD FULLY SECURED) */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md rounded-3xl p-6 bg-white shadow-2xl border border-gray-100 overflow-y-auto max-h-[90vh]">
                    
                    {/* MODAL EDIT & TAMBAH DATA FORM */}
                    {(dialogMode === "tambah" || dialogMode === "edit") && (
                        <form onSubmit={dialogMode === "tambah" ? handleCreatePayment : handleUpdatePayment} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                        {dialogMode === "tambah" ? <MdAdd size={20} /> : <MdEdit size={20} />}
                                    </div>
                                    {dialogMode === "tambah" ? "Buat Tagihan Kasir Baru" : "Ubah Data Tagihan Pasien"}
                                </DialogTitle>
                                <DialogDescription className="text-xs text-gray-400">
                                    Simpan data finansial sesuai dengan rincian tindakan medis pasien.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-3 text-xs">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">No. Invoice</label>
                                        <input type="text" disabled value={formInvoiceNo} className="w-full p-3 rounded-xl border border-gray-200 font-bold bg-slate-50 text-gray-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">ID Rekam Medis (int) *</label>
                                        <input type="number" required placeholder="Contoh: 12" value={formRekamMedisId} onChange={(e) => setFormRekamMedisId(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 font-bold tracking-wide outline-none focus:ring-2 focus:ring-blue-500/20" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Tanggal Bayar</label>
                                        <input type="date" value={formTanggalBayar} onChange={(e) => setFormTanggalBayar(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 font-semibold text-gray-700 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Metode Pembayaran</label>
                                        <select value={formMetodePembayaran} onChange={(e) => setFormMetodePembayaran(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 outline-none">
                                            <option value="Tunai">Cash / Tunai</option>
                                            <option value="Transfer">Bank Transfer</option>
                                            <option value="BPJS">Jaminan BPJS</option>
                                            <option value="Debit Card">Kartu Debit</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Tagihan Awal</label>
                                        <input type="number" required placeholder="0" value={formTagihanAwal} onChange={(e) => setFormTagihanAwal(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 font-bold outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Diskon (Rp)</label>
                                        <input type="number" placeholder="0" value={formDiskon} onChange={(e) => setFormDiskon(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 font-bold text-rose-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Tagihan Akhir</label>
                                        <input type="number" disabled value={formTagihanAkhir} className="w-full p-2.5 rounded-xl border border-gray-200 bg-slate-50 font-black text-gray-700 outline-none" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Jumlah Bayar *</label>
                                        <input type="number" required placeholder="0" value={formJumlahBayar} onChange={(e) => setFormJumlahBayar(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 font-black text-green-600 text-sm outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Kembalian</label>
                                        <input type="number" disabled value={formKembalian} className="w-full p-3 rounded-xl border border-gray-200 bg-slate-50 font-bold text-blue-600 outline-none" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Status Verifikasi Keuangan</label>
                                    <select value={formStatusPembayaran} onChange={(e) => setFormStatusPembayaran(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20">
                                        <option value="Pending">⏳ Pending</option>
                                        <option value="Lunas">✅ Lunas</option>
                                    </select>
                                </div>
                            </div>

                            <DialogFooter className="pt-2 gap-2 sm:gap-0">
                                <DialogClose asChild>
                                    <button type="button" className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold cursor-pointer">Batal</button>
                                </DialogClose>
                                <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer shadow-md shadow-blue-100">
                                    {dialogMode === "tambah" ? "Rilis Tagihan" : "Simpan Perubahan"}
                                </button>
                            </DialogFooter>
                        </form>
                    )}

                    {/* MODAL DETAIL KWITANSI */}
                    {dialogMode === "detail" && selectedPayment && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-lg font-black text-gray-800">📄 Salinan Nota Resmi Kwitansi</DialogTitle>
                                <DialogDescription className="text-xs text-gray-400">SIGIGI Health Center Management System.</DialogDescription>
                            </DialogHeader>

                            <div className="my-4 p-5 bg-slate-50 border border-dashed border-gray-200 rounded-2xl font-mono text-[11px] space-y-2 text-gray-700">
                                <div className="text-center pb-2 border-b border-dashed border-gray-200">
                                    <p className="font-bold text-xs uppercase tracking-wide">SIGIGI CLINIC CENTER</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">Pekanbaru, Riau, Indonesia</p>
                                </div>
                                <div className="space-y-1">
                                    <p><span className="text-gray-400">No. Invoice :</span> {selectedPayment.invoice_no}</p>
                                    <p><span className="text-gray-400">ID Rekmed    :</span> {selectedPayment.rekam_medis_id}</p>
                                    <p><span className="text-gray-400">Nama Pasien  :</span> {selectedPayment.rekam_medis?.pasien?.nama || "-"}</p>
                                    <p><span className="text-gray-400">Tanggal      :</span> {selectedPayment.tanggal_bayar ? new Date(selectedPayment.tanggal_bayar).toLocaleString("id-ID") : "-"}</p>
                                    <p><span className="text-gray-400">Metode Bayar :</span> {selectedPayment.metode_pembayaran}</p>
                                </div>
                                <div className="pt-2 border-t border-dashed border-gray-100 space-y-0.5 text-right">
                                    <p>Tagihan Awal : Rp {Number(selectedPayment.tagihan_awal || 0).toLocaleString("id-ID")}</p>
                                    <p className="text-rose-500">Diskon : -Rp {Number(selectedPayment.diskon || 0).toLocaleString("id-ID")}</p>
                                    <p className="font-bold text-gray-900">Tagihan Akhir : Rp {Number(selectedPayment.tagihan_akhir || 0).toLocaleString("id-ID")}</p>
                                    <p className="text-green-600">Jumlah Bayar : Rp {Number(selectedPayment.jumlah_bayar || 0).toLocaleString("id-ID")}</p>
                                    <p className="text-blue-600">Kembalian : Rp {Number(selectedPayment.kembalian || 0).toLocaleString("id-ID")}</p>
                                </div>
                                <div className="pt-2 flex justify-center">
                                    <span className={`px-4 py-1 rounded text-[10px] font-bold ${selectedPayment.status_pembayaran === "Lunas" ? "bg-green-100 text-green-700 border border-green-200" : "bg-amber-100 text-amber-700 border border-amber-200"}`}>
                                        * STATUS: {String(selectedPayment.status_pembayaran).toUpperCase()} *
                                    </span>
                                </div>
                            </div>

                            <DialogFooter className="gap-2 sm:gap-0">
                                <button onClick={() => alert("Printer Kasir Thermal tidak terdeteksi.")} className="px-4 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"><MdPrint size={14}/> Cetak</button>
                                <DialogClose asChild>
                                    <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold cursor-pointer">Tutup</button>
                                </DialogClose>
                            </DialogFooter>
                        </>
                    )}

                    {/* MODAL HAPUS TRANSAKSI */}
                    {dialogMode === "hapus" && selectedPayment && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-lg font-bold text-gray-800">Hapus Invoice Finansial</DialogTitle>
                                <DialogDescription className="text-xs text-gray-400">
                                    Tindakan menghapus data transaksi bersifat permanen dan berisiko merusak pencatatan neraca keuangan bulanan.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="my-4 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex justify-between items-center">
                                <div>
                                    <p className="font-mono font-bold text-gray-900">{selectedPayment.invoice_no}</p>
                                    <p className="text-xs text-rose-700 font-black mt-0.5">Total: Rp {Number(selectedPayment.tagihan_akhir || 0).toLocaleString("id-ID")}</p>
                                </div>
                                <span className="text-xs text-gray-400 font-bold">ID RM: {selectedPayment.rekam_medis_id}</span>
                            </div>

                            <DialogFooter className="gap-2 sm:gap-0">
                                <DialogClose asChild>
                                    <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-xs font-bold cursor-pointer">Batalkan</button>
                                </DialogClose>
                                <button onClick={() => handleDeletePayment(selectedPayment.id)} className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold cursor-pointer transition">
                                    Ya, Hapus Permanen
                                </button>
                            </DialogFooter>
                        </>
                    )}

                </DialogContent>
            </Dialog>

        </div>
    );
}