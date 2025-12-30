import React, { useEffect, useState } from "react";
import { getProductsPage } from "@/api/modules/adminProduct.api";
import type { ProductResponse } from "@/api/modules/adminProduct.api";
import "@/modules/admin/styles/AdminProductPage.css";

const statusLabel: Record<string, string> = {
  DRAFT: "DRAFT",
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

const statusOrder: Record<string, number> = {
  PENDING: 1,
  DRAFT: 2,
  APPROVED: 3,
  REJECTED: 4,
};

const AdminProductPage: React.FC = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [statusOpen, setStatusOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  const pageSize = 10;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProductsPage(0, 1000);
      setProducts(data.content);
      const cats = Array.from(new Set(data.content.map((p) => p.category).filter(Boolean)));
      setCategories(cats);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (searchText.trim()) {
      const keyword = searchText.toLowerCase();
      filtered = filtered.filter((p) =>
        [
          p.productId,
          p.name,
          p.category,
          p.status,
          p.startPrice,
          p.estimatePrice,
          p.sellerId,
        ]
          .map((v) => (v != null ? v.toString().toLowerCase() : ""))
          .some((v) => v.includes(keyword))
      );
    }

    if (selectedStatus !== "ALL") {
      filtered = filtered.filter((p) => p.status?.toLowerCase() === selectedStatus.toLowerCase());
    }
    if (selectedCategory !== "ALL") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    filtered.sort((a, b) => {
      const statusA = a.status?.toUpperCase() || ""; // để hoa
      const statusB = b.status?.toUpperCase() || ""; // để hoa
      const statusDiff = (statusOrder[statusA] ?? 99) - (statusOrder[statusB] ?? 99);
      if (statusDiff !== 0) return statusDiff;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize));
    setCurrentPage(1);
  }, [products, searchText, selectedStatus, selectedCategory]);

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const formatDate = (dateStr?: string) => 
    (dateStr ? new Date(dateStr).toLocaleString("vi-VN") : "-");

  const getStatusKey = (status?: string) => status?.toLowerCase() || "unknown";

  return (
    <div className="admin-product-page p-4">
      <h2>Admin Product Management</h2>

      {/* Filter bar */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search all fields..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {/* Status filter */}
        <div className="status-dropdown" style={{ position: "relative" }}>
          <button
            className={`dropdown-button ${selectedStatus !== "ALL" ? "active" : ""}`}
            onClick={() => setStatusOpen((prev) => !prev)}
          >
            {selectedStatus === "ALL" ? "All Statuses" : statusLabel[selectedStatus]}
          </button>
          {statusOpen && (
            <div className="dropdown-content">
              <div
                className={`dropdown-item ${selectedStatus === "ALL" ? "active" : ""}`}
                onClick={() => {
                  setSelectedStatus("ALL");
                  setStatusOpen(false);
                }}
              >
                All Statuses
              </div>
              {Object.keys(statusLabel).map((s) => (
                <div
                  key={s}
                  className={`dropdown-item ${selectedStatus === s ? "active" : ""}`}
                  onClick={() => {
                    setSelectedStatus(s);
                    setStatusOpen(false);
                  }}
                >
                  {statusLabel[s]}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category filter */}
        <div className="category-dropdown" style={{ position: "relative" }}>
          <button
            className={`dropdown-button ${selectedCategory !== "ALL" ? "active" : ""}`}
            onClick={() => setCategoryOpen((prev) => !prev)}
          >
            {selectedCategory === "ALL" ? "All Categories" : selectedCategory}
          </button>
          {categoryOpen && (
            <div className="dropdown-content">
              <div
                className={`dropdown-item ${selectedCategory === "ALL" ? "active" : ""}`}
                onClick={() => {
                  setSelectedCategory("ALL");
                  setCategoryOpen(false);
                }}
              >
                All Categories
              </div>
              {categories.length > 0 ? (
                categories.map((c) => (
                  <div
                    key={c}
                    className={`dropdown-item ${selectedCategory === c ? "active" : ""}`}
                    onClick={() => {
                      setSelectedCategory(c);
                      setCategoryOpen(false);
                    }}
                  >
                    {c}
                  </div>
                ))
              ) : (
                <div className="dropdown-item">No categories</div>
              )}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table className="min-w-full border">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Start Price</th>
                <th>Estimate Price</th>
                <th>Thumbnail</th>
                <th>Created At</th>
                <th>Deleted At</th>
                <th>Seller ID</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.map((p) => (
                <tr key={p.productId}>
                  <td>{p.productId}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td className="status-cell">
                    <span className={`status ${getStatusKey(p.status)}`}>
                      {p.status ? statusLabel[p.status.toUpperCase()] || p.status : "-"}
                    </span>
                  </td>
                  <td>{p.startPrice?.toLocaleString()}</td>
                  <td>{p.estimatePrice?.toLocaleString() ?? "-"}</td>
                  <td>
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-16 h-16" />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td>{formatDate(p.createdAt)}</td>
                  <td>{formatDate(p.deletedAt)}</td>
                  <td>{p.sellerId}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={currentPage === idx + 1 ? "active" : ""}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProductPage;