require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const Book = require("../models/book.model");

const SEARCH_TERMS = [
  "software engineering",
  "computer science",
  "programming",
  "algorithms",
  "data structures",
  "system design",
  "web development",
  "backend development"
];

const fetchBooks = async (query) => {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    query
  )}&limit=100`;

  const response = await axios.get(url);
  return response.data.docs || [];
};

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Book.deleteMany();

    const bookMap = new Map();

    for (const term of SEARCH_TERMS) {
      const results = await fetchBooks(term);

      results.forEach((item) => {
        if (!item.title || !item.author_name) return;

        const title = item.title.trim();

        if (!bookMap.has(title)) {
         const coverId = item.cover_i;

const imageUrl = coverId
  ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
  : "https://via.placeholder.com/300x450?text=No+Cover";

bookMap.set(title, {
  title,
  author: item.author_name.slice(0, 3).join(", "),
  price: Math.floor(Math.random() * (999 - 199 + 1)) + 199,
  averageRating: 0,
  imageUrl,
});

        }
      });
    }

    const books = Array.from(bookMap.values()).slice(0, 120);
    await Book.insertMany(books);

    console.log(`Seeded ${books.length} books from Open Library`);
    process.exit();
  } catch (error) {
    console.error("Open Library seeding failed:", error.message);
    process.exit(1);
  }
};

seedBooks();
