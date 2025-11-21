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
  product_id?: number;
  id?: number;
  name: string;
  description?: string;
  categories?: string;
  start_price?: number;
  deposit?: number;
  image_url?: string;
  status?: string;
  seller_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
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

  // Get products by page (for seller dashboard)
  getProductsPage: (page: number = 0) =>
    axiosClient.get<ProductPage>("/products/page", { params: { page } }),

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
    return axiosClient.post<{ image_url: string }>("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // Upload image with is_thumbnail flag
  uploadImageWithThumbnail: (file: File, productId: number, isThumbnail: boolean = false) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productId", String(productId));
    formData.append("is_thumbnail", isThumbnail ? "1" : "0");
    return axiosClient.post<{ image_url: string; image_id: number; is_thumbnail: boolean }>(
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
