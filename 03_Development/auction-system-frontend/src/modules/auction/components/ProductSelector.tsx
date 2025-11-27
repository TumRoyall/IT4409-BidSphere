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

const ProductSelector = ({
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
    if (!searchQuery.trim()) return products;

    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        (product.name ?? "").toLowerCase().includes(query) ||
        (product.category ?? "").toLowerCase().includes(query)
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
    setIsDropdownOpen(true); // Open dropdown when typing
  }, []);

  // Error display
  const errorMessage = error ? (
    <div className="validation-error">
      <AlertCircle size={16} />
      <span>{error}</span>
    </div>
  ) : null;

  // Product selection dropdown
  const productDropdown = isDropdownOpen && (
    <div className="product-dropdown" role="listbox">
      {isLoading ? (
        <div className="dropdown-loading">
          <div className="spinner" />
          Loading products...
        </div>
      ) : filteredProducts.length ? (
        <ul className="dropdown-list">
          {filteredProducts.map((product, index) => (
            <li
              key={product.id || `product-${index}`}
              role="option"
              aria-selected={selectedProduct?.id === product.id}
              onClick={() => handleSelectProduct(product)}
              className="dropdown-item"
            >
              <div className="dropdown-item-image-wrapper">
                <img
                  src={product.imageUrl || "/placeholder-product.png"}
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
                  {selectedProduct?.id === product.id && (
                    <Check className="dropdown-item-check" size={20} />
                  )}
                </div>
                <p className="dropdown-item-category">
                  {product.category || "Uncategorized"}
                </p>
                <div className="dropdown-item-meta">
                  <span className="meta-item">
                    Start Price: ₫{(product.startPrice ?? 0).toLocaleString("vi-VN")}
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
  );

  // Selected product card
  const selectedProductCard = selectedProduct && (
    <div className="selected-product-card">
      <div className="selected-product-image-wrapper">
        <img
          src={selectedProduct.imageUrl || "/placeholder-product.png"}
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
          >
            ✕
          </button>
        </div>
        <p className="selected-product-category">
          {selectedProduct.category || "Uncategorized"}
        </p>
        <div className="selected-product-details">
          <div className="detail-row">
            <span className="detail-label">Start Price:</span>
            <span className="detail-value">
              ₫{(selectedProduct.startPrice ?? 0).toLocaleString("vi-VN")}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Deposit:</span>
            <span className="detail-value">
              ₫{(selectedProduct.deposit ?? 0).toLocaleString("vi-VN")}
            </span>
          </div>
          {selectedProduct.description && (
            <div className="description">{selectedProduct.description}</div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="product-selector">
      <div className="product-selector-header">
        <Label htmlFor="product-search">Select Product *</Label>
        <span>{products.length} available</span>
      </div>

      {errorMessage}
      <div className="product-selector-search">
        <Search className="search-icon" size={18} />
        <Input
          id="product-search"
          type="text"
          placeholder={isLoading ? "Loading..." : "Search for a product..."}
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
          disabled={isLoading}
          aria-autocomplete="list"
          aria-expanded={isDropdownOpen}
        />
      </div>

      {productDropdown}
      {selectedProductCard}

      {!selectedProduct && (
        <p className="product-selector-hint">
          Start typing to search for products you want to auction
        </p>
      )}
    </div>
  );
};

export default ProductSelector;
