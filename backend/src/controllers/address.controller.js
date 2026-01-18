const addressService = require("../services/address.service");

const addAddress = async (req, res) => {
  try {
    const address = await addressService.addAddress(req.userId, req.body);
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAddresses = async (req, res) => {
  try {
    const addresses = await addressService.getAddresses(req.userId);
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAddress = async (req, res) => {
  try {
    const address = await addressService.updateAddress(req.params.id, req.userId, req.body);
    res.json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    await addressService.deleteAddress(req.params.id, req.userId);
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress
};
