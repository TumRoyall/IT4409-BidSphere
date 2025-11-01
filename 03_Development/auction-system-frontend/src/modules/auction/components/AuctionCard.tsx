import type { AuctionResponse } from "../types/auction";
import { Link } from "react-router-dom";

export default function AuctionCard({ auction }: { auction: AuctionResponse }) {
  return (
    <Link to={`/auctions/${auction.id}`}>
      <div className="border p-4 rounded hover:shadow-lg transition cursor-pointer">
        <h2 className="font-bold text-lg">{auction.productName}</h2>
        <p>Giá khởi điểm: {auction.startPrice}</p>
        <p>Giá hiện tại: {auction.currentPrice}</p>
        <p>Status: {auction.status}</p>
      </div>
    </Link>
  );
}
