// src/modules/auction/components/ProductSelector.tsx
import { useState, useCallback, useMemo } from "react";
import type { Product } from "@/api/modules/auction.api";
import { Search, Check, AlertCircle } from "lucide-react";
import { Input } from "@/components/common/Input";
import { Label } from "@/components/common/Label";
import "@/styles/product-selector.css";

interface ProductSelectorProps {
  products: Product[];
  selectedProduct: Product | null;
  onSelectProduct: (product: Product | null) => void;
  isLoading?: boolean;
  error?: string;
}

/**
 * Product selector component with search and filtering capabilities.
 * Displays available products for auction session creation.
 */
export const ProductSelector = ({
  products,
  selectedProduct,
  onSelectProduct,
  isLoading = false,
  error,
}: ProductSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!products || products.length === 0) return [];

    // If no search query, show all products
    if (!searchQuery.trim()) return products;

    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        (product?.name ?? "").toLowerCase().includes(query) ||
        (product?.category ?? product?.categories ?? "").toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const handleSelectProduct = useCallback(
    (product: Product) => {
      onSelectProduct(product);
      setIsDropdownOpen(false);
      setSearchQuery("");
    },
    [onSelectProduct]
  );

  const handleRemoveProduct = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onSelectProduct(null);
      setSearchQuery("");
    },
    [onSelectProduct]
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    // Open dropdown when typing (always show list on any interaction)
    setIsDropdownOpen(true);
  }, []);

  return (
    <div className="product-selector">
      <div className="product-selector-header">
        <Label htmlFor="product-search" className="form-field-label">
          Select Product <span className="form-field-required">*</span>
        </Label>
        <span className="product-selector-count">
          {products.length} available
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="validation-error">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Search Input */}
      <div className="product-selector-search">
        <Search className="search-icon" size={18} />
        <Input
        id="product-search"
        type="text"
        placeholder={
        isLoading ? "Loading products..." : "Click to select a product..."
        }
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        onFocus={() => {
        setIsDropdownOpen(true);
        }}
        onBlur={() => {
          // Close dropdown after a small delay to allow click selection
          setTimeout(() => setIsDropdownOpen(false), 200);
        }}
        disabled={isLoading}
        className="search-input"
        aria-autocomplete="list"
          aria-expanded={isDropdownOpen}
           aria-controls="product-dropdown"
         />
      </div>

      {/* Dropdown List */}
      {isDropdownOpen && (
        <div className="product-dropdown" id="product-dropdown" role="listbox">
          {isLoading ? (
            <div className="dropdown-loading">
              <div className="spinner" />
              Loading products...
            </div>
          ) : filteredProducts.length > 0 ? (
          <ul className="dropdown-list">
          {filteredProducts.map((product, index) => (
          <li
          key={product.id || product.product_id || `product-${index}`}
          role="option"
                  aria-selected={
                    selectedProduct?.id === product.id ||
                    selectedProduct?.product_id === product.product_id
                  }
                  onClick={() => handleSelectProduct(product)}
                  className="dropdown-item"
                >
                  <div className="dropdown-item-image-wrapper">
                    <img
                      src={product.imageUrl || product.image_url || "/placeholder-product.png"}
                      alt={product.name}
                      className="dropdown-item-image"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-product.png";
                      }}
                    />
                  </div>

                  <div className="dropdown-item-content">
                    <div className="dropdown-item-header">
                      <h4 className="dropdown-item-name">{product.name}</h4>
                      {selectedProduct &&
                        (selectedProduct.id === product.id ||
                          selectedProduct.product_id === product.product_id) && (
                          <Check className="dropdown-item-check" size={20} />
                        )}
                    </div>

                    <p className="dropdown-item-category">
                      {product.category || product.categories || "Uncategorized"}
                    </p>

                    <div className="dropdown-item-meta">
                      <span className="meta-item">
                        Start Price: ₫{(
                          product.startPrice ?? product.start_price ?? 0
                        ).toLocaleString("vi-VN")}
                      </span>
                      <span className="meta-item">
                        Deposit: ₫{(product.deposit ?? 0).toLocaleString("vi-VN")}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="dropdown-empty">
              <p>No products found matching your search</p>
              <p className="empty-hint">Try different keywords</p>
            </div>
          )}
        </div>
      )}

      {/* Selected Product Card */}
      {selectedProduct && (
        <div className="selected-product-card">
          <div className="selected-product-image-wrapper">
            <img
              src={
                selectedProduct.imageUrl ||
                selectedProduct.image_url ||
                "/placeholder-product.png"
              }
              alt={selectedProduct.name}
              className="selected-product-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-product.png";
              }}
            />
          </div>

          <div className="selected-product-content">
            <div className="selected-product-header">
              <h3 className="selected-product-name">{selectedProduct.name}</h3>
              <button
                type="button"
                onClick={handleRemoveProduct}
                className="selected-product-remove"
                aria-label="Remove selected product"
                title="Remove selection"
              >
                ✕
              </button>
            </div>

            <p className="selected-product-category">
              {selectedProduct.category || selectedProduct.categories || "Uncategorized"}
            </p>

            <div className="selected-product-details">
              <div className="detail-row">
                <span className="detail-label">Start Price:</span>
                <span className="detail-value">
                  ₫{(selectedProduct.startPrice ?? selectedProduct.start_price ?? 0).toLocaleString("vi-VN")}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Deposit Required:</span>
                <span className="detail-value">
                  ₫{(selectedProduct.deposit ?? 0).toLocaleString("vi-VN")}
                </span>
              </div>
              {selectedProduct.description && (
                <div className="detail-row description">
                  <p>{selectedProduct.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Help Text */}
      {!selectedProduct && (
        <p className="product-selector-hint">
          Start typing to search for products you want to auction
        </p>
      )}
    </div>
  );
};

export default ProductSelector;
