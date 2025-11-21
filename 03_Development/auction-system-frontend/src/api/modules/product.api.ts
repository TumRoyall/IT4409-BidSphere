import axiosClient from "../axiosClient";

// ==================== TYPES & INTERFACES ====================
export interface ImagePayload {
  imageUrl: string;
  isThumbnail?: boolean;
}

export interface ProductCreateRequest {
  name: string;
  description?: string | null;
  categories?: string | null;
  startPrice: number;
  images?: ImagePayload[];
}

export interface ProductUpdateRequest {
  name?: string;
  description?: string | null;
  categories?: string | null;
  startPrice?: number | null;
  images?: ImagePayload[];
}

export interface ProductResponse {
  productId?: number;
  id?: number;
  name: string;
  description?: string;
  categories?: string;
  startPrice?: number;
  deposit?: number;
  imageUrl?: string;
  status?: string;
  sellerId?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface ProductPage {
  content: ProductResponse[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

export interface ProductApprovalRequest {
  deposit: number;
  estimatePrice: number;
  status: "approved" | "rejected";
  rejectionReason?: string;
}

// ==================== API FUNCTIONS ====================

const productApi = {
  // Get all products
  getProducts: () =>
    axiosClient.get<ProductResponse[]>("/products"),

  // Get product by ID
  getProductById: (productId: number) =>
  axiosClient.get<ProductResponse>(`/products/${productId}`),

  // Get products by seller ID
  getProductsBySeller: (sellerId: number) =>
  axiosClient.get<ProductResponse[]>(`/products/seller/${sellerId}`),

  // Get products for current seller (use token to resolve seller) with pagination
  getProductsBySellerMePage: async (page: number = 0, size: number = 10) => {
  return axiosClient.get<ProductPage>(`/products/seller/me/page`, { 
       params: { page, size }
    });
  },

  // Get all products with pagination (for bidders)
  getProductsPage: async (page: number = 0, size: number = 10) => {
    return axiosClient.get<ProductPage>(`/products/page`, { 
       params: { page, size }
    });
  },
  // Create new product
  createProduct: (data: ProductCreateRequest) =>
    axiosClient.post<ProductResponse>("/products", data),

  // Update product
  updateProduct: (productId: number, data: ProductUpdateRequest) =>
    axiosClient.put<ProductResponse>(`/products/${productId}`, data),

  // Delete product
  deleteProduct: (productId: number) =>
    axiosClient.delete<{ message: string; productId: number; deletedAt: string }>(
      `/products/${productId}`
    ),

  // Upload image (if using separate endpoint)
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosClient.post<{ imageUrl: string }>("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // Upload image with isThumbnail flag
  uploadImageWithThumbnail: (file: File, productId: number, isThumbnail: boolean = false) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productId", String(productId));
    formData.append("isThumbnail", isThumbnail ? "1" : "0");
    return axiosClient.post<{ imageUrl: string; imageId: number; isThumbnail: boolean }>(
      "/upload",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },

  // Approve or reject product (admin only)
  approveProduct: (productId: number, data: ProductApprovalRequest) =>
    axiosClient.put<ProductResponse>(`/products/${productId}/approve`, data),
};

export default productApi;;
