import React, { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import type { AuctionResponse } from "@/api/modules/auction.api";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";

interface AuctionApprovalModalProps {
  auction: AuctionResponse | null;
  loading?: boolean;
  onApprove: (auctionId: number) => Promise<void>;
  onReject: (auctionId: number) => Promise<void>;
  onCancel: () => void;
}

const AuctionApprovalModal: React.FC<AuctionApprovalModalProps> = ({ auction, loading: _loading, onApprove, onReject, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (auction) {
      setAction(null);
      setError(null);
    }
  }, [auction]);

  if (!auction) return null;

  const formatDateTime = (dateStr: string): string => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString("vi-VN");
    } catch {
      return dateStr;
    }
  };

  const handleApprove = async () => {
    if (!auction.auctionId && !auction.id) return;
    const id = Number(auction.auctionId || auction.id);
    try {
      setIsSubmitting(true);
      setError(null);
      await onApprove(id);
      onCancel();
    } catch (err: any) {
      setError(err?.message || "Failed to approve auction");
      console.error("Approval error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!auction.auctionId && !auction.id) return;
    const id = Number(auction.auctionId || auction.id);
    try {
      setIsSubmitting(true);
      setError(null);
      await onReject(id);
      onCancel();
    } catch (err: any) {
      setError(err?.message || "Failed to reject auction");
      console.error("Rejection error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: "white", borderRadius: 12, padding: 28, maxWidth: 640, maxHeight: "90vh", overflowY: "auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: "2px solid #e2e8f0" }}>
        <h3 style={{ margin: "0 0 8px 0", fontSize: 18, fontWeight: 700 }}>
          Auction Review
        </h3>
        <p style={{ margin: 0, fontSize: 13, color: "#666" }}>
          Reviewing: <strong>{(auction as any).productName || auction.product?.name || "Auction"}</strong>
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div style={{ 
          marginBottom: 16, 
          padding: 16, 
          background: "#fee2e2", 
          border: "1px solid #fca5a5", 
          borderRadius: 8,
          display: "flex",
          gap: 12,
          alignItems: "flex-start"
        }}>
          <AlertCircle size={20} style={{ color: "#dc2626", flexShrink: 0 }} />
          <div>
            <p style={{ margin: 0, fontSize: 13, color: "#c33", fontWeight: 500 }}>
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Auction Info */}
      <div style={{ background: "#f7fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 16, marginBottom: 20 }}>
        <h4 style={{ fontSize: 11, fontWeight: 700, color: "#718096", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 12px 0" }}>
          Auction Details
        </h4>
        <div style={{ display: "grid", gap: 12, fontSize: 13 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#666", fontWeight: 500 }}>Product:</span>
            <span style={{ color: "#1a1a1a", fontWeight: 600 }}>{(auction as any).productName || auction.product?.name || "—"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#666", fontWeight: 500 }}>Status:</span>
            <span style={{ color: "#667eea", fontWeight: 600 }}>{(auction.status || "").toUpperCase()}</span>
          </div>
          {auction.startTime && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#666", fontWeight: 500 }}>Start Time:</span>
              <span style={{ color: "#1a1a1a", fontWeight: 600 }}>{formatDateTime(auction.startTime)}</span>
            </div>
          )}
          {auction.endTime && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#666", fontWeight: 500 }}>End Time:</span>
              <span style={{ color: "#1a1a1a", fontWeight: 600 }}>{formatDateTime(auction.endTime)}</span>
            </div>
          )}
          {auction.bidStepAmount && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#666", fontWeight: 500 }}>Min Bid Increment:</span>
              <span style={{ color: "#667eea", fontWeight: 600 }}>₫{Number(auction.bidStepAmount).toLocaleString("vi-VN")}</span>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      {auction.product && (
        <div style={{ background: "#fef3c7", border: "1px solid #fcd34d", borderRadius: 8, padding: 12, marginBottom: 20 }}>
          <p style={{ margin: "0 0 8px 0", fontSize: 12, color: "#92400e", fontWeight: 600 }}>
            Product Description
          </p>
          <p style={{ margin: 0, fontSize: 12, color: "#78350f", lineHeight: 1.4 }}>
            {auction.product.description || "No description"}
          </p>
        </div>
      )}

      {/* Confirmation Message */}
      {action === null && (
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: 12, marginBottom: 20 }}>
          <p style={{ margin: 0, fontSize: 13, color: "#666", lineHeight: 1.5 }}>
            👉 Click <strong>Approve</strong> to open this auction, or <strong>Reject</strong> to cancel it.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 12, marginTop: 24, justifyContent: "flex-end", paddingTop: 16, borderTop: "1px solid #e2e8f0" }}>
        {action === null ? (
          <>
            <Button 
              variant="outline" 
              onClick={onCancel}
              disabled={isSubmitting}
              style={{ minWidth: 120, borderRadius: 6 }}
            >
              Close
            </Button>
            <Button 
              onClick={() => setAction("reject")}
              disabled={isSubmitting}
              style={{ minWidth: 120, borderRadius: 6, background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" }}
            >
              <XCircle size={16} style={{ marginRight: 6 }} />
              Reject
            </Button>
            <Button 
              onClick={() => setAction("approve")}
              disabled={isSubmitting}
              style={{ minWidth: 120, borderRadius: 6, background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}
            >
              <CheckCircle2 size={16} style={{ marginRight: 6 }} />
              Approve
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              onClick={() => setAction(null)}
              disabled={isSubmitting}
              style={{ minWidth: 120, borderRadius: 6 }}
            >
              Back
            </Button>
            <Button 
              onClick={action === "approve" ? handleApprove : handleReject} 
              disabled={isSubmitting}
              style={{ minWidth: 140, borderRadius: 6, background: action === "approve" ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" }}
            >
              {isSubmitting 
                ? (action === "approve" ? "Approving..." : "Rejecting...") 
                : (action === "approve" ? "Confirm Approval" : "Confirm Rejection")
              }
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuctionApprovalModal;
