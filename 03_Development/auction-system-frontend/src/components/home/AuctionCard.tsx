import { useEffect, useState } from "react";
import { Users, Star } from "lucide-react";
import "@/components/styles/AuctionCard.css";

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

export default function AuctionCard({ auction, viewMode = "grid" }: any) {
  const isList = viewMode === "list";

  // Images
  const images = auction.productImageUrls?.length
    ? auction.productImageUrls
    : [auction.productImageUrl];

  const [index, setIndex] = useState(0);

  const prev = (e: any) => {
    e.stopPropagation();
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = (e: any) => {
    e.stopPropagation();
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  // Countdown
  const isUpcoming = auction.status === "PENDING";
  const isOpen = auction.status === "OPEN";

  const targetTime = isUpcoming
    ? new Date(auction.startTime).getTime()
    : isOpen
    ? new Date(auction.endTime).getTime()
    : null;

  const [timeLeft, setTimeLeft] = useState(targetTime ? targetTime - Date.now() : 0);

  useEffect(() => {
    if (!targetTime) return;
    const timer = setInterval(() => setTimeLeft(targetTime - Date.now()), 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  const goToDetail = () => {
    window.location.href = `/auctions/${auction.auctionId}`;
  };

  return (
    <div className={`auction-card ${isList ? "list" : ""}`} onClick={goToDetail}>

      {/* SAVE / WISHLIST */}
      <div className="fav-btn" onClick={(e) => e.stopPropagation()}>
        <Star size={18} strokeWidth={1.8} />
      </div>

      {/* IMAGE */}
      <div
        className={`auction-img-wrapper ${isList ? "list-img" : ""}`}
        style={
          isList
            ? ({ ["--bg-img" as any]: `url(${images[index]})` })
            : undefined
        }
      >
        <img src={images[index]} alt="product" />



        {images.length > 1 && (
          <>
            <button className="nav-arrow left" onClick={prev}>❮</button>
            <button className="nav-arrow right" onClick={next}>❯</button>
          </>
        )}

        {isOpen && <span className="badge-live">● LIVE</span>}
        {isUpcoming && <span className="badge-upcoming">⏱ UPCOMING</span>}

        {/* DOTS */}
        {images.length > 1 && (
          <div className="dot-container">
            {images.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === index ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIndex(i);
                }}
              ></span>
            ))}
          </div>
        )}

        {/* HOVER DETAIL (GRID ONLY) */}
        {!isList && (
          <div className="hover-detail">
            <span>Xem chi tiết →</span>
          </div>
        )}
      </div>

      {/* BODY */}
      <div className={`auction-body ${isList ? "list-body" : ""}`}>
        <div className="info-col">
          <h3 className="title">{auction.productName}</h3>
          {isList && <p className="description">{auction.productDescription}</p>}
          <p className="seller">
            Người bán:{" "}
            <span
              className="seller-link"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/user/${auction.sellerId}`;
              }}
            >
              {auction.sellerName}
            </span>
          </p>
        </div>

        <div className="auction-col">
          <p className="label">Giá khởi điểm</p>
          <p className="opening-bid">{auction.startPrice.toLocaleString()} đ</p>

          {(isUpcoming || isOpen) && (
            <p className="countdown" style={{ color: getCountdownColor(timeLeft) }}>
              {isUpcoming ? "Bắt đầu sau " : "Kết thúc sau "} {formatTimeLeft(timeLeft)}
            </p>
          )}

          <p className="participants">
            <Users size={15} /> {auction.totalBidders ?? 0} người tham gia
          </p>
        </div>
      </div>
    </div>
  );
}
