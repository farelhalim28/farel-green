// ================================================
// LETAK FILE: src/pages/Pasien.jsx
// Shadcn/ui yang digunakan:
// 1. Table       → @/components/ui/table
// 2. Select      → @/components/ui/select
// 3. Dialog      → @/components/ui/dialog
// ================================================

import { useState } from "react";
import {
    MdPeople, MdSearch, MdVerified,
    MdWorkspacePremium, MdVisibility,
    MdEdit, MdDelete,
} from "react-icons/md";

// ── 1. Import komponen Table dari shadcn/ui ──
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// ── 2. Import komponen Select dari shadcn/ui ──
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// ── 3. Import komponen Dialog dari shadcn/ui ──
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

import patients from "../data/patients.json";

const getMembershipColor = (membership) => {
    switch (membership) {
        case "VIP":      return "bg-purple-100 text-purple-700";
        case "Platinum": return "bg-cyan-100 text-cyan-700";
        case "Gold":     return "bg-yellow-100 text-yellow-700";
        case "Silver":   return "bg-gray-100 text-gray-700";
        default:         return "bg-blue-100 text-blue-700";
    }
};

export default function Pasien() {
    const [search, setSearch]           = useState("");
    const [filterStatus, setFilterStatus] = useState("Semua");
    const [filterLevel, setFilterLevel]   = useState("Semua");
    const [selectedPasien, setSelectedPasien] = useState(null);
    const [dialogOpen, setDialogOpen]   = useState(false);
    const [dialogMode, setDialogMode]   = useState("detail"); // "detail" | "hapus"

    // ── Filter data ──
    const filteredPatients = patients.filter((item) => {
        const matchSearch =
            item.nama.toLowerCase().includes(search.toLowerCase()) ||
            item.no_rm.toLowerCase().includes(search.toLowerCase());
        const matchStatus =
            filterStatus === "Semua" || item.status === filterStatus;
        const matchLevel =
            filterLevel === "Semua" || item.level_member === filterLevel;
        return matchSearch && matchStatus && matchLevel;
    });

    // ── KPI ──
    const totalMember  = patients.filter(p => p.level_member !== "Bronze").length;
    const totalPoin    = patients.reduce((t, p) => t + (p.total_transaksi || 0), 0);
    const pasienAktif  = patients.filter(p => p.status === "Aktif").length;

    // ── Buka dialog ──
    const openDetail = (pasien) => {
        setSelectedPasien(pasien);
        setDialogMode("detail");
        setDialogOpen(true);
    };

    const openHapus = (pasien) => {
        setSelectedPasien(pasien);
        setDialogMode("hapus");
        setDialogOpen(true);
    };

    return (
        <div className="p-6 space-y-6">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Manajemen Pasien</h1>
                        <p className="mt-2 text-blue-100">
                            Kelola data pasien, membership, loyalty point dan komunikasi pasien.
                        </p>
                    </div>
                    <div className="hidden lg:block text-[80px]">👨‍⚕️</div>
                </div>
            </div>

            {/* KPI */}
            <div className="grid md:grid-cols-4 gap-5">
                {[
                    { label: "Total Pasien",       value: patients.length,                 color: "text-blue-600" },
                    { label: "Membership Aktif",   value: totalMember,                     color: "text-yellow-500" },
                    { label: "Total Transaksi",    value: `Rp ${(totalPoin/1000000).toFixed(1)}jt`, color: "text-purple-600" },
                    { label: "Pasien Aktif",       value: pasienAktif,                     color: "text-green-600" },
                ].map((s, i) => (
                    <div key={i} className="bg-white rounded-3xl p-6 shadow-md">
                        <p className="text-gray-500 text-sm">{s.label}</p>
                        <h2 className={`text-4xl font-bold mt-2 ${s.color}`}>{s.value}</h2>
                    </div>
                ))}
            </div>

            {/* SEARCH + FILTER pakai shadcn Select */}
            <div className="bg-white rounded-3xl p-5 shadow-md">
                <div className="flex flex-col md:flex-row gap-3">

                    {/* Search */}
                    <div className="relative flex-1">
                        <MdSearch className="absolute left-4 top-4 text-gray-400 text-xl" />
                        <input
                            type="text"
                            placeholder="Cari Nama Pasien atau Nomor Rekam Medis..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>

                    {/* ── SHADCN SELECT: Filter Status ── */}
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="w-[160px] rounded-xl border-gray-200">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Semua">Semua Status</SelectItem>
                            <SelectItem value="Aktif">Aktif</SelectItem>
                            <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* ── SHADCN SELECT: Filter Level ── */}
                    <Select value={filterLevel} onValueChange={setFilterLevel}>
                        <SelectTrigger className="w-[160px] rounded-xl border-gray-200">
                            <SelectValue placeholder="Level Member" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Semua">Semua Level</SelectItem>
                            <SelectItem value="Platinum">Platinum</SelectItem>
                            <SelectItem value="Gold">Gold</SelectItem>
                            <SelectItem value="Silver">Silver</SelectItem>
                            <SelectItem value="Bronze">Bronze</SelectItem>
                        </SelectContent>
                    </Select>

                </div>
            </div>

            {/* ── SHADCN TABLE ── */}
            <div className="bg-white rounded-3xl shadow-md overflow-hidden">

                <div className="p-6 flex items-center justify-between border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Daftar Pasien</h2>
                    <div className="flex items-center gap-2 text-blue-600 font-medium">
                        <MdPeople />
                        <span>{filteredPatients.length} Pasien</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-blue-600">
                            <TableRow>
                                {["Pasien", "No RM", "Telepon", "Level Member", "Total Transaksi", "Status", "Aksi"].map((h, i) => (
                                    <TableHead key={i} className="text-white font-semibold">{h}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {filteredPatients.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-10 text-gray-400">
                                        Tidak ada data ditemukan
                                    </TableCell>
                                </TableRow>
                            ) : filteredPatients.map((pasien) => (
                                <TableRow
                                    key={pasien.id}
                                    className="border-b border-gray-100 hover:bg-blue-50 transition"
                                >
                                    {/* Pasien */}
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <img src={pasien.foto} alt={pasien.nama} className="w-12 h-12 rounded-full object-cover" />
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{pasien.nama}</h3>
                                                <p className="text-sm text-gray-500">{pasien.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* No RM */}
                                    <TableCell className="font-medium">{pasien.no_rm}</TableCell>

                                    {/* Telepon */}
                                    <TableCell>{pasien.no_telepon}</TableCell>

                                    {/* Level Member */}
                                    <TableCell>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getMembershipColor(pasien.level_member)}`}>
                                            <MdWorkspacePremium className="inline mr-1" />
                                            {pasien.level_member}
                                        </span>
                                    </TableCell>

                                    {/* Total Transaksi */}
                                    <TableCell className="font-bold text-purple-600">
                                        Rp {pasien.total_transaksi?.toLocaleString("id-ID")}
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            pasien.status === "Aktif"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}>
                                            <MdVerified className="inline mr-1" />
                                            {pasien.status}
                                        </span>
                                    </TableCell>

                                    {/* Aksi */}
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openDetail(pasien)}
                                                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
                                            >
                                                <MdVisibility size={18} />
                                            </button>
                                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition">
                                                <MdEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => openHapus(pasien)}
                                                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                                            >
                                                <MdDelete size={18} />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
                    Menampilkan {filteredPatients.length} dari {patients.length} pasien
                </div>
            </div>

            {/* ── SHADCN DIALOG: Detail & Konfirmasi Hapus ── */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md">

                    {/* Mode: Detail Pasien */}
                    {dialogMode === "detail" && selectedPasien && (
                        <>
                            <DialogHeader>
                                <DialogTitle>Detail Pasien</DialogTitle>
                                <DialogDescription>
                                    Informasi lengkap data pasien
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex items-center gap-4 py-2">
                                <img
                                    src={selectedPasien.foto}
                                    alt={selectedPasien.nama}
                                    className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-100"
                                />
                                <div>
                                    <p className="font-bold text-gray-800 text-base">{selectedPasien.nama}</p>
                                    <p className="text-xs text-gray-400">{selectedPasien.no_rm}</p>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getMembershipColor(selectedPasien.level_member)}`}>
                                        {selectedPasien.level_member}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm">
                                {[
                                    { label: "No. Telepon",   value: selectedPasien.no_telepon },
                                    { label: "Email",         value: selectedPasien.email },
                                    { label: "Alamat",        value: `${selectedPasien.alamat}, ${selectedPasien.kota}` },
                                    { label: "Alergi",        value: selectedPasien.alergi },
                                    { label: "Riwayat",       value: selectedPasien.riwayat_penyakit },
                                    { label: "Kunjungan",     value: `${selectedPasien.total_kunjungan}x` },
                                    { label: "Total Transaksi", value: `Rp ${selectedPasien.total_transaksi?.toLocaleString("id-ID")}` },
                                    { label: "Sumber",        value: selectedPasien.sumber_referral },
                                    { label: "Catatan Admin", value: selectedPasien.catatan_admin || "-" },
                                ].map(({ label, value }) => (
                                    <div key={label} className="flex gap-3">
                                        <span className="text-gray-400 w-32 flex-shrink-0">{label}</span>
                                        <span className="text-gray-700 font-medium">{value}</span>
                                    </div>
                                ))}
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm font-medium">
                                        Tutup
                                    </button>
                                </DialogClose>
                            </DialogFooter>
                        </>
                    )}

                    {/* Mode: Konfirmasi Hapus */}
                    {dialogMode === "hapus" && selectedPasien && (
                        <>
                            <DialogHeader>
                                <DialogTitle>Hapus Pasien</DialogTitle>
                                <DialogDescription>
                                    Apakah kamu yakin ingin menghapus data pasien ini? Tindakan ini tidak dapat dibatalkan.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-xl border border-red-100">
                                <img src={selectedPasien.foto} className="w-12 h-12 rounded-full object-cover" alt={selectedPasien.nama} />
                                <div>
                                    <p className="font-semibold text-gray-800">{selectedPasien.nama}</p>
                                    <p className="text-xs text-gray-400">{selectedPasien.no_rm}</p>
                                </div>
                            </div>

                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm font-medium">
                                        Batal
                                    </button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold">
                                        Ya, Hapus
                                    </button>
                                </DialogClose>
                            </DialogFooter>
                        </>
                    )}

                </DialogContent>
            </Dialog>

        </div>
    );
}