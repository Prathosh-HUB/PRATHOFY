import React, { createContext, useContext, useState } from "react";

const CartContext = createContext(); //  Creates a Cart Context

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to Add Product to Cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to Remove Product from Cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  //  Function to Clear Cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

//  Custom Hook to Use Cart Context
export const useCart = () => {
  return useContext(CartContext);
};
