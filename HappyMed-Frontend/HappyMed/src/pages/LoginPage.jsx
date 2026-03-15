import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      // Expecting { token, user: { username, roles: [] } }
      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hm-auth-page">
      <div className="hm-auth-card">
        <div className="hm-auth-header">
          <div className="hm-logo-circle">+</div>
          <div>
            <div className="hm-brand-title">HappyMed</div>
            <div className="hm-brand-subtitle">Pharmacy Inventory Suite</div>
          </div>
        </div>

        <h2 className="hm-auth-title">Sign in</h2>
        <p className="hm-auth-subtitle">
          Secure access for Admin, Pharmacists, and Inventory Staff.
        </p>

        <form className="hm-auth-form" onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <div className="hm-auth-error">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="hm-auth-footer">
          <span>New to HappyMed?</span>
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
}

