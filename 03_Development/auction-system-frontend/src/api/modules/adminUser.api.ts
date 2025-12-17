import axiosClient from "../axiosClient";

export const adminUserApi = {

    // Tạo user mới
    create: (data: {
        fullName: string;
        username: string;
        email: string;
        phone: string;
        gender?: string;
        status?: string;
    }) => axiosClient.post("/superadmin/users", data),

    // Lấy toàn bộ user
    getAll: () => axiosClient.get("/superadmin/users"),

    // Lấy user theo ID
    getById: (id: number) =>
        axiosClient.get(`/superadmin/users/${id}`),

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
    ) => axiosClient.put(`/superadmin/users/${id}`, data),

    // Ban user
    ban: (
        id: number,
        data: {
            userId: number;
            reason: string;
            bannedUntil: string;
        }
    ) => axiosClient.put(`/superadmin/users/${id}/ban`, data),


    // Unban user
    unban: (id: number) =>
        axiosClient.put(`/superadmin/users/${id}/unban`, { userId: id }),


    // Xoá user
    deleteUser: (id: number) => axiosClient.delete(`/superadmin/users/${id}`),
    
    // Xem giao dịch của user
    getAllTransactionsById: (id: number) =>
        axiosClient.get(`/superadmin/users/${id}/transactions`),
};
