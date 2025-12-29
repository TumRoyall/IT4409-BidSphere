import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "@/api/modules/auth.api";
import { userApi } from "@/api/modules/user.api";

interface User {
  id?: number;
  username: string;
  fullName: string;
  email: string;
  gender?: string;
  avatarUrl?: string;
  role?: string;
  roles?: string;
  roleName?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );

  // 🔄 Refresh user data from backend API
  const refreshUser = async () => {
    if (!token) return;

    try {
      const userInfo = await userApi.getProfile();
      const userObject = {
        id: userInfo.userId,
        username: userInfo.username,
        fullName: userInfo.fullName,
        email: userInfo.email,
        gender: userInfo.gender,
        avatarUrl: userInfo.avatarUrl,
        role: userInfo.roleName,
        roleName: userInfo.roleName,
      };
      localStorage.setItem("user", JSON.stringify(userObject));
      setUser(userObject);
    } catch (err) {
      console.warn("Failed to refresh user:", err);
    }
  };

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
    setToken(receivedToken);

    // Fetch full user info (including role) from /users/me endpoint
    try {
      const userInfo = await userApi.getProfile();
      const userObject = {
        id: userInfo.userId,
        username: userInfo.username,
        fullName: userInfo.fullName,
        email: userInfo.email,
        gender: userInfo.gender,
        avatarUrl: userInfo.avatarUrl,
        role: userInfo.roleName, // Backend returns roleName
        roleName: userInfo.roleName,
      };
      localStorage.setItem("user", JSON.stringify(userObject));
      setUser(userObject);
    } catch (err) {
      console.warn("Failed to fetch user profile, using login response data:", err);
      // Fallback: use data from login response if /users/me fails
      const userObject = {
        id: data.userId || data.id || data.user_id,
        username: data.username,
        fullName: data.fullName || data.full_name,
        email: data.email,
        gender: data.gender,
        avatarUrl: data.avatarUrl || data.avatar_url,
        role: data.role || data.roles || data.roleName || data.role_id,
        roles: data.roles,
        roleName: data.roleName,
      };
      localStorage.setItem("user", JSON.stringify(userObject));
      setUser(userObject);
    }
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

  // 🔄 Khi reload, khôi phục từ localStorage và refresh từ API
  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));

      // Refresh user data from API to sync role from database
      userApi.getProfile().then(userInfo => {
        const userObject = {
          id: userInfo.userId,
          username: userInfo.username,
          fullName: userInfo.fullName,
          email: userInfo.email,
          gender: userInfo.gender,
          avatarUrl: userInfo.avatarUrl,
          role: userInfo.roleName,
          roleName: userInfo.roleName,
        };
        localStorage.setItem("user", JSON.stringify(userObject));
        setUser(userObject);
      }).catch(err => {
        console.warn("Could not refresh user on load:", err);
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, setUser, refreshUser }}
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

