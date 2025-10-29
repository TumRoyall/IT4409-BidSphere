import { Link } from "react-router-dom";
import styles from "../help.module.css";

export default function HelpPage() {
  const articles = [
    { id: 1, title: "Cách tham gia phiên đấu giá", summary: "Hướng dẫn chi tiết từng bước để bắt đầu đấu giá." },
    { id: 2, title: "Phương thức thanh toán sau khi thắng đấu giá", summary: "Cách thanh toán và xác nhận đơn hàng sau khi thắng." },
    { id: 3, title: "Cách nạp tiền vào tài khoản", summary: "Hướng dẫn nạp tiền qua ví điện tử và ngân hàng." },
  ];

  return (
    <div className={styles.helpContainer}>
      <h1 className={styles.helpTitle}>Trợ giúp & Hỏi đáp</h1>
      <p className={styles.helpDesc}>
        Tại đây bạn có thể tìm hiểu các hướng dẫn và câu hỏi thường gặp khi sử dụng 1xBid.
      </p>

      <div className={styles.articleList}>
        {articles.map((a) => (
             <Link
               key={a.id}
               to={`/help/${a.id}`}
               className={styles.articleCard}
             >
               <h3 className={styles.articleTitle}>{a.title}</h3>
               <p className={styles.articleSummary}>{a.summary}</p>
             </Link>
        ))}
      </div>
    </div>
  );
}
