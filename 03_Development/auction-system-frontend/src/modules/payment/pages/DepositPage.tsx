import { useState, useEffect } from "react";
import { QrCode, Wallet, Building2, CheckCircle, Copy } from "lucide-react";

import { userApi } from "@/api/modules/user.api";
import { transactionApi } from "@/api/modules/transaction.api";

type Method = "QR" | "CARD" | "MOMO";

export default function DepositPage() {
  const [method, setMethod] = useState<Method>("QR");
  const [amount, setAmount] = useState("");
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>({ username: "nguyenvana", userId: 123 });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [copied, setCopied] = useState(false);

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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600 mx-auto mb-3"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Wallet className="w-16 h-16 text-red-500 mx-auto mb-3" />
          <p className="text-gray-900 font-semibold">Không lấy được thông tin người dùng</p>
        </div>
      </div>
    );
  }

  const username = profile.username.toUpperCase();
  const now = new Date();
  const timeStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  const transferContent = `NAP TIEN BIDSPHERE - ${username} - ${timeStr}`;

  const generateQr = () => {
    if (!amount || Number(amount) <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ");
      return;
    }

    const url = `https://img.vietqr.io/image/${bankCode}-${accountNo}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(accountName)}`;
    setQrUrl(url);
  };

  const handleConfirmDeposit = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Số tiền không hợp lệ");
      return;
    }

    try {
      await transactionApi.deposit({
        userId: profile.userId,
        amount: amount,
        type: "DEPOSIT",
      });

      alert("Nạp tiền thành công");
      setQrUrl(null);
      setAmount("");
    } catch (e) {
      alert("Có lỗi khi nạp tiền");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const METHODS = [
    {
      id: "QR" as Method,
      label: "QR ngân hàng",
      img: "https://png.pngtree.com/png-vector/20190927/ourmid/pngtree-bank-icon-png-image_1757496.jpg"
    },
    {
      id: "CARD" as Method,
      label: "Thẻ ngân hàng",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTozvtMOi_XpYvYIGhd5NaqchdVrtvaG-awmA&s"
    },
    {
      id: "MOMO" as Method,
      label: "MoMo",
      img: "https://developers.momo.vn/v3/assets/images/MOMO-Logo-App-6262c3743a290ef02396a24ea2b66c35.png"
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Nạp tiền vào ví</h2>
        </div>
        <p className="text-gray-600 text-sm ml-13">Chọn phương thức thanh toán phù hợp với bạn</p>
      </div>

      {/* Method Selection */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {METHODS.map((m) => {
          return (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`relative p-3 rounded-lg border-2 transition-all ${
                method === m.id
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {method === m.id && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
              <div className="flex flex-col items-center gap-2">
                <img
                  src={m.img}
                  alt={m.label}
                  className="w-8 h-8 object-contain"
                />
                <span className={`text-xs font-semibold ${method === m.id ? "text-emerald-700" : "text-gray-700"}`}>
                  {m.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        {method === "QR" && (
          <div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Số tiền cần nạp (VND)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Nhập số tiền"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
              />
            </div>

            <button
              onClick={generateQr}
              className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <QrCode className="w-5 h-5" />
              Tạo mã QR
            </button>

            {qrUrl && (
              <div className="mt-8 space-y-6">
                {/* QR Code */}
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-xl border-2 border-gray-200 shadow-lg">
                    <img src={qrUrl} alt="VietQR" className="w-72 h-72 object-contain" />
                  </div>
                  <p className="text-sm text-gray-500 mt-3">Quét mã QR để thanh toán</p>
                </div>

                {/* Bank Info */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 className="w-5 h-5 text-gray-700" />
                    <h3 className="font-semibold text-gray-900">Thông tin chuyển khoản</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Ngân hàng:</span>
                      <span className="text-sm font-semibold text-gray-900">MB Bank</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Số tài khoản:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900 font-mono">{accountNo}</span>
                        <button
                          onClick={() => copyToClipboard(accountNo)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Copy className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Chủ tài khoản:</span>
                      <span className="text-sm font-semibold text-gray-900">{accountName}</span>
                    </div>
                    <div className="pt-3 border-t border-gray-300">
                      <p className="text-sm text-gray-600 mb-2">Nội dung chuyển khoản:</p>
                      <div className="flex items-start gap-2 bg-emerald-50 p-3 rounded-lg">
                        <code className="flex-1 text-xs text-emerald-700 font-mono break-all">
                          {transferContent}
                        </code>
                        <button
                          onClick={() => copyToClipboard(transferContent)}
                          className="p-1 hover:bg-emerald-100 rounded transition-colors flex-shrink-0"
                        >
                          <Copy className="w-4 h-4 text-emerald-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={handleConfirmDeposit}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Tôi đã chuyển tiền
                </button>
              </div>
            )}
          </div>
        )}

        {method === "CARD" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Số thẻ</label>
              <input placeholder="1234 5678 9012 3456" className="w-full h-12 px-4 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tên chủ thẻ</label>
              <input placeholder="NGUYEN VAN A" className="w-full h-12 px-4 border border-gray-300 rounded-lg" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">MM/YY</label>
                <input placeholder="12/27" className="w-full h-12 px-4 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                <input placeholder="123" className="w-full h-12 px-4 border border-gray-300 rounded-lg" />
              </div>
            </div>
            <button disabled className="w-full h-12 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed">
              Thanh toán (Tính năng đang phát triển)
            </button>
          </div>
        )}

        {method === "MOMO" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại MoMo</label>
              <input placeholder="09xxxxxxxx" className="w-full h-12 px-4 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Số tiền</label>
              <input type="number" placeholder="100,000" className="w-full h-12 px-4 border border-gray-300 rounded-lg" />
            </div>
            <button disabled className="w-full h-12 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed">
              Thanh toán MoMo (Tính năng đang phát triển)
            </button>
          </div>
        )}
      </div>

      {copied && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Đã sao chép!</span>
        </div>
      )}
    </div>
  );
}