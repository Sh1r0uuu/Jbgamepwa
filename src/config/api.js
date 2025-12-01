import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor agar kita langsung dapat data bersih
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

// PERBAIKAN: Tambahkan BASE_URL di dalam export
export { apiClient, BASE_URL };