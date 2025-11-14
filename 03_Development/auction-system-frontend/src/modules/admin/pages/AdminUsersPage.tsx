import React, { useEffect, useState } from 'react';
import { adminUserApi } from '@/api/modules/adminUser.api';
import '@/modules/admin/styles/AdminUsersPage.css';

interface UserResponse {
    userId: number;
    fullName: string;
    username: string;
    email: string;
    phone: string;
    gender?: string;
    status?: string;
    roleName?: string;
}

const AdminUsersPage: React.FC = () => {
    const [users, setUsers] = useState<UserResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await adminUserApi.getAll();
            setUsers(res.data);
        } catch (err) {
            console.error(err);
            setError('Lỗi khi tải dữ liệu users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Bạn có chắc muốn xóa user này?')) return;
        try {
            await adminUserApi.deleteUser(id); // đổi từ delete -> deleteUser
            fetchUsers();
        } catch (err) {
            console.error(err);
            alert('Xóa user thất bại!');
        }
    };


    const handleBan = async (user: UserResponse) => {
        const reason = window.prompt('Nhập lý do ban:');
        if (!reason) return;

        const untilDate = window.prompt(
            'Ban đến ngày (YYYY-MM-DD):',
            new Date().toISOString().slice(0, 10)
        );
        if (!untilDate) return;

        // Chuyển sang full ISO string
        const bannedUntil = new Date(untilDate + "T23:59:59").toISOString();

        try {
            await adminUserApi.ban(user.userId, {
                userId: user.userId,
                reason,
                bannedUntil,
            });
            fetchUsers();
        } catch (err) {
            console.error(err);
            alert('Ban user thất bại!');
        }
    };


    const handleUnban = async (user: UserResponse) => {
        try {
            await adminUserApi.unban(user.userId);
            fetchUsers();
        } catch (err) {
            console.error(err);
            alert('Unban user thất bại!');
        }
    };


    if (loading) return <div>Đang tải dữ liệu...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="admin-users-page">
            <h1>Quản lý Users</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.userId}>
                        <td>{user.userId}</td>
                        <td>{user.username}</td>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.status}</td>
                        <td>{user.roleName}</td>
                        <td className="actions">
                            <button onClick={() => handleBan(user)}>Ban</button>
                            <button onClick={() => handleUnban(user)}>Unban</button>
                            <button onClick={() => handleDelete(user.userId)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsersPage;
