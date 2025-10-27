import AppRoutes from "./routes";
import "./index.css"; // hoặc App.css nếu bạn đang dùng
import { AuthProvider } from "@/contexts/AuthContext"; // nếu AuthContext có sẵn

function App() {
  return (
    // Bọc toàn bộ app trong AuthProvider (để dùng useAuth sau này)
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
