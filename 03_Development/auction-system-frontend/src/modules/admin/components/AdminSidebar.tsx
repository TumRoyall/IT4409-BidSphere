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
                        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : ''}>
                            Users
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;
//