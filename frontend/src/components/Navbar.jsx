import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ activePage, setActivePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Animated Brand Logo */}
        <div className="nav-logo" onClick={() => handleNavClick('home')}>
          <div className="logo-hex">
            <svg viewBox="0 0 100 100" className="hex-svg">
              <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" className="hex-polygon-base" />
              <polygon points="50,15 85,32 85,68 50,85 15,68 15,32" className="hex-polygon-accent" />
              <polygon points="50,25 75,37 75,63 50,75 25,63 25,37" className="hex-polygon-core" />
            </svg>
          </div>
          <span className="logo-text">
            hexaware<span className="logo-dot">.</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                className={`nav-link-btn ${activePage === link.id ? 'active' : ''}`}
                onClick={() => handleNavClick(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Contact Action Button */}
        <div className="nav-actions">
          <button className="btn btn-primary nav-cta" onClick={() => handleNavClick('contact')}>
            <span>Consult Now</span>
            <ArrowRight size={16} />
          </button>

          {/* Hamburger Menu Icon */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                className={`mobile-nav-link-btn ${activePage === link.id ? 'active' : ''}`}
                onClick={() => handleNavClick(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="mobile-cta-item">
            <button className="btn btn-primary" onClick={() => handleNavClick('contact')}>
              <span>Consult Now</span>
              <ArrowRight size={16} />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
