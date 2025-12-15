// src/api/modules/seller.api.ts
import axiosClient from "../axiosClient";

// ==========================================
// 📦 TYPE DEFINITIONS
// ==========================================

export interface CreateProductDto {
  name: string;
  categories: string;
  description: string;
  start_price: number;
  estimate_price?: string;
  deposit: number;
  createAuction?: boolean;
  auctionDetails?: {
    start_time: string;
    end_time: string;
    bid_step_amount: number;
  };
}

export interface UpdateProductDto {
  name?: string;
  categories?: string;
  description?: string;
  start_price?: number;
  estimate_price?: string;
  deposit?: number;
}

export interface ProductResponse {
  product_id: number;
  seller_id: number;
  name: string;
  categories: string;
  description: string;
  start_price: number;
  estimate_price: string;
  deposit: number;
  image_url: string;
  status: string;
  created_at: string;
  images?: ImageResponse[];
  auction?: AuctionResponse;
}

export interface ImageResponse {
  image_id: number;
  product_id: number;
  image_url: string;
  is_thumbnail: boolean;
}

export interface AuctionResponse {
  auction_id: number;
  product_id: number;
  start_time: string;
  end_time: string;
  status: string;
  highest_current_price: number;
  bid_step_amount: string;
  winner_id: number | null;
}

export interface StatisticsResponse {
  total_products: number;
  active_sessions: number;
  pending_approval: number;
  total_revenue?: number;
  total_sold?: number;
}

// ==========================================
// 🔧 API METHODS
// ==========================================

const sellerApi = {
  // ============ PRODUCT MANAGEMENT ============

  /**
   * Lấy danh sách sản phẩm của seller
   * GET /api/products/page
   */
  getProducts: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
    category?: string;
    hasAuction?: boolean;
  }) => {
    return axiosClient.get<{
      products: ProductResponse[];
      total: number;
      page: number;
      limit: number;
    }>("/products/page", { params });
  },

  /**
   * Lấy chi tiết 1 sản phẩm
   * GET /api/products/:id
   */
  getProductById: (productId: number) => {
    return axiosClient.get<ProductResponse>(`/products/${productId}`);
  },

  /**
   * Tạo sản phẩm mới
   * POST /api/products
   */
  createProduct: (data: CreateProductDto) => {
    return axiosClient.post<ProductResponse>("/products", data);
  },

  /**
   * Cập nhật sản phẩm
   * PUT /api/products/:id
   */
  updateProduct: (productId: number, data: UpdateProductDto) => {
    return axiosClient.put<ProductResponse>(`/products/${productId}`, data);
  },

  /**
   * Xóa sản phẩm
   * DELETE /api/products/:id
   */
  deleteProduct: (productId: number) => {
    return axiosClient.delete(`/products/${productId}`);
  },

  // ============ IMAGE MANAGEMENT ============

  /**
   * Upload ảnh cho sản phẩm
   * POST /api/upload
   */
  uploadProductImages: (_productId: number, images: File[]) => {
    const formData = new FormData();
    images.forEach((file) => {
      formData.append("file", file);
    });

    return axiosClient.post<ImageResponse[]>(
      `/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  /**
   * Upload ảnh cho sản phẩm với is_thumbnail flag
   * POST /api/upload
   * @param productId - ID sản phẩm
   * @param images - Mảng File objects với is_thumbnail flag
   */
  uploadProductImagesWithThumbnail: (
    productId: number,
    images: Array<{ file: File; isThumbnail: boolean }>
  ) => {
    const formData = new FormData();
    formData.append("productId", String(productId));
    
    images.forEach((item, index) => {
      formData.append("file", item.file);
      // Append is_thumbnail for each file
      formData.append(`is_thumbnail_${index}`, item.isThumbnail ? "1" : "0");
    });

    return axiosClient.post<ImageResponse[]>(
      `/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  /**
   * Xóa ảnh sản phẩm
   * DELETE /api/products/:id (marks product as deleted)
   */
  deleteProductImage: (imageId: number) => {
    // Note: image deletion is done via product deletion
    return axiosClient.delete(`/products/${imageId}`);
  },

  /**
   * Đặt ảnh thumbnail
   * PUT /api/products/:id
   */
  setThumbnail: (imageId: number) => {
    // Note: thumbnail is set via product update
    return axiosClient.put(`/products/${imageId}`);
  },

  // ============ AUCTION MANAGEMENT ============

  /**
   * Tạo phiên đấu giá
   * POST /api/auctions
   */
  createAuction: (data: {
    product_id: number;
    start_time: string;
    end_time: string;
    bid_step_amount: number;
  }) => {
    return axiosClient.post<AuctionResponse>("/auctions", data);
  },

  /**
   * Lấy danh sách phiên đấu giá
   * GET /api/auctions
   */
  getAuctions: (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) => {
    return axiosClient.get<{
      auctions: AuctionResponse[];
      total: number;
    }>("/auctions", { params });
  },

  /**
   * Hủy phiên đấu giá
   * DELETE /api/auctions/:id
   */
  cancelAuction: (auctionId: number, _reason?: string) => {
    return axiosClient.delete(`/auctions/${auctionId}`);
  },

  // ============ STATISTICS ============

  /**
   * Lấy thống kê
   * Note: Thay thế với các endpoint tương ứng từ productApi và auctionApi
   */
  getStatistics: () => {
    // For now, return a placeholder since backend doesn't have dedicated stats endpoint
    return axiosClient.get<StatisticsResponse>("/products");
  },
};

export default sellerApi;