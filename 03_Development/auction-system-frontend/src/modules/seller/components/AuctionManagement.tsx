// src/modules/seller/components/AuctionManagement.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Modal } from "@/components/common/Modal";
import { Package, X, TrendingUp } from "lucide-react";
import auctionApi from "@/api/modules/auction.api";
import BiddingHistory from "./BiddingHistory";
import type { Product } from "../types/seller.types";
import "@/styles/seller.css";

interface AuctionManagementProps {
  product?: Product | null;
  onClose?: () => void;
}

const AuctionManagement: React.FC<AuctionManagementProps> = ({
  product,
  onClose,
}) => {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedAuction, setExpandedAuction] = useState<number | null>(null);
  const [selectedAuctionForBids, setSelectedAuctionForBids] = useState<number | null>(null);
  const [isBiddingHistoryOpen, setIsBiddingHistoryOpen] = useState(false);

  useEffect(() => {
    fetchAuctions();
  }, [product]);

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await auctionApi.getAllAuctions();
      const auctionsList = Array.isArray(response.data) ? response.data : [];

      // Filter by product if provided
      const filtered = product
        ? auctionsList.filter((a: any) => {
          const legacyAuction = a as { product_id?: number };
          const auctionProductId = a.productId ?? legacyAuction.product_id;
          const selectedProductId = product.productId ?? (product as any)?.id;
          return auctionProductId && selectedProductId
            ? auctionProductId === selectedProductId
            : false;
        })
        : auctionsList;

      // Debug logging
      console.log("Fetched auctions:", auctionsList);
      console.log("Product filter:", product);
      console.log("Filtered auctions:", filtered);

      setAuctions(filtered);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load auctions");
      console.error("Error fetching auctions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartAuction = async (auctionId: number) => {
    try {
      setLoading(true);
      await auctionApi.startAuction(auctionId);
      fetchAuctions();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to start auction");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAuction = async (auctionId: number) => {
    if (!window.confirm("Are you sure you want to close this auction?")) return;

    try {
      setLoading(true);
      await auctionApi.closeAuction(auctionId);
      fetchAuctions();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to close auction");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAuction = async (auctionId: number) => {
    if (!window.confirm("Are you sure you want to delete this auction?")) return;

    try {
      setLoading(true);
      await auctionApi.deleteAuction(auctionId);
      fetchAuctions();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete auction");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadgeClass = (status: string) => {
    const statusMap: Record<string, string> = {
      open: "badge-active",
      closed: "badge-closed",
      created: "badge-pending",
      cancelled: "badge-cancelled",
    };
    return statusMap[status] || "badge-default";
  };

  const handleViewBiddingHistory = (auctionId: number) => {
    setSelectedAuctionForBids(auctionId);
    setIsBiddingHistoryOpen(true);
  };

  if (loading && auctions.length === 0) {
    return (
      <div className="auction-management">
        <div className="loading-spinner">Loading auctions...</div>
      </div>
    );
  }

  return (
    <div className="auction-management" style={{ padding: "20px 0" }}>
      {/* Error message */}
      {error && (
        <div style={{
          background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
          border: "1px solid #fca5a5",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "12px"
        }}>
          <div style={{
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
            flex: 1
          }}>
            <span style={{ fontSize: "18px", marginTop: "2px" }}>⚠️</span>
            <p style={{
              margin: 0,
              fontSize: "13px",
              color: "#7f1d1d",
              fontWeight: 500,
              lineHeight: 1.5
            }}>
              {error}
            </p>
          </div>
          <button
            onClick={() => setError(null)}
            aria-label="Dismiss error"
            style={{
              background: "transparent",
              border: "none",
              color: "#991b1b",
              cursor: "pointer",
              fontSize: "20px",
              padding: "0",
              lineHeight: 1,
              flexShrink: 0
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Auctions list */}
      {auctions.length === 0 ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 32px",
          background: "linear-gradient(135deg, #f7fafc 0%, #f0f4f8 100%)",
          borderRadius: "12px",
          border: "2px dashed #cbd5e0",
          textAlign: "center"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            background: "#e2e8f0",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px"
          }}>
            <Package size={40} color="#718096" />
          </div>
          <p style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "#2d3748",
            margin: "0 0 8px 0"
          }}>
            No auctions found
          </p>
          <p style={{
            fontSize: "14px",
            color: "#718096",
            margin: 0,
            maxWidth: "300px"
          }}>
            {product
              ? "Create an auction session for this product in the Product Management page"
              : "No active auctions at the moment"}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {auctions.map((auction: any) => (
            <div
              key={auction.auctionId}
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "all 0.2s",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.15)";
                e.currentTarget.style.borderColor = "#667eea";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.borderColor = "#e2e8f0";
              }}
            >
              {/* Auction header */}
              <div style={{
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
                borderBottom: expandedAuction === auction.auctionId ? "1px solid #e2e8f0" : "none",
                cursor: "pointer",
                background: expandedAuction === auction.auctionId ? "#f7fafc" : "white",
                transition: "background 0.2s"
              }}
                onClick={() => setExpandedAuction(
                  expandedAuction === auction.auctionId ? null : auction.auctionId
                )}
              >
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "4px",
                    height: "40px",
                    background: getStatusBadgeClass(auction.status).includes("active")
                      ? "#10b981"
                      : getStatusBadgeClass(auction.status).includes("closed")
                        ? "#6b7280"
                        : "#f59e0b",
                    borderRadius: "2px"
                  }} />
                  <div>
                    <h3 style={{
                      margin: 0,
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#1a202c"
                    }}>
                      {auction.product?.name || `Product #${auction.productId ?? (auction as { product_id?: number }).product_id ?? "?"}`}
                    </h3>
                    <p style={{
                      margin: "4px 0 0 0",
                      fontSize: "12px",
                      color: "#718096"
                    }}>
                      Auction ID: #{auction.auctionId}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{
                    padding: "4px 12px",
                    background: getStatusBadgeClass(auction.status).includes("active")
                      ? "#d1fae5"
                      : getStatusBadgeClass(auction.status).includes("closed")
                        ? "#f3f4f6"
                        : "#fef3c7",
                    color: getStatusBadgeClass(auction.status).includes("active")
                      ? "#065f46"
                      : getStatusBadgeClass(auction.status).includes("closed")
                        ? "#374151"
                        : "#92400e",
                    fontSize: "11px",
                    fontWeight: 600,
                    borderRadius: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    {auction.status.toUpperCase()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedAuction(
                        expandedAuction === auction.auctionId ? null : auction.auctionId
                      );
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#667eea",
                      fontSize: "20px",
                      cursor: "pointer",
                      padding: "4px 8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {expandedAuction === auction.auctionId ? "−" : "+"}
                  </button>
                </div>
              </div>

              {/* Quick info summary */}
              <div style={{
                padding: "12px 16px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "12px",
                background: "#f8fafc",
                fontSize: "12px"
              }}>
                <div>
                  <p style={{ margin: 0, color: "#718096", fontWeight: 600, fontSize: "10px" }}>STARTS</p>
                  <p style={{ margin: "4px 0 0 0", color: "#2d3748", fontWeight: 600 }}>
                    {new Date(auction.startTime).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0, color: "#718096", fontWeight: 600, fontSize: "10px" }}>ENDS</p>
                  <p style={{ margin: "4px 0 0 0", color: "#2d3748", fontWeight: 600 }}>
                    {new Date(auction.endTime).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0, color: "#718096", fontWeight: 600, fontSize: "10px" }}>CURRENT BID</p>
                  <p style={{ margin: "4px 0 0 0", color: "#667eea", fontWeight: 700, fontSize: "13px" }}>
                    {formatPrice(auction.highestCurrentPrice || auction.currentBid || 0)}
                  </p>
                </div>
                {auction.totalBids !== undefined && (
                  <div>
                    <p style={{ margin: 0, color: "#718096", fontWeight: 600, fontSize: "10px" }}>TOTAL BIDS</p>
                    <p style={{ margin: "4px 0 0 0", color: "#2d3748", fontWeight: 700, fontSize: "13px" }}>
                      {auction.totalBids}
                    </p>
                  </div>
                )}
              </div>

              {/* Expanded details */}
              {expandedAuction === auction.auctionId && (
                <div style={{
                  padding: "16px",
                  background: "white"
                }}>
                  {/* Details Grid */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                    marginBottom: "20px"
                  }}>
                    <div style={{
                      padding: "12px",
                      background: "#f8fafc",
                      borderRadius: "6px",
                      border: "1px solid #e2e8f0"
                    }}>
                      <p style={{ margin: 0, fontSize: "11px", fontWeight: 600, color: "#718096", textTransform: "uppercase" }}>Bid Step Amount</p>
                      <p style={{ margin: "6px 0 0 0", fontSize: "15px", fontWeight: 700, color: "#667eea" }}>
                        {formatPrice(auction.bidStepAmount || 0)}
                      </p>
                    </div>

                    <div style={{
                      padding: "12px",
                      background: "#f8fafc",
                      borderRadius: "6px",
                      border: "1px solid #e2e8f0"
                    }}>
                      <p style={{ margin: 0, fontSize: "11px", fontWeight: 600, color: "#718096", textTransform: "uppercase" }}>Created</p>
                      <p style={{ margin: "6px 0 0 0", fontSize: "13px", fontWeight: 600, color: "#2d3748" }}>
                        {formatDate(auction.createdAt || new Date().toISOString())}
                      </p>
                    </div>

                    {auction.winnerId && (
                      <div style={{
                        padding: "12px",
                        background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
                        borderRadius: "6px",
                        border: "1px solid #6ee7b7",
                        gridColumn: "1 / -1"
                      }}>
                        <p style={{ margin: 0, fontSize: "11px", fontWeight: 600, color: "#065f46", textTransform: "uppercase" }}>Winner</p>
                        <p style={{ margin: "6px 0 0 0", fontSize: "15px", fontWeight: 700, color: "#047857" }}>
                          User ID: #{auction.winnerId}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    paddingTop: "16px",
                    borderTop: "1px solid #e2e8f0"
                  }}>
                    <Button
                      onClick={() => handleViewBiddingHistory(auction.auctionId)}
                      disabled={loading}
                      style={{
                        fontSize: "12px",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontWeight: 600,
                        transition: "all 0.2s"
                      }}
                    >
                      <TrendingUp size={14} />
                      View Bidding History
                    </Button>

                    {auction.status === "created" && (
                      <Button
                        onClick={() => handleStartAuction(auction.auctionId)}
                        disabled={loading}
                        style={{
                          fontSize: "12px",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          background: "#10b981",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: 600,
                          transition: "all 0.2s"
                        }}
                      >
                        {loading ? "Starting..." : "Start Auction"}
                      </Button>
                    )}

                    {auction.status === "open" && (
                      <Button
                        onClick={() => handleCloseAuction(auction.auctionId)}
                        disabled={loading}
                        style={{
                          fontSize: "12px",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          background: "#f59e0b",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: 600,
                          transition: "all 0.2s"
                        }}
                      >
                        {loading ? "Closing..." : "Close Auction"}
                      </Button>
                    )}

                    {(auction.status === "created" || auction.status === "closed") && (
                      <Button
                        onClick={() => handleDeleteAuction(auction.auctionId)}
                        disabled={loading}
                        style={{
                          fontSize: "12px",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          background: "#dc2626",
                          color: "white",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: 600,
                          transition: "all 0.2s"
                        }}
                      >
                        {loading ? "Deleting..." : "Delete"}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bidding History Modal */}
      <Modal
        isOpen={isBiddingHistoryOpen}
        onClose={() => {
          setIsBiddingHistoryOpen(false);
          setSelectedAuctionForBids(null);
        }}
        title=""
        size="lg"
      >
        {selectedAuctionForBids && (
          <BiddingHistory
            auctionId={selectedAuctionForBids}
            onClose={() => {
              setIsBiddingHistoryOpen(false);
              setSelectedAuctionForBids(null);
            }}
          />
        )}
      </Modal>
      {/* Footer Close Button */}
      {onClose && (
        <div className="action-buttons-section" style={{ display: "flex", justifyContent: "center", paddingTop: "24px", borderTop: "1px solid #e2e8f0", marginTop: "24px" }}>
          <Button
            type="button"
            variant="outline"
            className="cancel-button"
            onClick={onClose}
            style={{ width: "auto", minWidth: "140px" }}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuctionManagement;
