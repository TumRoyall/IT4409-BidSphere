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
  id?: number;
  productId?: number;
  
  name: string;
  description?: string;
  
  // Category fields
  category?: string;
  categories?: string;
  
  // Price fields
  startPrice?: number;
  estimatePrice?: number;
  
  deposit: number;
  
  // Image fields
  imageUrl?: string;
  
  status?: string;
  
  // Seller fields
  sellerId?: number;
  
  // Timestamp fields
  createdAt?: string;
  
  // Additional fields
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
  // Optional fields used by UI components
  productImageUrl?: string;
  productName?: string;
  startPrice?: number;
  estimatePrice?: number;
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