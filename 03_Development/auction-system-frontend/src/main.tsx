// Polyfill for sockjs-client in Vite
declare const global: any;
if (typeof global === "undefined") {
  (window as any).global = window;
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App"; // ✅ dùng App.tsx mới

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
