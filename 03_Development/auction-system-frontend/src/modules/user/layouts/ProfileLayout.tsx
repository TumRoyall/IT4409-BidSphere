import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Bell, User, Gavel, ChevronDown, Receipt, CreditCard, Lock, Activity, TrendingUp, ShoppingBag } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
      { to: "/user/bid/history", label: "Lịch sử đấu giá", icon: Activity  }
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex gap-6 px-6 md:px-10 py-6 flex-1">
        {/* Sidebar */}
        <aside className="w-72 flex-shrink-0 hidden lg:block">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-6">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Quản lý tài khoản</h2>
              <p className="text-xs text-gray-500 mt-1">Cài đặt và tùy chỉnh</p>
            </div>

            <nav className="p-2">
              {MENU_ITEMS.map((menu) => {
                const MenuIcon = menu.icon;
                const isOpen = openMenu === menu.id;

                return (
                  <div key={menu.id} className="mb-1">
                    {/* Menu Title */}
                    <button
                      onClick={() => toggleMenu(menu.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                        isOpen
                          ? "bg-gray-900 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MenuIcon className="w-5 h-5" />
                        <span className="font-medium text-sm">{menu.title}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Sub Menu */}
                    {isOpen && (
                      <div className="mt-1 ml-4 space-y-1">
                        {menu.items.map((item) => {
                          const ItemIcon = item.icon;

                          return (
                            <NavLink
                              key={item.to}
                              to={item.to}
                              className={({ isActive }) =>
                                `w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
                                  isActive
                                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`
                              }
                            >
                              <ItemIcon className="w-4 h-4" />
                              <span>{item.label}</span>
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

        {/* Content */}
        <section className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <Outlet />
        </section>
      </main>

      <Footer />
    </div>
  );
}