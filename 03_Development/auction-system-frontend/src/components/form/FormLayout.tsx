// src/components/form/FormLayout.tsx
import { ReactNode } from "react";
import { X } from "lucide-react";
import "@/styles/form.css";

interface FormLayoutProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  className?: string;
}

export function FormLayout({
  title,
  children,
  footer,
  onClose,
  className = "",
}: FormLayoutProps) {
  return (
    <div className={`form-container ${className}`}>
      <div className="form-card">
        {/* Header */}
        <div className="form-header">
          <h1 className="form-title">{title}</h1>
          {onClose && (
            <button
              onClick={onClose}
              className="form-close-button"
              aria-label="Close"
              type="button"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="form-content">{children}</div>

        {/* Footer */}
        {footer && <div className="form-footer">{footer}</div>}
      </div>
    </div>
  );
}
