import axiosClient from "@/api/axiosClient";

export const bidApi = {
  // Đặt giá thầu thủ công
  placeBid: (data: { auctionId: number; bidAmount: number }) =>
    axiosClient.post("/bids", data),

  // Đặt giá thầu tự động (nếu dùng)
  placeAutoBid: (data: {
    auctionId: number;
    maxAutoBidAmount: number;
    stepAutoBidAmount: number;
  }) => axiosClient.post("/bids/auto", data),

  // Lấy tất cả bid trong 1 phiên
  getBidsByAuction: (auctionId: number) =>
    axiosClient.get(`/bids/auction/${auctionId}`),

  // Lấy bid cao nhất trong 1 phiên
  getHighestBid: (auctionId: number) =>
    axiosClient.get(`/bids/auction/${auctionId}/highest`),
};
