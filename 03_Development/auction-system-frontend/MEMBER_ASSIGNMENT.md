# Auction System Frontend - Module Assignment

## 📋 Tổng quan dự án đã hoàn thành

✅ **Tất cả cấu trúc file đã được tạo sẵn** - Sẵn sàng để các member bắt đầu implement

---

## 👥 Phân công chi tiết theo Member

### 👤 **MEMBER 1 - User & Authentication**

**📂 Thư mục làm việc:**
```
src/api/modules/
  ├── auth.api.ts          ← Implement login, register, logout API
  └── user.api.ts          ← Implement user profile, balance API

src/modules/auth/
  ├── pages/
  │   ├── LoginPage.tsx    ← Form đăng nhập
  │   └── RegisterPage.tsx ← Form đăng ký
  └── components/
      └── AuthForm.tsx     ← Component form auth dùng chung

src/modules/user/
  ├── pages/
  │   ├── Profile.tsx      ← Hiển thị & chỉnh sửa profile
  │   └── Balance.tsx      ← Quản lý số dư, nạp/rút tiền
  └── components/
      └── UserInfo.tsx     ← Component hiển thị thông tin user

src/contexts/
  └── AuthContext.tsx      ← Context quản lý auth state (đã có code mẫu)
```

**🎯 Nhiệm vụ:**
- [ ] Implement trang Login với form validation
- [ ] Implement trang Register
- [ ] Implement trang Profile (xem & cập nhật thông tin)
- [ ] Implement trang Balance (hiển thị số dư, lịch sử transactions)
- [ ] Tạo form nạp tiền/rút tiền
- [ ] Hoàn thiện AuthContext để các member khác sử dụng

**🔗 API Endpoints cần gọi:**
- POST `/auth/login`
- POST `/auth/register`
- GET `/auth/me`
- GET `/users/{id}`
- PUT `/users/{id}`
- GET `/users/{id}/balance`
- POST `/users/deposit`
- POST `/users/withdraw`

---

### 📦 **MEMBER 2 - Product & Image Management**

**📂 Thư mục làm việc:**
```
src/api/modules/
  └── product.api.ts       ← Implement product & image API

src/modules/product/
  ├── pages/
  │   ├── ProductList.tsx     ← Danh sách sản phẩm (filter, search)
  │   ├── ProductDetail.tsx   ← Chi tiết sản phẩm (xem ảnh, info)
  │   └── CreateProduct.tsx   ← Form tạo sản phẩm mới (seller)
  └── components/
      ├── ProductCard.tsx     ← Card hiển thị sản phẩm trong list
      └── ImageUpload.tsx     ← Component upload nhiều ảnh
```

**🎯 Nhiệm vụ:**
- [ ] Implement trang danh sách sản phẩm với filter (category, status)
- [ ] Implement trang chi tiết sản phẩm với gallery ảnh
- [ ] Implement form tạo sản phẩm (seller)
- [ ] Implement component upload ảnh (multiple files)
- [ ] Xử lý set thumbnail cho sản phẩm
- [ ] (Admin) Implement approve/reject sản phẩm

**🔗 API Endpoints cần gọi:**
- GET `/products` (with filters)
- GET `/products/{id}`
- POST `/products`
- PUT `/products/{id}`
- DELETE `/products/{id}`
- GET `/products/{id}/images`
- POST `/products/{id}/images`
- DELETE `/images/{id}`
- PATCH `/products/{id}/thumbnail`

---

### 🔨 **MEMBER 3 - Auction & Bidding**

**📂 Thư mục làm việc:**
```
src/api/modules/
  └── auction.api.ts       ← Implement auction & bid API

src/modules/auction/
  ├── pages/
  │   ├── AuctionList.tsx     ← Danh sách phiên đấu giá
  │   ├── AuctionDetail.tsx   ← Chi tiết auction + real-time bid
  │   └── CreateAuction.tsx   ← Tạo phiên đấu giá từ product
  └── components/
      ├── AuctionCard.tsx     ← Card hiển thị auction
      └── BidForm.tsx         ← Form đặt giá (+ auto-bid)
```

**🎯 Nhiệm vụ:**
- [ ] Implement trang danh sách auction (filter theo status)
- [ ] Implement trang chi tiết auction
  - Hiển thị thông tin sản phẩm
  - Danh sách bids (real-time update)
  - Form đặt giá với validation
  - Countdown timer đến end_time
- [ ] Implement form tạo auction từ product
- [ ] Implement auto-bid feature
- [ ] Xử lý đóng auction & xác định winner

**🔗 API Endpoints cần gọi:**
- GET `/auctions` (with filters)
- GET `/auctions/{id}`
- POST `/auctions`
- PATCH `/auctions/{id}/close`
- GET `/auctions/{id}/bids`
- POST `/bids`
- GET `/users/{id}/bids`
- GET `/auctions/{id}/winner`

---

### 💳 **MEMBER 4 - Payment & Transaction**

**📂 Thư mục làm việc:**
```
src/api/modules/
  └── payment.api.ts       ← Implement transaction API

src/modules/payment/
  ├── pages/
  │   ├── DepositPage.tsx      ← Trang nạp tiền
  │   └── PaymentHistory.tsx   ← Lịch sử giao dịch
  └── components/
      └── DepositForm.tsx      ← Form nạp tiền
```

**🎯 Nhiệm vụ:**
- [ ] Implement trang nạp tiền (DepositPage)
- [ ] Implement lịch sử giao dịch sau đấu giá
  - Giao dịch với role buyer
  - Giao dịch với role seller
  - Filter theo status
- [ ] Implement flow thanh toán:
  - Buyer thanh toán
  - Seller xác nhận gửi hàng
  - Buyer xác nhận nhận hàng
- [ ] Implement cancel/refund transaction
- [ ] Hiển thị tracking number

**🔗 API Endpoints cần gọi:**
- GET `/transactions/{id}`
- GET `/users/{id}/auction-transactions`
- POST `/transactions/{id}/payment`
- PATCH `/transactions/{id}/ship`
- PATCH `/transactions/{id}/complete`
- PATCH `/transactions/{id}/cancel`
- POST `/transactions/{id}/refund`
- GET `/users/{id}/payment-history`

---

### ⭐ **MEMBER 5 - Feedback & Notification**

**📂 Thư mục làm việc:**
```
src/api/modules/
  └── feedback.api.ts      ← Implement feedback & notification API

src/modules/feedback/
  ├── pages/
  │   ├── FeedbackList.tsx        ← Danh sách feedback
  │   ├── CreateFeedback.tsx      ← Tạo feedback mới
  │   └── NotificationList.tsx    ← Danh sách thông báo
  └── components/
      ├── FeedbackCard.tsx        ← Card hiển thị feedback
      └── NotificationItem.tsx    ← Item notification
```

**🎯 Nhiệm vụ:**
- [ ] Implement trang danh sách feedback cho auction
- [ ] Implement form tạo feedback (rating + comment)
- [ ] Implement trang notifications
  - Hiển thị list notifications
  - Mark as read (single & all)
  - Delete notification
  - Badge số lượng unread
- [ ] (Admin) Implement admin logs viewer
- [ ] Real-time notification (optional: WebSocket)

**🔗 API Endpoints cần gọi:**
- GET `/auctions/{id}/feedback`
- POST `/feedback`
- PUT `/feedback/{id}`
- DELETE `/feedback/{id}`
- GET `/users/{id}/notifications`
- PATCH `/notifications/{id}/read`
- PATCH `/users/{id}/notifications/read-all`
- DELETE `/notifications/{id}`
- GET `/admin/logs`
- POST `/admin/logs`

---

## 🔧 Files dùng chung (đã implement sẵn)

### ✅ API Layer
- `src/api/axiosClient.ts` - Cấu hình axios với interceptors

### ✅ Common Components
- `src/components/common/Button.tsx` - Button component
- `src/components/common/Input.tsx` - Input field với validation
- `src/components/common/Modal.tsx` - Modal dialog
- `src/components/common/Loading.tsx` - Loading spinner

### ✅ Layout Components
- `src/components/layout/Header.tsx` - Navigation header
- `src/components/layout/Footer.tsx` - Footer
- `src/components/layout/Sidebar.tsx` - Dashboard sidebar

### ✅ Layouts
- `src/layouts/MainLayout.tsx` - Layout với header + footer
- `src/layouts/AuthLayout.tsx` - Layout cho login/register
- `src/layouts/DashboardLayout.tsx` - Layout với sidebar

### ✅ Hooks & Context
- `src/hooks/useAuth.ts` - Hook để access auth context
- `src/hooks/useFetch.ts` - Hook fetch data với loading/error
- `src/contexts/AuthContext.tsx` - Auth context provider

### ✅ Utils
- `src/utils/format.ts` - Format functions (date, currency)
- `src/utils/constants.ts` - Application constants

---

## 📝 Workflow cho mỗi Member

1. **Clone repo và checkout branch mới**
   ```bash
   git checkout -b feature/member-X-module-name
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Đọc file API đã được define sẵn** trong `src/api/modules/`

4. **Implement pages và components** theo TODO comments

5. **Test locally**
   ```bash
   npm run dev
   ```

6. **Commit và push**
   ```bash
   git add .
   git commit -m "[Member X] Module: Description"
   git push origin feature/member-X-module-name
   ```

7. **Tạo Pull Request** để review

---

## 🚀 Getting Started

```bash
# 1. Clone repository
git clone <repo-url>
cd auction-system-frontend

# 2. Install dependencies
npm install

# 3. Install thêm packages cần thiết
npm install axios react-router-dom

# 4. Setup environment
cp .env.example .env
# Chỉnh VITE_API_BASE_URL trong .env

# 5. Run development server
npm run dev
```

---




