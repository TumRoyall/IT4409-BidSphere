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
  totalBids?: number;

  createdAt?: string;
  updatedAt?: string;
  winnerId?: number | null;

  // UI fields
  productImageUrl?: string;
  productName?: string;
  startPrice?: number;
  estimatePrice?: number;
}

// ==================== API FUNCTIONS ====================
const auctionApi = {
  // 📊 Get auctions with filter (từ HEAD)
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
    axiosClient.get<AuctionResponse[]>("/auctions", { params }),

  // ✨ Create
  createAuction: (data: AuctionRequest) =>
    axiosClient.post<AuctionResponse>("/auctions", data),

  // 📊 Get all
  getAllAuctions: () =>
    axiosClient.get<AuctionResponse[]>("/auctions"),

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

  // 📊 Active
  getActiveAuctions: () =>
    axiosClient.get<AuctionResponse[]>("/auctions/active"),

  // 📊 Get auctions của seller hiện tại (từ token)
  getMyAuctions: () =>
    axiosClient.get<AuctionResponse[]>("/auctions/me"),

  // ✅ Approve / Reject (Admin duyệt auction: DRAFT -> PENDING hoặc CANCELLED)
  approveAuction: (auctionId: number, status: string) =>
    axiosClient.get<AuctionResponse>(
      `/auctions/${auctionId}/approve?status=${status}`
    ),

  // 📊 Get auctions by seller ID (public - for seller profile)
  getAuctionsBySellerId: (sellerId: number) =>
    axiosClient.get<AuctionResponse[]>(`/auctions/seller/${sellerId}`),
};

export default auctionApi;
