// ================================================
// LETAK FILE: src/services/janjiTemuAPI.js
// ================================================
import axios from 'axios';

// Gunakan endpoint milikmu
const API_URL = "https://hbhzdvmegcebkwalhfmh.supabase.co/rest/v1/appointments";

// KUNCI BARU YANG VALID & ANTI TYPO (Sudah dipastikan Q besar)
const API_KEY = "sb_publishable_pOmGQPpegTn7tQMGmE1M1Q_wGvEPcJQ";

const headers = {
  "apikey": API_KEY,
  "Authorization": `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export const janjiTemuAPI = {
  // 1. Fungsi lama bawaanmu
  fetchJanjiTemu: async () => {
    const response = await axios.get(`${API_URL}?order=tanggal.asc`, { headers });
    return response.data;
  },

  // 2. Fungsi yang dicari-cari oleh JanjiTemu.jsx Admin biar ga crash
  fetchAppointments: async () => {
    const response = await axios.get(`${API_URL}?order=tanggal.asc`, { headers });
    return response.data;
  },

  // 3. Fungsi tambah janji temu baru (Digunakan oleh AppointmentPage)
  createJanjiTemu: async (data) => {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  }
};