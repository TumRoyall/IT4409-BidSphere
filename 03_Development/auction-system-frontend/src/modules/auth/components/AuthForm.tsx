import { useState } from "react";
import "@/styles/auth.css";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: any) => void;
  loading?: boolean;
}

export default function AuthForm({ mode, onSubmit, loading }: AuthFormProps) {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    gender: "male",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "register" && form.password !== form.confirm) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    if (mode === "login") onSubmit({ email: form.email, password: form.password });
    else onSubmit(form);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {mode === "register" && (
        <>
          <div className="auth-group">
            <label>Tên người dùng</label>
            <input
              name="username"
              placeholder="Tên tài khoản"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-group">
            <label>Họ và tên</label>
            <input
              name="fullName"
              placeholder="Họ và tên"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-group">
            <label>Số điện thoại</label>
            <input
              name="phone"
              placeholder="09xx xxx xxx"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-group">
            <label>Giới tính</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={form.gender === "male"}
                  onChange={handleChange}
                />
                Nam
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form.gender === "female"}
                  onChange={handleChange}
                />
                Nữ
              </label>
            </div>
          </div>
        </>
      )}

      <div className="auth-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Nhập email của bạn..."
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="auth-group">
        <label>Mật khẩu</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      {mode === "register" && (
        <div className="auth-group">
          <label>Xác nhận mật khẩu</label>
          <input
            type="password"
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <button className="auth-btn" disabled={loading}>
        {loading ? "Đang xử lý..." : mode === "login" ? "Đăng nhập" : "Đăng ký"}
      </button>
    </form>
  );
}
