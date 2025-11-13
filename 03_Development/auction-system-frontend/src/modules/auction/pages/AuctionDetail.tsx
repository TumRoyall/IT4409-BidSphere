import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import auctionApi from "@/api/modules/auction.api";
import type { AuctionResponse } from "@/api/modules/auction.api";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/seller.css";

export default function AuctionDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [auction, setAuction] = useState<AuctionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAuction = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);
        const auctionId = Number(id);

        if (isNaN(auctionId)) {
          setError("Invalid auction ID");
          return;
        }

        const response = await auctionApi.getAuctionById(auctionId);
        console.log("Auction detail:", response.data);
        setAuction(response.data);
      } catch (err: any) {
        console.error("Failed to load auction:", err);
        setError(
          err?.response?.data?.message || "Failed to load auction details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadAuction();
  }, [id]);

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
        <p style={{ color: "#666", fontSize: "16px" }}>Loading auction...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p style={{ color: "#e74c3c", fontSize: "16px" }}>{error}</p>
        <button
          onClick={() => navigate("/auctions")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back to Auctions
        </button>
      </div>
    );
  }

  if (!auction) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p style={{ color: "#999", fontSize: "16px" }}>Auction not found</p>
        <button
          onClick={() => navigate("/auctions")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#667eea",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back to Auctions
        </button>
      </div>
    );
  }

  const timeRemaining =
    auction.end_time && new Date(auction.end_time) > new Date()
      ? Math.ceil(
          (new Date(auction.end_time).getTime() - new Date().getTime()) /
            1000 /
            60
        )
      : null;

  return (
    <section
      style={{
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/auctions")}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          background: "#f0f0f0",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          color: "#666",
        }}
      >
        ← Back to Auctions
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          marginBottom: "40px",
        }}
      >
        {/* Left: Image */}
        <div>
          {auction.productImageUrl ? (
            <img
              src={auction.productImageUrl}
              alt={auction.productName || "Product"}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
                background: "#f0f0f0",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "400px",
                background: "#f0f0f0",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
                fontSize: "16px",
              }}
            >
              No image available
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div>
          {/* Title */}
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#1a1a1a",
              marginBottom: "16px",
            }}
          >
            {auction.productName || `Product #${auction.product_id}`}
          </h1>

          {/* Status */}
          <div style={{ marginBottom: "24px" }}>
            <span
              style={{
                display: "inline-block",
                background:
                  auction.status === "OPEN" ? "#e8f5e9" : "#fff3e0",
                color: auction.status === "OPEN" ? "#2e7d32" : "#e65100",
                padding: "8px 16px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {auction.status || "OPEN"}
            </span>
          </div>

          {/* Price Section */}
          <div
            style={{
              background: "#f8fafc",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "24px",
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <span style={{ color: "#999", fontSize: "14px" }}>
                Start Price
              </span>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#667eea",
                }}
              >
                ₫{auction.startPrice?.toLocaleString() || "0"}
              </p>
            </div>

            {auction.highestBid && auction.highestBid > 0 && (
              <div>
                <span style={{ color: "#999", fontSize: "14px" }}>
                  Highest Bid
                </span>
                <p
                  style={{
                    margin: "8px 0 0 0",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#e74c3c",
                  }}
                >
                  ₫{auction.highestBid?.toLocaleString() || "0"}
                </p>
              </div>
            )}
          </div>

          {/* Time Info */}
          <div
            style={{
              background: "#f8fafc",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "24px",
            }}
          >
            {auction.start_time && (
              <div style={{ marginBottom: "16px" }}>
                <span style={{ color: "#999", fontSize: "14px" }}>
                  Started
                </span>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "14px",
                    color: "#1a1a1a",
                  }}
                >
                  {new Date(auction.start_time).toLocaleString("vi-VN")}
                </p>
              </div>
            )}

            {auction.end_time && (
              <div>
                <span style={{ color: "#999", fontSize: "14px" }}>
                  Ends
                </span>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "14px",
                    color: "#1a1a1a",
                  }}
                >
                  {new Date(auction.end_time).toLocaleString("vi-VN")}
                </p>
                {timeRemaining && timeRemaining > 0 && (
                  <p
                    style={{
                      margin: "8px 0 0 0",
                      fontSize: "12px",
                      color: "#e74c3c",
                      fontWeight: 600,
                    }}
                  >
                    {timeRemaining} minutes remaining
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {user ? (
            <button
              style={{
                width: "100%",
                padding: "14px",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "#5568d3";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "#667eea";
              }}
            >
              Place a Bid
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              style={{
                width: "100%",
                padding: "14px",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Login to Bid
            </button>
          )}
        </div>
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
