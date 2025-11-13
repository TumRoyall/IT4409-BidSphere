import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import auctionApi from "@/api/modules/auction.api";
import type { Product } from "@/api/modules/auction.api";
import { useAuth } from "@/hooks/useAuth";
import { Label } from "@/components/common/Label";
import { Input } from "@/components/common/Input";
import { Search as SearchIcon, AlertCircle } from "lucide-react";

interface FormData {
  productId: string | null;
  startTime: string;
  endTime: string;
  minBidIncrement: number;
}

interface FormErrors {
  [key: string]: string;
}

interface CreateAuctionSessionProps {
  onClose?: () => void;
}

export default function CreateAuctionSession({ onClose }: CreateAuctionSessionProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  // State Management
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    productId: null,
    startTime: "",
    endTime: "",
    minBidIncrement: 10000,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Load products
  const loadProducts = useCallback(async () => {
    try {
      setIsLoadingProducts(true);
      const { default: productApi } = await import("@/api/modules/product.api");
      console.log("Loading products for seller:", user?.id);
      const productsResponse = await productApi.getProductsBySeller(user?.id || 0);
      console.log("Products loaded:", productsResponse.data);
      
      // Log product IDs for debugging
      if (productsResponse.data && Array.isArray(productsResponse.data)) {
        productsResponse.data.forEach((p, idx) => {
          console.log(`Product ${idx}:`, { 
            id: p?.id, 
            product_id: p?.product_id,
            productId: (p as any)?.productId,
            name: p?.name,
            fullObject: p
          });
        });
      }
      
      setProducts(productsResponse.data || []);
    } catch (error: any) {
      console.error("Failed to load products:", error);
      setErrors((prev) => ({
        ...prev,
        products: error?.response?.data?.message || "Failed to load products",
      }));
    } finally {
      setIsLoadingProducts(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    if (!searchQuery.trim()) return products;

    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        (product?.name ?? "").toLowerCase().includes(query) ||
        (product?.category ?? product?.categories ?? "").toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  // Handle product selection
  const handleSelectProduct = useCallback((product: Product) => {
    // Backend returns camelCase, but also support snake_case and id
    const id = product?.productId || product?.product_id || product?.id;
    console.log("Selected product:", product);
    console.log("Product ID extracted:", id, "from fields: productId=", product?.productId, "product_id=", product?.product_id, "id=", product?.id);
    
    if (!id || id <= 0) {
      console.error("Product has no valid ID:", product);
      setErrors((prev) => ({ ...prev, productId: "Selected product has no valid ID" }));
      return;
    }
    
    setSelectedProduct(product);
    setFormData((prev) => ({
      ...prev,
      productId: String(id),
    }));
    setSearchQuery("");
    setShowDropdown(false);
    setErrors((prev) => ({ ...prev, productId: "" }));
  }, []);

  // Handle removing selected product
  const handleRemoveProduct = () => {
    setSelectedProduct(null);
    setFormData((prev) => ({
      ...prev,
      productId: null,
    }));
    setSearchQuery("");
  };

  // Handle form field changes
  const handleFieldChange = useCallback(
    (field: keyof FormData, value: any) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.productId) {
      newErrors.productId = "Please select a product";
    }

    if (!formData.startTime) {
      newErrors.startTime = "Start date and time is required";
    }
    if (!formData.endTime) {
      newErrors.endTime = "End date and time is required";
    }

    if (formData.minBidIncrement <= 0) {
      newErrors.minBidIncrement = "Minimum bid increment must be greater than 0";
    }
    if (formData.minBidIncrement < 1000) {
      newErrors.minBidIncrement = "Minimum bid increment must be at least 1,000 VND";
    }

    if (formData.startTime && formData.endTime) {
      const startDate = new Date(formData.startTime);
      const endDate = new Date(formData.endTime);
      const now = new Date();

      if (isNaN(startDate.getTime())) {
        newErrors.startTime = "Invalid start date format";
      } else if (isNaN(endDate.getTime())) {
        newErrors.endTime = "Invalid end date format";
      } else {
        const minStartTime = new Date(now.getTime() + 60 * 60 * 1000);
        if (startDate < minStartTime) {
          newErrors.startTime = "Start time must be at least 1 hour from now";
        }

        if (endDate <= startDate) {
          newErrors.endTime = "End time must be after start time";
        } else {
          const duration = endDate.getTime() - startDate.getTime();
          const ONE_HOUR = 60 * 60 * 1000;
          const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

          if (duration < ONE_HOUR) {
            newErrors.endTime = "Auction must last at least 1 hour";
          }
          if (duration > THIRTY_DAYS) {
            newErrors.endTime = "Auction cannot exceed 30 days";
          }
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate duration
  const calculateDuration = (): string => {
    if (!formData.startTime || !formData.endTime) return "—";

    const start = new Date(formData.startTime);
    const end = new Date(formData.endTime);
    const diff = end.getTime() - start.getTime();

    if (diff <= 0) return "Invalid";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const startDate = new Date(formData.startTime);
      const endDate = new Date(formData.endTime);

      // Format as ISO 8601 local datetime (without Z for Java LocalDateTime)
      const formatDateTime = (date: Date): string => {
        // Format: yyyy-MM-dd'T'HH:mm:ss
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      };

      console.log("formData.productId before conversion:", formData.productId, typeof formData.productId);
      const productId = Number(formData.productId);
      console.log("productId after conversion:", productId, "isNaN:", isNaN(productId));
      
      if (!productId || isNaN(productId)) {
        throw new Error(`Invalid product ID: ${formData.productId} (converted to ${productId})`);
      }

      const payload = {
        productId,
        startTime: formatDateTime(startDate),
        endTime: formatDateTime(endDate),
      };

      console.log("📤 Auction payload:", payload);
      const response = await auctionApi.createAuction(payload);
      const auctionId = response.data?.auctionId || response.data?.id || response.data?.auction_id;
      
      if (!auctionId) {
        throw new Error(`Invalid response: no auctionId found in response.data = ${JSON.stringify(response.data)}`);
      }

      navigate(`/auctions/${auctionId}`, {
        state: { message: "Auction created successfully" },
      });
      onClose?.();
    } catch (error: any) {
      let errorMsg = "Failed to create auction";
      
      if (error?.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error?.response?.data?.error) {
        errorMsg = error.response.data.error;
      } else if (error?.message) {
        errorMsg = error.message;
      }
      
      setErrors((prev) => ({ ...prev, submit: String(errorMsg) }));
      console.error("Create auction error:", error);
      console.error("Response data:", error?.response?.data);
      console.error("Response status:", error?.response?.status);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    onClose?.();
    navigate("/seller");
  };

  const isFormValid =
    formData.productId &&
    formData.startTime &&
    formData.endTime &&
    formData.minBidIncrement > 0;

  const durationInfo = calculateDuration();

  return (
    <section className="product-details-section" aria-busy={!!isLoading}>
      {/* Error Alert */}
      {errors.submit && (
        <div className="section-group" style={{ background: "#fee", borderLeft: "4px solid #e74c3c", padding: "16px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <AlertCircle size={20} style={{ color: "#e74c3c", flexShrink: 0 }} />
            <div>
              <h3 style={{ margin: "0 0 4px 0", fontWeight: 600, color: "#c33" }}>
                Creation Failed
              </h3>
              <p style={{ margin: 0, color: "#e74c3c", fontSize: "14px" }}>
                {errors.submit}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Product Selection */}
      <div className="section-group">
        <h2 className="section-title">Select Product</h2>

        {!selectedProduct ? (
          <div className="form-field">
            <Label className="field-label" htmlFor="auction-product">
              Product *
            </Label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SearchIcon
                  size={18}
                  style={{
                    position: "absolute",
                    left: "12px",
                    color: "#999",
                    pointerEvents: "none",
                  }}
                />
                <input
                id="auction-product"
                type="text"
                placeholder={
                isLoadingProducts
                ? "Loading products..."
                : "Search product by name or category..."
                }
                value={searchQuery}
                onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 300)}
                disabled={isLoadingProducts}
                className="form-input"
                style={{ paddingLeft: "40px" }}
                />
              </div>

              {/* Dropdown */}
              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderTop: "none",
                    borderRadius: "0 0 6px 6px",
                    maxHeight: "300px",
                    overflowY: "auto",
                    zIndex: 10,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {isLoadingProducts ? (
                    <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
                      <div
                        style={{
                          display: "inline-block",
                          width: "16px",
                          height: "16px",
                          border: "2px solid #f3f3f3",
                          borderTop: "2px solid #667eea",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                          marginBottom: "8px",
                        }}
                      />
                      <p style={{ margin: "8px 0 0 0" }}>Loading products...</p>
                    </div>
                  ) : filteredProducts.length > 0 ? (
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                      {filteredProducts.map((product, index) => (
                        <li
                          key={product.id || product.product_id || `product-${index}`}
                          onClick={() => handleSelectProduct(product)}
                          style={{
                            padding: "12px 16px",
                            borderBottom: "1px solid #eee",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.background = "#f9f9f9")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.background = "transparent")
                          }
                        >
                          <div style={{ flex: 1 }}>
                            <p
                              style={{
                                margin: 0,
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "#1a1a1a",
                              }}
                            >
                              {product.name}
                            </p>
                            <p
                            style={{
                            margin: "2px 0 0 0",
                            fontSize: "12px",
                            color: "#999",
                            }}
                            >
                            {product.categories || product.category}
                            </p>
                          </div>
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#667eea",
                              whiteSpace: "nowrap",
                              marginLeft: "12px",
                            }}
                          >
                            ₫
                            {(
                              product.startPrice ?? product.start_price ?? 0
                            ).toLocaleString("vi-VN")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        color: "#999",
                        fontSize: "14px",
                      }}
                    >
                      No products found
                    </div>
                  )}
                </div>
              )}

              {errors.productId && (
                <span style={{ color: "#ef4444", fontSize: "14px", marginTop: "4px", display: "block" }}>
                  {errors.productId}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div
            style={{
              background: "#f8fafc",
              border: "2px solid #667eea",
              borderRadius: "8px",
              padding: "16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 600 }}>
                {selectedProduct.name}
              </h4>
              <p style={{ margin: "0 0 4px 0", fontSize: "12px", color: "#666" }}>
                {selectedProduct.category || selectedProduct.categories}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#667eea",
                  fontWeight: 600,
                }}
              >
                Start: ₫
                {(
                  selectedProduct.startPrice ?? selectedProduct.start_price ?? 0
                ).toLocaleString("vi-VN")}
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemoveProduct}
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#ef4444",
                padding: 0,
                width: "24px",
                height: "24px",
              }}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {selectedProduct && (
        <>
          {/* Auction Timing */}
          <div className="section-group">
            <h2 className="section-title">Auction Schedule</h2>

            <div className="form-row">
              <div className="form-field flex-1">
                <Label className="field-label" htmlFor="auction-start">
                  Start Date & Time *
                </Label>
                <Input
                  id="auction-start"
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) =>
                    handleFieldChange("startTime", e.target.value)
                  }
                  className="form-input"
                  aria-invalid={!!errors.startTime}
                />
                {errors.startTime && (
                  <span style={{ color: "#ef4444", fontSize: "14px" }}>
                    {errors.startTime}
                  </span>
                )}
              </div>

              <div className="form-field flex-1">
                <Label className="field-label" htmlFor="auction-end">
                  End Date & Time *
                </Label>
                <Input
                  id="auction-end"
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) =>
                    handleFieldChange("endTime", e.target.value)
                  }
                  className="form-input"
                  aria-invalid={!!errors.endTime}
                />
                {errors.endTime && (
                  <span style={{ color: "#ef4444", fontSize: "14px" }}>
                    {errors.endTime}
                  </span>
                )}
              </div>
            </div>

            {formData.startTime && formData.endTime && (
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  padding: "12px 16px",
                  marginTop: "12px",
                }}
              >
                <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                  Duration:{" "}
                  <strong style={{ color: "#667eea" }}>{durationInfo}</strong>
                </p>
              </div>
            )}
          </div>

          {/* Bid Settings */}
          <div className="section-group">
            <h2 className="section-title">Bid Settings</h2>

            <div className="form-field">
              <Label className="field-label" htmlFor="auction-increment">
                Minimum Bid Increment (VNĐ) *
              </Label>
              <Input
                id="auction-increment"
                type="number"
                value={formData.minBidIncrement}
                onChange={(e) =>
                  handleFieldChange("minBidIncrement", parseInt(e.target.value) || 0)
                }
                min="1000"
                step="1000"
                className="form-input"
                aria-invalid={!!errors.minBidIncrement}
              />
              {errors.minBidIncrement && (
                <span style={{ color: "#ef4444", fontSize: "14px" }}>
                  {errors.minBidIncrement}
                </span>
              )}
              <p
                style={{
                  fontSize: "13px",
                  color: "#999",
                  marginTop: "4px",
                  margin: "4px 0 0 0",
                }}
              >
                Minimum 1,000 VNĐ (each bid must increase by this amount)
              </p>
            </div>
          </div>

          {/* Preview Section */}
          <div className="section-group">
            <h2 className="section-title">Auction Preview</h2>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              {/* Product Info */}
              <div style={{ marginBottom: "16px" }}>
                <h4
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#666",
                    textTransform: "uppercase",
                  }}
                >
                  Product Information
                </h4>
                <div
                  style={{
                    display: "grid",
                    gap: "8px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#666", fontWeight: 500, fontSize: "13px" }}>
                      Product Name:
                    </span>
                    <span style={{ color: "#1a1a1a", fontWeight: 600, fontSize: "13px" }}>
                      {selectedProduct.name}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#666", fontWeight: 500, fontSize: "13px" }}>
                      Category:
                    </span>
                    <span style={{ color: "#1a1a1a", fontWeight: 600, fontSize: "13px" }}>
                      {selectedProduct.category || selectedProduct.categories}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#666", fontWeight: 500, fontSize: "13px" }}>
                      Start Price:
                    </span>
                    <span style={{ color: "#667eea", fontWeight: 600, fontSize: "13px" }}>
                      ₫
                      {(
                        selectedProduct.startPrice ?? selectedProduct.start_price ?? 0
                      ).toLocaleString("vi-VN")}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ height: "1px", background: "#e2e8f0", margin: "16px 0" }} />

              {/* Schedule Info */}
              <div style={{ marginBottom: "16px" }}>
                <h4
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#666",
                    textTransform: "uppercase",
                  }}
                >
                  Schedule
                </h4>
                <div
                  style={{
                    display: "grid",
                    gap: "8px",
                  }}
                >
                  {formData.startTime && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#666", fontWeight: 500, fontSize: "13px" }}>
                        Starts:
                      </span>
                      <span style={{ color: "#1a1a1a", fontWeight: 600, fontSize: "13px" }}>
                        {new Date(formData.startTime).toLocaleString("vi-VN")}
                      </span>
                    </div>
                  )}
                  {formData.endTime && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#666", fontWeight: 500, fontSize: "13px" }}>
                        Ends:
                      </span>
                      <span style={{ color: "#1a1a1a", fontWeight: 600, fontSize: "13px" }}>
                        {new Date(formData.endTime).toLocaleString("vi-VN")}
                      </span>
                    </div>
                  )}
                  {formData.startTime && formData.endTime && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#666", fontWeight: 500, fontSize: "13px" }}>
                        Duration:
                      </span>
                      <span style={{ color: "#667eea", fontWeight: 600, fontSize: "13px" }}>
                        {durationInfo}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ height: "1px", background: "#e2e8f0", margin: "16px 0" }} />

              {/* Bid Settings Preview */}
              <div>
                <h4
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#666",
                    textTransform: "uppercase",
                  }}
                >
                  Bid Settings
                </h4>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#666", fontWeight: 500, fontSize: "13px" }}>
                    Min Increment:
                  </span>
                  <span style={{ color: "#667eea", fontWeight: 600, fontSize: "13px" }}>
                    ₫{formData.minBidIncrement.toLocaleString("vi-VN")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Action Buttons */}
      <div className="confirmation-section" style={{ marginTop: "30px" }}>
        <button
          type="button"
          onClick={handleCancel}
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: isLoading ? "not-allowed" : "pointer",
            color: "#667eea",
            transition: "all 0.2s",
            opacity: isLoading ? 0.6 : 1,
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading || !isFormValid}
          style={{
            padding: "10px 20px",
            background: "#667eea",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: isLoading || !isFormValid ? "not-allowed" : "pointer",
            color: "white",
            transition: "all 0.2s",
            opacity: isLoading || !isFormValid ? 0.6 : 1,
          }}
        >
          {isLoading ? "Creating Auction..." : "Create Auction Session"}
        </button>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
