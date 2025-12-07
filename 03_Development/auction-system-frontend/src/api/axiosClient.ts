import axios from "axios";
import qs from "qs";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // http://localhost:8080/api lúc test
  headers: { "Content-Type": "application/json" },
});

// Gắn token vào header
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//Kiểm tra token hết hạn
axiosClient.interceptors.response.use(
  (response) => response, // nếu thành công thì trả về như cũ
  (error) => {
    // Nếu BE trả 401 (token hết hạn hoặc không hợp lệ)
    if (error.response && error.response.status === 401) {
      console.warn("Token đã hết hạn hoặc không hợp lệ. Đang chuyển hướng đăng nhập...");

      // Xóa token cũ
      localStorage.removeItem("access_token");

      // Chuyển hướng về trang login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
