import React, { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Card, CardContent } from "@/components/common/Card";
import { TrendingUp, X } from "lucide-react";
import auctionApi from "@/api/modules/auction.api";
import type { AuctionResponse } from "@/api/modules/auction.api";
import "@/styles/modules/seller/index.css";

interface BiddingHistoryProps {
  auctionId: number;
  onClose?: () => void;
}

const BiddingHistory: React.FC<BiddingHistoryProps> = ({ auctionId, onClose }) => {
  const [auction, setAuction] = useState<AuctionResponse | null>(null);
  const [bids] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAuctionDetails();
  }, [auctionId]);

  const fetchAuctionDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await auctionApi.getAuctionById(auctionId);
      setAuction(response.data);

      // Note: Fetch bids if available
      // const bidsResponse = await bidApi.getBidsByAuction(auctionId);
      // setBids(bidsResponse.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load auction details");
      console.error("Error fetching auction details:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  if (loading) {
    return (
      <div className="bidding-history">
        <div className="loading-spinner">Loading bidding history...</div>
      </div>
    );
  }

  return (
    <div className="bidding-history">
      {/* Header */}
      <div className="history-header">
        <h2 className="history-title">
          <TrendingUp size={24} />
          Bidding History
        </h2>
        {onClose && (
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close bidding history"
          >
            <X size={24} />
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="error-alert">
          <p className="error-message">{error}</p>
          <button
            className="error-dismiss"
            onClick={() => setError(null)}
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}

      {/* Auction summary */}
      {auction && (
        <Card className="auction-summary-card">
          <CardContent className="auction-summary-content">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Product:</span>
                <span className="summary-value">
                  {auction.product?.name || `Product #${auction.productId}`}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Status:</span>
                <span className={`badge badge-${auction.status}`}>
                  {auction.status?.toUpperCase()}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Current Bid:</span>
                <span className="summary-value summary-price">
                  {formatPrice(auction.highestCurrentPrice || auction.currentBid || 0)}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total Bids:</span>
                <span className="summary-value">{auction.totalBids || 0}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Bid Step:</span>
                <span className="summary-value">
                  {formatPrice(auction.bidStepAmount || 0)}
                </span>
              </div>
              {auction.winnerId && (
                <div className="summary-item">
                  <span className="summary-label">Winner ID:</span>
                  <span className="summary-value">#{auction.winnerId}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bids list */}
      {bids.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-text">
            No bids recorded yet
          </p>
          <p className="empty-state-subtext">
            Bids will appear here as users place them
          </p>
        </div>
      ) : (
        <div className="bids-list">
          <div className="bids-header">
            <span className="bid-col bid-user">User</span>
            <span className="bid-col bid-amount">Amount</span>
            <span className="bid-col bid-date">Date & Time</span>
            <span className="bid-col bid-status">Status</span>
          </div>

          {bids.map((bid: any, index: number) => (
            <div key={bid.id || index} className="bid-row">
              <span className="bid-col bid-user">
                User #{bid.user_id}
              </span>
              <span className="bid-col bid-amount">
                {formatPrice(bid.amount || 0)}
              </span>
              <span className="bid-col bid-date">
                {formatDate(bid.createdAt || new Date().toISOString())}
              </span>
              <span className={`bid-col bid-status ${bid.is_winning ? "winning" : ""}`}>
                {bid.is_winning ? "Winning" : "Outbid"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Close button */}
      <div className="history-footer">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default BiddingHistory;
