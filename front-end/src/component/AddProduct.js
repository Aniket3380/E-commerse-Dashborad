import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discription, setDiscription] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false)
  const [adeed, setAdded] = useState(false)
  const [image, setImage] = useState("");


  const handleAdd = async () => {

    if (!name || !price || !discription || !company || !image) {
      setError(true)
      setAdded(false)
      return false;
    }
    else if (name || price || discription || company || image) {
      setAdded(true)
      setError(false)

    }
    let result = await fetch("http://localhost:5000/addproduct", {
      method: 'post',
      body: JSON.stringify({ name, price, discription, company ,image}),
      headers: {
        'Content-type': 'application/json',
        authorization: `bearer ${(localStorage.getItem('token'))}`
      }
    })
    result = await result.json()
    if (result) {
      localStorage.setItem('product', JSON.stringify(result))
    }
    setName("");
    setPrice("");
    setDiscription("");
    setCompany("");
    setImage("")
  
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
        placeholder="Enter Product Discription"
        value={discription}
        onChange={(e) => setDiscription(e.target.value)} />

      {
        error && !discription &&
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
      <input
        type="text"
        placeholder="Enter Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      {
        error && !image &&
        <span> Please Enter Image URL </span>
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
