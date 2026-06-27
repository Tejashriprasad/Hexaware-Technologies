import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = ({ setActivePage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Company Summary & Newsletter */}
        <div className="footer-column brand-column">
          <div className="footer-logo" onClick={() => handleLinkClick('home')}>
            <span className="logo-text">
              hexaware<span className="logo-dot">.</span>
            </span>
          </div>
          <p className="footer-description">
            Creating smiles through great people and technology. Hexaware is a global technology and business process services company driving digital transformation.
          </p>
          <div className="social-links">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><button onClick={() => handleLinkClick('home')}>Home Overview</button></li>
            <li><button onClick={() => handleLinkClick('services')}>Services & Platforms</button></li>
            <li><button onClick={() => handleLinkClick('case-studies')}>Case Studies</button></li>
            <li><button onClick={() => handleLinkClick('careers')}>Work With Us</button></li>
            <li><button onClick={() => handleLinkClick('contact')}>Get In Touch</button></li>
          </ul>
        </div>

        {/* Global HQ Info */}
        <div className="footer-column contact-column">
          <h3 className="footer-title">Global Headquarters</h3>
          <ul className="contact-details">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>Building 3, Sector III, A-Block, MBP, Mahape, Navi Mumbai - 400710, India</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <span>+91 22 9088 1000</span>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <span>connect@hexaware.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Form */}
        <div className="footer-column newsletter-column">
          <h3 className="footer-title">Stay Updated</h3>
          <p className="newsletter-text">Subscribe to our monthly newsletter to get the latest tech insights and corporate news.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
              <ArrowRight size={18} />
            </button>
          </form>
          {subscribed && <span className="newsletter-success">Thank you for subscribing!</span>}
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} Hexaware Technologies. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span className="bullet">&bull;</span>
            <a href="#terms">Terms of Service</a>
            <span className="bullet">&bull;</span>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
