import { useEffect, useState } from "react";
import { getAllWarnings } from "@/api/modules/adminUserWarning.api";
import type { UserWarningLogResponse } from "@/api/modules/adminUserWarning.api";
import "@/modules/admin/styles/adminUserWarningPage.css";

export default function AdminUserWarningPage() {
  const [warnings, setWarnings] = useState<UserWarningLogResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="admin-user-warning-page">
      <h2>All User Warnings</h2>
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
            {warnings.length > 0 ? (
              warnings.map((w) => (
                <tr key={w.logId}>
                  <td data-label="Log ID">{w.logId}</td>
                  <td data-label="User ID">{w.userId}</td>
                  <td data-label="Transaction ID">{w.transactionId}</td>
                  <td data-label="Type">{w.type}</td>
                  <td data-label="Status">{w.status}</td>
                  <td data-label="Description">{w.description}</td>
                  <td data-label="Violation Count">{w.violationCount}</td>
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
    </div>
  );
}