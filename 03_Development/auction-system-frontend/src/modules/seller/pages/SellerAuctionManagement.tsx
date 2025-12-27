// src/modules/seller/pages/SellerAuctionManagement.tsx
import React, { useState, useEffect } from "react";
import auctionApi from "@/api/modules/auction.api";
import type { AuctionResponse } from "@/api/modules/auction.api";
import { Clock, Gavel, Calendar, TrendingUp } from "lucide-react";
import "@/styles/modules/seller/index.css";

type TabType = "waiting" | "upcoming" | "running" | "completed";

const SellerAuctionManagement = (): React.ReactElement => {
    const [activeTab, setActiveTab] = useState<TabType>("running");
    const [auctions, setAuctions] = useState<AuctionResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAuctions();
    }, [activeTab]);

    const fetchAuctions = async () => {
        try {
            setLoading(true);
            setError(null);

            // Lấy auctions của seller hiện tại (từ token)
            const response = await auctionApi.getMyAuctions();
            console.log("🔎 My auctions response:", response);

            // Handle response data
            const resData = response.data as any;
            let data: any[] = [];
            if (Array.isArray(resData)) {
                data = resData;
            } else if (resData?.content && Array.isArray(resData.content)) {
                data = resData.content;
            } else {
                console.log("⚠️ Unexpected data format:", typeof resData);
                setAuctions([]);
                return;
            }

            console.log("� Seller auctions:", data);

            // Filter theo tab status
            const filtered = data.filter((a: any) => {
                const status = (a.status || "").toLowerCase();
                switch (activeTab) {
                    case "waiting":
                        // Chờ duyệt: DRAFT
                        return status === "draft";
                    case "upcoming":
                        // Sắp tới: PENDING (đã duyệt, chờ lên sàn)
                        return status === "pending" || status === "created";
                    case "running":
                        // Đang chạy: OPEN
                        return status === "open";
                    case "completed":
                        // Đã kết thúc: CLOSED hoặc CANCELLED
                        return status === "closed" || status === "cancelled";
                    default:
                        return false;
                }
            });

            setAuctions(filtered);
        } catch (err: any) {
            console.error("Error fetching auctions:", err);
            setError(err?.response?.data?.message || "Không thể tải danh sách đấu giá");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value?: number) =>
        new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            maximumFractionDigits: 0,
        }).format(value ?? 0);

    const formatDateTime = (dateStr?: string) => {
        if (!dateStr) return "—";
        return new Date(dateStr).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getStatusBadge = (status: string) => {
        const map: Record<string, { label: string; className: string }> = {
            draft: { label: "Chờ duyệt", className: "badge-pending" },
            pending: { label: "Sắp diễn ra", className: "badge-approved" },
            open: { label: "🔴 Đang diễn ra", className: "badge-running" },
            closed: { label: "Đã kết thúc", className: "badge-sold" },
            cancelled: { label: "Đã hủy", className: "badge-rejected" },
        };
        return map[status?.toLowerCase()] || { label: status, className: "badge-default" };
    };

    const tabs = [
        { key: "running" as TabType, label: "Đang chạy", icon: TrendingUp },
        { key: "upcoming" as TabType, label: "Sắp tới", icon: Calendar },
        { key: "waiting" as TabType, label: "Chờ duyệt", icon: Clock },
        { key: "completed" as TabType, label: "Đã kết thúc", icon: Gavel },
    ];

    return (
        <div className="seller-auction-management">
            {/* Header */}
            <div className="page-header">
                <h1 className="page-title">Quản lý đấu giá</h1>
                <p className="page-subtitle">Theo dõi các phiên đấu giá của bạn</p>
            </div>

            {/* Tabs */}
            <div className="auction-tabs">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.key}
                            className={`auction-tab ${activeTab === tab.key ? "active" : ""}`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            <Icon size={18} />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Content */}
            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Đang tải...</p>
                </div>
            ) : error ? (
                <div className="error-state">
                    <p>{error}</p>
                    <button onClick={fetchAuctions} className="btn-primary">
                        Thử lại
                    </button>
                </div>
            ) : auctions.length === 0 ? (
                <div className="empty-state">
                    <Gavel size={48} strokeWidth={1.5} />
                    <p className="empty-state-text">Không có phiên đấu giá nào</p>
                    <p className="empty-state-subtext">
                        {activeTab === "waiting" && "Không có yêu cầu đấu giá nào đang chờ admin duyệt"}
                        {activeTab === "running" && "Hiện tại không có phiên đấu giá nào đang diễn ra"}
                        {activeTab === "upcoming" && "Chưa có phiên đấu giá nào được lên lịch"}
                        {activeTab === "completed" && "Chưa có phiên đấu giá nào hoàn thành"}
                    </p>
                </div>
            ) : (
                <div className="auctions-list">
                    {auctions.map((auction) => {
                        const statusInfo = getStatusBadge(auction.status);
                        return (
                            <div key={auction.auctionId || auction.id} className="auction-card-horizontal">
                                <div className="auction-image">
                                    <img
                                        src={auction.product?.imageUrl || auction.productImageUrl || "/placeholder-product.png"}
                                        alt={auction.product?.name || auction.productName}
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "/placeholder-product.png";
                                        }}
                                    />
                                </div>

                                <div className="auction-info">
                                    <div className="auction-header">
                                        <h3 className="auction-title">{auction.product?.name || auction.productName}</h3>
                                        <span className={`badge ${statusInfo.className}`}>{statusInfo.label}</span>
                                    </div>

                                    <div className="auction-meta">
                                        <div className="meta-item">
                                            <span className="meta-label">Bắt đầu</span>
                                            <span className="meta-value">{formatDateTime(auction.startTime)}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Kết thúc</span>
                                            <span className="meta-value">{formatDateTime(auction.endTime)}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Giá hiện tại</span>
                                            <span className="meta-value highlight">
                                                {formatCurrency(auction.highestCurrentPrice || auction.highestBid || auction.startPrice)}
                                            </span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Số lượt bid</span>
                                            <span className="meta-value">{auction.totalBids || 0}</span>
                                        </div>
                                        <div className="meta-item">
                                            <span className="meta-label">Số người bid</span>
                                            <span className="meta-value">{auction.totalBidders || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SellerAuctionManagement;
