import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState<"error" | "success" | "info">("info");

  const handleLogin = async ({ email, password }: any) => {
    setLoading(true);
    setMsg("");

    try {
      await login(email, password);

      setType("success");
      setMsg("Đăng nhập thành công! Đang chuyển hướng...");

      setTimeout(() => navigate("/"), 1000);
    } catch (err: any) {
      const m = err.response?.data?.message || "Đăng nhập thất bại!";
      setType("error");
      setMsg(m);
    }

    setLoading(false);
  };

  return (
    <>
      <h2 className="auth-card-title">Đăng nhập</h2>

      <AuthForm mode="login" onSubmit={handleLogin} loading={loading} />

      {msg && (
        <p className={`auth-message ${type}`}>{msg}</p>
      )}

      <p className="auth-switch">
        Chưa có tài khoản?{" "}
        <Link className="auth-link" to="/register">
          Đăng ký ngay
        </Link>
      </p>
    </>
  );
}
