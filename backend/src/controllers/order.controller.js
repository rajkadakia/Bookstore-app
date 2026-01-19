const orderService = require("../services/order.service");

const placeOrder = async (req, res) => {
  try {
    const { addressId } = req.body;
    const order = await orderService.placeOrder(req.userId, addressId);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const orders = await orderService.getUserOrders(req.userId);
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
};
