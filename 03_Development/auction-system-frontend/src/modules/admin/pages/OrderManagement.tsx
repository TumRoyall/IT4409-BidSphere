import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';
import StatsCard from '@/components/common/StatsCard';
import adminApi from '@/api/modules/admin.api';
import type { Transaction } from '@/types/admin.types';
import './OrderManagement.css';

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch transactions từ API
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getAllTransactions();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      await adminApi.updateTransactionStatus(id, newStatus);
      // Cập nhật lại danh sách
      await fetchOrders();
      alert('Cập nhật trạng thái thành công!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Không thể cập nhật trạng thái');
    }
  };

  const filteredOrders = orders.filter(order =>
    order.id.toString().includes(searchTerm) ||
    order.buyerId.toString().includes(searchTerm) ||
    order.sellerId.toString().includes(searchTerm)
  );

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
  const completedOrders = orders.filter(o => o.status === 'DONE').length;

  const getStatusBadgeClass = (status: string) => {
    const statusMap: Record<string, string> = {
      'PENDING': 'status-pending',
      'PAID': 'status-paid',
      'SHIPPED': 'status-shipped',
      'DONE': 'status-active',
      'CANCELLED': 'status-inactive'
    };
    return statusMap[status] || 'status-pending';
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="order-management">
          <p>Đang tải...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="order-management">
        <div className="page-header">
          <h1>Order Management</h1>
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="stats-grid">
          <StatsCard value={totalOrders} title="Tổng đơn hàng" />
          <StatsCard value={pendingOrders} title="Chờ xử lý" />
          <StatsCard value={completedOrders} title="Hoàn thành" />
        </div>

        <div className="table-container">
          <div className="table-header">
            <h3>Danh sách đơn hàng</h3>
          </div>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Phiên đấu giá</th>
                <th>Buyer ID</th>
                <th>Seller ID</th>
                <th>Số tiền</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>#{order.auctionId}</td>
                  <td>{order.buyerId}</td>
                  <td>{order.sellerId}</td>
                  <td>{order.amount.toLocaleString()} VND</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <select 
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="PENDING">Chờ xử lý</option>
                        <option value="PAID">Đã thanh toán</option>
                        <option value="SHIPPED">Đã gửi hàng</option>
                        <option value="DONE">Hoàn thành</option>
                        <option value="CANCELLED">Đã hủy</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderManagement;