import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiHome, FiUsers, FiAlertTriangle, FiFlag, FiPackage } from 'react-icons/fi';
import '@/modules/admin/styles/AdminSidebar.css';
import { useAuth } from '@/hooks/useAuth';
import { ROLES } from '@/constants/roles';

const AdminSidebar: React.FC = () => {
    const { user } = useAuth();
    const userRole = user?.role || user?.roleName;
    const isAdmin = userRole?.toUpperCase() === ROLES.ADMIN;
    const isModerator = userRole?.toUpperCase() === ROLES.MODERATOR;

    // Menu items visible to all (ADMIN + MODERATOR)
    const commonMenuItems = [
        {
            to: "/superadmin/dashboard",
            icon: FiHome,
            label: "Dashboard",
        },
    ];

    // Menu items only for ADMIN
    const adminOnlyItems = [
        {
            to: "/superadmin/users",
            icon: FiUsers,
            label: "Users",
        },
        {
            to: "/superadmin/user-warnings",
            icon: FiAlertTriangle,
            label: "Warnings",
        },
        {
            to: "/superadmin/user-reports",
            icon: FiFlag,
            label: "Reports",
        },
        {
            to: "/superadmin/products",
            icon: FiPackage, // Bạn có thể đổi icon nếu muốn
            label: "Products", // Đây là mục quản lý sản phẩm
        },
    ];

    // Menu items for MODERATOR (approval pages)
    const moderatorItems = [
        {
            to: "/superadmin/auction/approval",
            icon: FiPackage,
            label: "Auction Approval",
        },
    ];

    // Build menu based on role
    let menuItems = [...commonMenuItems];

    if (isAdmin) {
        menuItems = [...menuItems, ...adminOnlyItems, ...moderatorItems];
    } else if (isModerator) {
        menuItems = [...menuItems, ...moderatorItems];
    }

    return (
        <div className="admin-sidebar">
            <Link to="/" className="admin-logo">
                <h2>1xBid Admin</h2>
            </Link>
            {isModerator && !isAdmin && (
                <div className="sidebar-role-badge">MODERATOR</div>
            )}

            <nav>
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                <item.icon size={16} />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;

