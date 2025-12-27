// src/modules/seller/pages/SellerOrders.tsx
import React, { useState, useEffect } from "react";
import transactionAfterAuctionApi from "@/api/modules/transactionAfterAuction.api";
import type { TransactionAfterAuction } from "@/api/modules/transactionAfterAuction.api";
import auctionApi from "@/api/modules/auction.api";
import { useAuth } from "@/hooks/useAuth";
import { Package, Truck, Check, AlertCircle, Clock, X, AlertTriangle } from "lucide-react";
import "@/styles/modules/seller/index.css";

// Extended type với auction info
interface OrderWithAuction extends TransactionAfterAuction {
    auctionInfo?: {
        productName?: string;
        productImageUrl?: string;
    };
}

const SellerOrders = (): React.ReactElement => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState<OrderWithAuction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedTxn, setSelectedTxn] = useState<OrderWithAuction | null>(null);

    useEffect(() => {
        if (user?.id || (user as any)?.userId) {
            fetchTransactions();
        }
    }, [user]);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            setError(null);
            const sellerId = user?.id || (user as any)?.userId;
            const response = await transactionAfterAuctionApi.getTransactionsBySeller(sellerId);
            const txnList: TransactionAfterAuction[] = Array.isArray(response.data) ? response.data : [];

            // Fetch auction details cho mỗi transaction
            const ordersWithAuction: OrderWithAuction[] = await Promise.all(
                txnList.map(async (txn) => {
                    try {
                        if (txn.auctionId) {
                            const auctionRes = await auctionApi.getAuctionById(txn.auctionId);
                            const auctionData = auctionRes.data;
                            return {
                                ...txn,
                                auctionInfo: {
                                    productName: auctionData?.productName,
                                    productImageUrl: auctionData?.productImageUrl,
                                },
                            };
                        }
                        return { ...txn };
                    } catch {
                        return { ...txn };
                    }
                })
            );

            setTransactions(ordersWithAuction);
        } catch (err: any) {
            console.error("Error fetching transactions:", err);
            setError(err?.response?.data?.message || "Không thể tải danh sách đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    // Mở modal xác nhận
    const openConfirmModal = (txn: TransactionAfterAuction) => {
        setSelectedTxn(txn);
        setShowModal(true);
    };

    // Đóng modal
    const closeModal = () => {
        setShowModal(false);
        setSelectedTxn(null);
    };

    // Xác nhận giao hàng
    const handleConfirmShipped = async () => {
        if (!selectedTxn) {
            console.log("No selectedTxn");
            return;
        }
        const txnId = selectedTxn.id || selectedTxn.txnId;
        console.log("handleConfirmShipped - selectedTxn:", selectedTxn);
        console.log("handleConfirmShipped - txnId:", txnId);

        if (!txnId) {
            alert("Không tìm thấy ID giao dịch");
            return;
        }

        try {
            setUpdatingId(txnId);
            console.log("Calling confirmShipped API with txnId:", txnId);
            const response = await transactionAfterAuctionApi.confirmShipped(txnId);
            console.log("confirmShipped response:", response);

            setTransactions((prev) =>
                prev.map((t) => ((t.id || t.txnId) === txnId ? { ...t, status: "SHIPPED" } : t))
            );
            closeModal();
            alert("✅ Đã xác nhận giao hàng thành công!");
        } catch (err: any) {
            console.error("Error updating status:", err);
            console.error("Error response:", err?.response);
            const errorMsg = err?.response?.data?.message || err?.message || "Không thể cập nhật trạng thái";
            alert("❌ Lỗi: " + errorMsg);
        } finally {
            setUpdatingId(null);
        }
    };

    const formatCurrency = (value?: number) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 0,
        }).format(value ?? 0);

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusInfo = (status: string) => {
        const map: Record<string, { label: string; className: string; icon: React.ElementType }> = {
            PENDING: { label: "Chờ xử lý", className: "status-pending", icon: Clock },
            SHIPPED: { label: "Đang giao", className: "status-shipped", icon: Truck },
            PAID: { label: "Đã thanh toán", className: "status-paid", icon: Check },
            DONE: { label: "Hoàn tất", className: "status-done", icon: Check },
            CANCELLED: { label: "Đã hủy", className: "status-cancelled", icon: AlertCircle },
        };
        return map[status?.toUpperCase()] || { label: status, className: "status-default", icon: Package };
    };

    return (
        <div className="so-page">
            {/* Header */}
            <div className="so-page-header">
                <h1 className="so-page-title">Đơn hàng cần xử lý</h1>
                <p className="so-page-subtitle">Quản lý các đơn hàng từ phiên đấu giá đã kết thúc</p>
            </div>

            {/* Content */}
            {loading ? (
                <div className="so-loading-state">
                    <div className="so-spinner"></div>
                    <p>Đang tải...</p>
                </div>
            ) : error ? (
                <div className="so-error-state">
                    <AlertCircle size={48} strokeWidth={1.5} />
                    <p>{error}</p>
                    <button onClick={fetchTransactions} className="so-btn-primary">
                        Thử lại
                    </button>
                </div>
            ) : transactions.length === 0 ? (
                <div className="so-empty-state">
                    <Package size={48} strokeWidth={1.5} />
                    <p className="so-empty-state-text">Không có đơn hàng nào</p>
                    <p className="so-empty-state-subtext">
                        Các đơn hàng sẽ xuất hiện ở đây sau khi phiên đấu giá kết thúc
                    </p>
                </div>
            ) : (
                <div className="so-orders-list">
                    {transactions.map((txn) => {
                        const statusInfo = getStatusInfo(txn.status);
                        const StatusIcon = statusInfo.icon;
                        const canShip = txn.status === "PENDING";

                        return (
                            <div key={txn.id || txn.txnId} className="so-order-card">
                                <div className="so-order-header">
                                    <div className="so-order-id">
                                        <span className="so-order-label">Mã đơn:</span>
                                        <span className="so-order-value">#{txn.id || txn.txnId}</span>
                                    </div>
                                    <div className={`so-order-status so-${statusInfo.className}`}>
                                        <StatusIcon size={16} />
                                        <span>{statusInfo.label}</span>
                                    </div>
                                </div>

                                <div className="so-order-body">
                                    <div className="so-order-product">
                                        <img
                                            src={txn.auctionInfo?.productImageUrl || "/placeholder-product.png"}
                                            alt={txn.auctionInfo?.productName || "Sản phẩm"}
                                            className="so-order-product-image"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "/placeholder-product.png";
                                            }}
                                        />
                                        <div className="so-order-product-info">
                                            <h3 className="so-product-name">{txn.auctionInfo?.productName || `Phiên đấu giá #${txn.auctionId}`}</h3>
                                            <p className="so-product-auction">Auction ID: {txn.auctionId}</p>
                                        </div>
                                    </div>

                                    <div className="so-order-details">
                                        <div className="so-detail-item">
                                            <span className="so-detail-label">Người mua</span>
                                            <span className="so-detail-value">
                                                {txn.buyerName || txn.buyerUsername || txn.buyer?.fullName || `User #${txn.buyerId}`}
                                            </span>
                                        </div>
                                        <div className="so-detail-item">
                                            <span className="so-detail-label">Số tiền</span>
                                            <span className="so-detail-value so-highlight">{formatCurrency(txn.amount)}</span>
                                        </div>
                                        <div className="so-detail-item">
                                            <span className="so-detail-label">Cập nhật</span>
                                            <span className="so-detail-value">{formatDate(txn.updatedAt)}</span>
                                        </div>
                                    </div>
                                </div>

                                {canShip && (
                                    <div className="so-order-actions">
                                        <button
                                            className="so-btn-ship"
                                            onClick={() => openConfirmModal(txn)}
                                            disabled={updatingId === txn.txnId}
                                        >
                                            {updatingId === txn.txnId ? (
                                                <>
                                                    <span className="so-spinner-small"></span>
                                                    Đang cập nhật...
                                                </>
                                            ) : (
                                                <>
                                                    <Truck size={18} />
                                                    Xác nhận giao hàng
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Confirmation Modal */}
            {showModal && selectedTxn && (
                <div className="so-modal-overlay" onClick={closeModal}>
                    <div className="so-modal-container" onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="so-modal-header">
                            <div className="so-modal-icon-wrapper so-warning">
                                <AlertTriangle size={28} />
                            </div>
                            <button className="so-modal-close-btn" onClick={closeModal}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="so-modal-body">
                            <h2 className="so-modal-title">Xác nhận giao hàng</h2>
                            <p className="so-modal-description">
                                Bạn đang xác nhận <strong>đã gửi hàng</strong> cho đơn hàng <strong>#{selectedTxn.id || selectedTxn.txnId}</strong>
                            </p>

                            <div className="so-modal-info-box">
                                <div className="so-info-row">
                                    <span className="so-info-label">📦 Sản phẩm:</span>
                                    <span className="so-info-value">{selectedTxn.auctionInfo?.productName || `Auction #${selectedTxn.auctionId}`}</span>
                                </div>
                                <div className="so-info-row">
                                    <span className="so-info-label">👤 Người mua:</span>
                                    <span className="so-info-value">{selectedTxn.buyerName || selectedTxn.buyer?.fullName || `User #${selectedTxn.buyerId}`}</span>
                                </div>
                                <div className="so-info-row">
                                    <span className="so-info-label">💰 Giá trị:</span>
                                    <span className="so-info-value so-highlight">{formatCurrency(selectedTxn.amount)}</span>
                                </div>
                            </div>

                            <div className="so-modal-warning">
                                <AlertCircle size={16} />
                                <span>
                                    Khi xác nhận, bạn cam kết sẽ <strong>giao hàng đúng như mô tả</strong> cho người mua.
                                    Nếu không giao hàng, tài khoản của bạn có thể bị xử lý vi phạm.
                                </span>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="so-modal-footer">
                            <button className="so-btn-cancel" onClick={closeModal}>
                                Hủy bỏ
                            </button>
                            <button
                                className="so-btn-confirm"
                                onClick={handleConfirmShipped}
                                disabled={updatingId === selectedTxn.txnId}
                            >
                                {updatingId === selectedTxn.txnId ? (
                                    <>
                                        <span className="so-spinner-small"></span>
                                        Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        <Check size={18} />
                                        Tôi đồng ý, xác nhận giao hàng
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerOrders;

