import React from "react";
import { Card, CardContent } from "@/components/common/Card";
import "@/styles/seller.css";

interface StatsOverviewProps {
  stats: {
    total_products?: number;
    active_sessions?: number;
    pending_approval?: number;
  } | null;
  loading?: boolean;
}

// ✅ Định nghĩa component trước
const StatsOverview = ({ stats, loading }: StatsOverviewProps): JSX.Element => {
  // Mock data nếu chưa có từ API
  const statsData = stats || {
    total_products: 0,
    active_sessions: 0,
    pending_approval: 0,
  };

  const displayStats = [
    {
      label: "Total Products",
      value: (statsData.total_products || 0).toString(),
      change: "Total products in your shop",
    },
    {
      label: "Active Sessions",
      value: (statsData.active_sessions || 0).toString(),
      change: "Currently running auctions",
    },
    {
      label: "Pending Approval",
      value: (statsData.pending_approval || 0).toString(),
      change: "Waiting for admin review",
    },
  ];

  if (loading) {
    return (
      <section className="stats-overview">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="stat-card">
            <CardContent className="stat-content">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-32"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    );
  }

  return (
    <section className="stats-overview">
      {displayStats.map((stat, index) => (
        <Card
          key={index}
          className="stat-card fade-in"
          style={
            { animationDelay: `${index * 100}ms` } as React.CSSProperties
          }
        >
          <CardContent className="stat-content">
            <p className="stat-label">{stat.label}</p>
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-change">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
};

// ✅ Xuất default sau cùng
export default StatsOverview;
