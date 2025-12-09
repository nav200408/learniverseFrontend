import { useState } from "react";
import "./LoginComponents.css";
import { loginService } from "../../services/AuthService/authService.js";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleLogin = async () => {
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await loginService(username, password);
      
      console.log("Login successful:", response.data);
      

      localStorage.setItem("access token", response.data.accessToken);
      localStorage.setItem("refresh token", response.data.refreshToken);
      
      navigate("/");
      
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign In</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Enter email or username" 
            onChange={(e) => setUsername(e.target.value)}
            className="form-input"
            value={username}
          />
        </div>
        
        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="form-input"
            value={password}
          />
          
        </div>
        
        <div className="login-options">
          <button 
            className="signin-btn" 
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
        
        <div className="login-footer">
          <p>No account? <a href="/signup" className="signup-link">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
}