
import './navbar.css'
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from 'react-router-dom'
const Navbar = () => {

  const navigate = useNavigate();

  return (
    <section className="nav-fix">
    <div className="nav-container">
    <nav className="navbar">
      <ul className="navbar-lists">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
      <button type="button" onClick={()=>navigate('/admin')} className="login-button">Admin</button>
      <button type="button" className="get-started-button">Get Started</button>
    </nav>
    </div>
    </section>
  );
};

export default Navbar;
