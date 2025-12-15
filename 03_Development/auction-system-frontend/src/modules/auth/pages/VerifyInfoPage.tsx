import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { authApi } from "@/api/modules/auth.api";
import "@/styles/auth.css";

export default function VerifyInfoPage() {
  const [params] = useSearchParams();
  const email = params.get("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "" }>({
    text: "",
    type: "",
  });
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (!email) {
      setMessage({ text: "Thiếu email để xác thực.", type: "error" });
      return;
    }
    try {
      setLoading(true);
      await authApi.resendVerification(email);
      setMessage({
        text: "Email xác thực mới đã được gửi. Vui lòng kiểm tra hộp thư!",
        type: "success",
      });
      setCooldown(60);
    } catch (err: any) {
      const msg = err.response?.data || "Gửi lại email xác thực thất bại.";
      setMessage({ text: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="verify-icon">
        <img
          src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
          alt="verify email"
        />
      </div>

      <h2 className="auth-card-title">Xác thực tài khoản của bạn</h2>

      <p className="verify-desc">
        Một email xác thực đã được gửi đến <b>{email}</b>.
        <br />
        Hãy mở email và nhấn vào liên kết để kích hoạt tài khoản.
      </p>

      <button
        onClick={handleResend}
        disabled={loading || cooldown > 0}
        className="auth-btn verify-btn"
      >
        {cooldown > 0 ? `Gửi lại sau ${cooldown}s` : "Gửi lại email xác thực"}
      </button>

      {message.text && (
        <p className={`auth-message ${message.type}`}>{message.text}</p>
      )}

      <Link to="/login" className="verify-back-link">
        ← Quay lại trang đăng nhập
      </Link>

      <p className="verify-help-text">
        Không thấy email? Hãy kiểm tra thư mục <b>Spam / Quảng cáo</b>.
      </p>
    </>
  );
}
