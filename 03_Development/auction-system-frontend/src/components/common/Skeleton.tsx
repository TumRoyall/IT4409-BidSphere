import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="product-card animate-pulse">
      {/* Product Content */}
      <div className="product-content">
        {/* Product Image */}
        <div className="product-image-wrapper">
          <div className="w-full h-48 bg-gray-200 rounded-lg" />
        </div>

        {/* Product Details */}
        <div className="product-details">
          {/* Header with title and status */}
          <div className="product-header">
            <div className="product-title-group">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-5 bg-gray-200 rounded w-20" />
            </div>
          </div>

          {/* Description */}
          <div className="product-description space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>

          {/* Product Info Grid */}
          <div className="product-info-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="info-item">
                <div className="h-4 bg-gray-200 rounded w-16 mb-2" />
                <div className="h-5 bg-gray-200 rounded w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Actions */}
        <div className="product-actions">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 w-10 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProductListSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="approved-products">
      <div className="products-header">
        <div className="h-8 bg-gray-200 rounded w-48" />
        <div className="h-6 bg-gray-200 rounded w-32" />
      </div>

      <div className="products-list">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
