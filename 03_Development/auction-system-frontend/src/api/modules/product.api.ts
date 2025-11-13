import axiosClient from "../axiosClient";

// ==================== TYPES & INTERFACES ====================
export interface ProductCreateRequest {
  name: string;
  description: string;
  category: string;
  start_price: number;
  deposit: number;
  image_url?: string;
}

export interface ProductUpdateRequest {
  name?: string;
  description?: string;
  category?: string;
  start_price?: number;
  deposit?: number;
  image_url?: string;
}

export interface ProductResponse {
  product_id?: number;
  id?: number;
  name: string;
  description?: string;
  category?: string;
  start_price?: number;
  deposit: number;
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

// ==================== API FUNCTIONS ====================

const productApi = {
  // Get all products
  getProducts: () =>
    axiosClient.get<ProductResponse[]>("/products"),

  // Get products by page (for seller dashboard)
  getProductsPage: (page: number = 0, limit: number = 10) =>
    axiosClient.get<ProductPage>("/products/page", { params: { page, limit } }),

  // Get product by ID
  getProductById: (productId: number) =>
    axiosClient.get<ProductResponse>(`/products/${productId}`),

  // Get products by seller ID
  getProductsBySeller: (sellerId: number) =>
    axiosClient.get<ProductResponse[]>(`/products/seller/${sellerId}`),

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
};

export default productApi;
