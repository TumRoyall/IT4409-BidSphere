import { useEffect, useState } from "react";
import auctionApi from "@/api/modules/auction.api";
import AuctionCard from "@/components/home/AuctionCard";
import type { AuctionResponse } from "@/api/modules/auction.api";
import "@/styles/auction-list.css";

export default function AuctionList() {
  const [auctions, setAuctions] = useState<AuctionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAuctions = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Try to get active auctions first
        try {
          const response = await auctionApi.getActiveAuctions();
          console.log("Active auctions:", response.data);
          setAuctions(response.data || []);
        } catch (err) {
          // Fallback to getting all auctions if active endpoint fails
          console.log("Failed to get active auctions, trying all auctions");
          const response = await auctionApi.getAllAuctions();
          console.log("All auctions:", response.data);
          // Filter to only show OPEN auctions
          const activeAuctions = (response.data || []).filter(
            (a) => a.status === "OPEN" || a.status === "open"
          );
          setAuctions(activeAuctions);
        }
      } catch (err: any) {
        console.error("Failed to load auctions:", err);
        setError(err?.response?.data?.message || "Failed to load auctions");
      } finally {
        setIsLoading(false);
      }
    };

    loadAuctions();
  }, []);

  if (isLoading) {
    return (
      <div className="auction-list-container">
        <div className="auction-list-loading-spinner">
          <div className="auction-list-spinner"></div>
          <p>Loading auctions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="auction-list-container">
        <div className="auction-list-error-message">
          <p>⚠️ {error}</p>
        </div>
      </div>
    );
  }

  if (auctions.length === 0) {
    return (
      <div className="auction-list-container">
        <div className="auction-list-empty-state">
          <p>No active auctions found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auction-list-container">
      <div className="auction-list-header">
        <h1>Active Auctions</h1>
        <p>Browse and bid on available auctions</p>
      </div>

      <div className="auction-list-grid">
        {auctions.map((auction) => (
        <AuctionCard
        key={auction.auctionId || auction.id}
        auction={auction}
        />
        ))}
      </div>
    </div>
  );
}
