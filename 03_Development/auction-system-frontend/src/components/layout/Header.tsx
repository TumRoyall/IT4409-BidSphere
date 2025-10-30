import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./layout.module.css";
import logo from "@/assets/logo.png";
import { Bell, User } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <header>
      {/* Thanh trên cùng */}
      <div className={styles.topBar}>
        <div className={styles.topBarLinks}>
          <a href="/help">Trợ giúp</a>
          <a href="/how-to-buy">Hướng dẫn mua</a>
          <a href="#">Câu hỏi thường gặp</a>
          <a href="#">💬 Trò chuyện</a>
        </div>
      </div>

      {/* Thanh chính */}
      <div className={styles.mainBar}>
        <div className={styles.mainInner}>
          <a href="/" className={styles.logo}>
            <img src={logo} alt="1xBid" />
            <span>1xBid.com</span>
          </a>

          <div className={styles.search}>
            <input type="text" placeholder="Tìm kiếm sản phẩm đấu giá..." />
            <button>🔍</button>
          </div>

          <div className={styles.actions}>
            <div ref={menuRef} style={{ position: 'relative', display: 'inline-block' }}>
              <button
                className={styles.linkBtn}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-haspopup="menu"
              >
                Đấu giá ▾
              </button>
              {open && (
                <div
                  role="menu"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    background: '#fff',
                    border: '1px solid #ddd',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                    padding: '4px 0',
                    zIndex: 1000,
                    minWidth: 200,
                  }}
                >
                  <Link
                    to="/auctions"
                    onClick={() => setOpen(false)}
                    style={{ display: 'block', padding: '8px 12px', textDecoration: 'none', color: 'inherit' }}
                  >
                    Xem tất cả phiên đấu giá
                  </Link>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      if (isLoggedIn) navigate("/auctions/create");
                      else navigate("/login");
                    }}
                    style={{ display: 'block', padding: '8px 12px', textDecoration: 'none', color: 'inherit' }}
                  >
                    Tạo phiên đấu giá
                  </a>
                </div>
              )}
            </div>

            <button><Bell size={18} /></button>
            <button><User size={18} /></button>
            <button className={styles.loginBtn} onClick={() => navigate('/login')}>Đăng nhập</button>
            <button className={styles.registerBtn} onClick={() => navigate('/register')}>Đăng ký</button>
          </div>
        </div>
      </div>

      {/* Thanh danh mục */}
      <div className={styles.categoryBar}>
        <div className={styles.categoryList}>
          {[
            "Xe cộ", "Thời trang", "Điện tử", "Đồ gia dụng",
            "Nhà & Vườn", "Trang sức", "Tiêu dùng"
          ].map(cat => <a key={cat} href="#">{cat}</a>)}
        </div>
      </div>
    </header>
  );
}
