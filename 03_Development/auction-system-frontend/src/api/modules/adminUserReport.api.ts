import axiosClient from "../axiosClient";

export interface UserReport {
  id: number;
  userId: number;
  content: string;
  auctionId?: number;
  sellerId?: number;
  createdAt: string;
}

export const adminUserReportApi = {
  // Lấy report theo userId (hiện có)
  getByUserId: (userId: number) =>
    axiosClient.get<UserReport[]>(`/user-reports/user/${userId}`),

  // Lấy tất cả report
  getAll: () => axiosClient.get<UserReport[]>(`/user-reports`),
};
