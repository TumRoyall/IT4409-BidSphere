import { useEffect, useState } from "react";
import { adminUserReportApi } from "@/api/modules/adminUserReport.api";
import "@/modules/admin/styles/AdminReportsPage.css";

// Interface khớp với backend UserReportResponse
interface UserReport {
  id: number;       // Long -> number
  userId: number;   // Long -> number
  content: string;
  createdAt: string; // LocalDateTime -> ISO string
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<UserReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminUserReportApi.getAll()
      .then(res => {
        setReports(res.data.map(r => ({
          id: r.id!,
          userId: r.userId!,
          content: r.content || "",
          createdAt: r.createdAt || new Date().toISOString(),
        })));
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError("Không thể tải dữ liệu.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-reports-page">
      <h2>User Reports</h2>
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
            {reports.length > 0 ? (
              reports.map(report => (
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
                      minute: "2-digit"
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
    </div>
  );
}