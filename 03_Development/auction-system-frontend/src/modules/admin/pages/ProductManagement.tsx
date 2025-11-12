import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';
import StatsCard from '@/components/common/StatsCard';
import adminApi from '@/api/modules/admin.api';
import type { Product } from '@/types/admin.types';
import './ProductManagement.css';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch products từ API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        await adminApi.deleteProduct(id);
        setProducts(products.filter(p => p.productId !== id));
        alert('Xóa sản phẩm thành công!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Không thể xóa sản phẩm');
      }
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await adminApi.approveProduct(id);
      // Cập nhật lại danh sách
      await fetchProducts();
      alert('Duyệt sản phẩm thành công!');
    } catch (error) {
      console.error('Error approving product:', error);
      alert('Không thể duyệt sản phẩm');
    }
  };

  const handleReject = async (id: number) => {
    try {
      await adminApi.rejectProduct(id);
      await fetchProducts();
      alert('Từ chối sản phẩm thành công!');
    } catch (error) {
      console.error('Error rejecting product:', error);
      alert('Không thể từ chối sản phẩm');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'ONGOING').length;
  const pendingProducts = products.filter(p => p.status === 'WAITING').length;

  const getStatusBadgeClass = (status: string) => {
    const statusMap: Record<string, string> = {
      'ONGOING': 'status-active',
      'WAITING': 'status-pending',
      'SOLD': 'status-inactive',
      'REJECTED': 'status-inactive'
    };
    return statusMap[status] || 'status-pending';
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="product-management">
          <p>Đang tải...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="product-management">
        {/* Header */}
        <div className="page-header">
          <h1>Product Management</h1>
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <StatsCard value={totalProducts} title="Tổng sản phẩm" />
          <StatsCard value={activeProducts} title="Đang hoạt động" />
          <StatsCard value={pendingProducts} title="Chờ duyệt" />
        </div>

        {/* Products Table */}
        <div className="table-container">
          <div className="table-header">
            <h3>Danh sách sản phẩm</h3>
          </div>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên sản phẩm</th>
                <th>Giá khởi điểm</th>
                <th>Giá hiện tại</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.name}</td>
                  <td>{product.startingPrice.toLocaleString()} VND</td>
                  <td>{product.currentPrice.toLocaleString()} VND</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {product.status === 'WAITING' && (
                        <>
                          <button 
                            className="btn-edit"
                            onClick={() => handleApprove(product.productId)}
                          >
                            Duyệt
                          </button>
                          <button 
                            className="btn-delete"
                            onClick={() => handleReject(product.productId)}
                          >
                            Từ chối
                          </button>
                        </>
                      )}
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(product.productId)}
                      >
                        Xóa
                      </button>
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

export default ProductManagement;