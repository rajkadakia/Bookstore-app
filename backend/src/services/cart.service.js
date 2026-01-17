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

  const itemIndex = cart.items.findIndex(
    (item) => item.bookId.toString() === bookId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
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

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};
