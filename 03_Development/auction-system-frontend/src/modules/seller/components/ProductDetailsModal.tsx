import React, { useState } from "react";
import { X, Edit2, Trash2, Copy } from "lucide-react";
import { Button } from "@/components/common";
import { Modal } from "@/components/common/Modal";
import type { Product } from "../types/seller.types";
import "@/styles/seller.css";

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price);
};

const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!product) return null;

  const handleCopyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const STATUS_BADGE_CLASS: Record<string, string> = {
    pending: "badge-pending",
    approved: "badge-approved",
    rejected: "badge-rejected",
    sold: "badge-sold",
    removed: "badge-removed",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="xl"
      className="product-details-modal"
    >
      <div className="product-details-modal-content">
        {/* Header with Close Button */}
        <div className="modal-header">
          <h2 className="modal-title">{product.name}</h2>
          <button
            onClick={onClose}
            className="close-button"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Product Image */}
        <div className="details-image-container">
          <img
            src={product.image_url || "/placeholder-product.png"}
            alt={product.name}
            className="details-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-product.png";
            }}
          />
        </div>

        {/* Product Details Content */}
        <div className="details-content">
          {/* Status and Basic Info */}
          <div className="details-header">
            <span
              className={`badge ${
                STATUS_BADGE_CLASS[product.status] || "badge-default"
              }`}
            >
              {product.status}
            </span>
            {product.auction && (
              <span className="auction-badge-small">Active Auction</span>
            )}
          </div>

          {/* Description */}
          <div className="detail-section">
            <h3 className="section-title">Description</h3>
            <p className="section-content description-text">
              {product.description || "No description provided"}
            </p>
          </div>

          {/* Price and Deposit */}
          <div className="detail-section">
            <h3 className="section-title">Pricing Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Starting Price</span>
                <span className="detail-value price-highlight">
                  {formatPrice(product.start_price)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Deposit Amount</span>
                <span className="detail-value price-highlight">
                  {formatPrice(product.deposit)}
                </span>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="detail-section">
            <h3 className="section-title">Product Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Category</span>
                <span className="detail-value">
                  {product.categories || "Not specified"}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Condition</span>
                <span className="detail-value">
                  {product.condition || "Not specified"}
                </span>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="detail-section">
            <h3 className="section-title">Timeline</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Created</span>
                <span className="detail-value">
                  {formatDate(product.created_at)}
                </span>
              </div>
              {product.updated_at && (
                <div className="detail-item">
                  <span className="detail-label">Last Updated</span>
                  <span className="detail-value">
                    {formatDate(product.updated_at)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Additional Details */}
          {product.product_id && (
            <div className="detail-section">
              <h3 className="section-title">Product ID</h3>
              <div className="detail-item">
                <span className="detail-value mono">
                  {product.product_id}
                </span>
                <button
                  onClick={() =>
                    handleCopyToClipboard(String(product.product_id), "id")
                  }
                  className="copy-button"
                  title="Copy product ID"
                >
                  <Copy size={16} />
                  {copiedField === "id" ? "Copied" : ""}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="details-actions">
          <Button
            variant="outline"
            onClick={onClose}
            className="action-btn-secondary"
          >
            Close
          </Button>
          <div className="action-buttons-group">
            <Button
              variant="default"
              onClick={() => {
                onEdit?.(product);
                onClose();
              }}
              className="action-btn-primary"
            >
              <Edit2 size={18} />
              Edit Product
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete?.(product);
                onClose();
              }}
              className="action-btn-danger"
            >
              <Trash2 size={18} />
              Delete Product
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
