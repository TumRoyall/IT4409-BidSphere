import { useEffect, useState } from "react";
import AuctionCard from "@/components/home/AuctionCard";
import SortBar from "@/modules/auction/components/SortBar.tsx"
import  auctionApi  from "@/api/modules/auction.api";
import "@/modules/auction/styles/auctionGrid.css";

export default function AuctionGrid({ filters, onChange }: any) {
  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    load();
  }, [filters]);

  const load = async () => {
    const apiParams = {
      ...filters,
      page: (filters.page || 1) - 1,
    };

    const res = await auctionApi.getAuctions(apiParams);

    const data = res.data;
    setData(data.content ?? []);
    setTotalPages(data.totalPages ?? 1);
  };

  return (
    <div>
      {/* SortBar */}
      <SortBar
        filters={filters}
        onChange={onChange}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* GRID / LIST */}
      <div className={viewMode === "grid" ? "auction-grid" : "auction-list"}>
        {data.length > 0 ? (
          data.map((auction: any) => (
            <AuctionCard
              key={auction.auctionId}
              auction={auction}
              viewMode={viewMode}
            />
          ))
        ) : (
          <p className="no-data">Không có kết quả nào</p>
        )}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={filters.page === i + 1 ? "active" : ""}
            onClick={() => onChange({ page: i + 1 })}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
