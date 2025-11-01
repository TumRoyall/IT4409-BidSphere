import axiosClient from "@/api/axiosClient";
import type { AuctionRequest, AuctionResponse } from "@/modules/auction/types/auction";

const auctionApi = {
  getAll: () => axiosClient.get<AuctionResponse[]>("/auctions"),
  getById: (id: number) => axiosClient.get<AuctionResponse>(`/auctions/${id}`),
  create: (data: AuctionRequest) => axiosClient.post<AuctionResponse>("/auctions", data),
  update: (id: number, data: AuctionRequest) => axiosClient.put<AuctionResponse>(`/auctions/${id}`, data),
  delete: (id: number) => axiosClient.delete(`/auctions/${id}`),
  start: (id: number) => axiosClient.post(`/auctions/${id}/start`),
  close: (id: number) => axiosClient.post(`/auctions/${id}/close`),
  getActive: () => axiosClient.get<AuctionResponse[]>("/auctions/active"),
};

export default auctionApi;
