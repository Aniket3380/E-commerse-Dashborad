import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const[email,setEmail]=useState()
    const[password,setPassword]=useState()
    const[error,setError]=useState(false)
    const navigate=useNavigate();



    const handleSubmit=async ()=>{
      
        let result=await fetch("http://localhost:5000/login",{
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{'Content-type':'application/json'}
        })
        result=await result.json()
        
      if(result.email){
       localStorage.setItem('user',JSON.stringify(result))
       setError(false)
       navigate('/')

      }
      else if (!result.email && !result.password){
        setError(true)
      
        
      }
      
       
      setTimeout(() => {
        setError()
       
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
