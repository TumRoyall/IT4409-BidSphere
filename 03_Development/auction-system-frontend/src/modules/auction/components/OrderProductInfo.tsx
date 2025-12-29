import { Tag, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { userReportApi } from '@/api/modules/userReport.api';
import { useAuth } from '@/hooks/useAuth';

type Props = {
  order: any;
};

const CATEGORY_MAP: Record<string, string> = {
  electronics: "Điện tử",
  fashion: "Thời trang",
  vehicle: "Xe cộ",
  jewelry: "Trang sức",
  home: "Nhà cửa",
  garden: "Nhà & Vườn",
  grocery: "Tiêu dùng",
  other: "Khác",
};

export default function OrderProductInfo({ order }: Props) {
  const { user } = useAuth();
  const categoryLabel = CATEGORY_MAP[order.productCategory?.toLowerCase()] || order.productCategory || "Khác";
  const estimatePrice = order.productPrice ? Number(order.productPrice) : null;
  const finalPrice = Number(order.amount);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [reportSaving, setReportSaving] = useState(false);

  const submitReport = async () => {
    if (!reportContent.trim()) {
      toast.error('Vui lòng nhập nội dung báo cáo');
      return;
    }
    if (!user?.id) {
      toast.error('Bạn cần đăng nhập để báo cáo');
      return;
    }
    try {
      setReportSaving(true);
      await userReportApi.create({ 
        userId: user.id, 
        content: reportContent.trim(),
        sellerId: order.sellerId 
      });
      toast.success('Báo cáo đã được gửi thành công!');
      setReportContent('');
      setIsReportOpen(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Gửi báo cáo thất bại');
    } finally {
      setReportSaving(false);
    }
  };

  return (
    <>
    <div className="w-full bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden relative">
      {/* Report Button */}
      <button
        className="absolute top-4 right-4 inline-flex items-center justify-center w-8 h-8 rounded-full border-none bg-gradient-to-br from-red-500 to-red-600 text-white cursor-pointer shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 z-10"
        title="Báo cáo vấn đề"
        onClick={() => setIsReportOpen(true)}
      >
        <AlertTriangle size={16} />
      </button>

      <div className="flex flex-col md:flex-row gap-6 p-6">
        {/* Product Image */}
        <div className="flex-shrink-0 group">
          <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 shadow-sm group-hover:shadow-lg transition-all duration-300">
            <img
              src={order.productImage}
              alt={order.productName}
              className="w-full md:w-36 h-36 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2.5 line-clamp-2 leading-tight" title={order.productName}>
              {order.productName}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {order.productDescription}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200/50 w-fit">
            <div className="p-1 bg-white rounded-md">
              <Tag className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{categoryLabel}</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex flex-col gap-4 md:min-w-[200px] bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-xl p-5 border border-emerald-200/30">
          {estimatePrice && (
            <div className="flex flex-col pb-3 border-b border-emerald-200/40">
              <span className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Giá ước tính</span>
              <span className="text-lg text-gray-400 line-through font-medium">
                {estimatePrice.toLocaleString()} ₫
              </span>
            </div>
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Giá chốt</span>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {finalPrice.toLocaleString()} ₫
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Report Modal */}
    {isReportOpen && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]">
        <div className="w-[520px] max-w-[95vw] bg-white border border-gray-200 rounded-2xl shadow-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Báo cáo vấn đề</h3>
            <button
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsReportOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nội dung báo cáo</label>
            <textarea
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              placeholder="Mô tả vấn đề bạn gặp phải..."
            />
          </div>
          <div className="flex items-center justify-end gap-3">
            <button
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              onClick={() => setIsReportOpen(false)}
            >
              Hủy
            </button>
            <button
              className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              onClick={submitReport}
              disabled={reportSaving}
            >
              {reportSaving ? 'Đang gửi...' : 'Gửi báo cáo'}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}