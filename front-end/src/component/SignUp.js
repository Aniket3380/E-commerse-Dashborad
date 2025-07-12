import React, { useEffect, useState } from "react";
import "./SignUp.css"; 
import { useNavigate} from 'react-router-dom'

const SignUp = () => {
  const[name,setName]=useState()
  const[email,setEmail]=useState()
  const[password,setPassword]=useState()
  const navigate=useNavigate()

  useEffect(()=>{
    const auth=localStorage.getItem('user')
    if(auth)
    {
      navigate('/')
    }
  })
  const handleSubmit=async()=>{
    let result=await fetch('http://localhost:5000/register',{
      method:'post',
      body:JSON.stringify({name,email,password}),
      headers:{'Content-Type':'application/json'}
    })
    result=await result.json()
    if(result){
      localStorage.setItem('user', JSON.stringify(result));
       navigate('/')
      
       
    }
   
  }
  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <input type="text" placeholder="Enter your name" className="input-box" value={name}
       onChange={(e)=>setName(e.target.value)}/>
      <input type="text" placeholder="Enter your username" className="input-box" value={email}
      onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Enter your password" className="input-box" value={password}
     onChange={(e)=>setPassword(e.target.value)} />
      <button className="signup-button" onClick={handleSubmit}>Register</button>
    </div>
  );
};

export default SignUp;