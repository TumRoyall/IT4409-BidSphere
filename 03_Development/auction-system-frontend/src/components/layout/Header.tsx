import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bell } from "lucide-react";
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

  return (
    <header>
      {/* ===== Thanh trên cùng ===== */}
      <div className={styles.topBar}>
        <div className={styles.topBarLinks}>
          <Link to="/help">Trợ giúp</Link>
          <Link to="/how-to-buy">Hướng dẫn mua</Link>
          <Link to="/seller/dashboard">Kênh người bán</Link>
          <a href="#">💬 Trò chuyện</a>
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
            <button>🔍</button>
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
                      <p className={styles.menuLabel}>👤 Tài khoản của tôi</p>
                      <button onClick={() => handleNavigate("/user/account/profile")}>
                        Hồ sơ cá nhân
                      </button>
                      <button onClick={() => handleNavigate("/user/account/payment")}>
                        Ví của tôi
                      </button>
                      <button onClick={() => handleNavigate("/user/account/reset-password")}>
                        Đổi mật khẩu
                      </button>
                    </div>

                    <div className={styles.dropdownGroup}>
                      <p className={styles.menuLabel}>⚡ Phiên đấu giá</p>
                      <button onClick={() => handleNavigate("/user/bid/history-bid")}>
                        Lịch sử đấu giá
                      </button>
                      <button onClick={() => handleNavigate("/user/bid/auction-current-joined")}>
                        Phiên đang tham gia
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
                      🚪 Đăng xuất
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
          {[
            "Xe cộ",
            "Thời trang",
            "Điện tử",
            "Đồ gia dụng",
            "Nhà & Vườn",
            "Trang sức",
            "Tiêu dùng",
          ].map((cat) => (
            <a key={cat} href="#">
              {cat}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
