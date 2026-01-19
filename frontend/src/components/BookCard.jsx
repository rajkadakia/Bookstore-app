import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, BookOpen } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const BookCard = ({ book, isNew, isSale }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [imgError, setImgError] = useState(false);

  const wishlisted = isWishlisted(book._id);

  return (
    <div className="col-md-3 col-6 mb-4">
      <div className="card h-100 border-0 bg-transparent hover-lift">
        <div className="position-relative mb-3">
          <Link to={`/books/${book._id}`}>
             <div className="ratio ratio-3x4 rounded-3 overflow-hidden shadow-sm">
                <img 
                  src={!imgError && book.imageUrl ? book.imageUrl : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400'} 
                  className="object-fit-cover w-100 h-100" 
                  alt={book.title}
                  onError={() => setImgError(true)} 
                />
             </div>
          </Link>
          
          <button 
            className="position-absolute top-0 start-0 m-2 border-0 bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center"
            style={{ width: '32px', height: '32px', zIndex: 2 }}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(book);
            }}
          >
            <Heart size={18} fill={wishlisted ? "#A94442" : "none"} color={wishlisted ? "#A94442" : "#999"} />
          </button>

          {isNew && <span className="position-absolute top-0 end-0 m-2 badge bg-coffee text-white rounded-0 fw-normal px-2" style={{backgroundColor: '#795548'}}>New</span>}
          {isSale && <span className="position-absolute top-0 end-0 m-2 badge rounded-0 fw-normal px-2" style={{backgroundColor: '#4E342E', color: '#F9F5F0'}}>-10%</span>}
        </div>
        
        <div className="card-body p-0">
          <Link to={`/books/${book._id}`} className="text-decoration-none text-charcoal">
            <h5 className="h6 fw-bold mb-1 text-truncate">{book.title}</h5>
          </Link>
          <p className="text-muted small mb-2 text-truncate">{book.author}</p>
          
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-dark">₹{book.price}</span>
              <div className="d-flex align-items-center text-mocha x-small ms-1">
                <BookOpen size={12} className="me-1 opacity-75" />
                <span className="fw-bold">{book.averageRating || '0.0'}</span>
              </div>
            </div>
            <button 
              className="btn btn-sm btn-coffee px-3 rounded-1"
              onClick={() => addToCart(book._id)}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
