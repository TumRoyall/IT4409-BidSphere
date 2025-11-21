import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/common/Button";
import ProductApprovalModal, { type ProductApprovalRequest } from "../components/ProductApprovalModal";
import productApi from "@/api/modules/product.api";
import type { Product } from "@/modules/product/types";
import { useAuth } from "@/hooks/useAuth";
import { USER_ROLES } from "@/utils/constants";
import "@/styles/seller.css";

const AdminProductApprovalPage: React.FC = () => {
  const { user } = useAuth();
  
  // Check authorization - allow ADMIN and MODERATOR
  const rawRole = (user as any)?.role || (user as any)?.roles || (user as any)?.roleName || "";
  const role = String(rawRole).toUpperCase();
  
  if (role !== USER_ROLES.ADMIN && role !== USER_ROLES.MODERATOR) {
    return <Navigate to="/" replace />;
  }
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [statusFilter, setStatusFilter] = useState<"pending" | "all">("pending");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [allPendingProducts, setAllPendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadAllPendingProducts();
  }, [statusFilter]);

  // Load ALL pending products (not paginated) to calculate correct totalPages
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
      
      // Filter pending
      const pendingProducts = allProducts.filter(
        (p: any) => p.status === "pending" || p.status === "PENDING"
      );
      
      setAllPendingProducts(pendingProducts as Product[]);
      // Calculate pages (showing 10 per page)
      const pages = Math.ceil(pendingProducts.length / 10) || 1;
      setTotalPages(pages);
    } catch (error) {
      console.error("Failed to load pending products:", error);
      alert("❌ Failed to load pending products");
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

  const handleApprove = async (productId: number, data: ProductApprovalRequest) => {
    try {
      console.log("📤 Sending approval request:", JSON.stringify(data, null, 2));
      await productApi.approveProduct(productId, data);
      console.log("✅ Product approved successfully!");
      alert("✅ Product approved!");
      loadPendingProducts();
      setSelectedProduct(null);
    } catch (error: any) {
      console.error("❌ Approval failed:", error);
      const errorMsg = error?.response?.data?.message || "Failed to approve product";
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
      console.log("📤 Sending rejection request:", JSON.stringify(data, null, 2));
      await productApi.approveProduct(productId, data);
      console.log("✅ Product rejected successfully!");
      alert("✅ Product rejected!");
      loadPendingProducts();
      setSelectedProduct(null);
    } catch (error: any) {
      console.error("❌ Rejection failed:", error);
      const errorMsg = error?.response?.data?.message || "Failed to reject product";
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

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          marginBottom: "32px",
          paddingBottom: "24px",
          borderBottom: "2px solid #e2e8f0",
        }}
      >
        <h1
          style={{
            margin: "0 0 8px 0",
            fontSize: "28px",
            fontWeight: 700,
            color: "#1a202c",
          }}
        >
          📋 Product Approvals
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#718096",
            fontWeight: 500,
          }}
        >
          Review and approve pending product submissions
        </p>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "24px",
          alignItems: "center",
        }}
      >
        <Button
          onClick={loadPendingProducts}
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderRadius: "6px",
          }}
        >
          <RefreshCw size={16} />
          Refresh
        </Button>

        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            background: "#f7fafc",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #cbd5e0",
          }}
        >
          <Filter size={16} style={{ color: "#718096" }} />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as "pending" | "all");
              setPage(0);
            }}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "13px",
              fontWeight: 500,
              color: "#2d3748",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="pending">Pending Only</option>
            <option value="all">All Products</option>
          </select>
        </div>

        <div style={{ marginLeft: "auto", fontSize: "13px", color: "#718096" }}>
          {products.length > 0 && (
            <span>
              Showing <strong>{products.length}</strong> product{products.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Products List */}
      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#718096",
            fontSize: "14px",
          }}
        >
          Loading pending products...
        </div>
      ) : products.length === 0 ? (
        <div
          style={{
            background: "#f0fdf4",
            border: "2px solid #86efac",
            borderRadius: "8px",
            padding: "32px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, fontSize: "14px", color: "#166534", fontWeight: 500 }}>
            ✅ No pending products to approve!
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {products.map((product) => (
            <div
              key={(product as any).id || product.product_id || String(Math.random())}
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                overflow: "hidden",
                transition: "box-shadow 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLElement;
                target.style.boxShadow = "none";
              }}
            >
              {/* Image */}
              {product.image_url && (
                <div
                  style={{
                    width: "100%",
                    height: "200px",
                    background: "#f7fafc",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              {/* Content */}
              <div style={{ padding: "16px" }}>
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#1a202c",
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {product.name}
                </h3>

                <p
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "12px",
                    color: "#718096",
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {product.description}
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    marginBottom: "12px",
                    fontSize: "12px",
                  }}
                >
                  <div
                    style={{
                      background: "#f7fafc",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <span style={{ color: "#718096", fontSize: "10px", fontWeight: 600 }}>
                      START PRICE
                    </span>
                    <p
                      style={{
                        color: "#2d3748",
                        fontWeight: 600,
                        margin: "4px 0 0 0",
                      }}
                    >
                      {formatPrice(product.start_price || 0)}
                    </p>
                  </div>
                  <div
                    style={{
                      background: "#f7fafc",
                      padding: "8px",
                      borderRadius: "6px",
                      border: "1px solid #e2e8f0",
                    }}
                  >
                    <span style={{ color: "#718096", fontSize: "10px", fontWeight: 600 }}>
                      CATEGORY
                    </span>
                    <p
                      style={{
                        color: "#2d3748",
                        fontWeight: 600,
                        margin: "4px 0 0 0",
                        fontSize: "11px",
                      }}
                    >
                      {product.categories}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedProduct(product)}
                  style={{
                    width: "100%",
                    borderRadius: "6px",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                  }}
                >
                  Review & Approve
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            marginTop: "24px",
          }}
        >
          <Button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0 || loading}
            variant="outline"
          >
            Previous
          </Button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "0 12px",
              fontSize: "13px",
              color: "#718096",
              fontWeight: 500,
            }}
          >
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

      {/* Approval Modal */}
      {selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
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
