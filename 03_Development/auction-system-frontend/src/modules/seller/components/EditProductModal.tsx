// src/modules/seller/components/EditProductModal.tsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Textarea } from "@/components/common/TextArea";
import { Select } from "@/components/common/Select";
import { Edit2, DollarSign, Tag, FileText } from "lucide-react";
import type { Product } from "../types/seller.types";
import "@/styles/seller.css";

interface EditProductModalProps {
  product: Product | null;
  loading?: boolean;
  onSubmit: (productId: number, data: any) => Promise<void>;
  onCancel: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  loading,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<any>({
    name: "",
    categories: "",
    description: "",
    start_price: 0,
    estimate_price: "",
    deposit: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        categories: product.categories || "",
        description: product.description || "",
        start_price: product.start_price || 0,
        estimate_price: product.estimate_price || "",
        deposit: product.deposit || 0,
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name.includes("price") || name === "deposit" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product?.product_id) return;

    try {
      setIsSubmitting(true);
      const payload = {
        name: formData.name,
        categories: formData.categories,
        description: formData.description,
        startPrice: formData.start_price,
        estimatePrice: formData.estimate_price,
        deposit: formData.deposit,
      };
      await onSubmit(product.product_id, payload);
      onCancel();
    } catch (error) {
      console.error("Error updating product:", error);
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
      {/* Header with gradient */}
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
          <Select
            id="product-category"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            disabled={isSubmitting}
            style={{ width: "100%", borderRadius: "6px", borderColor: "#cbd5e0", padding: "10px 12px" }}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
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
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div className="form-group">
            <label htmlFor="start-price" style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px", display: "block", color: "#2d3748" }}>
              Start Price (VND) <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <Input
              id="start-price"
              name="start_price"
              type="number"
              value={formData.start_price}
              onChange={handleChange}
              placeholder="0"
              disabled={isSubmitting}
              style={{ width: "100%", borderRadius: "6px", borderColor: "#cbd5e0", padding: "10px 12px" }}
            />
            {formData.start_price > 0 && (
              <p style={{ fontSize: "12px", color: "#667eea", marginTop: "6px", fontWeight: 600 }}>
                {formatPrice(formData.start_price)}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="deposit" style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px", display: "block", color: "#2d3748" }}>
              Deposit (VND) <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <Input
              id="deposit"
              name="deposit"
              type="number"
              value={formData.deposit}
              onChange={handleChange}
              placeholder="0"
              disabled={isSubmitting}
              style={{ width: "100%", borderRadius: "6px", borderColor: "#cbd5e0", padding: "10px 12px" }}
            />
            {formData.deposit > 0 && (
              <p style={{ fontSize: "12px", color: "#667eea", marginTop: "6px", fontWeight: 600 }}>
                {formatPrice(formData.deposit)}
              </p>
            )}
          </div>

          <div className="form-group" style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="estimate-price" style={{ fontSize: "13px", fontWeight: 600, marginBottom: "8px", display: "block", color: "#2d3748" }}>
              Estimate Price (VND) <span style={{ fontSize: "11px", color: "#718096", fontWeight: 500 }}>(Optional)</span>
            </label>
            <Input
              id="estimate-price"
              name="estimate_price"
              type="number"
              value={formData.estimate_price}
              onChange={handleChange}
              placeholder="0"
              disabled={isSubmitting}
              style={{ width: "100%", borderRadius: "6px", borderColor: "#cbd5e0", padding: "10px 12px" }}
            />
            {formData.estimate_price > 0 && (
              <p style={{ fontSize: "12px", color: "#667eea", marginTop: "6px", fontWeight: 600 }}>
                {formatPrice(formData.estimate_price)}
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
            <p style={{ color: "#2d3748", fontWeight: 600, margin: "4px 0 0 0" }}>{formData.categories || "—"}</p>
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
