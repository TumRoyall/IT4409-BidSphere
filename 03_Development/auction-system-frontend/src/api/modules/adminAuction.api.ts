import axiosClient from "../axiosClient";

export const adminAuctionApi = {
    // Lấy danh sách đấu giá (có filter)
    getAll: (params?: any) =>
        axiosClient.get("/auctions", { params }),

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

};
//