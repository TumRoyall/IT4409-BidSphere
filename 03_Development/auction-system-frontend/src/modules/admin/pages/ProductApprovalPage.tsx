import React, { useState, useEffect } from "react";
import { Filter, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/common/Button";
import ProductApprovalModal, {
  type ProductApprovalRequest,
} from "../components/ProductApprovalModal";
import productApi from "@/api/modules/product.api";
import type { Product } from "@/modules/product/types";
import "@/modules/admin/styles/ProductApprovalPage.css";

const AdminProductApprovalPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [statusFilter, setStatusFilter] = useState<"pending" | "all">(
    "pending"
  );
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [allPendingProducts, setAllPendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadAllPendingProducts();
  }, [statusFilter]);

  // Load ALL products (not paginated) to calculate correct totalPages
  const loadAllPendingProducts = async () => {
    try {
      setLoading(true);
      setPage(0);
      // Fetch all products (need to get multiple pages if data > 10)
      let allProducts: any[] = [];
      let pageNum = 0;
      let hasMore = true;

      while (hasMore) {
        const response = await productApi.getProductsPage(pageNum);
        const products = response.data.content || [];
        allProducts = [...allProducts, ...products];
        hasMore = products.length === 10; // If less than 10, it's the last page
        pageNum++;
      }

      // Filter based on statusFilter
      let filteredProducts = allProducts;
      if (statusFilter === "pending") {
        filteredProducts = allProducts.filter(
          (p: any) => p.status === "pending" || p.status === "PENDING"
        );
      }
      // if statusFilter === "all", use all products without filtering

      setAllPendingProducts(filteredProducts as Product[]);
      // Calculate pages (showing 10 per page)
      const pages = Math.ceil(filteredProducts.length / 10) || 1;
      setTotalPages(pages);
    } catch (error) {
      console.error("Failed to load products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Get paginated slice of pending products
  const loadPendingProducts = () => {
    const startIdx = page * 10;
    const endIdx = startIdx + 10;
    const paginatedProducts = allPendingProducts.slice(startIdx, endIdx);
    setProducts(paginatedProducts);
  };

  useEffect(() => {
    loadPendingProducts();
  }, [page, allPendingProducts]);

  const handleApprove = async (
    productId: number,
    data: ProductApprovalRequest
  ) => {
    try {
      await productApi.approveProduct(productId, data);
      toast.success("Product approved!");
      // Reload all products from API to reflect changes immediately
      await loadAllPendingProducts();
      setSelectedProduct(null);
    } catch (error: any) {
      console.error("❌ Approval failed:", error);
      const errorMsg =
        error?.response?.data?.message || "Failed to approve product";
      throw new Error(errorMsg);
    }
  };

  const handleReject = async (productId: number, reason: string) => {
    try {
      const data: ProductApprovalRequest = {
        deposit: 0,
        estimatePrice: 0,
        status: "rejected",
        rejectionReason: reason,
      };
      await productApi.approveProduct(productId, data);
      toast.success("Product rejected!");
      // Reload all products from API to reflect changes immediately
      await loadAllPendingProducts();
      setSelectedProduct(null);
    } catch (error: any) {
      console.error("❌ Rejection failed:", error);
      const errorMsg =
        error?.response?.data?.message || "Failed to reject product";
      throw new Error(errorMsg);
    }
  };

  const formatPrice = (price: number | string) => {
    const num = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(num || 0);
  };

  const buildStatusClass = (status?: string) => {
    const normalized = status?.toLowerCase() || "unknown";
    return `pa-badge status-${normalized}`;
  };

  const pillText =
    statusFilter === "pending"
      ? `${allPendingProducts.length} waiting for a decision`
      : `${allPendingProducts.length} products loaded`;

  return (
    <div className="product-approval-page">
      <div className="pa-header">
        <div>
          <p className="pa-eyebrow">
            Review and approve pending auction submissions
          </p>
          <h1 className="pa-title">📋 Auction Approvals</h1>
        </div>
        <div className="pa-pill">{pillText}</div>
      </div>

      <div className="pa-controls">
        <Button
          onClick={loadPendingProducts}
          disabled={loading}
          className="pa-control-btn"
        >
          <RefreshCw size={16} /> Refresh
        </Button>

        <div className="pa-filter">
          <Filter size={16} className="pa-filter-icon" />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "pending" | "all");
              setPage(0);
            }}
            className="pa-select"
          >
            <option value="pending">Pending only</option>
            <option value="all">All products</option>
          </select>
        </div>

        <div className="pa-meta">
          Showing {products.length} product{products.length !== 1 ? "s" : ""}
        </div>
      </div>

      {loading ? (
        <div className="pa-state pa-loading">Loading pending products...</div>
      ) : products.length === 0 ? (
        <div className="pa-state pa-empty">
          ✅ No pending products to approve
        </div>
      ) : (
        <div className="pa-grid">
          {products.map((product) => (
            <div
              className="pa-card"
              key={
                product.productId ||
                (product as any).id ||
                String(Math.random())
              }
            >
              <div className={`pa-image ${product.imageUrl ? "" : "pa-image--empty"}`}>
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} />
                ) : (
                  <div className="pa-image-fallback">No image</div>
                )}
              </div>

              <div className="pa-card-body">
                <div className="pa-badge-row">
                  <span className={buildStatusClass(product.status)}>
                    {(product.status || "unknown").toUpperCase()}
                  </span>
                </div>

                <h3 className="pa-name">{product.name}</h3>
                <p className="pa-desc">{product.description}</p>

                <div className="pa-info-grid">
                  <div className="pa-info-card">
                    <span className="pa-info-label">Start price</span>
                    <p className="pa-info-value">
                      {formatPrice(product.startPrice || 0)}
                    </p>
                  </div>
                  <div className="pa-info-card">
                    <span className="pa-info-label">Category</span>
                    <p className="pa-info-value">{product.category}</p>
                  </div>
                </div>

                {product.status?.toLowerCase() === "pending" && (
                  <Button
                    onClick={() => setSelectedProduct(product)}
                    className="pa-action-btn"
                  >
                    Review &amp; Approve
                  </Button>
                )}
                {product.status?.toLowerCase() === "approved" && (
                  <Button
                    onClick={() =>
                      handleReject(
                        product.productId || (product as any).id,
                        "Admin cancelled this product"
                      )
                    }
                    className="pa-action-btn pa-danger"
                  >
                    Cancel Product
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pa-pagination">
          <Button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0 || loading}
            variant="outline"
          >
            Previous
          </Button>
          <div className="pa-page-meta">
            Page {page + 1} of {totalPages}
          </div>
          <Button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page >= totalPages - 1 || loading}
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}

      {selectedProduct && (
        <div
          className="pa-modal-backdrop"
          onClick={() => setSelectedProduct(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ProductApprovalModal
              product={selectedProduct}
              loading={loading}
              onApprove={handleApprove}
              onReject={handleReject}
              onCancel={() => setSelectedProduct(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductApprovalPage;
