// src/modules/seller/hooks/useSellerProducts.ts
import { useState, useEffect, useCallback } from "react";
import productApi from "@/api/modules/product.api";
import auctionApi from "@/api/modules/auction.api";
import { useAuth } from "@/hooks/useAuth";
import type { Product, ProductFilters } from "../types/seller.types";

/**
 * Transform backend response to match frontend types
 */
const parsePrice = (value: any): number => {
  if (value === null || value === undefined) return 0;
  
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

const transformProducts = (rawProducts: any[]): Product[] => {
  return rawProducts.map((p) => ({
    productId: p.productId || p.product_id,
    sellerId: p.sellerId || p.seller_id,
    name: p.name,
    category: p.category,
    description: p.description,
    startPrice: parsePrice(p.startPrice || p.start_price),
    estimatePrice: parsePrice(p.estimatePrice || p.estimate_price),
    deposit: parsePrice(p.deposit),
    imageUrl: p.imageUrl || p.image_url || "",
    status: p.status,
    createdAt: p.createdAt || p.created_at,
    images: p.images,
    auction: p.auction,
  }));
};

/**
 * Hook quản lý danh sách sản phẩm
 */
export const useSellerProducts = (initialFilters?: Partial<ProductFilters>) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    limit: 10,
    status: "all",
    ...initialFilters,
  });

  // Fetch products of current seller
  const fetchProducts = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("📦 Fetching products for seller:", user.id);

      // Lấy products của seller hiện tại (endpoint mới sử dụng token - /products/seller/me/page)
      const response = await productApi.getProductsBySellerMePage(filters.page - 1 || 0, filters.limit || 10);

      // Backend may return a paged response { content: [...], totalElements, ... } or an array
      let productData: any[] = [];
      if (Array.isArray(response.data)) {
        productData = response.data;
      } else if (response.data && Array.isArray((response.data as any).content)) {
        productData = (response.data as any).content;
      } else {
        productData = [];
      }
      
      console.log("📥 Raw response data:", productData);

      // Ensure we only show products belonging to the logged-in seller.
      // This handles the case where the backend fallback returns all products
      // (e.g., when /products/seller/me/page is unavailable and we used /products/page).
      const sellerId = user?.id;
      if (sellerId) {
        productData = productData.filter((p: any) => {
          const pid = p.sellerId ?? p.seller_id ?? p.seller;
          return Number(pid) === Number(sellerId);
        });
      }
      
      // Apply search filter if present
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        productData = productData.filter((p: any) =>
          (p.name?.toLowerCase().includes(searchLower) || 
           p.description?.toLowerCase().includes(searchLower) ||
           p.category?.toLowerCase().includes(searchLower))
        );
      }
      
      const transformedProducts = transformProducts(productData);
      console.log("✅ Transformed products:", transformedProducts);

      setProducts(transformedProducts);
      
      // Adjust pagination based on filtered results (client-side when fallback used)
      const totalFiltered = productData.length;
      const limit = filters.limit || totalFiltered;
      const totalPages = Math.max(1, Math.ceil(totalFiltered / limit));

      setPagination((prev) => ({
        ...prev,
        page: filters.page || 1,
        limit,
        total: (response.data && (response.data as any).totalElements) || totalFiltered,
        totalPages: (response.data && (response.data as any).totalPages) || totalPages,
      }));
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Không thể tải danh sách sản phẩm";
      setError(errorMsg);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.id, filters.page, filters.limit, filters.search]);

  // Chỉ fetch khi component mount hoặc filter thay đổi
  useEffect(() => {
    if (user?.id) {
      console.log("🔄 useSellerProducts: fetchProducts triggered");
      fetchProducts();
    }
  }, [user?.id, fetchProducts, refreshTrigger]);

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const changePage = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const refresh = useCallback(() => {
    console.log("🔄 Refresh triggered - updating refreshTrigger");
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return {
    products,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    changePage,
    refresh,
  };
};

/**
 * Hook quản lý thao tác với sản phẩm
 */
export const useProductActions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productApi.createProduct(data);
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Không thể tạo sản phẩm";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId: number, data: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productApi.updateProduct(productId, data);
      return response.data;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Không thể cập nhật sản phẩm";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      setLoading(true);
      setError(null);
      await productApi.deleteProduct(productId);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Không thể xóa sản phẩm";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async (_productId: number, images: File[]) => {
    try {
      setLoading(true);
      setError(null);
      // Upload multiple images
      const uploadPromises = images.map((file) => productApi.uploadImage(file));
      const responses = await Promise.all(uploadPromises);
      return responses.map((res) => res.data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Không thể upload ảnh";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImages,
  };
};

/**
 * Hook quản lý thống kê
 */
export const useSellerStatistics = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>({
    total_products: 0,
    active_sessions: 0,
    pending_approval: 0,
    total_sold: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchStatistics = useCallback(async () => {
    if (!user?.id) {
      console.warn("⚠️ useSellerStatistics: No user ID available");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("📊 Fetching statistics for seller:", user.id);
      
      // Fetch both products and auctions for statistics
      const [productsResponse, auctionsResponse] = await Promise.all([
        productApi.getProductsBySellerMePage(0, 1000),
        auctionApi.getAllAuctions(),
      ]);

      const rawProducts = Array.isArray(productsResponse.data)
        ? productsResponse.data
        : Array.isArray((productsResponse.data as any)?.content)
        ? (productsResponse.data as any).content
        : [];

      // If the backend returned all products (fallback), make sure to filter to current seller
      const sellerId = user?.id;
      const filteredRawProducts = sellerId
        ? rawProducts.filter((p: any) => Number(p.sellerId ?? p.seller_id ?? p.seller) === Number(sellerId))
        : rawProducts;

      const products = transformProducts(filteredRawProducts);
      const auctions = Array.isArray(auctionsResponse.data) ? auctionsResponse.data : [];

      // Filter auctions by products of current seller
      const sellerProductIds = new Set(products.map(p => p.productId));
      const sellerAuctions = auctions.filter((a: any) => 
        sellerProductIds.has(a.productId || a.product_id)
      );

      const newStats = {
        total_products: products.length,
        active_sessions: sellerAuctions.filter((a: any) => a.status === 'open').length,
        pending_approval: products.filter((p: any) => p.status === 'pending').length,
        total_sold: products.filter((p: any) => p.status === 'sold').length,
      };

      console.log("✅ Updated stats:", newStats);
      setStats(newStats);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Không thể tải thống kê";
      setError(errorMsg);
      console.error("❌ Error fetching statistics:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      console.log("🔄 useSellerStatistics: Effect triggered for user", user.id);
      // Initial fetch on mount or user change
      fetchStatistics();
    }
  }, [user?.id, fetchStatistics, refreshTrigger]);

  return {
    stats,
    loading,
    error,
    refresh: () => {
      console.log("📊 Stats refresh triggered - updating refreshTrigger");
      setRefreshTrigger(prev => prev + 1);
    },
  };
};