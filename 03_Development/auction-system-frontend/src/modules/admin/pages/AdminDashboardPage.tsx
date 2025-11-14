import React from 'react';
import '@/modules/admin/styles/AdminDashboardPage.css'

const AdminDashboardPage: React.FC = () => {
    return (
        <div className="admin-dashboard-page">
            <h1>Dashboard</h1>
            <div className="dashboard-cards">
                <div className="card">
                    <h2>Tổng số Users</h2>
                    <p>120</p>
                </div>
                <div className="card">
                    <h2>Users đang bị Ban</h2>
                    <p>5</p>
                </div>
                <div className="card">
                    <h2>Tổng số Auction</h2>
                    <p>45</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
