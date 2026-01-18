import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/client';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const response = await api.get('/cart');
      setCart(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (bookId, quantity = 1) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }


    const existingItem = cart?.items?.find(item => (item.bookId?._id || item.bookId) === bookId);
    const currentQty = existingItem ? existingItem.quantity : 0;
    
    if (currentQty + quantity > 10) {
      alert('Out of Stock');
      return;
    }

    try {
      await api.post('/cart/add', { bookId, quantity });
      await fetchCart();
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.response?.data?.message;
      if (errorMsg === 'Out of Stock') {
        alert('Out of Stock');
      } else {
        console.error('Error adding to cart:', error);
        alert('Failed to add to cart');
      }
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      await api.delete(`/cart/remove/${bookId}`);
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart/clear');
      await fetchCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, clearCart, cartCount, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
