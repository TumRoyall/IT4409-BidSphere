import { Tag } from 'lucide-react';

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
  const categoryLabel = CATEGORY_MAP[order.productCategory?.toLowerCase()] || order.productCategory || "Khác";
  const estimatePrice = order.productPrice ? Number(order.productPrice) : null;
  const finalPrice = Number(order.amount);

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex flex-col md:flex-row gap-5">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={order.productImage}
            alt={order.productName}
            className="w-full md:w-32 h-32 object-cover rounded-lg border border-gray-200"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2" title={order.productName}>
            {order.productName}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {order.productDescription}
          </p>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-md">
            <Tag className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-xs font-medium text-gray-700">{categoryLabel}</span>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex flex-col gap-3 md:min-w-[180px]">
          {estimatePrice && (
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">Giá ước tính</span>
              <span className="text-base text-gray-400 line-through">
                {estimatePrice.toLocaleString()} ₫
              </span>
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-xs text-emerald-600 font-medium mb-1">Giá chốt</span>
            <span className="text-2xl font-bold text-emerald-600">
              {finalPrice.toLocaleString()} ₫
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}