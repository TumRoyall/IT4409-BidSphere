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

export default function AppRoutes() {
  return (
    <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/help/:id" element={<HelpDetailPage />} />
              <Route path="/how-to-buy" element={<HowToBuyPage />} />
            </Route>

            <Route element={<AuthLayout />}>
              <Route path="/verify-info" element={<VerifyInfoPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
  );
}
