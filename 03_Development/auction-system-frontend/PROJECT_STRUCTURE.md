# BidSphere Frontend - Cấu trúc dự án

## 📁 Cây thư mục đầy đủ

```
auction-system-frontend/
│
├── public/                          # Static files
│   ├── favicon.ico
│   └── logo.png
│
├── src/
│   ├── api/                        # API Layer
│   │   ├── axiosClient.ts         # Cấu hình axios, interceptors, base URL
│   │   └── modules/               # API modules theo chức năng
│   │       ├── auth.api.ts        # Member 1: Login, Register, Logout
│   │       ├── user.api.ts        # Member 1: Profile, Balance, Transactions
│   │       ├── product.api.ts     # Member 2: Products, Images
│   │       ├── auction.api.ts     # Member 3: Auctions, Bids
│   │       ├── payment.api.ts     # Member 4: Transactions after auction
│   │       └── feedback.api.ts    # Member 5: Feedback, Notifications, AdminLog
│   │
│   ├── assets/                     # Tài nguyên tĩnh
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/                 # Shared Components
│   │   ├── common/                # Common reusable components
│   │   │   ├── Button.tsx         # Button component với variants
│   │   │   ├── Input.tsx          # Input field với validation
│   │   │   ├── Modal.tsx          # Modal dialog
│   │   │   ├── Loading.tsx        # Loading spinner
│   │   │   └── index.ts           # Export tất cả common components
│   │   │
│   │   └── layout/                # Layout components
│   │       ├── Header.tsx         # Navigation header
│   │       ├── Footer.tsx         # Footer
│   │       ├── Sidebar.tsx        # Dashboard sidebar
│   │       └── index.ts           # Export layout components
│   │
│   ├── contexts/                   # React Contexts
│   │   └── AuthContext.tsx        # Authentication context & provider
│   │
│   ├── hooks/                      # Custom Hooks
│   │   ├── useAuth.ts             # Hook để sử dụng AuthContext
│   │   └── useFetch.ts            # Hook để fetch data với loading/error states
│   │
│   ├── layouts/                    # Page Layouts
│   │   ├── MainLayout.tsx         # Layout chính với header/footer
│   │   ├── AuthLayout.tsx         # Layout cho trang login/register
│   │   └── DashboardLayout.tsx    # Layout cho dashboard với sidebar
│   │
│   ├── modules/                    # Feature Modules (chia theo member)
│   │   │
│   │   ├── auth/                  # 👤 MEMBER 1 - Authentication
│   │   │   ├── pages/
│   │   │   │   ├── LoginPage.tsx          # Trang đăng nhập
│   │   │   │   └── RegisterPage.tsx       # Trang đăng ký
│   │   │   └── components/
│   │   │       └── AuthForm.tsx           # Form component tái sử dụng
│   │   │
│   │   ├── user/                  # 👤 MEMBER 1 - User Management
│   │   │   ├── pages/
│   │   │   │   ├── Profile.tsx            # Trang profile (xem/sửa thông tin)
│   │   │   │   └── Balance.tsx            # Trang quản lý số dư, nạp/rút tiền
│   │   │   └── components/
│   │   │       └── UserInfo.tsx           # Component hiển thị thông tin user
│   │   │
│   │   ├── product/               # 📦 MEMBER 2 - Product & Image
│   │   │   ├── pages/
│   │   │   │   ├── ProductList.tsx        # Danh sách sản phẩm
│   │   │   │   ├── ProductDetail.tsx      # Chi tiết sản phẩm
│   │   │   │   └── CreateProduct.tsx      # Tạo sản phẩm mới (seller)
│   │   │   └── components/
│   │   │       ├── ProductCard.tsx        # Card hiển thị sản phẩm
│   │   │       └── ImageUpload.tsx        # Component upload ảnh
│   │   │
│   │   ├── auction/               # 🔨 MEMBER 3 - Auction & Bid
│   │   │   ├── pages/
│   │   │   │   ├── AuctionList.tsx        # Danh sách phiên đấu giá
│   │   │   │   ├── AuctionDetail.tsx      # Chi tiết phiên đấu giá + đặt giá
│   │   │   │   └── CreateAuction.tsx      # Tạo phiên đấu giá
│   │   │   └── components/
│   │   │       ├── AuctionCard.tsx        # Card hiển thị auction
│   │   │       └── BidForm.tsx            # Form đặt giá thầu
│   │   │
│   │   ├── payment/               # 💳 MEMBER 4 - Transaction After Auction
│   │   │   ├── pages/
│   │   │   │   ├── DepositPage.tsx        # Trang nạp tiền
│   │   │   │   └── PaymentHistory.tsx     # Lịch sử giao dịch
│   │   │   └── components/
│   │   │       └── DepositForm.tsx        # Form nạp tiền
│   │   │
│   │   └── feedback/              # ⭐ MEMBER 5 - Feedback & Notification
│   │       ├── pages/
│   │       │   ├── FeedbackList.tsx       # Danh sách feedback
│   │       │   ├── CreateFeedback.tsx     # Tạo feedback mới
│   │       │   └── NotificationList.tsx   # Danh sách thông báo
│   │       └── components/
│   │           ├── FeedbackCard.tsx       # Card hiển thị feedback
│   │           └── NotificationItem.tsx   # Item notification
│   │
│   ├── routes/                     # React Router Configuration
│   │   ├── index.tsx              # Cấu hình tất cả routes
│   │   └── ProtectedRoute.tsx     # Component bảo vệ routes cần auth
│   │
│   ├── store/                      # State Management
│   │   └── index.ts               # Redux/Zustand store (tuỳ chọn)
│   │
│   ├── utils/                      # Utility Functions
│   │   ├── format.ts              # Format date, currency, text
│   │   └── constants.ts           # Constants (API URLs, roles, status)
│   │
│   ├── App.tsx                     # Root component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
│
├── .env.example                    # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🎯 Phân công Module theo Member

### 👤 **Member 1 - User/Auth** (`/user`, `/auth`)
**Bảng: User, AccountTransaction**

**Nhiệm vụ:**
- ✅ API: `auth.api.ts`, `user.api.ts`
- ✅ Pages: `LoginPage`, `RegisterPage`, `Profile`, `Balance`
- ✅ Components: `AuthForm`, `UserInfo`
- ✅ Context: `AuthContext.tsx`

**Luồng:**
1. Đăng ký/Đăng nhập → JWT token
2. Nạp/Rút tiền → AccountTransaction
3. Quản lý profile, xem số dư

---

### 📦 **Member 2 - Product/Image** (`/product`)
**Bảng: Product, Image**

**Nhiệm vụ:**
- ✅ API: `product.api.ts`
- ✅ Pages: `ProductList`, `ProductDetail`, `CreateProduct`
- ✅ Components: `ProductCard`, `ImageUpload`

**Luồng:**
1. Seller tạo sản phẩm → status = 'WAITING'
2. Upload ảnh → lưu vào Image
3. Admin duyệt → status = 'ONGOING'

---

### 🔨 **Member 3 - Auction/Bid** (`/auction`)
**Bảng: Auction, Bid**

**Nhiệm vụ:**
- ✅ API: `auction.api.ts`
- ✅ Pages: `AuctionList`, `AuctionDetail`, `CreateAuction`
- ✅ Components: `AuctionCard`, `BidForm`

**Luồng:**
1. Tạo phiên đấu giá từ Product
2. User đặt giá → cập nhật highest_current_price
3. Kết thúc → status = 'CLOSED', xác định winner

---

### 💳 **Member 4 - Transaction After Auction** (`/payment`)
**Bảng: TransactionAfterAuction, AccountTransaction**

**Nhiệm vụ:**
- ✅ API: `payment.api.ts`
- ✅ Pages: `DepositPage`, `PaymentHistory`
- ✅ Components: `DepositForm`

**Luồng:**
1. Auction kết thúc → tạo TransactionAfterAuction
2. Buyer thanh toán → status = 'PAID'
3. Seller gửi hàng → status = 'SHIPPED'
4. Buyer xác nhận → status = 'DONE'

---

### ⭐ **Member 5 - Feedback/Notification** (`/feedback`)
**Bảng: Feedback, Notification, AdminLog**

**Nhiệm vụ:**
- ✅ API: `feedback.api.ts`
- ✅ Pages: `FeedbackList`, `CreateFeedback`, `NotificationList`
- ✅ Components: `FeedbackCard`, `NotificationItem`

**Luồng:**
1. Transaction hoàn tất → tạo Feedback
2. Sự kiện xảy ra → tạo Notification
3. Admin thao tác → ghi AdminLog

---

## 📦 Công nghệ sử dụng

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **TailwindCSS** - Styling (optional)
- **Redux/Zustand** - State management (tuỳ chọn)

---

## 🚀 Hướng dẫn bắt đầu

### 1. Clone repo và install dependencies
```bash
cd auction-system-frontend
npm install
```

### 2. Setup environment variables
```bash
cp .env.example .env
# Chỉnh sửa VITE_API_BASE_URL trong .env
```

### 3. Install các package cần thiết (nếu chưa có)
```bash
npm install axios react-router-dom
npm install -D @types/node
```

### 4. Chạy development server
```bash
npm run dev
```

---

## 📝 Quy tắc làm việc

### 1. **Đặt tên file/folder**
- Component: PascalCase (`ProductCard.tsx`)
- Util/API: camelCase (`format.ts`, `auth.api.ts`)
- Folder: lowercase (`components`, `modules`)

### 2. **Commit message**
```
[Member X] Module: Brief description

VD: [Member 2] Product: Add ProductList page
```

### 3. **Branch naming**
```
feature/member-X-module-name

VD: feature/member-2-product-list
```

### 4. **Mỗi member làm việc trên module của mình**
- Member 1: `src/modules/auth/` + `src/modules/user/`
- Member 2: `src/modules/product/`
- Member 3: `src/modules/auction/`
- Member 4: `src/modules/payment/`
- Member 5: `src/modules/feedback/`

---

## 🔧 Giải thích các file chính

### `src/api/axiosClient.ts`
- Cấu hình axios với baseURL
- Interceptor để thêm token vào header
- Xử lý refresh token khi hết hạn
- Xử lý lỗi chung

### `src/api/modules/*.api.ts`
- Chứa các function gọi API cho từng module
- Export các interface TypeScript cho request/response
- Mỗi member implement API của module mình

### `src/contexts/AuthContext.tsx`
- Quản lý state authentication (user, token)
- Provide methods: login, register, logout
- Được sử dụng bởi useAuth hook

### `src/components/common/`
- Components dùng chung: Button, Input, Modal, Loading
- Có thể customize thêm theo nhu cầu

### `src/components/layout/`
- Header: Navigation bar
- Footer: Footer với links
- Sidebar: Menu cho dashboard

### `src/layouts/`
- **MainLayout**: Header + Content + Footer
- **AuthLayout**: Layout đơn giản cho login/register
- **DashboardLayout**: Header + Sidebar + Content

### `src/routes/index.tsx`
- Định nghĩa tất cả routes của app
- Gắn layout phù hợp cho từng route
- VD: `/login` → AuthLayout, `/dashboard` → DashboardLayout

### `src/routes/ProtectedRoute.tsx`
- Component kiểm tra authentication
- Redirect về /login nếu chưa đăng nhập
- Dùng để bảo vệ các trang cần auth

### `src/utils/format.ts`
- Các function format: currency, date, text
- VD: `formatCurrency(100000)` → "100,000 VND"

### `src/utils/constants.ts`
- Định nghĩa các constants: API_BASE_URL, USER_ROLES, STATUS
- Tránh hardcode values

---

## ✅ Checklist cho mỗi Member

- [ ] Hiểu rõ luồng nghiệp vụ của module mình
- [ ] Review các API đã được define sẵn
- [ ] Implement pages theo TODO comments
- [ ] Implement components theo TODO comments
- [ ] Test các chức năng cơ bản
- [ ] Commit và push code lên branch của mình
- [ ] Tạo Pull Request để review

---

## 🤝 Hợp tác giữa các Member

- **Member 1** cung cấp AuthContext cho các member khác dùng
- **Member 2** cung cấp ProductCard cho Member 3 dùng trong AuctionDetail
- **Member 3** cung cấp dữ liệu auction cho Member 4, 5
- **Member 4** xử lý payment sau khi auction của Member 3 kết thúc
- **Member 5** tạo notification cho tất cả các sự kiện

---

## 📞 Liên hệ

Nếu có thắc mắc về cấu trúc hoặc phân công, liên hệ team lead hoặc tạo issue trên GitHub.

---

**Happy Coding! 🚀**
