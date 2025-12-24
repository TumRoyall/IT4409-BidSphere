import React from "react";
import { Button, ProductListSkeleton } from "@/components/common";
import ProductCard from "./ProductCard";
import type { Product } from "../types/seller.types";
import "@/styles/seller.css";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  error?: string | null;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  onRefresh?: () => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  error,
  pagination,
  onRefresh,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return <ProductListSkeleton count={3} />;
  }

  if (error) {
    return (
      <div className="approved-products">
        <div className="error-alert">
          <p className="error-message">{error}</p>
          <Button onClick={onRefresh} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="approved-products">
        <div className="empty-state">
          <p className="empty-state-text">No products found</p>
          <p className="empty-state-subtext">Start by creating a new product</p>
        </div>
      </div>
    );
  }

  return (
    <div className="approved-products">
      {/* Products Header */}
      <div className="products-header">
        <h2 className="products-title">Your Products</h2>
        <span className="product-count">
          {pagination?.total || products.length} total
        </span>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard
            key={product.productId || `product-${index}`}
            product={product}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="pagination-container">
          <Button
            variant="outline"
            disabled={pagination.page <= 1}
            onClick={() => {
              /* Handle previous page */
            }}
          >
            ← Previous
          </Button>
          <span className="pagination-info">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => {
              /* Handle next page */
            }}
          >
            Next →
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
