import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../api/client';
import { useCart } from '../context/CartContext';
import { Star } from 'lucide-react';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/books${searchQuery ? `?search=${searchQuery}` : ''}`);
        const booksData = response.data.data || (Array.isArray(response.data) ? response.data : []);
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchQuery]);

  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      {/* Main Content */}
      <div className="container py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0" style={{ fontFamily: 'Roboto', fontWeight: '400', color: '#333' }}>
            Books <span style={{ color: '#999', fontSize: '14px' }}>(128 items)</span>
          </h2>
          <div>
            <label className="me-2 small" style={{ color: '#666' }}>Sort by relevance</label>
            <select className="form-select form-select-sm d-inline-block" style={{ width: 'auto', borderColor: '#DDD' }}>
              <option>Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: '#A94442' }} role="status"></div>
            <p className="mt-2 text-muted">Loading books...</p>
          </div>
        ) : (
          <>
            {/* Books Grid */}
            <div className="row g-4">
              {books.length > 0 ? (
                books.map((book) => (
                  <div key={book._id} className="col-6 col-md-4 col-lg-3">
                    <BookCard book={book} addToCart={addToCart} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p className="text-muted">No books found</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {books.length > 0 && (
              <div className="d-flex justify-content-center align-items-center mt-5 gap-2">
                <button className="btn btn-sm" style={{ border: '1px solid #DDD', backgroundColor: 'white' }}>
                  &lt;
                </button>
                <button className="btn btn-sm text-white" style={{ backgroundColor: '#A94442', border: 'none' }}>
                  1
                </button>
                {[2, 3, 4, 5, 6, 7, 8].map(num => (
                  <button key={num} className="btn btn-sm" style={{ border: '1px solid #DDD', backgroundColor: 'white' }}>
                    {num}
                  </button>
                ))}
                <span>...</span>
                <button className="btn btn-sm" style={{ border: '1px solid #DDD', backgroundColor: 'white' }}>
                  18
                </button>
                <button className="btn btn-sm" style={{ border: '1px solid #DDD', backgroundColor: 'white' }}>
                  &gt;
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-5 py-3 text-center text-white" style={{ backgroundColor: '#2C2C2C' }}>
        <p className="mb-0 small">Copyright © 2020, Bookstore Private Limited. All Rights Reserved</p>
      </footer>
    </div>
  );
};

const BookCard = ({ book, addToCart }) => {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isOutOfStock = book.stock === 0 || book.availability === 'out_of_stock';

  return (
    <div 
      className="card h-100 border-0 shadow-sm position-relative" 
      style={{ borderRadius: '8px', overflow: 'hidden', maxWidth: '235px', margin: '0 auto' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Book Image */}
      <div className="position-relative" style={{ backgroundColor: '#F9F9F9', height: '275px' }}>
        <Link to={`/books/${book._id}`} className="text-decoration-none">
          <img 
            src={!imgError && book.imageUrl ? book.imageUrl : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300'} 
            alt={book.title}
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ objectFit: 'cover' }}
            onError={() => setImgError(true)}
          />
        </Link>
        
        {/* Out of Stock Badge */}
        {isOutOfStock && (
          <div className="position-absolute top-50 start-50 translate-middle text-center">
            <div className="bg-warning text-dark px-3 py-2 fw-bold" style={{ fontSize: '12px' }}>
              OUT OF STOCK
            </div>
          </div>
        )}

        {/* Add to Bag Button - Visible on Hover */}
        {!isOutOfStock && isHovered && (
          <div className="position-absolute bottom-0 w-100 p-2">
            <button 
              className="btn w-100 text-white"
              style={{ backgroundColor: '#A94442', border: 'none', borderRadius: '4px', padding: '10px 0', fontSize: '14px', fontWeight: '500' }}
              onClick={() => addToCart(book._id)}
            >
              ADD TO BAG
            </button>
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="card-body p-3">
        <Link to={`/books/${book._id}`} className="text-decoration-none">
          <h6 className="card-title mb-2" style={{ 
            fontFamily: 'Roboto', 
            fontSize: '14px', 
            fontWeight: '500',
            color: '#333',
            height: '40px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {book.title}
          </h6>
        </Link>
        
        <p className="text-muted mb-2" style={{ fontSize: '12px' }}>
          by {book.author || 'Unknown'}
        </p>

        {/* Rating */}
        <div className="d-flex align-items-center gap-1 mb-2">
          <div className="d-flex align-items-center px-2 py-1" style={{ 
            backgroundColor: '#5CB85C', 
            borderRadius: '4px',
            fontSize: '11px',
            color: 'white'
          }}>
            <span className="fw-bold">{book.averageRating ? book.averageRating.toFixed(1) : '0.0'}</span>
            <Star size={10} fill="white" className="ms-1" />
          </div>
          <span className="text-muted" style={{ fontSize: '11px' }}>({book.reviewCount || 0})</span>
        </div>

        {/* Price */}
        <div className="d-flex align-items-center gap-2">
          <span className="fw-bold" style={{ fontSize: '16px', color: '#333' }}>
            Rs. {book.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
