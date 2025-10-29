import styles from "./layout.module.css";
import logo from "@/assets/logo.png";
import { Bell, User } from "lucide-react";

export default function Header() {
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
            <a href="#">Đấu giá ▾</a>
            <button><Bell size={18} /></button>
            <button><User size={18} /></button>
            <button className={styles.loginBtn}>Đăng nhập</button>
            <button className={styles.registerBtn}>Đăng ký</button>
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
