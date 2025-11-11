import React, { useState } from 'react';
import { Search } from 'lucide-react';
import AdminLayout from '@/layouts/AdminLayout';
import StatsCard from '@/components/common/StatsCard';
import './ProductManagement.css';

interface Product {
  id: number;
  name: string;
  price: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

// Mock data
const mockProducts: Product[] = [
  { id: 1, name: 'Product A', price: '$100', status: 'Active' },
  { id: 2, name: 'Product B', price: '$200', status: 'Inactive' },
  { id: 3, name: 'Product C', price: '$300', status: 'Active' },
  { id: 4, name: 'Product D', price: '$400', status: 'Pending' },
];

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleEdit = (id: number) => {
    alert(`Edit product ${id}`);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalProducts = products.length;
  const activeAuctions = products.filter(p => p.status === 'Active').length;
  const pendingApproval = products.filter(p => p.status === 'Pending').length;

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
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <StatsCard title="Total Products" value={totalProducts} />
          <StatsCard title="Active Auctions" value={activeAuctions} />
          <StatsCard title="Pending Approval" value={pendingApproval} />
        </div>

        {/* Products Table */}
        <div className="table-container">
          <div className="table-header">
            <button className="btn-add">Add Product</button>
          </div>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <span className={`status-badge status-${product.status.toLowerCase()}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(product.id)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
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