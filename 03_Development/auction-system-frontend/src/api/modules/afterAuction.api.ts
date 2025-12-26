import axiosClient from "../axiosClient";

export const afterAuctionApi = {
  // =========================
  // Lấy các sản phẩm thắng đấu giá
  // =========================
  getWonProducts(
    userId: number,
    status?: string,
    txnId?: number
  ) {
    return axiosClient.get(
      `/transactions/after-auction/${userId}/won-products`,
      {
        params: {
          ...(status ? { status } : {}),
          ...(txnId ? { txnId } : {}),
        },
      }
    );
  },

  // =========================
  // Buyer thanh toán (sau khi nhận hàng)
  // =========================
  payTransaction(txnId: number, buyerId: number) {
    return axiosClient.post(
      `/transactions/after-auction/${txnId}/pay`,
      null,
      { params: { buyerId } }
    );
  },

  // =========================
  // Update status (SHIPPED / DONE)
  // =========================
  updateStatus(txnId: number, status: string) {
    return axiosClient.put(
      `/transactions/after-auction/${txnId}/status`,
      null,
      { params: { status } }
    );
  },

  // =========================
  // Hủy giao dịch
  // =========================
  cancelTransaction(txnId: number, reason?: string) {
    return axiosClient.put(
      `/transactions/after-auction/${txnId}/cancel`,
      null,
      { params: reason ? { reason } : {} }
    );
  },
};
