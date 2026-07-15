import axios from 'axios';

const API_URL = "https://hbhzdvmegcebkwalhfmh.supabase.co/rest/v1/rekam_medis";
const API_KEY = "sb_publishable_pOmGQPpegTn7tQMGmE1M1Q_wGvEPcJQ";

const headers = {
  "apikey": API_KEY,
  "Authorization": `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export const rekamMedisAPI = {
  fetchRekamMedis: async () => {
    try {
      // Ditambahkan relasi dokter asli (dokter_id)
      const response = await axios.get(`${API_URL}?select=*,pasien(*),dokter(*),perawatan(*)&order=tanggal_periksa.desc`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetchRekamMedis:", error.response?.data || error.message);
      throw error;
    }
  },

  createRekamMedis: async (data) => {
    try {
      const response = await axios.post(API_URL, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error createRekamMedis:", error.response?.data || error.message);
      throw error;
    }
  },

  updateRekamMedis: async (id, data) => {
    try {
      const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error updateRekamMedis:", error.response?.data || error.message);
      throw error;
    }
  },

  deleteRekamMedis: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error deleteRekamMedis:", error.response?.data || error.message);
      throw error;
    }
  }
};