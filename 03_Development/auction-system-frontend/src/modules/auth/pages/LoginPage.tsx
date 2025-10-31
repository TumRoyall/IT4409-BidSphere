import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import "@/styles/auth.css";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // lấy hàm login từ AuthContext
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    await login(email, password); // gọi mock login (hoặc API thật sau này)
    setLoading(false);
    navigate("/"); // về trang chủ
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f5f7fa]">
      <div className="bg-white shadow-md rounded-lg p-8 w-[380px]">
        <h2 className="text-xl font-semibold text-[#0b2b4c] text-center mb-4">
          Đăng nhập
        </h2>

        <AuthForm mode="login" onSubmit={handleLogin} loading={loading} />

        <div className="text-center mt-5 text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-[#1f77ff] hover:underline font-medium">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
