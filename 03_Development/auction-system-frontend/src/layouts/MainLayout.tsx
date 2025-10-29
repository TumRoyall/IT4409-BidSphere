import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";




export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header luôn ở trên */}
      <Header />

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
