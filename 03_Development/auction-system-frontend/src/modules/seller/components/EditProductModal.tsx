import React, { useState, useEffect } from "react";
import productApi from "@/api/modules/product.api";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Textarea } from "@/components/common/TextArea";
import CategorySelect from "@/components/common/CategorySelect";
import { Edit2, DollarSign } from "lucide-react";
import type { Product } from "../types/seller.types";

interface EditProductModalProps {
  product: Product | null;
  loading?: boolean;
  onSubmit: (productId: number, data: any) => Promise<void>;
  onCancel: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  loading: _loading,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<any>({
    name: "",
    category: "",
    description: "",
    startPrice: 0,
  });

  const [imagesList, setImagesList] = useState<Array<any>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        description: product.description || "",
        startPrice: product.startPrice || 0,
      });

      const initialImages = (product.images || []).map((img: any) => ({
        imageId: img.imageId,
        url: img.url,
        isThumbnail: !!img.isThumbnail,
        file: null,
        preview: img.url,
      }));
      setImagesList(initialImages);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === "startPrice" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product?.productId) return;

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // Validate required fields
      if (!formData.name || formData.name.trim() === "") {
        throw new Error("Product name is required");
      }

      // Helper to convert values to nullable numbers
      const toNullableNumber = (v: any) => {
        if (v === "" || v === null || v === undefined) return null;
        const n = Number(v);
        return Number.isNaN(n) ? null : n;
      };

      // Build the basic payload (without images) - sellers cannot set deposit/estimate
      const payload: any = {
        sellerId: product.sellerId,
        name: formData.name.trim(),
        category: formData.category || null,
        description: formData.description || null,
        startPrice: toNullableNumber(formData.startPrice),
      };

      // Handle images only if there are new uploads
      const uploadable = imagesList.filter((it) => it.file);
      if (uploadable.length > 0) {
        console.log("📸 Uploading new images...");

        // Upload new files to get secure URLs
        const uploadPromises = uploadable.map((it) => productApi.uploadImage(it.file));
        const responses = await Promise.all(uploadPromises);

        // Build images array with correct field names for backend
        const imagesPayload = imagesList.map((it) => {
          if (it.file) {
            // This is a newly uploaded file
            const resp: any = responses.shift();
            const secureUrl = resp?.data?.url || resp?.url || "";
            return {
              url: secureUrl,  // Backend expects 'url'
              isThumbnail: !!it.isThumbnail,
            };
          }
          // This is an existing image
          return {
            url: it.url,  // Backend expects 'url'
            isThumbnail: !!it.isThumbnail,
          };
        });

        payload.images = imagesPayload;
      }

      console.log("📤 Submitting product update:", JSON.stringify(payload, null, 2));
      await onSubmit(product.productId, payload);
      onCancel();

    } catch (error: any) {
      let errorMsg = "Failed to update product";

      if (error?.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error?.message) {
        errorMsg = error.message;
      }

      console.error("❌ Error updating product:", error);
      console.error("📋 Error response:", error?.response?.data);
      setSubmitError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const CATEGORIES = [
    "Electronics",
    "Furniture",
    "Jewelry",
    "Art",
    "Collectibles",
    "Fashion",
    "Books",
    "Other",
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!product) return null;

  return (
    <form onSubmit={handleSubmit} className="edit-product-form" style={{ paddingBottom: "20px" }}>
      {/* Error Alert */}
      {submitError && (
        <div style={{
          background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
          border: "1px solid #fca5a5",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "12px"
        }}>
          <div style={{
            display: "flex",
            gap: "12px",
            alignItems: "flex-start",
            flex: 1
          }}>
            <span style={{ fontSize: "18px", marginTop: "2px" }}>⚠️</span>
            <p style={{
              margin: 0,
              fontSize: "13px",
              color: "#7f1d1d",
              fontWeight: 500,
              lineHeight: 1.5
            }}>
              {submitError}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSubmitError(null)}
            aria-label="Dismiss error"
            style={{
              background: "transparent",
              border: "none",
              color: "#991b1b",
              cursor: "pointer",
              fontSize: "20px",
              padding: "0",
              lineHeight: 1,
              flexShrink: 0
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: "28px", paddingBottom: "20px", borderBottom: "2px solid #e2e8f0", background: "linear-gradient(135deg, #f8fafc 0%, rgba(102, 126, 234, 0.03) 100%)", padding: "16px 16px 20px 16px", marginLeft: "-16px", marginRight: "-16px", marginTop: "-16px", paddingLeft: "16px", paddingRight: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
          <div style={{ background: "#667eea", padding: "8px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Edit2 size={18} style={{ color: "white" }} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#1a202c", lineHeight: 1.2 }}>
              Edit Product Details
            </h3>
            <p style={{ margin: "6px 0 0 0", fontSize: "13px", color: "#718096", fontWeight: 500 }}>
              Updating: <strong style={{ color: "#2d3748" }}>{product.name}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Basic Information Section */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <div style={{ width: "4px", height: "24px", background: "#667eea", borderRadius: "2px" }}></div>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#2d3748", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>
            Basic Information
          </h4>
        </div>

        <div className="form-group" style={{ marginBottom: "16px" }}>
          <label htmlFor="product-name" style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px", display: "block", color: "#2d3748" }}>
            Product Name <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <Input
            id="product-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            disabled={isSubmitting}
            style={{ width: "100%", borderRadius: "6px", borderColor: "#cbd5e0", padding: "10px 12px" }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "16px" }}>
          <label htmlFor="product-category" style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px", display: "block", color: "#2d3748" }}>
            Category <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <CategorySelect
            value={formData.category}
            onChange={handleCategoryChange}
            disabled={isSubmitting}
            categories={CATEGORIES}
            placeholder="Select a category"
          />
        </div>

        <div className="form-group">
          <label htmlFor="product-description" style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px", display: "block", color: "#2d3748" }}>
            Description
          </label>
          <Textarea
            id="product-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your product in detail..."
            rows={4}
            disabled={isSubmitting}
            style={{ width: "100%", fontFamily: "inherit", borderRadius: "6px", borderColor: "#cbd5e0", padding: "10px 12px", resize: "vertical" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px" }}>
            <p style={{ fontSize: "12px", color: "#718096", margin: 0 }}>Provide detailed information about your product</p>
            <span style={{ fontSize: "11px", color: "#cbd5e0", fontWeight: 600 }}>{formData.description.length}/500</span>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <div style={{ width: "4px", height: "24px", background: "#667eea", borderRadius: "2px" }}></div>
          <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#2d3748", textTransform: "uppercase", letterSpacing: "0.5px", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
            <DollarSign size={16} style={{ color: "#667eea" }} />
            Pricing Information
          </h4>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
          <div className="form-group">
            <label htmlFor="start-price" style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px", display: "block", color: "#2d3748" }}>
              Start Price (VND) <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <Input
              id="start-price"
              name="startPrice"
              type="number"
              value={formData.startPrice}
              onChange={handleChange}
              placeholder="0"
              disabled={isSubmitting}
              style={{ width: "100%", borderRadius: "6px", borderColor: "#cbd5e0", padding: "10px 12px" }}
            />
            {formData.startPrice > 0 && (
              <p style={{ fontSize: "12px", color: "#667eea", marginTop: "6px", fontWeight: 600 }}>
                {formatPrice(formData.startPrice)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Summary Preview */}
      <div style={{
        background: "linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "24px"
      }}>
        <h4 style={{ fontSize: "11px", fontWeight: 700, color: "#718096", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px", margin: "0 0 12px 0" }}>
          Changes Summary
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "13px" }}>
          <div style={{ padding: "8px", background: "white", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
            <span style={{ color: "#718096", fontSize: "11px", fontWeight: 600 }}>PRODUCT</span>
            <p style={{ color: "#2d3748", fontWeight: 600, margin: "4px 0 0 0" }}>{formData.name || "—"}</p>
          </div>
          <div style={{ padding: "8px", background: "white", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
            <span style={{ color: "#718096", fontSize: "11px", fontWeight: 600 }}>CATEGORY</span>
            <p style={{ color: "#2d3748", fontWeight: 600, margin: "4px 0 0 0" }}>{formData.category || "—"}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", paddingTop: "16px", borderTop: "1px solid #e2e8f0" }}>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          style={{ minWidth: "120px", borderRadius: "6px" }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          style={{ minWidth: "140px", borderRadius: "6px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)" }}
        >
          {isSubmitting ? "Updating..." : "Update Product"}
        </Button>
      </div>
    </form>
  );
};

export default EditProductModal;