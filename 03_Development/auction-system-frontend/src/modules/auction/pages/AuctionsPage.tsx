import { useSearchParams } from "react-router-dom";
import FilterSidebar from "@/modules/auction/components/FilterSidebar";
import SortBar from "@/modules/auction/components/SortBar";
import ActiveFilters from "@/modules/auction/components/ActiveFilters";
import AuctionGrid from "@/modules/auction/components/AuctionGrid";

import "@/modules/auction/styles/auctionsPage.css";

export default function AuctionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    keyword: searchParams.get("keyword") || "",
    status: searchParams.get("status") || "",
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    sort: searchParams.get("sort") || "startTime,desc",
    page: Number(searchParams.get("page") || 1),
  };

  const updateFilters = (updates: any) => {
    const params = new URLSearchParams();
    const next = { ...filters, ...updates };

    Object.entries(next).forEach(([k, v]) => {
      if (v !== "" && v !== null && v !== undefined) params.set(k, String(v));
    });

    setSearchParams(params);
  };

  return (
    <div className="auction-page">
      <div className="auction-wrapper">

        <div className="filter-sidebar-wrapper">
          <FilterSidebar filters={filters} onChange={updateFilters} />
        </div>

        <div className="auction-main">
          <div className="auction-content-card">
            <ActiveFilters filters={filters} onChange={updateFilters} />
            <AuctionGrid filters={filters} onChange={updateFilters} />
          </div>
        </div>

      </div>
    </div>
  );
}
