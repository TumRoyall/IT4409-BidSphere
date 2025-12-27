import axiosClient from "../axiosClient";

// ==================== STATUS (const + type) ====================
export const AUCTION_STATUS = {
  DRAFT: "draft",       // Seller tạo, chờ admin duyệt
  PENDING: "pending",   // Admin đã duyệt, chờ đến giờ
  OPEN: "open",         // Đang diễn ra
  CLOSED: "closed",     // Đã kết thúc
  CANCELLED: "cancelled", // Bị từ chối
} as const;

export type AuctionStatus =
  typeof AUCTION_STATUS[keyof typeof AUCTION_STATUS];

// ==================== TYPES & INTERFACES ====================
export interface Product {
  id?: number;
  productId?: number;
  name: string;
  description?: string;

  category?: string;
  categories?: string;

  startPrice?: number;
  estimatePrice?: number;
  deposit: number;

  imageUrl?: string;
  status?: string;
  sellerId?: number;

  createdAt?: string;
  isDeleted?: boolean;
}

export interface AuctionRequest {
  productId?: number;
  startTime?: string;
  endTime?: string;
  bidStepAmount?: number;
}

export interface AuctionResponse {
  id?: number;
  auctionId?: number;
  productId?: number;
  product?: Product;

  startTime?: string;
  endTime?: string;
  bidStepAmount?: number;

  status: AuctionStatus | string;

  currentBid?: number;
  highestCurrentPrice?: number;
  highestBid?: number;
  totalBids?: number;      // Tổng số lượt bid
  totalBidders?: number;   // Số người bid khác nhau

  createdAt?: string;
  updatedAt?: string;
  winnerId?: number | null;

  // Additional optional fields observed in responses
  categoryName?: string;   // Some endpoints return category as categoryName
  category?: string;       // Fallback category field at auction level
  timestamp?: string | number; // Generic time marker used by some APIs

  // UI fields
  productImageUrl?: string;
  productName?: string;
  startPrice?: number;
  estimatePrice?: number;
}

// Paginated Response wrapper for list endpoints
export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; // current page (0-indexed)
  size: number;   // page size
  last: boolean;
  first: boolean;
}

// ==================== API FUNCTIONS ====================
const auctionApi = {
  // 📊 Get auctions with filter (paginated response)
  getAuctions: (params?: {
    status?: string;
    category?: string;
    keyword?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    size?: number;
    sort?: string;
  }) =>
    axiosClient.get<PaginatedResponse<AuctionResponse>>("/auctions", { params }),

  // ✨ Create
  createAuction: (data: AuctionRequest) =>
    axiosClient.post<AuctionResponse>("/auctions", data),

  // 📊 Get all (returns array or paginated)
  getAllAuctions: () =>
    axiosClient.get<AuctionResponse[] | PaginatedResponse<AuctionResponse>>("/auctions"),

  // 🔍 Get by ID
  getAuctionById: (auctionId: number) =>
    axiosClient.get<AuctionResponse>(`/auctions/${auctionId}`),

  // ✏️ Update
  updateAuction: (auctionId: number, data: AuctionRequest) =>
    axiosClient.put<AuctionResponse>(`/auctions/${auctionId}`, data),

  // 🗑️ Delete
  deleteAuction: (auctionId: number) =>
    axiosClient.delete<void>(`/auctions/${auctionId}`),

  // ▶️ Start
  startAuction: (auctionId: number) =>
    axiosClient.post<void>(`/auctions/${auctionId}/start`),

  // ⏹️ Close
  closeAuction: (auctionId: number) =>
    axiosClient.post<void>(`/auctions/${auctionId}/close`),

  // 📊 Active (paginated)
  getActiveAuctions: () =>
    axiosClient.get<PaginatedResponse<AuctionResponse>>("/auctions/active"),

  // 📊 Get auctions của seller hiện tại (paginated)
  getMyAuctions: () =>
    axiosClient.get<PaginatedResponse<AuctionResponse>>("/auctions/me"),

  // ✅ Approve / Reject (Admin duyệt auction: DRAFT -> PENDING hoặc CANCELLED)
  approveAuction: (auctionId: number, status: string) =>
    axiosClient.post<AuctionResponse>(
      `/auctions/${auctionId}/approve?status=${status}`
    ),

  // 📊 Get auctions by seller ID (public - for seller profile, paginated or array fallback)
  getAuctionsBySellerId: (
    sellerId: number,
    params?: { page?: number; size?: number; sort?: string; status?: string }
  ) =>
    axiosClient.get<PaginatedResponse<AuctionResponse> | AuctionResponse[]>(
      `/auctions/seller/${sellerId}`,
      { params }
    ),
};

export default auctionApi;
