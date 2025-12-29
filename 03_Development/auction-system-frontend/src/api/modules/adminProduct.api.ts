// src/api/adminProduct.api.ts
import axios from "axios";

// DTO types
export interface ProductResponse {
  productId: number;
  sellerId: number;
  name: string;
  category: string;
  description: string;
  startPrice: number;
  estimatePrice?: number;
  deposit?: number;
  imageUrl?: string;
  status: string;
  createdAt: string;
  isDeleted: boolean;
  deletedAt?: string;
}

// Pagination response from backend
export interface PaginatedProducts {
  content: ProductResponse[];
  totalPages: number;
  totalElements: number;
  number: number; // current page
  size: number;
}

// Config axios instance if needed
const api = axios.create({
  baseURL: "http://localhost:8080/api/products",
  withCredentials: true, // nếu backend dùng session / cookie
});

// API: Get all products paginated (admin)
export const getProductsPage = async (
  page: number = 0,
  size: number = 10
): Promise<PaginatedProducts> => {
  const response = await api.get<PaginatedProducts>("/page", {
    params: { page, size },
  });
  return response.data;
};

// Optional: Approve a product (admin)
export interface ProductApprovalRequest {
  deposit?: number;
  estimatePrice?: number;
  status: "approved" | "rejected";
}

export const approveProduct = async (
  productId: number,
  data: ProductApprovalRequest
): Promise<ProductResponse> => {
  const response = await api.put<ProductResponse>(`/${productId}/approve`, data);
  return response.data;
};

// Optional: Delete a product
export const deleteProduct = async (productId: number) => {
  const response = await api.delete<{ message: string; productId: number; deletedAt: string }>(
    `/${productId}`
  );
  return response.data;
};
