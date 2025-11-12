import axiosClient from "../axiosClient";
import type { User, Product, Transaction, AdminStats } from "../../types/admin.types";

const adminApi = {
  // ==================== USER MANAGEMENT ====================
  
  // Lấy tất cả users
  getAllUsers: async (): Promise<User[]> => {
    const response = await axiosClient.get("/users");
    return response.data;
  },

  // Lấy user theo ID
  getUserById: async (id: number): Promise<User> => {
    const response = await axiosClient.get(`/users/${id}`);
    return response.data;
  },

  // Cập nhật user
  updateUser: async (id: number, data: Partial<User>): Promise<User> => {
    const response = await axiosClient.put(`/users/${id}`, data);
    return response.data;
  },

  // Xóa user
  deleteUser: async (id: number): Promise<void> => {
    await axiosClient.delete(`/users/${id}`);
  },

  // Ban user
  banUser: async (id: number): Promise<User> => {
    const response = await axiosClient.post(`/users/${id}/ban`);
    return response.data;
  },

  // Unban user
  unbanUser: async (id: number): Promise<User> => {
    const response = await axiosClient.post(`/users/${id}/unban`);
    return response.data;
  },

  // ==================== PRODUCT MANAGEMENT ====================
  
  // Lấy tất cả products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await axiosClient.get("/products");
    return response.data;
  },

  // Lấy product theo ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await axiosClient.get(`/products/${id}`);
    return response.data;
  },

  // Tạo product mới
  createProduct: async (data: Partial<Product>): Promise<Product> => {
    const response = await axiosClient.post("/products", data);
    return response.data;
  },

  // Cập nhật product
  updateProduct: async (id: number, data: Partial<Product>): Promise<Product> => {
    const response = await axiosClient.put(`/products/${id}`, data);
    return response.data;
  },

  // Xóa product
  deleteProduct: async (id: number): Promise<void> => {
    await axiosClient.delete(`/products/${id}`);
  },

  // Duyệt product
  approveProduct: async (id: number): Promise<Product> => {
    const response = await axiosClient.post(`/products/${id}/approve`);
    return response.data;
  },

  // Từ chối product
  rejectProduct: async (id: number): Promise<Product> => {
    const response = await axiosClient.post(`/products/${id}/reject`);
    return response.data;
  },

  // Lấy products đang chờ duyệt
  getPendingProducts: async (): Promise<Product[]> => {
    const response = await axiosClient.get("/products/pending");
    return response.data;
  },

  // ==================== TRANSACTION MANAGEMENT ====================
  
  // Lấy tất cả transactions
  getAllTransactions: async (): Promise<Transaction[]> => {
    const response = await axiosClient.get("/transactions");
    return response.data;
  },

  // Lấy transaction theo ID
  getTransactionById: async (id: number): Promise<Transaction> => {
    const response = await axiosClient.get(`/transactions/${id}`);
    return response.data;
  },

  // Cập nhật status transaction
  updateTransactionStatus: async (id: number, status: string): Promise<Transaction> => {
    const response = await axiosClient.put(`/transactions/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  },

  // ==================== STATISTICS ====================
  
  // Lấy thống kê admin (có thể implement sau)
  getAdminStats: async (): Promise<AdminStats> => {
    // TODO: Backend cần tạo endpoint /api/admin/stats
    const response = await axiosClient.get("/admin/stats");
    return response.data;
  },
};

export default adminApi;