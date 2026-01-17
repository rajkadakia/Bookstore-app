const bookService = require("../services/book.service");

const getBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

module.exports = {
  getBooks,
};
