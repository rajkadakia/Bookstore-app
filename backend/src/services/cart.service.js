const Cart = require("../models/cart.model");
const Book = require("../models/book.model");

const getCart = async (userId) => {
  let cart = await Cart.findOne({ userId }).populate("items.bookId");

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  return cart;
};

const addToCart = async (userId, bookId, quantity = 1) => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new Error("Book not found");
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  const bookIdStr = bookId.toString();
  const existingItems = cart.items.filter(
    (item) => item.bookId.toString() === bookIdStr
  );

  if (existingItems.length > 0) {
    const totalCurrentQty = existingItems.reduce((sum, item) => sum + item.quantity, 0);
    const newQuantity = totalCurrentQty + quantity;
    
    if (newQuantity > 10) {
      throw new Error("Out of Stock");
    }

    // Remove all existing instances of this book
    cart.items = cart.items.filter(
      (item) => item.bookId.toString() !== bookIdStr
    );
    
    // Add single merged instance
    cart.items.push({ bookId, quantity: newQuantity });
  } else {
    if (quantity > 10) {
      throw new Error("Out of Stock");
    }
    cart.items.push({ bookId, quantity });
  }

  await cart.save();
  return cart;
};

const removeFromCart = async (userId, bookId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.bookId.toString() !== bookId
  );

  await cart.save();
  return cart;
};

const clearCart = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = [];
  await cart.save();
  return cart;
};

const updateQuantity = async (userId, bookId, quantity) => {
  if (quantity < 1) {
    return removeFromCart(userId, bookId);
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  const bookIdStr = bookId.toString();
  if (quantity > 10) {
    throw new Error("Out of Stock");
  }

  // Remove all existing instances of this book and add back one with the new quantity
  cart.items = cart.items.filter(
    (item) => item.bookId.toString() !== bookIdStr
  );
  
  cart.items.push({ bookId, quantity });
  await cart.save();

  return cart;
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
};
