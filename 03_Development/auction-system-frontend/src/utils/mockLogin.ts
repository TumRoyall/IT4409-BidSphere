/**
 * Mock login for development - set user in localStorage
 * Usage: mockLogin(1, "testuser", "Test User", "test@example.com")
 */
export const mockLogin = (
  id: number,
  username: string,
  fullName: string,
  email: string
) => {
  const userData = {
    id,
    username,
    fullName,
    email,
  };
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("access_token", "mock_token_" + id);
  window.location.reload();
};

export const mockLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  window.location.reload();
};
