import axios from 'axios';

// Ambil URL dari env
let envUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// PENGAMAN: Hapus trailing slash (/) jika ada di akhir URL
if (envUrl.endsWith('/')) {
    envUrl = envUrl.slice(0, -1);
}

const BASE_URL = envUrl;

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