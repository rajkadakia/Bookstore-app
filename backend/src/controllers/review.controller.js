const reviewService = require("../services/review.service");

const addReview = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;

    const review = await reviewService.addReview(
      req.userId,
      bookId,
      rating,
      comment
    );

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByBook(req.params.bookId);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

module.exports = {
  addReview,
  getReviews,
};
