// src/modules/product/pages/CreateProduct.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/common/Button";
import { Input, Label } from "@/components/common";
import CategorySelect from "@/components/common/CategorySelect";
import productApi from "@/api/modules/product.api";
import { useAuth } from "@/hooks/useAuth";
import "@/styles/form.css";

interface CreateProductFormData {
  name: string;
  description: string;
  category: string;
  startPrice: number;
  images: File[];
  imagePreviews: string[];
}

export default function CreateProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<CreateProductFormData>({
    name: "",
    description: "",
    category: "",
    startPrice: 0,
    images: [],
    imagePreviews: [],
  });

  const categories = [
    "Điện tử",
    "Thời trang",
    "Xe cộ",
    "Nội thất",
    "Sưu tầm",
    "Tiêu dùng",
    "Trang sức",
    "Khác",
  ];

  // Load product if editing
  useEffect(() => {
    if (isEditMode && id) {
      const loadProduct = async () => {
        try {
          const response = await productApi.getProductById(Number(id));
          const product = response.data;
          setFormData({
            name: product.name,
            description: product.description || "",
            category: product.category || "",
            startPrice: product.startPrice || 0,
            // deposit assigned by admin on approval
            images: [],
            imagePreviews: product.imageUrl ? [product.imageUrl] : [],
          });
        } catch (error) {
          console.error("Failed to load product:", error);
          alert("Failed to load product data");
        }
      };
      loadProduct();
    }
  }, [id, isEditMode]);

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (formData.startPrice <= 0) {
      newErrors.startPrice = "Start price must be greater than 0";
    }

    // deposit is assigned by admin; sellers don't set it here

    if (formData.images.length === 0) {
      newErrors.images = "At least one product image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...formData.images, ...files];
    const newPreviews = newImages.map((file) => URL.createObjectURL(file));

    setFormData({
      ...formData,
      images: newImages,
      imagePreviews: newPreviews,
    });
  };

  // Remove image
  const handleRemoveImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = formData.imagePreviews.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      images: newImages,
      imagePreviews: newPreviews,
    });
  };

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      console.warn("Form validation failed:", errors);
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (!user?.id) {
      toast.error("Không thể xác định người bán. Vui lòng đăng nhập lại.");
      return;
    }

    setLoading(true);
    try {
      if (formData.images.length === 0) throw new Error("Please select at least one image");

      // Upload all selected images and build images payload for backend
      const uploadPromises = formData.images.map((f) => productApi.uploadImage(f));
      const uploadResponses = await Promise.all(uploadPromises);
      const uploadedImages = uploadResponses
        .map((r) => {
          const data = r?.data;
          if (!data) return null;
          const imageUrl = data.imageUrl ?? data.image_url ?? data.secure_url ?? data.secureUrl;
          const secureUrl = data.secure_url ?? data.secureUrl ?? null;
          if (!imageUrl) return null;
          return { imageUrl, secureUrl };
        })
        .filter(Boolean) as Array<{ imageUrl: string; secureUrl: string | null }>;

      if (uploadedImages.length === 0) {
        throw new Error("Failed to upload images or retrieve URLs");
      }

      // Build images payload; mark first image as thumbnail by default
      const imagesPayload = uploadedImages.map((img, idx) => ({
        imageUrl: img.imageUrl,
        secureUrl: img.secureUrl ?? img.imageUrl,
        isThumbnail: idx === 0,
      }));

      const productPayload = {
        name: formData.name,
        description: formData.description || null,
        category: formData.category || null,
        startPrice: formData.startPrice || 0,
        // deposit omitted (assigned by admin on approval)
        images: imagesPayload,
      };

      if (isEditMode && id) {
        await productApi.updateProduct(Number(id), productPayload);
        toast.success("Product updated successfully!");
      } else {
        await productApi.createProduct(productPayload);
        toast.success("Product created successfully!");
      }

      // Reset form data
      setFormData({
        name: "",
        description: "",
        category: "",
        startPrice: 0,
        images: [],
        imagePreviews: [],
      });

      // Delay navigation để đảm bảo backend xử lý xong
      setTimeout(() => {
        navigate("/seller", { replace: true });
      }, 300);
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        `Failed to ${isEditMode ? "update" : "create"} product`;
      console.error("Submit error:", error);
      toast.error(`${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/seller");
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            {isEditMode ? "Edit Product" : "Create New Product"}
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          {/* Basic Information Section */}
          <div className="form-section create-form-section">
            <div className="create-form-section-header">
              <div className="create-form-section-indicator"></div>
              <h2 className="create-form-section-title">Basic Information</h2>
            </div>

            <div className="form-field">
              <Label htmlFor="name" className="form-field-label">
                Product Name <span className="form-field-required">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`form-input ${errors.name ? "input-error" : ""}`}
                required
              />
              {errors.name && (
                <div className="form-validation-error">{errors.name}</div>
              )}
            </div>

            <div className="form-field">
              <Label htmlFor="category" className="form-field-label">
                Category <span className="form-field-required">*</span>
              </Label>
              <CategorySelect
                value={formData.category}
                onChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
                error={!!errors.category}
                categories={categories}
                placeholder="Select a category"
              />
              {errors.category && (
                <div className="form-validation-error">{errors.category}</div>
              )}
            </div>

            <div className="form-field">
              <Label htmlFor="description" className="form-field-label">
                Description <span className="form-field-required">*</span>
              </Label>
              <textarea
                id="description"
                placeholder="Describe your product in detail..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={`form-textarea ${errors.description ? "input-error" : ""
                  }`}
                required
              />
              {errors.description && (
                <div className="form-validation-error">
                  {errors.description}
                </div>
              )}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="form-section create-form-section">
            <div className="create-form-section-header">
              <div className="create-form-section-indicator"></div>
              <h2 className="create-form-section-title">Pricing</h2>
            </div>

            <div className="form-row form-row-2">
              <div className="form-field">
                <Label htmlFor="startPrice" className="form-field-label">
                  Start Price <span className="form-field-required">*</span>
                </Label>
                <div className="form-input-with-prefix">
                  <span className="form-input-prefix">$</span>
                  <Input
                    id="startPrice"
                    type="number"
                    placeholder="0.00"
                    value={formData.startPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        startPrice: Number(e.target.value),
                      })
                    }
                    className={`form-input ${errors.startPrice ? "input-error" : ""
                      }`}
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
                {errors.startPrice && (
                  <div className="form-validation-error">
                    {errors.startPrice}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="form-section create-form-section">
            <div className="create-form-section-header">
              <div className="create-form-section-indicator"></div>
              <h2 className="create-form-section-title">Product Images</h2>
            </div>

            <div className="form-image-upload-area">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                id="imageInput"
              />
              <label htmlFor="imageInput" style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <Upload size={32} className="form-image-upload-icon" />
                <span className="form-image-upload-text">
                  Drag & drop images here or click to select
                </span>
                <span className="form-image-upload-subtext">
                  PNG, JPG, GIF up to 10MB
                </span>
              </label>
            </div>

            {/* Image Previews */}
            {formData.imagePreviews.length > 0 && (
              <div className="form-image-preview-grid">
                {formData.imagePreviews.map((preview, index) => (
                  <div key={index} className="form-image-preview-item">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="form-image-preview"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="form-image-remove-btn"
                      title="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {errors.images && (
              <div className="form-validation-error">{errors.images}</div>
            )}
          </div>

          {/* Preview Section */}
          <div className="form-preview-section">
            <h3 className="form-preview-title">Preview</h3>
            <div className="form-preview-grid">
              <div className="form-preview-item">
                <span className="form-preview-label">Product Name</span>
                <span className="form-preview-value">
                  {formData.name || "—"}
                </span>
              </div>
              <div className="form-preview-item">
                <span className="form-preview-label">Category</span>
                <span className="form-preview-value">
                  {formData.category || "—"}
                </span>
              </div>
              <div className="form-preview-item">
                <span className="form-preview-label">Start Price</span>
                <span className="form-preview-value">
                  ${(formData.startPrice ?? 0).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="form-preview-note">
              <p>
                📌 <strong>Note:</strong> Once approved by admin, this product can
                be used in auction sessions.
              </p>
            </div>
          </div>

          {/* Footer Buttons integrated into form flow */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <Button
              variant="outline"
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-6"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 hover:from-blue-700 hover:to-indigo-700 shadow-sm hover:shadow-md transition-all"
            >
              {loading
                ? "Creating..."
                : isEditMode
                  ? "Update Product"
                  : "Create Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
