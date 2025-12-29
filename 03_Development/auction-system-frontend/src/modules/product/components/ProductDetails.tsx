import React, { useState, useEffect, type FormEvent } from "react";
import { UploadIcon, AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/common/CheckBox";
import { Input } from "@/components/common/Input";
import { Label } from "@/components/common/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/Select";
import { Textarea } from "@/components/common/TextArea";
import { PRODUCT_CATEGORIES } from "../types";
import type { ProductFormData } from "../types";
import productApi from "@/api/modules/product.api";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/modules/seller/index.css";

interface ProductDetailsProps {
  onSubmit?: (data: ProductFormData) => void;
  loading?: boolean;
}

const MAX_IMAGES = 5;
const MAX_IMAGE_MB = 10;
const ACCEPT_TYPES = ["image/png", "image/jpeg", "image/jpg"];

const ProductDetails = ({ onSubmit, loading }: ProductDetailsProps): React.ReactElement => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    description: "",
    startPrice: 0,
    createAuction: false,
    auctionStartTime: "",
    auctionEndTime: "",
    bidStepAmount: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [backendCategories, setBackendCategories] = useState<Array<{ value: string; label: string }>>([]);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [confirmChecked, setConfirmChecked] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Fetch categories from backend on mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setCategoriesLoading(true);
      const response = await productApi.getProductsPage(0, 100);
      const items = response.data.content ?? [];
      const categorySet = new Set<string>();
      items.forEach((product: any) => {
        if (product?.category) categorySet.add(String(product.category));
      });
      const categories = Array.from(categorySet).map((cat) => ({ value: cat, label: cat }));
      setBackendCategories(categories.length ? categories : [...PRODUCT_CATEGORIES]);
    } catch (error) {
      console.error("Failed to load categories:", error);
      setBackendCategories([...PRODUCT_CATEGORIES]);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Generate & clean preview URLs to avoid memory leaks
  useEffect(() => {
    const urls = images.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [images]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || formData.name.trim().length < 10) {
      newErrors.name = "Tên sản phẩm phải có ít nhất 10 ký tự";
    }

    if (!formData.category) {
      newErrors.category = "Vui lòng chọn danh mục";
    }

    if (!formData.description || formData.description.trim().length < 50) {
      newErrors.description = "Mô tả phải có ít nhất 50 ký tự";
    }

    if (!formData.startPrice || formData.startPrice < 1000) {
      newErrors.startPrice = "Giá khởi điểm tối thiểu 1.000đ";
    }

    if (!confirmChecked) {
      newErrors.confirm = "Bạn cần xác nhận thông tin là chính xác trước khi tạo sản phẩm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const currentUser = user || (() => {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    })();

    if (!currentUser?.id) {
      alert("❌ Vui lòng đăng nhập lại");
      return;
    }

    if (!validateForm()) {
      console.error("❌ Form validation failed:", errors);
      return;
    }

    if (onSubmit) {
      const payload: any = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        startPrice: formData.startPrice,
        // deposit and estimatePrice will be assigned by admin upon approval
        imageUrl: "",
        sellerId: currentUser.id,
        images: images, // Include images array in payload
      };
      onSubmit(payload);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const filtered = files.filter((f) => {
      const okType = ACCEPT_TYPES.includes(f.type);
      const okSize = f.size <= MAX_IMAGE_MB * 1024 * 1024;
      return okType && okSize;
    });

    if (filtered.length !== files.length) {
      setErrors((prev) => ({
        ...prev,
        images: `Chỉ chấp nhận PNG/JPG ≤ ${MAX_IMAGE_MB}MB`,
      }));
    }

    const newTotal = images.length + filtered.length;
    if (newTotal > MAX_IMAGES) {
      setErrors((prev) => ({
        ...prev,
        images: `Tối đa ${MAX_IMAGES} ảnh`,
      }));
      const canAdd = Math.max(0, MAX_IMAGES - images.length);
      setImages((prev) => [...prev, ...filtered.slice(0, canAdd)]);
    } else {
      setImages((prev) => [...prev, ...filtered]);
      if (errors.images) setErrors((prev) => ({ ...prev, images: "" }));
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form
      id="product-form"
      onSubmit={handleSubmit}
      className="product-details-section"
      aria-busy={!!loading}
    >
      {/* Error Alert */}
      {errors.submit && (
        <div style={{ background: "#fee", borderLeft: "4px solid #e74c3c", padding: "16px", borderRadius: "6px", marginBottom: "20px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <AlertCircle size={20} style={{ color: "#e74c3c", flexShrink: 0 }} />
            <div>
              <h3 style={{ margin: "0 0 4px 0", fontWeight: 600, color: "#c33" }}>
                Lỗi tạo sản phẩm
              </h3>
              <p style={{ margin: 0, color: "#e74c3c", fontSize: "14px" }}>
                {errors.submit}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Basic Information */}
      <div className="section-group">
        <h2 className="section-title">Thông Tin Cơ Bản</h2>

        <div className="form-field">
          <Label className="field-label" htmlFor="pd-name">Tên Sản Phẩm *</Label>
          <Input
            id="pd-name"
            placeholder="Nhập tên sản phẩm"
            className="form-input"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <span style={{ color: "#ef4444", fontSize: "14px", marginTop: "4px", display: "block" }}>
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-row">
          <div className="form-field flex-1">
            <Label className="field-label" htmlFor="pd-category">Danh Mục *</Label>
            <div className="category-selector-wrapper">
              {!showCustomCategory ? (
                <Select
                  value={formData.category}
                  onValueChange={(val) => {
                    if (val === "__custom__") {
                      setShowCustomCategory(true);
                      setFormData((prev) => ({ ...prev, category: "" }));
                    } else {
                      handleChange("category", val);
                      setShowCustomCategory(false);
                    }
                  }}
                >
                  <SelectTrigger id="pd-category" className="form-select-trigger" disabled={categoriesLoading}>
                    <SelectValue placeholder={categoriesLoading ? "Đang tải..." : "Chọn danh mục"} />
                  </SelectTrigger>
                  <SelectContent>
                    {backendCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                    <div style={{ padding: "8px 12px", fontSize: "12px", fontWeight: 600, color: "#999", background: "#f5f5f5", marginTop: "8px" }}>
                      TỰA CHỌN
                    </div>
                    <SelectItem value="__custom__">
                      + Thêm Danh Mục Mới
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="custom-category-input-group">
                  <Input
                    id="pd-category-custom"
                    placeholder="VD: Đồ cổ, Điện tử, v.v."
                    className="form-input"
                    value={customCategory}
                    onChange={(e) => {
                      setCustomCategory(e.target.value);
                      handleChange("category", e.target.value);
                    }}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowCustomCategory(false);
                      setCustomCategory("");
                      handleChange("category", "");
                    }}
                    className="category-back-button"
                  >
                    Quay Lại
                  </button>
                </div>
              )}
            </div>
            {errors.category && (
              <span style={{ color: "#ef4444", fontSize: "14px", marginTop: "4px", display: "block" }}>
                {errors.category}
              </span>
            )}
          </div>
        </div>

        <div className="form-field">
          <Label className="field-label" htmlFor="pd-description">Mô Tả Chi Tiết *</Label>
          <Textarea
            id="pd-description"
            placeholder="Nhập mô tả chi tiết sản phẩm (tối thiểu 50 ký tự)..."
            className="form-textarea"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            aria-invalid={!!errors.description}
          />
          {errors.description && (
            <span style={{ color: "#ef4444", fontSize: "14px", marginTop: "4px", display: "block" }}>
              {errors.description}
            </span>
          )}
        </div>
      </div>

      {/* Pricing Details */}
      <div className="section-group">
        <h2 className="section-title">Thông Tin Giá</h2>

        <div className="form-row">
          <div className="form-field" style={{ width: "100%" }}>
            <Label className="field-label" htmlFor="pd-startprice">Giá Khởi Điểm (₫) *</Label>
            <Input
              id="pd-startprice"
              type="number"
              min={1000}
              step={1000}
              placeholder="VD: 1000000"
              className="form-input"
              value={formData.startPrice || ""}
              onChange={(e) => handleChange("startPrice", e.target.value ? Number(e.target.value) : 0)}
              aria-invalid={!!errors.startPrice}
            />
            {errors.startPrice && (
              <span style={{ color: "#ef4444", fontSize: "14px", marginTop: "4px", display: "block" }}>
                {errors.startPrice}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Product Images */}
      <div className="section-group">
        <h2 className="section-title">Hình Ảnh Sản Phẩm</h2>

        <div
          className="image-upload-area"
          role="button"
          tabIndex={0}
          aria-label="Tải lên hình ảnh sản phẩm"
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ACCEPT_TYPES.join(",")}
            onChange={handleImageChange}
            style={{ display: "none" }}
            aria-hidden
          />
          <div className="upload-icon">
            <UploadIcon className="upload-icon-svg" />
          </div>
          <p className="upload-text-primary">Nhấp để tải lên hoặc kéo thả</p>
          <p className="upload-text-secondary">PNG, JPG tối đa 10MB (Tối đa 5 ảnh)</p>
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="image-preview-grid">
            {images.map((file, index) => (
              <div key={index} className="image-preview-item">
                <img
                  src={previews[index]}
                  alt={`Xem trước ${index + 1}`}
                  className="image-preview"
                />
                <button
                  type="button"
                  className="image-remove-button"
                  onClick={() => removeImage(index)}
                  aria-label={`Xóa ảnh ${index + 1}`}
                >
                  ×
                </button>
                <span className="image-filename">{file.name}</span>
              </div>
            ))}
          </div>
        )}

        {errors.images && (
          <span style={{ color: "#ef4444", fontSize: "14px", marginTop: "4px", display: "block" }}>
            {errors.images}
          </span>
        )}
      </div>

      {/* Confirmation Checkbox */}
      <div
        style={{
          padding: "16px",
          backgroundColor: "#fef3c7",
          border: "2px solid #fcd34d",
          borderRadius: "12px",
          marginTop: "24px",
        }}
      >
        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
          <div style={{ flexShrink: 0, marginTop: "2px" }}>
            <Checkbox
              id="pd-confirm"
              checked={confirmChecked}
              onCheckedChange={(checked) => setConfirmChecked(!!checked)}
            />
          </div>
          <Label
            htmlFor="pd-confirm"
            style={{
              fontSize: "14px",
              margin: 0,
              fontWeight: 500,
              color: "#92400e",
              cursor: "pointer",
              lineHeight: "1.5",
              paddingTop: "3px",
            }}
          >
            Tôi xác nhận tất cả thông tin sản phẩm là chính xác và tuân thủ quy định nền tảng
          </Label>
        </div>
      </div>
      {errors.confirm && (
        <div style={{ color: "#dc2626", fontSize: "14px", marginTop: "8px", display: "block" }}>
          {errors.confirm}
        </div>
      )}

    </form>
  );
};

export default ProductDetails;
