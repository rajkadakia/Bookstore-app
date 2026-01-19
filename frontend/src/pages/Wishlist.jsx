import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import BookCard from '../components/BookCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="container py-5 mt-5">
      <div className="d-flex align-items-center gap-3 mb-5 border-bottom pb-4">
        <div className="bg-danger bg-opacity-10 p-3 rounded-circle text-danger">
          <Heart size={32} fill="currentColor" />
        </div>
        <div>
          <h2 className="fw-bold mb-1" style={{ color: '#333' }}>My Wishlist</h2>
          <p className="text-muted mb-0">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved for later</p>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4 opacity-25">
             <Heart size={80} strokeWidth={1} />
          </div>
          <h4 className="fw-bold text-dark">Your wishlist is empty</h4>
          <p className="text-muted mb-4">Explore our collection and save your favorite books!</p>
          <Link to="/home" className="btn btn-coffee px-5 py-3 rounded-pill fw-bold shadow-sm">
             Start Shopping
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {wishlist.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
