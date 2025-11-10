import React from "react";
import { Button, ProductListSkeleton } from "@/components/common";
import { Edit2, Trash2 } from "lucide-react";
import ProductMoreOptions from "./ProductMoreOptions";
import type { Product } from "../types/seller.types";
import "@/styles/seller.css";

interface ApprovedProductsProps {
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
  onViewDetails?: (product: Product) => void;
  onViewAuctions?: (product: Product) => void;
}

const STATUS_BADGE_CLASS: Record<string, string> = {
  pending: "badge-pending",
  approved: "badge-approved",
  rejected: "badge-rejected",
  sold: "badge-sold",
  removed: "badge-removed",
};

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price);
};

const truncateText = (text: string, maxLength: number = 120): string => {
  if (!text || text.trim().length === 0) return "—";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, "") + "…";
};

const ApprovedProducts: React.FC<ApprovedProductsProps> = ({
  products,
  loading,
  error,
  pagination,
  onRefresh,
  onEdit,
  onDelete,
  onViewDetails,
  onViewAuctions,
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

      {/* Products List */}
      <div className="products-list">
        {products.map((product, index) => (
          <div key={product.product_id || `product-${index}`} className="product-card">
            {/* Product Content */}
            <div className="product-content">
              {/* Product Image */}
              <div className="product-image-wrapper">
                <img
                  src={product.image_url || "/placeholder-product.png"}
                  alt={product.name}
                  className="product-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/placeholder-product.png";
                  }}
                />
              </div>

              {/* Product Details */}
              <div className="product-details">
                {/* Header with title and status */}
                <div className="product-header">
                  <div className="product-title-group">
                    <h3 className="product-title">{product.name}</h3>
                    <span
                      className={`badge ${
                        STATUS_BADGE_CLASS[product.status] || "badge-default"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="product-description">
                  {truncateText(product.description, 150)}
                </p>

                {/* Product Info Grid */}
                <div className="product-info-grid">
                  <div className="info-item">
                    <span className="info-label">Start Price</span>
                    <span className="info-value">
                      {formatPrice(product.start_price)}
                    </span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">Category</span>
                    <span className="info-value">{product.categories}</span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">Deposit</span>
                    <span className="info-value">
                      {formatPrice(product.deposit)}
                    </span>
                  </div>

                  <div className="info-item">
                    <span className="info-label">Created</span>
                    <span className="info-value">
                      {new Date(product.created_at).toLocaleDateString(
                        "vi-VN"
                      )}
                    </span>
                  </div>

                  {product.auction && (
                    <>
                      <div className="active-session-alert">
                        <div className="session-indicator" />
                        <span className="session-text">
                          Auction Active
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Product Actions */}
              <div className="product-actions">
              <button
              type="button"
              className="action-button"
              aria-label={`Edit ${product.name}`}
              title="Edit product"
              onClick={() => onEdit?.(product)}
              >
              <Edit2 size={18} />
              </button>
              <button
              type="button"
              className="action-button"
              aria-label={`Delete ${product.name}`}
              title="Delete product"
              onClick={() => onDelete?.(product)}
              >
              <Trash2 size={18} />
              </button>
              <ProductMoreOptions
              product={product}
              onViewDetails={onViewDetails}
              onViewAuctions={onViewAuctions}
              />
              </div>
            </div>
          </div>
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

export default ApprovedProducts;
