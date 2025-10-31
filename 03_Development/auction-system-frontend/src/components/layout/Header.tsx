import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bell } from "lucide-react";
import styles from "./layout.module.css";
import logo from "@/assets/logo.png";
import { useAuth } from "@/hooks/useAuth";
import NotificationDropdown from "./NotificationDropdown";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header>
      {/* ===== Thanh trên cùng ===== */}
      <div className={styles.topBar}>
        <div className={styles.topBarLinks}>
          <Link to="/help">Trợ giúp</Link>
          <Link to="/how-to-buy">Hướng dẫn mua</Link>
          <a href="#">Câu hỏi thường gặp</a>
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

          {/* Khu vực actions */}
          <div className={styles.actions}>
            <Link to="/auctions">Đấu giá ▾</Link>
            <NotificationDropdown />

            {/* Nếu đã đăng nhập */}
            {user ? (
              <div className={styles.userMenuWrapper}>
                <button
                  onClick={() => setShowMenu((prev) => !prev)}
                  className={styles.userButton}
                >
                  <img
                    src={user.avatar_url || "/default-avatar.png"}
                    alt="Avatar"
                    className={styles.avatar}
                  />
                  <span className={styles.username}>{user.username}</span>
                </button>

                {showMenu && (
                  <div className={styles.dropdownMenu}>
                    <button onClick={() => navigate("/profile")}>
                      Thông tin cá nhân
                    </button>
                    <button onClick={() => navigate("/balance")}>
                      Số dư tài khoản
                    </button>
                    <button onClick={() => navigate("/my-auctions")}>
                      Đấu giá của tôi
                    </button>
                    <hr />
                    <button onClick={logout} className={styles.logoutBtn}>
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Nếu chưa đăng nhập
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
