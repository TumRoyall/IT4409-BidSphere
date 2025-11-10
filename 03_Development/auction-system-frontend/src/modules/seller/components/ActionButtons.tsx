// src/modules/seller/components/ActionButtons.tsx
import React from "react";
import { Button } from "@/components/common/Button";
import "@/styles/seller.css";

interface ActionButtonsProps {
  onCancel: () => void;
  loading?: boolean;
}

const ActionButtons = ({ onCancel, loading }: ActionButtonsProps): JSX.Element => {
  const handleSubmit = () => {
    // Trigger hidden submit button trong ProductDetails
    const submitButton = document.getElementById("submit-product-form");
    if (submitButton) {
      submitButton.click();
    }
  };

  return (
    <footer className="action-buttons-section">
      <Button
        variant="outline"
        className="cancel-button"
        onClick={onCancel}
        disabled={loading}
      >
        Cancel
      </Button>

      <Button
        className="create-product-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Product"}
      </Button>
    </footer>
  );
};

export default ActionButtons;
