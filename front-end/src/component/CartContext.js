import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    console.log("Product added:", product);
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const clearCart = () => setCart([]);

  const removeFromCart=(productId)=>{
    setCart((prev)=>prev.filter((item)=>item._id !==productId))
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart ,removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};
