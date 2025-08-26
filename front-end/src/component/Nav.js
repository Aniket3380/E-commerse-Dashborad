import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Nav.css";

const Nav = () => {
  const auth = JSON.parse(localStorage.getItem('user'));
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // 👈 for hamburger menu toggle

  useEffect(() => {
    const storedRole = JSON.parse(localStorage.getItem('role'));
    setRole(storedRole);
  }, [JSON.parse(localStorage.getItem('role'))]);

  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className='NavLink'>
     <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
  {menuOpen ? (
    <div className="close-icon">✖</div>
  ) : (
    <>
      <span></span>
      <span></span>
      <span></span>
    </>
  )}
</div>


      {auth ? (
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Products</Link>
          </li>
          {role === 'admin' && (
            <>
              <li><Link to="/addproduct" onClick={() => setMenuOpen(false)}>Add Product</Link></li>
              <li><Link to="/update/:id" onClick={() => setMenuOpen(false)}>Update Product</Link></li>
            </>
          )}
          {role === 'customer' && (
            <>
              <li><Link to="/cart" onClick={() => setMenuOpen(false)}>Add to cart</Link></li>
              <li><Link to="/orders" onClick={() => setMenuOpen(false)}>My orders</Link></li>
            </>
          )}
          <li><Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link></li>
          <li><Link to="/login" onClick={() => { handleSubmit(); setMenuOpen(false); }}>Logout</Link></li>
        </ul>
      ) : (
        <div className="nav-right">
          <ul className={menuOpen ? "open" : ""}>
            <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
            <li><Link to="/signup" onClick={() => setMenuOpen(false)}>SignUp</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
