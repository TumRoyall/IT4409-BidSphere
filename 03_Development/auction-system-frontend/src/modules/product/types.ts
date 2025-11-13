// src/modules/product/types.ts

// ==========================================
// 📦 PRODUCT TYPES
// ==========================================

export interface Product {
  product_id: number;
  seller_id: number;
  name: string;
  categories: string;
  description: string;
  start_price: number;
  estimate_price: string;
  deposit: number;
  image_url: string;
  status: ProductStatus;
  created_at: string;
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
  image_id: number;
  product_id: number;
  image_url: string;
  is_thumbnail: boolean;
}

// ==========================================
// ⚡ AUCTION TYPES
// ==========================================

export interface Auction {
  auction_id: number;
  product_id: number;
  start_time: string;
  end_time: string;
  status: AuctionStatus;
  highest_current_price: number;
  bid_step_amount: string;
  winner_id: number | null;
  total_bids?: number;
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
  categories: string;
  description: string;
  start_price: number;
  estimate_price: string;
  deposit: number;
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
