// src/modules/auction/components/index.ts

export { default as AuctionCard } from "./AuctionCard";
export { default as BidForm } from "./BidForm";
export { AuctionSessionForm } from "./AuctionSessionForm";
export { AuctionSessionPreview } from "./AuctionSessionPreview";
export { ProductSelector } from "./ProductSelector";
export { AuctionValidationError } from "./AuctionValidationError";

// Legacy exports for backward compatibility
export { default as SessionScheduleForm } from "./AuctionSessionForm";
export { default as SessionPreview } from "./AuctionSessionPreview";
