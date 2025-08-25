import React from "react";
import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import "./cart.css";
import API_BASE_URL from "../config";

const Cart = () => {
  const { cart, clearCart, removeFromCart, updateQuntity } = useCart();
  console.log(cart)
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();


  const placeOrder = async () => {
    const orderPayload = {
      userId: user._id,
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        discription: item.discription,
        company: item.company,
        image: item.image,
        quantity: item.quantity,
      })),
    };

    let result = await fetch(`${API_BASE_URL}/order`, {
      method: "POST",
      body: JSON.stringify(orderPayload),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    result = await result.json();
    if (result._id) {
      alert("Order placed successfully!");
      clearCart();
      navigate("/orders");
    } else {
      alert("Order failed!");
    }
  };

  const totalPrice = Array.isArray(cart)
    ? cart.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  return (
    <div className="cart-wrapper">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <div className="quantity-control">
                    <button
                      onClick={() => updateQuntity(item._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="quantity-number">{item.quantity}</span>
                    <button
                      onClick={() => updateQuntity(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <p>Price: ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <Link to="/" className="continue-link">← Continue Shopping</Link>
            <div className="cart-total">Total: ₹{totalPrice}</div>
          </div>

          <button onClick={placeOrder} className="place-order-btn">
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
