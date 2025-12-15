/**
 * Login API handler - authenticates user via backend
 * Usage: loginUser("test@example.com", "password123")
 */
import { authApi } from "@/api/modules/auth.api";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await authApi.login({ email, password });
    const { access_token, user } = response.data;
    
    // Store auth data
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("user", JSON.stringify(user));
    
    // Reload page to apply auth state
    window.location.reload();
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  window.location.reload();
};
