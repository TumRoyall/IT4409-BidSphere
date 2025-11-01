import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import auctionApi from "@/api/modules/auction.api.ts";
import bidApi from "@/api/modules/bid.api.ts";
import type { AuctionResponse } from "../types/auction";
import type { BidResponse } from "../types/bid";
import BidForm from "../components/BidForm";

export default function AuctionDetail() {
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<AuctionResponse | null>(null);
  const [bids, setBids] = useState<BidResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAuction = async () => {
    if (!id) return;
    const idNum = Number(id);
    if (Number.isNaN(idNum)) {
      console.error("Invalid auction id:", id);
      setLoading(false);
      return;
    }

    try {
      const [auctionRes, bidRes] = await Promise.all([
        auctionApi.getById(idNum),
        bidApi.getByAuction(idNum),
      ]);
      setAuction(auctionRes.data);
      setBids(bidRes.data);
    } catch (err: any) {
      // Log axios error details if available
      console.error("Failed to fetch auction or bids:", err?.response ?? err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuction();
    // Live update mỗi 5s
    const interval = setInterval(fetchAuction, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!auction) return <p>Auction not found</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{auction.productName}</h1>
      <p>Giá khởi điểm: {auction.startPrice}</p>
      <p>Giá hiện tại: {auction.currentPrice}</p>
      <p>Status: {auction.status}</p>

      <h2 className="mt-4 font-semibold">Bids</h2>
      <ul className="mb-4">
        {bids.map(b => (
          <li key={b.id}>{b.userId} đặt {b.amount} lúc {new Date(b.bidTime).toLocaleTimeString()}</li>
        ))}
      </ul>

      <BidForm auctionId={auction.id} refreshBids={fetchAuction} />
    </div>
  );
}
