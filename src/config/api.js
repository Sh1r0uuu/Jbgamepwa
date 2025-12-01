import axios from 'axios';

// 1. Ambil URL dari env atau hardcode
let rawUrl = import.meta.env.VITE_API_BASE_URL || 'https://backend-jual-akun.vercel.app';

// 2. PEMBERSIHAN TOTAL: Hapus semua garis miring di akhir
// Contoh: "https://domain.com///" -> "https://domain.com"
const BASE_URL = rawUrl.replace(/\/+$/, "");

console.log("🔗 API URL Final:", BASE_URL); // Cek di Console Browser nanti

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export { apiClient, BASE_URL };