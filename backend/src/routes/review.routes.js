const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const reviewController = require("../controllers/review.controller");

router.post("/", authMiddleware, reviewController.addReview);
router.get("/:bookId", reviewController.getReviews);

module.exports = router;
