import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <span className="brand-icon">🧠</span>
          <span className="brand-text">FlashCard AI</span>
        </Link>
        
        <div className="navbar-menu">
          <Link 
            to="/dashboard" 
            className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <span className="nav-icon">📊</span>
            Dashboard
          </Link>
          <Link 
            to="/generate" 
            className={`navbar-link ${isActive('/generate') ? 'active' : ''}`}
          >
            <span className="nav-icon">✨</span>
            Generate
          </Link>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          <span className="nav-icon">🚪</span>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
