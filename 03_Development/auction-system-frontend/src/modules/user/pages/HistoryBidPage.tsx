import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bidApi } from "@/api/modules/bid.api";
import auctionApi, { AUCTION_STATUS } from "@/api/modules/auction.api";
import { useAuth } from "@/hooks/useAuth";
import "@/modules/user/styles/HistoryBidPage.css";

type BidHistory = {
  id: number;
  auctionId: number;
  bidderId: number;
  bidAmount: number;
  maxAutoBidAmount: number | null;
  stepAutoBidAmount: number | null;
  createdAt: string;
};

type AuctionStatusMap = Record<number, string>;

export default function HistoryBidPage() {
  const { user } = useAuth();
  const userId = user?.id; // lấy userId thực từ AuthContext
  const navigate = useNavigate();

  const [bids, setBids] = useState<BidHistory[]>([]);
  const [auctionStatus, setAuctionStatus] = useState<AuctionStatusMap>({});
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [showAutoOnly, setShowAutoOnly] = useState(false);
  const [showOpenOnly, setShowOpenOnly] = useState(false);

  // 🔔 popup đơn giản
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      // Chưa có userId (chưa đăng nhập hoặc chưa load xong) thì bỏ qua
      if (!userId) {
        setBids([]);
        return;
      }

      setLoading(true);
      try {
        const res = await bidApi.getBidHistoryByUser(userId);
        setBids(res.data);

        const auctionIds = Array.from(
          new Set(res.data.map((b: BidHistory) => b.auctionId))
        );

        const statusMap: AuctionStatusMap = {};
        await Promise.all(
          auctionIds.map(async (id: any) => {
            try {
              const resAuction = await auctionApi.getAuctionById(id);
              // Chuẩn hóa status từ BE (thường là UPPERCASE) về lowercase để so sánh với AUCTION_STATUS
              statusMap[id] = String(resAuction.data.status || "").toLowerCase();
            } catch {
              statusMap[id] = "unknown";
            }
          })
        );

        setAuctionStatus(statusMap);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  const displayedBids = useMemo(() => {
    const kw = keyword.trim();
    let filtered = kw ? bids.filter(b => String(b.auctionId).includes(kw)) : bids;

    if (showAutoOnly) {
      filtered = filtered.filter(b => isAutoBid(b));
    }

    if (showOpenOnly) {
      filtered = filtered.filter(b => auctionStatus[b.auctionId] === AUCTION_STATUS.OPEN);
    }

    return [...filtered].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  }, [bids, keyword]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);



  const isAutoBid = (bid: BidHistory) =>
    bid.maxAutoBidAmount !== null &&
    bid.stepAutoBidAmount !== null;

  const handleClickAuction = (auctionId: number) => {
    const status = auctionStatus[auctionId];

    if (
      status === AUCTION_STATUS.CLOSED ||
      status === AUCTION_STATUS.CANCELLED
    ) {
      setMessage("Phiên đấu giá đã kết thúc");
      return;
    }

    navigate(`/auctions/${auctionId}`);
  };

  return (
    <div className="bid-history-page">
      <h2>
        Lịch sử đấu giá
        <span className="bh-count-badge">{displayedBids.length}</span>
      </h2>

      <div className="bh-toolbar">
        <input
          className="bh-search-input"
          placeholder="Tìm theo Auction ID..."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <div className="bh-filters">
          <label className="bh-filter-item">
            <input
              type="checkbox"
              checked={showAutoOnly}
              onChange={(e) => setShowAutoOnly(e.target.checked)}
            />
            Chỉ auto-bid
          </label>
          <label className="bh-filter-item">
            <input
              type="checkbox"
              checked={showOpenOnly}
              onChange={(e) => setShowOpenOnly(e.target.checked)}
            />
            Chỉ phiên đang mở
          </label>
        </div>
      </div>

      {loading && <div className="bh-loading">Đang tải dữ liệu...</div>}

      {!loading && displayedBids.length === 0 && (
        <div className="bh-empty">Không có lịch sử đấu giá</div>
      )}

      {!loading && displayedBids.length > 0 && (
        <table className="bh-history-table">
          <thead>
            <tr>
              <th>Auction ID</th>
              <th>Giá bid</th>
              <th>Loại</th>
              <th>Trạng thái</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {displayedBids.map(bid => (
              <tr key={bid.id}>
                <td>
                  <span
                    className="bh-auction-link"
                    onClick={() =>
                      handleClickAuction(bid.auctionId)
                    }
                  >
                    #{bid.auctionId}
                  </span>
                </td>

                <td>
                  <div className="bh-amount">{formatCurrency(bid.bidAmount)}</div>
                  {isAutoBid(bid) && (
                    <div className="bh-subtext">
                      Max: {bid.maxAutoBidAmount ? formatCurrency(bid.maxAutoBidAmount) : "-"} • Step: {bid.stepAutoBidAmount ? formatCurrency(bid.stepAutoBidAmount) : "-"}
                    </div>
                  )}
                </td>

                <td>
                  <span className={`bh-type-badge ${isAutoBid(bid) ? "auto" : "manual"}`}>
                    {isAutoBid(bid) ? "Auto" : "Manual"}
                  </span>
                </td>

                <td>
                  <span className={`bh-status-chip ${auctionStatus[bid.auctionId] || "unknown"}`}>
                    {auctionStatus[bid.auctionId] || "unknown"}
                  </span>
                </td>

                <td>
                  {new Date(bid.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔔 THÔNG BÁO */}
      {message && (
        <div className="bh-toast" onClick={() => setMessage(null)}>
          {message}
        </div>
      )}
    </div>
  );
}
