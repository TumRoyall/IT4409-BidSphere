import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import GlobalSnow from "@/components/christmas/GlobalSnow";
import ReindeerScene from "@/components/christmas/ReindeerScene";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 relative overflow-x-hidden">
      <GlobalSnow />
      <ReindeerScene />

      {/* Header luôn ở trên */}
      <div className="snow-cap z-50 sticky top-0">
        <Header />
      </div>

      {/* Nội dung chính - chiếm hết không gian giữa header & footer */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer cố định ở dưới */}
      <Footer />
      <ChatWidget />
    </div>
  );
}
