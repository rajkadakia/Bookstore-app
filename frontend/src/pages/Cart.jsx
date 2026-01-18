import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, loading, removeFromCart, clearCart, addToCart } = useCart();
  const navigate = useNavigate();

  if (loading && !cart) return <div className="container py-5 mt-5 text-center"><div className="spinner-border text-emerald" /></div>;

  const cartItems = cart?.items || [];
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.bookId?.price || 0) * item.quantity, 0);

  return (
    <div className="container py-5 mt-5">
      <h2 className="display-5 fw-bold mb-5 d-flex align-items-center">
        <ShoppingCart size={36} className="text-emerald me-3" /> Your Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-5 glass-card bg-white">
          <ShoppingCart size={80} className="text-muted mb-4 opacity-25" />
          <h3 className="fw-bold mb-3 text-muted">Your cart is empty</h3>
          <p className="text-muted mb-5">Looks like you haven't added any books to your collection yet.</p>
          <button className="btn btn-primary px-5 py-3 rounded-pill fw-bold" onClick={() => navigate('/')}>
            Start Browsing
          </button>
        </div>
      ) : (
        <div className="row mt-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm p-4 mb-4 bg-white">
              {cartItems.map((item) => (
                <div key={item.bookId?._id} className="row g-0 mb-4 pb-4 border-bottom last-border-none align-items-center">
                  <div className="col-md-2">
                    <img 
                      src={item.bookId?.imageUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200'} 
                      className="img-fluid rounded-3 shadow-sm" 
                      alt={item.bookId?.title} 
                    />
                  </div>
                  <div className="col-md-5 ps-md-4 mt-3 mt-md-0">
                    <h5 className="fw-bold mb-1">{item.bookId?.title}</h5>
                    <p className="text-muted small mb-0">by {item.bookId?.author}</p>
                  </div>
                  <div className="col-md-3 mt-3 mt-md-0 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center border rounded-pill px-2 py-1 bg-light">
                      <button 
                        className="btn btn-link btn-sm text-decoration-none text-emerald p-1"
                        onClick={() => addToCart(item.bookId?._id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-3 fw-bold">{item.quantity}</span>
                      <button 
                        className="btn btn-link btn-sm text-decoration-none text-emerald p-1"
                        onClick={() => addToCart(item.bookId?._id, 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 mt-3 mt-md-0 text-end">
                    <p className="fw-bold mb-2 text-emerald">${(item.bookId?.price || 0) * item.quantity}</p>
                    <button 
                      className="btn btn-link text-danger p-0" 
                      onClick={() => removeFromCart(item.bookId?._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-lg p-4 sticky-top overflow-hidden bg-primary text-white" style={{ top: '100px' }}>
              <h4 className="fw-bold mb-4">Order Summary</h4>
              <div className="d-flex justify-content-between mb-3 opacity-75">
                <span>Subtotal</span>
                <span>${totalPrice}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 opacity-75">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr className="bg-white opacity-25 my-4" />
              <div className="d-flex justify-content-between mb-5">
                <span className="fs-5 fw-bold">Total</span>
                <span className="fs-4 fw-bold">${totalPrice}</span>
              </div>
              
              <button 
                className="btn btn-warning btn-lg w-100 py-3 fw-bold d-flex align-items-center justify-content-center shadow"
                onClick={() => navigate('/checkout')}
              >
                <CreditCard size={20} className="me-2" /> Checkout Now <ArrowRight size={20} className="ms-2" />
              </button>
              
              <div className="text-center mt-4">
                <p className="small mb-0 opacity-75">Secure payment processed by Bookstore Payments</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
