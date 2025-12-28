import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, CheckCheck } from "lucide-react";
import { useNotificationContext } from "@/contexts/NotificationContext";

export default function NotificationPage() {
  const navigate = useNavigate();
  const { category } = useParams<{ category?: string }>();
  const { notifications, markAsRead, markAllAsRead } = useNotificationContext();
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // Handle notification click - navigate based on actionUrl or type/category
  const handleNotificationClick = (n: any) => {
    markAsRead(n.notiId);

    // Prefer actionUrl from notification if available
    if (n.actionUrl) {
      navigate(n.actionUrl);
      return;
    }

    // Fallback to type-based routing
    switch (n.type) {
      case "SYSTEM":
        if (n.category === "AUCTION_PENDING_APPROVAL") {
          navigate("/superadmin/auction/approval");
        }
        break;
      case "BID":
        navigate("/user/bid/history");
        break;
      case "PAYMENT":
        navigate("/user/account/payment");
        break;
      default:
        break;
    }
  };

  // Map detailed category to main category
  const getCategoryGroup = (notificationCategory: string): string => {
    if (!notificationCategory) return "";

    const bidCategories = ["BID_PLACED", "OUTBID", "AUCTION_ENDING_SOON", "LEADING_BID", "AUCTION_WON", "AUCTION_LOST"];
    const paymentCategories = ["PAYMENT_DUE", "PAYMENT_SUCCESS", "PAYMENT_FAILED", "SHIPMENT_CONFIRMED", "PAYMENT_RECEIVED"];
    const systemCategories = ["AUCTION_APPROVED", "AUCTION_REJECTED", "AUCTION_STARTED", "AUCTION_ENDED", "PRODUCT_APPROVED", "PRODUCT_REJECTED", "AUCTION_PENDING_APPROVAL", "HIGHEST_BID_CHANGED", "TRANSACTION_COMPLETED", "TRANSACTION_CANCELLED"];

    const upper = notificationCategory.toUpperCase();
    if (bidCategories.includes(upper)) return "bid";
    if (paymentCategories.includes(upper)) return "payment";
    if (systemCategories.includes(upper)) return "system";
    return "system"; // Default
  };

  // Filter notifications by category
  const filtered = category
    ? notifications.filter((n) => getCategoryGroup(n.category) === category)
    : notifications;

  const sorted = [...filtered].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortBy === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Category labels
  const categoryLabels: Record<string, string> = {
    system: "🔔 Thông báo hệ thống",
    bid: "🔨 Thông báo đấu giá",
    payment: "💳 Thông báo thanh toán",
  };

  const pageTitle = category ? categoryLabels[category] || "🔔 Thông báo" : "🔔 Tất cả thông báo";

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 20px" }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            fontSize: 20,
          }}
        >
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ margin: 0 }}>{pageTitle}</h1>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          padding: "12px",
          background: "#f3f4f6",
          borderRadius: 8,
        }}
      >
        <div style={{ fontSize: 14, color: "#666" }}>
          Tổng cộng: <strong>{sorted.length}</strong> thông báo
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
            style={{
              padding: "6px 12px",
              border: "1px solid #d1d5db",
              borderRadius: 4,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
          {sorted.some((n) => !n.isRead) && (
            <button
              onClick={markAllAsRead}
              style={{
                padding: "6px 12px",
                background: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: 4,
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <CheckCheck size={14} /> Đánh dấu đã đọc hết
            </button>
          )}
        </div>
      </div>

      {/* List */}
      {sorted.length === 0 ? (
        <div
          style={{
            padding: 40,
            textAlign: "center",
            color: "#999",
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
          Chưa có thông báo nào
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sorted.map((n) => (
            <div
              key={n.notiId}
              onClick={() => handleNotificationClick(n)}
              style={{
                padding: 16,
                background: n.isRead ? "white" : "#eff6ff",
                border: `1px solid ${n.isRead ? "#e5e7eb" : "#bfdbfe"}`,
                borderRadius: 8,
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
              onMouseEnter={(e) => {
                if (!n.isRead) {
                  (e.currentTarget as HTMLElement).style.background = "#dbeafe";
                }
              }}
              onMouseLeave={(e) => {
                if (!n.isRead) {
                  (e.currentTarget as HTMLElement).style.background = "#eff6ff";
                }
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 6,
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, flex: 1 }}>
                    {n.title}
                  </h3>
                  {!n.isRead && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 8,
                        height: 8,
                        background: "#3b82f6",
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
                <p style={{ margin: 0, fontSize: 14, color: "#666", marginBottom: 8 }}>
                  {n.message}
                </p>
                {n.actionLabel && (
                  <div style={{ marginBottom: 6 }}>
                    <span style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      background: "#dbeafe",
                      color: "#1e40af",
                      borderRadius: 4,
                      fontSize: 12,
                      fontWeight: 500,
                    }}>
                      {n.actionLabel}
                    </span>
                  </div>
                )}
                <small style={{ color: "#999", fontSize: 12 }}>
                  {new Date(n.createdAt).toLocaleString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </small>
              </div>
              {n.isRead && (
                <div style={{ marginLeft: 12, color: "#999", flexShrink: 0 }}>
                  <Check size={18} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
