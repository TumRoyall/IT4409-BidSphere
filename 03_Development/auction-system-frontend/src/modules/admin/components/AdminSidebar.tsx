import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiAlertTriangle, FiFlag } from 'react-icons/fi';
import '@/modules/admin/styles/AdminSidebar.css';

const AdminSidebar: React.FC = () => {
    return (
        <div className="admin-sidebar">
            <h2>Admin Panel</h2>

            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/superadmin/dashboard"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FiHome size={16} />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/superadmin/users"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FiUsers size={16} />
                            <span>Users</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/superadmin/user-warnings"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FiAlertTriangle size={16} />
                            <span>Warnings</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/superadmin/user-reports"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            <FiFlag size={16} />
                            <span>Reports</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;
