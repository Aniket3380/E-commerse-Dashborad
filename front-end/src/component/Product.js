import React, { useEffect, useState } from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import {useCart} from "./CartContext"

const Product = () => {
  const role = localStorage.getItem("role");
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delmsg, setDelMsg] = useState(false);
  const [expanded, setExpanded] = useState({});
  const {addToCart}=useCart();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      let result = await fetch("http://localhost:5000/product", {
        headers: {
          authorization: `bearer ${(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setProduct(result);
    } catch (error) {
      console.error("error fetching product data", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getData();
      setDelMsg(true);
      setTimeout(() => setDelMsg(false), 2000);
    }
  };

  const handleChange = async (e) => {
    const key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProduct(result);
      }
    } else {
      getData();
    }
  };

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="product-page-wrapper">
      <h1 className="title">Products</h1>
      <input
        type="text"
        placeholder="Search Product"
        onChange={handleChange}
        className="search-input"
      />

      <div className="product-grid">
        {product.map((item) => (
          <div className="product-card" key={item._id}>
            <div className="product-info">
              <div className="product-card-img-box">
                {item.image && item.image.includes("https") ? (
                  <img src={item.image} alt={item.name} className="product-img" />
                ) : (
                  <div className="product-card-img-box-non">📦</div>
                )}
              </div>
              <h3 className="name">{item.name}</h3>
              <p className="price">₹{item.price}</p>
              <p className="company">{item.company}</p>
              <p className={`description ${expanded[item._id] ? "expanded" : ""}`}>
  {item.discription || "No description available"}
</p>

              {item.discription && item.discription.length > 60 && (
                <button
                  className="read-more-btn"
                  onClick={() => toggleReadMore(item._id)}
                >
                  {expanded[item._id] ? "Read Less" : "Read More"}
                </button>
              )}
            </div>

            <div className="product-actions">
              <Link to={`/product/${item._id}`} className="view-btn">
                View
              </Link>

              {role === "admin" && (
                <>
                  <button
                    onClick={() => handleSubmit(item._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                  <Link to={`/update/${item._id}`} className="update-btn">
                    Update
                  </Link>
                </>
              )}
              {
                role==='customer' && 
                <button onClick={()=>addToCart(item)} className="add-to-cart-btn">
                      <Link to="/cart">Add To Cart</Link>  
                </button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
