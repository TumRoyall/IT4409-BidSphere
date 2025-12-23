import "@/modules/auction/styles/AuctionOrderCard.css";
import { useNavigate } from "react-router-dom";

type Props = {
  order: any;
  onPay?: (id: number) => void;
  onDone?: (id: number) => void;
  onCancel?: (id: number) => void;
  onViewDetail?: (auctionId: number, transactionId?: number) => void;
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

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  PAID: "Đã thanh toán",
  SHIPPED: "Đang giao hàng",
  DONE: "Hoàn tất",
  CANCELLED: "Đã hủy",
};

export default function AuctionOrderCard({
  order,
  onPay,
  onDone,
  onCancel,
  onViewDetail,
}: Props) {

  const statusRaw = String(order?.transactionStatus ?? "PENDING").toUpperCase();
  const statusClass = statusRaw.toLowerCase();

  const categoryKey = String(order?.productCategory ?? "other").toLowerCase();
  const categoryLabel = CATEGORY_MAP[categoryKey] ?? "Khác";

  const estimatePrice = Number(order?.productPrice ?? 0);
  const finalAmount = Number(order?.amount ?? 0);

  const navigate = useNavigate();


  return (
    <div className="order-card">
      {/* HEADER */}
      <div className="order-header">
        <span className={`status-badge ${statusClass}`}>
          {STATUS_LABEL[statusRaw]?.toUpperCase() ?? statusRaw}
        </span>
      </div>

      {/* BODY */}
      <div className="order-body">
        <img
          src={order.productImage}
          alt={order.productName}
          className="product-image"
          loading="lazy"
        />

        <div className="product-info">
          <h4 className="product-name">{order.productName}</h4>
          <p className="product-desc">{order.productDescription}</p>
          <p className="product-category">
            Danh mục: <b>{categoryLabel}</b>
          </p>
        </div>

        <div className="order-prices">
          <span className="price-label">Giá ước tính</span>
          <span className="price-value muted">
            {estimatePrice.toLocaleString()} đ
          </span>
        </div>
      </div>

      {/* FOOTER */}
      <div className="order-footer">
        {/* Giá chốt – nằm ngay dưới gạch */}
        <div className="footer-top">
          <span className="final-label">Giá chốt</span>
          <span className="final-price">
            {finalAmount.toLocaleString()} đ
          </span>
        </div>

        <div className="footer-bottom">
          <span className="order-time">
            Cập nhật: {new Date(order.updatedAt).toLocaleString()}
          </span>

          <div className="order-actions">
            {statusRaw === "PENDING" && (
              <>
                <button
                  className="btn danger"
                  onClick={() => onCancel?.(order.transactionId)}
                >
                  Hủy đơn
                </button>

                <button
                  className="btn ghost"
                  onClick={() =>
                    navigate(`/user/bid/won-products/order/${order.transactionId}`)
                  }
                >
                  Xem chi tiết
                </button>
              </>
            )}

            {statusRaw === "SHIPPED" && (
              <>
                <button
                  className="btn primary"
                  onClick={() => onPay?.(order.transactionId)}
                >
                  Thanh toán
                </button>

                <button
                  className="btn ghost"
                  onClick={() =>
                    navigate(`/user/bid/won-products/order/${order.transactionId}`)
                  }
                >
                  Xem chi tiết
                </button>
              </>
            )}

            {statusRaw === "PAID" && (
              <>
                <button
                  className="btn success"
                  onClick={() => onDone?.(order.transactionId)}
                >
                  Đánh giá
                </button>

                <button
                  className="btn ghost"
                  onClick={() =>
                    navigate(`/user/bid/won-products/order/${order.transactionId}`)
                  }
                >
                  Xem chi tiết
                </button>
              </>
            )}

            {(statusRaw === "DONE" || statusRaw === "CANCELLED") && (
              <button
                className="btn ghost"
                onClick={() =>
                  navigate(`/user/bid/won-products/order/${order.transactionId}`)
                }
              >
                Xem chi tiết
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
