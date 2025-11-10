// src/modules/seller/types/seller.types.ts

// Re-export product types from product module
export {
  Product,
  ProductStatus,
  ProductImage,
  ProductFormData,
  ProductFilters,
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "@/modules/product/types";

// Re-export auction types
export {
  Auction,
  AuctionStatus,
} from "@/modules/product/types";

// ==========================================
// 📊 SELLER-SPECIFIC STATISTICS TYPES
// ==========================================

export interface SellerStatistics {
  total_products: number;
  active_sessions: number;
  pending_approval: number;
  total_revenue?: number;
  total_sold?: number;
}