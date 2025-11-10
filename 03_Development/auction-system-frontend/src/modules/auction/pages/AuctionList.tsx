import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auctionApi from "@/api/modules/auction.api";
import type { AuctionResponse } from "@/api/modules/auction.api";
import "@/styles/seller.css";

export default function AuctionList() {
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState<AuctionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Try to get active auctions first
        try {
          const response = await auctionApi.getActiveAuctions();
          console.log("Active auctions:", response.data);
          setAuctions(response.data || []);
        } catch (err) {
          // Fallback to getting all auctions if active endpoint fails
          console.log("Failed to get active auctions, trying all auctions");
          const response = await auctionApi.getAllAuctions();
          console.log("All auctions:", response.data);
          // Filter to only show OPEN auctions
          const activeAuctions = (response.data || []).filter(
            (a) => a.status === "OPEN" || a.status === "open"
          );
          setAuctions(activeAuctions);
        }
      } catch (err: any) {
        console.error("Failed to load auctions:", err);
        setError(err?.response?.data?.message || "Failed to load auctions");
      } finally {
        setIsLoading(false);
      }
    };

    loadAuctions();
  }, []);

  if (isLoading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <div style={{ display: "inline-block", marginBottom: "16px" }}>
          <div
            style={{
              display: "inline-block",
              width: "32px",
              height: "32px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #667eea",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
        <p style={{ color: "#666", fontSize: "16px" }}>Loading auctions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p style={{ color: "#e74c3c", fontSize: "16px" }}>{error}</p>
      </div>
    );
  }

  if (auctions.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p style={{ color: "#999", fontSize: "16px" }}>No active auctions found</p>
      </div>
    );
  }

  return (
    <section style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: 600, marginBottom: "30px", textAlign: "center" }}>
        Active Auctions
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {auctions.map((auction) => (
          <div
            key={auction.auction_id || auction.id}
            style={{
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "all 0.3s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
            onClick={() => navigate(`/auctions/${auction.auction_id || auction.id}`)}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 16px rgba(0,0,0,0.12)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 1px 3px rgba(0,0,0,0.08)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0)";
            }}
          >
            {/* Product Image */}
            {auction.productImageUrl ? (
              <img
                src={auction.productImageUrl}
                alt={auction.productName || "Product"}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  background: "#f0f0f0",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  background: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                }}
              >
                No image
              </div>
            )}

            {/* Content */}
            <div style={{ padding: "16px" }}>
              {/* Product Name */}
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  marginBottom: "8px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {auction.productName || `Product #${auction.product_id}`}
              </h3>

              {/* Status Badge */}
              <div style={{ marginBottom: "12px" }}>
                <span
                  style={{
                    display: "inline-block",
                    background: "#e8f5e9",
                    color: "#2e7d32",
                    padding: "4px 12px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {auction.status || "OPEN"}
                </span>
              </div>

              {/* Prices */}
              <div style={{ marginBottom: "12px" }}>
                <div style={{ marginBottom: "6px" }}>
                  <span style={{ color: "#999", fontSize: "12px" }}>Start Price:</span>
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#667eea",
                    }}
                  >
                    ₫
                    {(auction.startPrice?.toLocaleString() || "0")}
                  </p>
                </div>

                {auction.highestBid && auction.highestBid > 0 && (
                  <div>
                    <span style={{ color: "#999", fontSize: "12px" }}>Highest Bid:</span>
                    <p
                      style={{
                        margin: "4px 0 0 0",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#e74c3c",
                      }}
                    >
                      ₫
                      {(auction.highestBid?.toLocaleString() || "0")}
                    </p>
                  </div>
                )}
              </div>

              {/* Time Info */}
              <div
                style={{
                  fontSize: "12px",
                  color: "#999",
                  borderTop: "1px solid #e2e8f0",
                  paddingTop: "12px",
                  marginTop: "12px",
                }}
              >
                {auction.end_time && (
                  <p style={{ margin: 0 }}>
                    Ends: {new Date(auction.end_time).toLocaleString("vi-VN")}
                  </p>
                )}
              </div>

              {/* View Details Button */}
              <button
                style={{
                  width: "100%",
                  marginTop: "12px",
                  padding: "10px",
                  background: "#667eea",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#5568d3";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#667eea";
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/auctions/${auction.auction_id || auction.id}`);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
