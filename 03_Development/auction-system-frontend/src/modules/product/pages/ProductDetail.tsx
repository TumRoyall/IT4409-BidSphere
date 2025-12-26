import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, DollarSign, Tag } from "lucide-react";
import productApi from "@/api/modules/product.api";
import type { ProductResponse } from "@/api/modules/product.api";
import { Button } from "@/components/common/Button";
import "@/styles/product-list.css";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const response = await productApi.getProductById(Number(id));
      const data = response.data as ProductResponse;

      // Only show approved products to bidders
      if (data.status?.toLowerCase() !== "approved") {
        setError("This product is not available for auction");
        return;
      }

      setProduct(data);
      setSelectedImage(data.imageUrl || "");
    } catch (err: any) {
      console.error("Failed to load product:", err);
      setError(
        err?.response?.data?.message || "Failed to load product details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAuction = () => {
    navigate("/seller/auctions/create", {
      state: { productId: id, productName: product?.name },
    });
  };

  const handleGoBack = () => {
    navigate("/products");
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="product-detail-loading-spinner">
          <div className="product-detail-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-container">
        <button onClick={handleGoBack} className="product-detail-back-button">
          <ArrowLeft size={20} />
          Back to Products
        </button>
        <div className="product-detail-error-state">
          <p>{error || "Product not found"}</p>
          <Button onClick={handleGoBack}>Return to Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      {/* Back Button */}
      <button onClick={handleGoBack} className="product-detail-back-button">
        <ArrowLeft size={20} />
        Back to Products
      </button>

      {/* Main Content */}
      <div className="product-detail-content">
        {/* Image Section */}
        <div className="product-detail-image-section">
          <div className="product-detail-main-image">
            <img
              src={selectedImage || "/placeholder.png"}
              alt={product.name}
              className="product-detail-image"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="product-detail-section">
          {/* Status Badge */}
          {product.status && (
            <div className={`product-detail-badge product-detail-badge-${product.status.toLowerCase()}`}>
              {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
            </div>
          )}

          {/* Title */}
          <h1 className="product-detail-title">{product.name}</h1>

          {/* Category */}
          {product.categories && (
            <div className="product-detail-category">
              <Tag size={16} />
              <span>{product.categories}</span>
            </div>
          )}

          {/* Description */}
          <div className="product-detail-description-box">
            <h3>Description</h3>
            <p>{product.description || "No description available"}</p>
          </div>

          {/* Price Information */}
          <div className="product-detail-price-box">
            <h3>Pricing Information</h3>

            <div className="product-detail-price-grid">
            {product.startPrice && (
            <div className="product-detail-price-item">
            <span className="product-detail-price-item-label">Starting Price</span>
            <span className="product-detail-price-value">
            ${product.startPrice.toFixed(2)}
            </span>
            </div>
            )}

            {product.deposit && (
            <div className="product-detail-price-item">
            <span className="product-detail-price-item-label">Deposit Required</span>
            <span className="product-detail-deposit-value">
            ${product.deposit.toFixed(2)}
            </span>
            </div>
            )}

            {product.estimatePrice && (
            <div className="product-detail-price-item">
            <span className="product-detail-price-item-label">Estimated Value</span>
            <span className="product-detail-estimate-value">
            ${product.estimatePrice.toFixed(2)}
            </span>
            </div>
            )}
            </div>
          </div>

          {/* Seller Information */}
          <div className="product-detail-seller-box">
          <h3>Seller Information</h3>
          {product.sellerId ? (
          <p>Seller ID: {product.sellerId}</p>
          ) : (
          <p>Information not available</p>
          )}
          </div>

          {/* Product Details */}
          <div className="product-detail-meta-info">
          {product.createdAt && (
          <div className="product-detail-meta-item">
          <Calendar size={16} />
          <span>
          Listed on {new Date(product.createdAt).toLocaleDateString()}
          </span>
          </div>
          )}

          {product.updatedAt && (
          <div className="product-detail-meta-item">
          <Calendar size={16} />
          <span>
          Updated on {new Date(product.updatedAt).toLocaleDateString()}
          </span>
          </div>
          )}
          </div>

          {/* Actions */}
          <div className="product-detail-actions">
            <Button
              onClick={handleCreateAuction}
              className="product-detail-auction-button"
            >
              <DollarSign size={18} />
              Create Auction for This Product
            </Button>

            <Button
              onClick={handleGoBack}
              className="product-detail-back-link"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
