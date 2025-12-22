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
import AuctionsPage from "@/modules/auction/pages/AuctionsPage";
import AuctionDetailPage from "@/modules/auction/pages/AuctionDetailPage";
import AuctionList from "@/modules/auction/pages/AuctionList";
import CreateAuction from "@/modules/auction/pages/CreateAuction";
import AdminProductApprovalPage from "@/modules/admin/pages/ProductApprovalPage";
import AdminAuctionApprovalPage from "@/modules/admin/pages/AuctionApprovalPage";
import CreateProduct from "@/modules/product/pages/CreateProduct";
import ProductList from "@/modules/product/pages/ProductList";
import ProductDetail from "@/modules/product/pages/ProductDetail";
import ProductManagement from "@/modules/seller/pages/ProductManagement";

// Admin area
import AdminLayout from "../layouts/AdminLayout";
import AdminUsersPage from "../modules/admin/pages/AdminUsersPage";
import AdminDashboardPage from "../modules/admin/pages/AdminDashboardPage.tsx";
import AdminReportsPage from "../modules/admin/pages/AdminReportsPage";
import AdminUserWarningPage from "../modules/admin/pages/AdminUserWarningPage.tsx";
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

          {/* PRODUCTS */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* AUCTIONS */}
          <Route path="/auctions" element={<AuctionsPage />} />
          <Route
            path="/auctions/:id"
            element={
              <ProtectedRoute>
                <AuctionDetailPage />
              </ProtectedRoute>
            }
          />
        </Route>

         {/* SELLER AREA – protected under MainLayout */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProductManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/create" element={<CreateProduct />} />
          <Route path="products/:id/edit" element={<CreateProduct />} />
          <Route path="auctions" element={<AuctionList />} />
          <Route path="auctions/create" element={<CreateAuction />} />
        </Route>

        {/* USER AREA (có ProtectedRoute + ProfileLayout) */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <ProfileLayout />
            </ProtectedRoute>
          }
        >
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

        {/* ================= SUPER ADMIN ================= */}
        <Route
          path="/superadmin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="user-reports" element={<AdminReportsPage />} />
          <Route path="user-warnings" element={<AdminUserWarningPage />} />
        </Route>

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="products/approval" element={<AdminProductApprovalPage />} />
          <Route path="auctions/approval" element={<AdminAuctionApprovalPage />} />
        </Route>

        {/* ================= MODERATOR ================= */}
        <Route
          path="/moderator"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="products/approval" element={<AdminProductApprovalPage />} />
          <Route path="auctions/approval" element={<AdminAuctionApprovalPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
