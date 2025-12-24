import {
  Check,
  Package,
  DollarSign,
  CheckCircle,
  XCircle,
} from "lucide-react";

type Props = {
  status: "PENDING" | "SHIPPED" | "PAID" | "DONE" | "CANCELLED";
};

const STEPS = [
  { key: "PENDING", label: "Thắng đấu giá", icon: Check },
  { key: "SHIPPED", label: "Người bán giao hàng", icon: Package },
  { key: "PAID", label: "Người mua thanh toán", icon: DollarSign },
  { key: "DONE", label: "Hoàn tất", icon: CheckCircle },
];

export default function OrderTimeline({ status }: Props) {
  const activeIndex = STEPS.findIndex((s) => s.key === status);

  const segmentPercent = 100 / (STEPS.length - 1);
  const progressPercent = activeIndex * segmentPercent;


  const isCancelled = status === "CANCELLED";

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* ================= DESKTOP ================= */}
        <div className="relative hidden md:block">
          {/* BACKGROUND LINE */}
          <div
            className="absolute top-6 h-1 bg-gray-200 rounded-full"
            style={{ left: "24px", right: "24px" }}
          />


          {/* ACTIVE LINE */}
          {!isCancelled && (
            <div
              className="absolute top-6 left-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700"
              style={{
                left: "24px",
                width: `calc(${progressPercent}% - 24px)`,
              }}
            />
          )}

          {/* STEPS */}
          <div className="relative z-10 flex items-start justify-between">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;

              const completed = !isCancelled && idx < activeIndex;
              const current = !isCancelled && idx === activeIndex;
              const active = completed || current;
              const cancelledStep = isCancelled && idx === activeIndex;

              return (
                <div
                  key={step.key}
                  className="flex flex-col items-center w-full"
                >
                  {/* ICON */}
                  <div
                    className={`relative w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all
                      ${
                        cancelledStep
                          ? "bg-red-500"
                          : completed
                          ? "bg-emerald-500"
                          : current
                          ? "bg-emerald-400 animate-pulse"
                          : "bg-gray-200"
                      }`}
                  >
                    {cancelledStep ? (
                      <XCircle className="w-6 h-6 text-white" />
                    ) : (
                      <Icon
                        className={`w-6 h-6 ${
                          active ? "text-white" : "text-gray-400"
                        }`}
                      />
                    )}

                    {/* PULSE RING */}
                    {current && (
                      <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-60" />
                    )}
                  </div>

                  {/* LABEL */}
                  <span
                    className={`text-sm font-medium text-center ${
                      cancelledStep
                        ? "text-red-600"
                        : active
                        ? "text-emerald-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>

                  {/* BADGE */}
                  {completed && (
                    <span className="mt-2 text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-semibold">
                      ✓ Hoàn thành
                    </span>
                  )}

                  {current && !isCancelled && (
                    <span className="mt-2 text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 font-semibold">
                      Đang xử lý
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden space-y-4">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;

            const completed = !isCancelled && idx < activeIndex;
            const current = !isCancelled && idx === activeIndex;
            const active = completed || current;
            const cancelledStep = isCancelled && idx === activeIndex;

            return (
              <div key={step.key} className="flex gap-4 items-start">
                {/* ICON */}
                <div className="flex flex-col items-center">
                  <div
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center
                      ${
                        cancelledStep
                          ? "bg-red-500"
                          : completed
                          ? "bg-emerald-500"
                          : current
                          ? "bg-emerald-400 animate-pulse"
                          : "bg-gray-200"
                      }`}
                  >
                    {cancelledStep ? (
                      <XCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Icon
                        className={`w-5 h-5 ${
                          active ? "text-white" : "text-gray-400"
                        }`}
                      />
                    )}
                  </div>

                  {/* VERTICAL LINE */}
                  {idx < STEPS.length - 1 && (
                    <div
                      className={`w-0.5 h-12 mt-2 ${
                        completed ? "bg-emerald-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>

                {/* TEXT */}
                <div className="flex-1">
                  <div
                    className={`font-medium ${
                      cancelledStep
                        ? "text-red-600"
                        : active
                        ? "text-emerald-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </div>

                  {completed && (
                    <div className="mt-1 text-xs text-emerald-600 font-semibold">
                      ✓ Hoàn thành
                    </div>
                  )}

                  {current && !isCancelled && (
                    <div className="mt-1 text-xs text-orange-600 font-semibold">
                      Đang xử lý
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CANCELLED MESSAGE */}
        {isCancelled && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
            <XCircle className="w-5 h-5" />
            <span className="font-semibold">Đơn hàng đã bị hủy</span>
          </div>
        )}
      </div>
    </div>
  );
}
