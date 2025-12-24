import axiosClient from "@/api/axiosClient";

/* ================= TYPES ================= */

export type Transaction = {
  id: number;
  userId: number;
  amount: number;
  type: "DEPOSIT" | "WITHDRAW" | "TRANSFER";
  status: "SUCCESS" | "PENDING" | "FAILED";
  createdAt: string;
};

export type PageResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
};

/* ================= PARAMS ================= */

export type GetUserTransactionParams = {
  page?: number;
  size?: number;
  status?: string;
  type?: string;
  from?: string; // yyyy-MM-ddTHH:mm:ss
  to?: string;   // yyyy-MM-ddTHH:mm:ss
};

/* ================= API ================= */

/**
 * Lấy lịch sử giao dịch theo user
 * Có filter + pagination
 */
export const getUserTransactions = (
  userId: number,
  params: GetUserTransactionParams
) => {
  return axiosClient.get<PageResponse<Transaction>>(
    `/account/user/${userId}`,
    { params }
  );
};

export type AccountTransactionRequest = {
  userId: number;
  amount: string | number; // gửi string cho an toàn BigDecimal
  type: "DEPOSIT" | "WITHDRAW" | "TRANSFER" | "RECEIVED";
};

export const transactionApi = {
  // =========================
  // Nạp tiền vào tài khoản
  // =========================
  deposit(data: AccountTransactionRequest) {
    return axiosClient.post(
      "/account/deposit",
      data
    );
  },
};