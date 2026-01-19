import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api/client';
import { useCart } from '../context/CartContext';
import { Star, Heart } from 'lucide-react';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);

  const fetchBookDetails = async () => {
    try {
      const response = await api.get(`/books/${id}`);
      setBook(response.data);
      
      // Fetch real reviews
      try {
        const reviewsResponse = await api.get(`/reviews/${id}`);
        setReviews(reviewsResponse.data || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews([]);
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const handleAddToBag = () => {
    addToCart(book._id || book.id, 1);
  };

  const handleSubmitReview = async () => {
    if (userRating === 0) {
      alert('Please select a rating');
      return;
    }
    try {
      await api.post('/reviews', {
        bookId: id,
        rating: userRating,
        comment: reviewText
      });
      // Refresh reviews after submission
      const reviewsResponse = await api.get(`/reviews/${id}`);
      setReviews(reviewsResponse.data || []);
      setUserRating(0);
      setReviewText('');
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please login first.');
    }
  };

  if (loading) return (
    <div className="container py-5 text-center">
      <div className="spinner-border" style={{ color: '#A94442' }} role="status"></div>
    </div>
  );

  if (!book) return (
    <div className="container py-5 text-center">
      <h2>Book not found</h2>
      <button className="btn mt-3" style={{ backgroundColor: '#A94442', color: 'white' }} onClick={() => navigate('/home')}>
        Back to Home
      </button>
    </div>
  );

  const bookImages = [book.imageUrl, book.imageUrl]; // Placeholder for multiple images

  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      <div className="container py-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-4" style={{ fontSize: '12px' }}>
            <li className="breadcrumb-item">
              <Link to="/home" style={{ color: '#999', textDecoration: 'none' }}>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page" style={{ color: '#333' }}>
              / Book(01)
            </li>
          </ol>
        </nav>

        <div className="row bg-white rounded shadow-sm p-4">
          {/* Left Side - Images and Actions */}
          <div className="col-md-5">
            <div className="d-flex gap-3 mb-2">
              {/* Thumbnails - Vertical stack */}
              <div className="d-flex flex-column gap-2" style={{ width: '50px' }}>
                {bookImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    style={{
                      width: '50px',
                      height: '65px',
                      border: selectedImage === idx ? '1px solid #A94442' : '1px solid #DDD',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={!imgError && img ? img : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300'}
                      alt={`Thumbnail ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={() => setImgError(true)}
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-grow-1" style={{ border: '1px solid #EEE', borderRadius: '4px', overflow: 'hidden', height: '380px' }}>
                <img
                  src={!imgError && bookImages[selectedImage] ? bookImages[selectedImage] : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400'}
                  alt={book.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#fff' }}
                  onError={() => setImgError(true)}
                />
              </div>
            </div>

            {/* Action Buttons - Aligned with the main image */}
            <div className="d-flex gap-3 mt-3" style={{ marginLeft: '66px' }}>
              <button
                onClick={handleAddToBag}
                className="btn text-white fw-bold d-flex align-items-center justify-content-center"
                style={{ backgroundColor: '#A94442', height: '40px', width: '170px', fontSize: '13px', borderRadius: '2px', border: 'none' }}
              >
                ADD TO BAG
              </button>
              <button
                className="btn d-flex align-items-center justify-content-center gap-2 fw-bold"
                style={{ backgroundColor: '#333', color: 'white', height: '40px', width: '170px', fontSize: '13px', borderRadius: '2px', border: 'none' }}
              >
                <Heart size={16} fill="white" />
                WISHLIST
              </button>
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="col-md-7 ps-md-4">
            {/* Title and Author */}
            <h1 className="mb-1" style={{ fontFamily: 'Roboto', fontWeight: '500', fontSize: '28px', color: '#333' }}>
              {book.title}
            </h1>
            <p className="text-muted mb-3" style={{ fontSize: '16px' }}>
              by {book.author || 'Steve Krug'}
            </p>

            {/* Rating */}
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="d-flex align-items-center px-2 py-1" style={{
                backgroundColor: '#5CB85C',
                borderRadius: '4px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {book.averageRating ? book.averageRating.toFixed(1) : '0.0'} <Star size={14} fill="white" className="ms-1" />
              </div>
              <span className="text-muted" style={{ fontSize: '14px' }}>({book.reviewCount || 0})</span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <span className="fw-bold" style={{ fontSize: '28px', color: '#333' }}>Rs.{book.price}</span>
            </div>

            <hr style={{ borderColor: '#DDD', margin: '24px 0' }} />

            {/* Book Detail Section */}
            <div className="mb-4">
              <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ fontSize: '16px', color: '#888' }}>
                <span className="me-2">•</span> Book Detail
              </h5>
              <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.6' }}>
                {book.description || 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'}
              </p>
            </div>

            <hr style={{ borderColor: '#DDD', margin: '24px 0' }} />

            {/* Customer Feedback Section */}
            <div>
              <h5 className="fw-bold mb-4" style={{ fontSize: '18px', color: '#333' }}>Customer Feedback</h5>

              {/* Rating Summary Breakdown - Re-added and polished */}
              <div className="row mb-4 align-items-center">
                <div className="col-md-5 text-start border-end pe-4">
                  <h1 className="fw-bold mb-0" style={{ fontSize: '36px', color: '#333' }}>
                    {book.averageRating ? book.averageRating.toFixed(1) : '0.0'}
                  </h1>
                  <div className="d-flex gap-1 my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        fill={star <= Math.round(book.averageRating || 0) ? '#FFD700' : 'none'}
                        stroke={star <= Math.round(book.averageRating || 0) ? '#FFD700' : '#DDD'}
                      />
                    ))}
                  </div>
                  <p className="text-muted mb-0" style={{ fontSize: '13px' }}>{book.reviewCount || 0} customer reviews</p>
                </div>
                <div className="col-md-7 ps-md-4">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter(r => r.rating === star).length;
                    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                    return (
                      <div key={star} className="d-flex align-items-center gap-2 mb-1">
                        <span className="small text-muted" style={{ minWidth: '45px', fontSize: '12px' }}>{star} Stars</span>
                        <div className="progress flex-grow-1" style={{ height: '8px', backgroundColor: '#F5F5F5', borderRadius: '4px' }}>
                          <div 
                            className="progress-bar" 
                            style={{ 
                              width: `${percentage}%`, 
                              backgroundColor: star >= 4 ? '#5CB85C' : star === 3 ? '#FFD700' : '#D9534F',
                              borderRadius: '4px'
                            }}
                          ></div>
                        </div>
                        <span className="small text-muted" style={{ minWidth: '25px', fontSize: '12px' }}>{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <hr style={{ borderColor: '#EEE', margin: '30px 0' }} />

              {/* Write Review Section - Boxed as per design */}
              <div style={{ backgroundColor: '#F9F9F9', padding: '24px', borderRadius: '2px', marginBottom: '30px', border: '1px solid #F0F0F0' }}>
                <div className="mb-3">
                  <p className="small mb-2" style={{ color: '#333', fontWeight: '500' }}>Overall rating</p>
                  <div className="d-flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        fill={star <= (hoverRating || userRating) ? '#FFD700' : 'none'}
                        stroke={star <= (hoverRating || userRating) ? '#FFD700' : '#DDD'}
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setUserRating(star)}
                      />
                    ))}
                  </div>
                </div>
                
                <textarea
                  className="form-control mb-3"
                  rows="3"
                  placeholder="Write your review"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  style={{ borderColor: '#DDD', fontSize: '14px', borderRadius: '2px', backgroundColor: 'white' }}
                ></textarea>
                
                <div className="text-end">
                  <button
                    onClick={handleSubmitReview}
                    className="btn px-4"
                    style={{ backgroundColor: '#4A90E2', color: 'white', border: 'none', padding: '8px 30px', fontSize: '14px', borderRadius: '2px', fontWeight: '500' }}
                  >
                    Submit
                  </button>
                </div>
              </div>

              {/* Existing Reviews List */}
              <div className="mt-4">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={review._id || index} className="mb-4">
                      <div className="d-flex gap-3">
                        {/* Circular Avatar */}
                        <div className="flex-shrink-0">
                          <div className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{ 
                              width: '32px', 
                              height: '32px', 
                              fontSize: '12px', 
                              backgroundColor: '#F5F5F5',
                              color: '#999',
                              border: '1px solid #EEE'
                            }}>
                            {review.userId?.name ? review.userId.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                          </div>
                        </div>
                        
                        {/* Review Content */}
                        <div className="flex-grow-1">
                          <p className="mb-1 fw-bold" style={{ fontSize: '14px', color: '#333' }}>
                            {review.userId?.name || 'Anonymous User'}
                          </p>
                          <div className="d-flex gap-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                size={14} 
                                fill={star <= review.rating ? "#FFD700" : "none"} 
                                stroke={star <= review.rating ? "#FFD700" : "#DDD"} 
                              />
                            ))}
                          </div>
                          {review.comment && (
                            <p className="mb-0" style={{ fontSize: '13px', color: '#777', lineHeight: '1.6' }}>
                              {review.comment}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted small">No reviews yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
