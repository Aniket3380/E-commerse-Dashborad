import React, { useEffect, useState } from "react";
import "./Product.css"
import { Link } from "react-router-dom";

const Product=()=>{
    const[product,setProduct]=useState([])
    const[loading,setLoading]=useState(true)
    const[delmsg,setDelMsg]=useState(false);
useEffect(()=>{
  getData()
    
},[])

const getData=async()=>{
    setLoading(true)
    try{
    let result=await fetch('http://localhost:5000/product',{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })
    result=await result.json()
    setProduct(result)
    }
    catch(error)
    {
        console.error("error fetching product data",error)
    }
    setLoading(false)
}
  
const handleSubmit=async(id)=>{
    let result=await fetch(`http://localhost:5000/product/${id}`,{
        method:"delete",
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })
     result=await result.json()
     if(result)
     {
        getData();
        setDelMsg(true)
        setTimeout(() => setDelMsg(false), 2000);

     }  
}
    const handleChange=async(e)=>{
        const key=e.target.value
        if(key){
        let result=await fetch(`http://localhost:5000/search/${key}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result=await result.json()
        if(result)
        {
            setProduct(result)
        }
        }
        else{
            getData();
        }
        

    }
   
    return(
        <div className="product-container">
            <h1 className="title">Product List</h1>
            <input type="text" placeholder="Search Product" onChange={handleChange} className="search-input"/>

            {delmsg && <div className="delete-msg">Product deleted successfully.</div>}
            {
            loading? <div className="loader"></div>: product.length>0 
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
            product.map((todo,index)=>(
                <tr key={index._id}>
                <td>{todo.name}</td>
                <td>{todo.price}</td>
                <td>{todo.category}</td>
                <td>{todo.company}</td>
                <td className="action-buttons">
                    <button onClick={()=>handleSubmit(todo._id)}>delete</button>
                    <Link to={`/update/${todo._id}`} className="update-btn">update</Link>
                    </td>
              
                </tr>
            ))
         }
         </tbody>
        
         </table>
         :

         <tr>
             <td className="no-result">No Result found</td>
         </tr>}
        </div>
    )
}
export default Product;