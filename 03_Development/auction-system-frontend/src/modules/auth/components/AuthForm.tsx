import { useState } from "react";
import "@/styles/auth.css";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: { email: string; password: string }) => void;
  loading?: boolean;
}

export default function AuthForm({ mode, onSubmit, loading }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register" && password !== confirm) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    onSubmit({ email, password });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="auth-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Nhập email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="auth-group">
        <label>Mật khẩu</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {mode === "register" && (
        <div className="auth-group">
          <label>Xác nhận mật khẩu</label>
          <input
            type="password"
            placeholder="Nhập lại mật khẩu..."
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
      )}

      <button className="auth-btn" disabled={loading} type="submit">
        {loading
          ? "Đang xử lý..."
          : mode === "login"
          ? "Đăng nhập"
          : "Đăng ký"}
      </button>
    </form>
  );
}
