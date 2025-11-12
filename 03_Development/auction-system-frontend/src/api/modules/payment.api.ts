import axiosClient from "../axiosClient";
import type { Transaction } from "@/types/admin.types";

const paymentApi = {
  // Lấy transaction theo ID
  getTransaction: async (id: number): Promise<Transaction> => {
    const response = await axiosClient.get(`/transactions/${id}`);
    return response.data;
  },

  // Lấy transactions của user
  getUserTransactions: async (userId: number): Promise<Transaction[]> => {
    const response = await axiosClient.get(`/transactions/buyer/${userId}`);
    return response.data;
  },

  // Buyer thanh toán
  makePayment: async (transactionId: number): Promise<Transaction> => {
    const response = await axiosClient.post(`/transactions/${transactionId}/pay`);
    return response.data;
  },

  // Seller gửi hàng
  confirmShipment: async (transactionId: number): Promise<Transaction> => {
    const response = await axiosClient.post(`/transactions/${transactionId}/ship`);
    return response.data;
  },

  // Buyer xác nhận nhận hàng
  confirmReceipt: async (transactionId: number): Promise<Transaction> => {
    const response = await axiosClient.post(`/transactions/${transactionId}/confirm`);
    return response.data;
  },

  // Hủy transaction
  cancelTransaction: async (transactionId: number): Promise<Transaction> => {
    const response = await axiosClient.post(`/transactions/${transactionId}/cancel`);
    return response.data;
  },

  // Lấy transactions theo seller
  getSellerTransactions: async (sellerId: number): Promise<Transaction[]> => {
    const response = await axiosClient.get(`/transactions/seller/${sellerId}`);
    return response.data;
  },
};

export default paymentApi;