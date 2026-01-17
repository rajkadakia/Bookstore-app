const Book = require("../models/book.model");
const { getCache, setCache } = require("../utils/cache");

const BOOKS_CACHE_KEY = "books:all";
const BOOKS_CACHE_TTL = 300; // 5 minutes

const getAllBooks = async () => {
  
  const cachedBooks = await getCache(BOOKS_CACHE_KEY);
  if (cachedBooks) {
    return cachedBooks;
  }

 
  const books = await Book.find();

  await setCache(BOOKS_CACHE_KEY, books, BOOKS_CACHE_TTL);

  return books;
};

module.exports = {
  getAllBooks,
};
