import { Link, useLocation, useNavigate } from "react-router-dom";
import { PenLine, History, BarChart3, LogOut, Sparkles } from "lucide-react";
import "../styles/layout.css";

function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  const currentPath = location.pathname;

  return (
    <div className="layout-wrapper">
      <header className="main-header">
        <Link to="/dashboard" className="brand-logo" style={{ textDecoration: 'none' }}>
          <div className="brand-icon">
            <Sparkles size={20} />
          </div>
          VibeScript
        </Link>
        
        <nav className="nav-links">
          <Link 
            to="/dashboard" 
            className={`nav-item ${currentPath === "/dashboard" ? "active" : ""}`}
          >
            <PenLine size={18} /> Compose
          </Link>
          <Link 
            to="/entries" 
            className={`nav-item ${currentPath === "/entries" ? "active" : ""}`}
          >
            <History size={18} /> Timeline
          </Link>
          <Link 
            to="/analytics" 
            className={`nav-item ${currentPath === "/analytics" ? "active" : ""}`}
          >
            <BarChart3 size={18} /> Insights
          </Link>
        </nav>
        
        <div className="user-controls">
          <button onClick={handleLogout} className="logout-btn border-none shadow-none cursor-pointer">
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </header>
      
      <main className="main-content">
        {children}
      </main>

      <footer className="main-footer">
        <p>© {new Date().getFullYear()} VibeScript AI Journal. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;
