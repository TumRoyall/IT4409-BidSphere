import React, { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import type { AuctionResponse } from "@/api/modules/auction.api";

interface AuctionApprovalModalProps {
  auction: AuctionResponse | null;
  loading?: boolean;
  onApprove: (auctionId: number, data: any) => Promise<void>;
  onReject: (auctionId: number, reason: string) => Promise<void>;
  onCancel: () => void;
}

const AuctionApprovalModal: React.FC<AuctionApprovalModalProps> = ({ auction, loading: _loading, onApprove, onReject, onCancel }) => {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (auction) {
      // Pre-fill times from auction if available (convert LocalDateTime to input value if needed)
      if (auction.start_time) setStartTime(String(auction.start_time));
      if (auction.end_time) setEndTime(String(auction.end_time));
      setRejectionReason("");
      setAction(null);
      setError(null);
    }
  }, [auction]);

  if (!auction) return null;

  const handleApprove = async () => {
    if (!auction.auctionId && !auction.id) return;
    const id = Number(auction.auctionId || auction.id);
    try {
      setIsSubmitting(true);
      setError(null);
      const payload: any = {
        status: "open",
      };
      if (startTime) payload.startTime = startTime;
      if (endTime) payload.endTime = endTime;
      await onApprove(id, payload);
      onCancel();
    } catch (err: any) {
      setError(err?.message || "Failed to approve auction");
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
      if (!rejectionReason.trim()) throw new Error("Please provide a rejection reason");
      await onReject(id, rejectionReason.trim());
      onCancel();
    } catch (err: any) {
      setError(err?.message || "Failed to reject auction");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: "white", borderRadius: 12, padding: 24, maxWidth: 640, maxHeight: "90vh", overflowY: "auto" }}>
      <h3 style={{ marginTop: 0 }}>{(auction as any).productName || auction.product?.name || "Auction Review"}</h3>
      <p style={{ color: "#666" }}>{auction.product?.description || ""}</p>

      <div style={{ marginTop: 16 }}>
        <label style={{ display: "block", marginBottom: 6 }}>Start Time</label>
        <Input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </div>

      <div style={{ marginTop: 12 }}>
        <label style={{ display: "block", marginBottom: 6 }}>End Time</label>
        <Input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </div>

      {action === "reject" && (
        <div style={{ marginTop: 12 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Rejection Reason</label>
          <textarea value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} style={{ width: "100%", minHeight: 100 }} />
        </div>
      )}

      {error && (
        <div style={{ marginTop: 12, color: "#c33" }}>{error}</div>
      )}

      <div style={{ display: "flex", gap: 12, marginTop: 18, justifyContent: "flex-end" }}>
        {action === null ? (
          <>
            <Button variant="outline" onClick={onCancel}>Close</Button>
            <Button variant="destructive" onClick={() => setAction("reject")}>Reject</Button>
            <Button onClick={() => setAction("approve")}>Approve</Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => setAction(null)}>Back</Button>
            <Button onClick={action === "approve" ? handleApprove : handleReject} disabled={isSubmitting}>
              {isSubmitting ? (action === "approve" ? "Approving..." : "Rejecting...") : (action === "approve" ? "Confirm Approval" : "Confirm Rejection")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuctionApprovalModal;
