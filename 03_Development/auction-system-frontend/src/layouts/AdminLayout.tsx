import React, { ReactNode } from 'react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import './AdminLayout.css';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <main className="admin-main">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;