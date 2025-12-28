import { useState } from "react";
import "@/modules/seller/styles/SellerTermsModal.css";

interface SellerTermsModalProps {
    onAccept: () => void;
    onDecline: () => void;
    loading?: boolean;
}

export default function SellerTermsModal({ onAccept, onDecline, loading }: SellerTermsModalProps) {
    const [agreed, setAgreed] = useState(false);

    return (
        <div className="seller-terms-overlay">
            <div className="seller-terms-modal">
                <div className="seller-terms-header">
                    <h2>🎉 Chào mừng đến với Cộng đồng Người bán!</h2>
                    <p>Vui lòng đọc và đồng ý với các điều khoản để trở thành Seller</p>
                </div>

                <div className="seller-terms-content">
                    <h3>📋 Điều khoản & Điều kiện</h3>
                    <div className="terms-text">
                        <p><strong>1. Trách nhiệm của Người bán:</strong></p>
                        <ul>
                            <li>Đăng sản phẩm chính xác, đầy đủ thông tin và hình ảnh thực tế</li>
                            <li>Đảm bảo chất lượng sản phẩm như mô tả</li>
                            <li>Giao hàng đúng hẹn sau khi đấu giá kết thúc</li>
                            <li>Hỗ trợ người mua khi có vấn đề phát sinh</li>
                        </ul>

                        <p><strong>2. Quy định về đấu giá:</strong></p>
                        <ul>
                            <li>Không được hủy phiên đấu giá sau khi có người đặt giá</li>
                            <li>Chịu phí dịch vụ theo quy định của sàn</li>
                            <li>Tuân thủ quy trình xác minh sản phẩm</li>
                        </ul>

                        <p><strong>3. Vi phạm & Xử lý:</strong></p>
                        <ul>
                            <li>Vi phạm lần 1: Cảnh cáo</li>
                            <li>Vi phạm lần 2: Khóa tài khoản vĩnh viễn</li>
                        </ul>
                    </div>
                </div>

                <div className="seller-terms-footer">
                    <label className="terms-checkbox">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                        />
                        <span>Tôi đã đọc và đồng ý với các điều khoản trên</span>
                    </label>

                    <div className="terms-actions">
                        <button
                            className="btn-decline"
                            onClick={onDecline}
                            disabled={loading}
                        >
                            Để sau
                        </button>
                        <button
                            className="btn-accept"
                            onClick={onAccept}
                            disabled={!agreed || loading}
                        >
                            {loading ? "Đang xử lý..." : "Đồng ý & Trở thành Seller"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
