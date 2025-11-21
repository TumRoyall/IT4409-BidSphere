import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { Bell } from "lucide-react";
import styles from "./layout.module.css";
import logo from "@/assets/logo.png";
import { useAuth } from "@/hooks/useAuth";
import NotificationDropdown from "./NotificationDropdown";
import { getAvatarUrl } from "@/utils/avatar";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showAdminMenu, setShowAdminMenu] = useState(false);

  const handleNavigate = (path: string) => {
    navigate(path);
    setShowMenu(false);
    setShowAdminMenu(false);
  };

  // Check if user is admin or moderator
  const rawRole = (user as any)?.role || (user as any)?.roles || (user as any)?.roleName || "";
  const role = String(rawRole).toUpperCase();
  const isAdminOrModerator = role === "ADMIN" || role === "MODERATOR";

  return (
    <header>
      {/* ===== Thanh trên cùng ===== */}
      <div className={styles.topBar}>
        <div className={styles.topBarLinks}>
          <Link to="/help">Trợ giúp</Link>
          <Link to="/how-to-buy">Hướng dẫn mua</Link>
          <Link to="/seller">Kênh người bán</Link>
          {isAdminOrModerator && (
            <div style={{ position: "relative", display: "inline-block" }}>
              <button
                onClick={() => setShowAdminMenu((prev) => !prev)}
                style={{
                  background: "none",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                  fontSize: "inherit",
                  textDecoration: "none",
                }}
              >
                👨‍💼 Kênh admin ▾
              </button>
              {showAdminMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    background: "white",
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    zIndex: 1000,
                    minWidth: "200px",
                    marginTop: "4px",
                  }}
                >
                  <button
                    onClick={() => handleNavigate("/admin/products/approval")}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "12px 16px",
                      border: "none",
                      background: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#333",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >
                    📦 Duyệt sản phẩm
                  </button>
                  <button
                    onClick={() => handleNavigate("/admin/auctions/approval")}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "12px 16px",
                      border: "none",
                      background: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#333",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >
                    🔨 Duyệt phiên đấu giá
                  </button>
                </div>
              )}
            </div>
          )}
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

            {/* ==== Nếu đã đăng nhập ==== */}
            {user ? (
              <div className={styles.userMenuWrapper}>
                <button
                  onClick={() => setShowMenu((prev) => !prev)}
                  className={styles.userButton}
                >
                  <img
                    src={getAvatarUrl((user as any)?.avatarUrl || (user as any)?.avatar_url || "", (user as any)?.gender)}
                    alt="Avatar"
                    className={styles.avatar}
                  />
                  <span className={styles.username}>{user.username}</span>
                </button>

                {showMenu && (
                  <div className={styles.dropdownMenu}>
                    <div className={styles.dropdownGroup}>
                      <p className={styles.menuLabel}>👤 Tài khoản của tôi</p>
                      <button
                        onClick={() => handleNavigate("/user/account/profile")}
                      >
                        Hồ sơ cá nhân
                      </button>
                      <button
                        onClick={() => handleNavigate("/user/account/payment")}
                      >
                        Ví của tôi
                      </button>
                      <button
                        onClick={() =>
                          handleNavigate("/user/account/reset-password")
                        }
                      >
                        Đổi mật khẩu
                      </button>
                    </div>

                    <div className={styles.dropdownGroup}>
                      <p className={styles.menuLabel}>⚡ Phiên đấu giá</p>
                      <button
                        onClick={() =>
                          handleNavigate("/user/bid/history-bid")
                        }
                      >
                        Lịch sử đấu giá
                      </button>
                      <button
                        onClick={() =>
                          handleNavigate("/user/bid/auction-current-joined")
                        }
                      >
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
              // ==== Nếu chưa đăng nhập ====
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
