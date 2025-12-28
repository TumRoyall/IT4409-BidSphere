import { useState, useEffect, useCallback, useRef } from "react";
import notificationApi from "@/api/modules/notification.api";
import type {
  NotificationItem,
  NotificationResponse,
} from "@/types/notification";
import { useAuth } from "./useAuth";
import { wsService } from "@/services/websocket.service";

export const useNotifications = () => {
  const { user, token } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [currentType, setCurrentType] = useState<string | undefined>();
  const wsConnected = useRef(false);

  // Fetch notifications
  const fetchNotifications = useCallback(
    async (pageNum = 0, append = false) => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const response = await notificationApi.getNotifications(
          currentType,
          undefined,
          pageNum,
          20
        );

        const data = response.data as NotificationResponse;
        if (append) {
          setNotifications((prev) => [...prev, ...data.content]);
        } else {
          setNotifications(data.content);
        }

        setPage(pageNum);
        setHasMore(data.hasNext);
        setError(null);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch notifications";
        setError(message);
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    },
    [user?.id, currentType]
  );

  // Fetch unread count
  const fetchUnreadCount = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await notificationApi.getUnreadCount();
      setUnreadCount(response.data.unreadCount);
    } catch (err: unknown) {
      console.error("Failed to fetch unread count:", err);
    }
  }, [user?.id]);

  // Mark as read
  const markAsRead = useCallback(
    async (notiId: number) => {
      try {
        // Update local state immediately
        setNotifications((prev) =>
          prev.map((n) => (n.notiId === notiId ? { ...n, isRead: true } : n))
        );

        // Decrement unread count immediately
        setUnreadCount((prev) => Math.max(0, prev - 1));

        // Use WebSocket if connected, otherwise use REST API
        if (wsConnected.current && wsService.isConnected()) {
          console.log("📤 Marking as read via WebSocket:", notiId);
          wsService.markAsRead(notiId);
        } else {
          console.log("📤 Marking as read via REST API:", notiId);
          await notificationApi.markAsRead(notiId);
        }
      } catch (err: unknown) {
        console.error("Failed to mark as read:", err);
        // Revert on error
        setNotifications((prev) =>
          prev.map((n) => (n.notiId === notiId ? { ...n, isRead: false } : n))
        );
        setUnreadCount((prev) => prev + 1);
      }
    },
    []
  );

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    try {
      // Use WebSocket if connected, otherwise use REST API
      if (wsConnected.current && wsService.isConnected()) {
        console.log("📤 Marking all as read via WebSocket");
        wsService.markAllAsRead();
      } else {
        console.log("📤 Marking all as read via REST API");
        await notificationApi.markAllAsRead();
      }

      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err: unknown) {
      console.error("Failed to mark all as read:", err);
    }
  }, []);

  // Filter by type
  const filterByType = useCallback((type?: string) => {
    setCurrentType(type);
    setPage(0);
    setNotifications([]);
    // Trigger fetch with new type
    setLoading(true);
  }, []);

  // Load more
  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      fetchNotifications(page + 1, true);
    }
  }, [page, hasMore, loading, fetchNotifications]);

  // Setup WebSocket for real-time updates
  useEffect(() => {
    if (!user?.id || !token) {
      wsConnected.current = false;
      return;
    }

    let isMounted = true;

    const setupWebSocket = async () => {
      try {
        // Subscribe to handlers BEFORE connecting
        wsService.onNotification((notification) => {
          if (isMounted) {
            console.log("📬 New notification received:", notification);
            // Prepend new notification to the list
            setNotifications((prev) => [notification, ...prev]);
            // Increment unread count
            setUnreadCount((prev) => prev + 1);
          }
        });

        wsService.onMarkAsRead((notiId) => {
          if (isMounted) {
            console.log("✓ Marked as read:", notiId);
            // Update notification state
            setNotifications((prev) =>
              prev.map((n) =>
                n.notiId === notiId ? { ...n, isRead: true } : n
              )
            );
            // Decrement unread count
            setUnreadCount((prev) => Math.max(0, prev - 1));
          }
        });

        // Connect to WebSocket
        await wsService.connect(String(user.id), token);
        wsConnected.current = true;

        // Send subscribe request after connection is established
        try {
          await wsService.sendSubscribeRequest();
        } catch (subscribeError: unknown) {
          console.warn("Failed to send subscribe request:", subscribeError);
          // Don't fail the entire setup if subscribe fails, we can still receive messages
        }
      } catch (err: unknown) {
        console.error("WebSocket setup failed:", err);
        wsConnected.current = false;
      }
    };

    setupWebSocket();

    // Cleanup on unmount
    return () => {
      isMounted = false;
    };
  }, [user?.id, token]);

  // Initial load
  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
      fetchUnreadCount();
    }
  }, [user?.id, fetchNotifications, fetchUnreadCount]);

  // Cleanup WebSocket on component unmount
  useEffect(() => {
    return () => {
      if (wsConnected.current) {
        wsService.disconnect();
        wsConnected.current = false;
      }
    };
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    hasMore,
    currentType,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    filterByType,
    loadMore,
  };
};
