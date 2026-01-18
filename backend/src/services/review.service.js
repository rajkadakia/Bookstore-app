const Review = require("../models/review.model");
const Book = require("../models/book.model");
const { getCache, setCache } = require("../utils/cache");

const REVIEWS_CACHE_TTL = 300; // 5 minutes

const { deleteCache } = require("../utils/cache");

const addReview = async (userId, bookId, rating, comment) => {
  console.log('Service: Creating review document...');
  const review = await Review.create({
    userId,
    bookId,
    rating,
    comment,
  });

  console.log('Service: Recalculating average rating...');
  const reviews = await Review.find({ bookId });

  const avgRating = reviews.length > 0 ? 
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  console.log(`Service: New avgRating=${avgRating.toFixed(1)}, reviewCount=${reviews.length}`);
  
  await Book.findByIdAndUpdate(bookId, {
    averageRating: parseFloat(avgRating.toFixed(1)),
    reviewCount: reviews.length,
  });

  console.log('Service: Clearing caches...');
  const bookService = require("./book.service");
  await bookService.clearBookCache(bookId);
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
