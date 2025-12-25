import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productApi from "@/api/modules/product.api";
import type { ProductResponse } from "@/api/modules/product.api";
import { userApi } from "@/api/modules/user.api";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Star,
  MessageCircle,
  Shield,
  Share2,
  Heart,
  ChevronRight
} from "lucide-react";
import "@/styles/seller-profile.css";

type SellerData = any;

interface SellerStats {
  totalProducts: number;
  activeAuctions: number;
  completedAuctions: number;
  successRate: number;
  approvalRate: number;
  pendingProducts: number;
  recentListings: number;
  averageStartPrice: number;
  topCategories: Array<{ name: string; count: number }>;
  highestStartPrice: number;
  reputationScore: number;
}

const SellerProfile = (): React.ReactElement => {
  const { sellerId } = useParams<{ sellerId: string }>();
  const [activeTab, setActiveTab] = useState<"active" | "all">("active");

  const [sellerData, setSellerData] = useState<SellerData | null>(null);
  const [stats, setStats] = useState<SellerStats | null>(null);
  const [sellerProducts, setSellerProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculateStats = (products: ProductResponse[]): SellerStats => {
    const totalProducts = products.length;
    const normalizedStatuses = products.map((item) => (item.status || "").toLowerCase());

    const activeStatuses = new Set(["active", "approved", "open"]);
    const completedStatuses = new Set(["completed", "sold", "closed", "ended", "cancelled"]);

    const activeProducts = normalizedStatuses.filter((status) => activeStatuses.has(status)).length;
    const completedProducts = normalizedStatuses.filter((status) => completedStatuses.has(status)).length;
    const pendingProducts = normalizedStatuses.filter((status) => status === "pending").length;
    const approvedProducts = normalizedStatuses.filter((status) => status === "approved" || status === "active").length;

    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recentListings = products.filter((product) => {
      if (!product.createdAt) return false;
      return new Date(product.createdAt).getTime() >= thirtyDaysAgo;
    }).length;

    const startPrices = products
      .map((product) => Number(product.startPrice ?? 0))
      .filter((price) => price > 0);

    const averageStartPrice = startPrices.length
      ? startPrices.reduce((sum, value) => sum + value, 0) / startPrices.length
      : 0;
    const highestStartPrice = startPrices.length ? Math.max(...startPrices) : 0;

    const categoryMap = new Map<string, number>();
    products.forEach((product) => {
      const category = (product.category || "Uncategorized").trim() || "Uncategorized";
      categoryMap.set(category, (categoryMap.get(category) ?? 0) + 1);
    });

    const topCategories = Array.from(categoryMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));

    const successRate = totalProducts > 0 ? (completedProducts / totalProducts) * 100 : 0;
    const approvalRate = totalProducts > 0 ? (approvedProducts / totalProducts) * 100 : 0;
    const reputationScore = Math.min(
      100,
      Math.round(successRate * 0.6 + approvalRate * 0.3 + Math.min(recentListings, 5) * 2)
    );

    return {
      totalProducts,
      activeAuctions: activeProducts,
      completedAuctions: completedProducts,
      successRate: Number(successRate.toFixed(2)),
      approvalRate: Number(approvalRate.toFixed(2)),
      pendingProducts,
      recentListings,
      averageStartPrice,
      topCategories,
      highestStartPrice,
      reputationScore
    };
  };

  const formatCurrency = (value?: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0
    }).format(value ?? 0);

  const resolveSellerId = (profile: SellerData | null): number | null => {
    if (!profile) return null;
    if (profile.id) return Number(profile.id);
    if (profile.userId) return Number(profile.userId);
    if (profile.sellerId) return Number(profile.sellerId);
    return null;
  };

  const loadSellerProducts = async (targetSellerId: number) => {
    try {
      const response = await productApi.getProductsPage(0, 100, { sellerId: targetSellerId });
      const payload: any = response.data;
      let productList: ProductResponse[] = [];

      if (Array.isArray(payload)) {
        productList = payload;
      } else if (payload?.content && Array.isArray(payload.content)) {
        productList = payload.content;
      } else if (payload?.products && Array.isArray(payload.products)) {
        productList = payload.products;
      }

      const normalizedList = productList.filter(
        (product) => Number(product.sellerId ?? (product as any).seller_id) === Number(targetSellerId)
      );

      setSellerProducts(normalizedList);
      setStats(calculateStats(normalizedList));
    } catch (productErr) {
      console.error("Failed to fetch seller products:", productErr);
      setSellerProducts([]);
      setStats(calculateStats([]));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get profile (own or other seller)
        let profileData;
        if (sellerId) {
          // Get public profile of other seller
          const res = await userApi.getPublicProfile(parseInt(sellerId));
          profileData = res;
        } else {
          // Get own profile
          profileData = await userApi.getProfile();
        }
        setSellerData(profileData);

        const resolvedId = sellerId ? Number(sellerId) : resolveSellerId(profileData);
        if (resolvedId) {
          await loadSellerProducts(resolvedId);
        } else {
          setSellerProducts([]);
          setStats(calculateStats([]));
        }
      } catch (err: any) {
        console.error("Error fetching seller profile:", err);
        setError(err?.response?.data?.message || "Failed to load seller profile");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sellerId]);

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      active: { label: "Active", className: "status-active" },
      approved: { label: "Approved", className: "status-active" },
      open: { label: "Active", className: "status-active" },
      created: { label: "Incoming", className: "status-coming" },
      pending: { label: "Pending", className: "status-coming" },
      coming_soon: { label: "Coming Soon", className: "status-coming" },
      draft: { label: "Draft", className: "status-coming" },
      closed: { label: "Closed", className: "status-ended" },
      ended: { label: "Ended", className: "status-ended" },
      rejected: { label: "Rejected", className: "status-ended" },
      cancelled: { label: "Cancelled", className: "status-ended" },
      sold: { label: "Sold", className: "status-ended" }
    };
    return statusMap[status?.toLowerCase()] || { label: status || "Unknown", className: "" };
  };

  const filteredProducts = sellerProducts.filter((product) => {
    const status = (product.status || "").toLowerCase();
    if (activeTab === "active") return status === "approved";
    return true; // "all" tab - show all products of this seller
  });

  if (loading) {
    return (
      <div className="seller-profile">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading seller profile...</p>
        </div>
      </div>
    );
  }

  if (error || !sellerData) {
    return (
      <div className="seller-profile">
        <div className="error-state">
          <p>{error || "Failed to load seller profile"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="seller-profile">
      {/* PROFILE HEADER */}
      <div className="seller-header">
        <div className="header-container">
          <div className="header-top">
            <div className="avatar-section">
              <div className="avatar-wrapper">
                <img
                  src={sellerData.avatarUrl || "/placeholder-seller.png"}
                  alt={sellerData.fullName}
                  className="avatar"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-seller.png";
                  }}
                />
                <div className="verified-badge">
                  <Shield size={16} fill="currentColor" />
                </div>
              </div>

              <div className="seller-info">
                <h1 className="seller-name">{sellerData.fullName}</h1>

                <div className="rating-row">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="rating-score">{stats?.successRate?.toFixed(0) || 0}% match</span>
                </div>

                <p className="seller-meta">
                  <MapPin size={12} />
                  {sellerData.status || "Member"}
                  <span className="dot">•</span>
                  Since {new Date(sellerData.createdAt).getFullYear()}
                </p>
              </div>
            </div>

            <div className="header-actions">
              <button className="btn-primary">
                <MessageCircle size={16} />
                Contact
              </button>
              <button className="btn-icon">
                <Share2 size={18} />
              </button>
              <button className="btn-icon">
                <Heart size={18} />
              </button>
            </div>
          </div>

          {/* QUICK STATS */}
          {stats && (
            <div className="quick-stats">
              <div className="quick-stat">
                <div className="stat-value">{stats.activeAuctions || 0}</div>
                <div className="stat-label">Đang diễn ra</div>
              </div>
              <div className="quick-stat">
                <div className="stat-value">{stats.completedAuctions || 0}</div>
                <div className="stat-label">Hoàn tất</div>
              </div>
              <div className="quick-stat">
                <div className="stat-value">{(stats.successRate || 0).toFixed(0)}%</div>
                <div className="stat-label">Tỉ lệ thành công</div>
              </div>
              <div className="quick-stat">
                <div className="stat-value">{stats.reputationScore || 0}</div>
                <div className="stat-label">Điểm uy tín</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="seller-content">
        <div className="content-container">
          {/* LEFT COLUMN */}
          <div className="content-left">
            {/* SELLER STATS */}
            {stats && (
              <section className="card">
                <div className="card-header">
                  <h2 className="card-title">Seller Performance</h2>
                  <span className="card-subtitle">Tổng quan trong 30 ngày gần nhất</span>
                </div>

                <div className="stat-boxes">
                  <div className="stat-box accent">
                    <div className="stat-box-label">Tổng sản phẩm</div>
                    <div className="stat-box-value">{stats.totalProducts}</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-box-label">Đã duyệt</div>
                    <div className="stat-box-value">{stats.totalProducts - stats.pendingProducts}</div>
                    <p className="stat-box-hint">{stats.approvalRate.toFixed(0)}% approval</p>
                  </div>
                  <div className="stat-box">
                    <div className="stat-box-label">Chờ duyệt</div>
                    <div className="stat-box-value">{stats.pendingProducts}</div>
                    <p className="stat-box-hint">{stats.recentListings} bài đăng mới</p>
                  </div>
                </div>

                <div className="insight-grid">
                  <div className="insight-card">
                    <span>Giá khởi điểm TB</span>
                    <strong>{formatCurrency(stats.averageStartPrice)}</strong>
                  </div>
                  <div className="insight-card">
                    <span>Listing cao nhất</span>
                    <strong>{formatCurrency(stats.highestStartPrice)}</strong>
                  </div>
                  <div className="insight-card">
                    <span>Số phiên đang chạy</span>
                    <strong>{stats.activeAuctions}</strong>
                  </div>
                  <div className="insight-card">
                    <span>Số phiên hoàn tất</span>
                    <strong>{stats.completedAuctions}</strong>
                  </div>
                </div>
              </section>
            )}

            {stats?.topCategories?.length ? (
              <section className="card">
                <div className="card-header">
                  <h2 className="card-title">Top Categories</h2>
                  <span className="card-subtitle">Lĩnh vực hoạt động nổi bật</span>
                </div>
                <div className="category-chips">
                  {stats.topCategories.map((category) => (
                    <div key={category.name} className="category-chip">
                      <span>{category.name}</span>
                      <small>{category.count} sản phẩm</small>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* CONTACT */}
            <section className="card">
              <h2 className="card-title">Contact Information</h2>

              <div className="contact-list">
                <a href={`mailto:${sellerData.email}`} className="contact-link">
                  <Mail size={18} />
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">{sellerData.email}</div>
                  </div>
                </a>

                <a href={`tel:${sellerData.phone}`} className="contact-link">
                  <Phone size={18} />
                  <div>
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">{sellerData.phone}</div>
                  </div>
                </a>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN - SIDEBAR */}
          <div className="content-right">
            <div className="card">
              <h3 className="card-title">Seller Info</h3>
              <div className="detail-item">
                <span>Member Since</span>
                <strong>{new Date(sellerData.createdAt).toLocaleDateString("vi-VN")}</strong>
              </div>
              <div className="detail-item">
                <span>Status</span>
                <strong>{sellerData.status || "Active"}</strong>
              </div>
              <div className="detail-item">
                <span>Username</span>
                <strong>{sellerData.username}</strong>
              </div>
            </div>

            {stats && (
              <div className="card">
                <h3 className="card-title">Marketplace Insights</h3>
                <div className="detail-item">
                  <span>Điểm uy tín</span>
                  <strong>{stats.reputationScore}/100</strong>
                </div>
                <div className="detail-item">
                  <span>Tỉ lệ thành công</span>
                  <strong>{stats.successRate.toFixed(1)}%</strong>
                </div>
                <div className="detail-item">
                  <span>Tỉ lệ duyệt</span>
                  <strong>{stats.approvalRate.toFixed(1)}%</strong>
                </div>
                <div className="detail-item">
                  <span>Bài đăng mới (30d)</span>
                  <strong>{stats.recentListings}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="auctions-section">
        <div className="auctions-container">
          <div className="auctions-header">
            <h2>Featured Products</h2>
            <div className="tabs">
              <button
                className={`tab ${activeTab === "active" ? "active" : ""}`}
                onClick={() => setActiveTab("active")}
              >
                Active
              </button>
              <button
                className={`tab ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All
              </button>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="auctions-grid">
              {filteredProducts.slice(0, 8).map((product) => {
                const statusInfo = getStatusBadge(product.status || "");
                const productId = product.productId || product.id || 0;
                const imageSrc =
                  product.imageUrl ||
                  product.images?.find((img) => img.isThumbnail)?.url ||
                  "/placeholder-auction.png";
                return (
                  <a href={`/product/${productId}`} key={productId} className="auction-card">
                    <div className="auction-image-box">
                      <img
                        src={imageSrc}
                        alt={product.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder-auction.png";
                        }}
                      />
                      <span className={`badge ${statusInfo.className}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="auction-info">
                      <h3>{product.name}</h3>
                      <p className="auction-date">
                        <Clock size={12} />
                        {new Date(product.createdAt || Date.now()).toLocaleDateString("vi-VN")}
                      </p>
                      <p className="auction-price">{formatCurrency(product.startPrice)}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <p>No auctions found in this category</p>
            </div>
          )}

          {filteredProducts.length > 8 && (
            <div className="view-more-btn">
              <button>
                View All Auctions
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
