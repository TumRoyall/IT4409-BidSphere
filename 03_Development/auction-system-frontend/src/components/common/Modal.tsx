import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";
import "@/styles/modal.css";

export interface ModalProps {
  /**
   * Control whether the modal is open. When set to false the modal
   * returns null and nothing is rendered.
   */
  isOpen: boolean;
  /**
   * Called when the user closes the modal via the close button, ESC key
   * or clicking the overlay.
   */
  onClose: () => void;
  /**
   * Heading displayed at the top of the modal.
   */
  title: React.ReactNode;
  /**
   * Optional subtitle displayed below the title.
   */
  subtitle?: React.ReactNode;
  /**
   * Content of the modal. Can be any React nodes.
   */
  children: React.ReactNode;
  /**
   * Size of the modal. Adjusts width in CSS.
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Optional class applied to the modal container for custom styling.
   */
  className?: string;
  /**
   * Optional class applied to the modal content wrapper for custom styling.
   */
  contentClassName?: string;
}

/**
 * A simple modal component with overlay. It locks scrolling while open and
 * listens for the ESC key to trigger the `onClose` callback. Styling is
 * provided via an external CSS file in `styles/modal.css`.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = "lg",
  className,
  contentClassName,
}) => {
  // Prevent body scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close modal when ESC key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Close when clicking the overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-container modal-${size} ${className ?? ""}`} role="dialog" aria-modal="true">
        {/* Header */}
        <div className="modal-header">
        <div className="modal-header-content">
        <h2 className="modal-title">{title}</h2>
        {subtitle && <p className="modal-subtitle">{subtitle}</p>}
        </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="modal-close-button"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        {/* Content */}
        <div className={`modal-content ${contentClassName ?? ""}`}>{children}</div>
      </div>
    </div>
  );
};

Modal.displayName = "Modal";