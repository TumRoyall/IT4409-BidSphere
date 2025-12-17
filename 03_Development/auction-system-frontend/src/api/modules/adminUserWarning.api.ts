import axiosClient from "../axiosClient";

export interface UserWarningLogResponse {
  logId: number;
  userId: number;
  transactionId: number;
  type: string;
  status: string;
  description: string;
  violationCount: number;
  createdAt: string;
}

export interface UserWarningLogRequest {
  userId: number;
  transactionId: number;
  type?: string;
  status?: string;
  description?: string;
}

// Lấy tất cả warning
export const getAllWarnings = async (): Promise<UserWarningLogResponse[]> => {
  const res = await axiosClient.get<UserWarningLogResponse[]>("/warnings");
  return res.data;
};

// Lấy warning theo userId
export const getWarningsByUser = async (userId: number): Promise<UserWarningLogResponse[]> => {
  const res = await axiosClient.get<UserWarningLogResponse[]>(`/warnings/user/${userId}`);
  return res.data;
};

// Lấy warning theo transactionId
export const getWarningsByTransaction = async (txnId: number): Promise<UserWarningLogResponse[]> => {
  const res = await axiosClient.get<UserWarningLogResponse[]>(`/warnings/transaction/${txnId}`);
  return res.data;
};

// Tạo warning mới
export const createWarning = async (data: UserWarningLogRequest): Promise<UserWarningLogResponse> => {
  const res = await axiosClient.post<UserWarningLogResponse>("/warnings", data);
  return res.data;
};

// Auto warn pending transactions
export const autoWarnPendingTransactions = async (): Promise<string> => {
  const res = await axiosClient.post<string>("/warnings/auto-warn");
  return res.data;
};
