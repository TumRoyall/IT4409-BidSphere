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
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [openActionId, setOpenActionId] = useState<number | null>(null);

  // Transaction states
  const [selectedTransactions, setSelectedTransactions] = useState<TransactionResponse[] | null>(null);
  const [showTransactionsId, setShowTransactionsId] = useState<number | null>(null);

  // Modal states
  const [modalType, setModalType] = useState<"edit" | "ban" | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [banReason, setBanReason] = useState("");
  const [banUntil, setBanUntil] = useState(new Date().toISOString().slice(0,10));

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Fetch users
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

  // Delete user
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

  // Unban user
  const handleUnban = async (user: UserResponse) => {
    try {
      await adminUserApi.unban(user.userId);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Unban user thất bại!");
    }
  };

  // View transactions
  const handleViewTransactions = async (user: UserResponse) => {
    if (showTransactionsId === user.userId) {
      setShowTransactionsId(null);
      setSelectedTransactions(null);
      return;
    }
    try {
      const res = await adminUserApi.getAllTransactionsById(user.userId);
      setSelectedTransactions(res.data);
      setShowTransactionsId(user.userId);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tải lịch sử giao dịch!");
    }
  };

  // Toggle status filter
  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  // Filtered users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.userId.toString().includes(searchText) ||
      (u.username?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
      (u.fullName?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
      (u.email?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
      (u.phone?.includes(searchText) ?? false);
    const matchesStatus = selectedStatuses.length === 0 || (u.status && selectedStatuses.includes(u.status.toLowerCase()));
    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Minimum date for ban
  const minBanDate = new Date().toISOString().slice(0,10);

  // Reset page when search text or status changes
  useEffect(() => { setCurrentPage(1); }, [searchText, selectedStatuses]);

  return (
    <div className="admin-users-page">
      <h1>Quản lý Users</h1>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Search by ID, username, email, phone"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="status-filter-inline">
          {["active", "pending", "banned"].map(status => (
            <div
              key={status}
              className={`status-pill ${status} ${selectedStatuses.includes(status) ? "selected" : ""}`}
              onClick={() => toggleStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          ))}
        </div>
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
          {currentUsers.map((user) => {
            const status = user.status?.toLowerCase() ?? "";
            return (
              <React.Fragment key={user.userId}>
                <tr>
                  <td>{user.userId}</td>
                  <td>
                    <button className="username-link" onClick={() => handleViewTransactions(user)}>
                      {user.username}
                    </button>
                  </td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.status}</td>
                  <td>{user.reason}</td>
                  <td>{user.bannedUntil ? new Date(user.bannedUntil).toLocaleDateString('vi-VN') : '—'}</td>
                  <td className="actions">
                    <button onClick={() => setOpenActionId(openActionId === user.userId ? null : user.userId)}>Action</button>
                    {openActionId === user.userId && (
                      <div>
                        <button className="edit" onClick={() => { setSelectedUser(user); setModalType("edit"); setOpenActionId(null); }}>Edit</button>
                        {["active","pending"].includes(status) && (
                          <button className="ban" onClick={() => { setSelectedUser(user); setBanReason(""); setBanUntil(minBanDate); setModalType("ban"); setOpenActionId(null); }}>Ban</button>
                        )}
                        {status === "banned" && <button className="unban" onClick={() => handleUnban(user)}>Unban</button>}
                        <button className="delete" onClick={() => handleDelete(user.userId)}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>

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

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Prev</button>
        {[...Array(totalPages)].map((_, idx) => (
          <button key={idx} className={currentPage === idx + 1 ? "active" : ""} onClick={() => setCurrentPage(idx + 1)}>{idx + 1}</button>
        ))}
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
      </div>

      {/* Modal */}
      {modalType && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            {modalType === "edit" && (
              <>
                <h2>Edit User</h2>
                <input type="text" placeholder="Full Name" value={selectedUser.fullName} onChange={e => setSelectedUser({...selectedUser, fullName: e.target.value})}/>
                <input type="text" placeholder="Username" value={selectedUser.username} onChange={e => setSelectedUser({...selectedUser, username: e.target.value})}/>
                <input type="email" placeholder="Email" value={selectedUser.email} onChange={e => setSelectedUser({...selectedUser, email: e.target.value})}/>
                <input type="text" placeholder="Phone" value={selectedUser.phone} onChange={e => setSelectedUser({...selectedUser, phone: e.target.value})}/>
                <div className="modal-buttons">
                  <button className="save" onClick={async () => {
                    try { await adminUserApi.update(selectedUser.userId, selectedUser); setModalType(null); fetchUsers(); }
                    catch (err) { alert("Cập nhật thất bại!"); }
                  }}>Xác nhận</button>
                  <button className="cancel" onClick={() => setModalType(null)}>Hủy</button>
                </div>
              </>
            )}

            {modalType === "ban" && (
              <>
                <h2>Ban User</h2>
                <input type="text" placeholder="Reason" value={banReason} onChange={e => setBanReason(e.target.value)}/>
                <input type="date" value={banUntil} min={minBanDate} onChange={e => setBanUntil(e.target.value)}/>
                <div className="modal-buttons">
                  <button className="save" onClick={async () => {
                    try { await adminUserApi.ban(selectedUser.userId, { userId: selectedUser.userId, reason: banReason, bannedUntil: new Date(banUntil + "T23:59:59").toISOString() }); setModalType(null); fetchUsers(); }
                    catch (err) { alert("Ban thất bại!"); }
                  }}>Xác nhận</button>
                  <button className="cancel" onClick={() => setModalType(null)}>Hủy</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
