# 🎨 BidSphere Frontend - Cấu Trúc Dự Án

> **Updated:** 2025-12-23  
> **Tech Stack:** React 19 | TypeScript 5.9 | Vite 7.1 | TailwindCSS 3.4

---

## 📁 Cây thư mục

```
auction-system-frontend/
│
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.cjs
├── .env
│
└── src/
    ├── main.tsx                      # Entry point
    ├── App.tsx                       # Root component
    ├── index.css                     # Global styles
    │
    ├── api/                          # 🌐 API Layer
    │   ├── axiosClient.ts            # Axios config + interceptors
    │   └── modules/
    │       ├── auth.api.ts
    │       ├── user.api.ts
    │       ├── auction.api.ts
    │       ├── bid.api.ts
    │       ├── product.api.ts
    │       ├── seller.api.ts
    │       ├── payment.api.ts
    │       ├── feedback.api.ts
    │       ├── adminUser.api.ts
    │       ├── adminAuction.api.ts
    │       ├── adminUserReport.api.ts
    │       └── adminUserWarning.api.ts
    │
    ├── contexts/
    │   └── AuthContext.tsx           # Authentication state
    │
    ├── hooks/
    │   ├── useAuth.ts
    │   └── useFetch.ts
    │
    ├── layouts/
    │   ├── MainLayout.tsx            # Header + Content + Footer
    │   ├── AuthLayout.tsx            # Minimal (login/register)
    │   ├── AdminLayout.tsx           # Admin panel
    │   └── DashboardLayout.tsx
    │
    ├── routes/
    │   ├── index.tsx                 # Route definitions
    │   └── ProtectedRoute.tsx        # Auth guard
    │
    ├── components/
    │   ├── common/                   # Reusable UI
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   ├── Modal.tsx
    │   │   ├── Loading.tsx
    │   │   ├── Card.tsx
    │   │   ├── Badge.tsx
    │   │   ├── Select.tsx
    │   │   ├── Skeleton.tsx
    │   │   └── ...
    │   ├── layout/
    │   │   ├── Header.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Sidebar.tsx
    │   │   └── NotificationDropdown.tsx
    │   └── ...
    │
    ├── modules/                      # 📦 Feature Modules
    │   ├── home/
    │   ├── auth/
    │   ├── user/
    │   ├── product/
    │   ├── auction/
    │   ├── payment/
    │   ├── feedback/
    │   ├── seller/
    │   ├── admin/
    │   └── help/
    │
    ├── utils/
    │   ├── format.ts
    │   └── constants.ts
    │
    └── styles/
```

---

## 🛣️ Routes

### Public Routes (không cần login)

```
/                     → HomePage          (MainLayout)
/auctions             → AuctionsPage      (MainLayout)
/products             → ProductList       (MainLayout)
/products/:id         → ProductDetail     (MainLayout)
/help                 → HelpPage          (MainLayout)
```

### Auth Routes (AuthLayout)

```
/login                → LoginPage
/register             → RegisterPage
/verify-info          → VerifyInfoPage
```

### Protected Routes (yêu cầu login)

```
/auctions/:id         → AuctionDetailPage (MainLayout + Protected)
```

### User Area (ProfileLayout + Protected)

```
/user/account/profile           → ProfilePage
/user/account/payment           → PaymentPage
/user/account/reset-password    → ResetPasswordPage
/user/notification/:category    → NotificationPage
/user/bid/history-bid           → HistoryBidPage
/user/bid/auction-current-joined → AuctionCurrentPage
```

### Seller Area (MainLayout + Protected)

```
/seller                    → ProductManagement
/seller/products           → ProductManagement
/seller/products/create    → CreateProduct
/seller/products/:id/edit  → CreateProduct (edit mode)
/seller/auctions           → AuctionList
/seller/auctions/create    → CreateAuction
```

### Admin Area (MainLayout + Protected)

```
/admin/products/approval   → ProductApprovalPage
/admin/auctions/approval   → AuctionApprovalPage
```

### Super Admin Area (AdminLayout + Protected)

```
/superadmin/dashboard      → AdminDashboardPage
/superadmin/users          → AdminUsersPage
/superadmin/user-reports   → AdminReportsPage
/superadmin/user-warnings  → AdminUserWarningPage
```

---

## 🔐 Authentication

**AuthContext cung cấp:**
- `user` - Thông tin user hiện tại
- `token` - JWT token
- `login(email, password)` - Đăng nhập
- `register(data)` - Đăng ký
- `logout()` - Đăng xuất
- `setUser(user)` - Cập nhật user

**Token Storage:**
- `localStorage.access_token` - JWT token
- `localStorage.user` - User object (cached)

**Axios Interceptors:**
- Request: Auto-attach `Bearer ${token}` header
- Response: Redirect to `/login` on 401

---

## 🎯 Phân Công Module

**Member 1** - `auth`, `user`
- Đăng ký, đăng nhập, profile, nạp tiền

**Member 2** - `product`
- CRUD sản phẩm, upload ảnh

**Member 3** - `auction`
- Tạo/quản lý đấu giá, đặt giá

**Member 4** - `payment`
- Giao dịch sau đấu giá

**Member 5** - `feedback`
- Đánh giá, thông báo

---

## 📦 Dependencies

**Runtime:**
- `react` 19.1.1 - UI Library
- `react-dom` 19.1.1 - DOM rendering
- `react-router-dom` 7.9.4 - Routing
- `axios` 1.13.1 - HTTP client
- `lucide-react` 0.548.0 - Icons
- `clsx`, `tailwind-merge` - Class utilities

**Dev:**
- `vite` 7.1.7 - Build tool
- `typescript` 5.9.3 - Type safety
- `tailwindcss` 3.4.18 - Styling
- `eslint` 9.36.0 - Linting

---

## 🚀 Chạy Frontend

```bash
# Install
npm install

# Development (http://localhost:5173)
npm run dev

# Build
npm run build

# Lint
npm run lint
```

---

## 🔧 Environment

```env
VITE_API_BASE_URL=http://localhost:8080/api
```
