import React, { useEffect, useState } from "react";
import "./AddProduct.css"
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = (data) => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [notFound, setNotFound] = useState(false)
    const [loading, setLoading] = useState(true);
   

    let params = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (!params.id) {
            setNotFound(true)
            setLoading(false);
            return;
        }
        getProductDetails();

    }, [params.id]);

    const getProductDetails = async () => {
        setLoading(true);
        try {
            let result = await fetch(`http://localhost:5000/product/${params.id}`,{
              headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
            });
            if (!result.ok) {
              setNotFound(true);
            } else {
              result = await result.json();
              setName(result.name);
              setPrice(result.price);
              setCategory(result.category);
              setCompany(result.company);
            }
          } catch (err) {
            console.error("Error fetching product:", err);
            setNotFound(true);
          }
          setLoading(false);
         
        };


    

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, price, category, company }),
            headers: { 'Content-Type': 'application/json',
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
             }
        })
        result = await result.json()
      
        navigate('/')


    }

    if (loading) {
        return (
          <div className="add-product-container">
            <div className="loader">Loading...</div>
          </div>
        );
      }

    if(notFound)
    {
        return (
            <div className="add-product-container">
              <h2>Invalid Access</h2>
              <p>
                Please go to the <strong>Product List</strong> and click on{" "}
                <strong>Update</strong> to edit a product.
              </p>
              <button onClick={() => navigate("/")}>Go to Product List</button>
            </div>
          );
    }


    return (

        <div className="add-product-container">
            <h2>Update New Product</h2>
      <input
        type="text"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
 
      <input
        type="number"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      
      <input
        type="text"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e)=>setCategory(e.target.value)}/>
    
     
     
      <input
        type="text"
        placeholder="Enter Product Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      
      <button onClick={updateProduct}>Update Product</button>    
        </div >

)
}
export default UpdateProduct;