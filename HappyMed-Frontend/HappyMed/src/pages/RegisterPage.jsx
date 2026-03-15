import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ROLES = [
  { value: "ADMIN", label: "Admin" },
  { value: "PHARMACIST", label: "Pharmacist" },
  { value: "INVENTORY_STAFF", label: "Inventory Staff" },
];

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PHARMACIST");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Registration failed");
      }

      setSuccess("Account created. You can now sign in.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message || "Registration failed");
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
            <div className="hm-brand-subtitle">Create secure access</div>
          </div>
        </div>

        <h2 className="hm-auth-title">Register</h2>
        <p className="hm-auth-subtitle">
          Assign the appropriate role to control access.
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

          <label>
            Role
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>

          {error && <div className="hm-auth-error">{error}</div>}
          {success && <div className="hm-auth-success">{success}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="hm-auth-footer">
          <span>Already registered?</span>
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

