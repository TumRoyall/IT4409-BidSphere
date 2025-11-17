import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "@/api/modules/auth.api";

interface User {
  id?: number;
  username: string;
  fullName: string;
  email: string;
  gender?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );

  // 🧩 Login
  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    const data = res.data;

    // Chuẩn hóa token từ nhiều khóa trả về: accessToken | access_token | token
    const receivedToken: string | undefined =
      (data && (data.accessToken || data.access_token || data.token)) || undefined;

    if (!receivedToken) {
      throw new Error("Không nhận được access token từ máy chủ");
    }

    localStorage.setItem("access_token", receivedToken);
    localStorage.setItem("user", JSON.stringify(data));

    setToken(receivedToken);
    setUser({
      id: data.userId || data.id || data.user_id,
      username: data.username,
      fullName: data.fullName || data.full_name,
      email: data.email,
      gender: data.gender,
    });
  };

  // 🧩 Register
  const register = async (data: any) => {
    await authApi.register(data);
  };

  // 🧩 Logout
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  // 🔄 Khi reload, khôi phục từ localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
};
