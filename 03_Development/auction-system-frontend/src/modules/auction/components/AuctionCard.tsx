import { useNavigate } from "react-router-dom";
import { Clock, DollarSign, TrendingUp } from "lucide-react";
import type { AuctionResponse } from "@/api/modules/auction.api";
import "@/styles/auction-list.css";

interface AuctionCardProps {
  auction: AuctionResponse;
}

export default function AuctionCard({ auction }: AuctionCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/auctions/${auction.id || auction.auctionId}`);
  };

  const getStatusColor = (status: string | undefined) => {
    const s = status?.toLowerCase() || "";
    if (s === "open") return "open";
    if (s === "closed") return "closed";
    if (s === "created") return "created";
    return "other";
  };

  const getTimeRemaining = (endTime: string | undefined) => {
    if (!endTime) return null;
    const end = new Date(endTime);
    const now = new Date();
    const diff = end.getTime() - now.getTime();

    if (diff < 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  const timeRemaining = getTimeRemaining(auction.endTime);
  const statusColor = getStatusColor(auction.status);

  return (
    <div className="auction-card" onClick={handleClick}>
      {/* Image */}
      <div className="auction-card-image-container">
        <img
        src={
        auction.product?.imageUrl ||
        auction.productImageUrl ||
        "/placeholder.png"
        }
          alt={auction.productName || "Product"}
          className="auction-card-image"
        />
        <div className={`auction-card-status-badge auction-card-status-${statusColor}`}>
          {auction.status?.charAt(0).toUpperCase() +
            (auction.status?.slice(1) || "").toLowerCase()}
        </div>
      </div>

      {/* Content */}
      <div className="auction-card-content">
        {/* Product Name */}
        <h3 className="auction-card-product-name">
          {auction.productName || auction.product?.name || "Product"}
        </h3>

        {/* Status Line */}
        <div className="auction-card-status-line">
          <span className={`auction-card-status-text auction-card-status-text-${statusColor}`}>
            {auction.status?.charAt(0).toUpperCase() +
              (auction.status?.slice(1) || "").toLowerCase()}
          </span>
        </div>

        {/* Price Info */}
        <div className="auction-card-price-section">
          <div className="auction-card-price-item">
            <DollarSign size={14} />
            <span className="auction-card-price-label">Current:</span>
            <span className="auction-card-price-value">
            $
            {(
            auction.currentBid ||
            auction.highestCurrentPrice ||
            auction.highestBid ||
            auction.product?.startPrice ||
            auction.startPrice ||
            0
            ).toFixed(2)}
            </span>
          </div>

          {auction.bidStepAmount && (
          <div className="auction-card-price-item">
          <TrendingUp size={14} />
          <span className="auction-card-price-label">Bid Step:</span>
          <span className="auction-card-price-value">
          ${auction.bidStepAmount.toFixed(2)}
          </span>
          </div>
          )}
        </div>

        {/* Time Remaining */}
        {timeRemaining && (
          <div className="auction-card-time-remaining">
            <Clock size={14} />
            <span>{timeRemaining}</span>
          </div>
        )}

        {/* Bid Count */}
        {auction.totalBids && (
        <div className="auction-card-bid-count">
        {auction.totalBids} bid{auction.totalBids > 1 ? "s" : ""}
        </div>
        )}
      </div>

      {/* Hover Button */}
      <div className="auction-card-hover-button">View Details</div>
    </div>
  );
}
