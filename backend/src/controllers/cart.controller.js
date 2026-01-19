const cartService = require("../services/cart.service");

const getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.userId);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;
    const cart = await cartService.addToCart(
      req.userId,
      bookId,
      quantity
    );
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await cartService.removeFromCart(
      req.userId,
      req.params.bookId
    );
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await cartService.clearCart(req.userId);
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;
    const cart = await cartService.updateQuantity(
      req.userId,
      bookId,
      quantity
    );
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
};
