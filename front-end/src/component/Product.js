import React, { useEffect, useState } from "react";
import "./Product.css"

const Product=()=>{
    const[data,setData]=useState([])
    const[loading,setLoading]=useState(true)
    const[delmsg,setDelMsg]=useState(false);
useEffect(()=>{
  getData()
    
},[])

const getData=async()=>{
    setLoading(true)
    try{
    let result=await fetch('http://localhost:5000/product')
    result=await result.json()
    setData(result)
    }
    catch(error)
    {
        console.error("error fetching product data",error)
    }
    setLoading(false)
}
  
const handleSubmit=async(id)=>{
    let result=await fetch(`http://localhost:5000/product/${id}`,{
        method:"delete"
    })
     result=await result.json()
     if(result)
     {
        getData();
        setDelMsg(true)
        setTimeout(() => setDelMsg(false), 2000);

     }
}
    
   
    return(
        <div className="product-container">
            <h1 className="title">Product List</h1>

            {delmsg && <div className="delete-msg">Product deleted successfully.</div>}
            {
            loading? <div className="loader"></div>: data.length>0 
            ? 
            <table className="product-table" >
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Company</th>
                <th>Operations</th>
                </tr>
                </thead>
                <tbody>
         {
            data.map((todo,index)=>(
                <tr key={index._id}>
                <td>{todo.name}</td>
                <td>{todo.price}</td>
                <td>{todo.category}</td>
                <td>{todo.company}</td>
                <td><button onClick={()=>handleSubmit(todo._id)}>delete</button></td>
                </tr>
            ))
         }
         </tbody>
        
         </table>
         :

         <tr>
             <td>No Data found</td>
         </tr>}
        </div>
    )
}
export default Product;