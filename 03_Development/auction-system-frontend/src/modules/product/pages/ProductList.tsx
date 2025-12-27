import { useEffect, useState } from "react";
import { Filter, Search } from "lucide-react";
import productApi from "@/api/modules/product.api";
import ProductCard from "../components/ProductCard";
import type { ProductResponse, ProductPage } from "@/api/modules/product.api";
import "@/styles/modules/product-list/index.css";

export default function ProductList() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const pageSize = 12;

  const categories = [
    "all",
    "Electronics",
    "Furniture",
    "Clothing",
    "Jewelry",
    "Art",
    "Collectibles",
    "Other",
  ];

  // Load products
  useEffect(() => {
    loadProducts();
  }, [page, filterCategory, searchTerm]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productApi.getProductsPage(page, pageSize);
      const data = response.data as ProductPage;

      // Filter by category if selected
      let filteredProducts = data.content || [];
      if (filterCategory !== "all") {
        filteredProducts = filteredProducts.filter(
          (p) => p.category?.toLowerCase() === filterCategory.toLowerCase()
        );
      }

      // Filter by search term
      if (searchTerm.trim()) {
        filteredProducts = filteredProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Only show approved products to bidders
      filteredProducts = filteredProducts.filter(
        (p) => p.status?.toLowerCase() === "approved"
      );

      setProducts(filteredProducts);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      console.error("Failed to load products:", err);
      setError(err?.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(0); // Reset to first page on search
  };

  const handleCategoryChange = (category: string) => {
    setFilterCategory(category);
    setPage(0); // Reset to first page on category change
  };

  if (loading && products.length === 0) {
    return (
      <div className="product-list-container">
        <div className="product-list-loading-spinner">
          <div className="product-list-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {/* Header */}
      <div className="product-list-header">
        <h1>Browse Products</h1>
        <p>Find approved products for auction</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="product-list-filter-bar">
        {/* Search */}
        <form onSubmit={handleSearch} className="product-list-search-form">
          <Search size={20} className="product-list-search-icon" />
          <input
            type="text"
            placeholder="Search products by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="product-list-search-input"
          />
        </form>

        {/* Category Filter */}
        <div className="product-list-filter-section">
          <Filter size={20} className="product-list-filter-icon" />
          <select
            value={filterCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="product-list-filter-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="product-list-error-message">
          <p>⚠️ {error}</p>
        </div>
      )}

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="product-list-empty-state">
          <p>No products found. Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <div className="product-list-grid">
            {products.map((product) => (
              <ProductCard
                key={product.productId || product.id}
                product={product}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="product-list-pagination">
            <button
              onClick={handlePreviousPage}
              disabled={page === 0}
              className="product-list-pagination-btn"
            >
              ← Previous
            </button>

            <div className="product-list-page-info">
              Page {page + 1} of {totalPages}
            </div>

            <button
              onClick={handleNextPage}
              disabled={page >= totalPages - 1}
              className="product-list-pagination-btn"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
