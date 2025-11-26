import { useEffect, useState } from "react";
import { adminAuctionApi } from "@/api/modules/adminAuction.api";
import '@/modules/admin/styles/AdminDashboardPage.css';

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
    const [auctions, setAuctions] = useState<AuctionResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchActiveAuctions();
    }, []);

    const formatDate = (str: string) => {
        return new Date(str).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

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

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAuctions = auctions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(auctions.length / itemsPerPage);

    const goToPage = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="dashboard-container">
            <h2>Active Auctions</h2>

            {loading ? (
                <p>Loading...</p>
            ) : auctions.length === 0 ? (
                <p>Không có phiên đấu giá nào đang hoạt động.</p>
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

                    {/* Pagination controls */}
                    <div className="pagination">
                        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
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

                        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next &raquo;
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboardPage;
