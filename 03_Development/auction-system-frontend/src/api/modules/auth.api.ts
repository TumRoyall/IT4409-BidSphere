import axiosClient from "../axiosClient";

export const authApi = {
  // 🔑 Login
  login: (data: { email: string; password: string }) =>
    axiosClient.post("/auth/login", data),

  // 📨 Register
  register: (data: {
    username?: string;
    fullName?: string;
    email: string;
    password?: string;
    phone?: string;
    gender?: string;
  }) => axiosClient.post("/auth/register", data),

  // 🔁 Resend verification email
  resendVerification: (email: string) =>
    axiosClient.post(`/auth/resend-verification?email=${encodeURIComponent(email)}`),
};
