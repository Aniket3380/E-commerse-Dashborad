import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const[error,setError]=useState(false)
  const[adeed,setAdded]=useState(false)


  const handleAdd=async()=>{

    if(!name || !price || !category || !company){
        setError(true)
        setAdded(false)
        return false;
    }
    else if(name || price || category || company){
        setAdded(true)
        setError(false)

    }
    let result=await fetch("http://localhost:5000/addproduct",{
        method:'post',
        body:JSON.stringify({name,price,category,company}),
        headers:{'Content-type':'application/json'}
    })
    result=await result.json()
    if(result){
      localStorage.setItem('product',JSON.stringify(result))
    }
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");

    setTimeout(() => {
        setAdded('')
    }, 1000);
  }

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <input
        type="text"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {
        error && !name &&
        <span> Please Enter Name </span>
      }
      <input
        type="number"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {
        error && !price &&
        <span> Please Enter Price</span>
      }
      <input
        type="text"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e)=>setCategory(e.target.value)}/>
    
      {
        error && !category &&
        <span> Please Enter Category</span>
      }
      <input
        type="text"
        placeholder="Enter Product Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {
        error && !company &&
        <span> Please Enter Company </span>
      }
      <button onClick={handleAdd}>Add Product</button>
      {
        adeed && !error &&
        <p>Product Added Succesfully</p>
      }
    </div>
  );
};

export default AddProduct;
