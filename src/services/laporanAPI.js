import axios from 'axios';

const API_URL = "https://hbhzdvmegcebkwalhfmh.supabase.co/rest/v1/laporan";
const API_KEY = "sb_publishable_pOmGQPpegTn7tQMGmE1M1Q_wGvEPcJQ";

const headers = {
  "apikey": API_KEY,
  "Authorization": `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export const laporanAPI = {
  // Menarik data laporan beserta relasi pembayaran -> rekam_medis -> pasien & perawatan
  fetchLaporan: async () => {
    try {
      const response = await axios.get(
        `${API_URL}?select=*,pembayaran(invoice_no,tagihan_akhir,tanggal_bayar,rekam_medis(no_rekam_medis,pasien(nama,kode_pasien),perawatan(nama_perawatan)))&order=tanggal_laporan.desc`, 
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetchLaporan:", error.response?.data || error.message);
      throw error;
    }
  },

  createLaporan: async (data) => {
    try {
      const response = await axios.post(API_URL, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error createLaporan:", error.response?.data || error.message);
      throw error;
    }
  },

  updateLaporan: async (id, data) => {
    try {
      const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
      return response.data;
    } catch (error) {
      console.error("Error updateLaporan:", error.response?.data || error.message);
      throw error;
    }
  },

  deleteLaporan: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error("Error deleteLaporan:", error.response?.data || error.message);
      throw error;
    }
  }
};