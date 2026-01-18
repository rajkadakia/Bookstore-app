import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, BookOpen } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <BookOpen className="me-2 text-emerald" size={28} />
          <span className="fw-bold fs-4 text-emerald">Ink & Soul</span>
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">Browse</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link position-relative" to="/cart">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            {user ? (
              <li className="nav-item dropdown">
                <button className="btn d-flex align-items-center nav-link" onClick={handleLogout}>
                  <LogOut size={20} className="me-1" /> Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-primary" to="/login">Sign In</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
