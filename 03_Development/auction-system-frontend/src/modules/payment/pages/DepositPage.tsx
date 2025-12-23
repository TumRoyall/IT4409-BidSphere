import { useEffect, useState } from "react";
import "@/modules/payment/styles/DepositPage.css";
import { userApi } from "@/api/modules/user.api";


type Method = "QR" | "CARD" | "MOMO";

export default function DepositPage() {
  const [method, setMethod] = useState<Method>("QR");
  const [amount, setAmount] = useState("");
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const bankCode = "MB";
  const accountNo = "8888888888888";
  const accountName = "NGUYEN KIM NGOC";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userApi.getProfile();
        setProfile(res);
      } catch (e) {
        console.error("Không lấy được profile");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  if (loadingProfile) {
    return <div className="deposit-page">Đang tải thông tin người dùng...</div>;
  }

  if (!profile) {
    return <div className="deposit-page">Không lấy được thông tin người dùng</div>;
  }

  const username = profile.username.toUpperCase();

  const now = new Date();
  const timeStr = `${now.getFullYear()}${String(
    now.getMonth() + 1
  ).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")} ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const transferContent = `NAP TIEN BIDSPHERE - ${username} - ${timeStr}`;

  const generateQr = () => {
    if (!amount || Number(amount) <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ");
      return;
    }

    const url = `https://img.vietqr.io/image/${bankCode}-${accountNo}-compact2.png
      ?amount=${amount}
      &addInfo=${encodeURIComponent(transferContent)}
      &accountName=${encodeURIComponent(accountName)}`;

    setQrUrl(url);
  };

  return (
    <div className="deposit-page">
      <h2 className="deposit-title">Nạp tiền vào ví</h2>

      {/* ===== METHOD SELECT ===== */}
      <div className="method-list">
        <div
          className={`method-card ${method === "QR" ? "active" : ""}`}
          onClick={() => setMethod("QR")}
        >
          <img
            src="https://png.pngtree.com/png-vector/20190927/ourmid/pngtree-bank-icon-png-image_1757496.jpg"
            alt="Ngân hàng"
          />
          <span>QR ngân hàng</span>
        </div>

        <div
          className={`method-card ${method === "CARD" ? "active" : ""}`}
          onClick={() => setMethod("CARD")}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTozvtMOi_XpYvYIGhd5NaqchdVrtvaG-awmA&s"
            alt="Thẻ ngân hàng"
          />
          <span>Thẻ ngân hàng</span>
        </div>

        <div
          className={`method-card ${method === "MOMO" ? "active" : ""}`}
          onClick={() => setMethod("MOMO")}
        >
          <img
            src="https://developers.momo.vn/v3/assets/images/MOMO-Logo-App-6262c3743a290ef02396a24ea2b66c35.png"
            alt="MoMo"
          />
          <span>MoMo</span>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="method-content">
        {method === "QR" && (
          <div className="qr-section">
            <label>
              Số tiền cần nạp (VND)
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="Nhập số tiền"
              />
            </label>

            <button onClick={generateQr}>Tạo mã QR</button>

            {qrUrl && (
              <div className="qr-result">
                <img src={qrUrl} alt="VNQR" />

                <div className="qr-info">
                  <p><b>Ngân hàng:</b> MB Bank</p>
                  <p><b>Số tài khoản:</b> {accountNo}</p>
                  <p><b>Chủ tài khoản:</b> {accountName}</p>
                  <p><b>Nội dung chuyển khoản:</b></p>
                  <code>{transferContent}</code>
                </div>
              </div>
            )}
          </div>
        )}

        {method === "CARD" && (
          <div className="card-form">
            <label>Số thẻ<input placeholder="1234 5678 9012 3456" /></label>
            <label>Tên chủ thẻ<input placeholder="NGUYEN VAN A" /></label>
            <div className="row">
              <label>MM/YY<input placeholder="12/27" /></label>
              <label>CVV<input placeholder="123" /></label>
            </div>
            <button disabled>Thanh toán (demo)</button>
          </div>
        )}

        {method === "MOMO" && (
          <div className="momo-form">
            <label>Số điện thoại MoMo<input placeholder="09xxxxxxxx" /></label>
            <label>Số tiền<input type="number" /></label>
            <button disabled>Thanh toán MoMo (demo)</button>
          </div>
        )}
      </div>
    </div>
  );
}
