import { useState } from "react";
import { userApi } from "@/api/modules/user.api";
import { useAuth } from "@/hooks/useAuth";
import "@/modules/user/styles/ChangePasswordPage.css";

export default function ChangePasswordPage() {
  const { logout } = useAuth();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setMsg("Mật khẩu xác nhận không khớp");
      return;
    }
    try {
      setLoading(true);
      await userApi.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setMsg("Đổi mật khẩu thành công. Đang đăng xuất...");
      setTimeout(() => logout(), 1500);
    } catch (err: any) {
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Đổi mật khẩu thất bại";
        setMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <h2>Đổi mật khẩu</h2>
      <form onSubmit={handleSubmit} className="change-password-form">
        <label>
          Mật khẩu hiện tại
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mật khẩu mới
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Xác nhận mật khẩu mới
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>

        {msg && <p className="change-password-msg">{msg}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
        </button>
      </form>
    </div>
  );
}
