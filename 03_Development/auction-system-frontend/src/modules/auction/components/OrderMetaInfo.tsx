import { User, Hash, Clock, CheckCircle, Package, DollarSign, XCircle } from 'lucide-react';

type Props = {
  order: any;
};

const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
  PENDING: {
    label: "Chờ xác nhận",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    icon: Clock
  },
  PAID: {
    label: "Đã thanh toán",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    icon: DollarSign
  },
  SHIPPED: {
    label: "Đang giao hàng",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    icon: Package
  },
  DONE: {
    label: "Hoàn tất",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    icon: CheckCircle
  },
  CANCELLED: {
    label: "Đã hủy",
    color: "text-red-600",
    bgColor: "bg-red-50",
    icon: XCircle
  },
};

export default function OrderMetaInfo({ order }: Props) {
  const statusRaw = String(order?.transactionStatus ?? "PENDING").toUpperCase();
  const statusConfig = STATUS_CONFIG[statusRaw] || STATUS_CONFIG.PENDING;
  const StatusIcon = statusConfig.icon;

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Người bán */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 mb-0.5">Người bán</p>
            <p className="text-sm font-semibold text-gray-900 truncate">{order.sellerName}</p>
          </div>
        </div>

        {/* Mã giao dịch */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
            <Hash className="w-5 h-5 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 mb-0.5">Mã giao dịch</p>
            <p className="text-sm font-semibold text-gray-900">{order.transactionId}</p>
          </div>
        </div>

        {/* Thời gian cập nhật */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
            <Clock className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 mb-0.5">Cập nhật lúc</p>
            <p className="text-sm font-semibold text-gray-900">
              {new Date(order.updatedAt).toLocaleString('vi-VN')}
            </p>
          </div>
        </div>

        {/* Trạng thái */}
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${statusConfig.bgColor} flex items-center justify-center`}>
            <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 mb-0.5">Trạng thái</p>
            <p className={`text-sm font-semibold ${statusConfig.color}`}>
              {statusConfig.label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
