import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // ví dụ: http://localhost:8080/api
  headers: { "Content-Type": "application/json" },
});

// Gắn token vào header nếu có
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); // đồng bộ key token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
