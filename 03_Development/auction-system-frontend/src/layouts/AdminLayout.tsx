import React from 'react';
import AdminSidebar from '@/modules/admin/components/AdminSidebar';
import '@/modules/admin/styles/AdminLayout.css';
import { Outlet } from 'react-router-dom';
import GlobalSnow from "@/components/christmas/GlobalSnow";
import ReindeerScene from "@/components/christmas/ReindeerScene";
import ChristmasLightsSide from "@/components/christmas/ChristmasLightsSide";

const AdminLayout: React.FC = () => {
    return (
        <div className="admin-layout relative">
            <GlobalSnow />
            <ReindeerScene />
            <ChristmasLightsSide />
            <AdminSidebar />
            <main className="admin-main relative z-10">
                <Outlet /> {/* đây sẽ render tất cả các route con */}
            </main>
        </div>
    );
};

export default AdminLayout;
