import { useEffect, useState, useMemo } from "react";
import AuctionCard from "@/components/home/AuctionCard";
import SortBar from "@/modules/auction/components/SortBar.tsx"
import  auctionApi  from "@/api/modules/auction.api";
import "@/modules/auction/styles/auctionGrid.css";

export default function AuctionGrid({ filters, onChange }: any) {
  const [rawData, setRawData] = useState<any[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    load();
    loadFavorites();
  }, [filters]);

  // Listen for favorite changes from localStorage
  useEffect(() => {
    const handleFavoriteChange = () => {
      setRefreshKey(prev => prev + 1);
      loadFavorites();
    };

    window.addEventListener("favoriteChanged", handleFavoriteChange);
    return () => window.removeEventListener("favoriteChanged", handleFavoriteChange);
  }, []);

  const loadFavorites = async () => {
    const favorites = JSON.parse(localStorage.getItem("favoriteAuctions") || "[]");
    if (favorites.length === 0) {
      setFavoriteItems([]);
      return;
    }

    try {
      // Fetch all favorites without pagination to get them all
      const res = await auctionApi.getAuctions({
        page: 0,
        size: 100, // Large enough to get all favorites
        sort: filters.sort || "startTime,desc"
      });
      
      // Filter only favorited items
      const favItems = (res.data.content || []).filter((a: any) => 
        favorites.includes(a.auctionId)
      );
      
      setFavoriteItems(favItems);
    } catch (error) {
      setFavoriteItems([]);
    }
  };

  const load = async () => {
    const apiParams = {
      ...filters,
      page: (filters.page || 1) - 1,
    };

    const res = await auctionApi.getAuctions(apiParams);
    const data = res.data;
    
    setRawData(data.content ?? []);
    setTotalPages(data.totalPages ?? 1);
  };

  // Merge favorites with current page data, favorites always on top
  const sortedData = useMemo(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteAuctions") || "[]");
    
    // Remove duplicates: if favorite item is already in rawData, don't add it again
    const rawDataIds = new Set(rawData.map((a: any) => a.auctionId));
    const uniqueFavorites = favoriteItems.filter((a: any) => !rawDataIds.has(a.auctionId));
    
    // Get favorites from current page
    const currentPageFavs = rawData.filter((a: any) => favorites.includes(a.auctionId));
    const currentPageNonFavs = rawData.filter((a: any) => !favorites.includes(a.auctionId));
    
    // Merge: favorites from other pages + favorites from current page + non-favorites from current page
    return [...uniqueFavorites, ...currentPageFavs, ...currentPageNonFavs];
  }, [rawData, favoriteItems, refreshKey]);

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
        {sortedData.length > 0 ? (
          sortedData.map((auction: any) => (
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
