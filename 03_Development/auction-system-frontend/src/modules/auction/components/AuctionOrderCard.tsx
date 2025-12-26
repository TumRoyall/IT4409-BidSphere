import { useNavigate } from "react-router-dom";
import { Clock, Package, CheckCircle2, XCircle, ChevronRight } from "lucide-react";

type Props = {
  order: any;
};

const CATEGORY_MAP: Record<string, string> = {
  electronics: "Điện tử",
  fashion: "Thời trang",
  vehicle: "Xe cộ",
  jewelry: "Trang sức",
  home: "Nhà cửa",
  garden: "Nhà & Vườn",
  grocery: "Tiêu dùng",
  other: "Khác",
};

const STATUS_CONFIG: Record<string, { label: string; icon: any; color: string; bgColor: string }> = {
  PENDING: { label: "Chờ xác nhận", icon: Clock, color: "#f59e0b", bgColor: "#fffbeb" },
  PAID: { label: "Đã thanh toán", icon: CheckCircle2, color: "#3b82f6", bgColor: "#eff6ff" },
  SHIPPED: { label: "Đang giao hàng", icon: Package, color: "#8b5cf6", bgColor: "#f5f3ff" },
  DONE: { label: "Hoàn tất", icon: CheckCircle2, color: "#10b981", bgColor: "#ecfdf5" },
  CANCELLED: { label: "Đã hủy", icon: XCircle, color: "#ef4444", bgColor: "#fef2f2" },
};

export default function AuctionOrderCard({ order }: Props) {
  const navigate = useNavigate();

  const statusRaw = String(order?.transactionStatus ?? "PENDING").toUpperCase();
  const statusConfig = STATUS_CONFIG[statusRaw] || STATUS_CONFIG.PENDING;
  const StatusIcon = statusConfig.icon;

  const categoryKey = String(order?.productCategory ?? "other").toLowerCase();
  const categoryLabel = CATEGORY_MAP[categoryKey] ?? "Khác";

  const estimatePrice = Number(order?.productPrice ?? 0);
  const finalAmount = Number(order?.amount ?? 0);

  const handleClick = () => {
    navigate(`/user/bid/won-products/order/${order.transactionId}`);
  };

  return (
    <div
      style={styles.card}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";
      }}
    >
      {/* Status Badge */}
      <div style={{
        ...styles.statusBadge,
        backgroundColor: statusConfig.bgColor,
        color: statusConfig.color,
        border: `1px solid ${statusConfig.color}30`
      }}>
        <StatusIcon size={14} strokeWidth={2.5} />
        <span>{statusConfig.label}</span>
      </div>

      {/* Main Content */}
      <div style={styles.body}>
        {/* Image Section */}
        <div style={styles.imageWrapper}>
          <img
            src={order.productImage}
            alt={order.productName}
            style={styles.image}
            loading="lazy"
          />
        </div>

        {/* Content Section */}
        <div style={styles.content}>
          {/* Product Info */}
          <div style={styles.productInfo}>
            <div style={styles.titleRow}>
              <h3 style={styles.productName}>{order.productName}</h3>
              <ChevronRight size={20} color="#94a3b8" style={{ flexShrink: 0 }} />
            </div>
            <p style={styles.productDesc}>{order.productDescription}</p>
            <div style={styles.metaRow}>
              <span style={styles.category}>{categoryLabel}</span>
              <div style={styles.timestamp}>
                <Clock size={13} color="#94a3b8" />
                <span>
                  {new Date(order.updatedAt).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div style={styles.pricingSection}>
            <div style={styles.priceRow}>
              <div style={styles.priceItem}>
                <span style={styles.priceLabel}>Giá khởi điểm</span>
                <span style={styles.estimatePrice}>{estimatePrice.toLocaleString()}₫</span>
              </div>

              <div style={styles.dividerVertical} />

              <div style={styles.priceItem}>
                <span style={styles.finalLabel}>Giá thắng đấu</span>
                <span style={styles.finalPrice}>{finalAmount.toLocaleString()}₫</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid #f1f5f9",
    cursor: "pointer",
    position: "relative",
  },

  statusBadge: {
    position: "absolute",
    top: "20px",
    right: "20px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    borderRadius: "100px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    zIndex: 1,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },

  body: {
    padding: "24px",
    display: "grid",
    gridTemplateColumns: "160px 1fr",
    gap: "24px",
  },

  imageWrapper: {
    position: "relative",
    width: "160px",
    height: "160px",
    flexShrink: 0,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
  },

  savingsBadge: {
    position: "absolute",
    bottom: "-8px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    borderRadius: "100px",
    padding: "6px 14px",
    boxShadow: "0 4px 16px rgba(239, 68, 68, 0.4)",
    border: "2px solid #ffffff",
  },

  savingsText: {
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minWidth: 0,
    gap: "20px",
  },

  productInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  titleRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "12px",
  },

  productName: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a",
    lineHeight: "1.4",
    margin: 0,
    flex: 1,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  productDesc: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.6",
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  metaRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginTop: "4px",
  },

  category: {
    display: "inline-block",
    fontSize: "12px",
    fontWeight: "600",
    color: "#475569",
    backgroundColor: "#f1f5f9",
    padding: "6px 14px",
    borderRadius: "100px",
  },

  timestamp: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#94a3b8",
    fontWeight: "500",
  },

  pricingSection: {
    backgroundColor: "#f8fafc",
    borderRadius: "16px",
    padding: "20px",
    border: "1px solid #f1f5f9",
  },

  priceRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    gap: "20px",
    alignItems: "center",
  },

  priceItem: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  priceLabel: {
    fontSize: "12px",
    color: "#94a3b8",
    fontWeight: "500",
  },

  estimatePrice: {
    fontSize: "16px",
    color: "#94a3b8",
    fontWeight: "700",
    textDecoration: "line-through",
  },

  dividerVertical: {
    width: "1px",
    height: "40px",
    backgroundColor: "#e2e8f0",
  },

  finalLabel: {
    fontSize: "13px",
    color: "#0f172a",
    fontWeight: "600",
  },

  finalPrice: {
    fontSize: "26px",
    fontWeight: "800",
    background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.5px",
  },

  savingsInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#059669",
    fontWeight: "600",
    backgroundColor: "#d1fae5",
    padding: "8px 16px",
    borderRadius: "100px",
  },

  savingsIcon: {
    fontSize: "14px",
  },
};