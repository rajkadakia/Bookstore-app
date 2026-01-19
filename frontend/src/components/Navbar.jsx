import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, Search } from 'lucide-react';
import React, { useState } from 'react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/home?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/home');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (['/login', '/register', '/'].includes(window.location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg py-3" style={{ backgroundColor: '#A94442' }}>
      <div className="container px-4">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center text-white" to="/home">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white" className="me-2">
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
          </svg>
          <span className="fw-bold" style={{ fontFamily: 'Roboto', fontSize: '18px' }}>Bookstore</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="d-none d-lg-flex mx-auto" style={{ maxWidth: '500px', width: '100%' }}>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <Search size={18} color="#999" />
            </span>
            <input
              type="text"
              className="form-control border-start-0 shadow-none"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                borderColor: '#DDD',
                fontSize: '14px'
              }}
            />
          </div>
        </form>

        {/* Right Side Icons */}
        <div className="d-flex align-items-center gap-4">
          {user && (
            <>
              <div className="dropdown">
                <div 
                  className="text-white text-decoration-none d-flex flex-column align-items-center dropdown-toggle" 
                  role="button" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                  style={{ cursor: 'pointer' }}
                >
                  <User size={20} />
                  <small style={{ fontSize: '11px' }}>Profile</small>
                </div>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2" style={{ fontSize: '14px', minWidth: '160px' }}>
                  <li>
                    <Link className="dropdown-item py-2 px-3 d-flex align-items-center gap-2" to="/profile">
                      <User size={16} className="text-muted" /> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item py-2 px-3 d-flex align-items-center gap-2" to="/orders">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item py-2 px-3 d-flex align-items-center gap-2 wishlist-item" to="/wishlist">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                      Wishlist
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider opacity-10" /></li>
                  <li>
                    <button 
                      className="dropdown-item py-2 px-3 d-flex align-items-center gap-2" 
                      onClick={handleLogout}
                      style={{ color: '#A94442', fontWeight: '500' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>

              <style>{`
                .dropdown-item:active {
                  background-color: #A94442 !important;
                }
                .dropdown-item:hover {
                  background-color: #FFF5F5;
                  color: #A94442 !important;
                }
                .dropdown-item:hover .text-muted {
                  color: #A94442 !important;
                }
              `}</style>

              <Link to="/cart" className="text-white text-decoration-none d-flex flex-column align-items-center position-relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '10px' }}>
                    {cartCount}
                  </span>
                )}
                <small style={{ fontSize: '11px' }}>Cart</small>
              </Link>
            </>
          )}

          {!user && (
            <Link to="/login" className="btn btn-sm btn-light">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
