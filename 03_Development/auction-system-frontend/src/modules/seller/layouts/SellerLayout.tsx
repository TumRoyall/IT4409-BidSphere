import { NavLink, Outlet, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/modules/user/styles/ProfileLayout.css";
import { LayoutDashboard, User, Gavel, ShoppingBag } from "lucide-react";

export default function SellerLayout() {
    const location = useLocation();

    const menuItems = [
        {
            path: "/seller/dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
        },
        {
            path: "/seller/profile",
            label: "Hồ sơ người bán",
            icon: User,
        },
        {
            path: "/seller/auctions",
            label: "Quản lý đấu giá",
            icon: Gavel,
        },
        {
            path: "/seller/orders",
            label: "Đơn hàng cần xử lý",
            icon: ShoppingBag,
        },
    ];

    return (
        <div className="profile-layout">
            <Header />

            <main className="profile-container">
                {/* ==== SIDEBAR ==== */}
                <aside className="sidebar">
                    <div className="sidebar-header">
                        <h3 style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#6b7280",
                            padding: "8px 14px",
                            marginBottom: "8px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                        }}>
                            Kênh người bán
                        </h3>
                    </div>

                    <nav className="sidebar-nav">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path ||
                                (item.path === "/seller/dashboard" && location.pathname === "/seller");

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={`seller-menu-item ${isActive ? "active" : ""}`}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        padding: "12px 14px",
                                        borderRadius: "8px",
                                        textDecoration: "none",
                                        color: isActive ? "#0b57cf" : "#374151",
                                        backgroundColor: isActive ? "#dce9ff" : "transparent",
                                        fontWeight: isActive ? 600 : 400,
                                        marginBottom: "4px",
                                        transition: "all 0.2s ease",
                                    }}
                                >
                                    <Icon size={18} />
                                    <span>{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </nav>
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
