import { useState } from "react";
import {
    MdSearch, MdVisibility, MdDelete, MdEdit,
    MdWorkspacePremium, MdAdd, MdAssignmentInd
} from "react-icons/md";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

// ── 1. DATA DUMMY AWAL (BISA DITAMBAH / DIEDIT / DIHAPUS DI LAYAR) ──
const INITIAL_PATIENTS = [
    { id: 1, no_rm: "RM-2026-001", nama: "Siti Aisyah", email: "siti.alsyah@gmail.com", no_telepon: "081234567890", membership: "Gold", poin: 850, status: "Aktif", alamat: "Jl. Sudirman No. 12", jenis_kelamin: "Perempuan", alergi: "Tidak Ada", riwayat_penyakit: "Tidak Ada" },
    { id: 2, no_rm: "RM-2026-002", nama: "Budi Santoso", email: "budi.santoso@gmail.com", no_telepon: "082345678901", membership: "Silver", poin: 520, status: "Aktif", alamat: "Jl. Tuanku Tambusai", jenis_kelamin: "Laki-laki", alergi: "Penicillin", riwayat_penyakit: "Diabetes" },
    { id: 3, no_rm: "RM-2026-003", nama: "Andi Saputra", email: "andi.saputra@gmail.com", no_telepon: "081278991122", membership: "Platinum", poin: 2350, status: "Aktif", alamat: "Jl. Soebrantas No. 89", jenis_kelamin: "Laki-laki", alergi: "Tidak Ada", riwayat_penyakit: "Tidak Ada" },
    { id: 4, no_rm: "RM-2026-004", nama: "Rina Marlina", email: "rina.marlina@gmail.com", no_telepon: "081355667788", membership: "Gold", poin: 1200, status: "Aktif", alamat: "Jl. Riau No. 45", jenis_kelamin: "Perempuan", alergi: "Seafood", riwayat_penyakit: "Maag" },
    { id: 5, no_rm: "RM-2026-005", nama: "Muhammad Rizky", email: "rizky@gmail.com", no_telepon: "081266889900", membership: "Standard", poin: 250, status: "Aktif", alamat: "Jl. Harapan Raya", jenis_kelamin: "Laki-laki", alergi: "Tidak Ada", riwayat_penyakit: "Tidak Ada" },
    { id: 6, no_rm: "RM-2026-006", nama: "Nurul Hidayah", email: "nurul@gmail.com", no_telepon: "081377889900", membership: "Platinum", poin: 1850, status: "Aktif", alamat: "Jl. Paus No. 11", jenis_kelamin: "Perempuan", alergi: "Dingin", riwayat_penyakit: "Asma" }
];

// ── 2. KOMPONEN AVATAR OTOMATIS BERWARNA ──
function PatientAvatar({ nama }) {
    const initial = nama ? nama.charAt(0).toUpperCase() : "?";
    const colors = [
        "bg-blue-500 text-white", "bg-teal-500 text-white", 
        "bg-purple-500 text-white", "bg-indigo-500 text-white", 
        "bg-emerald-500 text-white", "bg-amber-500 text-white"
    ];
    const charCode = initial.charCodeAt(0) || 0;
    const colorClass = colors[charCode % colors.length];

    return (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm tracking-wider shadow-sm border border-gray-100 ${colorClass}`}>
            {initial}
        </div>
    );
}

// Badge Tingkat Loyalty
const getMembershipBadge = (membershipType) => {
    switch (membershipType) {
        case "Platinum": return <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-600 text-white shadow-sm flex items-center gap-1 max-w-fit"><MdWorkspacePremium/> PLATINUM</span>;
        case "Gold":     return <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500 text-white shadow-sm flex items-center gap-1 max-w-fit"><MdWorkspacePremium/> GOLD</span>;
        case "Silver":   return <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-400 text-white shadow-sm flex items-center gap-1 max-w-fit"><MdWorkspacePremium/> SILVER</span>;
        default:         return <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider bg-gray-100 text-gray-500 border border-gray-200 max-w-fit">STANDARD</span>;
    }
};

export default function Pasien() {
    // State Utama Pengelola Data Pasien
    const [patientsList, setPatientsList] = useState(INITIAL_PATIENTS);
    const [search, setSearch]             = useState("");
    
    // State Modal & Aksi Kontrol
    const [selectedPasien, setSelectedPasien] = useState(null);
    const [dialogOpen, setDialogOpen]         = useState(false);
    const [dialogMode, setDialogMode]         = useState("detail"); // detail / tambah / edit / hapus

    // State Pagination Internal
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // State Controlled Form (Untuk Tambah & Edit)
    const [formNama, setFormNama]           = useState("");
    const [formEmail, setFormEmail]         = useState("");
    const [formPhone, setFormPhone]         = useState("");
    const [formMembership, setFormMembership] = useState("Standard");
    const [formStatus, setFormStatus]       = useState("Aktif");

    // Buka Modal Tambah Pasien
    const openAddModal = () => {
        setFormNama("");
        setFormEmail("");
        setFormPhone("");
        setFormMembership("Standard");
        setFormStatus("Aktif");
        setDialogMode("tambah");
        setDialogOpen(true);
    };

    // Buka Modal Edit Pasien
    const openEditModal = (pasien) => {
        setSelectedPasien(pasien);
        setFormNama(pasien.nama);
        setFormEmail(pasien.email);
        setFormPhone(pasien.no_telepon);
        setFormMembership(pasien.membership);
        setFormStatus(pasien.status);
        setDialogMode("edit");
        setDialogOpen(true);
    };

    // ── FUNGSI CRUD LOGIC (STATE MURNI) ──
    
    // 1. CREATE (Tambah Pasien)
    const handleAddPatient = (e) => {
        e.preventDefault();
        const nextId = patientsList.length + 1;
        const newPatient = {
            id: nextId,
            no_rm: `RM-2026-0${nextId}`,
            nama: formNama,
            email: formEmail || `${formNama.toLowerCase().replace(/\s+/g, "")}@gmail.com`,
            no_telepon: formPhone,
            membership: formMembership,
            poin: formMembership === "Platinum" ? 1500 : formMembership === "Gold" ? 500 : 0,
            status: formStatus,
            alamat: "Alamat Baru Pasien",
            jenis_kelamin: "Laki-laki",
            alergi: "Tidak Ada",
            riwayat_penyakit: "Tidak Ada"
        };
        setPatientsList([newPatient, ...patientsList]);
        setDialogOpen(false);
    };

    // 2. UPDATE (Simpan Perubahan Edit)
    const handleEditPatient = (e) => {
        e.preventDefault();
        setPatientsList(patientsList.map(p => 
            p.id === selectedPasien.id 
                ? { ...p, nama: formNama, email: formEmail, no_telepon: formPhone, membership: formMembership, status: formStatus }
                : p
        ));
        setDialogOpen(false);
    };

    // 3. DELETE (Hapus Data Pasien)
    const executeDelete = (id) => {
        setPatientsList(patientsList.filter(p => p.id !== id));
        setDialogOpen(false);
    };

    // Filter Pencarian
    const filteredPatients = patientsList.filter((item) => {
        return item.nama.toLowerCase().includes(search.toLowerCase()) || item.no_rm.toLowerCase().includes(search.toLowerCase());
    });

    // Pagination Slice Data
    const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPatients = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="p-6 space-y-6 bg-gray-50/40 min-h-screen">
            
            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-6 text-white shadow-md flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Manajemen Pasien</h1>
                    <p className="text-sm opacity-90 mt-1">Sistem Prototype CRUD Internal Tanpa Database</p>
                </div>
            </div>

            {/* BAR CARI & TOMBOL TAMBAH */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-3 items-center justify-between">
                <div className="relative w-full md:flex-1">
                    <MdSearch className="absolute left-3 top-3 text-gray-400 text-xl" />
                    <input
                        type="text"
                        placeholder="Cari pasien atau no. RM..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 outline-none focus:border-blue-500"
                    />
                </div>
                <button 
                    onClick={openAddModal}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                    <MdAdd size={16} /> Tambah Pasien
                </button>
            </div>

            {/* TABEL DATA PASIEN */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 font-bold text-xs text-gray-400 uppercase">IDENTITAS PASIEN</th>
                                <th className="p-4 font-bold text-xs text-gray-400 uppercase">NO REKAM MEDIS</th>
                                <th className="p-4 font-bold text-xs text-gray-400 uppercase">KONTAK TELEPON</th>
                                <th className="p-4 font-bold text-xs text-gray-400 uppercase">TINGKAT LOYALTY</th>
                                <th className="p-4 font-bold text-xs text-gray-400 uppercase">TOTAL POIN</th>
                                <th className="p-4 font-bold text-xs text-gray-400 uppercase">STATUS KEAKTIFAN</th>
                                <th className="p-4 font-bold text-xs text-gray-400 uppercase text-center">AKSI TINDAKAN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPatients.map((pasien) => (
                                <tr key={pasien.id} className="border-b border-gray-50 hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <PatientAvatar nama={pasien.nama} />
                                            <div>
                                                <h3 className="font-bold text-gray-800 text-sm">{pasien.nama}</h3>
                                                <p className="text-xs text-gray-400">{pasien.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 font-mono text-xs font-bold text-slate-600">{pasien.no_rm}</td>
                                    <td className="p-4 text-gray-600 font-semibold text-xs">{pasien.no_telepon}</td>
                                    <td className="p-4">{getMembershipBadge(pasien.membership)}</td>
                                    <td className="p-4 font-bold text-emerald-600 text-xs">{pasien.poin} Pts</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${pasien.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                                            ● {pasien.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-1">
                                            <button onClick={() => { setSelectedPasien(pasien); setDialogMode("detail"); setDialogOpen(true); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer" title="Detail"><MdVisibility size={16}/></button>
                                            <button onClick={() => openEditModal(pasien)} className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-lg cursor-pointer" title="Edit"><MdEdit size={16}/></button>
                                            <button onClick={() => { setSelectedPasien(pasien); setDialogMode("hapus"); setDialogOpen(true); }} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer" title="Hapus"><MdDelete size={16}/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* NAVIGATION PAGINATION */}
                <div className="p-4 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
                    <span className="text-xs text-gray-400 font-medium">Menampilkan {currentPatients.length} dari {filteredPatients.length} Pasien</span>
                    <div className="flex items-center gap-1">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="px-2.5 py-1 text-xs font-bold rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 cursor-pointer">&lt;</button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3 py-1 text-xs font-bold rounded-lg ${currentPage === i + 1 ? 'bg-amber-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{i + 1}</button>
                        ))}
                        <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => prev + 1)} className="px-2.5 py-1 text-xs font-bold rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 cursor-pointer">&gt;</button>
                    </div>
                </div>
            </div>

            {/* OVERLAY MODAL MANAGER */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-md bg-white p-6 rounded-2xl border-none shadow-xl">
                    
                    {/* FORM TAMBAH PASIEN */}
                    {dialogMode === "tambah" && (
                        <form onSubmit={handleAddPatient} className="space-y-4">
                            <DialogHeader><DialogTitle className="text-base font-bold text-gray-800">Registrasi Pasien Baru</DialogTitle></DialogHeader>
                            <div className="space-y-3 text-xs">
                                <div>
                                    <label className="block font-bold text-gray-500 mb-1">NAMA LENGKAP *</label>
                                    <input type="text" required placeholder="Contoh: Ahmad Dhani" value={formNama} onChange={(e)=>setFormNama(e.target.value)} className="w-full p-2.5 rounded-lg border border-gray-200 outline-none focus:border-blue-500" />
                                </div>
                                <div>
                                    <label className="block font-bold text-gray-500 mb-1">NOMOR TELEPON *</label>
                                    <input type="text" required placeholder="0812xxxx" value={formPhone} onChange={(e)=>setFormPhone(e.target.value)} className="w-full p-2.5 rounded-lg border border-gray-200 outline-none focus:border-blue-500" />
                                </div>
                                <div>
                                    <label className="block font-bold text-gray-500 mb-1">MEMBERSHIP LEVEL</label>
                                    <select value={formMembership} onChange={(e)=>setFormMembership(e.target.value)} className="w-full p-2.5 rounded-lg border border-gray-200 bg-white outline-none">
                                        <option value="Standard">Standard</option>
                                        <option value="Silver">Silver</option>
                                        <option value="Gold">Gold</option>
                                        <option value="Platinum">Platinum</option>
                                    </select>
                                </div>
                            </div>
                            <DialogFooter className="pt-2"><button type="submit" className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-blue-700">Simpan Pasien</button></DialogFooter>
                        </form>
                    )}

                    {/* FORM EDIT PASIEN */}
                    {dialogMode === "edit" && (
                        <form onSubmit={handleEditPatient} className="space-y-4">
                            <DialogHeader><DialogTitle className="text-base font-bold text-gray-800">Ubah Data Pasien</DialogTitle></DialogHeader>
                            <div className="space-y-3 text-xs">
                                <div>
                                    <label className="block font-bold text-gray-500 mb-1">NAMA PASIEN</label>
                                    <input type="text" required value={formNama} onChange={(e)=>setFormNama(e.target.value)} className="w-full p-2.5 rounded-lg border border-gray-200 outline-none" />
                                </div>
                                <div>
                                    <label className="block font-bold text-gray-500 mb-1">KONTAK TELEPON</label>
                                    <input type="text" required value={formPhone} onChange={(e)=>setFormPhone(e.target.value)} className="w-full p-2.5 rounded-lg border border-gray-200 outline-none" />
                                </div>
                                <div>
                                    <label className="block font-bold text-gray-500 mb-1">STATUS KEAKTIFAN</label>
                                    <select value={formStatus} onChange={(e)=>setFormStatus(e.target.value)} className="w-full p-2.5 rounded-lg border border-gray-200 bg-white">
                                        <option value="Aktif">Aktif</option>
                                        <option value="Tidak Aktif">Tidak Aktif</option>
                                    </select>
                                </div>
                            </div>
                            <DialogFooter className="pt-2"><button type="submit" className="w-full py-2.5 bg-amber-500 text-white rounded-lg text-xs font-bold cursor-pointer hover:bg-amber-600">Simpan Perubahan</button></DialogFooter>
                        </form>
                    )}

                    {/* MODAL DETAIL */}
                    {dialogMode === "detail" && selectedPasien && (
                        <div className="space-y-4">
                            <DialogHeader><DialogTitle className="text-sm font-bold flex items-center gap-1.5 text-gray-700"><MdAssignmentInd className="text-blue-600"/> Kartu Pasien</DialogTitle></DialogHeader>
                            <div className="flex items-center gap-3 py-2 border-b border-gray-100">
                                <PatientAvatar nama={selectedPasien.nama} />
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm">{selectedPasien.nama}</h4>
                                    <p className="text-xs font-mono text-gray-400">{selectedPasien.no_rm}</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-xs text-gray-600">
                                <p><strong>Telepon:</strong> {selectedPasien.no_telepon}</p>
                                <p><strong>Email:</strong> {selectedPasien.email}</p>
                                <p><strong>Alergi:</strong> {selectedPasien.alergi}</p>
                                <p><strong>Riwayat Medis:</strong> {selectedPasien.riwayat_penyakit}</p>
                            </div>
                            <DialogFooter><DialogClose asChild><button className="w-full py-2 bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer">Tutup</button></DialogClose></DialogFooter>
                        </div>
                    )}

                    {/* CONFIRM HAPUS */}
                    {dialogMode === "hapus" && selectedPasien && (
                        <div className="space-y-4">
                            <DialogHeader><DialogTitle className="text-base font-bold text-rose-600">Hapus Data?</DialogTitle></DialogHeader>
                            <p className="text-xs text-gray-500">Menghapus data <strong>{selectedPasien.nama}</strong> bersifat permanen selama sesi browser ini aktif.</p>
                            <div className="flex gap-2 justify-end pt-2">
                                <DialogClose asChild><button className="px-3 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg cursor-pointer">Batal</button></DialogClose>
                                <button onClick={() => executeDelete(selectedPasien.id)} className="px-3 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg cursor-pointer hover:bg-rose-700">Hapus</button>
                            </div>
                        </div>
                    )}

                </DialogContent>
            </Dialog>
        </div>
    );
}

