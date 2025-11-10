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

import ProfileLayout from "@/modules/user/layouts/ProfileLayout";
import ProfilePage from "@/modules/user/pages/ProfilePage";
import WalletPage from "@/modules/user/pages/WalletPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/help/:id" element={<HelpDetailPage />} />
          <Route path="/how-to-buy" element={<HowToBuyPage />} />
          {/*Profile (cần token) */}
                          <Route
                            path="/profile"
                            element={
                              <ProtectedRoute>
                                <ProfileLayout />
                              </ProtectedRoute>
                            }
                          >
                            <Route index element={<ProfilePage />} />
                            <Route path="wallet" element={<WalletPage />} />
                          </Route>
        </Route>
        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/verify-info" element={<VerifyInfoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

