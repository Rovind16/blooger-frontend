import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profile from '../images/profile.webp';
import logo from '../images/logo-color.png';
import './navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-logo"> <Link to="/">
            <img src={logo} alt="Profile" className='logo-img'/>
          </Link></div>

      <div
        className={`mobile-menu-toggle ${isMobileMenuOpen ? 'mobile-open' : ''}`}
        onClick={handleMobileMenuToggle}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/home" className="navbar-link">
          Home
        </Link>
        <Link to="/about" className="navbar-link">
          About
        </Link>
        <Link to="/contact" className="navbar-link">
          Contact
        </Link>
        <Link to="/signin" className="navbar-link">
          Sign In
        </Link>
        <Link to="/signup" className="navbar-link">
          Sign Up
        </Link>
      </div>
        <div className="navbar-img">
          <Link to="/profile">
            <img src={profile} alt="Profile" />
          </Link>
        </div>
     
    </nav>
  );
};

export default Navbar;
