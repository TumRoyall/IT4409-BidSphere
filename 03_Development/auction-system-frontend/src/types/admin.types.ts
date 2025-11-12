// TypeScript Types for Admin Module

export interface User {
  userId: number;
  username: string;
  email: string;
  balance: number;
  role: 'ADMIN' | 'SELLER' | 'BIDDER';
  status: 'ACTIVE' | 'BANNED';
  createdAt: string;
}

export interface Product {
  productId: number;
  sellerId: number;
  name: string;
  description: string;
  startingPrice: number;
  currentPrice: number;
  status: 'WAITING' | 'ONGOING' | 'SOLD' | 'REJECTED';
  createdAt: string;
}

export interface Transaction {
  id: number;
  auctionId: number;
  buyerId: number;
  sellerId: number;
  amount: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DONE' | 'CANCELLED';
  createdAt: string;
}

export interface Auction {
  auctionId: number;
  productId: number;
  startTime: string;
  endTime: string;
  highestBid: number;
  status: 'WAITING' | 'OPEN' | 'CLOSED';
  productName?: string;
  productImageUrl?: string;
  startPrice?: number;
}

// Admin Statistics
export interface AdminStats {
  totalUsers: number;
  totalProducts: number;
  totalAuctions: number;
  totalRevenue: number;
  activeUsers: number;
  pendingProducts: number;
}

// Request Types
export interface UpdateUserStatusRequest {
  status: 'ACTIVE' | 'BANNED';
}

export interface UpdateProductStatusRequest {
  status: 'WAITING' | 'ONGOING' | 'SOLD' | 'REJECTED';
}

export interface UpdateTransactionStatusRequest {
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DONE' | 'CANCELLED';
}