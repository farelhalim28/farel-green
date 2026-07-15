import axios from 'axios';

const API_URL = "https://hbhzdvmegcebkwalhfmh.supabase.co/rest/v1/dokter";
const API_KEY = "sb_publishable_pOmGQPpegTn7tQMGmE1M1Q_wGvEPcJQ";

const headers = {
  "apikey": API_KEY,
  "Authorization": `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export const dokterAPI = {
  fetchDokter: async () => {
    try {
      // Mengambil seluruh data dari tabel dokter (id, nama, spesialisasi)
      const response = await axios.get(`${API_URL}?select=*&order=id.asc`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetchDokter:", error.response?.data || error.message);
      throw error;
    }
  },

  createDokter: async (data) => {
    try {
      const response = await axios.post(API_URL, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error createDokter:", error.response?.data || error.message);
      throw error;
    }
  },

  updateDokter: async (id, data) => {
    try {
      const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error updateDokter:", error.response?.data || error.message);
      throw error;
    }
  },

  deleteDokter: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error deleteDokter:", error.response?.data || error.message);
      throw error;
    }
  }
};