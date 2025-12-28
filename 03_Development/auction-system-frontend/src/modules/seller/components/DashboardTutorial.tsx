import Joyride, { STATUS, type CallBackProps, type Step } from "react-joyride";
import { useState, useEffect } from "react";

type TutorialType = "create-product" | "create-auction";

interface DashboardTutorialProps {
    type: TutorialType;
    onComplete: () => void;
}

export default function DashboardTutorial({ type, onComplete }: DashboardTutorialProps) {
    const [run, setRun] = useState(false);

    const createProductSteps: Step[] = [
        {
            target: "#btn-create-product",
            content: "🆕 Bấm vào đây để tạo sản phẩm mới. Sản phẩm mới sẽ tự động có trạng thái DRAFT (bản nháp).",
            disableBeacon: true,
            placement: "bottom",
        },
        {
            target: ".modal-product-content",
            content: "📝 Điền đầy đủ thông tin: Tên, mô tả, giá khởi điểm, hình ảnh. Sau đó bấm 'Create' để lưu sản phẩm DRAFT.",
            placement: "left",
            disableOverlay: true,
        },
    ];

    const createAuctionSteps: Step[] = [
        {
            target: "#btn-create-auction",
            content: "🔨 Bấm vào đây để tạo yêu cầu đấu giá cho sản phẩm DRAFT. Sản phẩm sẽ chuyển sang trạng thái PENDING.",
            disableBeacon: true,
            placement: "bottom",
        },
        {
            target: ".modal",
            content: "📋 Chọn sản phẩm DRAFT → Đặt thời gian → Bấm 'Tạo phiên'. Admin sẽ duyệt và chuyển thành APPROVED!",
            placement: "left",
            disableOverlay: true,
        },
    ];

    const steps = type === "create-product" ? createProductSteps : createAuctionSteps;

    useEffect(() => {
        const timer = setTimeout(() => setRun(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status, action } = data;
        if (status === STATUS.FINISHED || status === STATUS.SKIPPED || action === "close") {
            setRun(false);
            onComplete();
        }
    };

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous
            showSkipButton
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
            }}
        />
    );
}
