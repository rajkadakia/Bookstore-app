const mockPayment = (userId, amount) => {
  console.log("Payment successful for user:", userId);
  return { status: "SUCCESS" };
};

module.exports = mockPayment;
