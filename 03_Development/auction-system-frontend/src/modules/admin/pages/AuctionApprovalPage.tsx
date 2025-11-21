import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/common/Button";
import auctionApi from "@/api/modules/auction.api";
import AuctionApprovalModal from "@/modules/admin/components/AuctionApprovalModal";
import type { AuctionResponse } from "@/api/modules/auction.api";
import { useAuth } from "@/hooks/useAuth";
import { USER_ROLES } from "@/utils/constants";
import "@/styles/seller.css";

const AdminAuctionApprovalPage: React.FC = () => {
  const { user } = useAuth();
  
  // Check authorization - allow ADMIN and MODERATOR
  const rawRole = (user as any)?.role || (user as any)?.roles || (user as any)?.roleName || "";
  const role = String(rawRole).toUpperCase();
  
  if (role !== USER_ROLES.ADMIN && role !== USER_ROLES.MODERATOR) {
    return <Navigate to="/" replace />;
  }
  const [auctions, setAuctions] = useState<AuctionResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<AuctionResponse | null>(null);

  useEffect(() => {
    loadPending();
  }, []);

  const loadPending = async () => {
    try {
      setLoading(true);
      const res = await auctionApi.getAllAuctions();
      const list = res.data || [];
      // filter pending/created auctions
      const pending = list.filter((a: any) => {
        const s = (a.status || "").toString().toLowerCase();
        return s === "created" || s === "pending";
      });
      setAuctions(pending);
    } catch (err) {
      console.error("Failed to load auctions", err);
      alert("Failed to load auctions");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (auctionId: number, data: any) => {
    try {
      await auctionApi.approveAuction(auctionId, data);
      alert("✅ Auction approved");
      loadPending();
      setSelected(null);
    } catch (err: any) {
      console.error("Approve failed", err);
      alert(err?.response?.data?.message || err?.message || "Failed to approve");
    }
  };

  const handleReject = async (auctionId: number, reason: string) => {
    try {
      const payload = { status: "cancelled", rejectionReason: reason };
      await auctionApi.approveAuction(auctionId, payload);
      alert("✅ Auction rejected");
      loadPending();
      setSelected(null);
    } catch (err: any) {
      console.error("Reject failed", err);
      alert(err?.response?.data?.message || err?.message || "Failed to reject");
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 20, paddingBottom: 12, borderBottom: "2px solid #e2e8f0" }}>
        <h1 style={{ margin: 0 }}>📋 Auction Approvals</h1>
        <p style={{ margin: 0, color: "#666" }}>Review and approve pending auction sessions</p>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <Button onClick={loadPending} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <RefreshCw size={16} /> Refresh
        </Button>
        <div style={{ marginLeft: "auto", color: "#666" }}>{auctions.length} pending</div>
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>
      ) : auctions.length === 0 ? (
        <div style={{ padding: 32, background: "#f0fdf4", border: "2px solid #86efac", borderRadius: 8 }}>No pending auctions</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
          {auctions.map((a) => (
            <div key={a.auctionId || a.id} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
              {a.productImageUrl && (
                <div style={{ width: "100%", height: 160, overflow: "hidden" }}>
                  <img src={a.productImageUrl} alt={a.productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div style={{ padding: 12 }}>
                <h3 style={{ margin: "0 0 8px 0" }}>{(a as any).productName || a.product?.name || "Auction"}</h3>
                <p style={{ margin: 0, color: "#666", fontSize: 13 }}>{a.product?.description || ""}</p>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <Button onClick={() => setSelected(a)}>Review & Approve</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setSelected(null)}>
          <div onClick={(e) => e.stopPropagation()}>
            <AuctionApprovalModal auction={selected} onApprove={handleApprove} onReject={handleReject} onCancel={() => setSelected(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAuctionApprovalPage;
