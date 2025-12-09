import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-title">
          <h3>Learniverse: self-studying platform</h3>
        </div>
        <div className="footer-copyright">
          <p>Copyright © Learniverse</p>
          <p>Keep every thing simple</p>
        </div>
        <div className="footer-contact">
          <p>Email: Learniverse@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;