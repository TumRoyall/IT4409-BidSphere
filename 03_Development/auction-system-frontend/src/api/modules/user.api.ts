import axiosClient from "../axiosClient";
import type { User } from "@/types/admin.types";

interface Transaction {
  id: number;
  type: 'DEPOSIT' | 'WITHDRAW';
  amount: number;
  status: string;
  createdAt: string;
}

const userApi = {
  // Lấy profile user hiện tại
  getProfile: async (): Promise<User> => {
    const response = await axiosClient.get("/users/profile");
    return response.data;
  },

  // Cập nhật profile user hiện tại
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await axiosClient.put("/users/profile", data);
    return response.data;
  },

  // Lấy số dư tài khoản
  getBalance: async (): Promise<{ balance: number }> => {
    const response = await axiosClient.get("/users/balance");
    return response.data;
  },

  // Lấy danh sách giao dịch tài khoản
  getTransactions: async (): Promise<Transaction[]> => {
    const response = await axiosClient.get("/users/transactions");
    return response.data;
  },

  // Nạp tiền
  createDeposit: async (amount: number): Promise<Transaction> => {
    const response = await axiosClient.post("/users/deposit", { amount });
    return response.data;
  },

  // Rút tiền
  createWithdraw: async (amount: number): Promise<Transaction> => {
    const response = await axiosClient.post("/users/withdraw", { amount });
    return response.data;
  },
};

export default userApi;