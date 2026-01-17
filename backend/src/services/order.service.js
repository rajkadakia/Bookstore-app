const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Book = require("../models/book.model");
const mockPayment = require("../utils/mockPayment");

const placeOrder = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate("items.bookId");

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  let totalAmount = 0;

  const orderItems = cart.items.map((item) => {
    totalAmount += item.bookId.price * item.quantity;

    return {
      bookId: item.bookId._id,
      title: item.bookId.title,
      price: item.bookId.price,
      quantity: item.quantity,
    };
  });

  const paymentResult = mockPayment(userId, totalAmount);

  const order = await Order.create({
    userId,
    items: orderItems,
    totalAmount,
    paymentStatus: paymentResult.status,
  });

  cart.items = [];
  await cart.save();

  return order;
};

module.exports = {
  placeOrder,
};
