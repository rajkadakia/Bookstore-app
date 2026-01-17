const Review = require("../models/review.model");
const Book = require("../models/book.model");
const { getCache, setCache } = require("../utils/cache");

const REVIEWS_CACHE_TTL = 300; // 5 minutes

const { deleteCache } = require("../utils/cache");

const addReview = async (userId, bookId, rating, comment) => {
  const review = await Review.create({
    userId,
    bookId,
    rating,
    comment,
  });

  const reviews = await Review.find({ bookId });

  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  await Book.findByIdAndUpdate(bookId, {
    averageRating: avgRating.toFixed(1),
  });

  
  await deleteCache(`reviews:${bookId}`);

  return review;
};


const getReviewsByBook = async (bookId) => {
  const cacheKey = `reviews:${bookId}`;

  
  const cachedReviews = await getCache(cacheKey);
  if (cachedReviews) {
    return cachedReviews;
  }

  const reviews = await Review.find({ bookId }).populate("userId", "name");

  
  await setCache(cacheKey, reviews, REVIEWS_CACHE_TTL);

  return reviews;
};

module.exports = {
  addReview,
  getReviewsByBook,
};
