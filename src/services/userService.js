// =========================================================================
// LETAK FILE: src/services/userService.js
// =========================================================================
import axios from "axios";

const SUPABASE_URL = "https://hbhzdvmegcebkwalhfmh.supabase.co";
const API_KEY = "sb_publishable_pOmGQPpegTn7tQMGmE1M1Q_wGvEPcJQ";

const apiClient = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

export const userService = {
  // Login khusus Portal Member (Mengecek ke tabel member_pasien)
  loginMember: async (email, password) => {
    const response = await apiClient.get(`/member_pasien?email=eq.${email}&password=eq.${password}`);
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    throw new Error("Email atau password akun member kamu salah!");
  },

  // Registrasi Member via Website Publik (Sesuai Gambar 2)
  registerMember: async (userData) => {
    const response = await apiClient.post("/member_pasien", {
      nama_lengkap: userData.nama_lengkap,
      email: userData.email,
      no_whatsapp: userData.no_whatsapp,
      password: userData.password,
      role: "member",
      tier_membership: userData.tier_membership,
      total_point: userData.tier_membership === "Gold" ? 150 : userData.tier_membership === "Platinum" ? 300 : 0
    });
    return response.data;
  },

  // Mengambil data paged untuk Halaman Pasien / User di Sisi Admin
  getUsersPaged: async (page = 1, pageSize = 5, searchKeyword = "") => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let url = `/member_pasien?order=id.desc`;
    if (searchKeyword) {
      url += `&nama_lengkap=ilike.*${searchKeyword}*`;
    }

    const response = await apiClient.get(url, {
      headers: { "Prefer": "count=exact" }
    });

    const fullData = response.data || [];
    const slicedData = fullData.slice(from, to + 1);

    return {
      data: slicedData,
      totalCount: fullData.length
    };
  },

  // Otoritas Operasi CRUD Internal Admin
  createUser: async (data) => {
    const response = await apiClient.post("/member_pasien", data);
    return response.data;
  },

  updateUser: async (id, data) => {
    const response = await apiClient.patch(`/member_pasien?id=eq.${id}`, data);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await apiClient.delete(`/member_pasien?id=eq.${id}`);
    return response.data;
  }
};