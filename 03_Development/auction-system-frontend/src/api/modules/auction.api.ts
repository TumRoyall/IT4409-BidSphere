import axios from "@/api/axiosClient";

export const auctionApi = {
  getAuctions: (params: {
    status?: string;          // OPEN, PENDING, CLOSED
    category?: string;        // electronics, fashion, ...
    keyword?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;            // 0,1,2...
    size?: number;            // 20,40,60...
    sort?: string;            // startTime,asc
  }) =>
    axios.get("/auctions", { params }),

  getAuctionById: (auctionId: number) =>
    axios.get(`/auctions/${auctionId}`),
};
