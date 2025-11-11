import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"info" | "error" | "success">("info");

  const handleRegister = async (formData: any) => {
    setLoading(true);
    setMessage("");
    try {
      await register(formData);
      setType("success");
      setMessage("Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.");

      // Chuyển sang trang xác thực sau 1.5 giây
      setTimeout(() => {
        navigate(`/verify-info?email=${encodeURIComponent(formData.email)}`);
      }, 1500);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Đăng ký thất bại!";
      console.warn("Register error:", msg);
      setType("error");
      setMessage(`${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f5f7fa]">
      <div className="bg-white shadow-lg rounded-xl p-8 w-[400px]">
        <h2 className="text-xl font-semibold text-[#0b2b4c] text-center mb-4">
          Tạo tài khoản mới
        </h2>

        <AuthForm mode="register" onSubmit={handleRegister} loading={loading} />

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
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-[#1f77ff] hover:underline font-medium">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
