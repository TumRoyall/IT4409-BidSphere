// src/modules/seller/components/ProductFilterBar.tsx
import React, { useState } from "react";
import { Filter, X } from "lucide-react";
import "@/styles/modules/seller/index.css";

interface ProductFilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  currentFilters?: FilterState;
}

export interface FilterState {
  status?: string;
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  hasAuction?: boolean | null;
}

const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  onFilterChange,
  currentFilters = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(currentFilters);

  const STATUSES = ["pending", "approved", "rejected", "sold"];
  const CATEGORIES = [
    "Electronics",
    "Furniture",
    "Jewelry",
    "Art",
    "Collectibles",
    "Fashion",
    "Books",
    "Other",
  ];

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStatusChange = (status: string | undefined) => {
    handleFilterChange({
      ...filters,
      status,
    });
  };

  const handleCategoryChange = (category: string | undefined) => {
    handleFilterChange({
      ...filters,
      category,
    });
  };

  const handleAuctionFilterChange = (value: boolean | null) => {
    handleFilterChange({
      ...filters,
      hasAuction: value === null ? undefined : value,
    });
  };

  const handleReset = () => {
    setFilters({});
    onFilterChange({});
  };

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== null && v !== ""
  );

  return (
    <div className="product-filter-bar">
      <button
        className="filter-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle filters"
      >
        <Filter size={20} />
        Filters
        {hasActiveFilters && <span className="active-badge">●</span>}
      </button>

      {isOpen && (
        <div className="filter-panel">
          <div className="filter-header">
            <h3 className="filter-title">Filter Products</h3>
            <button
              className="filter-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>

          <div className="filter-content">
            {/* Status Filter */}
            <div className="filter-group">
              <label className="filter-label">Status</label>
              <div className="filter-options">
                <button
                  className={`filter-option ${!filters.status ? "active" : ""}`}
                  onClick={() => handleStatusChange(undefined)}
                >
                  All
                </button>
                {STATUSES.map((status) => (
                  <button
                    key={status}
                    className={`filter-option ${filters.status === status ? "active" : ""}`}
                    onClick={() => handleStatusChange(status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select
                className="filter-select"
                value={filters.category || ""}
                onChange={(e) => handleCategoryChange(e.target.value || undefined)}
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Auction Status Filter */}
            <div className="filter-group">
              <label className="filter-label">Auction Status</label>
              <div className="filter-options">
                <button
                  className={`filter-option ${filters.hasAuction === undefined ? "active" : ""}`}
                  onClick={() => handleAuctionFilterChange(null)}
                >
                  All
                </button>
                <button
                  className={`filter-option ${filters.hasAuction === true ? "active" : ""}`}
                  onClick={() => handleAuctionFilterChange(true)}
                >
                  Has Auction
                </button>
                <button
                  className={`filter-option ${filters.hasAuction === false ? "active" : ""}`}
                  onClick={() => handleAuctionFilterChange(false)}
                >
                  No Auction
                </button>
              </div>
            </div>
          </div>

          <div className="filter-footer">
            {hasActiveFilters && (
              <button
                className="filter-reset"
                onClick={handleReset}
              >
                Reset Filters
              </button>
            )}
            <button
              className="filter-apply"
              onClick={() => setIsOpen(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilterBar;
