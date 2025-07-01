import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';
import logo from '../ProductsUmages/Logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-logo">
          <img src={logo} alt="Place Pizza Logo" className="logo" />
          <p className="footer-brand text-capitalize">Place Pizza</p>
          <p>Your one-stop shop for everything!</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/allProducts">Shop</Link></li>
            <li><Link to="/About">About</Link></li>
            <li><Link to="/Contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>Email: support@rambo.com</p>
          <p>Phone: +123 456 7890</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Rambo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
