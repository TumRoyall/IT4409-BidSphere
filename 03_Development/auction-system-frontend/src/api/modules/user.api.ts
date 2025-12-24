import axiosClient from "../axiosClient";

export const userApi = {
  // Lấy thông tin cá nhân của user hiện tại
  async getProfile() {
    try {
      const res = await axiosClient.get("/users/me");
      return res.data;
    } catch (err: any) {
      console.error("[userApi.getProfile] Error:", err);
      throw err.response?.data || { message: "Không thể tải thông tin hồ sơ" };
    }
  },

  // Cập nhật hồ sơ cá nhân
  async updateProfile(payload: {
    fullName?: string;
    phone?: string;
    gender?: "male" | "female" | "other";
    birthday?: string; // ISO yyyy-MM-dd nếu có
  }) {
    try {
      const res = await axiosClient.put("/users/me", payload);
      return res.data;
    } catch (err: any) {
      console.error("[userApi.updateProfile] Error:", err);
      throw err.response?.data || { message: "Không thể cập nhật hồ sơ" };
    }
  },

  async updateAvatar(formData: FormData) {
    const res = await axiosClient.put("/users/me/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  changePassword: (body: { currentPassword: string; newPassword: string }) =>
      axiosClient.patch("/users/change-password", body),

  // Lấy các phiên đấu giá user đang tham gia (từ token)
  async getParticipatingAuctions(
      userId: number,
      params?: {
        page?: number;
        size?: number;
        sort?: string;
      }
    ) {
      const res = await axiosClient.get(
        `/users/${userId}/auctions/participating`,
        { params }
      );
      return res.data; // Page<Auction>
    },

};
