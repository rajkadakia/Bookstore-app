import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, BookOpen } from 'lucide-react';
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

  return (
    <nav className="navbar navbar-expand-lg sticky-top py-4" style={{ backgroundColor: 'var(--bg-beige)', borderBottom: '1px solid var(--bg-dark-beige)' }}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="display-6 fw-bold brand-font text-coffee" style={{ letterSpacing: '-1px' }}>किताबkhana</span>
        </Link>
        

        {!['/login', '/register', '/'].includes(window.location.pathname) && (
          <>
            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">

              <div className="mx-auto col-lg-4 d-none d-lg-block">
                 <form onSubmit={handleSearch} className="pb-1 d-flex" style={{ borderBottom: '1.5px solid #4E342E' }}>
                   <input 
                      type="text" 
                      className="form-control border-0 bg-transparent p-0 shadow-none text-coffee" 
                      placeholder="Search for your next read..." 
                      style={{ fontStyle: 'italic' }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                   />
                   <button type="submit" className="btn p-0 text-coffee">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                       <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                     </svg>
                   </button>
                 </form>
              </div>

              <ul className="navbar-nav ms-auto align-items-center gap-4">
                <li className="nav-item">
                  <Link className="nav-link text-coffee fw-semibold" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-coffee fw-semibold" to="/books">Collection</Link>
                </li>
                
                  <Link className="text-coffee position-relative d-flex align-items-center" to="/cart" style={{ color: 'var(--text-coffee)' }}>
                    <ShoppingCart size={22} strokeWidth={1.5} style={{ color: 'var(--text-coffee)' }} />
                    {cartCount > 0 && (
                      <span className="position-absolute translate-middle rounded-circle" style={{ 
                        backgroundColor: '#795548', 
                        top: '4px',
                        left: '100%',
                        width: '8px',
                        height: '8px',
                        transform: 'translate(-50%, -50%)',
                        border: '1.5px solid var(--bg-beige)'
                      }}></span>
                    )}
                  </Link>

                {user ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-coffee p-0 d-flex align-items-center" to="/profile">
                        <User size={20} strokeWidth={1.5} />
                      </Link>
                    </li>
                    <li className="nav-item">
                        <button className="btn text-coffee p-0" onClick={handleLogout}>
                          <LogOut size={20} strokeWidth={1.5} />
                        </button>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Link className="btn btn-outline-coffee btn-sm px-4 rounded-pill" to="/login">Sign In</Link>
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
