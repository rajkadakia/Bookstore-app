const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address.controller");
const auth = require("../middlewares/auth.middleware");

router.use(auth);

router.post("/", addressController.addAddress);
router.get("/", addressController.getAddresses);
router.put("/:id", addressController.updateAddress);
router.delete("/:id", addressController.deleteAddress);

module.exports = router;
