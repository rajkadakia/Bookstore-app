const Book = require("../models/book.model");
const { getCache, setCache, deleteCache } = require("../utils/cache");

const BOOKS_CACHE_KEY = "books:all";
const BOOKS_CACHE_TTL = 300; 

const getAllBooks = async (search = "") => {
  if (search) {
    return await Book.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ],
    });
  }

  const cachedBooks = await getCache(BOOKS_CACHE_KEY);
  if (cachedBooks) {
    return cachedBooks;
  }

  const books = await Book.find();

  await setCache(BOOKS_CACHE_KEY, books, BOOKS_CACHE_TTL);

  return books;
};

const getBookById = async (id) => {
  const cacheKey = `book:${id}`;
  const cachedBook = await getCache(cacheKey);
  if (cachedBook) return cachedBook;

  const book = await Book.findById(id);
  if (book) {
    await setCache(cacheKey, book, BOOKS_CACHE_TTL);
  }
  return book;
};

const clearBookCache = async (id = null) => {
  await deleteCache(BOOKS_CACHE_KEY);
  if (id) {
    await deleteCache(`book:${id}`);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  clearBookCache,
};
