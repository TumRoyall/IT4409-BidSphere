// src/modules/seller/pages/ProductManagement.tsx
import React, { useState } from "react";
import productApi from "@/api/modules/product.api";
import {
  StatsOverview,
  ApprovedProducts,
  ActionButtons,
  EditProductModal,
  DeleteConfirmation,
  AuctionManagement
} from "../components";
import { ProductDetails } from "@/modules/product/components";
import CreateAuctionSession from "@/modules/auction/pages/CreateAuctionSession";
import { Modal } from "@/components/common/Modal";
import { useSellerProducts, useProductActions, useSellerStatistics } from "../hooks/useSellerProducts";
import type { Product } from "../types/seller.types";
import "@/styles/modules/seller/index.css";

const ProductManagement = (): React.ReactElement => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateAuctionModalOpen, setIsCreateAuctionModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isAuctionModalOpen, setIsAuctionModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sử dụng custom hooks
  const { products, loading, error, pagination, updateFilters, changePage, refresh } = useSellerProducts();
  const { createProduct, updateProduct, deleteProduct, loading: submitting } = useProductActions();
  const { stats, refresh: refreshStats } = useSellerStatistics();

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleSubmitProduct = async (formData: any) => {
    try {
      // Extract images from formData
      const images: File[] = formData.images || [];
      const productDataWithoutImages = { ...formData };
      delete productDataWithoutImages.images;

      // If there are images, upload them to cloud first to get secure URLs,
      // then include those URLs in the createProduct payload so backend will persist Image records.
      let imageRequests: Array<any> | undefined = undefined;
      if (images.length > 0) {
        const uploadPromises = images.map((file: File) => productApi.uploadImage(file));
        const uploadResponses = await Promise.all(uploadPromises);

        imageRequests = uploadResponses.map((res: any, idx: number) => {
          // backend UploadController returns { imageUrl } (or { url } in some contexts)
          const data = res?.data || res;
          const secureUrl = data?.imageUrl || data?.url || data?.secure_url || data?.secureUrl || data?.secureurl;
          return {
            secure_url: secureUrl,
            isThumbnail: idx === 0,
          };
        });
      }

      // Prepare final payload including images (if any) and create product
      const finalPayload = {
        ...productDataWithoutImages,
        images: imageRequests,
      };

      const response = await createProduct(finalPayload);
      const productId = response?.productId || response?.id;

      // Đóng modal
      handleCloseCreateModal();

      // Refresh both products list and statistics immediately
      refresh();
      refreshStats();
    } catch (error: any) {
      console.error("❌ Lỗi tạo sản phẩm:", error);
      console.error("📋 Response data:", error?.response?.data);
      // TODO: Hiển thị error message
    }
  };

  const handleSearch = (searchTerm: string) => {
    updateFilters({ search: searchTerm });
  };

  const handleOpenCreateAuctionModal = () => {
    setIsCreateAuctionModalOpen(true);
  };

  const handleCloseCreateAuctionModal = () => {
    setIsCreateAuctionModalOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteConfirmOpen(true);
  };

  const handleSubmitEdit = async (productId: number, data: any) => {
    try {
      const resp = await updateProduct(productId, data);

      setIsEditModalOpen(false);
      setSelectedProduct(null);

      refresh();
      refreshStats();
    } catch (error: any) {
      console.error("❌ Lỗi cập nhật sản phẩm:", error);
      // Show a visible error so users know update failed and we can inspect details
      const errorMessage = error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Unknown error";
      const errorDetails = error?.response?.data?.details ||
        error?.response?.data?.fieldErrors ||
        null;

      let fullMessage = "Lỗi cập nhật sản phẩm: " + errorMessage;
      if (errorDetails) {
        fullMessage += "\n\n" + JSON.stringify(errorDetails, null, 2);
      }

      alert(fullMessage);
      console.error("❗ Full error response:", error?.response);
      try {
        console.error("❗ Response data:", JSON.stringify(error?.response?.data, null, 2));
      } catch (e) {
        console.error("❗ Could not stringify response data", e);
      }
    }
  };

  const handleConfirmDelete = async (product: Product) => {
    try {
      await deleteProduct(product.productId);
      setIsDeleteConfirmOpen(false);
      setSelectedProduct(null);

      refresh();
      refreshStats();
    } catch (error: any) {
      console.error("❌ Lỗi xóa sản phẩm:", error);
      console.error("Response status:", error?.response?.status);
      console.error("Response data:", error?.response?.data);
      alert("Lỗi xóa sản phẩm: " + (error?.response?.data?.message || error?.message || "Unknown error"));
    }
  };

  const handleViewAuctions = (product: Product) => {
    setSelectedProduct(product);
    setIsAuctionModalOpen(true);
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsViewDetailsModalOpen(true);
  };

  return (
    <div className="product-management-page">
      {/* Statistics - Đầu tiên */}
      <div className="fade-in" style={{ animationDelay: "200ms" }}>
        <StatsOverview stats={stats} loading={loading} />
      </div>

      {/* Action Buttons - Tạo sản phẩm & đấu giá */}
      <div className="fade-in action-buttons-section" style={{ animationDelay: "400ms" }}>
        <div className="section-header">
          <h2 className="section-title">Quản lý sản phẩm</h2>
          <div className="action-buttons-group">
            <button
              id="btn-create-auction"
              className="btn-secondary"
              onClick={handleOpenCreateAuctionModal}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
                <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
                <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
                <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />
                <path d="M15.5 22H14v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                <path d="M10 9.5C10 10.33 9.33 11 8.5 11h-5C2.67 11 2 10.33 2 9.5S2.67 8 3.5 8h5c.83 0 1.5.67 1.5 1.5z" />
                <path d="M8.5 2H10v1.5c0 .83-.67 1.5-1.5 1.5S7 4.33 7 3.5 7.67 2 8.5 2z" />
              </svg>
              Tạo phiên đấu giá
            </button>
            <button
              id="btn-create-product"
              className="btn-primary"
              onClick={handleOpenCreateModal}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Tạo sản phẩm mới
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar - Ngay trên list */}
      <div className="fade-in search-section" style={{ animationDelay: "500ms" }}>
        <div className="search-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="search-input-new"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Products List */}
      <div className="fade-in" style={{ animationDelay: "600ms" }}>
        <ApprovedProducts
          products={products}
          loading={loading}
          error={error}
          pagination={pagination}
          onRefresh={refresh}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onViewDetails={handleViewDetails}
          onViewAuctions={handleViewAuctions}
          onPageChange={changePage}
        />
      </div>

      {/* Create Product Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        title="Create New Product"
        subtitle="Fill in the product details below"
        size="lg"
      >
        <div className="modal-product-content">
          <ProductDetails
            onSubmit={handleSubmitProduct}
            loading={submitting}
          />
          <ActionButtons
            onCancel={handleCloseCreateModal}
            loading={submitting}
          />
        </div>
      </Modal>

      {/* Create Auction Session Modal */}
      <Modal
        isOpen={isCreateAuctionModalOpen}
        onClose={handleCloseCreateAuctionModal}
        title="Create Auction Session"
        size="lg"
      >
        <CreateAuctionSession onClose={handleCloseCreateAuctionModal} />
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        title="Edit Product"
        subtitle="Update product details"
        size="lg"
      >
        <EditProductModal
          product={selectedProduct}
          loading={submitting}
          onSubmit={handleSubmitEdit}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmOpen}
        onClose={() => {
          setIsDeleteConfirmOpen(false);
          setSelectedProduct(null);
        }}
        title=""
        size="md"
        className="confirmation-modal"
      >
        <DeleteConfirmation
          product={selectedProduct}
          loading={submitting}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setIsDeleteConfirmOpen(false);
            setSelectedProduct(null);
          }}
        />
      </Modal>

      {/* Auction Management Modal */}
      <Modal
        isOpen={isAuctionModalOpen}
        onClose={() => {
          setIsAuctionModalOpen(false);
          setSelectedProduct(null);
        }}
        title=""
        size="lg"
      >
        <AuctionManagement
          product={selectedProduct}
          onClose={() => {
            setIsAuctionModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={isViewDetailsModalOpen}
        onClose={() => {
          setIsViewDetailsModalOpen(false);
          setSelectedProduct(null);
        }}
        title={
          <div className="product-view-modal">
            <div className="modal-title-wrapper">
              <span className="modal-title-text">Product Details</span>
              {selectedProduct?.status && (
                <span className={`status-badge badge-${selectedProduct.status}`}>
                  {selectedProduct.status}
                </span>
              )}
            </div>
          </div>
        }
        subtitle={selectedProduct?.name}
        size="xl"
        className="product-view-modal"
        contentClassName="product-view-modal-content"
      >
        {selectedProduct && (
          <>
            <div className="product-view-details-content">
              {/* LEFT: Image Section */}
              <div className="product-view-images">
                {/* Main Image */}
                <div className="product-view-main-image">
                  <img
                    src={
                      selectedProduct.images?.find((img: any) => img.isThumbnail)?.url ||
                      selectedProduct.images?.[0]?.url ||
                      selectedProduct.imageUrl ||
                      "/placeholder-product.png"
                    }
                    alt={selectedProduct.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-product.png";
                    }}
                  />
                </div>

                {/* Images Gallery Thumbnails */}
                {selectedProduct.images && selectedProduct.images.length > 1 && (
                  <div className="product-view-thumbnails">
                    <h4 className="product-view-thumbnails-header">
                      All Images ({selectedProduct.images.length})
                    </h4>
                    <div className="product-view-thumbnails-grid">
                      {selectedProduct.images.map((img: any, idx: number) => (
                        <div
                          key={img.imageId || idx}
                          className={`product-view-thumbnail ${img.isThumbnail ? 'is-main' : ''}`}
                        >
                          <img
                            src={img.url || img.imageUrl}
                            alt={`Product ${idx}`}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/placeholder-product.png";
                            }}
                          />
                          {img.isThumbnail && (
                            <div className="product-view-thumbnail-badge">
                              MAIN
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT: Info Section */}
              <div className="product-view-info">
                {/* Header */}
                <div className="product-view-header">
                  <h2 className="product-view-name">
                    {selectedProduct.name}
                  </h2>
                  <div className="product-view-meta">
                    {selectedProduct.status && (
                      <span className={`status-badge badge-${selectedProduct.status}`}>
                        {selectedProduct.status}
                      </span>
                    )}
                    <span className="product-view-created">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      Created: {new Date(selectedProduct.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>

                {/* Price Section */}
                <div className="product-view-price-section">
                  <div className="product-view-price-item">
                    <span className="product-view-price-label">Starting Price</span>
                    <p className="product-view-price-value">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                      }).format(selectedProduct.startPrice)}
                    </p>
                  </div>
                  {selectedProduct.status !== "draft" && selectedProduct.estimatePrice && (
                    <div className="product-view-price-item">
                      <span className="product-view-price-label">Estimate Price</span>
                      <p className="product-view-price-value secondary">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                          minimumFractionDigits: 0,
                        }).format(Number(selectedProduct.estimatePrice))}
                      </p>
                    </div>
                  )}
                </div>

                {/* Info Grid */}
                <div className="product-view-info-grid">
                  <div className="product-view-info-item">
                    <span className="product-view-info-label">Category</span>
                    <p className="product-view-info-value">
                      {selectedProduct.category || "—"}
                    </p>
                  </div>
                  <div className="product-view-info-item">
                    <span className="product-view-info-label">Deposit</span>
                    <p className="product-view-info-value">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        minimumFractionDigits: 0,
                      }).format(selectedProduct.deposit || 0)}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="product-view-description">
                  <h3 className="product-view-description-title">Description</h3>
                  <p className="product-view-description-text">
                    {selectedProduct.description || "No description provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="product-view-footer">
              <button
                className="product-view-close-btn"
                onClick={() => {
                  setIsViewDetailsModalOpen(false);
                  setSelectedProduct(null);
                }}
              >
                Close
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ProductManagement;