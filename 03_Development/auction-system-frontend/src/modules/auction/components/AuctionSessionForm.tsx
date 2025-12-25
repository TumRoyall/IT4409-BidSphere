import { useCallback, useMemo } from "react";
import { Input } from "@/components/common/Input";
import { Label } from "@/components/common/Label";
import { AlertCircle, Info } from "lucide-react";
import "@/styles/auction-session-form.css";

interface FormData {
  startTime: string;
  endTime: string;
  bidStepAmount: number;
}

interface FormErrors {
  [key: string]: string;
}

interface AuctionSessionFormProps {
  formData: FormData;
  errors: FormErrors;
  onFieldChange: (field: keyof FormData, value: any) => void;
}

/**
 * Auction session form component for setting schedule and bid parameters.
 * Handles date/time selection and minimum bid increment configuration.
 */
export const AuctionSessionForm = ({
  formData,
  errors,
  onFieldChange,
}: AuctionSessionFormProps) => {
  // Calculate minimum allowed start time (1 hour from now)
  const minStartDateTime = useMemo(() => {
    const now = new Date();
    const minTime = new Date(now.getTime() + 60 * 60 * 1000);
    return minTime.toISOString().slice(0, 16);
  }, []);

  // Calculate minimum allowed end time
  const minEndDateTime = useMemo(() => {
    if (!formData.startTime) return minStartDateTime;
    return formData.startTime;
  }, [formData.startTime, minStartDateTime]);

  // Validate date logic
  const dateValidation = useMemo(() => {
    if (!formData.startTime || !formData.endTime) {
      return { isValid: false, message: "" };
    }

    const start = new Date(formData.startTime);
    const end = new Date(formData.endTime);
    const now = new Date();

    // Check start time is in future
    const minStartTime = new Date(now.getTime() + 60 * 60 * 1000);
    if (start < minStartTime) {
      return {
        isValid: false,
        message: "Start time must be at least 1 hour from now",
      };
    }

    // Check end time is after start time
    if (end <= start) {
      return {
        isValid: false,
        message: "End time must be after start time",
      };
    }

    // Check duration
    const duration = end.getTime() - start.getTime();
    const ONE_HOUR = 60 * 60 * 1000;
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

    if (duration < ONE_HOUR) {
      return {
        isValid: false,
        message: "Auction must last at least 1 hour",
      };
    }

    if (duration > THIRTY_DAYS) {
      return {
        isValid: false,
        message: "Auction cannot exceed 30 days",
      };
    }

    return { isValid: true, message: "" };
  }, [formData.startTime, formData.endTime]);

  const handleStartTimeChange = useCallback(
    (value: string) => {
      onFieldChange("startTime", value);
    },
    [onFieldChange]
  );

  const handleEndTimeChange = useCallback(
    (value: string) => {
      onFieldChange("endTime", value);
    },
    [onFieldChange]
  );

  const handleBidIncrementChange = useCallback(
    (value: string) => {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue)) {
        onFieldChange("bidStepAmount", numValue);
      }
    },
    [onFieldChange]
  );

  return (
    <div className="auction-session-form">
      <div className="form-section-header">
        <h3 className="form-section-title">Schedule & Parameters</h3>
        <p className="form-section-description">
          Set when your auction will run and configure bidding rules
        </p>
      </div>

      {/* Date & Time Grid */}
      <div className="form-grid form-grid-2">
        {/* Start Time */}
        <div className="form-field">
          <Label htmlFor="startTime" className="form-field-label">
            Start Date & Time <span className="required">*</span>
          </Label>
          <Input
            id="startTime"
            type="datetime-local"
            value={formData.startTime}
            onChange={(e) => handleStartTimeChange(e.target.value)}
            min={minStartDateTime}
            className={`form-input ${errors.startTime ? "error" : ""}`}
            aria-invalid={!!errors.startTime}
            aria-describedby={errors.startTime ? "err-startTime" : undefined}
          />
          {errors.startTime && (
            <div id="err-startTime" className="field-error">
              <AlertCircle size={16} />
              {errors.startTime}
            </div>
          )}
          <p className="field-hint">
            Must be at least 1 hour from now
          </p>
        </div>

        {/* End Time */}
        <div className="form-field">
          <Label htmlFor="endTime" className="form-field-label">
            End Date & Time <span className="required">*</span>
          </Label>
          <Input
            id="endTime"
            type="datetime-local"
            value={formData.endTime}
            onChange={(e) => handleEndTimeChange(e.target.value)}
            min={minEndDateTime}
            className={`form-input ${errors.endTime ? "error" : ""}`}
            aria-invalid={!!errors.endTime}
            aria-describedby={errors.endTime ? "err-endTime" : undefined}
          />
          {errors.endTime && (
            <div id="err-endTime" className="field-error">
              <AlertCircle size={16} />
              {errors.endTime}
            </div>
          )}
          <p className="field-hint">
            Must be after start time (1 hour - 30 days duration)
          </p>
        </div>
      </div>

      {/* Date Validation Message */}
      {formData.startTime && formData.endTime && !dateValidation.isValid && (
        <div className="validation-warning">
          <AlertCircle size={16} />
          <span>{dateValidation.message}</span>
        </div>
      )}

      {/* Minimum Bid Increment */}
      <div className="form-field">
        <Label htmlFor="bidStepAmount" className="form-field-label">
          Minimum Bid Increment (VNĐ) <span className="required">*</span>
        </Label>
        <div className="input-with-currency">
          <span className="currency-prefix">₫</span>
          <Input
            id="bidStepAmount"
            type="number"
            value={formData.bidStepAmount}
            onChange={(e) => handleBidIncrementChange(e.target.value)}
            min="1000"
            step="1000"
            placeholder="10000"
            className={`form-input currency-input ${
              errors.bidStepAmount ? "error" : ""
            }`}
            aria-invalid={!!errors.bidStepAmount}
            aria-describedby={
              errors.bidStepAmount ? "err-bidStepAmount" : undefined
            }
          />
        </div>
        {errors.bidStepAmount && (
          <div id="err-bidStepAmount" className="field-error">
            <AlertCircle size={16} />
            {errors.bidStepAmount}
          </div>
        )}
        <p className="field-hint">
          The minimum amount bidders must increase from the current bid (minimum 1,000 VNĐ)
        </p>
      </div>

      {/* Information Box */}
      <div className="info-box">
        <Info size={16} />
        <div className="info-content">
          <p className="info-title">Important Information</p>
          <ul className="info-list">
            <li>
              Once created, only the end time can be extended
            </li>
            <li>
              Start price and deposit are inherited from the product
            </li>
            <li>
              Bidders must provide a deposit equal to or greater than the required amount
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuctionSessionForm;
