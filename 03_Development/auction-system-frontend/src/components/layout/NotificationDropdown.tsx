import { useState } from "react";
import { Bell } from "lucide-react";
import styles from "@/components/styles/layout.module.css";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { useNavigate } from "react-router-dom";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationContext();
  const [visibleCount, setVisibleCount] = useState(5);
  const navigate = useNavigate();

  const handleRead = (id: number, type?: string, category?: string) => {
    markAsRead(id);
    setOpen(false);
    // Route based on notification type and category
    switch (type) {
      case "SYSTEM":
        // Check category to differentiate between admin approval requests and seller notifications
        if (category === "AUCTION_PENDING_APPROVAL") {
          navigate("/admin/products/approval");
        }
        // AUCTION_APPROVED, AUCTION_REJECTED etc go to notification center (no navigation)
        break;
      case "BID":
        navigate("/user/bid/history");
        break;
      case "PAYMENT":
        navigate("/user/account/payment");
        break;
    }
  };

  const handleViewAll = () => {
    navigate("/user/notification/system");
    setOpen(false);
  };

  return (
    <div className={styles.notiWrapper}>
      <button onClick={() => setOpen(!open)} className={styles.notiButton}>
        <Bell size={20} />
        {unreadCount > 0 && <span className={styles.notiBadge}>{unreadCount}</span>}
      </button>

      {open && (
        <div className={styles.notiDropdown}>
          <div className="flex justify-between items-center mb-2 px-2">
            <h4 className="font-bold">Thông báo</h4>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:underline"
              >
                Đánh dấu đã đọc hết
              </button>
            )}
          </div>

          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">Chưa có thông báo mới</div>
          ) : (
            notifications.slice(0, visibleCount).map((n) => (
              <div
                key={n.notiId}
                className={`${styles.notiItem} ${n.isRead ? styles.read : styles.unread
                  }`}
                onClick={() => handleRead(n.notiId, n.type, n.category)}
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{n.title}</span>
                  <span className="text-xs text-gray-600 truncate">{n.message}</span>
                  <small className="text-[10px] text-gray-400 mt-1">
                    {new Date(n.createdAt).toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </small>
                </div>
              </div>
            ))
          )}

          {/* 👇 Nút xem thêm nếu có nhiều */}
          {notifications.length > visibleCount && (
            <button
              className={styles.notiMoreBtn}
              onClick={() => setVisibleCount((prev) => prev + 5)}
            >
              Xem thêm...
            </button>
          )}

          {/* 👇 Nút xem tất cả thông báo */}
          <button
            className={styles.notiMoreBtn}
            style={{ borderTop: "1px solid #e5e7eb" }}
            onClick={handleViewAll}
          >
            Xem tất cả thông báo →
          </button>
          </div>
          )}
          </div>
          );
          }
