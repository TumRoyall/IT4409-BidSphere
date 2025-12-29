import { useEffect, useState } from "react";
import "@/modules/user/styles/PaymentPage.css";
import TransactionHistory from "./TransactionHistory";
import { userApi } from "@/api/modules/user.api";
import WalletIcon from "@/components/icons/WalletIcon";
import { useNavigate } from "react-router-dom";



type UserProfile = {
  userId: number;
  fullName: string;
  balance: number;
};

export default function PaymentPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await userApi.getProfile();
      setProfile(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return null;
  if (!profile) return <div>Không tải được thông tin ví</div>;

  return (
    <div className="payment-page">
      {/* ===== WALLET ===== */}
      <div className="wallet-card">
        <div className="wallet-left">
          <h2 className="wallet-title">
            <WalletIcon size={22} />
            <span>Ví của tôi</span>
          </h2>
          <div className="wallet-sub">Số dư hiện tại</div>
          <div className="wallet-balance">
            {profile.balance.toLocaleString()} đ
          </div>
        </div>

        <div className="wallet-right">
          <button
            className="deposit-btn"
            onClick={() => navigate("/user/account/payment/deposit")}
          >
            <span className="deposit-icon"></span>
            <span className="deposit-text">Nạp tiền</span>
          </button>
        </div>
      </div>

      {/* ===== TRANSACTION HISTORY ===== */}
      <div className="transaction-card">
        <TransactionHistory userId={profile.userId} />
      </div>
    </div>
  );
}
