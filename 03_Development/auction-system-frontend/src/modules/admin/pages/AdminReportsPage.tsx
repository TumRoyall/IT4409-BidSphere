import { useEffect, useState } from "react";
import { adminUserReportApi } from "@/api/modules/adminUserReport.api";
import "@/modules/admin/styles/AdminReportsPage.css";

// Interface khớp với backend UserReportResponse
interface UserReport {
  id: number;
  userId: number;
  content: string;
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
      r.content.toLowerCase().includes(lowerSearch)
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
        User Reports <span className="count-badge">{filteredReports.length}</span>
      </h2>

      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="error">{error}</p>}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Content</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.length > 0 ? (
              currentReports.map((report) => (
                <tr key={report.id}>
                  <td data-label="ID">{report.id}</td>
                  <td data-label="User ID">{report.userId}</td>
                  <td data-label="Content">{report.content}</td>
                  <td data-label="Created At">
                    {new Date(report.createdAt).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="no-data">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
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
