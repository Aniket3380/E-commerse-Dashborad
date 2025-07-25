import React from 'react';
import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Nav.css"


const Nav = () => {
   const auth = localStorage.getItem('user')
   const[role,setRole]=useState(null)
   useEffect(() => {
     const storedRole = localStorage.getItem('role');
     setRole(storedRole);
   }, [localStorage.getItem('role')])
   
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
              <>
             { role==='admin' &&  <li><Link to="/addproduct">Add Product</Link></li>}
              { role==='admin' &&<li><Link to="/update/:id">Update Product</Link></li> }
               </>
             { role==='customer' &&  <li><Link to="/cart" >Add to cart</Link> </li>}
             { role==='customer' && <li><Link to="/orders" >My orders</Link> </li>}
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