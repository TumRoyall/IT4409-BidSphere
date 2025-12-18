import React, { useEffect, useState } from "react";
import { RefreshCw, Filter } from "lucide-react";
import { Button } from "@/components/common/Button";
import auctionApi from "@/api/modules/auction.api";
import AuctionApprovalModal from "@/modules/admin/components/AuctionApprovalModal";
import type { AuctionResponse } from "@/api/modules/auction.api";
import "@/styles/seller.css";

const AdminAuctionApprovalPage: React.FC = () => {
  const [auctions, setAuctions] = useState<AuctionResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<AuctionResponse | null>(null);
  const [statusFilter, setStatusFilter] = useState<"pending" | "all">("pending");

  useEffect(() => {
    loadAllAuctions();
  }, [statusFilter]);

  const loadAllAuctions = async () => {
    try {
      setLoading(true);
      const res = await auctionApi.getAllAuctions();
      const list = res.data || [];
      filterAuctions(list);
    } catch (err) {
      console.error("Failed to load auctions", err);
      alert("Failed to load auctions");
    } finally {
      setLoading(false);
    }
  };

  const filterAuctions = (list: AuctionResponse[]) => {
    if (statusFilter === "pending") {
      // Filter pending/created auctions
      const pending = list.filter((a: any) => {
        const s = (a.status || "").toString().toLowerCase();
        return s === "created" || s === "pending";
      });
      setAuctions(pending);
    } else {
      // Show all auctions
      setAuctions(list);
    }
  };

  const loadPending = async () => {
    await loadAllAuctions();
  };

  const handleApprove = async (auctionId: number) => {
    try {
      await auctionApi.startAuction(auctionId);
      alert("✅ Auction approved and opened");
      loadPending();
      setSelected(null);
    } catch (err: any) {
      console.error("Approve failed", err);
      alert(err?.response?.data?.message || err?.message || "Failed to approve");
    }
  };

  const handleReject = async (auctionId: number) => {
    try {
      await auctionApi.deleteAuction(auctionId);
      alert("✅ Auction rejected and deleted");
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

      <div style={{ display: "flex", gap: 12, marginBottom: 18, alignItems: "center" }}>
        <Button onClick={loadPending} disabled={loading} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <RefreshCw size={16} /> Refresh
        </Button>

        <div style={{ display: "flex", gap: 8, alignItems: "center", background: "#f7fafc", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e0" }}>
          <Filter size={16} style={{ color: "#718096" }} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "pending" | "all")}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "13px",
              fontWeight: 500,
              color: "#2d3748",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="pending">Pending Only</option>
            <option value="all">All Auctions</option>
          </select>
        </div>

        <div style={{ marginLeft: "auto", color: "#666", fontSize: 13 }}>
          {auctions.length > 0 && (
            <span>
              Showing <strong>{auctions.length}</strong> auction{auctions.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>
      ) : auctions.length === 0 ? (
        <div style={{ padding: 32, background: "#f0fdf4", border: "2px solid #86efac", borderRadius: 8 }}>
          {statusFilter === "pending" ? "No pending auctions" : "No auctions"}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
          {auctions.map((a) => (
            <div key={a.auctionId || (a as any).id} style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
              {a.productImageUrl && (
                <div style={{ width: "100%", height: 160, overflow: "hidden" }}>
                  <img src={a.productImageUrl} alt={a.productName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div style={{ padding: 12 }}>
                {/* Status Badge */}
                <div style={{ marginBottom: 8 }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      background:
                        a.status?.toLowerCase() === "pending" || a.status?.toLowerCase() === "created"
                          ? "#fee2e2"
                          : a.status?.toLowerCase() === "open"
                          ? "#d1fae5"
                          : a.status?.toLowerCase() === "closed"
                          ? "#e5e7eb"
                          : a.status?.toLowerCase() === "cancelled"
                          ? "#fecaca"
                          : "#f3f4f6",
                      color:
                        a.status?.toLowerCase() === "pending" || a.status?.toLowerCase() === "created"
                          ? "#dc2626"
                          : a.status?.toLowerCase() === "open"
                          ? "#059669"
                          : a.status?.toLowerCase() === "closed"
                          ? "#6b7280"
                          : a.status?.toLowerCase() === "cancelled"
                          ? "#991b1b"
                          : "#374151",
                    }}
                  >
                    {(a.status || "unknown").toUpperCase()}
                  </span>
                </div>
                <h3 style={{ margin: "0 0 8px 0" }}>{(a as any).productName || a.product?.name || "Auction"}</h3>
                <p style={{ margin: 0, color: "#666", fontSize: 13 }}>{a.product?.description || ""}</p>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  {(a.status?.toLowerCase() === "pending" || a.status?.toLowerCase() === "created") && (
                    <Button onClick={() => setSelected(a)} style={{ flex: 1 }}>
                      Review & Approve
                    </Button>
                  )}
                  {a.status?.toLowerCase() === "open" && (
                    <Button
                      onClick={() => handleReject(a.auctionId || (a as any).id || 0)}
                      style={{
                        flex: 1,
                        background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                      }}
                    >
                      Cancel Auction
                    </Button>
                  )}
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
