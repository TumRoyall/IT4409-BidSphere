// src/routes/index.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";

// ==========================================
// 🏠 HOME & GENERAL PAGES
// ==========================================
import HomePage from "@/modules/home/pages/HomePage";
import HelpPage from "@/modules/help/pages/HelpPage";
import HelpDetailPage from "@/modules/help/pages/HelpDetailPage";
import HowToBuyPage from "@/modules/help/pages/HowToBuyPage";
import DebugLogin from "@/pages/DebugLogin";

// ==========================================
// 🔐 AUTH PAGES
// ==========================================
import VerifyInfoPage from "@/modules/auth/pages/VerifyInfoPage";
import LoginPage from "@/modules/auth/pages/LoginPage";
import RegisterPage from "@/modules/auth/pages/RegisterPage";

// ==========================================
// 👨‍💼 SELLER PAGES
// ==========================================
import ProductManagement from "@/modules/seller/pages/ProductManagement";

// ==========================================
// 👤 USER PAGES
// ==========================================
import Profile from "@/modules/user/pages/Profile";
import Balance from "@/modules/user/pages/Balance";

// ==========================================
// 📦 PRODUCT PAGES
// ==========================================
import ProductList from "@/modules/product/pages/ProductList";
import ProductDetail from "@/modules/product/pages/ProductDetail";
import CreateProduct from "@/modules/product/pages/CreateProduct";

// ==========================================
// ⚡ AUCTION PAGES
// ==========================================
import AuctionList from "@/modules/auction/pages/AuctionList";
import AuctionDetail from "@/modules/auction/pages/AuctionDetail";
import CreateAuction from "@/modules/auction/pages/CreateAuction";

// ==========================================
// 💳 PAYMENT PAGES
// ==========================================
import DepositPage from "@/modules/payment/pages/DepositPage";
import PaymentHistory from "@/modules/payment/pages/PaymentHistory";

// ==========================================
// ⭐ FEEDBACK PAGES
// ==========================================
import FeedbackList from "@/modules/feedback/pages/FeedbackList";
import CreateFeedback from "@/modules/feedback/pages/CreateFeedback";
import NotificationList from "@/modules/feedback/pages/NotificationList";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==========================================
            📄 MAIN LAYOUT ROUTES
            ========================================== */}
        <Route element={<MainLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/debug-login" element={<DebugLogin />} />

          {/* Help & Support */}
          <Route path="/help" element={<HelpPage />} />
          <Route path="/help/:id" element={<HelpDetailPage />} />
          <Route path="/how-to-buy" element={<HowToBuyPage />} />

          {/* Products - Public */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Auctions - Public */}
          <Route path="/auctions" element={<AuctionList />} />
          <Route path="/auctions/:id" element={<AuctionDetail />} />

          {/* Feedbacks - Public */}
          <Route path="/feedbacks" element={<FeedbackList />} />

          {/* ==========================================
          🔒 PROTECTED ROUTES (Login Required)
          ========================================== */}
          <Route element={<ProtectedRoute />}>
          {/* User Profile & Balance */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/balance" element={<Balance />} />

          {/* User Transactions */}
          <Route path="/deposit" element={<DepositPage />} />
          <Route path="/payment-history" element={<PaymentHistory />} />

          {/* User Auctions */}
          <Route path="/my-auctions" element={<AuctionList />} />

          {/* Notifications */}
          <Route path="/notifications" element={<NotificationList />} />

          {/* Feedback */}
          <Route path="/feedbacks/create" element={<CreateFeedback />} />

          {/* ==========================================
          👨‍💼 SELLER ROUTES (Seller-specific functionality)
          ========================================== */}
          <Route path="/seller">
          <Route index element={<ProductManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/create" element={<CreateProduct />} />
            <Route path="products/:id/edit" element={<CreateProduct />} />
            <Route path="auctions" element={<AuctionList />} />
            <Route path="auctions/create" element={<CreateAuction />} />
          </Route>
          </Route>
         </Route>

          {/* ==========================================
          🔐 AUTH LAYOUT ROUTES
              ========================================== */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-info" element={<VerifyInfoPage />} />
        </Route>

        {/* ==========================================
            ❌ 404 NOT FOUND
            ========================================== */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Trang không tồn tại</p>
              <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Về trang chủ
              </a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}