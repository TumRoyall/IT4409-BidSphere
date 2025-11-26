import React, { useEffect, useState, useRef } from "react";
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

const STATUSES = ["active", "pending", "banned"];

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [openActionId, setOpenActionId] = useState<number | null>(null);

  const [selectedTransactions, setSelectedTransactions] = useState<TransactionResponse[] | null>(null);
  const [showTransactionsId, setShowTransactionsId] = useState<number | null>(null);

  const [modalType, setModalType] = useState<"edit" | "ban" | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [banReason, setBanReason] = useState("");
  const [banDate, setBanDate] = useState(""); // yyyy-MM-dd
  const [banTime, setBanTime] = useState(""); // HH:mm

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside dropdown to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    try { await adminUserApi.deleteUser(id); fetchUsers(); } 
    catch { alert("Xóa user thất bại!"); }
  };

  const handleUnban = async (user: UserResponse) => {
    try { await adminUserApi.unban(user.userId); fetchUsers(); } 
    catch { alert("Unban user thất bại!"); }
  };

  const handleViewTransactions = async (user: UserResponse) => {
    if (showTransactionsId === user.userId) { setShowTransactionsId(null); setSelectedTransactions(null); return; }
    try {
      const res = await adminUserApi.getAllTransactionsById(user.userId);
      setSelectedTransactions(res.data);
      setShowTransactionsId(user.userId);
    } catch { alert("Lỗi khi tải lịch sử giao dịch!"); }
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.userId.toString().includes(searchText) ||
      (u.username?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
      (u.fullName?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
      (u.email?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
      (u.phone?.includes(searchText) ?? false);
    const matchesStatus = selectedStatuses.length === 0 || (u.status && selectedStatuses.includes(u.status.toLowerCase()));
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const now = new Date();
  const minBanDate = now.toISOString().split("T")[0]; // yyyy-MM-dd
  const currentTimeStr = now.toTimeString().slice(0,5); // HH:mm

  useEffect(() => { setCurrentPage(1); }, [searchText, selectedStatuses]);

  // --- Hàm confirm ban với check quá khứ + fix múi giờ ---
  const handleBanConfirm = async () => {
    if (!banDate || !banTime) { alert("Vui lòng chọn ngày và giờ!"); return; }

    const [year, month, day] = banDate.split("-").map(Number);
    const [hours, minutes] = banTime.split(":").map(Number);

    const selectedLocal = new Date(year, month-1, day, hours, minutes, 0);
    if (selectedLocal <= new Date()) { alert("Không thể chọn thời gian trong quá khứ!"); return; }

    const offset = selectedLocal.getTimezoneOffset();
    const selectedUTC = new Date(selectedLocal.getTime() - offset*60*1000);

    try {
      await adminUserApi.ban(selectedUser!.userId, {
        userId: selectedUser!.userId,
        reason: banReason,
        bannedUntil: selectedUTC.toISOString(),
      });
      setModalType(null);
      fetchUsers();
    } catch {
      alert("Ban thất bại!");
    }
  };

  return (
    <div className="admin-users-page">
      <h1>Quản lý Users</h1>

      <div className="top-bar">
        <input type="text" placeholder="Search by ID, username, email, phone" value={searchText} onChange={e => setSearchText(e.target.value)} />

        <div className="status-dropdown" ref={dropdownRef}>
          <div className="dropdown-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
            Filter Status {selectedStatuses.length > 0 ? `(${selectedStatuses.length})` : ""}
          </div>
          {dropdownOpen && (
            <div className="dropdown-content">
              {STATUSES.map(status => (
                <div key={status} className="dropdown-item">
                  <input type="checkbox" checked={selectedStatuses.includes(status)} onChange={() => toggleStatus(status)} />
                  <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                </div>
              ))}
            </div>
          )}
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
          {currentUsers.map(user => {
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
                  <td>
                    <span className={`status ${status}`}>{user.status}</span>
                  </td>
                  <td>{user.reason}</td>
                  <td>{user.bannedUntil ? new Date(user.bannedUntil).toLocaleString('vi-VN') : '—'}</td>
                  <td className="actions">
                    <button onClick={() => setOpenActionId(openActionId === user.userId ? null : user.userId)}>Action</button>
                    {openActionId === user.userId && (
                      <div>
                        <button className="edit" onClick={() => { setSelectedUser(user); setModalType("edit"); setOpenActionId(null); }}>Edit</button>
                        {["active","pending"].includes(status) && (
                          <button className="ban" onClick={() => { 
                            setSelectedUser(user); 
                            setBanReason(""); 
                            setBanDate(""); 
                            setBanTime(""); 
                            setModalType("ban"); 
                            setOpenActionId(null); 
                          }}>Ban</button>
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

      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage===1}>Prev</button>
        {[...Array(totalPages)].map((_, idx) => (
          <button key={idx} className={currentPage===idx+1?"active":""} onClick={() => setCurrentPage(idx+1)}>{idx+1}</button>
        ))}
        <button onClick={() => setCurrentPage(prev => Math.min(prev+1, totalPages))} disabled={currentPage===totalPages}>Next</button>
      </div>

      {modalType && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            {modalType === "edit" && (
              <>
                <h2>Edit User</h2>
                <div className="input-group"><label>Full Name</label><input type="text" value={selectedUser.fullName} onChange={e => setSelectedUser({...selectedUser, fullName:e.target.value})}/></div>
                <div className="input-group"><label>Username</label><input type="text" value={selectedUser.username} onChange={e => setSelectedUser({...selectedUser, username:e.target.value})}/></div>
                <div className="input-group"><label>Email</label><input type="email" value={selectedUser.email} onChange={e => setSelectedUser({...selectedUser, email:e.target.value})}/></div>
                <div className="input-group"><label>Phone</label><input type="text" value={selectedUser.phone} onChange={e => setSelectedUser({...selectedUser, phone:e.target.value})}/></div>
                <div className="modal-buttons">
                  <button className="save" onClick={async () => { try { await adminUserApi.update(selectedUser.userId, selectedUser); setModalType(null); fetchUsers(); } catch { alert("Cập nhật thất bại!"); } }}>Xác nhận</button>
                  <button className="cancel" onClick={() => setModalType(null)}>Hủy</button>
                </div>
              </>
            )}

            {modalType === "ban" && (
              <>
                <h2>Ban User</h2>
                <div className="input-group">
                  <label>Reason</label>
                  <input type="text" value={banReason} onChange={e => setBanReason(e.target.value)} />
                </div>

                <div className="input-group">
                  <label>Chọn ngày</label>
                  <input 
                    type="date" 
                    value={banDate} 
                    onChange={e => setBanDate(e.target.value)} 
                    min={minBanDate} 
                  />
                </div>
                <div className="input-group">
                  <label>Chọn giờ</label>
                  <input 
                    type="time" 
                    value={banTime} 
                    onChange={e => setBanTime(e.target.value)} 
                    disabled={!banDate} 
                    min={banDate === minBanDate ? currentTimeStr : "00:00"} 
                  />
                </div>

                <div className="modal-buttons">
                  <button className="save" onClick={handleBanConfirm}>Xác nhận</button>
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
