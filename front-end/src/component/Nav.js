import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css"
import product from '../component/img/product.png'

const Nav = () => {
   const auth = localStorage.getItem('user')
   const navigate = useNavigate()

   const handleSubmit = () => {
      localStorage.clear()
      navigate('/signup')
   }

   return (
      <div className='NavLink'>
         {auth ?
            <ul>
              <li>
  <Link to="/" >
    <span>Products</span>
  </Link>
</li>         
               <li><Link to="/addproduct">Add Product</Link></li>
               <li><Link to="/update">Update Product</Link></li>
               <li><Link to="/profile">Profile</Link></li>
               <li><Link to="/login" onClick={handleSubmit}>Logout</Link> </li>
              


            </ul> :
            <div className="nav-right">
               <ul>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">SignUp</Link></li>
               </ul>
            </div>
         }

      </div>
   )
}

export default Nav;