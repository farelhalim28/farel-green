// ================================================
// LETAK FILE: src/pages/Pembayaran.jsx
// REVISI TOTAL: BERSIH, KONSISTEN, & CRUD PARIPURNA
// ================================================

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
    MdPrint
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

import initialPayments from "../data/payments.json";

export default function Pembayaran() {
    const [paymentsList, setPaymentsList] = useState(initialPayments);
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("Semua");

    // State Modal Management
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState("detail"); // detail / tambah / edit / hapus

    // State Form Kontrol Input
    const [formInvoice, setFormInvoice] = useState("");
    const [formNoRM, setFormNoRM] = useState("");
    const [formTanggal, setFormTanggal] = useState("2026-07-08");
    const [formMetode, setFormMetode] = useState("Tunai");
    const [formNominal, setFormNominal] = useState("");
    const [formStatus, setFormStatus] = useState("Pending");

    const searchInputRef = useRef(null);

    useEffect(() => {
        document.title = "Data Pembayaran Pasien — SIGIGI";
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // ── HITUNG METRICS (KPI) STATISTIK ──
    const totalInvoice = paymentsList.length;
    
    const totalPendapatan = paymentsList
        .filter((item) => item.status === "Lunas")
        .reduce((a, b) => a + Number(b.nominal), 0);

    const totalPending = paymentsList.filter(
        (item) => item.status === "Pending"
    ).length;

    const jumlahMetode = new Set(paymentsList.map(item => item.metode)).size;

    // ── FILTER DATA LOGIC ──
    const filteredPayments = paymentsList.filter((item) => {
        const matchSearch =
            item.invoice.toLowerCase().includes(search.toLowerCase()) ||
            item.no_rm.toLowerCase().includes(search.toLowerCase());
        const matchStatus = 
            filterStatus === "Semua" || item.status === filterStatus;

        return matchSearch && matchStatus;
    });

    // ── OPERASI MANAJEMEN CRUD UTUH ──
    
    // 1. Inisiasi Tambah Data
    const openTambahPembayaran = () => {
        const nextId = paymentsList.length > 0 ? Math.max(...paymentsList.map(p => p.id)) + 1 : 1;
        setFormInvoice(`INV-2026-00${nextId}`);
        setFormNoRM("");
        setFormTanggal("2026-07-08");
        setFormMetode("Tunai");
        setFormNominal("");
        setFormStatus("Pending");
        setDialogMode("tambah");
        setDialogOpen(true);
    };

    // 2. Inisiasi Detail Lembar Nota
    const openDetailPembayaran = (item) => {
        setSelectedPayment(item);
        setDialogMode("detail");
        setDialogOpen(true);
    };

    // 3. Inisiasi Edit / Perubahan Tagihan & Status
    const openEditPembayaran = (item) => {
        setSelectedPayment(item);
        setFormInvoice(item.invoice);
        setFormNoRM(item.no_rm);
        setFormTanggal(item.tanggal);
        setFormMetode(item.metode);
        setFormNominal(item.nominal);
        setFormStatus(item.status);
        setDialogMode("edit");
        setDialogOpen(true);
    };

    // 4. Inisiasi Hapus Transaksi
    const openHapusPembayaran = (item) => {
        setSelectedPayment(item);
        setDialogMode("hapus");
        setDialogOpen(true);
    };

    // Handler Eksekusi Simpan Data Baru
    const handleCreatePayment = (e) => {
        e.preventDefault();
        if (!formNoRM || !formNominal) return alert("Nomor RM dan Nominal Wajib Diisi!");

        const newPay = {
            id: Date.now(),
            invoice: formInvoice,
            no_rm: formNoRM,
            tanggal: formTanggal,
            metode: formMetode,
            nominal: parseInt(formNominal, 10),
            status: formStatus
        };

        setPaymentsList([newPay, ...paymentsList]);
        setDialogOpen(false);
    };

    // Handler Eksekusi Update Data Lama (Termasuk Ubah Status Lunas/Pending)
    const handleUpdatePayment = (e) => {
        e.preventDefault();
        setPaymentsList(paymentsList.map(p => {
            if (p.id === selectedPayment.id) {
                return {
                    ...p,
                    no_rm: formNoRM,
                    tanggal: formTanggal,
                    metode: formMetode,
                    nominal: parseInt(formNominal, 10),
                    status: formStatus
                };
            }
            return p;
        }));
        setDialogOpen(false);
    };

    // Handler Eksekusi Hapus Permanen
    const handleDeletePayment = (id) => {
        setPaymentsList(paymentsList.filter(p => p.id !== id));
        setDialogOpen(false);
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50/40 min-h-screen font-sans">

            {/* HEADER BANNER */}
            <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-xl flex justify-between items-center relative overflow-hidden">
                <div className="z-10">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Pembayaran
                    </h1>
                    <p className="mt-2 text-blue-100 max-w-xl text-sm font-medium opacity-90">
                        Monitoring arus kas, validasi tagihan, invoice jaminan BPJS/Asuransi, serta pembukuan transaksi kasir klinik secara realtime.
                    </p>
                </div>
                <div className="hidden lg:block text-[90px] opacity-20 absolute right-10 select-none">
                    💳
                </div>
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
                        placeholder="Cari transaksi berdasarkan kode Invoice atau Nomor Rekam Medis..."
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
                                <th className="p-4 text-left">No. Rekam Medis</th>
                                <th className="p-4 text-left">Tanggal</th>
                                <th className="p-4 text-left">Metode</th>
                                <th className="p-4 text-left">Nominal Tagihan</th>
                                <th className="p-4 text-center">Status</th>
                                <th className="p-4 text-center">Aksi Berkas</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs font-semibold text-gray-600 divide-y divide-gray-50/60">
                            {filteredPayments.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-10 text-center text-gray-400 font-medium">
                                        ❌ Berkas tagihan tidak ditemukan.
                                    </td>
                                </tr>
                            ) : (
                                filteredPayments.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="p-4 font-bold text-gray-900 font-mono tracking-wide">{item.invoice}</td>
                                        <td className="p-4 text-gray-700">{item.no_rm}</td>
                                        <td className="p-4 text-gray-400 font-medium">{item.tanggal}</td>
                                        <td className="p-4">
                                            <span className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-bold text-[10px]">{item.metode}</span>
                                        </td>
                                        <td className="p-4 font-black text-gray-800 text-sm">Rp {item.nominal.toLocaleString("id-ID")}</td>
                                        <td className="p-4 text-center">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === "Lunas" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700 animate-pulse"}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <button onClick={() => openDetailPembayaran(item)} title="Buka Detail" className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition cursor-pointer">
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
            </div>

            {/* DIALOG SYSTEM (CRUD FULLY SECURED) */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md rounded-3xl p-6 bg-white shadow-2xl border border-gray-100">
                    
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
                                    {dialogMode === "tambah" ? "Sistem kasir otomatis mengunci nomor tagihan baru." : "Perubahan finansial dan status keuangan akan langsung memperbarui kalkulasi dashboard."}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-3 text-xs">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">No. Invoice</label>
                                        <input type="text" disabled={dialogMode === "edit"} value={formInvoice} onChange={(e)=>setFormInvoice(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 font-bold bg-slate-50 text-gray-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">No. Rekam Medis *</label>
                                        <input type="text" required placeholder="RM-2026-00X" value={formNoRM} onChange={(e)=>setFormNoRM(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 font-bold tracking-wide outline-none focus:ring-2 focus:ring-blue-500/20" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Tanggal Transaksi</label>
                                        <input type="date" value={formTanggal} onChange={(e)=>setFormTanggal(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 font-semibold text-gray-700 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Metode Transaksi</label>
                                        <select value={formMetode} onChange={(e)=>setFormMetode(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 outline-none">
                                            <option value="Tunai">Cash / Tunai</option>
                                            <option value="Transfer">Bank Transfer</option>
                                            <option value="BPJS">Jaminan BPJS</option>
                                            <option value="Debit Card">Kartu Debit</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Nominal Tagihan (Rp) *</label>
                                        <input type="number" required placeholder="50000" value={formNominal} onChange={(e)=>setFormNominal(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 font-black text-green-600 text-sm outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-wider">Status Verifikasi Keuangan</label>
                                        <select value={formStatus} onChange={(e)=>setFormStatus(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500/20">
                                            <option value="Pending">⏳ Pending</option>
                                            <option value="Lunas">✅ Lunas</option>
                                        </select>
                                    </div>
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

                            <div className="my-4 p-5 bg-slate-50 border border-dashed border-gray-200 rounded-2xl font-mono text-[11px] space-y-3 text-gray-700">
                                <div className="text-center pb-2 border-b border-dashed border-gray-200">
                                    <p className="font-bold text-xs uppercase tracking-wide">SIGIGI CLINIC CENTER</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">Pekanbaru, Riau, Indonesia</p>
                                </div>
                                <div className="space-y-1">
                                    <p><span className="text-gray-400">No. Invoice :</span> {selectedPayment.invoice}</p>
                                    <p><span className="text-gray-400">No. RM      :</span> {selectedPayment.no_rm}</p>
                                    <p><span className="text-gray-400">Tanggal     :</span> {selectedPayment.tanggal}</p>
                                    <p><span className="text-gray-400">Metode Bayar:</span> {selectedPayment.metode}</p>
                                </div>
                                <div className="pt-3 border-t border-dashed border-gray-200 flex justify-between items-center text-sm font-black">
                                    <span className="text-gray-800 font-bold text-xs">TOTAL NETTO:</span>
                                    <span>Rp {selectedPayment.nominal.toLocaleString("id-ID")}</span>
                                </div>
                                <div className="pt-2 flex justify-center">
                                    <span className={`px-4 py-1 rounded text-[10px] font-bold ${selectedPayment.status === "Lunas" ? "bg-green-100 text-green-700 border border-green-200" : "bg-amber-100 text-amber-700 border border-amber-200"}`}>
                                        * STATUS: {selectedPayment.status.toUpperCase()} *
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
                                    <p className="font-mono font-bold text-gray-900">{selectedPayment.invoice}</p>
                                    <p className="text-xs text-rose-700 font-black mt-0.5">Nominal: Rp {selectedPayment.nominal.toLocaleString("id-ID")}</p>
                                </div>
                                <span className="text-xs text-gray-400 font-bold">{selectedPayment.tanggal}</span>
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