import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { authApi } from "@/api/modules/auth.api";
import "@/styles/verify.css";

export default function VerifyInfoPage() {
  const [params] = useSearchParams();
  const email = params.get("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
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
      setMessage({ text: "Email xác thực mới đã được gửi. Vui lòng kiểm tra hộp thư!", type: "success" });
      setCooldown(60);
    } catch (err: any) {
      const msg = err.response?.data || "Gửi lại email xác thực thất bại.";
      setMessage({ text: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-layout">
      <div className="verify-bg"></div>
      <div className="verify-overlay"></div>

      <div className="verify-card">
        <div className="verify-icon">
          <img
            src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
            alt="verify email"
          />
        </div>
        <h2 className="verify-title">Xác thực tài khoản của bạn</h2>
        <p className="verify-desc">
          Một email xác thực đã được gửi đến <b>{email}</b>.
          <br />
          Hãy mở email và nhấn vào liên kết để kích hoạt tài khoản.
        </p>

        <button
          onClick={handleResend}
          disabled={loading || cooldown > 0}
          className="verify-btn"
        >
          {cooldown > 0 ? `Gửi lại sau ${cooldown}s` : "Gửi lại email xác thực"}
        </button>

        {message.text && (
          <p className={`verify-msg ${message.type}`}>
            {message.text}
          </p>
        )}

        <Link to="/login" className="verify-link">
          ← Quay lại trang đăng nhập
        </Link>
      </div>

      <p className="verify-help">
        Không thấy email? Hãy kiểm tra thư mục <b>Spam / Quảng cáo</b>.
      </p>
    </div>
  );
}
