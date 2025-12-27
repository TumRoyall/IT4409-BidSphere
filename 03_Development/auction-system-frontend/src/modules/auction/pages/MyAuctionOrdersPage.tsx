import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { afterAuctionApi } from "@/api/modules/afterAuction.api";
import { userApi } from "@/api/modules/user.api";
import AuctionOrderCard from "@/modules/auction/components/AuctionOrderCard";
import "@/modules/auction/styles/MyAuctionOrdersPage.css";

type TabKey = "ALL" | "PENDING" | "SHIPPING" | "DONE" | "CANCELLED";

const TABS: { key: TabKey; label: string }[] = [
  { key: "ALL", label: "Tất cả" },
  { key: "PENDING", label: "Chờ xác nhận" },
  { key: "SHIPPING", label: "Vận chuyển" },
  { key: "DONE", label: "Hoàn thành" },
  { key: "CANCELLED", label: "Đã hủy" },
];


const TAB_STATUS_MAP: Record<TabKey, string | null> = {
  ALL: null,
  PENDING: "PENDING",
  SHIPPING: "SHIPPED",
  DONE: null,          // xử lý riêng
  CANCELLED: "CANCELLED",
};


export default function MyAuctionOrdersPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("ALL");
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    userApi.getProfile().then(res => setUserId(res.userId));
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        if (activeTab === "DONE") {
          const [paidRes, doneRes] = await Promise.all([
            afterAuctionApi.getWonProducts(userId, "PAID"),
            afterAuctionApi.getWonProducts(userId, "DONE"),
          ]);

          setOrders([
            ...paidRes.data,
            ...doneRes.data,
          ]);
        } else {
          const status = TAB_STATUS_MAP[activeTab];
          const res = await afterAuctionApi.getWonProducts(
            userId,
            status ?? undefined
          );
          setOrders(res.data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, userId]);


  return (
    <div className="auction-orders-page">
      {/* ===== TABS ===== */}
      <div className="auction-tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? "active" : ""}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===== LIST ===== */}
      {loading && <div className="loading">Đang tải...</div>}

      {!loading && orders.length === 0 && (
        <div className="empty">Không có đơn đấu giá</div>
      )}

      <div className="order-list">
        {orders.map(order => (
          <AuctionOrderCard
            key={order.transactionId}
            order={order}
            onPay={(txnId: string) => {
              navigate(`/deposit?txn=${txnId}`);
            }}
            onDone={(txnId: string) => {
              console.log("DONE txn:", txnId);
            }}
          />
        ))}
      </div>
    </div>
  );
}
