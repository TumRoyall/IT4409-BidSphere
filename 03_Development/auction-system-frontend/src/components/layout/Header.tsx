import styles from "./layout.module.css";
import logo from "@/assets/logo.png";
import { Bell, User } from "lucide-react";

export default function Header() {
  return (
    <header>
      {/* Thanh trên cùng */}
      <div className={styles.topBar}>
        <div className={styles.topBarLinks}>
          <a href="#">Trợ giúp</a>
          <a href="#">Hướng dẫn mua</a>
          <a href="#">Các câu hỏi thường gặp</a>
          <a href="#">💬 Trò chuyện trực tuyến</a>
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
            <a href="#">Tìm phiên đấu giá ▾</a>
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
            "Nhà & Vườn", "Trang sức & Đồng hồ", "Tiêu dùng",
            "Đồ chơi & Trò chơi", "Thể hình", "Bán lẻ", "Công nghiệp"
          ].map(cat => <a key={cat} href="#">{cat}</a>)}
        </div>
      </div>

      {/* Giới thiệu */}
      <div className={styles.intro}>
        <h2>1xBid - Nền tảng đấu giá trực tuyến hàng đầu Việt Nam</h2>
        <p>
          Tham gia đấu giá và sở hữu sản phẩm chất lượng với giá tốt nhất.<br />
          <strong>Nạp rút trong vòng 1 phút, giao dịch tiền tỷ chỉ 3 phút!</strong>
        </p>
      </div>

      {/* Đấu giá nổi bật */}
      <div className={styles.hotAuctions}>
        <h3>🔥 Phiên đấu giá nổi bật</h3>
        <div className={styles.auctionList}>
          {[
            { id: 1, title: "iPhone 15 Pro Max", currentBid: "18,500,000₫" },
            { id: 2, title: "Xe máy Honda SH 2022", currentBid: "75,000,000₫" },
            { id: 3, title: "Rolex Submariner", currentBid: "350,000,000₫" },
          ].map(item => (
            <div key={item.id} className={styles.auctionCard}>
              <p className={styles.auctionTitle}>{item.title}</p>
              <span className={styles.auctionPrice}>Giá hiện tại: {item.currentBid}</span>
              <button className={styles.bidBtn}>Tham gia</button>
            </div>
          ))}
        </div>
      </div>

      {/* Người dùng top */}
      <div className={styles.topUsers}>
        <h3>🏆 Người dùng nổi bật</h3>
        <ul>
          <li>Nguyễn Văn A - 120 phiên thắng</li>
          <li>Trần Thị B - 98 phiên thắng</li>
          <li>Lê Văn C - 85 phiên thắng</li>
        </ul>
      </div>
    </header>
  );
}
