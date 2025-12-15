import axiosClient from "../axiosClient";

export const adminUserApi = {

    // Tạo user mớiiiii
    create: (data: {
        fullName: string;
        username: string;
        email: string;
        phone: string;
        gender?: string;
        status?: string;
    }) => axiosClient.post("/admin/users", data),

    // Lấy toàn bộ user
    getAll: () => axiosClient.get("/admin/users"),

    // Lấy user theo ID
    getById: (id: number) =>
        axiosClient.get(`/admin/users/${id}`),

    // Cập nhật user
    update: (
        id: number,
        data: {
            fullName?: string;
            username?: string;
            email?: string;
            phone?: string;
            gender?: string;
            status?: string;
        }
    ) => axiosClient.put(`/admin/users/${id}`, data),

    // Ban user
    ban: (
        id: number,
        data: {
            userId: number;
            reason: string;
            bannedUntil: string;
        }
    ) => axiosClient.put(`/admin/users/${id}/ban`, data),


    // Unban user
    unban: (id: number) =>
        axiosClient.put(`/admin/users/${id}/unban`, { userId: id }),


    // Xoá user
    deleteUser: (id: number) => axiosClient.delete(`/admin/users/${id}`),
    
    // Xem giao dịch của user
    getAllTransactionsById: (id: number) =>
        axiosClient.get(`/admin/users/${id}/transactions`),
};
