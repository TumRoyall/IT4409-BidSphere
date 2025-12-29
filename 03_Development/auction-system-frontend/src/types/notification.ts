export interface NotificationItem {
  notiId: string | number;
  type: string;
  message: string;
  title?: string;
  isRead: boolean;
  createdAt: string;
  data?: Record<string, any>;
}

export interface NotificationResponse {
  content: NotificationItem[];
  hasNext: boolean;
  page: number;
  size: number;
  total: number;
}
