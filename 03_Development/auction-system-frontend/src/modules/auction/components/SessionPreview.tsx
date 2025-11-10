// src/modules/auction/components/SessionPreview.tsx
interface SessionPreviewProps {
  duration: string;
  startPrice: number;
  bidIncrement: number;
  deposit: number;
}

export default function SessionPreview({
  duration = "—",
  startPrice = 0,
  bidIncrement = 0,
  deposit = 0,
}: SessionPreviewProps) {
  return (
    <div className="form-preview-section">
      <h3 className="form-preview-title">Session Preview</h3>

      <div className="form-preview-grid">
        <div className="form-preview-item">
          <span className="form-preview-label">Duration</span>
          <div className="form-preview-badge">
            <span>{duration || "—"}</span>
          </div>
        </div>

        <div className="form-preview-item">
          <span className="form-preview-label">Start Price</span>
          <span className="form-preview-value">
            ${(startPrice ?? 0).toFixed(2)}
          </span>
        </div>

        <div className="form-preview-item">
          <span className="form-preview-label">Bid Increment</span>
          <span className="form-preview-value">
            ${(bidIncrement ?? 0).toFixed(2)}
          </span>
        </div>

        <div className="form-preview-item">
          <span className="form-preview-label">Deposit</span>
          <span className="form-preview-value">
            ${(deposit ?? 0).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Info note */}
      <div className="form-preview-note">
        <p>
          📌 <strong>Note:</strong> Once the auction session is created, only
          the end time can be extended. Other details cannot be modified.
        </p>
      </div>
    </div>
  );
}
