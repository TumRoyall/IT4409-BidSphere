import { useState } from "react";
import bidApi from "@/api/modules/bid.api.ts";

export default function BidForm({
  auctionId,
  refreshBids
}: {
  auctionId: number;
  refreshBids: () => void;
}) {
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleBid = async () => {
    if (amount <= 0) return alert("Nhập giá hợp lệ");
    setLoading(true);
    try {
      await bidApi.placeBid({ auctionId, userId: 1, amount }); // userId tạm thời
      alert("Đặt giá thành công!");
      refreshBids();
    } catch (err) {
      alert("Lỗi khi đặt giá");
    } finally {
      setLoading(false);
    }
  };

  const handleAutoBid = async () => {
    if (amount <= 0) return alert("Nhập giá hợp lệ");
    setLoading(true);
    try {
      await bidApi.placeAutoBid({ auctionId, userId: 1, amount });
      alert("Auto-bid thành công!");
      refreshBids();
    } catch (err) {
      alert("Lỗi khi auto-bid");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        type="number"
        className="border px-2 py-1"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
        placeholder="Nhập giá"
      />
      <button
        className="bg-blue-500 text-white px-4 py-1 rounded"
        onClick={handleBid}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Đặt giá"}
      </button>
      <button
        className="bg-green-500 text-white px-4 py-1 rounded"
        onClick={handleAutoBid}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Auto-bid"}
      </button>
    </div>
  );
}
