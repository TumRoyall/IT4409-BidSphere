import { useNavigate } from "react-router-dom";

export default function DebugLogin() {
  const navigate = useNavigate();

  const handleLogin = (userId: number, username: string, fullName: string, email: string) => {
    localStorage.setItem(
      "user",
      JSON.stringify({ id: userId, username, fullName, email })
    );
    localStorage.setItem("access_token", `mock_token_${userId}`);
    alert(`✅ Logged in as ${username}`);
    navigate("/seller");
    window.location.reload();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Debug Login</h1>
      <p>Click a user to login:</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        {[
          { id: 1, username: "user01", fullName: "User 01", email: "user01@gmail.com", role: "Seller (Active)" },
          { id: 6, username: "user06", fullName: "User 06", email: "user06@gmail.com", role: "Bidder (Active)" },
          { id: 7, username: "user07", fullName: "User 07", email: "user07@gmail.com", role: "Seller (Active)" },
          { id: 18, username: "user18", fullName: "User 18", email: "user18@gmail.com", role: "Seller (Active)" },
        ].map((user) => (
          <button
            key={user.id}
            onClick={() => handleLogin(user.id, user.username, user.fullName, user.email)}
            style={{
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
              backgroundColor: "#f5f5f5",
              fontSize: "1rem",
              textAlign: "left",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{user.username}</div>
            <div style={{ fontSize: "0.9rem", color: "#666" }}>{user.role}</div>
          </button>
        ))}
      </div>

      <div style={{ marginTop: "2rem", padding: "1rem", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
        <p>
          <strong>All users share password:</strong> <code>password123</code>
        </p>
      </div>
    </div>
  );
}
