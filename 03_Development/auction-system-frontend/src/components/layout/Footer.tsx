import styles from "@/components/styles/layout.module.css";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className={`${styles.footer} snow-cap`}>
      <div className={styles.footerContent}>
        {/* Cột 1: Logo + mô tả */}
        <div>
          <div className={styles.footerLogo}>
            <img src={logo} alt="1xBid" />
            <span>1xBid.com</span>
          </div>
          <p className={styles.footerText}>
            <strong>1xBid - nền tảng đấu giá trực tuyến hàng đầu Việt Nam.</strong><br />
            Tham gia đấu giá và sở hữu sản phẩm chất lượng với giá tốt nhất.<br />
            <em>Nạp rút trong vòng 1 phút, tiền tỷ là 3 phút.</em>
          </p>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h4 className={styles.footerTitle}>Liên kết nhanh</h4>
          <ul className={styles.footerLinks}>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/auctions">Đấu giá</a></li>
            <li><a href="/products">Sản phẩm</a></li>
            <li><a href="/feedbacks">Feedback</a></li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div>
          <h4 className={styles.footerTitle}>Liên hệ</h4>
          <div className={styles.footerContact}>
            <p>📧 Email: <span>support@1xbid.com</span></p>
            <p>☎ Hotline: <span>0666-888-686</span></p>
            <p>📍 Địa chỉ: Hà Nội, Việt Nam</p>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className={styles.footerBottom}>
        © {new Date().getFullYear()} <span>1xBid.com</span>. All rights reserved.
      </div>
    </footer>
  );
}
