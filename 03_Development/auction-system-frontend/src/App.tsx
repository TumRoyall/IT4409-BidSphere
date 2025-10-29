import AppRoutes from "@/routes";  // ✅ import routes/index.tsx

export default function App() {
  console.log("✅ App render");
  return <AppRoutes />;  // ✅ chỉ cần gọi router vào
}
