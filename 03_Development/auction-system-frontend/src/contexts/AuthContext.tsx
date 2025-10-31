import { createContext, useState, useEffect } from "react";
//import { authApi } from "@/api/modules/auth.api"; // sau này dùng cho API thật

// Dữ liệu mẫu tạm (fake)
const mockUser = {
  user_id: 1,
  username: "admin",
  email: "admin@gmail.com",
  avatar_url: "https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/285665937_1654823388193484_3675250208986733383_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEhTLyle8-1UOS75dnmIVWeYA1jTxSov0JgDWNPFKi_QkIvZ3_k5hGpWESOUWz06wlQePOsgltJx14Hglo8M-DU&_nc_ohc=EGcu6amgJdwQ7kNvwF6EHfg&_nc_oc=AdmTb6v8Gwq-li3mNmB9E0Y34xshhDy-RkWtGZJOERJetQSum7YLr3MFsRk70VlHjKU&_nc_zt=23&_nc_ht=scontent.fhan5-9.fna&_nc_gid=CNK63G3j4S7JueA_5hWlGQ&oh=00_Affa0GrfpKZIG4Oq3JcrtX5Ive1ZgkdJZd1DruVsZqisAg&oe=690A29F2",
};

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // ✅ Khi reload trang, kiểm tra token mock trong localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("mock_user");
    const savedToken = localStorage.getItem("mock_token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  // ✅ MOCK LOGIN
  const login = async (email, password) => {
    console.log("Mock login with:", email, password);

    // sau này bạn chỉ cần đổi thành:
    // const res = await authApi.login({ email, password });
    // setUser(res.data.user);
    // setToken(res.data.token);

    const fakeToken = "mock-jwt-token-123";
    setUser(mockUser);
    setToken(fakeToken);
    localStorage.setItem("mock_user", JSON.stringify(mockUser));
    localStorage.setItem("mock_token", fakeToken);
  };

  // ✅ MOCK REGISTER
  const register = async ({ email, password }) => {
    console.log("Mock register with:", email, password);
    alert(`Đăng ký thành công cho ${email}`);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("mock_user");
    localStorage.removeItem("mock_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
