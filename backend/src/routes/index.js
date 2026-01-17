const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/books", require("./book.routes"));
router.use("/cart", require("./cart.routes"));
router.use("/reviews", require("./review.routes"));
router.use("/orders", require("./order.routes"));

module.exports = router;
