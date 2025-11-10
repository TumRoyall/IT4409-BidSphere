// src/modules/auction/components/AuctionValidationError.tsx
import { AlertCircle } from "lucide-react";
import "@/styles/validation-error.css";

interface AuctionValidationErrorProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
}

/**
 * Error display component for form validation and submission errors.
 * Shows error messages in a prominent, user-friendly format.
 */
export const AuctionValidationError = ({
  title = "Error",
  message,
  onDismiss,
}: AuctionValidationErrorProps) => {
  return (
    <div className="validation-error-alert">
      <div className="error-icon">
        <AlertCircle size={20} />
      </div>
      <div className="error-content">
        <p className="error-title">{title}</p>
        <p className="error-message">{message}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="error-dismiss"
          aria-label="Dismiss error"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default AuctionValidationError;
