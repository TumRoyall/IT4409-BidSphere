import { useEffect, useState } from "react";
import { adminAuctionApi } from "@/api/modules/adminAuction.api";
import "@/modules/admin/styles/AdminDashboardPage.css";

interface AuctionResponse {
    auctionId: number;
    startPrice: number;
    highestBid: number;
    startTime: string;
    endTime: string;
    status: string;
    productName: string;
    categoryName: string;
    sellerName: string;
    totalBidders: number;
}

const statusLabel: Record<string, string> = {
    DRAFT: "Draft",
    PENDING: "Pending",
    OPEN: "Open",
    CLOSED: "Closed",
    CANCELLED: "Cancelled"
};

const AdminDashboardPage = () => {
    const [searchText, setSearchText] = useState("");
    const [auctions, setAuctions] = useState<AuctionResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [sortBy, setSortBy] = useState<"endTime" | "highestBid">("endTime");

    const itemsPerPage = 5;

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [modalAuction, setModalAuction] = useState<AuctionResponse | null>(null);
    const [modalAction, setModalAction] = useState<"OPEN" | "CLOSE" | null>(null);

    useEffect(() => {
        fetchAllAuctions();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchText, selectedCategory, selectedStatus, sortBy]);

    const fetchAllAuctions = async () => {
        setLoading(true);
        try {
            const res = await adminAuctionApi.getAll({ page: 0, size: 100 });
            const data = res.data.content || [];
            setAuctions(data.map((a: any) => ({
                ...a,
                status: a.status.toUpperCase()
            })));
        } catch (error) {
            console.error("Lỗi khi load auctions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleActionClick = (auction: AuctionResponse) => {
        const status = auction.status.toUpperCase();
        if (status === "OPEN") {
            setModalAuction(auction);
            setModalAction("CLOSE");
            setShowConfirmModal(true);
        } else if (status === "PENDING") {
            setModalAuction(auction);
            setModalAction("OPEN");
            setShowConfirmModal(true);
        }
    };

    const categories = [
        "ALL",
        ...Array.from(new Set(auctions.map(a => a.categoryName).filter(Boolean))),
    ];

    const statuses = ["ALL", "DRAFT", "PENDING", "OPEN", "CLOSED"];

    const formatDate = (str: string) =>
        new Date(str).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    const filteredAuctions = auctions.filter(a => {
        const keyword = searchText.toLowerCase();
        const safe = (v: any) => (v !== null && v !== undefined ? v.toString().toLowerCase() : "");
        const matchSearch =
            safe(a.auctionId).includes(keyword) ||
            safe(a.productName).includes(keyword) ||
            safe(a.categoryName).includes(keyword) ||
            safe(a.sellerName).includes(keyword) ||
            safe(a.status).includes(keyword) ||
            safe(a.startPrice).includes(keyword) ||
            safe(a.highestBid).includes(keyword) ||
            safe(a.totalBidders).includes(keyword);

        const matchCategory = selectedCategory === "ALL" || a.categoryName === selectedCategory;
        const matchStatus = selectedStatus === "ALL" || a.status === selectedStatus;

        return matchSearch && matchCategory && matchStatus;
    });

    // Sort ưu tiên status: OPEN -> PENDING -> DRAFT -> CLOSED
    const statusPriority: Record<string, number> = {
        "OPEN": 1,
        "PENDING": 2,
        "DRAFT": 3,
        "CLOSED": 4
    };

    const sortedAuctions = [...filteredAuctions].sort((a, b) => {
        const statusDiff = (statusPriority[a.status] ?? 99) - (statusPriority[b.status] ?? 99);
        if (statusDiff !== 0) return statusDiff;

        if (sortBy === "endTime") {
            return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        }
        return (b.highestBid ?? 0) - (a.highestBid ?? 0);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAuctions = sortedAuctions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedAuctions.length / itemsPerPage);

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="dashboard-container">
            <h2>All Auctions (Admin)</h2>

            {/* Filter bar */}
        <div className="filter-bar">
        <div className="search-filter-group">
            {/* Search input */}
            <input
            type="text"
            className="search-input"
            placeholder="🔍 Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            />

            {/* Category select */}
            <select
            className="category-select colorful-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            data-type="category"
            >
            {categories.map(c => (
                <option key={c} value={c}>
                {c === "ALL" ? "📦 All Categories" : ` ${c}`}
                </option>
            ))}
            </select>

            {/* Status select */}
            <select
            className="status-select colorful-select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            data-type="status"
            >
            {statuses.map(s => (
                <option key={s} value={s}>
                {s === "ALL" ? "📝 All Statuses" :
                s === "DRAFT" ? "✏️ Draft" :
                s === "PENDING" ? "⏳ Pending" :
                s === "OPEN" ? "✅ Open" :
                "❌ Closed"}
                </option>
            ))}
            </select>
        </div>

        {/* Sort select */}
        <select
            className="sort-select colorful-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            data-type="sort"
        >
            <option value="endTime">⏰ End Time</option>
            <option value="highestBid">💰 Highest Bid</option>
        </select>

        {/* Clear button */}
        <button
            className="clear-btn"
            onClick={() => {
            setSearchText("");
            setSelectedCategory("ALL");
            setSelectedStatus("ALL");
            setSortBy("endTime");
            setCurrentPage(1);
            }}
        >
            🧹 Clear
        </button>
        </div>


            <div className="result-bar">
                <span className="result-badge">{sortedAuctions.length} kết quả</span>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : sortedAuctions.length === 0 ? (
                <p>Không có phiên đấu giá phù hợp.</p>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Start Price</th>
                                <th>Current Price</th>
                                <th>Bidders</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Status</th>
                                <th>Seller</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAuctions.map(a => (
                                <tr key={a.auctionId}>
                                    <td>{a.auctionId}</td>
                                    <td>{a.productName}</td>
                                    <td>{a.categoryName}</td>
                                    <td>{a.startPrice.toLocaleString("vi-VN")} đ</td>
                                    <td>{a.highestBid.toLocaleString("vi-VN")} đ</td>
                                    <td>{a.totalBidders}</td>
                                    <td>{formatDate(a.startTime)}</td>
                                    <td>{formatDate(a.endTime)}</td>
                                    <td className="status-cell">
                                        <span className={`status ${a.status.toLowerCase()}`}>
                                            {statusLabel[a.status] ?? a.status}
                                        </span>
                                    </td>
                                    <td>{a.sellerName}</td>
                                    <td>
                                        {a.status === "OPEN" && (
                                            <button
                                                onClick={() => handleActionClick(a)}
                                                className="action-btn close"
                                            >
                                                Close
                                            </button>
                                        )}
                                        {a.status === "PENDING" && (
                                            <button
                                                onClick={() => handleActionClick(a)}
                                                className="action-btn open"
                                            >
                                                Open
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination">
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &laquo; Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                className={page === currentPage ? "active" : ""}
                                onClick={() => goToPage(page)}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next &raquo;
                        </button>
                    </div>
                </>
            )}

            {showConfirmModal && modalAuction && modalAction && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Xác nhận</h3>
                        <p>
                            Bạn có chắc muốn {modalAction === "OPEN" ? "mở" : "đóng"} phiên đấu giá #
                            {modalAuction.auctionId}?
                        </p>
                        <div className="modal-buttons">
                            <button
                                className="btn-cancel"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="btn-confirm"
                                onClick={async () => {
                                    try {
                                        if (modalAction === "OPEN") {
                                            await adminAuctionApi.startAuction(modalAuction.auctionId);
                                        } else {
                                            await adminAuctionApi.closeAuction(modalAuction.auctionId);
                                        }
                                        fetchAllAuctions();
                                    } catch (error) {
                                        console.error("Lỗi khi cập nhật trạng thái auction:", error);
                                    } finally {
                                        setShowConfirmModal(false);
                                    }
                                }}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboardPage;
