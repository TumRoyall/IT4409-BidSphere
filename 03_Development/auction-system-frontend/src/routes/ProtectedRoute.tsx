import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute() {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    // Redirect về login nếu chưa đăng nhập
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
