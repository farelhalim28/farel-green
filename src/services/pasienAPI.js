import axios from 'axios';
import bcrypt from 'bcryptjs';

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
      // Hash password sebelum disimpan, konsisten dengan data seed yang sudah ada
      const hashedPassword = bcrypt.hashSync(data.password, 10);
      const payload = { ...data, password: hashedPassword };

      const response = await axios.post(API_URL, payload, { headers });
      return response.data;
    } catch (error) {
      console.error("Error createPasien:", error.response?.data || error.message);
      throw error;
    }
  },

  updatePasien: async (id, data) => {
    try {
      // Kalau ada field password yang diubah, hash ulang. Kalau tidak, biarkan.
      const payload = { ...data };
      if (payload.password) {
        payload.password = bcrypt.hashSync(payload.password, 10);
      }
      const response = await axios.patch(`${API_URL}?id=eq.${id}`, payload, { headers });
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
  },

  // ================================================
  // LOGIKA LOGIN PASIEN — DIPERBAIKI
  // ================================================
  loginPasien: async (email, password) => {
    try {
      // 1. Cari pasien HANYA berdasarkan email (jangan sertakan password di query!)
      const response = await axios.get(`${API_URL}?email=eq.${email}`, { headers });

      if (!response.data || response.data.length === 0) {
        throw new Error("Email tidak terdaftar.");
      }

      const user = response.data[0];

      // 2. Bandingkan password yang diinput dengan hash bcrypt di database
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        throw new Error("Kombinasi email dan password salah.");
      }

      // 3. Jangan kirim balik field password ke frontend/localStorage
      const { password: _pw, ...safeUserData } = user;
      return safeUserData;

    } catch (error) {
      console.error("Error loginPasien:", error.response?.data || error.message);
      throw error;
    }
  }
};