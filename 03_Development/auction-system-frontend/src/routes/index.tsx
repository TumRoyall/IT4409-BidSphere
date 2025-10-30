import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/modules/home/pages/HomePage";
import HelpPage from "@/modules/help/pages/HelpPage";
import HelpDetailPage from "@/modules/help/pages/HelpDetailPage"
import HowToBuyPage from "@/modules/help/pages/HowToBuyPage"
import MainLayout from "@/layouts/MainLayout";
import AuctionList from "@/modules/auction/pages/AuctionList";
import AuctionDetail from "@/modules/auction/pages/AuctionDetail";
import CreateAuction from "@/modules/auction/pages/CreateAuction";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/help/:id" element={<HelpDetailPage />} />
          <Route path="/how-to-buy" element={<HowToBuyPage />} />
          {/* Auction routes */}
          <Route path="/auctions" element={<AuctionList />} />
          <Route path="/auctions/create" element={<CreateAuction />} />
          <Route path="/auctions/:id" element={<AuctionDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
