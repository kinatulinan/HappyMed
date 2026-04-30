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
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="login-wrapper">
      <div className="login-container">
        
        {/* Left Side: Image section */}
        <div className="login-left">
          <div className="login-brand">
            <div className="login-logo-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
            <span>HappyMed</span>
          </div>

          <div className="login-hero-content">
            <h1>Join our platform</h1>
            <p>Create an account to manage your pharmacy<br/>inventory with ease and security.</p>
            <div className="login-dots">
              <span className="dot"></span>
              <span className="dot active"></span>
              <span className="dot"></span>
            </div>
          </div>
        </div>

        {/* Right Side: Form section */}
        <div className="login-right">
          <div className="login-right-top">
            <Link to="/login" className="top-sign-in-btn" style={{textDecoration: "none", display: "inline-block"}}>Sign in</Link>
          </div>

          <div className="login-form-wrapper">
            <h2>Create an Account!</h2>
            <p className="subtitle">Assign the appropriate role to control access</p>

            {error && <div className="login-alert-error">{error}</div>}
            {success && <div className="login-alert-success" style={{background: "#dcfce7", color: "#166534", padding: "0.75rem", borderRadius: "6px", fontSize: "0.8rem", marginBottom: "1.5rem"}}>{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="login-input-group">
                <label>Username</label>
                <input 
                  type="text" 
                  placeholder="Enter your username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="login-input-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                </div>
              </div>

              <div className="login-input-group">
                <label>Role</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    fontSize: "0.9rem",
                    color: "#333",
                    outline: "none",
                    backgroundColor: "white",
                    appearance: "auto"
                  }}
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="login-submit-btn" disabled={loading} style={{marginTop: "1rem", marginBottom: "1rem"}}>
                {loading ? "Creating..." : "Create account"}
              </button>
            </form>

            <div className="login-footer">
              Already registered? <Link to="/login">Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

