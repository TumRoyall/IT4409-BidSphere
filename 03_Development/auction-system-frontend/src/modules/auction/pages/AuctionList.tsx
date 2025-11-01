import { useEffect, useState } from "react";
import auctionApi from "@/api/modules/auction.api.ts";
import type { AuctionResponse } from "../types/auction";
import AuctionCard from "../components/AuctionCard";

export default function AuctionList() {
  const [auctions, setAuctions] = useState<AuctionResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auctionApi.getAll()
      .then(res => setAuctions(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Danh sách phiên đấu giá</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((a, idx) => (
          // Use id when available; fall back to index to ensure a defined key
          <AuctionCard key={a.id ?? idx} auction={a} />
        ))}
      </div>
    </div>
  );
}
