import React from 'react';
import AdminSidebar from '@/modules/admin/components/AdminSidebar';
import '@/modules/admin/styles/AdminLayout.css';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main className="admin-main">
                <Outlet /> {/* đây sẽ render tất cả các route con */}
            </main>
        </div>
    );
};

export default AdminLayout;
