/* ============================================
   NAVBAR — NeuroSense AI
   Glassmorphism fixed navigation bar
   ============================================ */

import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/pneumonia', label: 'Pneumonia' },
  { path: '/brain-tumor', label: 'Brain Tumor' },
  { path: '/drowsiness', label: 'Drowsiness' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <NavLink to="/" className="navbar__logo">
          <span className="navbar__logo-icon">◆</span>
          <span className="navbar__logo-text">NeuroSense AI</span>
        </NavLink>

        {/* Desktop links */}
        <ul className="navbar__links">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={`navbar__link ${location.pathname === item.path ? 'navbar__link--active' : ''}`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={`navbar__mobile-link ${location.pathname === item.path ? 'navbar__mobile-link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
