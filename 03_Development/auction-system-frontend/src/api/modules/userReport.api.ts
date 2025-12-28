import axiosClient from "../axiosClient";

export type UserReport = {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
};

export type CreateUserReportRequest = {
  userId: number;
  content: string;
};

export const userReportApi = {
  create: (data: CreateUserReportRequest) => axiosClient.post<UserReport>("/user-reports", data),
  getByUser: (userId: number) => axiosClient.get<UserReport[]>(`/user-reports/user/${userId}`),
  getAll: () => axiosClient.get<UserReport[]>("/user-reports"),
};
