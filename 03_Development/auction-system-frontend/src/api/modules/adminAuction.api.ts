import axiosClient from "../axiosClient";

export const adminAuctionApi = {
    // Lấy danh sách đấu giá với filter tùy ý (Admin có thể bỏ status để lấy tất cả)
    getAll: (params?: any) =>
        axiosClient.get("/auctions", { params }),

    // Lấy tất cả auctions cho admin (không chỉ status OPEN)
    getAllAdmin: (params?: any) =>
        axiosClient.get("/auctions", {
            params: { ...params, status: null } // hoặc status: 'ALL'
        }),

    // Lấy đấu giá đang hoạt động → dùng query param status=OPEN
    getActive: () =>
        axiosClient.get("/auctions", {
            params: {
                status: "OPEN",
                page: 0,
                size: 100, // tuỳ bạn
                sort: "startTime,asc"
            }
        }),

    // Lấy chi tiết 1 đấu giá
    getById: (id: number) =>
        axiosClient.get(`/auctions/${id}`),

    // Mở một auction (Admin)
    startAuction: (auctionId: number) =>
        axiosClient.post(`/auctions/${auctionId}/start`),

    // Đóng một auction (Admin)
    closeAuction: (auctionId: number) =>
        axiosClient.post(`/auctions/${auctionId}/close`),
};
