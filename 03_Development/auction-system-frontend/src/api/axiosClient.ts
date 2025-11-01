import axios from "axios";

// Lấy base URL từ env
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Tạo instance axios
const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor request để gắn token nếu có
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); // giả sử bạn lưu token ở localStorage
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Thêm interceptor response để xử lý lỗi chung
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ví dụ: token hết hạn
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login"; // redirect về login
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
