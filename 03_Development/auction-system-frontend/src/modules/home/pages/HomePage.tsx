import HomeBanner from "@/components/home/HomeBanner";
import LiveAuctionsSection from "@/components/home/LiveAuctionsSection";
import UpcomingAuctionsSection from "@/components/home/UpcomingAuctionsSection";

export default function HomePage() {
  return (
    <>
      <HomeBanner />

      <LiveAuctionsSection />
      <UpcomingAuctionsSection />

      {/* Sau này tách thêm Recommended Auctions hoặc Trending Auctions */}
    </>
  );
}
