const reviewService = require("../services/review.service");

const addReview = async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    console.log(`Backend: Adding review for book ${bookId} by user ${req.userId}`);
    console.log(`Data: rating=${rating}, comment=${comment}`);

    const review = await reviewService.addReview(
      req.userId,
      bookId,
      rating,
      comment
    );

    console.log(`Backend: Review added successfully: ${review._id}`);
    res.status(201).json(review);
  } catch (error) {
    console.error('Backend: Error adding review:', error);
    res.status(400).json({ error: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const { bookId } = req.params;
    console.log(`Backend: Fetching reviews for bookId: ${bookId}`);
    const reviews = await reviewService.getReviewsByBook(bookId);
    console.log(`Backend: Found ${reviews.length} reviews`);
    res.json(reviews);
  } catch (error) {
    console.error('Backend: Error fetching reviews:', error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

module.exports = {
  addReview,
  getReviews,
};
