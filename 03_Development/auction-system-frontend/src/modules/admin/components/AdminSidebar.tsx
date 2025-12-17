import React from 'react';
import { NavLink } from 'react-router-dom';
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
                            Dashboard
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/superadmin/users"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/superadmin/violations"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            Violations
                        </NavLink>
                    </li>

                    {/* ✅ User Reports */}
                    <li>
                        <NavLink
                            to="/superadmin/user-reports"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            Reports
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;
