import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/modules/home/pages/HomePage";
import MainLayout from "@/layouts/MainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
