// src/modules/seller/types/seller.types.ts

// Re-export product types from product module
export type {
  Product,
  ProductStatus,
  ProductImage,
  ProductFormData,
  ProductFilters,
  ProductCategory,
} from "@/modules/product/types";
export { PRODUCT_CATEGORIES, PRODUCT_STATUS } from "@/modules/product/types";

// Re-export auction types
export type { Auction, AuctionStatus } from "@/modules/product/types";
export { AUCTION_STATUS } from "@/modules/product/types";

// ==========================================
// 📊 SELLER-SPECIFIC STATISTICS TYPES
// ==========================================

export interface SellerStatistics {
  totalProducts: number;
  activeSessions: number;
  pendingApproval: number;
  totalRevenue?: number;
  totalSold?: number;
}