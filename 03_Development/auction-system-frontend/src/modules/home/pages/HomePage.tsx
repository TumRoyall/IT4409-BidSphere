import styles from "@/components/layout/layout.module.css";
console.log("✅ HomePage render");
export default function HomePage() {
  return (

    <div>
      {/* Giới thiệu */}
      <section className={styles.intro}>
        <h2>1xBid - Nền tảng đấu giá trực tuyến hàng đầu Việt Nam</h2>
        <p>
          Tham gia đấu giá và sở hữu sản phẩm chất lượng với giá tốt nhất.<br />
          <strong>Nạp rút trong vòng 1 phút, giao dịch tiền tỷ chỉ 3 phút!</strong><br />
          Không xác minh KYC
        </p>
      </section>

      {/* Phiên đấu giá nổi bật */}
      <section className={styles.hotAuctions}>
        <h3>🔥 Phiên đấu giá nổi bật</h3>
        <div className={styles.auctionList}>
          {[
            { id: 1, title: "iPhone 15 Pro Max", currentBid: "18,500,000₫" },
            { id: 2, title: "Honda SH 2022", currentBid: "75,000,000₫" },
            { id: 3, title: "Rolex Submariner", currentBid: "350,000,000₫" },
          ].map(item => (
            <div key={item.id} className={styles.auctionCard}>
              <p className={styles.auctionTitle}>{item.title}</p>
              <span className={styles.auctionPrice}>Giá hiện tại: {item.currentBid}</span>
              <button className={styles.bidBtn}>Tham gia</button>
            </div>
          ))}
        </div>
      </section>

      {/* Người dùng top */}
      <section className={styles.topUsers}>
        <h3>🏆 Người dùng nổi bật</h3>
        <ul>
          <li>Nguyễn Văn A - 120 phiên thắng</li>
          <li>Trần Thị B - 98 phiên thắng</li>
          <li>Lê Văn C - 85 phiên thắng</li>
        </ul>
      </section>
    </div>
  );
}
