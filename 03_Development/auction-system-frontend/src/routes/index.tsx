import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

// Main pages
import HomePage from "@/modules/home/pages/HomePage";
import HelpPage from "@/modules/help/pages/HelpPage";
import HelpDetailPage from "@/modules/help/pages/HelpDetailPage";
import HowToBuyPage from "@/modules/help/pages/HowToBuyPage";

// Auth pages
import VerifyInfoPage from "@/modules/auth/pages/VerifyInfoPage";
import LoginPage from "@/modules/auth/pages/LoginPage";
import RegisterPage from "@/modules/auth/pages/RegisterPage";

// User area
import ProfileLayout from "@/modules/user/layouts/ProfileLayout";
import ProfilePage from "@/modules/user/pages/ProfilePage";
import PaymentPage from "@/modules/user/pages/PaymentPage";
import ResetPasswordPage from "@/modules/user/pages/ResetPasswordPage";
import NotificationPage from "@/modules/user/pages/NotificationPage";
import HistoryBidPage from "@/modules/user/pages/HistoryBidPage";
import AuctionCurrentPage from "@/modules/user/pages/AuctionCurrentPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminUsersPage from "../modules/admin/pages/AdminUsersPage";
import AdminDashboardPage from "../modules/admin/pages/AdminDashboardPage.tsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* MAIN LAYOUT – BỌC TẤT CẢ PUBLIC + USER */}
        <Route element={<MainLayout />}>

          {/* PUBLIC PAGES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/help/:id" element={<HelpDetailPage />} />
          <Route path="/how-to-buy" element={<HowToBuyPage />} />

        </Route>
        {/* USER AREA (có ProtectedRoute + ProfileLayout) */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminLayout/>
                      </ProtectedRoute>
                    }
                  >
                    {/* User management */}
                    <Route path="users" element={<AdminUsersPage />} />
                    <Route path="Dashboard" element={<AdminDashboardPage/>} />
                  </Route>

                  {/* User */}
                  <Route
                    path="/user"
                    element={
                      <ProtectedRoute>
                        <ProfileLayout />
                      </ProtectedRoute>
                    }
                  >

                    {/* Account */}
                    <Route path="account/profile" element={<ProfilePage />} />
                    <Route path="account/payment" element={<PaymentPage />} />
                    <Route path="account/reset-password" element={<ResetPasswordPage />} />

                    {/* Notification */}
                    <Route path="notification/:category" element={<NotificationPage />} />

                    {/* Auction */}
                    <Route path="bid/history-bid" element={<HistoryBidPage />} />
                    <Route
                      path="bid/auction-current-joined"
                      element={<AuctionCurrentPage />}
                    />
                  </Route>

        {/* AUTH LAYOUT – KHÔNG DÙNG MAINLAYOUT */}
        <Route element={<AuthLayout />}>
          <Route path="/verify-info" element={<VerifyInfoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
