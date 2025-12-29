import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "@/modules/user/styles/ProfileLayout.css";
import { LayoutDashboard, User, Gavel, ShoppingBag } from "lucide-react";
import GlobalSnow from "@/components/christmas/GlobalSnow";
import ReindeerScene from "@/components/christmas/ReindeerScene";
import ChristmasLightsSide from "@/components/christmas/ChristmasLightsSide";
import SellerOnboardingTour from "@/modules/seller/components/SellerOnboardingTour";
import SellerTermsModal from "@/modules/seller/components/SellerTermsModal";
import { useAuth } from "@/hooks/useAuth";
import { userApi } from "@/api/modules/user.api";

export default function SellerLayout() {
    const location = useLocation();
    const { user, setUser } = useAuth();
    const [showTour, setShowTour] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [upgrading, setUpgrading] = useState(false);

    // Get user role from context (synced with DB via /users/me API)
    const userRole = user?.role || user?.roleName;

    // Check if user is BIDDER - show tour based on DB role, not localStorage
    useEffect(() => {
        if (userRole === "BIDDER") {
            // Delay to ensure DOM is ready
            const timer = setTimeout(() => setShowTour(true), 300);
            return () => clearTimeout(timer);
        }
    }, [userRole]);

    // After tour completes, show terms modal
    const handleTourComplete = () => {
        setShowTour(false);
        setShowTermsModal(true);
    };

    // User accepts terms - upgrade role
    const handleAcceptTerms = async () => {
        setUpgrading(true);
        try {
            const response = await userApi.upgradeToSeller();

            // Update local user state with new role
            if (user) {
                const updatedUser = {
                    ...user,
                    role: "SELLER",
                    roleName: "SELLER"
                };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
            }

            setShowTermsModal(false);
        } catch (error) {
            console.error("❌ Failed to upgrade role:", error);
            alert("Không thể nâng cấp tài khoản. Vui lòng thử lại sau.");
        } finally {
            setUpgrading(false);
        }
    };

    // User declines - redirect back or just hide modal
    const handleDeclineTerms = () => {
        setShowTermsModal(false);
        // Could navigate back: navigate("/");
    };

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

    // Check if current route is a form page (create or edit product/auction)
    const isFormPage =
        location.pathname.includes('/products/create') ||
        location.pathname.includes('/products/') && location.pathname.includes('/edit') ||
        location.pathname.includes('/auctions/create') ||
        location.pathname.includes('/auctions/') && location.pathname.includes('/edit');

    if (isFormPage) {
        return (
            <div className="relative min-h-screen">
                <GlobalSnow />
                <ReindeerScene />
                <ChristmasLightsSide />
                <Outlet />
            </div>
        );
    }

    return (
        <div className="profile-layout relative">
            <GlobalSnow />
            <ReindeerScene />
            <ChristmasLightsSide />

            {/* Onboarding Tour for BIDDER users */}
            {showTour && <SellerOnboardingTour onTourComplete={handleTourComplete} />}

            {/* Terms Modal after tour */}
            {showTermsModal && (
                <SellerTermsModal
                    onAccept={handleAcceptTerms}
                    onDecline={handleDeclineTerms}
                    loading={upgrading}
                />
            )}

            <div className="relative z-50">
                <Header />
            </div>

            <main className="profile-container relative z-10">
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
