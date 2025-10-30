export interface BidRequest {
  userId: number;
  auctionId: number;
  amount: number;
  autoBid?: boolean;
}

export interface BidResponse {
  id: number;
  userId: number;
  auctionId: number;
  amount: number;
  bidTime: string;
}
