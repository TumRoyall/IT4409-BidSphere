import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"info" | "error" | "success">("info");

  // 🔑 Xử lý đăng nhập
  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    setMessage("");

    try {
      await login(email, password);

      // ✅ Thành công → chuyển về trang chủ
      setType("success");
      setMessage("🎉 Đăng nhập thành công! Đang chuyển hướng...");
      setTimeout(() => navigate("/"), 1000);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Đăng nhập thất bại!";
      console.warn("❌ Login error:", msg);

      // 🕐 Nếu tài khoản chưa xác thực → sang trang verify-info
      if (msg.includes("xác thực")) {
        navigate(`/verify-info?email=${encodeURIComponent(email)}`);
        return;
      }

      // 🚫 Nếu bị khóa tạm thời hoặc vĩnh viễn
      if (msg.includes("khóa đến") || msg.includes("vĩnh viễn")) {
        setType("error");
        setMessage(`🚫 ${msg}`);
        return;
      }

      // ❌ Mặc định: Sai tài khoản hoặc mật khẩu
      setType("error");
      setMessage(`❗ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f5f7fa]">
      <div className="bg-white shadow-md rounded-lg p-8 w-[380px]">
        <h2 className="text-xl font-semibold text-[#0b2b4c] text-center mb-4">
          Đăng nhập vào 1xBid
        </h2>

        <AuthForm mode="login" onSubmit={handleLogin} loading={loading} />

        {/* 🧾 Thông báo */}
        {message && (
          <div
            className={`mt-4 text-sm text-center whitespace-pre-line font-medium ${
              type === "error"
                ? "text-red-600"
                : type === "success"
                ? "text-green-600"
                : "text-blue-600"
            }`}
          >
            {message}
          </div>
        )}

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
