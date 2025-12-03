import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import auctionApi from "@/api/modules/auction.api";
import { userApi } from "@/api/modules/user.api";
import type { AuctionResponse } from "@/api/modules/auction.api";
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

interface AuctionItem extends Omit<AuctionResponse, "product"> {
  title?: string;
  featured?: boolean;
}

interface SellerStats {
  total_products: number;
  active_auctions: number;
  completed_auctions: number;
  success_rate: number;
  averagePrice?: number;
}

const SellerProfile = (): React.ReactElement => {
  const { sellerId } = useParams<{ sellerId: string }>();
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "all">("active");
  
  const [sellerData, setSellerData] = useState<SellerData | null>(null);
  const [stats, setStats] = useState<SellerStats | null>(null);
  const [auctions, setAuctions] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculateStats = (allAuctions: AuctionResponse[]) => {
    const activeAuctions = allAuctions.filter(
      (a) => a.status === "open" || a.status === "active"
    ).length;
    
    const completedAuctions = allAuctions.filter(
      (a) => a.status === "closed" || a.status === "ended"
    ).length;
    
    const totalAuctions = allAuctions.length;
    const successRate = totalAuctions > 0 ? (completedAuctions / totalAuctions) * 100 : 0;
    
    return {
      total_products: totalAuctions,
      active_auctions: activeAuctions,
      completed_auctions: completedAuctions,
      success_rate: parseFloat(successRate.toFixed(2)),
      followers_count: 0
    };
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

        let allAuctions: AuctionResponse[] = [];
        try {
          const auctionsRes = await auctionApi.getAllAuctions();
          allAuctions = auctionsRes.data || [];
          
          const filteredAuctions = allAuctions
            .map((auction: AuctionResponse) => ({
              ...auction,
              title: auction.product?.name || `Auction ${auction.auctionId || auction.id}`,
              featured: false,
              thumbnail: auction.product?.imageUrl || auction.productImageUrl || "/placeholder-auction.png"
            }));

          setAuctions(filteredAuctions);
        } catch (auctionsErr: any) {
          console.warn("Failed to fetch auctions:", auctionsErr?.response?.status);
          setAuctions([]);
        }

        const calculatedStats = calculateStats(allAuctions);
        setStats(calculatedStats);
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
      "open": { label: "Active", className: "status-active" },
      "active": { label: "Active", className: "status-active" },
      "created": { label: "Coming Soon", className: "status-coming" },
      "coming_soon": { label: "Coming Soon", className: "status-coming" },
      "closed": { label: "Ended", className: "status-ended" },
      "ended": { label: "Ended", className: "status-ended" },
      "cancelled": { label: "Cancelled", className: "status-ended" }
    };
    return statusMap[status?.toLowerCase()] || { label: status || "Unknown", className: "" };
  };

  const filteredAuctions = auctions.filter((auction) => {
    if (activeTab === "active") return auction.status === "open" || auction.status === "active";
    if (activeTab === "completed") return auction.status === "closed" || auction.status === "ended";
    return true;
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
                   <span className="rating-score">{stats?.success_rate?.toFixed(0) || 0}%</span>
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
                <div className="stat-value">{stats.active_auctions || 0}</div>
                <div className="stat-label">Active</div>
              </div>
              <div className="quick-stat">
                <div className="stat-value">{stats.completed_auctions || 0}</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="quick-stat">
                <div className="stat-value">{(stats.success_rate || 0).toFixed(0)}%</div>
                <div className="stat-label">Success Rate</div>
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
                <h2 className="card-title">Seller Performance</h2>
                
                <div className="stat-boxes">
                  <div className="stat-box">
                    <div className="stat-box-value">{stats.total_products}</div>
                    <div className="stat-box-label">Total Products</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-box-value">{stats.completed_auctions}</div>
                    <div className="stat-box-label">Completed</div>
                  </div>
                  <div className="stat-box">
                    <div className="stat-box-value">{(stats.success_rate || 0).toFixed(0)}%</div>
                    <div className="stat-box-label">Success Rate</div>
                  </div>
                </div>
              </section>
            )}

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
                <h3 className="card-title">Auction Stats</h3>
                <div className="detail-item">
                  <span>Active Auctions</span>
                  <strong>{stats.active_auctions}</strong>
                </div>
                <div className="detail-item">
                  <span>Completed</span>
                  <strong>{stats.completed_auctions}</strong>
                </div>
                <div className="detail-item">
                  <span>Success Rate</span>
                  <strong>{(stats.success_rate || 0).toFixed(1)}%</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AUCTIONS */}
      <div className="auctions-section">
        <div className="auctions-container">
          <div className="auctions-header">
            <h2>Featured Auctions</h2>
            <div className="tabs">
              <button
                className={`tab ${activeTab === "active" ? "active" : ""}`}
                onClick={() => setActiveTab("active")}
              >
                Active
              </button>
              <button
                className={`tab ${activeTab === "completed" ? "active" : ""}`}
                onClick={() => setActiveTab("completed")}
              >
                Completed
              </button>
              <button
                className={`tab ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
              >
                All
              </button>
            </div>
          </div>

          {filteredAuctions.length > 0 ? (
            <div className="auctions-grid">
              {filteredAuctions.slice(0, 8).map((auction) => {
                const statusInfo = getStatusBadge(auction.status || "");
                const auctionId = auction.auctionId || auction.id || 0;
                return (
                  <a href={`/auction/${auctionId}`} key={auctionId} className="auction-card">
                    <div className="auction-image-box">
                      <img
                        src={(auction as any).thumbnail || "/placeholder-auction.png"}
                        alt={auction.title || "Auction"}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder-auction.png";
                        }}
                      />
                      <span className={`badge ${statusInfo.className}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="auction-info">
                      <h3>{auction.title || "Auction"}</h3>
                      {auction.startTime && (
                        <p className="auction-date">
                          <Clock size={12} />
                          {new Date(auction.startTime).toLocaleDateString("vi-VN")}
                        </p>
                      )}
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

          {filteredAuctions.length > 8 && (
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
