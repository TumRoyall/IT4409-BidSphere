// src/api/modules/transactionAfterAuction.api.ts
import axiosClient from "../axiosClient";

// ==================== TYPES ====================
export interface TransactionAfterAuction {
    id: number;  // Backend trả về "id" không phải "txnId"
    txnId?: number;  // Keep for compatibility
    auctionId: number;
    sellerId: number;
    buyerId: number;
    amount: number;
    status: "PENDING" | "SHIPPED" | "PAID" | "DONE" | "CANCELLED";
    updatedAt: string;

    // Product info (flat fields from backend)
    productId?: number;
    productName?: string;
    productImageUrl?: string;

    // Buyer info (flat fields from backend)
    buyerName?: string;
    buyerUsername?: string;

    // Legacy nested objects for compatibility (if needed)
    product?: {
        productId: number;
        name: string;
        imageUrl?: string;
    };
    buyer?: {
        userId: number;
        username: string;
        fullName?: string;
        email?: string;
    };
}

// ==================== API ====================
const transactionAfterAuctionApi = {
    // 📦 Lấy danh sách transactions của user (BE endpoint: GET /user/{userId})
    getTransactionsByUser: (userId: number) =>
        axiosClient.get<TransactionAfterAuction[]>(
            `/transactions/after-auction/user/${userId}`
        ),

    // 📦 Lấy danh sách transactions của seller (BE endpoint: GET /seller/{sellerId})
    getTransactionsBySeller: (sellerId: number) =>
        axiosClient.get<TransactionAfterAuction[]>(
            `/transactions/after-auction/seller/${sellerId}`
        ),

    // 📋 Lấy transaction theo auctionId
    getByAuctionId: (auctionId: number) =>
        axiosClient.get<TransactionAfterAuction>(
            `/transactions/after-auction/auction/${auctionId}`
        ),

    // ✏️ Cập nhật status transaction (BE dùng @RequestParam status)
    updateStatus: (txnId: number, status: string) =>
        axiosClient.put<TransactionAfterAuction>(
            `/transactions/after-auction/${txnId}/status`,
            null,
            { params: { status } }
        ),

    // 🚚 Seller xác nhận giao hàng (PENDING -> SHIPPED)
    confirmShipped: (txnId: number) =>
        axiosClient.put<TransactionAfterAuction>(
            `/transactions/after-auction/${txnId}/status`,
            null,
            { params: { status: "SHIPPED" } }
        ),

    // ❌ Hủy giao dịch (BE dùng @RequestParam reason)
    cancelTransaction: (txnId: number, reason?: string) =>
        axiosClient.put<TransactionAfterAuction>(
            `/transactions/after-auction/${txnId}/cancel`,
            null,
            { params: { reason } }
        ),

    // 💰 Buyer thanh toán (BE dùng @RequestParam buyerId)
    payTransaction: (txnId: number, buyerId: number) =>
        axiosClient.post<TransactionAfterAuction>(
            `/transactions/after-auction/${txnId}/pay`,
            null,
            { params: { buyerId } }
        ),
};

export default transactionAfterAuctionApi;
