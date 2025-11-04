import { useParams, Link } from "react-router-dom";
import styles from "../help.module.css";

export default function HelpDetailPage() {
  const { id } = useParams();

  return (
    <div className={styles.helpDetail}>
      <Link to="/help" className={styles.backLink}>← Quay lại trang trợ giúp</Link>
      <h1>Chi tiết bài viết #{id}</h1>
      <p>
        Đây là nội dung chi tiết của bài viết trợ giúp số {id}.
        Bạn có thể bổ sung thêm nội dung chi tiết, ảnh minh họa hoặc hướng dẫn cụ thể tại đây.
      </p>
    </div>
  );
}
