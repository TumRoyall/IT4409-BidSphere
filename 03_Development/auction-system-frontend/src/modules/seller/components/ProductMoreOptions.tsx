// src/modules/seller/components/ProductMoreOptions.tsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, FileText, BarChart3 } from "lucide-react";
import type { Product } from "../types/seller.types";
import "@/styles/modules/seller/index.css";

interface ProductMoreOptionsProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  onViewAuctions?: (product: Product) => void;
}

const ProductMoreOptions: React.FC<ProductMoreOptionsProps> = ({
  product,
  onViewDetails,
  onViewAuctions,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuItemClick = (callback?: (product: Product) => void) => {
    if (callback) {
      callback(product);
    }
    setIsOpen(false);
  };

  return (
    <div className="product-more-options" ref={menuRef}>
      <button
        className="more-options-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="More options"
        aria-expanded={isOpen}
      >
        <ChevronDown size={20} />
      </button>

      {isOpen && (
        <div className="more-options-menu">
          {onViewDetails && (
            <button
              className="menu-item"
              onClick={() => handleMenuItemClick(onViewDetails)}
            >
              <FileText size={16} />
              <span>View Details</span>
            </button>
          )}

          {onViewAuctions && (
            <button
              className="menu-item"
              onClick={() => handleMenuItemClick(onViewAuctions)}
            >
              <BarChart3 size={16} />
              <span>View Auctions</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductMoreOptions;
