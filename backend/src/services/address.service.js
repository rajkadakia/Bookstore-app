const Address = require("../models/address.model");

const addAddress = async (userId, addressData) => {
  const addressCount = await Address.countDocuments({ userId });
  const isDefault = addressCount === 0;

  const address = await Address.create({
    userId,
    ...addressData,
    isDefault: addressData.isDefault || isDefault
  });

  if (address.isDefault) {
    await Address.updateMany(
      { userId, _id: { $ne: address._id } },
      { isDefault: false }
    );
  }

  return address;
};

const getAddresses = async (userId) => {
  return await Address.find({ userId }).sort({ createdAt: -1 });
};

const updateAddress = async (addressId, userId, addressData) => {
  const address = await Address.findOneAndUpdate(
    { _id: addressId, userId },
    addressData,
    { new: true }
  );

  if (!address) {
    throw new Error("Address not found");
  }

  if (address.isDefault) {
    await Address.updateMany(
      { userId, _id: { $ne: address._id } },
      { isDefault: false }
    );
  }

  return address;
};

const deleteAddress = async (addressId, userId) => {
  const address = await Address.findOneAndDelete({ _id: addressId, userId });
  if (!address) {
    throw new Error("Address not found");
  }
  return address;
};

const getAddressById = async (addressId, userId) => {
  const address = await Address.findOne({ _id: addressId, userId });
  if (!address) {
    throw new Error("Address not found");
  }
  return address;
};

module.exports = {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  getAddressById
};
