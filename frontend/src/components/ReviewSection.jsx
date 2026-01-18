import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Send, User } from 'lucide-react';

const ReviewSection = ({ bookId, onReviewAdded, initialRating = 0, initialCount = 0 }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchReviews = async () => {
    if (!bookId) {
      console.warn('ReviewSection: bookId is missing, skipping fetch');
      return;
    }
    
    try {
      setLoading(true);
      console.log(`ReviewSection: Fetching reviews for book ${bookId}`);
      const response = await api.get(`/reviews/${bookId}`);
      console.log('ReviewSection: Received response:', response.data);
      
      const data = Array.isArray(response.data) ? response.data : 
                   (response.data && Array.isArray(response.data.data) ? response.data.data : []);
      
      setReviews(data);
    } catch (error) {
      console.error('ReviewSection: Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchReviews();
    }
  }, [bookId]);

  const reviewsArray = Array.isArray(reviews) ? reviews : [];

  const stats = {
    total: reviewsArray.length > 0 ? reviewsArray.length : initialCount,
    average: reviewsArray.length > 0 
      ? (reviewsArray.reduce((acc, r) => acc + (Number(r.rating) || 0), 0) / reviewsArray.length).toFixed(1) 
      : Number(initialRating).toFixed(1),
    distribution: [5, 4, 3, 2, 1].map(star => ({
      star,
      count: reviewsArray.filter(r => Number(r.rating) === star).length,
      percentage: reviewsArray.length > 0 ? (reviewsArray.filter(r => Number(r.rating) === star).length / reviewsArray.length) * 100 : 0
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('ReviewSection: handleSubmit called');
    if (!user) {
      console.warn('ReviewSection: No user logged in');
      return alert('Please login to write a review');
    }
    
    try {
      console.log('ReviewSection: Submitting review...', { bookId, rating, comment });
      const response = await api.post('/reviews', { bookId, rating, comment });
      console.log('ReviewSection: Review submission response:', response.data);
      
      setComment('');
      setRating(5);
      fetchReviews();
      if (onReviewAdded) {
        console.log('ReviewSection: Calling onReviewAdded callback');
        onReviewAdded();
      }
    } catch (error) {
      console.error('ReviewSection: Error adding review:', error.response?.data || error.message);
      alert(`Failed to add review: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="mt-5 pt-5 border-top">
      <div className="row mb-5 align-items-center">
        <div className="col-md-6">
          <h3 className="fw-bold mb-1">Reader Reviews</h3>
          <p className="text-muted">Join the conversation and share your thoughts.</p>
        </div>
        <div className="col-md-6 text-md-end">
          <div className="d-inline-flex align-items-center bg-light p-3 rounded-4 shadow-sm">
            <div className="me-3">
              <div className="display-5 fw-bold text-coffee mb-0">{stats.average}</div>
              <div className="text-muted small">out of 5.0</div>
            </div>
            <div className="vr mx-3"></div>
            <div>
              <div className="d-flex mb-1">
                {[...Array(5)].map((_, i) => (
                  <BookOpen key={i} size={18} className={i < Math.floor(stats.average) ? "text-coffee" : "text-light"} strokeWidth={2} />
                ))}
              </div>
              <div className="fw-bold small">{stats.total} total reviews</div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white rounded-4">
            <h5 className="fw-bold mb-4">Rating Breakdown</h5>
            {stats.distribution.map((item) => (
              <div key={item.star} className="d-flex align-items-center mb-3">
                <div className="small fw-bold me-3" style={{ minWidth: '50px' }}>{item.star} Stars</div>
                <div className="progress flex-grow-1 rounded-pill" style={{ height: '8px', backgroundColor: '#E6DCCD' }}>
                  <div 
                    className="progress-bar rounded-pill" 
                    role="progressbar" 
                    style={{ width: `${item.percentage}%`, backgroundColor: '#795548' }}
                  ></div>
                </div>
                <div className="small text-muted ms-3" style={{ minWidth: '35px' }}>{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-8">
          {user ? (
            <div className="card border-0 shadow-sm p-4 h-100 bg-white rounded-4 border-start border-coffee border-4">
              <h5 className="fw-bold mb-3 d-flex align-items-center">
                <Send size={18} className="text-coffee me-2" /> Write a Review
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="d-flex gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <BookOpen 
                      key={s} 
                      size={28} 
                      className={`cursor-pointer transition-all ${s <= rating ? "text-coffee scale-110" : "text-mocha opacity-25"}`}
                      onClick={() => setRating(s)}
                      strokeWidth={2}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>
                <div className="mb-3">
                  <textarea 
                    className="form-control border-0 bg-light rounded-3 p-3" 
                    rows="3" 
                    placeholder="Describe your reading experience..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-coffee px-4 py-2 rounded-pill fw-bold">
                  Submit Review
                </button>
              </form>
            </div>
          ) : (
            <div className="card border-0 shadow-sm p-5 h-100 bg-coffee-soft text-coffee rounded-4 text-center d-flex flex-column justify-content-center">
              <h5 className="fw-bold mb-3">Share Your Thoughts!</h5>
              <p className="mb-4 opacity-75">Sign in to leave a review and help other readers discover this masterpiece.</p>
              <div>
                <a href="/login" className="btn btn-coffee px-5 py-2 rounded-pill fw-bold">Login Now</a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="reviews-list">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-coffee" />
            <p className="mt-3 text-muted">Loading reviews...</p>
          </div>
        ) : reviews.length > 0 ? (
          <div className="row">
            {reviews.map((review) => (
              <div key={review._id} className="col-md-6 mb-4">
                <div className="card border-0 shadow-sm p-4 h-100 bg-white rounded-4 review-card">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-coffee-soft p-3 rounded-circle me-3">
                      <User size={20} className="text-coffee" />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0">{review.userId?.name || 'Anonymous Reader'}</h6>
                      <div className="d-flex align-items-center">
                        {[...Array(5)].map((_, i) => (
                          <BookOpen key={i} size={12} className={i < review.rating ? "text-coffee" : "text-light"} strokeWidth={2} />
                        ))}
                        <span className="ms-2 x-small text-muted">
                          {new Date(review.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted mb-0 lh-base italic">"{review.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5 bg-light rounded-4 border-dashed">
            <p className="text-muted mb-0">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
