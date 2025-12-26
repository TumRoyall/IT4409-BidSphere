import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, Wallet, Users, HelpCircle } from "lucide-react";
import auctionApi from "@/api/modules/auction.api";
import { bidApi } from "@/api/modules/bid.api";
import { userApi } from "@/api/modules/user.api";
import "@/modules/auction/styles/auctionDetail.css";

const STATUS_LABEL: Record<string, string> = {
  OPEN: "Đang diễn ra",
  PENDING: "Sắp diễn ra",
  CLOSED: "Đã kết thúc",
  FAILED: "Không thành công",
};

const STATUS_COLOR: Record<string, string> = {
  OPEN: "#dc2626",
  PENDING: "#2563eb",
  CLOSED: "#6b7280",
  FAILED: "#6b7280",
};

function formatDateTime(dt: string | null | undefined) {
  if (!dt) return "";
  const d = new Date(dt);
  return d.toLocaleString("vi-VN");
}

function formatTimeLeft(ms: number) {
  if (ms <= 0) return "0s";
  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);

  if (day >= 1) return `${day}d ${hour % 24}h`;
  if (hour >= 1) return `${hour}h ${min % 60}m`;
  if (min >= 1) return `${min}m ${sec % 60}s`;
  return `${sec}s`;
}

function getCountdownColor(ms: number) {
  if (ms <= 0) return "#dc2626";
  const sec = Math.floor(ms / 1000);
  const min = Math.floor(sec / 60);
  if (min <= 10) return "#dc2626";
  if (min <= 20) return "#eab308";
  return "#111827";
}

// ===================== MAIN PAGE =====================

export default function AuctionDetailPage() {
    const navigate = useNavigate();
    const [blocked, setBlocked] = useState(false);
  const { id } = useParams();
  const auctionId = Number(id);

  const [auction, setAuction] = useState<any>(null);
  const [bids, setBids] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bidLoading, setBidLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"desc" | "history">("desc");

  const loadAuction = async () => {
    const res = await auctionApi.getAuctionById(auctionId);

    const status = res.data.status;

    if (status === "CLOSED" || status === "CANCELLED") {
      setBlocked(true);
      return;
    }

    setAuction(res.data);
  };


  const loadBids = async () => {
    const res = await bidApi.getBidsByAuction(auctionId);
    setBids(res.data || []);
  };

  const loadUser = async () => {
    try {
      const data = await userApi.getProfile();
      setUser(data);
    } catch {
      setUser(null);
    }
  };

  const reloadAll = async () => {
    await Promise.all([loadAuction(), loadBids(), loadUser()]);
    setLoading(false);
  };

  useEffect(() => {
    if (!auctionId) return;
    reloadAll();
  }, [auctionId]);

  // Poll nhẹ khi OPEN (3s)
  useEffect(() => {
    if (!auction || auction.status !== "OPEN") return;
    const interval = setInterval(() => {
      loadAuction();
      loadBids();
    }, 3000);
    return () => clearInterval(interval);
  }, [auction?.status, auctionId]);

  const handleBidSuccess = async () => {
    await loadAuction();
    await loadBids();
    await loadUser(); // số dư thay đổi
  };

  if (blocked) {
      return (
        <div className="auction-blocked-wrapper">
          <div className="auction-blocked-box">
            <h2>Phiên đấu giá đã kết thúc</h2>
            <p>
              Phiên đấu giá này đã kết thúc hoặc đã bị huỷ.<br />
              Bạn không thể tiếp tục truy cập.
            </p>

            <button
              className="btn-back"
              onClick={() => navigate(-1)}
            >
              Quay lại
            </button>
          </div>
        </div>
      );
    }

  if (loading)
    return <div className="auction-detail-loading">Đang tải...</div>;
  if (!auction)
    return (
      <div className="auction-detail-loading">Không tìm thấy phiên đấu giá.</div>
    );

  return (
    <div className="auction-detail-wrapper">
      {/* TOP SECTION */}
      <div className="auction-detail-top">
        <AuctionImages auction={auction} />

        <div className="auction-detail-right">
          <h1 className="auction-title">{auction.productName}</h1>

          <p className="auction-seller">
            Người bán:{" "}
            <span
              className="auction-seller-link"
              onClick={() =>
                (window.location.href = `/user/${auction.sellerId}`)
              }
            >
              {auction.sellerName}
            </span>
          </p>

          <BidPanel
            auction={auction}
            user={user}
            bids={bids}
            loading={bidLoading}
            setLoading={setBidLoading}
            error={error}
            setError={setError}
            onBidSuccess={handleBidSuccess}
          />
        </div>
      </div>

      {/* BOTTOM TABS */}
      <div className="auction-detail-bottom">
        <div className="auction-tabs">
          <div
            className={`auction-tab ${activeTab === "desc" ? "active" : ""}`}
            onClick={() => setActiveTab("desc")}
          >
            Mô tả sản phẩm
          </div>

          <div
            className={`auction-tab ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            Lịch sử đấu giá
          </div>
        </div>


        <div className="auction-tab-content">
          {activeTab === "desc" && (
            <div className="auction-desc">
              <h3>Chi tiết sản phẩm</h3>

              <div className="auction-desc-box">
                <p>{auction.productDescription || "Không có mô tả chi tiết."}</p>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="auction-history-wrapper">
              <h3>Lịch sử đấu giá</h3>
              <AuctionHistory bids={bids} />
            </div>
          )}
        </div>


      </div>
    </div>
  );
}

// ===================== IMAGE GALLERY =====================

function AuctionImages({ auction }: { auction: any }) {
  const images =
    auction.productImageUrls?.length > 0
      ? auction.productImageUrls
      : [auction.productImageUrl];

  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="auction-images">
      <div className="auction-main-img">
        <img src={images[index]} alt={auction.productName} />
        {images.length > 1 && (
          <>
            <button className="img-nav left" onClick={prev}>
              ❮
            </button>
            <button className="img-nav right" onClick={next}>
              ❯
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="auction-thumbs">
          {images.map((url: string, i: number) => (
            <div
              key={i}
              className={`thumb ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            >
              <img src={url} alt="" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===================== BID PANEL =====================

interface BidPanelProps {
  auction: any;
  user: any;
  bids: any[];
  loading: boolean;
  setLoading: (b: boolean) => void;
  error: string;
  setError: (s: string) => void;
  onBidSuccess: () => void;
}

function BidPanel({
  auction,
  user,
  bids,
  loading,
  setLoading,
  error,
  setError,
  onBidSuccess,
}: BidPanelProps) {

  const { id } = useParams();
  const auctionId = Number(id);

  const [highestBid, setHighestBid] = useState<number>(0);
  const [bidAmount, setBidAmount] = useState<string>("");
  const [isAutoBid, setIsAutoBid] = useState<boolean>(false);
  const [maxAutoBidAmount, setMaxAutoBidAmount] = useState<string>("");
  const [stepAutoBidAmount, setStepAutoBidAmount] = useState<string>("");

  const isUpcoming = auction.status === "PENDING";
  const isOpen = auction.status === "OPEN";
  const isClosed = auction.status === "CLOSED";

  // Giá từ auction
  const startPrice = Number(auction.startPrice ?? 0);
  const bidStep = Number(auction.bidStepAmount ?? 0);

  // ===== LẤY GIÁ CAO NHẤT TỪ API BIDS/HIGHEST =====
  const loadHighestBid = async () => {
    try {
      const res = await bidApi.getHighestBid(auctionId);
      const amount = Number(res?.data?.bidAmount ?? 0);
      setHighestBid(amount);
    } catch {
      setHighestBid(0);
    }
  };

  // Gọi khi render + poll
  useEffect(() => {
    loadHighestBid();
  }, [auctionId]);

  // Poll mỗi 3s khi OPEN
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      loadHighestBid();
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Giá cao nhất thật sự
  const highest = highestBid > 0 ? highestBid : startPrice;

  // Giá đề xuất tiếp theo
  const nextBid = highest + bidStep;

  // countdown
  const [targetTime, setTargetTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let t: number | null = null;
    if (isUpcoming && auction.startTime)
      t = new Date(auction.startTime).getTime();
    else if (isOpen && auction.endTime)
      t = new Date(auction.endTime).getTime();
    setTargetTime(t);
    setTimeLeft(t ? t - Date.now() : 0);
  }, [auction.id, auction.status, auction.startTime, auction.endTime]);

  useEffect(() => {
    if (!targetTime) return;
    const timer = setInterval(() => {
      setTimeLeft(targetTime - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  const handleQuickBid = () => {
    if (!isOpen) return;
    setBidAmount(nextBid.toString());
  };

  const handleSubmit = async () => {
    if (!user) {
      setError("Bạn cần đăng nhập để đặt giá.");
      return;
    }
    if (!isOpen) {
      setError("Phiên đấu giá không ở trạng thái đang diễn ra.");
      return;
    }

    setError("");

    const auctionKey = auction.auctionId ?? auction.id;
    if (!auctionKey) {
      setError("Không xác định được phiên đấu giá.");
      return;
    }

    try {
      setLoading(true);

      if (!isAutoBid) {
        // BID THỦ CÔNG
        const amount = Number(bidAmount);
        if (Number.isNaN(amount) || amount <= 0) {
          setError("Giá đặt không hợp lệ.");
          return;
        }
        if (amount < nextBid) {
          setError(`Giá đặt phải tối thiểu ${nextBid.toLocaleString()} đ.`);
          return;
        }
        if (user.balance !== undefined && amount > user.balance) {
          setError("Số dư không đủ để đặt giá.");
          return;
        }

        await bidApi.placeBid({
          auctionId: auctionKey,
          bidderId: user.userId,
          bidAmount: amount,
        });
      } else {
        // AUTO BID
        const maxAuto = Number(maxAutoBidAmount);
        const stepAuto = Number(stepAutoBidAmount);

        if (Number.isNaN(maxAuto) || maxAuto <= nextBid) {
          setError("Giá auto tối đa phải lớn hơn giá đề xuất tiếp theo.");
          return;
        }
        if (Number.isNaN(stepAuto) || stepAuto <= 0) {
          setError("Bước tăng tự động phải lớn hơn 0.");
          return;
        }

        await bidApi.placeAutoBid({
          auctionId: auctionKey,
          bidderId: user.userId,
          maxAutoBidAmount: maxAuto,
          stepAutoBidAmount: stepAuto,
        });
      }

      // reset form
      setBidAmount("");
      setMaxAutoBidAmount("");
      setStepAutoBidAmount("");

      await onBidSuccess();
      await loadHighestBid(); // update ngay giá cao nhất
    } catch (e: any) {
      setError(e?.response?.data?.message || "Đặt giá thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bid-panel">
      {/* STATUS + COUNTDOWN */}
      <div className="bid-status-row">
        <span
          className="bid-status-badge"
          style={{ backgroundColor: STATUS_COLOR[auction.status] || "#6b7280" }}
        >
          {STATUS_LABEL[auction.status] || auction.status}
        </span>

        <div className="bid-countdown">
          <Clock size={16} />
          {isUpcoming && (
            <span>
              Bắt đầu sau{" "}
              <strong style={{ color: getCountdownColor(timeLeft) }}>
                {formatTimeLeft(timeLeft)}
              </strong>
            </span>
          )}
          {isOpen && (
            <span>
              Kết thúc sau{" "}
              <strong style={{ color: getCountdownColor(timeLeft) }}>
                {formatTimeLeft(timeLeft)}
              </strong>
            </span>
          )}
          {isClosed && (
            <span>Đã kết thúc lúc {formatDateTime(auction.endTime)}</span>
          )}
        </div>
      </div>

      {/* PRICES */}
      <div className="bid-prices">
        <div className="bid-price-item">
          <span className="label">Giá khởi điểm</span>
          <span className="value">{startPrice.toLocaleString()} đ</span>
        </div>

        <div className="bid-price-item">
          <span className="label">Giá cao nhất hiện tại</span>
          <span className="value highlight">
            {highest.toLocaleString()} đ
          </span>
        </div>

        <div className="bid-price-item">
          <span className="label">Bước giá</span>
          <span className="value">{bidStep.toLocaleString()} đ</span>
        </div>
      </div>

      {/* Balance */}
      <div className="bid-balance">
        <Wallet size={16} />
        <span>
          Số dư của bạn:{" "}
          <strong>{user ? `${user.balance.toLocaleString()} đ` : "Chưa đăng nhập"}</strong>
        </span>
      </div>

      {/* AutoBid Toggle */}
      <div className="auto-bid-toggle">
        <span className="switch-label">Sử dụng AutoBid</span>

        <div className="tooltip-wrapper">
          <HelpCircle className="tooltip-icon" size={16} />
          <div className="tooltip-box">
            AutoBid là hệ thống tự động đặt giá thay bạn:
            <br />- Chọn giá tối đa bạn muốn trả
            <br />- Hệ thống tăng giá theo bước mỗi khi có người vượt
            <br />- Dừng khi chạm mức tối đa
          </div>
        </div>

        <label className="switch">
          <input
            type="checkbox"
            checked={isAutoBid}
            onChange={() => setIsAutoBid((prev) => !prev)}
          />
          <span className="slider"></span>
        </label>
      </div>

      {/* Manual bid */}
      {!isAutoBid && (
        <div className="bid-form">
          <div className="bid-next">
            Giá đề xuất tiếp theo:
            <strong>{nextBid.toLocaleString()} đ</strong>
            <button className="btn-quick-bid" onClick={handleQuickBid}>
              Điền nhanh
            </button>
          </div>

          <input
            type="number"
            placeholder="Nhập giá bạn muốn đặt (đ)"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />

          <button className="btn-place-bid" onClick={handleSubmit}>
            {loading ? "Đang xử lý..." : "Đặt giá ngay"}
          </button>
        </div>
      )}

      {/* Auto bid */}
      {isAutoBid && (
        <div className="auto-bid-form">
          <input
            type="number"
            placeholder="Giá tối đa muốn trả"
            value={maxAutoBidAmount}
            onChange={(e) => setMaxAutoBidAmount(e.target.value)}
          />

          <input
            type="number"
            placeholder="Bước tăng tự động"
            value={stepAutoBidAmount}
            onChange={(e) => setStepAutoBidAmount(e.target.value)}
          />

          <button className="btn-place-bid" onClick={handleSubmit}>
            {loading ? "Đang xử lý..." : "Kích hoạt AutoBid"}
          </button>
        </div>
      )}

      {error && <p className="bid-error">{error}</p>}
    </div>
  );
}


// ===================== BID HISTORY =====================

function maskName(name: string) {
  if (!name) return "";
  if (name.length <= 3) return name[0] + "***";
  return name.slice(0, 3) + "***" + name.slice(-1);
}

function AuctionHistory({ bids }: { bids: any[] }) {
  if (!bids || bids.length === 0)
    return <p className="empty-history">Chưa có lượt đấu giá nào.</p>;

  const sorted = [...bids].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <table className="bid-history-table">
      <thead>
        <tr>
          <th>Người tham gia</th>
          <th>Giá đặt</th>
          <th>Thời gian</th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((b) => (
          <tr key={b.id}>
            <td>{maskName(b.bidderName || `user_${b.bidderId}`)}</td>
            <td>{b.bidAmount?.toLocaleString()} đ</td>
            <td>{formatDateTime(b.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
