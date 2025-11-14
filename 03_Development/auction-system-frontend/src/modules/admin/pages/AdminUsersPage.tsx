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
}

const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [openActionId, setOpenActionId] = useState<number | null>(null);

  // Modal states
  const [modalType, setModalType] = useState<"edit" | "ban" | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);
  const [banReason, setBanReason] = useState("");
  const [banUntil, setBanUntil] = useState(new Date().toISOString().slice(0,10));

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

  // Filtered users
  const filteredUsers = users.filter((u) =>
    u.userId.toString().includes(searchText) ||
    (u.username?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
    (u.fullName?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
    (u.email?.toLowerCase().includes(searchText.toLowerCase()) ?? false) ||
    (u.phone?.includes(searchText) ?? false) ||
    (u.status?.toLowerCase().includes(searchText.toLowerCase()) ?? false)
  );

  // Minimum date for ban (today)
  const minBanDate = new Date().toISOString().slice(0,10);

  return (
    <div className="admin-users-page">
      <h1>Quản lý Users</h1>

      {/* Search box */}
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

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.username}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.status}</td>
              <td className="actions">
  <button onClick={() => setOpenActionId(openActionId === user.userId ? null : user.userId)}>
    Action
  </button>
  {/* Dropdown */}
  {openActionId === user.userId && (
    <div>
      <button
        className="edit"
        onClick={() => {
          setSelectedUser(user);
          setModalType("edit");
          setOpenActionId(null);
        }}
      >
        Edit
      </button>

      {/* Hiện Ban chỉ khi user không bị banned */}
      {user.status !== "banned" && (
        <button
          className="ban"
          onClick={() => {
            setSelectedUser(user);
            setBanReason("");
            setBanUntil(minBanDate);
            setModalType("ban");
            setOpenActionId(null);
          }}
        >
          Ban
        </button>
      )}

      {/* Hiện Unban chỉ khi user đang bị banned */}
      {user.status === "banned" && (
        <button className="unban" onClick={() => handleUnban(user)}>Unban</button>
      )}

      <button className="delete" onClick={() => handleDelete(user.userId)}>Delete</button>
    </div>
  )}
</td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalType && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            {modalType === "edit" && (
              <>
                <h2>Edit User</h2>
                <input
                  type="text"
                  value={selectedUser.fullName}
                  onChange={(e) => setSelectedUser({...selectedUser, fullName: e.target.value})}
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  value={selectedUser.username}
                  onChange={(e) => setSelectedUser({...selectedUser, username: e.target.value})}
                  placeholder="Username"
                />
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={selectedUser.phone}
                  onChange={(e) => setSelectedUser({...selectedUser, phone: e.target.value})}
                  placeholder="Phone"
                />
                <div className="modal-buttons">
                  <button className="save" onClick={async () => {
                    try {
                      await adminUserApi.update(selectedUser.userId, selectedUser);
                      setModalType(null);
                      fetchUsers();
                    } catch (err) { alert("Cập nhật thất bại!"); }
                  }}>Xác nhận</button>
                  <button className="cancel" onClick={() => setModalType(null)}>Hủy</button>
                </div>
              </>
            )}

            {modalType === "ban" && (
              <>
                <h2>Ban User</h2>
                <input
                  type="text"
                  placeholder="Reason"
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                />
                <input
                  type="date"
                  value={banUntil}
                  min={minBanDate}  // Không cho chọn quá khứ
                  onChange={(e) => setBanUntil(e.target.value)}
                />
                <div className="modal-buttons">
                  <button className="save" onClick={async () => {
                    try {
                      await adminUserApi.ban(selectedUser.userId, {
                        userId: selectedUser.userId,
                        reason: banReason,
                        bannedUntil: new Date(banUntil + "T23:59:59").toISOString()
                      });
                      setModalType(null);
                      fetchUsers();
                    } catch (err) { alert("Ban thất bại!"); }
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
