import { useNavigate } from "react-router-dom";
import type { ProductResponse } from "@/api/modules/product.api";
import "@/styles/product-list.css";

interface ProductCardProps {
  product: ProductResponse;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.productId || product.id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      {/* Product Image */}
      <div className="product-card-image-container">
        <img
        src={product.imageUrl || "/placeholder.png"}
        alt={product.name}
        className="product-card-image"
        />
        {product.status && (
          <div className={`product-card-badge product-card-badge-${product.status.toLowerCase()}`}>
            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-card-content">
        <h3 className="product-card-title">{product.name}</h3>

        {product.description && (
          <p className="product-card-description">
            {product.description.substring(0, 80)}
            {product.description.length > 80 ? "..." : ""}
          </p>
        )}

        {product.categories && (
        <p className="product-card-category">{product.categories}</p>
        )}

        {/* Price Info */}
        <div className="product-card-price-section">
        {product.startPrice && (
        <div className="product-card-price-item">
        <span className="product-card-price-label">Start Price:</span>
        <span className="product-card-price">${product.startPrice.toFixed(2)}</span>
        </div>
        )}
          {product.deposit && (
            <div className="product-card-price-item">
              <span className="product-card-price-label">Deposit:</span>
              <span className="product-card-deposit">${product.deposit.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Date Info */}
        <div className="product-card-date-info">
        {product.createdAt && (
        <small className="product-card-date">
        Created: {new Date(product.createdAt).toLocaleDateString()}
        </small>
        )}
        </div>
      </div>

      {/* Hover Button */}
      <div className="product-card-hover-button">View Details</div>
    </div>
  );
}
