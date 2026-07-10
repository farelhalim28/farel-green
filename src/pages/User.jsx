// =========================================================================
// LETAK FILE: src/pages/User.jsx
// =========================================================================
import { useState, useEffect } from 'react';
import { MdDelete, MdEdit, MdSave, MdClose, MdPersonAdd, MdCheckCircle, MdError } from 'react-icons/md';
import { userAPI } from '../services/userAPI';

const EMPTY_FORM = { name: '', email: '', password: '', role: 'staff' };

export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dataForm, setDataForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await userAPI.fetchUsers();
      setUsers(data);
    } catch (err) {
      setError('Gagal memuat data user dari Supabase.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      await userAPI.createUser(dataForm);
      setSuccess('User admin baru berhasil ditambahkan ke database!');
      setDataForm(EMPTY_FORM);
      setTimeout(() => setSuccess(''), 3000);
      loadUsers();
    } catch (err) {
      setError(`Gagal menambahkan user: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm('Yakin ingin menghapus hak akses user ini?');
    if (!konfirmasi) return;
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      await userAPI.deleteUser(id);
      setSuccess('Akses akun user berhasil dicabut!');
      setTimeout(() => setSuccess(''), 3000);
      loadUsers();
    } catch (err) {
      setError(`Gagal menghapus user: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditStart = (user) => {
    setEditId(user.id);
    setEditForm({ name: user.name, email: user.email, password: '', role: user.role });
  };

  const handleEditSave = async (id) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // Ambil data form edit, buang field password jika kosong agar tidak menimpa password lama di DB
      const payload = {
        name: editForm.name,
        email: editForm.email,
        role: editForm.role
      };
      
      if (editForm.password && editForm.password.trim() !== '') {
        payload.password = editForm.password;
      }

      await userAPI.updateUser(id, payload);
      setSuccess('Data internal kredensial user berhasil diperbarui!');
      setEditId(null);
      setTimeout(() => setSuccess(''), 3000);
      loadUsers();
    } catch (err) {
      setError(`Gagal memperbarui data: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const roleBadge = (role) => {
    if (role === 'superadmin') return 'bg-purple-50 text-purple-600 border border-purple-200';
    if (role === 'dokter') return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
    return 'bg-blue-50 text-blue-600 border border-blue-200';
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50/50 min-h-screen font-sans">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-6 text-white shadow-sm">
        <h1 className="text-2xl font-black tracking-tight">Manajemen User</h1>
        <p className="text-blue-100 mt-1 text-xs font-medium opacity-90">
          Kelola hak akses masuk akun administrator, dokter, dan staf kasir untuk mengontrol data internal klinik SIGIGI.
        </p>
      </div>

      {/* NOTIFICATION BOXES */}
      {error && (
        <div className="flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-3 rounded-2xl text-xs font-bold border border-rose-100">
          <MdError size={18} /> {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-3 rounded-2xl text-xs font-bold border border-emerald-100">
          <MdCheckCircle size={18} /> {success}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6 items-start">
        
        {/* FORM TAMBAH USER ADMIN */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-50 pb-3">
            <MdPersonAdd className="text-blue-600" size={18} /> Tambah Staff Baru
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Nama Lengkap</label>
              <input type="text" name="name" value={dataForm.name} onChange={handleChange} placeholder="Nama beserta gelar" required disabled={loading} className="w-full p-2.5 rounded-xl border border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-500/20 outline-none" />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Alamat Email</label>
              <input type="email" name="email" value={dataForm.email} onChange={handleChange} placeholder="email@sigigi.com" required disabled={loading} className="w-full p-2.5 rounded-xl border border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-500/20 outline-none" />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Kata Sandi Akun</label>
              <input type="password" name="password" value={dataForm.password} onChange={handleChange} placeholder="Minimal 6 karakter" required disabled={loading} className="w-full p-2.5 rounded-xl border border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-500/20 outline-none" />
            </div>
            <div>
              <label className="block text-[10px] text-gray-400 font-bold uppercase mb-1.5">Hak Akses Jabatan (Role)</label>
              <select name="role" value={dataForm.role} onChange={handleChange} disabled={loading} className="w-full p-2.5 rounded-xl border border-gray-200 bg-white font-bold text-gray-700 outline-none">
                <option value="staff">Staff Utama / Kasir</option>
                <option value="dokter">Dokter Gigi Spesialis</option>
                <option value="superadmin">Super Administrator</option>
              </select>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-sm transition cursor-pointer text-center">
              {loading ? 'Menyinkronkan...' : 'Daftarkan Staff Akun'}
            </button>
          </form>
        </div>

        {/* TABEL LIST USER INTERNAL */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">Otoritas Staff Terdaftar</h3>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{users.length} Akun</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-50/50 text-gray-400 font-bold uppercase tracking-wider border-b border-slate-100 text-[10px]">
                  <th className="px-6 py-3">Nama</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Jabatan</th>
                  <th className="px-6 py-3 text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-gray-700">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-gray-400 font-bold">Tidak ada data staff atau koneksi terputus.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900">
                        {editId === user.id ? (
                          <input type="text" name="name" value={editForm.name} onChange={handleEditChange} className="p-1.5 border border-gray-200 rounded-lg w-full outline-none" />
                        ) : (
                          user.name
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {editId === user.id ? (
                          <input type="email" name="email" value={editForm.email} onChange={handleEditChange} className="p-1.5 border border-gray-200 rounded-lg w-full outline-none" />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editId === user.id ? (
                          <select name="role" value={editForm.role} onChange={handleEditChange} className="p-1.5 border border-gray-200 rounded-lg w-full outline-none bg-white font-bold">
                            <option value="staff">staff</option>
                            <option value="dokter">dokter</option>
                            <option value="superadmin">superadmin</option>
                          </select>
                        ) : (
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${roleBadge(user.role)}`}>
                            {user.role}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center gap-1">
                          {editId === user.id ? (
                            <>
                              <button type="button" onClick={() => handleEditSave(user.id)} disabled={loading} className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-lg"><MdSave size={16} /></button>
                              <button type="button" onClick={() => setEditId(null)} className="p-1 text-gray-400 hover:bg-slate-100 rounded-lg"><MdClose size={16} /></button>
                            </>
                          ) : (
                            <>
                              <button type="button" onClick={() => handleEditStart(user)} disabled={loading} className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg"><MdEdit size={16} /></button>
                              <button type="button" onClick={() => handleDelete(user.id)} disabled={loading} className="p-1 text-rose-600 hover:bg-rose-50 rounded-lg"><MdDelete size={16} /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}