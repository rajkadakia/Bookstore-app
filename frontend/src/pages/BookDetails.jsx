import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/client';
import { useCart } from '../context/CartContext';
import ReviewSection from '../components/ReviewSection';
import { ShoppingCart, Star, ArrowLeft, Quote } from 'lucide-react';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBookDetails = async () => {
    try {
      console.log(`BookDetails: Fetching book with ID: ${id}`);
      const response = await api.get(`/books/${id}`);
      console.log('BookDetails: Received book data:', response.data);
      setBook(response.data);
    } catch (error) {
      console.error('BookDetails: Error fetching book details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  if (loading) return (
    <div className="container py-5 mt-5 text-center">
      <div className="spinner-border text-emerald" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (!book) return (
    <div className="container py-5 mt-5 text-center">
      <h2 className="fw-bold">Book not found</h2>
      <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
        Back to Library
      </button>
    </div>
  );

  return (
    <div className="container py-5 mt-5">
      <button className="btn btn-link text-decoration-none text-muted p-0 mb-4 d-flex align-items-center" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} className="me-1" /> Back to Collection
      </button>

      <div className="row g-5">
        <div className="col-md-5">
          <div className="card border-0 shadow-lg overflow-hidden p-3 bg-white hover-lift">
            <img 
              src={book.imageUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600'} 
              className="img-fluid rounded-4 shadow-sm" 
              alt={book.title} 
              style={{ width: '100%', height: '550px', objectFit: 'cover' }}
            />
          </div>
        </div>

        <div className="col-md-7 ps-md-5">
          <div className="mb-4">
            <span className="badge bg-emerald-soft text-emerald px-3 py-2 rounded-pill mb-2">Editor's Choice</span>
            <h1 className="display-4 fw-bold mb-2">{book.title}</h1>
            <h4 className="text-muted fw-light mb-4 text-emerald">by {book.author}</h4>
          </div>

          <div className="d-flex align-items-center gap-4 mb-4 bg-light p-3 rounded-4 shadow-sm border border-white">
            <div className="d-flex align-items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={i < Math.floor(book.averageRating || 0) ? "text-warning fill-warning" : "text-light"} />
              ))}
              <span className="ms-2 fw-bold fs-5">{book.averageRating || '0'}</span>
              <a href="#reviews" className="ms-2 text-emerald x-small text-decoration-none hover-underline">
                ({book.reviewCount || 0} reviews)
              </a>
            </div>
            <div className="vr opacity-10"></div>
            <div className="text-emerald fw-bold fs-3">${book.price}</div>
          </div>

          <p className="lead text-muted mb-5 lh-lg font-serif">
            Immerse yourself in this captivating masterpiece by {book.author}. 
            A story that explores themes of existence, love, and the human condition in ways 
            you've never experienced before. A must-read for any serious collector.
          </p>

          <div className="glass-card mb-5 d-flex align-items-start gap-3 bg-white border-0 shadow-sm rounded-4">
            <Quote size={24} className="text-emerald mt-1 opacity-25" />
            <p className="mb-0 italic text-muted lh-base">"A literary triumph. One of the most important books of our generation. A deep dive into the soul of modern literature." — The Sunday Times</p>
          </div>

          <div className="d-grid gap-3 d-md-flex">
            <button 
              className="btn btn-emerald btn-lg px-5 py-3 rounded-pill d-flex align-items-center justify-content-center shadow-sm"
              onClick={() => addToCart(book._id || book.id)}
            >
              <ShoppingCart size={20} className="me-2" /> Add to Cart
            </button>
            <button className="btn btn-outline-emerald btn-lg px-5 py-3 rounded-pill">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      <div id="reviews" className="mt-5">
        <ReviewSection bookId={book._id || book.id} onReviewAdded={fetchBookDetails} />
      </div>
    </div>
  );
};

export default BookDetails;
