import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext.jsx"; 

import "./Header.css"; 

const Header = () => {
  const { cart } = useCart(); 
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        <h1>PRATHOFY</h1>
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <nav className={menuOpen ? "nav-links open" : "nav-links"}>
        <ul>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
          <li><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link></li>
          <li><Link to="/productlist" onClick={() => setMenuOpen(false)}>Shop</Link></li>
          <li><Link to="/cart" onClick={() => setMenuOpen(false)}>Cart ({cart.length})</Link></li>
          <li><Link to="/adminlogin" onClick={() => setMenuOpen(false)}>Admin</Link></li>
          <li><Link to="/Customer" onClick={() => setMenuOpen(false)}>Customer</Link></li>
       
        
     
        </ul>
      </nav>
    </header>
  );
};

export default Header;
