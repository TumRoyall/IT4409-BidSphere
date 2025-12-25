import { useEffect, useState } from "react";
import AuctionCard from "@/components/home/AuctionCard";
import { userApi } from "@/api/modules/user.api";
import "@/modules/auction/styles/auctionGrid.css";
import "@/modules/user/styles/auctionCurrentPage.css";

export default function AuctionCurrentPage() {
  const [userId, setUserId] = useState<number | null>(null);
  const [auctions, setAuctions] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // 🌱 Lấy userId từ /users/me
  useEffect(() => {
    const loadMe = async () => {
      try {
        const me = await userApi.getProfile();
        setUserId(me.userId);
      } catch (e) {
        console.error("Không lấy được thông tin người dùng", e);
      }
    };
    loadMe();
  }, []);

  // ⚡ Lấy danh sách auction đang tham gia
  useEffect(() => {
    if (!userId) return;

    const loadAuctions = async () => {
      try {
        setLoading(true);
        const data = await userApi.getParticipatingAuctions(userId, {
          page,
          size: 12,
          sort: "endTime,asc",
        });
        setAuctions(data.content || []);
        setTotalPages(data.totalPages || 1);
      } catch (e) {
        console.error("Load participating auctions failed", e);
        setAuctions([]);
      } finally {
        setLoading(false);
      }
    };

    loadAuctions();
  }, [userId, page]);

  return (
    <div className="auction-page-wrapper">
      {/* Header */}
      <div className="auction-page-header">
        <h2>Phiên đấu giá đang tham gia</h2>
        <p className="sub-text">
          Những phiên đấu giá bạn đang theo dõi và đã đặt giá
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="auction-loading">
          <p>Đang tải dữ liệu...</p>
        </div>
      )}

      {/* Empty */}
      {!loading && auctions.length === 0 && (
        <div className="auction-empty">
          <p>Bạn chưa tham gia phiên đấu giá nào.</p>
          <span>Hãy thử tham gia một phiên đấu giá thú vị nhé!</span>
        </div>
      )}

      {/* Grid */}
      {!loading && auctions.length > 0 && (
        <>
          <div className="auction-grid">
            {auctions.map((auction) => (
              <AuctionCard
                key={auction.auctionId || auction.id}
                auction={auction}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={i === page ? "active" : ""}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
