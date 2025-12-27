import React, { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import type { IMessage } from "@stomp/stompjs";
import { useAuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

// Define Notification Type
export interface Notification {
    description: string;
    id: number;
    notiId: number;
    title: string;
    message: string;
    type: string; // BID, SYSTEM, PAYMENT, AUCTION
    category: string;
    priority: string;
    actionUrl?: string;
    actionLabel?: string;
    isRead: boolean;
    createdAt: string;
    metadata?: any;
}

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    markAsRead: (id: number) => void;
    markAllAsRead: () => void;
    stompClient: Client | null;
    isConnected: boolean;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const { token, user } = useAuthContext();
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        console.log("🔍 [NotificationContext] useEffect triggered");
        console.log("   token:", token ? "EXISTS" : "NULL");
        console.log("   user:", user ? user.id : "NULL");

        if (!token || !user) {
            console.log("❌ [NotificationContext] No token or user, skipping WebSocket setup");
            return;
        }

        console.log("✅ [NotificationContext] Starting WebSocket setup...");

        // Create STOMP Client
        const client = new Client({
            webSocketFactory: () => {
                console.log("🔌 [WebSocket] Creating SockJS connection to: http://localhost:8080/ws/notifications");
                return new SockJS("http://localhost:8080/ws/notifications");
            },
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            debug: (str) => {
                console.log("[STOMP] " + str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        client.onConnect = (frame) => {
            console.log("✅✅✅ Connected to WebSocket!");
            console.log("Frame:", frame);
            setIsConnected(true);

            // Subscribe to User Specific Notifications
            console.log("📡 Subscribing to: /user/queue/notifications");
            client.subscribe("/user/queue/notifications", (message: IMessage) => {
                try {
                    console.log("📨 RAW MESSAGE RECEIVED:", message);
                    const body = JSON.parse(message.body);
                    console.log("📨 PARSED BODY:", body);

                    let noti: Notification;
                    // Handle wrapped message structure if necessary
                    if (body.status === "notification" && body.notification) {
                        noti = body.notification;
                    } else {
                        noti = body;
                    }

                    console.log("📨 FINAL NOTIFICATION:", noti);

                    // Show Toast
                    toast.info(`${noti.title}: ${noti.message}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });

                    // Update State
                    setNotifications((prev) => [noti, ...prev]);
                    setUnreadCount((prev) => prev + 1);

                } catch (error) {
                    console.error("❌ Error parsing notification:", error);
                }
            });
            console.log("✅ Subscription complete!");
        };

        client.onStompError = (frame) => {
            console.error("❌❌❌ STOMP ERROR!");
            console.error("Broker reported error: " + frame.headers["message"]);
            console.error("Additional details: " + frame.body);
            console.error("Full frame:", frame);
        };

        client.onDisconnect = () => {
            console.log("⚠️ Disconnected from WebSocket");
            setIsConnected(false);
        };

        client.onWebSocketError = (event) => {
            console.error("❌❌❌ WebSocket ERROR!");
            console.error("Event:", event);
        };

        console.log("🚀 Activating STOMP client...");
        client.activate();
        setStompClient(client);

        return () => {
            console.log("🔌 Cleaning up WebSocket connection...");
            if (client) {
                client.deactivate();
            }
        };
    }, [token, user]);

    // Fetch initial notifications
    useEffect(() => {
        if (!token || !user) return;

        // Fetch via API
        // Need to use axios or fetch. Since I don't have api client here, I'll use fetch for now or import userApi if available. 
        // Actually, let's just use fetch for simplicity to avoid circular deps if any.
        // Better: use the existing axios instance if possible, but let's stick to fetch to be safe and quick.
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/notifications/user/${user.id}?page=0&size=20`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data.content || []);
                    // Calculate unread count from backend or just local
                    // Assuming backend returns isRead
                    const unread = (data.content || []).filter((n: any) => !n.isRead).length;
                    setUnreadCount(unread);
                } else if (response.status === 500) {
                    console.error("Server error fetching notifications. Status:", response.status);
                }
            } catch (e) {
                console.error("Failed to fetch notifications history", e);
            }
        };
        fetchNotifications();

    }, [token, user]);

    const markAsRead = async (id: number) => {
        try {
            await fetch(`http://localhost:8080/api/notifications/${id}/read`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setNotifications((prev) =>
                prev.map((n) => (n.notiId === id ? { ...n, isRead: true } : n))
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (e) {
            console.error("Failed to mark as read", e);
        }
    };

    const markAllAsRead = async () => {
        try {
            if (!user) return;
            await fetch(`http://localhost:8080/api/notifications/user/${user.id}/read-all`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setNotifications((prev) => prev.map(n => ({ ...n, isRead: true })));
            setUnreadCount(0);
        } catch (e) {
            console.error("Failed to mark all as read", e);
        }
    }

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                markAsRead,
                markAllAsRead,
                stompClient,
                isConnected,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error("useNotificationContext must be used inside NotificationProvider");
    return ctx;
};
