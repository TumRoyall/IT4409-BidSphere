import axiosClient from "../axiosClient";

export const adminUserApi = {
  // 📌 Lấy toàn bộ user
  getAll: () => axiosClient.get("/api/admin/users"),

  // 📌 Lấy user theo ID
  getById: (id: number) =>
    axiosClient.get(`/api/admin/users/${id}`),

  // ✏️ Cập nhật user
  update: (
    id: number,
    data: {
      fullName?: string;
      username?: string;
      email?: string;
      phone?: string;
      gender?: string;
      status?: string;
    }
  ) => axiosClient.put(`/api/admin/users/${id}`, data),

  // ⛔ Ban user
  ban: (
    id: number,
    data: {
      reason: string;
      bannedUntil: string;
    }
  ) => axiosClient.put(`/api/admin/users/${id}/ban`, data),

  // ✔ Unban user
  unban: (id: number) =>
    axiosClient.put(`/api/admin/users/${id}/unban`),

  // 🗑 Xoá user
  delete: (id: number) =>
    axiosClient.delete(`/api/admin/users/${id}`),
};
