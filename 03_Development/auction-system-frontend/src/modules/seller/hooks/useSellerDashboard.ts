// src/modules/seller/hooks/useSellerDashboard.ts
import { useState, useCallback } from "react";
import { useSellerProducts, useProductActions, useSellerStatistics } from "./useSellerProducts";
import type { Product } from "../types/seller.types";
import type { FilterState } from "../components/ProductFilterBar";

export interface DashboardState {
  // Modals
  isCreateProductOpen: boolean;
  isEditProductOpen: boolean;
  isDeleteConfirmOpen: boolean;
  isAuctionManagerOpen: boolean;
  
  // Data
  selectedProduct: Product | null;
  filters: FilterState;
  searchTerm: string;
}

export const useSellerDashboard = () => {
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    isCreateProductOpen: false,
    isEditProductOpen: false,
    isDeleteConfirmOpen: false,
    isAuctionManagerOpen: false,
    selectedProduct: null,
    filters: {},
    searchTerm: "",
  });

  const productsHook = useSellerProducts();
  const actionsHook = useProductActions();
  const statsHook = useSellerStatistics();

  // Modal management
  const openCreateProductModal = useCallback(() => {
    setDashboardState((prev) => ({
      ...prev,
      isCreateProductOpen: true,
    }));
  }, []);

  const closeCreateProductModal = useCallback(() => {
    setDashboardState((prev) => ({
      ...prev,
      isCreateProductOpen: false,
    }));
  }, []);

  const openEditProductModal = useCallback((product: Product) => {
    setDashboardState((prev) => ({
      ...prev,
      isEditProductOpen: true,
      selectedProduct: product,
    }));
  }, []);

  const closeEditProductModal = useCallback(() => {
    setDashboardState((prev) => ({
      ...prev,
      isEditProductOpen: false,
      selectedProduct: null,
    }));
  }, []);

  const openDeleteConfirm = useCallback((product: Product) => {
    setDashboardState((prev) => ({
      ...prev,
      isDeleteConfirmOpen: true,
      selectedProduct: product,
    }));
  }, []);

  const closeDeleteConfirm = useCallback(() => {
    setDashboardState((prev) => ({
      ...prev,
      isDeleteConfirmOpen: false,
      selectedProduct: null,
    }));
  }, []);

  const openAuctionManager = useCallback((product: Product) => {
    setDashboardState((prev) => ({
      ...prev,
      isAuctionManagerOpen: true,
      selectedProduct: product,
    }));
  }, []);

  const closeAuctionManager = useCallback(() => {
    setDashboardState((prev) => ({
      ...prev,
      isAuctionManagerOpen: false,
      selectedProduct: null,
    }));
  }, []);

  // Filter management
  const updateFilters = useCallback((filters: FilterState) => {
    setDashboardState((prev) => ({
      ...prev,
      filters,
    }));
  }, []);

  const updateSearchTerm = useCallback((term: string) => {
    setDashboardState((prev) => ({
      ...prev,
      searchTerm: term,
    }));
  }, []);

  // Product actions with notifications
  const createProduct = useCallback(
    async (data: any) => {
      try {
        const result = await actionsHook.createProduct(data);
        closeCreateProductModal();
        // Refresh products list
        productsHook.refresh();
        statsHook.refresh();
        return result;
      } catch (error) {
        console.error("Error creating product:", error);
        throw error;
      }
    },
    [actionsHook, productsHook, statsHook, closeCreateProductModal]
  );

  const updateProduct = useCallback(
    async (productId: number, data: any) => {
      try {
        const result = await actionsHook.updateProduct(productId, data);
        closeEditProductModal();
        productsHook.refresh();
        statsHook.refresh();
        return result;
      } catch (error) {
        console.error("Error updating product:", error);
        throw error;
      }
    },
    [actionsHook, productsHook, statsHook, closeEditProductModal]
  );

  const deleteProduct = useCallback(
    async (product: Product) => {
      try {
        await actionsHook.deleteProduct(product.productId);
        closeDeleteConfirm();
        productsHook.refresh();
        statsHook.refresh();
      } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
      }
    },
    [actionsHook, productsHook, statsHook, closeDeleteConfirm]
  );

  return {
    // State
    dashboardState,
    
    // Product data
    products: productsHook.products,
    loading: productsHook.loading,
    error: productsHook.error,
    pagination: productsHook.pagination,
    stats: statsHook.stats,
    statsLoading: statsHook.loading,
    
    // Modal actions
    openCreateProductModal,
    closeCreateProductModal,
    openEditProductModal,
    closeEditProductModal,
    openDeleteConfirm,
    closeDeleteConfirm,
    openAuctionManager,
    closeAuctionManager,
    
    // Filter actions
    updateFilters,
    updateSearchTerm,
    
    // Product actions
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: productsHook.refresh,
    refreshStats: statsHook.refresh,
    
    // Submission state
    isSubmitting: actionsHook.loading,
  };
};
