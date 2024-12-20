
import './footer.css';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>TravelX</h2>
          <p>Your journey begins here</p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>📍 123, Travel Street, City, Country</p>
          <p>📞 +1 (123) 456-7890</p>
          <p>📧 info@travelx.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 TravelX. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
