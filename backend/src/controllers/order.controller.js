const orderService = require("../services/order.service");

const placeOrder = async (req, res) => {
  try {
    const order = await orderService.placeOrder(req.userId);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  placeOrder,
};
