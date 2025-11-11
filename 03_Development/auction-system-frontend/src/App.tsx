import AppRoutes from "@/routes";
import { AuthProvider } from "@/contexts/AuthContext";

// 🔐 ADMIN MODULE - Uncomment để test
// import ProductManagement from "@/modules/admin/pages/ProductManagement";

export default function App() {
  return (
    <AuthProvider>
      {/* Routes bình thường */}
      <AppRoutes />
      
      {/* 
        🧪 TEST ADMIN MODULE:
        Uncomment dòng dưới để test ProductManagement page
      */}
      {/*<ProductManagement /> */}
    </AuthProvider>
  );
}