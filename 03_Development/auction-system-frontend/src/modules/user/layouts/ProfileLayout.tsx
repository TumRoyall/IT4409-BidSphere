import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Bell, User, Gavel, ChevronDown, Receipt, CreditCard, Lock, Activity, TrendingUp, ShoppingBag } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlobalSnow from "@/components/christmas/GlobalSnow";
import ReindeerScene from "@/components/christmas/ReindeerScene";
import ChristmasLightsSide from "@/components/christmas/ChristmasLightsSide";

const MENU_ITEMS = [
  {
    id: "notification",
    title: "Thông báo",
    icon: Bell,
    items: [
      { to: "/user/notification/system", label: "Hệ thống", icon: Activity },
      { to: "/user/notification/bid", label: "Đấu giá", icon: Gavel },
      { to: "/user/notification/payment", label: "Thanh toán", icon: Receipt },
    ],
  },
  {
    id: "account",
    title: "Tài khoản của tôi",
    icon: User,
    items: [
      { to: "/user/account/profile", label: "Hồ sơ cá nhân", icon: User },
      { to: "/user/account/reset-password", label: "Đổi mật khẩu", icon: Lock },
      { to: "/user/account/payment", label: "Ví của tôi", icon: CreditCard },
    ],
  },
  {
    id: "bid",
    title: "Phiên đấu giá",
    icon: Gavel,
    items: [
      { to: "/user/bid/won-products", label: "Đơn đấu giá", icon: ShoppingBag },
      { to: "/user/bid/auction-current-joined", label: "Phiên đang tham gia", icon: TrendingUp },
      { to: "/user/bid/history", label: "Lịch sử đấu giá", icon: Activity }
    ],
  },
];

export default function ProfileLayout() {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string>("account");

  useEffect(() => {
    if (location.pathname.startsWith("/user/account")) setOpenMenu("account");
    else if (location.pathname.startsWith("/user/notification"))
      setOpenMenu("notification");
    else if (location.pathname.startsWith("/user/bid")) setOpenMenu("bid");
  }, [location]);

  const toggleMenu = (menu: string) =>
    setOpenMenu((prev) => (prev === menu ? "" : menu));

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 relative">
      <GlobalSnow />
      <ReindeerScene />
      <ChristmasLightsSide />

      <div className="relative z-50">
        <Header />
      </div>

      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8 flex-1 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg sticky top-6 overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">Quản lý tài khoản</h2>
                    <p className="text-xs text-blue-100 mt-0.5">Cài đặt và tùy chỉnh</p>
                  </div>
                </div>
              </div>

              <nav className="p-3">
                {MENU_ITEMS.map((menu) => {
                  const MenuIcon = menu.icon;
                  const isOpen = openMenu === menu.id;

                  return (
                    <div key={menu.id} className="mb-2">
                      {/* Menu Title */}
                      <button
                        onClick={() => toggleMenu(menu.id)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                          isOpen
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-50 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg ${isOpen ? "bg-white/20" : "bg-gray-100 group-hover:bg-gray-200"}`}>
                            <MenuIcon className="w-5 h-5" />
                          </div>
                          <span className="font-semibold text-sm">{menu.title}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Sub Menu with animation */}
                      {isOpen && (
                        <div className="mt-2 ml-2 space-y-1 pl-4 border-l-2 border-blue-100">
                          {menu.items.map((item) => {
                            const ItemIcon = item.icon;

                            return (
                              <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                  `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 group ${
                                    isActive
                                      ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 font-semibold shadow-sm border border-emerald-200/50"
                                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1"
                                  }`
                                }
                              >
                                {({ isActive }) => (
                                  <>
                                    <div className={`p-1.5 rounded-lg transition-colors ${
                                      isActive ? "bg-emerald-100" : "bg-gray-100 group-hover:bg-gray-200"
                                    }`}>
                                      <ItemIcon className="w-4 h-4" />
                                    </div>
                                    <span>{item.label}</span>
                                  </>
                                )}
                              </NavLink>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <section className="flex-1 min-w-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg p-6 md:p-8">
              <Outlet />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}