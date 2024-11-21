// src/components/CartContext.js
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Retrieve cart from localStorage or use an empty array if not found
  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart')) || [];

  // Initialize the cart state with data from localStorage
  const [cart, setCart] = useState(cartFromLocalStorage);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (product) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== product.id)
    );
  };

  // Update item quantity in cart
  const updateCartItemQuantity = (product, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: Math.max(quantity, 1) }
          : item
      )
    );
  };

  // Save the cart to localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};