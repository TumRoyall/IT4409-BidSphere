import React from 'react';
import './StatsCard.css';

interface StatsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle }) => {
  return (
    <div className="stats-card">
      <h3 className="stats-value">{value}</h3>
      <p className="stats-title">{title}</p>
      {subtitle && <p className="stats-subtitle">{subtitle}</p>}
    </div>
  );
};

export default StatsCard;