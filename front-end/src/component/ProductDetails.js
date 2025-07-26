import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetails.css"; // optional: for custom styling

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        headers: {
          authorization: `bearer ${JSON.parse((localStorage.getItem("token")))}`,
        },
      });
      result = await result.json();
      setProduct(result);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    setLoading(false);
  };

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Product not found.</h2>;

  return (
    <div className="product-details-wrapper">
      <h1>Product Details</h1>

      <div className="product-details-card">
      <div className="product-details-img-box">
                  {( product.image && product.image.includes('https')) ?
                (<img src={product.image } alt={product.name} />)
                :
                (<div className="product-details-img-box-non">📦</div> )
                  }
       </div>
        <div className="details-content">
          <h2>{product.name}</h2>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Company:</strong> {product.company}</p>
          <p><strong>Description:</strong> {product.description || "No description available."}</p>
        </div>
      </div>

      <div className="details-buttons">
        <Link to="/" className="view-btn">Back to Products</Link>
        {role === "admin" && (
          <>
            <Link to={`/update/${product._id}`} className="update-btn">Update</Link>
            {/* Optional: delete from here too if needed */}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
