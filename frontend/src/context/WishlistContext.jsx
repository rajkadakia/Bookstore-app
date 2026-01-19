import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (book) => {
    if (!wishlist.find(item => item._id === book._id)) {
      setWishlist([...wishlist, book]);
    }
  };

  const removeFromWishlist = (bookId) => {
    setWishlist(wishlist.filter(item => item._id !== bookId));
  };

  const isWishlisted = (bookId) => {
    return wishlist.some(item => item._id === bookId);
  };

  const toggleWishlist = (book) => {
    if (isWishlisted(book._id)) {
      removeFromWishlist(book._id);
    } else {
      addToWishlist(book);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
