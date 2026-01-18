import React, { useState, useEffect } from 'react';
import api from '../api/client';
import BookCard from '../components/BookCard';
import { ArrowRight, BookOpen, Coffee, Headphones } from 'lucide-react';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books');
        // Handle both standard response formats
        const booksData = response.data.data || (Array.isArray(response.data) ? response.data : []);
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="display-3 fw-bold mb-4">Discover Your Next Great Adventure</h1>
              <p className="fs-5 mb-5 opacity-75">
                Explore thousands of curated titles from around the world. From timeless classics 
                to modern masterpieces, find the book that speaks to your soul.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-warning btn-lg px-4 fw-bold">Shop Collection</button>
                <button className="btn btn-outline-light btn-lg px-4">Learn More</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="container mb-5 py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="glass-card text-center h-100 bg-white">
              <BookOpen size={40} className="text-emerald mb-3" />
              <h3 className="h5 fw-bold">Classic Literature</h3>
              <p className="small text-muted">Timeless pieces that shaped history.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card text-center h-100 bg-white">
              <Headphones size={40} className="text-emerald mb-3" />
              <h3 className="h5 fw-bold">Audio Books</h3>
              <p className="small text-muted">Immersive stories for your journey.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card text-center h-100 bg-white">
              <Coffee size={40} className="text-emerald mb-3" />
              <h3 className="h5 fw-bold">Modern Fiction</h3>
              <p className="small text-muted">Contemporary voices and fresh perspectives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h2 className="fw-bold mb-0">Curated For You</h2>
            <p className="text-muted mb-0">Our latest additions to the library</p>
          </div>
          <button className="btn btn-link text-emerald fw-semibold text-decoration-none d-flex align-items-center">
            View All <ArrowRight size={20} className="ms-1" />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-emerald" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {books.length > 0 ? (
              books.slice(0, 8).map(book => (
                <BookCard key={book._id} book={book} />
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted">No books found. Check back later!</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
