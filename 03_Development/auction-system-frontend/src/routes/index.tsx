// src/routes/index.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";

// Trang chính
import HomePage from "@/modules/home/pages/HomePage";
import HelpPage from "@/modules/help/pages/HelpPage";
import HelpDetailPage from "@/modules/help/pages/HelpDetailPage";
import HowToBuyPage from "@/modules/help/pages/HowToBuyPage";

// Auth
import VerifyInfoPage from "@/modules/auth/pages/VerifyInfoPage"
import LoginPage from "@/modules/auth/pages/LoginPage";
import RegisterPage from "@/modules/auth/pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

// Admin
import ProductManagement from "@/modules/admin/pages/ProductManagement";
import OrderManagement from "@/modules/admin/pages/OrderManagement";
import UserManagement from "@/modules/admin/pages/UserManagement";
import Settings from "@/modules/admin/pages/Settings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
          <Routes>
            {/* Main routes với Header + Footer */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/help/:id" element={<HelpDetailPage />} />
              <Route path="/how-to-buy" element={<HowToBuyPage />} />
            </Route>

            {/* Auth routes không có Header + Footer */}
            <Route element={<AuthLayout />}>
              <Route path="/verify-info" element={<VerifyInfoPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Admin routes - Chỉ có AdminLayout (sidebar), không có Header + Footer */}
            <Route path="/admin/products" element={<ProductManagement />} />
            <Route path="/admin/orders" element={<OrderManagement />} />
            <Route path="/admin/customers" element={<UserManagement />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
  );
}