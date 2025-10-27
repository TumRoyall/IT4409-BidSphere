import HeroBanner from "../components/HeroBanner";
import CategoryList from "../components/CategoryList";
import FeaturedAuctions from "../components/FeaturedAuctions";
import TopSellers from "../components/TopSellers";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <HeroBanner />
      <CategoryList />
      <FeaturedAuctions />
      <TopSellers />
    </div>
  );
}
