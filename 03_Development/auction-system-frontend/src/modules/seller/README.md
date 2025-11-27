# Seller Module - Complete Features Documentation

## Overview
This module provides comprehensive seller management features for the auction system, including product management, auction handling, bidding history tracking, and statistics.

---

## Components

### 1. **ActionToolBar** (`ActionToolBar.tsx`)
Search and action buttons for product management.

**Features:**
- 🔍 Debounced product search (500ms)
- ➕ Create Product button
- 🔨 Create Auction Session button

**Props:**
```typescript
interface ActionToolBarProps {
  onSearch?: (keyword: string) => void;
  onCreateProduct?: () => void;
  onCreateAuction?: () => void;
  placeholder?: string;
  defaultValue?: string;
}
```

---

### 2. **StatsOverview** (`StatsOverview.tsx`)
Dashboard statistics display cards.

**Features:**
- 📊 Total Products count
- 🔴 Active Sessions (running auctions)
- ⏳ Pending Approval (waiting for admin review)
- Loading skeleton states

**Props:**
```typescript
interface StatsOverviewProps {
  stats: SellerStatistics | null;
  loading?: boolean;
}
```

---

### 3. **ApprovedProducts** (`ApprovedProducts.tsx`)
Main product listing component with edit/delete actions.

**Features:**
- 🖼️ Product image display with fallback
- 📝 Product details (name, category, price, deposit)
- 🏷️ Status badges (pending, approved, rejected, sold)
- 🎯 Edit, Delete, More options buttons
- 📄 Pagination support
- ❌ Error states and empty state handling

**Props:**
```typescript
interface ApprovedProductsProps {
  products: Product[];
  loading?: boolean;
  error?: string | null;
  pagination?: PaginationInfo;
  onRefresh?: () => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}
```

---

### 4. **EditProductModal** (`EditProductModal.tsx`)
Modal form for editing product details.

**Features:**
- 📝 Edit product name, category, description
- 💰 Modify pricing (start price, deposit, estimate price)
- 🔄 Form validation
- Loading states

**Props:**
```typescript
interface EditProductModalProps {
  product: Product | null;
  loading?: boolean;
  onSubmit: (productId: number, data: any) => Promise<void>;
  onCancel: () => void;
}
```

---

### 5. **DeleteConfirmation** (`DeleteConfirmation.tsx`)
Confirmation dialog for product deletion.

**Features:**
- ⚠️ Warning message with product name
- 🔴 Destructive action confirmation
- Prevents accidental deletion

**Props:**
```typescript
interface DeleteConfirmationProps {
  product: Product | null;
  loading?: boolean;
  onConfirm: (product: Product) => Promise<void>;
  onCancel: () => void;
}
```

---

### 6. **AuctionManagement** (`AuctionManagement.tsx`)
Complete auction management interface.

**Features:**
- 📋 List all auctions for products
- ▶️ Start auction (CREATED → OPEN)
- ⏹️ Close auction (OPEN → CLOSED)
- 🗑️ Delete auction (CREATED/CLOSED only)
- 📊 View bidding history
- 💰 Display current bid and bid step
- 👥 Total bids count
- Expandable auction details

**Actions:**
- View detailed bid history
- Monitor auction status
- Manage multiple auctions

---

### 7. **BiddingHistory** (`BiddingHistory.tsx`)
Displays bidding history for specific auctions.

**Features:**
- 📊 Auction summary (current bid, total bids)
- 📈 Bid history timeline
- 💰 Bid amounts with currency formatting
- 👤 Bidder information
- 📅 Timestamps for each bid
- Status (Winning/Outbid)

---

### 8. **ProductFilterBar** (`ProductFilterBar.tsx`)
Advanced filtering interface for products.

**Features:**
- 🔍 Filter by status (pending, approved, rejected, sold)
- 📂 Filter by category
- 🎯 Filter by auction status (has/no auction)
- 🔄 Reset filters
- Collapsible filter panel

**Props:**
```typescript
interface ProductFilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  currentFilters?: FilterState;
}
```

---

### 9. **ProductMoreOptions** (`ProductMoreOptions.tsx`)
Dropdown menu for additional product actions.

**Features:**
- 📄 View Details
- 📊 View Statistics
- 🔨 View Auctions
- 📤 Share Product
- Click-outside detection to close menu

---

### 10. **ActionButtons** (`ActionButtons.tsx`)
Modal footer buttons for form submission.

**Features:**
- Cancel button
- Create/Submit button
- Loading states

---

## Hooks

### 1. **useSellerProducts** (`useSellerProducts.ts`)
Main hook for managing seller's products.

**Returns:**
```typescript
{
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo;
  filters: ProductFilters;
  updateFilters: (filters: Partial<ProductFilters>) => void;
  changePage: (page: number) => void;
  refresh: () => Promise<void>;
}
```

**Features:**
- Auto-fetch products on mount
- Filter and pagination support
- Manual refresh capability
- Error handling

---

### 2. **useProductActions** (`useSellerProducts.ts`)
Hook for CRUD operations on products.

**Returns:**
```typescript
{
  loading: boolean;
  error: string | null;
  createProduct: (data: any) => Promise<ProductResponse>;
  updateProduct: (productId: number, data: any) => Promise<ProductResponse>;
  deleteProduct: (productId: number) => Promise<void>;
  uploadImages: (productId: number, images: File[]) => Promise<ImageResponse[]>;
}
```

---

### 3. **useSellerStatistics** (`useSellerProducts.ts`)
Hook for fetching seller statistics.

**Returns:**
```typescript
{
  stats: SellerStatistics | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}
```

**Stats Calculated:**
- total_products
- active_sessions (open auctions)
- pending_approval (pending products)
- total_sold

---

### 4. **useProductFilters** (`useProductFilters.ts`)
Advanced filtering logic for products.

**Features:**
- Filter by status, category, auction status
- Full-text search across name, description, category
- Stats generation (total, filtered, by status)
- Memoized results

**Returns:**
```typescript
{
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredProducts: Product[];
  getStats: () => FilterStats;
  hasActiveFilters: boolean;
}
```

---

### 5. **useSellerDashboard** (`useSellerDashboard.ts`)
Comprehensive hook combining all dashboard functionality.

**Returns:**
```typescript
{
  // State
  dashboardState: DashboardState;
  
  // Product data
  products: Product[];
  loading: boolean;
  stats: SellerStatistics | null;
  
  // Modal management
  openCreateProductModal: () => void;
  closeCreateProductModal: () => void;
  openEditProductModal: (product: Product) => void;
  closeEditProductModal: () => void;
  openDeleteConfirm: (product: Product) => void;
  closeDeleteConfirm: () => void;
  openAuctionManager: (product: Product) => void;
  closeAuctionManager: () => void;
  
  // Filters
  updateFilters: (filters: FilterState) => void;
  updateSearchTerm: (term: string) => void;
  
  // Actions
  createProduct: (data: any) => Promise<void>;
  updateProduct: (productId: number, data: any) => Promise<void>;
  deleteProduct: (product: Product) => Promise<void>;
  refreshProducts: () => Promise<void>;
  
  // UI state
  isSubmitting: boolean;
}
```

---

## API Integration

All API calls are managed through `/src/api/modules/seller.api.ts`:

### Product APIs
- `getProducts(params)` - Fetch paginated products
- `getProductById(id)` - Get single product details
- `createProduct(data)` - Create new product
- `updateProduct(id, data)` - Update product
- `deleteProduct(id)` - Delete product
- `uploadProductImages(id, files)` - Upload images

### Auction APIs
- `createAuction(data)` - Create auction session
- `getAuctions(params)` - List auctions
- `cancelAuction(id, reason)` - Cancel auction

### Statistics APIs
- `getStatistics()` - Fetch seller statistics

---

## Type Definitions

### Product
```typescript
interface Product {
  product_id: number;
  seller_id: number;
  name: string;
  categories: string;
  description: string;
  start_price: number;
  estimate_price: string;
  deposit: number;
  image_url: string;
  status: string; // 'pending' | 'approved' | 'rejected' | 'sold'
  created_at: string;
  images?: ImageResponse[];
  auction?: AuctionResponse;
}
```

### SellerStatistics
```typescript
interface SellerStatistics {
  total_products: number;
  active_sessions: number;
  pending_approval: number;
  total_revenue?: number;
  total_sold?: number;
}
```

### FilterState
```typescript
interface FilterState {
  status?: string;
  category?: string;
  priceRange?: { min: number; max: number };
  hasAuction?: boolean | null;
}
```

---

## Usage Example

### Basic Dashboard Setup
```typescript
import { useSellerDashboard } from "@/modules/seller/hooks/useSellerDashboard";
import ProductManagement from "@/modules/seller/pages/ProductManagement";

function SellerDashboard() {
  const dashboard = useSellerDashboard();
  
  return <ProductManagement />;
}
```

### Using Product Filters
```typescript
import { useProductFilters } from "@/modules/seller/hooks/useProductFilters";

function FilteredProductList({ products }) {
  const { filteredProducts, setFilters, searchTerm, setSearchTerm } = 
    useProductFilters(products);
  
  return (
    <>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />
      <ul>
        {filteredProducts.map(p => <li key={p.product_id}>{p.name}</li>)}
      </ul>
    </>
  );
}
```

---

## Features Checklist

### Product Management
- ✅ View all products with pagination
- ✅ Create new products
- ✅ Edit product details
- ✅ Delete products with confirmation
- ✅ Upload product images
- ✅ View product status (pending, approved, rejected, sold)

### Auction Management
- ✅ Create auction sessions for products
- ✅ View all auctions
- ✅ Start auction (change status to OPEN)
- ✅ Close auction (change status to CLOSED)
- ✅ Cancel/delete auctions
- ✅ View auction details (bid history, current bid, timestamps)

### Statistics & Analytics
- ✅ Dashboard overview (total products, active sessions, pending)
- ✅ Product filtering by status
- ✅ Product filtering by category
- ✅ Product filtering by auction status
- ✅ Full-text search across products
- ✅ Bidding history tracking

### User Experience
- ✅ Debounced search
- ✅ Modal dialogs for actions
- ✅ Loading states
- ✅ Error handling
- ✅ Empty states
- ✅ Confirmation dialogs for destructive actions
- ✅ Toast notifications (ready for integration)

---

## Backend Dependencies

This module depends on these backend endpoints:

### Required
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product details
- `GET /api/products/seller/{sellerId}` - Get seller's products
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product
- `GET /api/auctions` - List auctions
- `POST /api/auctions` - Create auction
- `POST /api/auctions/{id}/start` - Start auction
- `POST /api/auctions/{id}/close` - Close auction
- `DELETE /api/auctions/{id}` - Delete auction

### Optional (for enhanced features)
- `GET /api/bids/auction/{auctionId}` - Get bids for auction
- `GET /api/notifications` - Get seller notifications
- `POST /api/upload` - Upload files/images

---

## Future Enhancements

- [ ] Real-time auction updates via WebSocket
- [ ] Bulk product operations
- [ ] Advanced analytics dashboard
- [ ] Product scheduling
- [ ] Automatic auction renewal
- [ ] Seller ratings & reviews
- [ ] Export/import products
- [ ] API integration for third-party listings

---

## Styling

All styles are in `/src/styles/seller.css`. The module uses:
- CSS Grid for responsive layouts
- CSS Variables for theming
- Flexbox for component alignment
- Smooth animations and transitions

---

## Notes

- All timestamps are formatted in Vietnamese locale
- Currency is formatted as VND with proper formatting
- The module handles both array and paginated responses from API
- Images have fallback to placeholder if URL fails
- Forms include loading states to prevent double submissions
