import axios from 'axios';

const BASE_TABLE_URL = "https://hbhzdvmegcebkwalhfmh.supabase.co/rest/v1/janji_temu";
const API_KEY = "sb_publishable_pOmGQPpegTn7tQMGmE1M1Q_wGvEPcJQ";

const headers = {
  "apikey": API_KEY,
  "Authorization": `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export const janjiTemuAPI = {
  // 1. Ambil Semua Data Janji Temu
  fetchAppointments: async () => {
    try {
      const response = await axios.get(
        `${BASE_TABLE_URL}?select=id,kode_janji,pasien_id,dokter_id,perawatan_rencana_id,tanggal_janji,keluhan,status_janji&order=tanggal_janji.asc`, 
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error Fetching:", error.response?.data || error.message);
      throw error;
    }
  },

  // 2. Tambah Janji Temu Baru (Bypass bentrok sequence ID)
  createJanjiTemu: async (payload) => {
    try {
      // Ambil ID terbesar saat ini untuk menghindari bentrok primary key
      const checkIdResponse = await axios.get(
        `${BASE_TABLE_URL}?select=id&order=id.desc&limit=1`, 
        { headers }
      );
      
      let nextId = 1;
      if (checkIdResponse.data && checkIdResponse.data.length > 0) {
        nextId = Number(checkIdResponse.data[0].id) + 1;
      }

      const finalPayload = {
        id: nextId,
        ...payload
      };

      const response = await axios.post(BASE_TABLE_URL, finalPayload, { headers });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Detail Error Database Supabase:", error.response.data);
      }
      throw error;
    }
  },

  // 3. Update Janji Temu
  updateJanjiTemu: async (id, updatedFields) => {
    try {
      const response = await axios.patch(
        `${BASE_TABLE_URL}?id=eq.${id}`, 
        updatedFields, 
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error Updating:", error.response?.data || error.message);
      throw error;
    }
  },

  // 4. Hapus Janji Temu
  deleteJanjiTemu: async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_TABLE_URL}?id=eq.${id}`, 
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error Deleting:", error.response?.data || error.message);
      throw error;
    }
  }
};