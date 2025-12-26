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

const AdminDashboardPage = () => {
    const [searchText, setSearchText] = useState("");
    const [auctions, setAuctions] = useState<AuctionResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [sortBy, setSortBy] = useState<"endTime" | "highestBid">("endTime");

    const itemsPerPage = 5;

    useEffect(() => {
        fetchActiveAuctions();
    }, []);

    // reset page khi filter / search / sort
    useEffect(() => {
        setCurrentPage(1);
    }, [searchText, selectedCategory, sortBy]);

    const fetchActiveAuctions = async () => {
        try {
            const res = await adminAuctionApi.getActive();
            setAuctions(res.data.content || []);
        } catch (error) {
            console.error("Lỗi khi load auctions:", error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        "ALL",
        ...Array.from(
            new Set(
                auctions
                    .map(a => a.categoryName)
                    .filter(Boolean)
            )
        ),
    ];

    const formatDate = (str: string) =>
        new Date(str).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    // FILTER
    const filteredAuctions = auctions.filter(a => {
        const keyword = searchText.toLowerCase();

        const safe = (v: any) =>
            v !== null && v !== undefined ? v.toString().toLowerCase() : "";

        const matchSearch =
            safe(a.auctionId).includes(keyword) ||
            safe(a.productName).includes(keyword) ||
            safe(a.categoryName).includes(keyword) ||
            safe(a.sellerName).includes(keyword) ||
            safe(a.status).includes(keyword) ||
            safe(a.startPrice).includes(keyword) ||
            safe(a.highestBid).includes(keyword) ||
            safe(a.totalBidders).includes(keyword);

        const matchCategory =
            selectedCategory === "ALL" || a.categoryName === selectedCategory;

        return matchSearch && matchCategory;
    });

    // SORT
    const sortedAuctions = [...filteredAuctions].sort((a, b) => {
        if (sortBy === "endTime") {
            return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        }
        return (b.highestBid ?? 0) - (a.highestBid ?? 0);
    });

    // PAGINATION
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
            <h2>Active Auctions</h2>

        {/* FILTER BAR */}
        <div className="filter-bar">
            {/* SEARCH + CATEGORY (group nhỏ cạnh nhau) */}
            <div className="search-filter-group">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <select
                    className="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map(c => (
                        <option key={c} value={c}>
                            {c === "ALL" ? "All Categories" : c}
                        </option>
                    ))}
                </select>
            </div>

            {/* SORT */}
            <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
            >
                <option value="endTime">⏰ End Time</option>
                <option value="highestBid">💰 Highest Bid</option>
            </select>

            {/* CLEAR */}
            <button
                className="clear-btn"
                onClick={() => {
                    setSearchText("");
                    setSelectedCategory("ALL");
                    setSortBy("endTime");
                    setCurrentPage(1);
                }}
            >
                Clear
            </button>
        </div>


            {/* RESULT COUNT */}
            <div className="result-bar">
                <span className="result-badge">
                    {sortedAuctions.length} kết quả
                </span>
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
                                    <td className={`status ${a.status.toLowerCase()}`}>
                                        {a.status}
                                    </td>
                                    <td>{a.sellerName}</td>
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
        </div>
    );
};

export default AdminDashboardPage;
