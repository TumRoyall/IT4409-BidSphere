import { useState } from "react";
import "@/styles/auth.css";

interface Props {
  mode: "login" | "register";
  onSubmit: (data: any) => void;
  loading?: boolean;
}

export default function AuthForm({ mode, onSubmit, loading }: Props) {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    gender: "male",
  });

  const change = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e: any) => {
    e.preventDefault();
    if (mode === "register" && form.password !== form.confirm)
      return alert("Mật khẩu xác nhận không khớp!");

    onSubmit(
      mode === "login"
        ? { email: form.email, password: form.password }
        : form
    );
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      {mode === "register" && (
        <>
          <div className="auth-group">
            <label>Tên người dùng</label>
            <input name="username" value={form.username} onChange={change} required />
          </div>

          <div className="auth-group">
            <label>Họ và tên</label>
            <input name="fullName" value={form.fullName} onChange={change} required />
          </div>

          <div className="auth-group">
            <label>Số điện thoại</label>
            <input name="phone" value={form.phone} onChange={change} required />
          </div>

          <div className="auth-group">
            <label>Giới tính</label>
            <div className="gender-options">
              <label><input type="radio" name="gender" value="male" checked={form.gender === "male"} onChange={change}/> Nam</label>
              <label><input type="radio" name="gender" value="female" checked={form.gender === "female"} onChange={change}/> Nữ</label>
            </div>
          </div>
        </>
      )}

      <div className="auth-group">
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={change} required />
      </div>

      <div className="auth-group">
        <label>Mật khẩu</label>
        <input name="password" type="password" value={form.password} onChange={change} required />
      </div>

      {mode === "register" && (
        <div className="auth-group">
          <label>Xác nhận mật khẩu</label>
          <input name="confirm" type="password" value={form.confirm} onChange={change} required />
        </div>
      )}

      <button className="auth-btn" disabled={loading}>
        {loading ? "Đang xử lý..." : mode === "login" ? "Đăng nhập" : "Đăng ký"}
      </button>
    </form>
  );
}
