// =========================================================================
// LETAK FILE: src/services/userAPI.js
// =========================================================================
import axios from 'axios';

// MENGGUNAKAN ENPOINT & KEY SUPABASE ASLI MILIK LU, BRO!
const API_URL = "https://hbhzdvmegcebkwalhfmh.supabase.co/rest/v1/users";
const API_KEY = "sb_publishable_pOmGQPpegTn7tQMGmE1M1Q_wGvEPcJQ";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const userAPI = {
  // 1. Ambil semua data user admin/staff
  async fetchUsers() {
    const response = await axios.get(`${API_URL}?order=name.asc`, { headers });
    return response.data;
  },

  // 2. Tambah user baru
  async createUser(data) {
    const response = await axios.post(API_URL, data, { 
      headers: { ...headers, "Prefer": "return=minimal" } 
    });
    return response.data;
  },

  // 3. Update data user berdasarkan ID
  async updateUser(id, data) {
    const response = await axios.patch(
      `${API_URL}?id=eq.${id}`,
      data,
      { 
        headers: { ...headers, "Prefer": "return=minimal" } 
      }
    );
    return response.data;
  },

  // 4. Hapus user berdasarkan ID
  async deleteUser(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { 
      headers: { ...headers, "Prefer": "return=minimal" } 
    });
  }
};