// src/modules/seller/components/DeleteConfirmation.tsx
import React from "react";
import { Button } from "@/components/common/Button";
import { AlertCircle } from "lucide-react";
import type { Product } from "../types/seller.types";
import "@/styles/seller.css";

interface DeleteConfirmationProps {
  product: Product | null;
  loading?: boolean;
  onConfirm: (product: Product) => Promise<void>;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  product,
  loading,
  onConfirm,
  onCancel,
}) => {
  const handleConfirm = async () => {
    if (product) {
      await onConfirm(product);
    }
  };

  if (!product) return null;

  return (
    <div style={{
      padding: "24px",
      textAlign: "center",
      maxWidth: "500px",
      margin: "0 auto"
    }}>
      {/* Alert Icon with clean background */}
      <div style={{
        width: "80px",
        height: "80px",
        background: "#fee2e2",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 24px",
        border: "2px solid #fca5a5"
      }}>
        <AlertCircle size={48} color="#dc2626" strokeWidth={2} />
      </div>

      {/* Title */}
      <h2 style={{
        fontSize: "24px",
        fontWeight: 700,
        color: "#1e293b",
        margin: "0 0 12px 0",
        lineHeight: 1.3
      }}>
        Delete This Product?
      </h2>

      {/* Product name highlight */}
      <div style={{
        padding: "16px",
        background: "#f8fafc",
        border: "2px solid #e2e8f0",
        borderRadius: "12px",
        marginBottom: "20px"
      }}>
        <p style={{
          margin: 0,
          fontSize: "14px",
          color: "#64748b",
          fontWeight: 500
        }}>
          You are about to permanently delete:
        </p>
        <p style={{
          margin: "8px 0 0 0",
          fontSize: "16px",
          fontWeight: 700,
          color: "#1e3a5f",
          wordBreak: "break-word"
        }}>
          "{product.name}"
        </p>
      </div>

      {/* Warning messages */}
      <div style={{
        background: "#fef2f2",
        border: "2px solid #fca5a5",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "24px",
        textAlign: "left"
      }}>
        <p style={{
          margin: "0 0 12px 0",
          fontSize: "14px",
          fontWeight: 600,
          color: "#991b1b",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <span style={{ fontSize: "18px" }}>⚠️</span>
          This action cannot be undone
        </p>
        <ul style={{
          margin: "0",
          paddingLeft: "24px",
          fontSize: "13px",
          color: "#7f1d1d",
          lineHeight: 1.8
        }}>
          <li>All auction sessions associated with this product will be deleted</li>
          <li>Bidding history and records will be permanently removed</li>
          <li>This cannot be recovered once deleted</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons-section" style={{
        display: "flex",
        gap: "16px",
        justifyContent: "center",
        paddingTop: "24px"
      }}>
        <Button
          variant="outline"
          className="cancel-button"
          onClick={onCancel}
          disabled={loading}
          style={{
            width: "auto",
            minWidth: "140px"
          }}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleConfirm}
          disabled={loading}
          style={{
            width: "auto",
            minWidth: "140px"
          }}
        >
          {loading ? "Deleting..." : "Delete Permanently"}
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;