import Joyride, { STATUS, type CallBackProps, type Step } from "react-joyride";
import { useState, useEffect } from "react";

interface SellerOnboardingTourProps {
    onTourComplete: () => void;
}

export default function SellerOnboardingTour({ onTourComplete }: SellerOnboardingTourProps) {
    const [run, setRun] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);

    const steps: Step[] = [
        // Step 1: Welcome - Sidebar
        {
            target: ".sidebar",
            content: "🎉 Chào mừng bạn đến với Kênh Người Bán! Hãy cùng tìm hiểu cách đưa sản phẩm lên đấu giá.",
            disableBeacon: true,
            placement: "right",
        },
        // Step 2: Dashboard menu
        {
            target: ".seller-menu-item:nth-child(1)",
            content: "📊 Dashboard - Quản lý tất cả sản phẩm của bạn tại đây.",
            placement: "right",
        },
        // Step 3: Create Product Button
        {
            target: "#btn-create-product",
            content: "🆕 Bước 1: Bấm vào đây để tạo sản phẩm mới. Sản phẩm sẽ có trạng thái DRAFT (bản nháp).",
            placement: "bottom",
            spotlightClicks: true,
        },
        // Step 4: Create Auction Button - explain pending flow
        {
            target: "#btn-create-auction",
            content: "🔨 Bước 2: Khi có sản phẩm DRAFT, bấm vào đây để tạo yêu cầu đấu giá. Sản phẩm sẽ chuyển sang trạng thái PENDING.",
            placement: "bottom",
            spotlightClicks: true,
        },
        // Step 5: Explain approval flow
        {
            target: "#btn-create-auction",
            content: "⏳ Bước 3: Admin sẽ xem xét yêu cầu. Khi được duyệt, sản phẩm chuyển thành APPROVED và phiên đấu giá bắt đầu!",
            placement: "bottom",
        },
        // Step 6: Profile menu
        {
            target: ".seller-menu-item:nth-child(2)",
            content: "👤 Hồ sơ người bán - Xem thông tin cá nhân và điểm uy tín của bạn.",
            placement: "right",
        },
        // Step 7: Auction Management menu
        {
            target: ".seller-menu-item:nth-child(3)",
            content: "📋 Quản lý đấu giá - Theo dõi các phiên đấu giá đang diễn ra, sắp tới và đã kết thúc.",
            placement: "right",
        },
        // Step 8: Orders menu
        {
            target: ".seller-menu-item:nth-child(4)",
            content: "📦 Đơn hàng - Khi có người thắng đấu giá, xử lý giao hàng và thanh toán tại đây. Hãy bắt đầu bán hàng!",
            placement: "right",
        },
    ];

    useEffect(() => {
        // Start tour after a short delay to ensure DOM is ready
        const timer = setTimeout(() => setRun(true), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, action, index, type } = data;

        // Handle step changes
        if (type === "step:after" && action === "next") {
            setStepIndex(index + 1);
        } else if (type === "step:after" && action === "prev") {
            setStepIndex(index - 1);
        }

        // Handle tour completion
        if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
            setRun(false);
            onTourComplete();
        }
    };

    return (
        <Joyride
            steps={steps}
            run={run}
            stepIndex={stepIndex}
            continuous
            showSkipButton
            showProgress
            scrollToFirstStep
            disableScrollParentFix
            callback={handleJoyrideCallback}
            locale={{
                back: "Quay lại",
                close: "Đóng",
                last: "Hoàn thành",
                next: "Tiếp theo",
                skip: "Bỏ qua",
            }}
            styles={{
                options: {
                    primaryColor: "#0b57cf",
                    zIndex: 10000,
                },
                tooltip: {
                    borderRadius: "12px",
                    padding: "20px",
                },
                buttonNext: {
                    borderRadius: "8px",
                    padding: "10px 20px",
                },
                buttonBack: {
                    marginRight: "10px",
                },
                spotlight: {
                    borderRadius: "8px",
                },
            }}
        />
    );
}
