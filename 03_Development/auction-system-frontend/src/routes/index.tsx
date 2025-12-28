import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import { ROLES } from "@/constants/roles";

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

// Auction pages (from HEAD - seller_profile branch)
import AuctionsPage from "@/modules/auction/pages/AuctionsPage";
import AuctionDetailPage from "@/modules/auction/pages/AuctionDetailPage";

// Seller pages (from HEAD - seller_profile branch)
import ProductManagement from "@/modules/seller/pages/ProductManagement";
import SellerLayout from "@/modules/seller/layouts/SellerLayout";
import SellerProfile from "@/modules/seller/pages/SellerProfile";
import SellerAuctionManagement from "@/modules/seller/pages/SellerAuctionManagement";
import SellerOrders from "@/modules/seller/pages/SellerOrders";
import CreateProduct from "@/modules/product/pages/CreateProduct";
import CreateAuction from "@/modules/auction/pages/CreateAuction";
import ProductList from "@/modules/product/pages/ProductList";
import ProductDetail from "@/modules/product/pages/ProductDetail";

// Admin pages (from HEAD - seller_profile branch)
import AdminProductApprovalPage from "@/modules/admin/pages/ProductApprovalPage";

// Payment & Orders pages (from main branch)
import DepositPage from "@/modules/payment/pages/DepositPage";
import MyAuctionOrdersPage from "@/modules/auction/pages/MyAuctionOrdersPage";
import OrderDetail from "@/modules/auction/pages/OrderDetail";

// SUperadmin area
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

          {/* PUBLIC SELLER PROFILE - view other seller's profile */}
          <Route path="/seller/profile/:sellerId" element={<SellerProfile />} />
        </Route>

        {/* SELLER AREA – protected with SellerLayout (sidebar) */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute>
              <SellerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProductManagement />} />
          <Route path="dashboard" element={<ProductManagement />} />
          <Route path="profile" element={<SellerProfile />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/create" element={<CreateProduct />} />
          <Route path="products/:id/edit" element={<CreateProduct />} />
          <Route path="auctions" element={<SellerAuctionManagement />} />
          <Route path="auctions/create" element={<CreateAuction />} />
          <Route path="orders" element={<SellerOrders />} />
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
          {/* Account */}
          <Route path="account/profile" element={<ProfilePage />} />
          <Route path="account/payment" element={<PaymentPage />} />
          <Route path="account/payment/deposit" element={<DepositPage />} />
          <Route path="account/reset-password" element={<ResetPasswordPage />} />

          {/* Notification */}
          <Route path="notification/:category" element={<NotificationPage />} />


          {/* Auction */}
          <Route path="bid/history" element={<HistoryBidPage />} />
          <Route path="bid/auction-current-joined" element={<AuctionCurrentPage />} />
          <Route path="bid/won-products" element={<MyAuctionOrdersPage />} />
          <Route path="bid/won-products/order/:txnId" element={<OrderDetail />} />
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
            <RoleBasedRoute allowedRoles={[ROLES.ADMIN, ROLES.MODERATOR]}>
              <AdminLayout />
            </RoleBasedRoute>
          }
        >
          <Route path="users" element={
            <RoleBasedRoute allowedRoles={[ROLES.ADMIN]} redirectTo="/superadmin/dashboard">
              <AdminUsersPage />
            </RoleBasedRoute>
          } />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="user-reports" element={
            <RoleBasedRoute allowedRoles={[ROLES.ADMIN]} redirectTo="/superadmin/dashboard">
              <AdminReportsPage />
            </RoleBasedRoute>
          } />
          <Route path="user-warnings" element={
            <RoleBasedRoute allowedRoles={[ROLES.ADMIN]} redirectTo="/superadmin/dashboard">
              <AdminUserWarningPage />
            </RoleBasedRoute>
          } />
          <Route path="auction/approval" element={<AdminProductApprovalPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}