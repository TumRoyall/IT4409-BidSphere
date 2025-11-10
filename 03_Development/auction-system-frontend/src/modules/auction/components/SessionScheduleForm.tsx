// src/modules/auction/components/SessionScheduleForm.tsx
import { Input, Label } from "@/components/common";

interface SessionScheduleFormProps {
  startTime: string;
  endTime: string;
  minBidIncrement: number;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onMinBidIncrementChange: (value: number) => void;
}

export default function SessionScheduleForm({
  startTime,
  endTime,
  minBidIncrement,
  onStartTimeChange,
  onEndTimeChange,
  onMinBidIncrementChange,
}: SessionScheduleFormProps) {
  // Get current datetime for min attribute
  const now = new Date();
  const minDateTime = new Date(now.getTime() + 60 * 60 * 1000) // 1 hour from now
    .toISOString()
    .slice(0, 16);

  return (
    <div className="form-section">
      <h2 className="form-section-title">Session Schedule</h2>

      {/* Start & End Time Row */}
      <div className="form-row form-row-2">
        <div className="form-field">
          <Label htmlFor="startTime" className="form-field-label">
            Start Date & Time <span className="form-field-required">*</span>
          </Label>
          <Input
            id="startTime"
            type="datetime-local"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            min={minDateTime}
            className="form-input"
            required
          />
        </div>

        <div className="form-field">
          <Label htmlFor="endTime" className="form-field-label">
            End Date & Time <span className="form-field-required">*</span>
          </Label>
          <Input
            id="endTime"
            type="datetime-local"
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            min={startTime || minDateTime}
            className="form-input"
            required
          />
        </div>
      </div>

      {/* Minimum Bid Increment */}
      <div className="form-field">
        <Label htmlFor="minBidIncrement" className="form-field-label">
          Minimum Bid Increment
        </Label>
        <div className="form-input-with-prefix">
          <span className="form-input-prefix">$</span>
          <Input
            id="minBidIncrement"
            type="number"
            value={minBidIncrement}
            onChange={(e) => onMinBidIncrementChange(Number(e.target.value))}
            min={1}
            step={0.01}
            className="form-input"
          />
        </div>
        <p className="form-field-hint">
          The minimum amount bidders must increase from the current bid
        </p>
      </div>

      {/* Validation Messages */}
      {startTime && endTime && new Date(endTime) <= new Date(startTime) && (
        <div className="form-validation-error">
          ⚠️ End time must be after start time
        </div>
      )}

      {startTime && new Date(startTime) < new Date() && (
        <div className="form-validation-warning">
          ⚠️ Start time should be in the future
        </div>
      )}
    </div>
  );
}
