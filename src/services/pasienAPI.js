import axios from 'axios';

const API_URL = "https://hbhzdvmegcebkwalhfmh.supabase.co/rest/v1/pasien";
const API_KEY = "sb_publishable_pOmGQPpegTn7tQMGmE1M1Q_wGvEPcJQ";

const headers = {
  "apikey": API_KEY,
  "Authorization": `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export const pasienAPI = {
  fetchPasien: async () => {
    try {
      const response = await axios.get(`${API_URL}?order=id.asc`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetchPasien:", error.response?.data || error.message);
      throw error;
    }
  },

  // Alias anti-crash untuk component yang mungkin memanggil fetchPatients()
  fetchPatients: async () => {
    try {
      const response = await axios.get(`${API_URL}?order=id.asc`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetchPatients:", error.response?.data || error.message);
      throw error;
    }
  },

  createPasien: async (data) => {
    try {
      const response = await axios.post(API_URL, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error createPasien:", error.response?.data || error.message);
      throw error;
    }
  },

  updatePasien: async (id, data) => {
    try {
      const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error updatePasien:", error.response?.data || error.message);
      throw error;
    }
  },

  deletePasien: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error deletePasien:", error.response?.data || error.message);
      throw error;
    }
  }
};