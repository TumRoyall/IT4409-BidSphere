import { Outlet } from "react-router-dom";
import "@/styles/auth.css";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      {/* Background image */}
      <div className="auth-bg"></div>
      <div className="auth-overlay"></div>

      {/* Logo */}
      <div className="auth-header">
        <h1 className="auth-title">1xBid.com</h1>
        <p className="auth-subtitle">Nền tảng đấu giá trực tuyến thông minh</p>
      </div>

      {/* Form container */}
      <div className="auth-card">
        <Outlet />
      </div>

      <footer className="auth-footer">
        © 2025 1xBid.com. All rights reserved.
      </footer>
    </div>
  );
}
