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
    <div className="w-full bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-md transition-shadow duration-300 p-6">
      <div className="mb-4 pb-3 border-b border-gray-100">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
          Thông tin giao dịch
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Người bán */}
        <div className="group flex items-start gap-3.5 p-3 rounded-xl hover:bg-blue-50/50 transition-all duration-200">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Người bán</p>
            <p className="text-sm font-bold text-gray-900 truncate">{order.sellerName}</p>
          </div>
        </div>

        {/* Mã giao dịch */}
        <div className="group flex items-start gap-3.5 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <Hash className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Mã giao dịch</p>
            <p className="text-sm font-bold text-gray-900 font-mono">{order.transactionId}</p>
          </div>
        </div>

        {/* Thời gian cập nhật */}
        <div className="group flex items-start gap-3.5 p-3 rounded-xl hover:bg-emerald-50/50 transition-all duration-200">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Cập nhật lúc</p>
            <p className="text-sm font-bold text-gray-900">
              {new Date(order.updatedAt).toLocaleString('vi-VN')}
            </p>
          </div>
        </div>

        {/* Trạng thái */}
        <div className={`group flex items-start gap-3.5 p-3 rounded-xl hover:${statusConfig.bgColor} transition-all duration-200`}>
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${statusConfig.bgColor} border-2 border-transparent group-hover:border-current flex items-center justify-center shadow-sm group-hover:shadow-md transition-all`}>
            <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Trạng thái</p>
            <p className={`text-sm font-bold ${statusConfig.color} flex items-center gap-1.5`}>
              {statusConfig.label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
