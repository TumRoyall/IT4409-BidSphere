import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, XCircle, DollarSign, CheckCircle, Clock, Package } from 'lucide-react';

import { afterAuctionApi } from "@/api/modules/afterAuction.api";
import { userApi } from "@/api/modules/user.api";

import OrderTimeline from "@/modules/auction/components/OrderTimeline";
import OrderProductInfo from "@/modules/auction/components/OrderProductInfo";
import OrderMetaInfo from "@/modules/auction/components/OrderMetaInfo";

const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
  PENDING: { label: "Chờ xác nhận", color: "text-amber-600", bgColor: "bg-amber-50", icon: Clock },
  PAID: { label: "Đã thanh toán", color: "text-blue-600", bgColor: "bg-blue-50", icon: DollarSign },
  SHIPPED: { label: "Đang giao hàng", color: "text-purple-600", bgColor: "bg-purple-50", icon: Package },
  DONE: { label: "Hoàn tất", color: "text-emerald-600", bgColor: "bg-emerald-50", icon: CheckCircle },
  CANCELLED: { label: "Đã hủy", color: "text-red-600", bgColor: "bg-red-50", icon: XCircle },
};

export default function OrderDetail() {
  const { txnId } = useParams<{ txnId: string }>();
  const navigate = useNavigate();

  const [userId, setUserId] = useState<number | null>(null);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Lấy userId
  useEffect(() => {
    userApi.getProfile().then(res => {
      setUserId(res.userId);
    });
  }, []);

  // Lấy order theo txnId
  useEffect(() => {
    if (!userId || !txnId) return;

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await afterAuctionApi.getWonProducts(
          userId,
          undefined,
          Number(txnId)
        );
        setOrder(res.data?.[0] ?? null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [userId, txnId]);

  // Action handlers
  const handleCancel = async () => {
    await afterAuctionApi.cancelTransaction(order.transactionId);
    navigate(-1);
  };

  const handlePay = async () => {
    await afterAuctionApi.payTransaction(order.transactionId, userId!);
    window.location.reload();
  };

  const handleDone = async () => {
    await afterAuctionApi.updateStatus(order.transactionId, "DONE");
    window.location.reload();
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Đang tải đơn hàng...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-900 font-semibold text-lg mb-2">Không tìm thấy đơn hàng</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 rounded-lg text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = STATUS_CONFIG[order.transactionStatus] || STATUS_CONFIG.PENDING;
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Trở lại
          </button>

          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${statusConfig.bgColor}`}>
            <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
            <span className={`font-semibold ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Chi tiết đơn hàng</h1>
          <p className="text-gray-600">
            Mã giao dịch: <span className="font-semibold text-gray-900">#{order.transactionId}</span>
          </p>
        </div>

        {/* Timeline Component */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <OrderTimeline status={order.transactionStatus} />
        </div>

        {/* Product Info Component */}
        <OrderProductInfo order={order} />

        {/* Meta Info Component */}
        <OrderMetaInfo order={order} />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-end">
          {order.transactionStatus === "PENDING" && (
            <button
              onClick={handleCancel}
              className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <XCircle className="w-5 h-5" />
              Hủy giao dịch
            </button>
          )}

          {order.transactionStatus === "SHIPPED" && (
            <button
              onClick={handlePay}
              className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <DollarSign className="w-5 h-5" />
              Thanh toán ngay
            </button>
          )}

          {order.transactionStatus === "PAID" && (
            <button
              onClick={handleDone}
              className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Xác nhận hoàn tất
            </button>
          )}

          {(order.transactionStatus === "DONE" || order.transactionStatus === "CANCELLED") && (
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Quay lại danh sách
            </button>
          )}
        </div>
      </div>
    </div>
  );
}