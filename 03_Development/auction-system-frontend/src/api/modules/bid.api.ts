import axiosClient from "@/api/axiosClient";
import type { BidRequest, BidResponse } from "@/modules/auction/types/bid";

const bidApi = {
  placeBid: (data: BidRequest) => axiosClient.post<BidResponse>("/bids", data),
  placeAutoBid: (data: BidRequest) => axiosClient.post<BidResponse>("/bids/auto", data),
  getByAuction: (auctionId: number) => axiosClient.get<BidResponse[]>(`/bids/auction/${auctionId}`),
  getHighest: (auctionId: number) => axiosClient.get<BidResponse>(`/bids/auction/${auctionId}/highest`),
  getByUser: (userId: number) => axiosClient.get<BidResponse[]>(`/bids/user/${userId}`),
};

export default bidApi;
