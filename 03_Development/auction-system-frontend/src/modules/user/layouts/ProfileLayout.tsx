import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/modules/user/styles/ProfileLayout.css";

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
    <div className="profile-layout">
      <Header />

      <main className="profile-container">
        {/* ==== SIDEBAR ==== */}
        <aside className="sidebar">

            {/* --- Notification --- */}
          <div className="sidebar-group">
            <div
              className={`sidebar-title ${
                openMenu === "notification" ? "active" : ""
              }`}
              onClick={() => toggleMenu("notification")}
            >
              Thông báo
            </div>
            {openMenu === "notification" && (
              <nav className="sidebar-sub">
                <NavLink
                  to="/user/notification/system"
                  className={({ isActive }) =>
                    `sub-link ${isActive ? "active" : ""}`
                  }
                >
                  Hệ thống
                </NavLink>
                <NavLink
                  to="/user/notification/bid"
                  className={({ isActive }) =>
                    `sub-link ${isActive ? "active" : ""}`
                  }
                >
                  Đấu giá
                </NavLink>
                <NavLink
                  to="/user/notification/payment"
                  className={({ isActive }) =>
                    `sub-link ${isActive ? "active" : ""}`
                  }
                >
                  Thanh toán
                </NavLink>
              </nav>
            )}
          </div>

          {/* --- Account --- */}
          <div className="sidebar-group">
            <div
              className={`sidebar-title ${
                openMenu === "account" ? "active" : ""
              }`}
              onClick={() => toggleMenu("account")}
            >
              Tài khoản của tôi
            </div>
            {openMenu === "account" && (
              <nav className="sidebar-sub">
                <NavLink
                  to="/user/account/profile"
                  className={({ isActive }) =>
                    `sub-link ${isActive ? "active" : ""}`
                  }
                >
                  Hồ sơ cá nhân
                </NavLink>
                <NavLink
                  to="/user/account/payment"
                  className={({ isActive }) =>
                    `sub-link ${isActive ? "active" : ""}`
                  }
                >
                  Ví của tôi
                </NavLink>
                <NavLink
                  to="/user/account/reset-password"
                  className={({ isActive }) =>
                    `sub-link ${isActive ? "active" : ""}`
                  }
                >
                  Đổi mật khẩu
                </NavLink>
              </nav>
            )}
          </div>

          {/* --- Bid --- */}
          <div className="sidebar-group">
            <div
              className={`sidebar-title ${openMenu === "bid" ? "active" : ""}`}
              onClick={() => toggleMenu("bid")}
            >
              Phiên đấu giá
            </div>
            {openMenu === "bid" && (
              <nav className="sidebar-sub">
                <NavLink
                  to="/user/bid/history-bid"
                  className={({ isActive }) =>
                    `sub-link ${isActive ? "active" : ""}`
                  }
                >
                  Lịch sử đấu giá
                </NavLink>
                <NavLink
                  to="/user/bid/auction-current-joined"
                  className={({ isActive }) =>
                    `sub-link ${isActive ? "active" : ""}`
                  }
                >
                  Phiên đang tham gia
                </NavLink>
              </nav>
            )}
          </div>
        </aside>

        {/* ==== CONTENT ==== */}
        <section className="profile-content">
          <Outlet />
        </section>
      </main>

      <Footer />
    </div>
  );
}
