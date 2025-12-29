import { useEffect, useState } from "react";
import { adminUserReportApi } from "@/api/modules/adminUserReport.api";
import "@/modules/admin/styles/AdminReportsPage.css";

// Interface khớp với backend UserReportResponse
interface UserReport {
  id: number;
  userId: number;
  content: string;
  auctionId?: number;
  sellerId?: number;
  createdAt: string;
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<UserReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await adminUserReportApi.getAll();
      setReports(
        res.data.map((r) => ({
          id: r.id!,
          userId: r.userId!,
          content: r.content || "",
          auctionId: r.auctionId,
          sellerId: r.sellerId,
          createdAt: r.createdAt || new Date().toISOString(),
        }))
      );
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Không thể tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  // Filter reports theo searchText
  const filteredReports = reports.filter((r) => {
    const lowerSearch = searchText.toLowerCase();
    return (
      r.id.toString().includes(lowerSearch) ||
      r.userId.toString().includes(lowerSearch) ||
      r.content.toLowerCase().includes(lowerSearch) ||
      r.auctionId?.toString().includes(lowerSearch) ||
      r.sellerId?.toString().includes(lowerSearch)
    );
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  return (
    <div className="admin-reports-page">
      <h2>
        User Reports <span className="ar-count-badge">{filteredReports.length}</span>
      </h2>

      <div className="ar-filter-bar">
        <input
          type="text"
          className="ar-search-input"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="ar-error">{error}</p>}

      <div className="ar-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Auction ID</th>
              <th>Seller ID</th>
              <th>Content</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.length > 0 ? (
              currentReports.map((report) => {
                const formattedDate = new Date(report.createdAt).toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <tr key={report.id}>
                    <td data-label="ID">
                      <span className="ar-cell" data-full={`${report.id}`}>{report.id}</span>
                    </td>
                    <td data-label="User ID">
                      <span className="ar-cell" data-full={`${report.userId}`}>{report.userId}</span>
                    </td>
                    <td data-label="Auction ID">
                      <span className="ar-cell" data-full={report.auctionId ? `${report.auctionId}` : "-"}>{report.auctionId || "-"}</span>
                    </td>
                    <td data-label="Seller ID">
                      <span className="ar-cell" data-full={report.sellerId ? `${report.sellerId}` : "-"}>{report.sellerId || "-"}</span>
                    </td>
                    <td data-label="Content">
                      <span className="ar-cell" data-full={report.content}>{report.content}</span>
                    </td>
                    <td data-label="Created At">
                      <span className="ar-cell" data-full={formattedDate}>{formattedDate}</span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="ar-no-data">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="ar-pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
