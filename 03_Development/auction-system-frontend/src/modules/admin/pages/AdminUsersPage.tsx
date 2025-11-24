import React, { useEffect, useState } from "react";
import { adminUserApi } from "@/api/modules/adminUser.api";
import '@/modules/admin/styles/AdminUsersPage.css';

interface UserResponse {
  userId: number;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  gender?: string;
  status?: string;
  reason?: string;
  bannedUntil?: string;
}

interface TransactionResponse {
  transactionID: number;
  type: string;
  status: string;
  createdAt: string;
  amount: number;
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [openActionId, setOpenActionId] = useState<number | null>(null);

  // Transaction states
  const [selectedTransactions, setSelectedTransactions] = useState<TransactionResponse[] | null>(null);
  const [showTransactionsId, setShowTransactionsId] = useState<number | null>(null);

  // Modal states
  const [modalType, setModalType] = useState<"edit" | "ban" | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [banReason, setBanReason] = useState("");
  const [banUntil, setBanUntil] = useState(new Date().toISOString().slice(0,10));

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminUserApi.getAll();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Lỗi khi tải dữ liệu users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    try {
      await adminUserApi.deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Xóa user thất bại!");
    }
  };

  const handleUnban = async (user: UserResponse) => {
    try {
      await adminUserApi.unban(user.userId);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Unban user thất bại!");
    }
  };

  const handleViewTransactions = async (userId: number) => {
    if (showTransactionsId === userId) {
      // Nếu click lại user đang mở -> ẩn bảng transaction
      setShowTransactionsId(null);
      setSelectedTransactions(null);
      return;
    }
    try {
      const res = await adminUserApi.getAllTransactionsById(userId);
      setSelectedTransactions(res.data);
      setShowTransactionsId(userId);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tải lịch sử giao dịch!");
    }
  };

  const filteredUsers = users.filter((u) =>
    u.userId.toString().includes(searchText) ||
    (u.username?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
    (u.fullName?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
    (u.email?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
    (u.phone?.includes(searchText) ?? false) ||
    (u.status?.toLowerCase().includes(searchText.toLowerCase()) ?? false)
  );

  const minBanDate = new Date().toISOString().slice(0,10);

  return (
    <div className="admin-users-page">
      <h1>Quản lý Users</h1>

      <div style={{ marginBottom: "10px", textAlign: "right" }}>
        <input
          type="text"
          placeholder="Search by ID, username, email, phone, status"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {loading && <div>Đang tải dữ liệu...</div>}
      {error && <div className="error">{error}</div>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Ban Reason</th>
            <th>Ban Until</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => {
            const status = user.status?.toLowerCase() ?? "";
            return (
              <React.Fragment key={user.userId}>
                <tr>
                  <td>{user.userId}</td>
                  <td>
                    <button
                      className="username-link"
                      onClick={() => handleViewTransactions(user.userId)}
                    >
                      {user.username}
                    </button>
                  </td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.status}</td>
                  <td>{user.reason}</td>
                  <td>
                    {user.bannedUntil 
                      ? new Date(user.bannedUntil).toLocaleString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '—'}
                  </td>
                  <td className="actions">
                    <button onClick={() => setOpenActionId(openActionId === user.userId ? null : user.userId)}>
                      Action
                    </button>
                    {openActionId === user.userId && (
                      <div>
                        <button className="edit" onClick={() => {setSelectedUser(user); setModalType("edit"); setOpenActionId(null);}}>Edit</button>
                        {["active", "pending"].includes(status) && (
                          <button className="ban" onClick={() => {setSelectedUser(user); setBanReason(""); setBanUntil(minBanDate); setModalType("ban"); setOpenActionId(null);}}>Ban</button>
                        )}
                        {status === "banned" && <button className="unban" onClick={() => handleUnban(user)}>Unban</button>}
                        <button className="delete" onClick={() => handleDelete(user.userId)}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>

                {/* Transaction table for this user */}
                {showTransactionsId === user.userId && selectedTransactions && (
                  <tr className="transaction-row">
                    <td colSpan={9}>
                      <table className="transaction-table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedTransactions.map(t => (
                            <tr key={t.transactionID}>
                              <td>{t.transactionID}</td>
                              <td>{t.type}</td>
                              <td>{t.status}</td>
                              <td>{new Date(t.createdAt).toLocaleString('vi-VN')}</td>
                              <td>{t.amount.toLocaleString('vi-VN')} đ</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      {/* Modal code vẫn giữ nguyên */}
    </div>
  );
};

export default AdminUsersPage;
