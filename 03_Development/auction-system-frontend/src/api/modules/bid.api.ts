import axiosClient from "@/api/axiosClient";

export const bidApi = {
  // Manual bid
  placeBid: (data: {
    auctionId: number;
    bidderId: number;
    bidAmount: number
  }) =>
    axiosClient.post("/bids", data),

  // Auto bid
  placeAutoBid: (data: {
    auctionId: number;
    bidderId: number;
    maxAutoBidAmount: number;
    stepAutoBidAmount: number;
  }) => axiosClient.post("/bids/auto", data),

  getBidsByAuction: (auctionId: number) =>
    axiosClient.get(`/bids/auction/${auctionId}`),

  getHighestBid: (auctionId: number) =>
    axiosClient.get(`/bids/auction/${auctionId}/highest`),

  getBidHistoryByUser: (userId: number) =>
      axiosClient.get(`/bids/user/${userId}`),

};
