import React, { useState } from 'react';
import { LayoutDashboard, Package, Users, Settings, ShoppingCart } from 'lucide-react';
import './AdminSidebar.css';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={20} />,
    path: '/admin'
  },
  {
    id: 'products',
    label: 'Products',
    icon: <Package size={20} />,
    path: '/admin/products'
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: <ShoppingCart size={20} />,
    path: '/admin/orders'
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: <Users size={20} />,
    path: '/admin/customers'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={20} />,
    path: '/admin/settings'
  }
];

const AdminSidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('products');

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => setActiveItem(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;