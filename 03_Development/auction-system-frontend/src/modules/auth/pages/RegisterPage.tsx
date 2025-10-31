import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import "@/styles/auth.css";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth(); // từ AuthContext
  const [loading, setLoading] = useState(false);

  const handleRegister = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    await register({ email, password }); // gọi mock register
    alert(`Tạo tài khoản thành công cho ${email}`);
    setLoading(false);
    navigate("/login"); // về login page
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f5f7fa]">
      <div className="bg-white shadow-md rounded-lg p-8 w-[380px]">
        <h2 className="text-xl font-semibold text-[#0b2b4c] text-center mb-4">
          Tạo tài khoản mới
        </h2>

        <AuthForm mode="register" onSubmit={handleRegister} loading={loading} />

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
