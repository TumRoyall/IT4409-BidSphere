import SockJS from "sockjs-client";
// @ts-ignore - stompjs doesn't have type definitions
import * as Stomp from "stompjs";
import type { NotificationItem } from "@/types/notification";

export interface NotificationMessage {
  status: string;
  message: string;
  notiId?: number;
  timestamp: number;
  notification?: NotificationItem;
}

class WebSocketService {
  private stompClient: Stomp.Client | null = null;
  private connected = false;
  private userId: string | null = null;
  private token: string | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private messageHandlers: Map<string, (message: NotificationMessage) => void> =
    new Map();

  /**
   * Initialize WebSocket connection
   */
  connect(userId: string, token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.connected && this.stompClient?.connected) {
        console.log("WebSocket already connected");
        resolve();
        return;
      }

      this.userId = userId;
      this.token = token;

      try {
        // Get API base URL and convert to WebSocket URL
        const apiBaseUrl =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
        const baseUrl = apiBaseUrl.replace("/api", "");
        const wsUrl = `${baseUrl}/ws/notifications`;

        console.log("🔌 Connecting to WebSocket:", wsUrl);
        console.log("📋 User ID:", userId);
        
        const socket = new SockJS(wsUrl, null, {
          // SockJS options
          transports: ["websocket", "xhr-streaming", "xhr-polling"],
        });

        this.stompClient = Stomp.over(socket);

        // Disable default logging for debug messages
        this.stompClient.debug = null;

        // STOMP connect options - headers for CONNECT frame
        // Note: These become native headers in the STOMP CONNECT frame
        const connectHeaders: any = {
          "X-Auth-Token": token,
          "Authorization": `Bearer ${token}`,
        };

        // Set a connection timeout
        const connectionTimeout = setTimeout(() => {
          reject(new Error("WebSocket connection timeout"));
        }, 10000);

        this.stompClient.connect(
          connectHeaders,
          () => {
            clearTimeout(connectionTimeout);
            this.connected = true;
            this.reconnectAttempts = 0;
            console.log("✓ WebSocket STOMP connected for user:", userId);
            console.log("🔌 WebSocket state:", {
              connected: this.connected,
              stompConnected: this.stompClient?.connected,
            });

            // Subscribe to user-specific notification queue
            this.subscribeToDestination(
              `/user/${userId}/queue/notifications`,
              (message) => {
                this.handleNotificationMessage(message);
              }
            );

            resolve();
          },
          (error: any) => {
            clearTimeout(connectionTimeout);
            this.connected = false;
            console.error("❌ WebSocket connection error:", error);
            console.error("Error details:", {
              message: error?.message,
              code: error?.code,
              body: error?.body,
            });
            this.attemptReconnect();
            reject(error);
          }
        );
      } catch (error: unknown) {
        this.connected = false;
        console.error("Failed to initialize WebSocket:", error);
        reject(error);
      }
    });
  }

  /**
   * Subscribe to a destination and register callback
   */
  private subscribeToDestination(
    destination: string,
    callback: (message: NotificationMessage) => void
  ): void {
    if (!this.stompClient?.connected) {
      console.warn("WebSocket not connected, cannot subscribe to", destination);
      return;
    }

    this.stompClient.subscribe(destination, (frame: any) => {
      try {
        const message = JSON.parse(frame.body) as NotificationMessage;
        callback(message);
      } catch (error: unknown) {
        console.error("Error parsing WebSocket message:", error);
      }
    });

    console.log("Subscribed to:", destination);
  }

  /**
   * Subscribe to notification updates
   */
  onNotification(handler: (notification: NotificationItem) => void): void {
    this.messageHandlers.set("notification", (message) => {
      if (message.notification) {
        handler(message.notification);
      }
    });
  }

  /**
   * Subscribe to mark as read confirmations
   */
  onMarkAsRead(handler: (notiId: number) => void): void {
    this.messageHandlers.set("markAsRead", (message) => {
      if (message.notiId) {
        handler(message.notiId);
      }
    });
  }

  /**
   * Handle incoming notification messages
   */
  private handleNotificationMessage(message: NotificationMessage): void {
    console.log("📬 Notification message received:", message);

    if (message.status === "notification" && message.notification) {
      const handler = this.messageHandlers.get("notification");
      if (handler) handler(message);
    } else if (message.status === "success" && message.notiId) {
      const handler = this.messageHandlers.get("markAsRead");
      if (handler) handler(message);
    } else if (message.status === "error") {
      console.error("Server error:", message.message);
    }
  }

  /**
   * Send subscribe request to server
   */
  sendSubscribeRequest(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Retry logic with exponential backoff
      const maxRetries = 5;
      let retries = 0;

      const attemptSend = () => {
        if (!this.stompClient?.connected) {
          retries++;
          if (retries >= maxRetries) {
            console.error(
              `Failed to send subscribe request after ${maxRetries} retries`
            );
            reject(new Error("WebSocket not connected after retries"));
            return;
          }

          console.log(`Retry ${retries}/${maxRetries}: Waiting for WebSocket...`);
          setTimeout(attemptSend, 500 * retries); // exponential backoff
          return;
        }

        try {
          console.log("📤 Sending subscribe request");
          this.stompClient.send("/app/subscribe", {}, JSON.stringify({}));
          resolve();
        } catch (error: unknown) {
          console.error("Error sending subscribe request:", error);
          reject(error);
        }
      };

      // Start the attempt
      attemptSend();
    });
  }

  /**
   * Mark notification as read via WebSocket
   */
  markAsRead(notiId: number): void {
    if (!this.stompClient?.connected) {
      console.warn("WebSocket not connected, cannot mark as read");
      return;
    }

    this.stompClient.send(
      `/app/read/${notiId}`,
      {
        userId: this.userId ?? "",
        notiId: notiId.toString(),
      },
      JSON.stringify({})
    );
  }

  /**
   * Mark all notifications as read via WebSocket
   */
  markAllAsRead(): void {
    if (!this.stompClient?.connected) {
      console.warn("WebSocket not connected, cannot mark all as read");
      return;
    }

    this.stompClient.send(
      "/app/read-all",
      {
        userId: this.userId ?? "",
      },
      JSON.stringify({})
    );
  }

  /**
   * Disconnect WebSocket
   */
  disconnect(): void {
    if (this.stompClient?.connected) {
      this.stompClient.disconnect(() => {
        this.connected = false;
        this.userId = null;
        this.token = null;
        console.log("WebSocket disconnected");
      });
    }
  }

  /**
   * Attempt to reconnect with exponential backoff
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnection attempts reached");
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    console.log(
      `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`
    );

    setTimeout(() => {
      if (this.userId && this.token) {
        this.connect(this.userId, this.token).catch((error: unknown) => {
          console.error("Reconnection failed:", error);
        });
      }
    }, delay);
  }

  /**
   * Check if WebSocket is connected
   */
  isConnected(): boolean {
    return this.connected && this.stompClient?.connected === true;
  }
}

// Export singleton instance
export const wsService = new WebSocketService();
