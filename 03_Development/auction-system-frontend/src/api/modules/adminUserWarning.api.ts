import axiosClient from "../axiosClient";

// --- Interface dữ liệu nhận từ backend ---
export interface UserWarningLog {
  logId: number;
  userId: number;
  transactionId: number;
  type: string;
  status: string;
  description: string;
  violationCount: number;
  createdAt: string;
}

export const adminUserWarningApi = {
  // Lấy tất cả warning của 1 user
  getByUserId: (userId: number) =>
    axiosClient.get<UserWarningLog[]>(`/warnings/user/${userId}`),

  // Lấy warning theo transaction
  getByTransactionId: (txnId: number) =>
    axiosClient.get<UserWarningLog[]>(`/warnings/transaction/${txnId}`),

  // Tạo warning mới
  create: (data: {
    userId: number;
    transactionId?: number;
    type: string;
    description?: string;
  }) => axiosClient.post("/warnings", data),

  // Auto warn (backend xử lý logic)
  autoWarn: () => axiosClient.post("/warnings/auto-warn"),
};
