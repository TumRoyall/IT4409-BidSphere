import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';
import StatsCard from '@/components/common/StatsCard';
import adminApi from '@/api/modules/admin.api';
import type { User } from '@/types/admin.types';
import './UserManagement.css';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch users từ API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleBanToggle = async (id: number, currentStatus: string) => {
    try {
      if (currentStatus === 'ACTIVE') {
        await adminApi.banUser(id);
        alert('Đã cấm người dùng!');
      } else {
        await adminApi.unbanUser(id);
        alert('Đã mở khóa người dùng!');
      }
      // Cập nhật lại danh sách
      await fetchUsers();
    } catch (error) {
      console.error('Error toggling ban status:', error);
      alert('Không thể thay đổi trạng thái người dùng');
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'ACTIVE').length;
  const bannedUsers = users.filter(u => u.status === 'BANNED').length;

  if (loading) {
    return (
      <AdminLayout>
        <div className="user-management">
          <p>Đang tải...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="user-management">
        <div className="page-header">
          <h1>User Management</h1>
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="stats-grid">
          <StatsCard value={totalUsers} title="Tổng người dùng" />
          <StatsCard value={activeUsers} title="Đang hoạt động" />
          <StatsCard value={bannedUsers} title="Đã cấm" />
        </div>

        <div className="table-container">
          <div className="table-header">
            <h3>Danh sách người dùng</h3>
          </div>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên đăng nhập</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Số dư</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge role-${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.balance.toLocaleString()} VND</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className={user.status === 'ACTIVE' ? 'btn-ban' : 'btn-unban'}
                        onClick={() => handleBanToggle(user.userId, user.status)}
                      >
                        {user.status === 'ACTIVE' ? 'Cấm' : 'Mở khóa'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;