// AdminUserViolationTable.tsx
import { useEffect, useState } from "react";
import { adminUserWarningApi } from "@/api/modules/adminUserWarning.api";
import type { UserWarningLog } from "@/api/modules/adminUserWarning.api";

interface ViolationsTableProps {
  userId: number;
}

export default function ViolationsTable({ userId }: ViolationsTableProps) {
  const [warnings, setWarnings] = useState<UserWarningLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {
    adminUserWarningApi.getByUserId(userId)
      .then(res => {
        setWarnings(res.data.map(w => ({
          logId: w.logId!,
          userId: w.userId!,
          transactionId: w.transactionId ?? 0,
          type: w.type || "",
          status: w.status || "",
          description: w.description || "",
          violationCount: w.violationCount ?? 0,
          createdAt: w.createdAt || new Date().toISOString(),
        })));
      })
      .catch(err => {
        console.error(err);
        setError("Không thể tải dữ liệu.");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="violations-table">
      <h2>User Violations</h2>
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
          {warnings.map(w => (
            <tr key={w.logId}>
              <td>{w.logId}</td>
              <td>{w.userId}</td>
              <td>{w.transactionId}</td>
              <td>{w.type}</td>
              <td>{w.status}</td>
              <td>{w.description}</td>
              <td>{w.violationCount}</td>
              <td>
                {new Date(w.createdAt).toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
