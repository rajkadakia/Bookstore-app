const bookService = require("../services/book.service");

const getBooks = async (req, res) => {
  try {
    const { search } = req.query;
    const books = await bookService.getAllBooks(search);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

module.exports = {
  getBooks,
  getBookById,
};
