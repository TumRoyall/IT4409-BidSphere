import styles from "../help.module.css";

export default function HowToBuyPage() {
  return (
    <div className={styles.helpDetail}>
      <h1>🛒 Hướng dẫn mua hàng trên 1xBid</h1>
      <p>
        Chào mừng bạn đến với <strong>1xBid.com</strong> – nền tảng đấu giá trực tuyến hàng đầu Việt Nam.
        Dưới đây là hướng dẫn chi tiết để bạn dễ dàng tham gia và chiến thắng trong các phiên đấu giá.
      </p>

      <h2>I. Các hình thức đấu giá trên 1xBid</h2>
      <ul>
        <li><strong>Đấu giá trực tiếp (Live Auction):</strong> Người bán phát sóng video trực tiếp. Bạn có thể tham gia đặt giá theo thời gian thực.</li>
        <li><strong>Đấu giá theo thời gian (Timed Auction):</strong> Phiên đấu giá có thời gian bắt đầu và kết thúc cố định. Người có giá cao nhất khi hết giờ là người thắng.</li>
        <li><strong>Đấu giá kín (Tender Auction):</strong> Người tham gia đặt giá mà không biết giá của người khác, hệ thống tự chọn người trả cao nhất.</li>
      </ul>

      <h2>II. Các bước tham gia đấu giá</h2>
      <div className={styles.steps}>
        <div className={styles.step}>
          <h3>1️⃣ Tìm kiếm sản phẩm</h3>
          <p>Dùng thanh <strong>Tìm kiếm</strong> hoặc duyệt theo danh mục để chọn sản phẩm muốn đấu giá.</p>
        </div>
        <div className={styles.step}>
          <h3>2️⃣ Đăng ký & Đăng nhập</h3>
          <p>Đăng ký tài khoản hoặc đăng nhập để có thể đặt giá và theo dõi phiên đấu giá.</p>
        </div>
        <div className={styles.step}>
          <h3>3️⃣ Đặt giá</h3>
          <p>Nhập giá bạn muốn đặt, có thể sử dụng chức năng <em>“Đặt giá nhanh”</em> để tự động tăng giá theo bước nhảy.</p>
        </div>
        <div className={styles.step}>
          <h3>4️⃣ Thanh toán & Nhận hàng</h3>
          <p>Sau khi thắng đấu giá, bạn sẽ được liên hệ để thanh toán và nhận hàng trong thời gian sớm nhất.</p>
        </div>
      </div>

      <h2>III. Mẹo dành cho người mới</h2>
      <ul>
        <li>🔹 Theo dõi kỹ thời gian còn lại của phiên đấu giá.</li>
        <li>🔹 Ước lượng giá trị sản phẩm trước khi tham gia.</li>
        <li>🔹 Ưu tiên dùng tính năng “Đặt giá tự động” để không bỏ lỡ cơ hội.</li>
      </ul>

      <p>
        Chúc bạn có trải nghiệm đấu giá thành công và thú vị tại <strong>1xBid.com</strong>!
      </p>
    </div>
  );
}
