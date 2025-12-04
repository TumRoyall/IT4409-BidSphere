// src/modules/product/types.ts

// ==========================================
// 📦 PRODUCT TYPES
// ==========================================

export interface Product {
  productId: number;
  sellerId: number;
  name: string;
  category?: string;
  description: string;
  startPrice: number;
  estimatePrice?: number;
  deposit?: number;
  imageUrl?: string;
  status: ProductStatus;
  createdAt: string;
  isDeleted?: boolean;
  deletedAt?: string;
  images?: ProductImage[];
  auction?: Auction | null;
}

// Runtime-safe constants compatible with "erasableSyntaxOnly"
export const PRODUCT_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  SOLD: "sold",
  REMOVED: "removed",
} as const;

export type ProductStatus = typeof PRODUCT_STATUS[keyof typeof PRODUCT_STATUS];

export interface ProductImage {
  id?: number;
  imageId?: number;
  productId: number;
  url?: string;
  imageUrl?: string;
  isThumbnail?: boolean;
  thumbnail?: boolean;
}

// ==========================================
// ⚡ AUCTION TYPES
// ==========================================

export interface Auction {
  auctionId: number;
  productId: number;
  startTime: string;
  endTime: string;
  status: AuctionStatus;
  highestBid: number;
  bidStepAmount: number;
  winnerId: number | null;
  totalBids?: number;
}

export const AUCTION_STATUS = {
  SCHEDULED: "scheduled",
  ACTIVE: "active",
  ENDED: "ended",
  CANCELLED: "cancelled",
} as const;

export type AuctionStatus = typeof AUCTION_STATUS[keyof typeof AUCTION_STATUS];

// ==========================================
// 📝 FORM TYPES
// ==========================================

export interface ProductFormData {
  name: string;
  category: string;
  description: string;
  startPrice: number;
  createAuction: boolean;
  auctionStartTime: string;
  auctionEndTime: string;
  bidStepAmount: number;
}

// ==========================================
// 🔍 FILTER TYPES
// ==========================================

export interface ProductFilters {
  search?: string;
  status?: ProductStatus | "all";
  category?: string;
  hasAuction?: boolean;
  page: number;
  limit: number;
}

// ==========================================
// 📊 CATEGORY OPTIONS
// ==========================================

export const PRODUCT_CATEGORIES = [
  { value: "electronics", label: "Đồ điện tử" },
  { value: "fashion", label: "Thời trang" },
  { value: "antique", label: "Đồ cổ" },
  { value: "art", label: "Nghệ thuật" },
  { value: "vehicle", label: "Xe cộ" },
  { value: "collectible", label: "Sưu tầm" },
  { value: "home", label: "Đồ gia dụng" },
  { value: "jewelry", label: "Trang sức" },
  { value: "other", label: "Khác" },
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number]["value"];
