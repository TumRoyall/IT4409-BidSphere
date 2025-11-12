import axiosClient from "../axiosClient";
import type { Product } from "@/types/admin.types";

const productApi = {
  // Lấy danh sách products
  getProducts: async (): Promise<Product[]> => {
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

  // Upload ảnh (cần implement multipart/form-data)
  uploadImage: async (file: File): Promise<{ imageUrl: string }> => {
    const formData = new FormData();
    formData.append("file", file);
    
    const response = await axiosClient.post("/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Lấy products theo seller
  getProductsBySeller: async (sellerId: number): Promise<Product[]> => {
    const response = await axiosClient.get(`/products/seller/${sellerId}`);
    return response.data;
  },
};

export default productApi;