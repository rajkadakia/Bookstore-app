import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BookCard = ({ book }) => {
  const { addToCart } = useCart();

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 border-0 shadow-sm overflow-hidden p-2">
        <Link to={`/books/${book._id}`} className="text-decoration-none text-dark">
          <img 
            src={book.imageUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400'} 
            className="book-img rounded-3" 
            alt={book.title} 
          />
        </Link>
        <div className="card-body px-2">
          <Link to={`/books/${book._id}`} className="text-decoration-none text-dark">
            <h5 className="card-title fw-bold text-truncate mb-1">{book.title}</h5>
          </Link>
          <p className="card-text text-muted small mb-2">{book.author}</p>
          <div className="d-flex align-items-center mb-3">
            <Star size={16} className="text-warning fill-warning me-1" />
            <span className="small fw-semibold">{book.averageRating || '4.5'}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <span className="fs-5 fw-bold text-emerald">${book.price}</span>
            <button 
              className="btn btn-primary btn-sm rounded-pill"
              onClick={() => addToCart(book._id)}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
