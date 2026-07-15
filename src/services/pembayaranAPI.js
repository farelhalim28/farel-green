import axios from 'axios';

const API_URL = "https://hbhzdvmegcebkwalhfmh.supabase.co/rest/v1/pembayaran";
const API_KEY = "sb_publishable_pOmGQPpegTn7tQMGmE1M1Q_wGvEPcJQ";

const headers = {
  "apikey": API_KEY,
  "Authorization": `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export const pembayaranAPI = {
  fetchPembayaran: async () => {
    try {
      const response = await axios.get(`${API_URL}?select=*,rekam_medis(*,pasien(*))&order=tanggal_bayar.desc`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetchPembayaran:", error.response?.data || error.message);
      throw error;
    }
  },

  createPembayaran: async (data) => {
    try {
      const response = await axios.post(API_URL, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error createPembayaran:", error.response?.data || error.message);
      throw error;
    }
  },

  updatePembayaran: async (id, data) => {
    try {
      const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error updatePembayaran:", error.response?.data || error.message);
      throw error;
    }
  },

  deletePembayaran: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error deletePembayaran:", error.response?.data || error.message);
      throw error;
    }
  }
};