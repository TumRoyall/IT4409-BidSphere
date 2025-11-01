import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auctionApi from "@/api/modules/auction.api.ts";

export default function CreateAuction() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);
  const [productId, setProductId] = useState<number | null>(null);
  const [startPrice, setStartPrice] = useState<number>(0);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Nếu muốn lấy danh sách sản phẩm từ BE, dùng API Product
  useEffect(() => {
    // tạm hardcode product list, sau này gọi productApi.getAll()
    setProducts([
      { id: 1, name: "Sản phẩm A" },
      { id: 2, name: "Sản phẩm B" },
    ]);
    if (products.length > 0) setProductId(products[0].id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return alert("Chọn sản phẩm");
    setLoading(true);

    try {
      await auctionApi.create({
        productId,
        startPrice,
        startTime,
        endTime
      });
      alert("Tạo phiên đấu giá thành công!");
      navigate("/auctions");
    } catch (err) {
      alert("Lỗi khi tạo phiên đấu giá");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Tạo phiên đấu giá mới</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1">Sản phẩm</label>
          <select
            value={productId || ""}
            onChange={(e) => setProductId(Number(e.target.value))}
            className="border p-2 w-full"
          >
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Giá khởi điểm</label>
          <input
            type="number"
            value={startPrice}
            onChange={(e) => setStartPrice(Number(e.target.value))}
            className="border p-2 w-full"
            min={0}
          />
        </div>

        <div>
          <label className="block mb-1">Thời gian bắt đầu</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Thời gian kết thúc</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Đang tạo..." : "Tạo phiên đấu giá"}
        </button>
      </form>
    </div>
  );
}
