import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Wallet,
  Lock,
  Clock,
  Gavel,
  LogOut,
  MessageCircle,
  Search,
  ChevronDown,
  Receipt,
  Activity
} from "lucide-react";

import styles from "@/components/styles/layout.module.css";
import logo from "@/assets/logo.png";
import { useAuth } from "@/hooks/useAuth";
import NotificationDropdown from "./NotificationDropdown";
import { getAvatarUrl } from "@/utils/avatar";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setShowMenu(false);
  };

  // Check if user is admin or moderator
  const rawRole = (user as any)?.role || (user as any)?.roles || (user as any)?.roleName || "";
  const role = String(rawRole).toUpperCase();
  const isAdminOrModerator = role === "ADMIN" || role === "MODERATOR";

  const CATEGORY_MAP: Record<string, string> = {
    "Xe cộ": "vehicle",
    "Thời trang": "fashion",
    "Điện tử": "electronics",
    "Nhà cửa": "home",
    "Nhà & Vườn": "garden",
    "Trang sức": "jewelry",
    "Tiêu dùng": "grocery",
    "Khác": "other"
  };


  return (
    <header>
      {/* ===== Thanh trên cùng ===== */}
      <div className={styles.topBar}>
        <div className={styles.topBarLinks}>
          <Link to="/help">Trợ giúp</Link>
          <Link to="/how-to-buy">Hướng dẫn mua</Link>
          <Link to="/seller/dashboard">Kênh người bán</Link>
          <a href="#">
            Trò chuyện
          </a>

        </div>
      </div>

      {/* ===== Thanh chính ===== */}
      <div className={styles.mainBar}>
        <div className={styles.mainInner}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="1xBid" />
            <span>1xBid.com</span>
          </Link>

          {/* Ô tìm kiếm */}
            <div className={styles.search}>
              <input type="text" placeholder="Tìm kiếm sản phẩm đấu giá..." />
              <button>
                <Search size={18} />
              </button>
            </div>

          {/* Actions bên phải */}
          <div className={styles.actions}>
            <Link to="/auctions">Đấu giá ▾</Link>
            <NotificationDropdown />

            {/* =================== */}
            {/* 🔥 NẾU CÓ USER     */}
            {/* =================== */}
            {user ? (
              <div className={styles.userMenuWrapper}>
                <button
                  onClick={() => setShowMenu((prev) => !prev)}
                  className={styles.userButton}
                >
                  <img
                    src={getAvatarUrl(user.avatarUrl, user.gender)}
                    alt="Avatar"
                    className={styles.avatar}
                  />
                  <span className={styles.username}>{user.username}</span>
                </button>

                {showMenu && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownGroup}>
                      <p className={`${styles.menuLabel} ${styles.sectionAccount}`}>
                        <User size={16} />
                        Tài khoản của tôi
                      </p>

                      <button onClick={() => handleNavigate("/user/account/profile")}>
                        <User size={16} /> Hồ sơ cá nhân
                      </button>
                      <button onClick={() => handleNavigate("/user/account/payment")}>
                        <Wallet size={16} /> Ví của tôi
                      </button>
                      <button onClick={() => handleNavigate("/user/account/reset-password")}>
                        <Lock size={16} /> Đổi mật khẩu
                      </button>
                    </div>
                    <div className={styles.dropdownGroup}>
                      <p className={`${styles.menuLabel} ${styles.sectionAuction}`}>
                        <Gavel size={16} />
                        Phiên đấu giá
                      </p>
                      <button onClick={() => handleNavigate("/user/bid/won-products")}>
                        <Receipt size={16} /> Đơn đấu giá
                      </button>
                      <button onClick={() => handleNavigate("/user/bid/history")}>
                        <Clock size={16} /> Lịch sử đấu giá
                      </button>
                      <button onClick={() => handleNavigate("/user/bid/auction-current-joined")}>
                        <Activity size={16} /> Phiên đang tham gia
                      </button>

                    </div>

                    <hr />

                    <button
                      onClick={() => {
                        logout();
                        setShowMenu(false);
                      }}
                      className={styles.logoutBtn}
                    >
                      <LogOut size={16} /> Đăng xuất
                    </button>

                  </div>
                )}
              </div>
            ) : (
              /* ======================= */
              /* 🔥 NẾU KHÔNG CÓ USER   */
              /* ======================= */
              <div className={styles.authButtons}>
                <button
                  onClick={() => navigate("/login")}
                  className={styles.loginBtn}
                >
                  Đăng nhập
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className={styles.registerBtn}
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== Thanh danh mục ===== */}
      <div className={styles.categoryBar}>
        <div className={styles.categoryList}>
          {Object.entries(CATEGORY_MAP).map(([label, value]) => (
            <Link
              key={value}
              to={`/auctions?category=${value}&sort=startTime,desc&page=1`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
