export interface AuctionRequest {
  productId: number;
  startPrice: number;
  startTime: string;
  endTime: string;
  description?: string;
}

export interface AuctionResponse {
  id: number;
  productName: string;
  startPrice: number;
  currentPrice: number;
  startTime: string;
  endTime: string;
  status: "UPCOMING" | "OPEN" | "CLOSED";
}
