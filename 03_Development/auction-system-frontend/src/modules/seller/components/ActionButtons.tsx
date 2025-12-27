import type { ReactElement } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import "@/styles/modules/seller/index.css";

interface ActionButtonsProps {
  onCancel: () => void;
  loading?: boolean;
}

const ActionButtons = ({ onCancel, loading }: ActionButtonsProps): ReactElement => {
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
        type="submit"
        form="product-form"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <CheckCircle2 size={18} />
            Creating...
          </>
        ) : (
          "Create Product"
        )}
      </Button>
    </footer>
  );
};

export default ActionButtons;
