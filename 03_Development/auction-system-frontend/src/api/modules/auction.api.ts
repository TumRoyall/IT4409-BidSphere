// src/api/modules/auction.api.ts
import axiosClient from "../axiosClient";

// ==================== STATUS (const + type) ====================
export const AUCTION_STATUS = {
  CREATED: "created",
  OPEN: "open",
  CLOSED: "closed",
  CANCELLED: "cancelled",
} as const;
export type AuctionStatus = typeof AUCTION_STATUS[keyof typeof AUCTION_STATUS];

// ==================== TYPES & INTERFACES ====================
export interface Product {
  // ID fields (support both camelCase and snake_case)
  id?: number;
  product_id?: number;
  productId?: number;  // Backend returns camelCase
  
  name: string;
  description?: string;
  
  // Category fields
  category?: string;
  categories?: string;
  
  // Price fields
  startPrice?: number;
  start_price?: number;
  estimatePrice?: number;
  estimate_price?: number;
  
  deposit: number;
  
  // Image fields
  image_url?: string;
  imageUrl?: string;
  
  status?: string;
  
  // Seller fields
  seller_id?: number;
  sellerId?: number;
  
  // Timestamp fields
  created_at?: string;
  createdAt?: string;
  
  // Additional fields
  isDeleted?: boolean;
  is_deleted?: boolean;
}

export interface AuctionRequest {
  productId?: number;
  startTime?: string;
  endTime?: string;
  bidStepAmount?: number;
}

export interface AuctionResponse {
  id?: number;
  auction_id?: number;
  product_id?: number;
  product?: Product;
  start_time?: string;
  end_time?: string;
  bid_step_amount?: number;
  status: AuctionStatus | string;
  current_bid?: number;
  highest_current_price?: number;
  total_bids?: number;
  created_at?: string;
  updated_at?: string;
  winner_id?: number | null;
  // Optional fields used by UI components
  productImageUrl?: string;
  productName?: string;
  startPrice?: number;
  highestBid?: number;
  auctionId?: number;
}

// ==================== API FUNCTIONS ====================

const auctionApi = {
  // ✨ Create new auction
  createAuction: (data: AuctionRequest) =>
    axiosClient.post<AuctionResponse>("/auctions", data),

  // 📊 Get list of all auctions
  getAllAuctions: () =>
    axiosClient.get<AuctionResponse[]>("/auctions"),

  // 🔍 Get auction by ID
  getAuctionById: (auctionId: number) =>
    axiosClient.get<AuctionResponse>(`/auctions/${auctionId}`),

  // ✏️ Update auction
  updateAuction: (auctionId: number, data: AuctionRequest) =>
    axiosClient.put<AuctionResponse>(`/auctions/${auctionId}`, data),

  // 🗑️ Delete auction
  deleteAuction: (auctionId: number) =>
    axiosClient.delete<void>(`/auctions/${auctionId}`),

  // ▶️ Start auction (OPEN)
  startAuction: (auctionId: number) =>
    axiosClient.post<void>(`/auctions/${auctionId}/start`),

  // ⏹️ Close auction
  closeAuction: (auctionId: number) =>
    axiosClient.post<void>(`/auctions/${auctionId}/close`),

  // 📊 Get active auctions
  getActiveAuctions: () =>
    axiosClient.get<AuctionResponse[]>("/auctions/active"),

  // ✅ Approve or reject auction (admin/moderator)
  approveAuction: (auctionId: number, data: { status: string; startTime?: string; endTime?: string; rejectionReason?: string }) =>
    axiosClient.put<AuctionResponse>(`/auctions/${auctionId}/approve`, data),
};

export default auctionApi;