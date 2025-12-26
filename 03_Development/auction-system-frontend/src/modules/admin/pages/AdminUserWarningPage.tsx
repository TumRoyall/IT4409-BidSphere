import { useEffect, useState } from "react";
import { getAllWarnings } from "@/api/modules/adminUserWarning.api";
import type { UserWarningLogResponse } from "@/api/modules/adminUserWarning.api";
import "@/modules/admin/styles/adminUserWarningPage.css";

export default function AdminUserWarningPage() {
  const [warnings, setWarnings] = useState<UserWarningLogResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchWarnings();
  }, []);

  const fetchWarnings = async () => {
    try {
      const data = await getAllWarnings();
      setWarnings(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching warnings:", err);
      setError("Không thể tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  // Filter warnings theo searchText
  const filteredWarnings = warnings.filter((w) => {
    const lowerSearch = searchText.toLowerCase();
    return (
      w.logId.toString().includes(lowerSearch) ||
      w.userId.toString().includes(lowerSearch) ||
      w.transactionId.toString().includes(lowerSearch) ||
      w.type.toLowerCase().includes(lowerSearch) ||
      w.status.toLowerCase().includes(lowerSearch) ||
      w.description.toLowerCase().includes(lowerSearch) ||
      w.violationCount.toString().includes(lowerSearch)
    );
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWarnings = filteredWarnings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredWarnings.length / itemsPerPage);

  return (
    <div className="admin-user-warning-page">
      <h2>
        All User Warnings <span className="count-badge">{filteredWarnings.length}</span>
      </h2>

      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1); // reset page khi search
          }}
        />
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="error">{error}</p>}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Log ID</th>
              <th>User ID</th>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Description</th>
              <th>Violation Count</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {currentWarnings.length > 0 ? (
              currentWarnings.map((w) => (
                <tr key={w.logId}>
                  <td data-label="Log ID">{w.logId}</td>
                  <td data-label="User ID">{w.userId}</td>
                  <td data-label="Transaction ID">{w.transactionId}</td>
                  <td data-label="Type">
                    <span className={`type-badge ${w.type.toLowerCase()}`}>{w.type}</span>
                  </td>
                  <td data-label="Status">
                    <span className={`status-badge ${w.status.toLowerCase()}`}>{w.status}</span>
                  </td>
                  <td data-label="Description">{w.description}</td>
                  <td data-label="Violation Count">
                    <span className="violation-count">{w.violationCount}</span>
                  </td>
                  <td data-label="Created At">
                    {new Date(w.createdAt).toLocaleString("vi-VN", {
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
                <td colSpan={8} className="no-data">
                  No warnings found.
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
