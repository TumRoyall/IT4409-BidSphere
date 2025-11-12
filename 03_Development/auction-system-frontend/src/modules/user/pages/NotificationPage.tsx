import { useParams } from "react-router-dom";
export default function NotificationPage() {
  const { category } = useParams();
  return <h2>🔔 Thông báo: {category}</h2>;
}
