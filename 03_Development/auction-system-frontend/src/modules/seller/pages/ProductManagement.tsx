// src/modules/seller/pages/ProductManagement.tsx
import React, { useState } from "react";
import {
  ActionToolBar,
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
import "@/styles/seller.css";

const ProductManagement = (): JSX.Element => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateAuctionModalOpen, setIsCreateAuctionModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isAuctionModalOpen, setIsAuctionModalOpen] = useState(false);
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sử dụng custom hooks
  const { products, loading, error, pagination, updateFilters, refresh } = useSellerProducts();
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
      console.log("📤 Sending product payload:", formData);
      await createProduct(formData);

      // Đóng modal
      handleCloseCreateModal();
      
      // Refresh both products list and statistics immediately
      console.log("🔄 Refreshing products and stats...");
      refresh();
      refreshStats();
      
      console.log("✅ Tạo sản phẩm thành công!");
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
      console.log("📤 Updating product:", productId, data);
      await updateProduct(productId, data);
      setIsEditModalOpen(false);
      setSelectedProduct(null);
      
      console.log("🔄 Refreshing products and stats after edit...");
      refresh();
      refreshStats();
      
      console.log("✅ Cập nhật sản phẩm thành công!");
    } catch (error: any) {
      console.error("❌ Lỗi cập nhật sản phẩm:", error);
    }
  };

  const handleConfirmDelete = async (product: Product) => {
    try {
      console.log("🗑️ Deleting product:", product.product_id);
      await deleteProduct(product.product_id);
      setIsDeleteConfirmOpen(false);
      setSelectedProduct(null);
      
      console.log("🔄 Refreshing products and stats after delete...");
      refresh();
      refreshStats();
      
      console.log("✅ Xóa sản phẩm thành công!");
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
      {/* Toolbar */}
      <div className="fade-in" style={{ animationDelay: "400ms" }}>
      <ActionToolBar
      onCreateProduct={handleOpenCreateModal}
      onCreateAuction={handleOpenCreateAuctionModal}
      onSearch={handleSearch}
      />
      </div>

      {/* Statistics */}
      <div className="fade-in" style={{ animationDelay: "600ms" }}>
        <StatsOverview stats={stats} loading={loading} />
      </div>

      {/* Products List */}
      <div className="fade-in" style={{ animationDelay: "800ms" }}>
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
      />
      </div>

      {/* Create Product Modal */}
      <Modal
      isOpen={isCreateModalOpen}
      onClose={handleCloseCreateModal}
      title="Create New Product"
      subtitle="Fill in the product details below"
      size="xl"
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
          size="xl"
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
          size="xl"
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
        size="xl"
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
           title="Product Details"
           subtitle={selectedProduct?.name}
           size="xl"
         >
           {selectedProduct && (
             <div className="view-details-content">
               <div className="details-image-container">
                 <img
                   src={selectedProduct.image_url || "/placeholder-product.png"}
                   alt={selectedProduct.name}
                   className="details-image"
                   onError={(e) => {
                     (e.target as HTMLImageElement).src = "/placeholder-product.png";
                   }}
                 />
               </div>

               <div className="details-content">
                 <div className="detail-section">
                   <h3 className="section-title">Product Information</h3>
                   <div className="details-grid">
                     <div className="detail-item">
                       <div className="detail-label">Name</div>
                       <div className="detail-value">{selectedProduct.name}</div>
                     </div>
                     <div className="detail-item">
                       <div className="detail-label">Category</div>
                       <div className="detail-value">{selectedProduct.categories}</div>
                     </div>
                     <div className="detail-item">
                       <div className="detail-label">Status</div>
                       <div className="detail-value">
                         <span className={`badge badge-${selectedProduct.status}`}>
                           {selectedProduct.status}
                         </span>
                       </div>
                     </div>
                     <div className="detail-item">
                       <div className="detail-label">Start Price</div>
                       <div className="detail-value price-highlight">
                         {new Intl.NumberFormat("vi-VN", {
                           style: "currency",
                           currency: "VND",
                           minimumFractionDigits: 0,
                         }).format(selectedProduct.start_price)}
                       </div>
                     </div>
                     {selectedProduct.estimate_price && (
                       <div className="detail-item">
                         <div className="detail-label">Estimate Price</div>
                         <div className="detail-value">
                           {new Intl.NumberFormat("vi-VN", {
                             style: "currency",
                             currency: "VND",
                             minimumFractionDigits: 0,
                           }).format(Number(selectedProduct.estimate_price))}
                         </div>
                       </div>
                     )}
                     <div className="detail-item">
                       <div className="detail-label">Deposit Required</div>
                       <div className="detail-value">
                         {new Intl.NumberFormat("vi-VN", {
                           style: "currency",
                           currency: "VND",
                           minimumFractionDigits: 0,
                         }).format(selectedProduct.deposit)}
                       </div>
                     </div>
                     <div className="detail-item">
                       <div className="detail-label">Created</div>
                       <div className="detail-value">
                         {new Date(selectedProduct.created_at).toLocaleDateString("vi-VN")}
                       </div>
                     </div>
                   </div>
                 </div>

                 <div className="detail-section">
                   <h3 className="section-title">Description</h3>
                   <div className="section-content description-text">
                     {selectedProduct.description}
                   </div>
                 </div>
               </div>

               <div className="details-actions">
                 <button
                   className="cancel-button"
                   onClick={() => {
                     setIsViewDetailsModalOpen(false);
                     setSelectedProduct(null);
                   }}
                 >
                   Close
                 </button>
               </div>
             </div>
           )}
         </Modal>
      </div>
    );
  };
  
  export default ProductManagement;