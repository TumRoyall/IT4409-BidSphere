import { useEffect, useState } from "react";
import  auctionApi  from "@/api/modules/auction.api";
import AuctionCard from "./AuctionCard";
import "@/components/styles/AuctionsSection.css";

export default function LiveAuctionsSection() {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData(0, 8);
  }, []);

  const loadData = async (reqPage: number, reqSize: number = size) => {
    try {
      const res = await auctionApi.getAuctions({
        status: "OPEN",
        page: reqPage,
        size: reqSize,
      });

      const data = res.data;

      setAuctions(data.content);
      setTotalPages(data.totalPages);
      setPage(data.number);
      setSize(data.size);
    } catch (e) {
      console.error("Load error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleShowFullPage = () => {
    loadData(0, 12);
  };

  const nextPage = () => {
    if (page < totalPages - 1) loadData(page + 1, size);
  };

  const prevPage = () => {
    if (page > 0) loadData(page - 1, size);
  };

  return (
    <section className="auction-box live-section">
      <div className="section-header">
        <h2 className="section-title">Phiên Đang Diễn Ra</h2>
        <a href="/auctions?status=OPEN" className="section-btn">Xem tất cả →</a>
      </div>

      {loading && auctions.length === 0 ? (
        <div className="loading-text">Đang tải...</div>
      ) : (
        <>
          <div className="auction-grid">
            {auctions.map((a) => (
              <AuctionCard key={a.auctionId} auction={a} />
            ))}
          </div>

          {size === 8 && (
            <div className="load-more-wrapper">
              <button className="load-more-btn" onClick={handleShowFullPage}>
                Xem thêm
              </button>
            </div>
          )}

          {size === 12 && (
            <div className="pagination-wrapper">
              <button className="page-btn" disabled={page === 0} onClick={prevPage}>
                ← Trang trước
              </button>

              <span className="page-number">{page + 1}/{totalPages}</span>

              <button
                className="page-btn"
                disabled={page === totalPages - 1}
                onClick={nextPage}
              >
                Trang sau →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
