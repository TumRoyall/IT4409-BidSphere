import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, CheckCheck } from "lucide-react";
import { useNotificationContext } from "@/contexts/NotificationContext";
import "@/modules/user/styles/NotificationPage.css";

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

    // Bidder notifications: bid-related actions
    const bidCategories = [
      "BID_PLACED",
      "OUTBID",
      "AUCTION_ENDING_SOON",
      "LEADING_BID",
      "AUCTION_WON",
      "AUCTION_LOST",
      // Seller auction notifications (moved from system)
      "AUCTION_STARTED",      // Seller: auction has started
      "AUCTION_ENDED",        // Seller: auction has ended
      "HIGHEST_BID_CHANGED"   // Seller: new highest bid
    ];

    // Payment-related notifications for both buyer and seller
    const paymentCategories = [
      "PAYMENT_DUE",
      "PAYMENT_SUCCESS",
      "PAYMENT_FAILED",
      "SHIPMENT_CONFIRMED",
      "PAYMENT_RECEIVED",
      "PAYMENT_CONFIRMED",
      "PAYMENT_PENDING",
      "TRANSACTION_COMPLETED",
      "TRANSACTION_CANCELLED"
    ];

    // System/Admin notifications only
    const systemCategories = [
      "AUCTION_APPROVED",           // Seller: auction approved by admin
      "AUCTION_REJECTED",           // Seller: auction rejected by admin
      "PRODUCT_APPROVED",           // Seller: product approved
      "PRODUCT_REJECTED",           // Seller: product rejected
      "AUCTION_PENDING_APPROVAL",   // Admin: needs to approve auction
      "ANNOUNCEMENT"                // System announcements
    ];

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
    <div className="notification-page">
      {/* Header */}
      <div className="notification-header">
        <button
          onClick={() => navigate(-1)}
          className="back-button"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="notification-title">{pageTitle}</h1>
      </div>

      {/* Controls */}
      <div className="notification-controls">
        <div className="control-info">
          Tổng cộng: <strong>{sorted.length}</strong> thông báo
        </div>
        <div className="control-actions">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
            className="sort-select"
          >
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
          </select>
          {sorted.some((n) => !n.isRead) && (
            <button
              onClick={markAllAsRead}
              className="mark-all-btn"
            >
              <CheckCheck size={14} /> Đánh dấu đã đọc hết
            </button>
          )}
        </div>
      </div>

      {/* List */}
      {sorted.length === 0 ? (
        <div className="notification-empty">
          <div className="empty-icon">📭</div>
          Chưa có thông báo nào
        </div>
      ) : (
        <div className="notification-list">
          {sorted.map((n) => (
            <div
              key={n.notiId}
              onClick={() => handleNotificationClick(n)}
              className={`notification-item ${n.isRead ? 'read' : 'unread'}`}
            >
              <div className="notification-content">
                <div className="notification-header-row">
                  <h3 className="notification-title-text">
                    {n.title}
                  </h3>
                  {!n.isRead && (
                    <span className="unread-badge" />
                  )}
                </div>
                <p className="notification-message">
                  {n.message}
                </p>
                {n.actionLabel && (
                  <div className="notification-action">
                    <span className="action-badge">
                      {n.actionLabel}
                    </span>
                  </div>
                )}
                <small className="notification-time">
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
                <div className="read-check">
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
