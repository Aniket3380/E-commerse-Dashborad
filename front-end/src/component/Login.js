import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';
console.log("API_BASE_URL 👉", API_BASE_URL);

const Login = () => {
    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    const[error,setError]=useState(false)
    const navigate=useNavigate();



    const handleSubmit=async ()=>{
      
        let result=await fetch(`${API_BASE_URL}/login`,{
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{'Content-type':'application/json'}
        })
        result=await result.json()
        
      if(result.acess_token){
        const userRole=result.user.role
       localStorage.setItem('user',JSON.stringify(result.user))
       localStorage.setItem('token',JSON.stringify(result.acess_token))
       localStorage.setItem('role',JSON.stringify(userRole))
       setError(false)
       if(userRole==="admin") 
        {
          navigate('/')
          window.location.reload()
        }
        else
        { navigate ('/')
           window.location.reload()
        }

      }
      else if (!result.email && !result.password){
        setError(true)
      
        
      }
      
       
      setTimeout(() => {
        setError(false)
       
      }, 1500);

    
      setEmail('')
      setPassword('')


    }
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login to Your Account</h2>
        <input type="email" placeholder="Email"  value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        { error &&
        <span>provide valid username and password </span>}
        <button onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};

export default Login;
