import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("User") || "null");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div style={{ color: "white", padding: "40px", textAlign: "center" }}>
      <h2>Welcome, {user.username}!</h2>
      {user.email && <p style={{ color: "#9ca3af" }}>{user.email}</p>}
      <button
        onClick={handleLogout}
        style={{
          marginTop: "24px",
          padding: "10px 24px",
          background: "#aa3bff",
          border: "none",
          borderRadius: "8px",
          color: "white",
          cursor: "pointer",
          fontSize: "15px",
        }}
      >
        Log out
      </button>
    </div>
  );
}

export default Profile;
