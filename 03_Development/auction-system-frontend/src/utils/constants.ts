// Constants
// TODO: Add application constants

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const USER_ROLES = {
  BIDDER: 'BIDDER',
  SELLER: 'SELLER',
  ADMIN: 'ADMIN',
} as const;

export const AUCTION_STATUS = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  CANCELLED: 'CANCELLED',
} as const;
