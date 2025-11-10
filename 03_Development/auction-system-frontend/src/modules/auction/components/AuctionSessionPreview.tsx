// src/modules/auction/components/AuctionSessionPreview.tsx
import { useMemo } from "react";
import type { Product } from "@/api/modules/auction.api";
import { Calendar, Clock, DollarSign, AlertCircle } from "lucide-react";
import "@/styles/auction-session-preview.css";

interface AuctionSessionPreviewProps {
  selectedProduct: Product;
  duration: string;
  minBidIncrement: number;
  startTime: string;
  endTime: string;
}

/**
 * Preview component displaying auction session summary.
 * Shows key information about the session being created.
 */
export const AuctionSessionPreview = ({
  selectedProduct,
  duration,
  minBidIncrement,
  startTime,
  endTime,
}: AuctionSessionPreviewProps) => {
  // Format date and time
  const formattedDates = useMemo(() => {
    if (!startTime || !endTime) {
      return { startFormatted: "—", endFormatted: "—" };
    }

    try {
      const start = new Date(startTime);
      const end = new Date(endTime);

      const startFormatted = new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(start);

      const endFormatted = new Intl.DateTimeFormat("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }).format(end);

      return { startFormatted, endFormatted };
    } catch {
      return { startFormatted: "—", endFormatted: "—" };
    }
  }, [startTime, endTime]);

  const startPrice = selectedProduct?.startPrice ?? selectedProduct?.start_price ?? 0;
  const deposit = selectedProduct?.deposit ?? 0;

  return (
    <div className="auction-session-preview">
      <div className="preview-header">
        <h3 className="preview-title">Session Overview</h3>
        <p className="preview-subtitle">Review your auction settings before creation</p>
      </div>

      {/* Product Info */}
      <div className="preview-section">
        <div className="preview-section-title">Product</div>
        <div className="product-info-box">
          <img
            src={
              selectedProduct?.imageUrl ||
              selectedProduct?.image_url ||
              "/placeholder-product.png"
            }
            alt={selectedProduct?.name}
            className="product-info-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-product.png";
            }}
          />
          <div className="product-info-content">
            <h4 className="product-info-name">{selectedProduct?.name}</h4>
            <p className="product-info-category">
              {selectedProduct?.category || selectedProduct?.categories || "Uncategorized"}
            </p>
          </div>
        </div>
      </div>

      {/* Schedule Info */}
      <div className="preview-section">
        <div className="preview-section-title">Schedule</div>
        <div className="preview-grid preview-grid-2">
          <div className="preview-item">
            <div className="preview-item-icon">
              <Calendar size={20} />
            </div>
            <div className="preview-item-content">
              <span className="preview-item-label">Start</span>
              <span className="preview-item-value">
                {formattedDates.startFormatted}
              </span>
            </div>
          </div>

          <div className="preview-item">
            <div className="preview-item-icon">
              <Clock size={20} />
            </div>
            <div className="preview-item-content">
              <span className="preview-item-label">Duration</span>
              <span className="preview-item-value">{duration}</span>
            </div>
          </div>

          <div className="preview-item full-width">
            <div className="preview-item-icon">
              <Calendar size={20} />
            </div>
            <div className="preview-item-content">
              <span className="preview-item-label">End</span>
              <span className="preview-item-value">
                {formattedDates.endFormatted}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Details */}
      <div className="preview-section">
        <div className="preview-section-title">Financial Details</div>
        <div className="preview-grid preview-grid-3">
          <div className="preview-item">
            <div className="preview-item-icon financial">
              <DollarSign size={20} />
            </div>
            <div className="preview-item-content">
              <span className="preview-item-label">Start Price</span>
              <span className="preview-item-value">
                ₫{startPrice.toLocaleString("vi-VN")}
              </span>
            </div>
          </div>

          <div className="preview-item">
            <div className="preview-item-icon financial">
              <DollarSign size={20} />
            </div>
            <div className="preview-item-content">
              <span className="preview-item-label">Min Bid Increment</span>
              <span className="preview-item-value">
                ₫{minBidIncrement.toLocaleString("vi-VN")}
              </span>
            </div>
          </div>

          <div className="preview-item">
            <div className="preview-item-icon financial">
              <DollarSign size={20} />
            </div>
            <div className="preview-item-content">
              <span className="preview-item-label">Deposit Required</span>
              <span className="preview-item-value">
                ₫{deposit.toLocaleString("vi-VN")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="preview-notice">
        <AlertCircle size={18} />
        <div className="notice-content">
          <p className="notice-title">Important</p>
          <ul className="notice-list">
            <li>Once created, the start price and deposit cannot be changed</li>
            <li>Only the end time can be extended after creation</li>
            <li>All times are in your local timezone</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuctionSessionPreview;
