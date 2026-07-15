import axios from 'axios';

const API_URL = "https://hbhzdvmegcebkwalhfmh.supabase.co/rest/v1/perawatan";
const API_KEY = "sb_publishable_pOmGQPpegTn7tQMGmE1M1Q_wGvEPcJQ";

const headers = {
  "apikey": API_KEY,
  "Authorization": `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export const perawatanAPI = {
  fetchPerawatan: async () => {
    try {
      const response = await axios.get(`${API_URL}?order=id.asc`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetchPerawatan:", error.response?.data || error.message);
      throw error;
    }
  },

  // Alias pembantu agar tidak ada component yang patah saat mencari fetchLayanan
  fetchLayanan: async () => {
    try {
      const response = await axios.get(`${API_URL}?order=id.asc`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetchLayanan:", error.response?.data || error.message);
      throw error;
    }
  },

  createPerawatan: async (data) => {
    try {
      const response = await axios.post(API_URL, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error createPerawatan:", error.response?.data || error.message);
      throw error;
    }
  },

  updatePerawatan: async (id, data) => {
    try {
      const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error updatePerawatan:", error.response?.data || error.message);
      throw error;
    }
  },

  deletePerawatan: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error deletePerawatan:", error.response?.data || error.message);
      throw error;
    }
  }
};