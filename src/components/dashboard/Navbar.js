import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './styles/navbar.css'; 

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getNavLinks = (role) => {
    const links = [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/dashboard/investments", label: "Investments" },
      { to: "/dashboard/profile", label: "Profile" },
    ];

    if (role === 'admin') {
      links.push(
        { to: "/dashboard/users", label: "Users" },
        { to: "/dashboard/analytics", label: "Analytics" }
      );
    }

    if (role === 'subscriber') {
      links.push({ to: "/dashboard/analytics", label: "Analytics" });
    }

    return links;
  };

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <Link to="/dashboard" className="navbar-brand">
          Investment Tracker
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        {getNavLinks(user?.role).map((link) => (
          <Link key={link.to} to={link.to} className="nav-link" onClick={() => setIsMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="user-section">
        <span>Welcome, {user?.name}</span>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};
