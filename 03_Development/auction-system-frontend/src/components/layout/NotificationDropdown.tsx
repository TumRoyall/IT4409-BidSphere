import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import styles from "./layout.module.css";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // hiển thị 8 cái đầu tiên

  useEffect(() => {
    // ⚡ Mock dữ liệu giả lập (sau này thay bằng API / DB)
    const mock = [
      {
        id: 1,
        message: "🎉 Chúc mừng bạn đã THẮNG phiên đấu giá MacBook Pro M2!",
        is_read: false,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 giờ trước
        link: "/auction/101",
      },
      {
        id: 2,
        message: "⚡ Có người vừa ra giá cao hơn bạn trong phiên iPhone 15 Pro.",
        is_read: false,
        created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        link: "/auction/102",
      },
      {
        id: 3,
        message: "💰 Tài khoản của bạn được cộng thêm 1.000.000đ từ giao dịch thành công.",
        is_read: false,
        created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        link: "/balance",
      },
      {
        id: 4,
        message: "🛍️ Admin đã DUYỆT sản phẩm bạn đăng: 'Tai nghe Sony WH-1000XM5'.",
        is_read: false,
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        link: "/product/210",
      },
      {
        id: 5,
        message: "⭐ Người mua 'ngocle27' đã đánh giá 5⭐ cho giao dịch gần đây.",
        is_read: false,
        created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        link: "/feedback/15",
      },
      {
        id: 6,
        message: "📦 Đơn hàng #AUC-4598 đã được người bán xác nhận gửi đi.",
        is_read: true,
        created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        link: "/payment/history",
      },
      {
        id: 7,
        message: "🧾 Bạn vừa thực hiện nạp tiền 500.000đ thành công.",
        is_read: true,
        created_at: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
        link: "/balance",
      },
      {
        id: 8,
        message: "📣 Hệ thống sẽ bảo trì từ 02:00 đến 03:00 sáng mai.",
        is_read: true,
        created_at: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
        link: "/help",
      },
      {
        id: 9,
        message: "🏆 Bạn nằm trong TOP 10 người thắng đấu giá nhiều nhất tuần này!",
        is_read: true,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        link: "/profile",
      },
      {
        id: 10,
        message: "📱 Có phiên đấu giá mới cho sản phẩm 'Samsung Galaxy Z Fold6'.",
        is_read: true,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        link: "/auction/230",
      },
    ];

    setNotifications(mock);
  }, []);


  const unread = notifications.filter((n) => !n.is_read).length;

  const handleRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  return (
    <div className={styles.notiWrapper}>
      <button onClick={() => setOpen(!open)} className={styles.notiButton}>
        <Bell size={20} />
        {unread > 0 && <span className={styles.notiBadge}>{unread}</span>}
      </button>

      {open && (
        <div className={styles.notiDropdown}>
          <h4>Thông báo</h4>

          {notifications.slice(0, visibleCount).map((n) => (
            <div
              key={n.id}
              className={`${styles.notiItem} ${
                n.is_read ? styles.read : styles.unread
              }`}
              onClick={() => {
                handleRead(n.id);
                if (n.link) window.location.href = n.link;
              }}
            >
              <p>{n.message}</p>
              <small>
                {new Date(n.created_at).toLocaleString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  day: "2-digit",
                  month: "2-digit",
                })}
              </small>
            </div>
          ))}

          {/* 👇 Nút xem thêm nếu có nhiều */}
          {notifications.length > visibleCount && (
            <button
              className={styles.notiMoreBtn}
              onClick={() => setVisibleCount((prev) => prev + 5)}
            >
              Xem thêm...
            </button>
          )}
        </div>
      )}
    </div>
  );
}
