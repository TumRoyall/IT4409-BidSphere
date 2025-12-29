import axiosClient from "../axiosClient";

const notificationApi = {
  getNotifications: (
    type?: string,
    status?: string,
    page: number = 0,
    size: number = 20
  ) => {
    return axiosClient.get("/api/notifications", {
      params: {
        ...(type && { type }),
        ...(status && { status }),
        page,
        size,
      },
    });
  },

  markAsRead: (notificationId: string) => {
    return axiosClient.put(`/api/notifications/${notificationId}/read`);
  },

  markAllAsRead: () => {
    return axiosClient.put("/api/notifications/read-all");
  },

  deleteNotification: (notificationId: string) => {
    return axiosClient.delete(`/api/notifications/${notificationId}`);
  },

  getUnreadCount: () => {
    return axiosClient.get("/api/notifications/unread-count");
  },
};

export default notificationApi;
