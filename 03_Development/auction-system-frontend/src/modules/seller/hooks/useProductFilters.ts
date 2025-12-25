// src/modules/seller/hooks/useProductFilters.ts
import { useState, useMemo } from "react";
import type { Product } from "../types/seller.types";
import type { FilterState } from "../components/ProductFilterBar";

export const useProductFilters = (products: Product[]) => {
  const [filters, setFilters] = useState<FilterState>({});
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply status filter
    if (filters.status) {
      result = result.filter((p) => p.status === filters.status);
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter((p) => p.categories === filters.category);
    }

    // Apply auction filter
    if (filters.hasAuction !== undefined) {
      result = result.filter((p) => {
        const hasAuction = !!p.auction;
        return filters.hasAuction ? hasAuction : !hasAuction;
      });
    }

    // Apply search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower) ||
          p.categories?.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, [products, filters, searchTerm]);

  const getStats = () => {
    return {
      total: products.length,
      filtered: filteredProducts.length,
      pending: products.filter((p) => p.status === "pending").length,
      approved: products.filter((p) => p.status === "approved").length,
      withAuction: products.filter((p) => !!p.auction).length,
      withoutAuction: products.filter((p) => !p.auction).length,
    };
  };

  return {
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    filteredProducts,
    getStats,
    hasActiveFilters: Object.values(filters).some(
      (v) => v !== undefined && v !== null && v !== ""
    ),
  };
};
