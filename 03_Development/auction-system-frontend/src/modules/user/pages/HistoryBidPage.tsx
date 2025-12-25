import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { bidApi } from "@/api/modules/bid.api";
import auctionApi, { AUCTION_STATUS } from "@/api/modules/auction.api";
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
  const userId = 32; // demo
  const navigate = useNavigate();

  const [bids, setBids] = useState<BidHistory[]>([]);
  const [auctionStatus, setAuctionStatus] = useState<AuctionStatusMap>({});
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  // 🔔 popup đơn giản
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await bidApi.getBidHistoryByUser(userId);
        setBids(res.data);

        const auctionIds = Array.from(
          new Set(res.data.map((b: BidHistory) => b.auctionId))
        );

        const statusMap: AuctionStatusMap = {};
        await Promise.all(
          auctionIds.map(async id => {
            try {
              const resAuction = await auctionApi.getAuctionById(id);
              statusMap[id] = resAuction.data.status;
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
  }, []);

  const displayedBids = useMemo(() => {
    const filtered = !keyword.trim()
      ? bids
      : bids.filter(b =>
          String(b.auctionId).includes(keyword.trim())
        );

    return [...filtered].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );
  }, [bids, keyword]);



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
      <h2>Lịch sử đấu giá</h2>

      <input
        className="search-input"
        placeholder="Tìm theo Auction ID..."
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />

      {loading && <div className="loading">Đang tải dữ liệu...</div>}

      {!loading && displayedBids.length === 0 && (
        <div className="empty">Không có lịch sử đấu giá</div>
      )}

      {!loading && displayedBids.length > 0 && (
        <table className="history-table">
          <thead>
            <tr>
              <th>Auction ID</th>
              <th>Giá bid</th>
              <th className="center">Auto bid</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {displayedBids.map(bid => (
              <tr key={bid.id}>
                <td>
                  <span
                    className="auction-link"
                    onClick={() =>
                      handleClickAuction(bid.auctionId)
                    }
                  >
                    #{bid.auctionId}
                  </span>
                </td>

                <td>{bid.bidAmount.toLocaleString()} ₫</td>

                <td className="center">
                  <input
                    type="checkbox"
                    className="auto-checkbox"
                    checked={isAutoBid(bid)}
                    readOnly
                  />
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
        <div className="toast" onClick={() => setMessage(null)}>
          {message}
        </div>
      )}
    </div>
  );
}
