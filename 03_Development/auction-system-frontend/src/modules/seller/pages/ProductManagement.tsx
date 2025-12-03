// src/modules/seller/pages/ProductManagement.tsx
import React, { useState } from "react";
import productApi from "@/api/modules/product.api";
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

const ProductManagement = (): React.ReactElement => {
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

      // Extract images from formData
      const images: File[] = formData.images || [];
      const productDataWithoutImages = { ...formData };
      delete productDataWithoutImages.images;

      // If there are images, upload them to cloud first to get secure URLs,
      // then include those URLs in the createProduct payload so backend will persist Image records.
      let imageRequests: Array<any> | undefined = undefined;
      if (images.length > 0) {
        console.log("📸 Uploading files to obtain secure URLs before creating product...");
        const uploadPromises = images.map((file: File) => productApi.uploadImage(file));
        const uploadResponses = await Promise.all(uploadPromises);

        imageRequests = uploadResponses.map((res: any, idx: number) => {
          // backend UploadController returns { image_url: secure_url }
          const data = res?.data || res;
          const secureUrl = data?.image_url || data?.secure_url || data?.secureUrl || data?.secureurl;
          return {
            secure_url: secureUrl,
            isThumbnail: idx === 0,
          };
        });

        console.log("✅ Obtained secure URLs:", imageRequests.map((i) => i.secure_url));
      }

      // Prepare final payload including images (if any) and create product
      const finalPayload = {
        ...productDataWithoutImages,
        images: imageRequests,
      };

      const response = await createProduct(finalPayload);
      const productId = response?.productId || response?.id;
      console.log("✅ Product created with ID:", productId);

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
  console.log("📤 Updating product:", productId, JSON.stringify(data, null, 2));
  const resp = await updateProduct(productId, data);
      console.log("✅ Update API response:", resp);

      setIsEditModalOpen(false);
      setSelectedProduct(null);

      console.log("🔄 Refreshing products and stats after edit...");
      refresh();
      refreshStats();

      console.log("✅ Cập nhật sản phẩm thành công!");
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
  console.log("🗑️ Deleting product:", product.productId);
  await deleteProduct(product.productId);
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
          title="Create Auction Session"
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
             <div className="view-details-content" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>
               {/* LEFT: Image Section */}
               <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                 {/* Main Image */}
                 <div style={{
                   borderRadius: "12px",
                   overflow: "hidden",
                   border: "1px solid #e2e8f0",
                   background: "#f7fafc",
                   aspectRatio: "1",
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "center"
                 }}>
                   <img
                     src={
                       selectedProduct.images?.find((img: any) => img.isThumbnail)?.url ||
                       selectedProduct.images?.[0]?.url ||
                       selectedProduct.imageUrl ||
                       "/placeholder-product.png"
                     }
                     alt={selectedProduct.name}
                     style={{ width: "100%", height: "100%", objectFit: "cover" }}
                     onError={(e) => {
                       (e.target as HTMLImageElement).src = "/placeholder-product.png";
                     }}
                   />
                 </div>
                 
                 {/* Images Gallery Thumbnails */}
                 {selectedProduct.images && selectedProduct.images.length > 1 && (
                   <div>
                     <h4 style={{ fontSize: "12px", fontWeight: 600, color: "#718096", textTransform: "uppercase", marginBottom: "10px", margin: "0 0 10px 0" }}>
                       All Images ({selectedProduct.images.length})
                     </h4>
                     <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))", gap: "8px" }}>
                       {selectedProduct.images.map((img: any, idx: number) => (
                         <div
                           key={img.imageId || idx}
                           style={{
                             borderRadius: "6px",
                             overflow: "hidden",
                             border: img.isThumbnail ? "2px solid #667eea" : "1px solid #e2e8f0",
                             aspectRatio: "1",
                             background: "#f7fafc",
                             position: "relative",
                             cursor: "pointer",
                             transition: "transform 0.2s"
                           }}
                           onMouseEnter={(e) => {
                             (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                           }}
                           onMouseLeave={(e) => {
                             (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                           }}
                         >
                           <img
                             src={img.url || img.image_url}
                             alt={`Product ${idx}`}
                             style={{ width: "100%", height: "100%", objectFit: "cover" }}
                             onError={(e) => {
                               (e.target as HTMLImageElement).src = "/placeholder-product.png";
                             }}
                           />
                           {img.isThumbnail && (
                             <div style={{
                               position: "absolute",
                               top: "2px",
                               right: "2px",
                               background: "#667eea",
                               color: "white",
                               fontSize: "8px",
                               fontWeight: 700,
                               padding: "2px 4px",
                               borderRadius: "3px"
                             }}>
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
               <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                 {/* Header */}
                 <div>
                   <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1a202c", margin: "0 0 12px 0" }}>
                     {selectedProduct.name}
                   </h2>
                   <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                     {selectedProduct.status && (
                       <span 
                         className={`badge badge-${selectedProduct.status}`}
                         style={{
                           display: "inline-block",
                           padding: "6px 14px",
                           borderRadius: "6px",
                           fontSize: "12px",
                           fontWeight: 600,
                           textTransform: "capitalize"
                         }}
                       >
                         {selectedProduct.status}
                       </span>
                     )}
                     <span style={{ fontSize: "13px", color: "#718096" }}>
                       Created: {new Date(selectedProduct.createdAt).toLocaleDateString("vi-VN")}
                     </span>
                   </div>
                 </div>

                 {/* Price Section */}
                 <div style={{
                   background: "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
                   border: "1px solid #e2e8f0",
                   borderRadius: "8px",
                   padding: "16px"
                 }}>
                   <div style={{ marginBottom: "12px" }}>
                     <span style={{ fontSize: "12px", color: "#718096", fontWeight: 600 }}>STARTING PRICE</span>
                     <p style={{ fontSize: "28px", fontWeight: 700, color: "#667eea", margin: "4px 0 0 0" }}>
                       {new Intl.NumberFormat("vi-VN", {
                         style: "currency",
                         currency: "VND",
                         minimumFractionDigits: 0,
                       }).format(selectedProduct.startPrice)}
                     </p>
                   </div>
                   {selectedProduct.estimatePrice && (
                     <div style={{ paddingTop: "12px", borderTop: "1px solid #cbd5e0" }}>
                       <span style={{ fontSize: "12px", color: "#718096", fontWeight: 600 }}>ESTIMATE PRICE</span>
                       <p style={{ fontSize: "16px", fontWeight: 600, color: "#2d3748", margin: "4px 0 0 0" }}>
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
                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                   <div style={{ padding: "12px", background: "#f7fafc", borderRadius: "6px" }}>
                     <span style={{ fontSize: "11px", color: "#718096", fontWeight: 600, textTransform: "uppercase" }}>Category</span>
                     <p style={{ margin: "6px 0 0 0", fontSize: "14px", fontWeight: 600, color: "#2d3748" }}>
                       {selectedProduct.category || "—"}
                     </p>
                   </div>
                   <div style={{ padding: "12px", background: "#f7fafc", borderRadius: "6px" }}>
                     <span style={{ fontSize: "11px", color: "#718096", fontWeight: 600, textTransform: "uppercase" }}>Deposit</span>
                     <p style={{ margin: "6px 0 0 0", fontSize: "14px", fontWeight: 600, color: "#2d3748" }}>
                       {new Intl.NumberFormat("vi-VN", {
                         style: "currency",
                         currency: "VND",
                         minimumFractionDigits: 0,
                       }).format(selectedProduct.deposit || 0)}
                     </p>
                   </div>
                 </div>

                 {/* Description */}
                 <div>
                   <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#2d3748", marginBottom: "8px" }}>Description</h3>
                   <p style={{ fontSize: "14px", color: "#4a5568", lineHeight: 1.6, margin: 0 }}>
                     {selectedProduct.description || "No description provided"}
                   </p>
                 </div>
               </div>

               {/* Close Button */}
               <div style={{ gridColumn: "1 / -1", paddingTop: "16px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end" }}>
                 <button
                   style={{
                     padding: "10px 24px",
                     background: "#667eea",
                     color: "white",
                     border: "none",
                     borderRadius: "6px",
                     fontSize: "14px",
                     fontWeight: 600,
                     cursor: "pointer",
                     transition: "background 0.2s"
                   }}
                   onClick={() => {
                     setIsViewDetailsModalOpen(false);
                     setSelectedProduct(null);
                   }}
                   onMouseEnter={(e) => {
                     (e.currentTarget as HTMLElement).style.background = "#5568d3";
                   }}
                   onMouseLeave={(e) => {
                     (e.currentTarget as HTMLElement).style.background = "#667eea";
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