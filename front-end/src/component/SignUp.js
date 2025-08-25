import React, { useEffect, useState } from "react";
import "./SignUp.css"; 
import { useNavigate} from 'react-router-dom'
import API_BASE_URL from "../config";

const SignUp = () => {
  const[name,setName]=useState()
  const[email,setEmail]=useState()
  const[password,setPassword]=useState()
  const[err,seterr]=useState(false);
  const navigate=useNavigate()

  useEffect(()=>{
    const auth=JSON.parse(localStorage.getItem('user'))
    if(auth)
    {
      navigate('/')
    }
  })
  const handleSubmit=async()=>{
    if(!name || !email || !password){
      seterr(true)
      return false;

    }
    let result=await fetch(`${API_BASE_URL}/register`,{
      method:'post',
      body:JSON.stringify({name,email,password}),
      headers:{'Content-Type':'application/json'}
    })
    result=await result.json()
    if(result.acess_token){
      const userRole=result.result.role
      localStorage.setItem('user', JSON.stringify(result.result));
      localStorage.setItem('token',JSON.stringify(result.acess_token))
      localStorage.setItem('role',JSON.stringify(userRole))
      if(userRole==='admin') 
        {
          navigate('/')
          window.location.reload()
        }
      else 
      {
        navigate('/')
         window.location.reload()
      }
      
       
    }
   
  }
  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <input type="text" placeholder="Enter your name" className="input-box" value={name}
       onChange={(e)=>setName(e.target.value)}/>
       {
        err && !name && 
        <span>Please Enter Name</span>
       }
      <input type="text" placeholder="Enter your username" className="input-box" value={email}
      onChange={(e)=>setEmail(e.target.value)}/>
      {
        err && !email && 
        <span>Please Enter Username</span>
      }
      <input type="password" placeholder="Enter your password" className="input-box" value={password}
     onChange={(e)=>setPassword(e.target.value)} />
     {
      err && !password && 
      <span>Please Enter Password</span>
     }
      <button className="signup-button" onClick={handleSubmit}>Register</button>
    </div>
  );
};

export default SignUp;