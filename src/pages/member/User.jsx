// =========================================================================
// LETAK FILE: src/pages/User.jsx
// =========================================================================
import { useState, useEffect } from "react";
import { userService } from "../services/userService";
import { 
  MdSearch, 
  MdChevronLeft, 
  MdChevronRight, 
  MdDelete, 
  MdEdit, 
  MdAdd, 
  MdClose,
  MdPeopleOutline
} from "react-icons/md";

export default function User() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 5; // Jumlah data per halaman

  // State Modal CRUD
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    email: "",
    no_whatsapp: "",
    password: "",
    role: "member",
    tier_membership: "Silver"
  });

  // Mengambil data dari API Service
  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await userService.getUsersPaged(page, pageSize, search);
      setUsers(res.data);
      setTotal(res.totalCount);
    } catch (err) {
      console.error("Gagal memuat data member/pasien:", err);
    } finally {
      setLoading(false);
    }
  };

  // Efek samping untuk memicu reload data ketika page atau search berubah
  useEffect(() => {
    loadUsers();
  }, [page, search]);

  // Mengatur pembukaan modal (Tambah baru vs Edit data)
  const handleOpenModal = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setFormData({ 
        nama_lengkap: user.nama_lengkap,
        email: user.email,
        no_whatsapp: user.no_whatsapp,
        password: "", // Kosongkan password demi keamanan saat edit
        role: user.role || "member",
        tier_membership: user.tier_membership || "Silver"
      });
    } else {
      setSelectedUser(null);
      setFormData({
        nama_lengkap: "",
        email: "",
        no_whatsapp: "",
        password: "",
        role: "member",
        tier_membership: "Silver"
      });
    }
    setModalOpen(true);
  };

  // Eksekusi Submit data (Create / Update)
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        // Jika password dikosongkan saat edit, hapus key password dari payload agar tidak menimpa password lama
        const payload = { ...formData };
        if (!payload.password) delete payload.password;
        
        await userService.updateUser(selectedUser.id, payload);
      } else {
        await userService.createUser(formData);
      }
      setModalOpen(false);
      loadUsers();
    } catch (err) {
      alert("Gagal menyimpan data pengguna. Silakan periksa kembali input Anda.");
    }
  };

  // Eksekusi Hapus data (Delete)
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data member/pasien ini?")) {
      try {
        await userService.deleteUser(id);
        loadUsers();
      } catch (err) {
        alert("Gagal menghapus data.");
      }
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <MdPeopleOutline size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">Kelola Pengguna & Pasien</h1>
            <p className="text-sm text-slate-500">Manajemen database keanggotaan dan registrasi nomor rekam medis klinik.</p>
          </div>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="w-full md:w-auto bg-blue-600 text-white px-5 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-100 hover:bg-blue-700 transition"
        >
          <MdAdd size={20} /> Tambah Pasien Baru
        </button>
      </div>

      {/* SEARCH FILTER */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
        <MdSearch className="text-slate-400" size={24} />
        <input 
          type="text" 
          className="w-full bg-transparent text-sm focus:outline-none text-slate-700 placeholder-slate-400 font-medium" 
          placeholder="Cari berdasarkan nama lengkap member atau pasien..." 
          value={search} 
          onChange={e => { setSearch(e.target.value); setPage(1); }} 
        />
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 text-xs font-bold uppercase border-b border-slate-100 tracking-wider">
                <th className="p-4 pl-6">Nama Lengkap & No RM</th>
                <th className="p-4">Informasi Kontak</th>
                <th className="p-4">Hak Akses</th>
                <th className="p-4">Tier Membership</th>
                <th className="p-4 text-center pr-6">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700 font-medium">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full anonymity animate-spin"></div>
                      <p className="text-xs font-semibold animate-pulse mt-2">Menyinkronkan basis data...</p>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-400 font-semibold">
                    Tidak ada data member_pasien ditemukan.
                  </td>
                </tr>
              ) : (
                users.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 pl-6">
                      <p className="font-bold text-slate-800">{u.nama_lengkap}</p>
                      <span className="text-xs font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md inline-block mt-1 font-semibold">
                        {u.no_rm || "Belum Ter-generate"}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-slate-600 text-xs font-normal">{u.email}</p>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{u.no_whatsapp}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-xl text-xs font-bold uppercase tracking-wider ${
                        u.role === "admin" ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`font-bold text-xs px-2.5 py-1 rounded-xl ${
                        u.tier_membership === 'Platinum' ? 'bg-purple-50 text-purple-600' :
                        u.tier_membership === 'Gold' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {u.tier_membership || "-"}
                      </span>
                    </td>
                    <td className="p-4 pr-6">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => handleOpenModal(u)} 
                          className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition text-slate-500"
                        >
                          <MdEdit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(u.id)} 
                          className="p-2 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition text-slate-500"
                        >
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
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-semibold px-6">
          <p>Menampilkan {users.length} dari {total} entitas</p>
          <div className="flex items-center gap-2">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)} 
              className="p-2 border border-slate-200 rounded-xl bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
            >
              <MdChevronLeft size={18} />
            </button>
            <span className="font-bold text-slate-700 bg-white border px-3 py-1.5 rounded-xl">
              Halaman {page} dari {totalPages || 1}
            </span>
            <button 
              disabled={page >= totalPages} 
              onClick={() => setPage(p => p + 1)} 
              className="p-2 border border-slate-200 rounded-xl bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
            >
              <MdChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* CRUD POPUP MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <form 
            onSubmit={handleSave} 
            className="bg-white rounded-[32px] max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 animate-slideUp"
          >
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="text-lg font-black text-slate-800">
                {selectedUser ? "Ubah Informasi Pasien" : "Registrasi Member Baru"}
              </h3>
              <button 
                type="button" 
                onClick={() => setModalOpen(false)} 
                className="p-1 hover:bg-slate-100 rounded-full transition text-slate-400 hover:text-slate-600"
              >
                <MdClose size={20} />
              </button>
            </div>
            
            <div className="space-y-3.5 text-sm">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  required 
                  className="w-full border border-slate-200 p-3 rounded-2xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition" 
                  value={formData.nama_lengkap} 
                  onChange={e => setFormData({...formData, nama_lengkap: e.target.value})} 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Alamat Email</label>
                <input 
                  type="email" 
                  required 
                  className="w-full border border-slate-200 p-3 rounded-2xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition" 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">No. WhatsApp</label>
                <input 
                  type="text" 
                  required 
                  className="w-full border border-slate-200 p-3 rounded-2xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition" 
                  value={formData.no_whatsapp} 
                  onChange={e => setFormData({...formData, no_whatsapp: e.target.value})} 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Kata Sandi (Password)</label>
                <input 
                  type="password" 
                  required={!selectedUser} 
                  className="w-full border border-slate-200 p-3 rounded-2xl bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition" 
                  placeholder={selectedUser ? "Kosongkan jika tidak ingin mengubah password" : "••••••••"} 
                  value={formData.password} 
                  onChange={e => setFormData({...formData, password: e.target.value})} 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Otoritas Akses</label>
                  <select 
                    className="w-full border border-slate-200 p-3 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition font-medium" 
                    value={formData.role} 
                    onChange={e => setFormData({...formData, role: e.target.value, tier_membership: e.target.value === "admin" ? "" : "Silver"})}
                  >
                    <option value="member">Member/Pasien</option>
                    <option value="admin">Admin ERP</option>
                  </select>
                </div>
                {formData.role === "member" && (
                  <div>
                    <label className="text-xs font-bold text-slate-600 block mb-1">Tier Membership</label>
                    <select 
                      className="w-full border border-slate-200 p-3 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition font-medium" 
                      value={formData.tier_membership} 
                      onChange={e => setFormData({...formData, tier_membership: e.target.value})}
                    >
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t text-sm">
              <button 
                type="button" 
                onClick={() => setModalOpen(false)} 
                className="px-5 py-2.5 border border-slate-200 rounded-2xl hover:bg-slate-50 font-bold text-slate-500 transition"
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 transition"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}