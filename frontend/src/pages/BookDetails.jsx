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
  const [imgError, setImgError] = useState(false);
  const [quantity, setQuantity] = useState(1);

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
      <div className="spinner-border text-coffee" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (!book) return (
    <div className="container py-5 mt-5 text-center">
      <h2 className="fw-bold">Book not found</h2>
      <button className="btn btn-coffee mt-3" onClick={() => navigate('/')}>
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
          <div className="card border-0 shadow-lg overflow-hidden p-3 bg-white">


            <img 
              src={!imgError && book.imageUrl ? book.imageUrl : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600'} 
              className="img-fluid rounded-4 shadow-sm" 
              alt={book.title} 
              style={{ width: '100%', height: '550px', objectFit: 'cover' }}
              onError={() => setImgError(true)}
            />
          </div>
        </div>

        <div className="col-md-7 ps-md-5">
          <div className="mb-4">
            <h1 className="display-4 fw-bold mb-2">{book.title}</h1>
            <h4 className="text-muted fw-light mb-4 text-coffee">by {book.author}</h4>
          </div>

          <div className="d-flex align-items-center mb-3">
             <span className="h2 fw-bold text-coffee font-serif">₹{book.price}</span>
          </div>

          <p className="lead text-muted mb-5 lh-lg font-serif">
            Immerse yourself in this captivating masterpiece by {book.author}. 
            A story that explores themes of existence, love, and the human condition in ways 
            you've never experienced before. A must-read for any serious collector.
          </p>

          <div className="glass-card mb-5 d-flex align-items-start gap-3 bg-white border-0 shadow-sm rounded-4">
            <Quote size={20} className="text-coffee mt-1 opacity-25" />
            <p className="mb-0 italic text-muted lh-base small">"A literary triumph. One of the most important books of our generation. A deep dive into the soul of modern literature." — The Sunday Times</p>
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
               <span className="text-coffee fw-semibold uppercase x-small" style={{ letterSpacing: '1px' }}>Qty</span>
               <input 
                 type="number" 
                 min="1" 
                 value={quantity}
                 onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                 className="form-control text-center text-coffee fw-bold border-1 small" 
                 style={{ width: '60px', height: '40px', backgroundColor: '#F9F5F0', borderColor: '#E6DCCD' }}
               />
            </div>
            
            <button 
              className="btn btn-coffee px-4 py-2 rounded-0 d-flex align-items-center justify-content-center shadow-sm"
              style={{ height: '40px', width: '160px', backgroundColor: 'var(--text-coffee)', borderColor: 'var(--text-coffee)' }}
              onClick={() => addToCart(book._id || book.id, quantity)}
            >
              <span className="fw-semibold text-white uppercase text-spacing-1 small">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      <div id="reviews" className="mt-5">
        <ReviewSection 
          bookId={book._id || book.id} 
          onReviewAdded={fetchBookDetails} 
          initialRating={book.averageRating}
          initialCount={book.reviewCount}
        />
      </div>
    </div>
  );
};

export default BookDetails;
