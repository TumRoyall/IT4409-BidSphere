import { Outlet } from "react-router-dom";
import "@/styles/auth.css";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      {/* Background */}
      <div className="auth-bg" />
      <div className="auth-overlay" />

      <div className="auth-wrapper">

        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">1xBid</h1>
          <p className="auth-subtitle">Đăng nhập và tham gia đấu giá ngay</p>
        </div>

        {/* Content (Login / Register / Verify) */}
        <div className="auth-card">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="auth-footer">
          © 2025 1xBid. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
