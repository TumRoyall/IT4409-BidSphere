import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth(); // Lấy user từ context (AuthContext)

  // Nếu chưa có user (chưa đăng nhập)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã login, render trang con
  return children;
}
