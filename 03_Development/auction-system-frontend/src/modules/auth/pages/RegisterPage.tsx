import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState<"error" | "success" | "info">("info");

  const handleRegister = async (form: any) => {
    setLoading(true);
    setMsg("");

    try {
      await register(form);
      setType("success");
      setMsg("Đăng ký thành công! Vui lòng kiểm tra email để xác thực.");

      setTimeout(() => navigate(`/verify-info?email=${form.email}`), 1500);
    } catch (err: any) {
      const m = err.response?.data?.message || "Đăng ký thất bại!";
      setType("error");
      setMsg(m);
    }

    setLoading(false);
  };

  return (
    <>
      <h2 className="auth-card-title">Tạo tài khoản mới</h2>

      <AuthForm mode="register" onSubmit={handleRegister} loading={loading} />

      {msg && <p className={`auth-message ${type}`}>{msg}</p>}

      <p className="auth-switch">
        Đã có tài khoản?{" "}
        <Link className="auth-link" to="/login">
          Đăng nhập ngay
        </Link>
      </p>
    </>
  );
}
