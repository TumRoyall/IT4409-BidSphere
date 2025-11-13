import React, { useState } from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/common";
import ProductDetailsModal from "./ProductDetailsModal";
import type { Product } from "../types/seller.types";
import "@/styles/seller.css";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
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

const truncateText = (text: string, maxLength: number = 100): string => {
  if (!text || text.trim().length === 0) return "—";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, "") + "…";
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
}) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  return (
    <>
      <div className="product-card">
        {/* Product Image */}
        <div className="product-image-container">
          <img
            src={product.image_url || "/placeholder-product.png"}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-product.png";
            }}
          />
          <div className="product-image-overlay">
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsDetailsModalOpen(true)}
              className="view-details-btn"
            >
              <Eye size={16} className="mr-1" />
              Details
            </Button>
          </div>
          {product.auction && (
            <span className="auction-badge">Active Auction</span>
          )}
        </div>

        {/* Product Info */}
        <div className="product-card-content">
          {/* Title & Status */}
          <div className="product-card-header">
            <h3 className="product-card-title">{product.name}</h3>
            <span
              className={`badge ${
                STATUS_BADGE_CLASS[product.status] || "badge-default"
              }`}
            >
              {product.status}
            </span>
          </div>

          {/* Description */}
          <p className="product-card-description">
            {truncateText(product.description, 100)}
          </p>

          {/* Quick Info */}
          <div className="product-card-info">
            <div className="info-row">
              <span className="info-label">Price:</span>
              <span className="info-value">
                {formatPrice(product.start_price)}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Category:</span>
              <span className="info-value">{product.categories || "—"}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="product-card-actions">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit?.(product)}
              className="action-btn"
            >
              <Edit2 size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="action-btn delete-btn"
              onClick={() => onDelete?.(product)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <ProductDetailsModal
        product={product}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};

export default ProductCard;
