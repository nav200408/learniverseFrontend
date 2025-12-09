import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getUserName } from "../../../utils/auth"; // Ensure this path is correct
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const user = getUserName();
    if (user) {
      setUsername(user);
    }
  }, []);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = () => {
    localStorage.removeItem("access token");
    localStorage.removeItem("refresh token");
    setUsername(null);
    setOpenMenu(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* 1. LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        Learnivese
      </div>

      {/* 2. NAVIGATION LINKS (Grouped next to logo via CSS gap) */}
      <div className="nav-links">
        <div className="nav-item" onClick={() => navigate("/")}>Home</div>
        <div className="nav-item" onClick={() => navigate("/courses")}>Course</div>
        <div className="nav-item" onClick={() => navigate("/contact")}>Contact</div>
      </div>

      {/* 3. AUTH SECTION (Pushed to right via margin-left: auto in CSS) */}
      <div className="auth-section">
        {!username ? (
          <div className="auth-buttons">
            <button className="login-btn" onClick={() => navigate("/login")}>
              LOGIN
            </button>
            <button className="signup-btn" onClick={() => navigate("/sign-up")}>
              SIGN UP
            </button>
          </div>
        ) : (
          <div className="user-menu-container" ref={menuRef}>
            <div 
              className="user-display" 
              onClick={() => setOpenMenu(!openMenu)}
            >
              Hello, {username} <span>&#9662;</span>
            </div>

            {openMenu && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => navigate("/my-courses")}>
                  My Courses
                </div>
                <div className="dropdown-item" onClick={() => navigate("/wishlist")}>
                  Wishlist
                </div>
                <div className="dropdown-item logout" onClick={logout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}