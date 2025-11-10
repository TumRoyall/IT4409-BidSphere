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
    <div style={{ padding: "24px", textAlign: "center" }}>
      {/* Alert Icon with gradient background */}
      <div style={{
        width: "80px",
        height: "80px",
        background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 24px",
        animation: "pulse 2s infinite"
      }}>
        <AlertCircle size={48} color="#dc2626" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h2 style={{
        fontSize: "20px",
        fontWeight: 700,
        color: "#1a202c",
        margin: "0 0 12px 0",
        lineHeight: 1.3
      }}>
        Delete This Product?
      </h2>

      {/* Product name highlight */}
      <div style={{
        padding: "12px 16px",
        background: "#f7fafc",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <p style={{
          margin: 0,
          fontSize: "14px",
          color: "#718096"
        }}>
          You are about to permanently delete:
        </p>
        <p style={{
          margin: "6px 0 0 0",
          fontSize: "15px",
          fontWeight: 700,
          color: "#2d3748",
          wordBreak: "break-word"
        }}>
          "{product.name}"
        </p>
      </div>

      {/* Warning messages */}
      <div style={{
        background: "linear-gradient(135deg, #fff5f5 0%, #ffe0e0 100%)",
        border: "1px solid #fca5a5",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "24px",
        textAlign: "left"
      }}>
        <p style={{
          margin: "0 0 8px 0",
          fontSize: "13px",
          fontWeight: 600,
          color: "#991b1b",
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}>
          <span style={{ fontSize: "16px" }}>⚠️</span> This action cannot be undone
        </p>
        <ul style={{
          margin: "8px 0 0 24px",
          paddingLeft: 0,
          fontSize: "13px",
          color: "#7f1d1d",
          lineHeight: 1.6
        }}>
          <li>All auction sessions associated with this product will be deleted</li>
          <li>Bidding history and records will be permanently removed</li>
          <li>This cannot be recovered once deleted</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: "flex",
        gap: "12px",
        justifyContent: "center",
        paddingTop: "20px",
        borderTop: "1px solid #e2e8f0"
      }}>
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          style={{
            minWidth: "140px",
            borderRadius: "6px",
            background: "#f7fafc",
            color: "#2d3748",
            border: "1px solid #cbd5e0"
          }}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirm}
          disabled={loading}
          style={{
            minWidth: "140px",
            borderRadius: "6px",
            background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
            color: "white",
            border: "none",
            boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)"
          }}
        >
          {loading ? "Deleting..." : "Delete Permanently"}
        </Button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default DeleteConfirmation;
