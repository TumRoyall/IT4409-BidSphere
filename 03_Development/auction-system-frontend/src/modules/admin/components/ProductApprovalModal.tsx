import React, { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Textarea } from "@/components/common/TextArea";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import type { Product } from "@/modules/product/types";
import { userApi } from "@/api/modules/user.api";

interface ProductApprovalModalProps {
  product: Product | null;
  loading?: boolean;
  onApprove: (productId: number, data: ProductApprovalRequest) => Promise<void>;
  onReject: (productId: number, reason: string) => Promise<void>;
  onCancel: () => void;
}

export interface ProductApprovalRequest {
  deposit: number;
  estimatePrice: number;
  status: "approved" | "rejected";
  rejectionReason?: string;
}

interface SellerInfo {
  id?: number;
  fullName?: string;
  username?: string;
  email?: string;
  phone?: string;
  status?: string;
  createdAt?: string;
  address?: string;
  avatarUrl?: string;
}

const ProductApprovalModal: React.FC<ProductApprovalModalProps> = ({
  product,
  loading: _loading,
  onApprove,
  onReject,
  onCancel,
}) => {
  const [formData, setFormData] = useState<{
    deposit: string;
    estimatePrice: string;
    rejectionReason: string;
  }>({
    deposit: "0",
    estimatePrice: "0",
    rejectionReason: "",
  });

  const [sellerInfo, setSellerInfo] = useState<SellerInfo | null>(null);
  const [sellerInfoLoading, setSellerInfoLoading] = useState(false);
  const [sellerInfoError, setSellerInfoError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        deposit: product.deposit ? String(product.deposit) : "0",
        estimatePrice: product.estimatePrice ? String(product.estimatePrice) : "0",
        rejectionReason: "",
      });
      setAction(null);
      setSubmitError(null);
    }
  }, [product]);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumericChange = (field: "deposit" | "estimatePrice") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({
        ...prev,
        [field]: digitsOnly,
      }));
    };

  const handleNumericFocus = (field: "deposit" | "estimatePrice") => () => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] === "0" ? "" : prev[field],
    }));
  };

  const handleNumericBlur = (field: "deposit" | "estimatePrice") => () => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field] === "" ? "0" : prev[field],
    }));
  };

  const depositNumber = Number(formData.deposit || "0");
  const estimateNumber = Number(formData.estimatePrice || "0");

  useEffect(() => {
    let ignore = false;

    const fetchSellerInfo = async () => {
      if (!product?.sellerId) {
        setSellerInfo(null);
        setSellerInfoError(null);
        setSellerInfoLoading(false);
        return;
      }

      setSellerInfo(null);
      setSellerInfoError(null);
      setSellerInfoLoading(true);

      try {
        const info = await userApi.getPublicProfile(Number(product.sellerId));
        if (!ignore) {
          setSellerInfo(info);
        }
      } catch (err: any) {
        if (!ignore) {
          setSellerInfo(null);
          setSellerInfoError(err?.message || "Không thể tải thông tin người bán");
        }
      } finally {
        if (!ignore) {
          setSellerInfoLoading(false);
        }
      }
    };

    fetchSellerInfo();

    return () => {
      ignore = true;
    };
  }, [product?.sellerId]);

  const handleApprove = async () => {
    const productId =
      product?.productId ??
      (product as any)?.id ??
      (product as any)?.product_id;
    console.log("🔵 handleApprove called, product:", product);
    console.log("🔍 productId resolved to:", productId);
    if (!productId) {
      console.warn("❌ No product_id found in product object");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      // Validate
      if (depositNumber < 0) {
        throw new Error("Deposit cannot be negative");
      }
      if (estimateNumber < 0) {
        throw new Error("Estimate price cannot be negative");
      }

      const payload: ProductApprovalRequest = {
        deposit: depositNumber,
        estimatePrice: estimateNumber,
        status: "approved",
      };

      console.log("📤 Approving product:", JSON.stringify(payload, null, 2));
      console.log("📞 Calling onApprove with productId:", productId);
      await onApprove(productId, payload);
      console.log("✅ onApprove completed, calling onCancel");
      onCancel();
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to approve product";
      console.error("❌ Approval error:", error);
      console.error("📋 Error details:", {
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data,
      });
      setSubmitError(errorMsg);
    } finally {
      console.log("🏁 handleApprove finally block, isSubmitting=false");
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    const productId =
      product?.productId ??
      (product as any)?.id ??
      (product as any)?.product_id;
    console.log("🔴 handleReject called, product:", product);
    console.log("🔍 productId resolved to:", productId);
    if (!productId) {
      console.warn("❌ No product_id found in product object");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);

      if (!formData.rejectionReason.trim()) {
        throw new Error("Please provide a rejection reason");
      }

      console.log("❌ Rejecting product. Reason:", formData.rejectionReason);
      console.log("📞 Calling onReject with productId:", productId);
      await onReject(productId, formData.rejectionReason);
      console.log("✅ onReject completed, calling onCancel");
      onCancel();
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to reject product";
      console.error("❌ Rejection error:", error);
      console.error("📋 Error details:", {
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data,
      });
      setSubmitError(errorMsg);
    } finally {
      console.log("🏁 handleReject finally block, isSubmitting=false");
      setIsSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (value?: string) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "—";
    }
    return date.toLocaleDateString("vi-VN");
  };

  if (!product) return null;

  return (
    <div
      style={{
        background: "white",
        borderRadius: "12px",
        padding: "28px",
        maxWidth: "600px",
        maxHeight: "90vh",
        overflowY: "auto",
      }}
    >
      {/* Error Alert */}
      {submitError && (
        <div
          style={{
            background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
            border: "1px solid #fca5a5",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
              flex: 1,
            }}
          >
            <AlertCircle
              size={20}
              style={{
                color: "#dc2626",
                flexShrink: 0,
                marginTop: "2px",
              }}
            />
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#7f1d1d",
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
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
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Header */}
      <div
        style={{
          marginBottom: "24px",
          paddingBottom: "16px",
          borderBottom: "2px solid #e2e8f0",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: 700,
            color: "#1a202c",
            marginBottom: "8px",
          }}
        >
          Product Approval Review
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#718096",
            fontWeight: 500,
          }}
        >
          Reviewing: <strong style={{ color: "#2d3748" }}>{product.name}</strong>
        </p>
      </div>

      {/* Product Info */}
      <div
        style={{
          background: "#f7fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "20px",
        }}
      >
        <h4
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#718096",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            margin: "0 0 12px 0",
          }}
        >
          Product Details
        </h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            fontSize: "13px",
          }}
        >
          <div>
            <span style={{ color: "#718096", fontSize: "11px", fontWeight: 600 }}>
              START PRICE
            </span>
            <p style={{ color: "#2d3748", fontWeight: 600, margin: "4px 0 0 0" }}>
              {formatPrice(product.startPrice || 0)}
            </p>
          </div>
          <div>
            <span style={{ color: "#718096", fontSize: "11px", fontWeight: 600 }}>
              CATEGORY
            </span>
            <p style={{ color: "#2d3748", fontWeight: 600, margin: "4px 0 0 0" }}>
              {product.category || "—"}
            </p>
          </div>
        </div>
        <div style={{ marginTop: "12px" }}>
          <span style={{ color: "#718096", fontSize: "11px", fontWeight: 600 }}>
            DESCRIPTION
          </span>
          <p
            style={{
              color: "#4a5568",
              fontSize: "12px",
              margin: "4px 0 0 0",
              lineHeight: 1.4,
            }}
          >
            {product.description || "—"}
          </p>
        </div>
      </div>

        {/* Seller Info */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "20px",
          }}
        >
          <h4
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#718096",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              margin: "0 0 12px 0",
            }}
          >
            Seller Information
          </h4>

          {sellerInfoLoading ? (
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#4a5568",
                fontWeight: 500,
              }}
            >
              Loading seller details...
            </p>
          ) : sellerInfoError ? (
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#b45309",
                fontWeight: 500,
              }}
            >
              {sellerInfoError}
            </p>
          ) : sellerInfo ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "12px",
                fontSize: "13px",
              }}
            >
              <div>
                <span style={{ color: "#718096", fontSize: "11px", fontWeight: 600 }}>
                  Seller
                </span>
                <p style={{ margin: "4px 0 0 0", color: "#1f2937", fontWeight: 600 }}>
                  {sellerInfo.fullName || sellerInfo.username || "—"}
                </p>
              </div>
              <div>
                <span style={{ color: "#718096", fontSize: "11px", fontWeight: 600 }}>
                  Seller ID
                </span>
                <p style={{ margin: "4px 0 0 0", color: "#1f2937", fontWeight: 600 }}>
                  {product?.sellerId ?? "—"}
                </p>
              </div>
              <div>
                <span style={{ color: "#718096", fontSize: "11px", fontWeight: 600 }}>
                  Email
                </span>
                <p style={{ margin: "4px 0 0 0", color: "#1f2937" }}>
                  {sellerInfo.email || "—"}
                </p>
              </div>
              <div>
                <span style={{ color: "#718096", fontSize: "11px", fontWeight: 600 }}>
                  Phone
                </span>
                <p style={{ margin: "4px 0 0 0", color: "#1f2937" }}>
                  {sellerInfo.phone || "—"}
                </p>
              </div>
              <div>
                <span style={{ color: "#718096", fontSize: "11px", fontWeight: 600 }}>
                  Status
                </span>
                <p style={{ margin: "4px 0 0 0", color: "#1f2937" }}>
                  {sellerInfo.status || "—"}
                </p>
              </div>
              <div>
                <span style={{ color: "#718096", fontSize: "11px", fontWeight: 600 }}>
                  Member Since
                </span>
                <p style={{ margin: "4px 0 0 0", color: "#1f2937" }}>
                  {formatDate(sellerInfo.createdAt)}
                </p>
              </div>
            </div>
          ) : (
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#4a5568",
                fontWeight: 500,
              }}
            >
              Không tìm thấy thông tin người bán.
            </p>
          )}
        </div>

      {/* Approval Form */}
      {action === "approve" ? (
        <div style={{ marginBottom: "20px" }}>
          <h4
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#2d3748",
              marginBottom: "16px",
              margin: "0 0 16px 0",
            }}
          >
            Set Financial Terms for Approval
          </h4>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="deposit"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                display: "block",
                color: "#2d3748",
              }}
            >
              Deposit Required (VND) <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <Input
              id="deposit"
              name="deposit"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData.deposit}
              onChange={handleNumericChange("deposit")}
              onFocus={handleNumericFocus("deposit")}
              onBlur={handleNumericBlur("deposit")}
              placeholder="0"
              disabled={isSubmitting}
              style={{
                width: "100%",
                borderRadius: "6px",
                borderColor: "#cbd5e0",
                padding: "10px 12px",
              }}
            />
            {depositNumber > 0 && (
              <p
                style={{
                  fontSize: "12px",
                  color: "#667eea",
                  marginTop: "6px",
                  fontWeight: 600,
                }}
              >
                {formatPrice(depositNumber)}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="estimatePrice"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                display: "block",
                color: "#2d3748",
              }}
            >
              Estimate Price (VND) <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <Input
              id="estimatePrice"
              name="estimatePrice"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData.estimatePrice}
              onChange={handleNumericChange("estimatePrice")}
              onFocus={handleNumericFocus("estimatePrice")}
              onBlur={handleNumericBlur("estimatePrice")}
              placeholder="0"
              disabled={isSubmitting}
              style={{
                width: "100%",
                borderRadius: "6px",
                borderColor: "#cbd5e0",
                padding: "10px 12px",
              }}
            />
            {estimateNumber > 0 && (
              <p
                style={{
                  fontSize: "12px",
                  color: "#667eea",
                  marginTop: "6px",
                  fontWeight: 600,
                }}
              >
                {formatPrice(estimateNumber)}
              </p>
            )}
          </div>
        </div>
      ) : action === "reject" ? (
        <div style={{ marginBottom: "20px" }}>
          <h4
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#2d3748",
              marginBottom: "16px",
              margin: "0 0 16px 0",
            }}
          >
            Provide Rejection Reason
          </h4>

          <div>
            <label
              htmlFor="rejectionReason"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                display: "block",
                color: "#2d3748",
              }}
            >
              Reason <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <Textarea
              id="rejectionReason"
              name="rejectionReason"
              value={formData.rejectionReason}
              onChange={handleTextChange}
              placeholder="Explain why this product is being rejected..."
              rows={4}
              disabled={isSubmitting}
              style={{
                width: "100%",
                fontFamily: "inherit",
                borderRadius: "6px",
                borderColor: "#cbd5e0",
                padding: "10px 12px",
                resize: "vertical",
              }}
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            background: "#fef3c7",
            border: "1px solid #fcd34d",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#92400e",
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            📋 Choose an action below: Approve (set deposit/estimate) or Reject
            (provide reason).
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "flex-end",
          paddingTop: "16px",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        {action === null ? (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              style={{ minWidth: "120px", borderRadius: "6px" }}
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={() => setAction("reject")}
              disabled={isSubmitting}
              style={{
                minWidth: "120px",
                borderRadius: "6px",
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              }}
            >
              <XCircle size={16} style={{ marginRight: "6px" }} />
              Reject
            </Button>
            <Button
              type="button"
              onClick={() => setAction("approve")}
              disabled={isSubmitting}
              style={{
                minWidth: "120px",
                borderRadius: "6px",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              }}
            >
              <CheckCircle2 size={16} style={{ marginRight: "6px" }} />
              Approve
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setAction(null)}
              disabled={isSubmitting}
              style={{ minWidth: "120px", borderRadius: "6px" }}
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={action === "approve" ? handleApprove : handleReject}
              disabled={isSubmitting}
              style={{
                minWidth: "140px",
                borderRadius: "6px",
                background:
                  action === "approve"
                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                    : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              }}
            >
              {isSubmitting
                ? action === "approve"
                  ? "Approving..."
                  : "Rejecting..."
                : action === "approve"
                  ? "Confirm Approval"
                  : "Confirm Rejection"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductApprovalModal;
