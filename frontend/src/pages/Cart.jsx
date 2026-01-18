import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, ArrowRight, Percent, Tag } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Cart = () => {
  const { cart, loading, removeFromCart, clearCart, addToCart } = useCart();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (loading && !cart) return <div className="container py-5 mt-5 text-center"><div className="spinner-border text-coffee" /></div>;

  const cartItems = cart?.items || [];
  const subtotal = cartItems.reduce((acc, item) => acc + (item.bookId?.price || 0) * item.quantity, 0);
  const shippingFee = 50;
  const totalPrice = subtotal + shippingFee;

  const [offerIndex, setOfferIndex] = useState(0);
  const offers = [
    { title: "PREPAID50", desc: "Get ₹50 off on prepaid orders", icon: Percent },
    { title: "BOOKWORM", desc: "Buy 2 Get 1 Free on Classics", icon: Tag },
    { title: "FIRSTREAD", desc: "Extra 10% off for first-time users", icon: Percent }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % offers.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container py-5 mt-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="display-5 fw-bold d-flex align-items-center text-coffee font-serif mb-0">
          <ShoppingCart size={36} className="text-coffee me-3" /> Your Shopping Cart
        </h2>
        <button 
          className="btn btn-outline-coffee rounded-pill px-4 d-flex align-items-center transition-all hover-lift"
          onClick={() => setShowConfirmModal(true)}
        >
          <Trash2 size={18} className="me-2" /> Clear Cart
        </button>
      </div>

      {/* Custom Confirmation Modal */}
      {showConfirmModal && (
        <div 
          className="modal-backdrop d-flex align-items-center justify-content-center" 
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(78, 52, 46, 0.2)', 
            backdropFilter: 'blur(8px)', 
            zIndex: 1050 
          }}
        >
          <div className="card glass-card bg-white p-5 text-center shadow-lg border-0" style={{ maxWidth: '400px', borderRadius: '24px' }}>
            <div className="bg-coffee-soft rounded-circle d-inline-flex p-4 mb-4">
              <Trash2 size={40} className="text-coffee" />
            </div>
            <h3 className="fw-bold mb-3 font-serif text-coffee">Clear Entire Cart?</h3>
            <p className="text-muted mb-4 px-3">This will remove all items from your collection. This action cannot be undone.</p>
            <div className="d-flex gap-3 justify-content-center">
              <button 
                className="btn btn-light rounded-pill px-4 py-2 fw-semibold" 
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-coffee rounded-pill px-4 py-2 fw-semibold" 
                onClick={() => {
                  clearCart();
                  setShowConfirmModal(false);
                }}
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center py-5 glass-card bg-white">
          <ShoppingCart size={80} className="text-muted mb-4 opacity-25" />
          <h3 className="fw-bold mb-3 text-muted">Your cart is empty</h3>
          <p className="text-muted mb-5">Looks like you haven't added any books to your collection yet.</p>
          <button className="btn btn-coffee px-5 py-3 rounded-pill fw-bold" onClick={() => navigate('/')}>
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
                      src={item.bookId?.imageUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200'} 
                      className="img-fluid rounded-3 shadow-sm" 
                      alt={item.bookId?.title} 
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200';
                      }}
                    />
                  </div>
                  <div className="col-md-5 ps-md-4 mt-3 mt-md-0">
                    <h5 className="fw-bold mb-1 text-coffee font-serif">{item.bookId?.title}</h5>
                    <p className="text-muted small mb-0">by {item.bookId?.author}</p>
                  </div>
                  <div className="col-md-3 mt-3 mt-md-0 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center border rounded-pill px-2 py-1 bg-light">
                      <button 
                        className="btn btn-link btn-sm text-decoration-none text-coffee p-1 shadow-none"
                        onClick={() => addToCart(item.bookId?._id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-3 fw-bold text-coffee">{item.quantity}</span>
                      <button 
                        className="btn btn-link btn-sm text-decoration-none text-coffee p-1 shadow-none"
                        onClick={() => addToCart(item.bookId?._id, 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2 mt-3 mt-md-0 text-end">
                    <p className="fw-bold mb-2 text-coffee">₹{(item.bookId?.price || 0) * item.quantity}</p>
                    <button 
                      className="btn btn-link text-coffee p-0 opacity-50 hover-opacity-100 transition-all" 
                      onClick={() => removeFromCart(item.bookId?._id)}
                      title="Remove from collection"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm p-4 sticky-top overflow-hidden bg-white text-coffee rounded-4" style={{ top: '100px', border: '1px solid #E6DCCD' }}>
              <h4 className="fw-bold mb-4 font-serif">Order Summary</h4>
              
              <div className="cart-items-summary mb-4">
                {cartItems.length > 1 ? (
                  <>
                    {cartItems.map((item) => (
                      <div key={`summary-${item.bookId?._id}`} className="d-flex justify-content-between mb-2 small">
                        <span className="text-muted">
                          {item.bookId?.title} 
                          <span className="ms-1 opacity-75">({item.quantity} × ₹{item.bookId?.price || 0})</span>
                        </span>
                        <span className="fw-semibold text-coffee">₹{(item.bookId?.price || 0) * item.quantity}</span>
                      </div>
                    ))}
                    <hr className="my-3" style={{ opacity: '0.05' }} />
                    <div className="d-flex justify-content-between mb-3">
                      <span className="opacity-75">Subtotal</span>
                      <span className="fw-bold">₹{subtotal}</span>
                    </div>
                  </>
                ) : (
                  <div className="d-flex justify-content-between mb-3">
                    <span className="opacity-75">
                      {cartItems[0]?.bookId?.title}
                      <span className="ms-1 opacity-75">({cartItems[0]?.quantity} × ₹{cartItems[0]?.bookId?.price || 0})</span>
                    </span>
                    <span className="fw-bold text-coffee">₹{subtotal}</span>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-between mb-3 text-coffee">
                <span className="opacity-75">Shipping</span>
                <span className="fw-bold">₹{shippingFee}</span>
              </div>

              <hr className="my-4" style={{ opacity: '0.1' }} />
              <div className="d-flex justify-content-between mb-5">
                <div className="fs-5 fw-bold text-coffee">Total</div>
                <div className="fs-4 fw-bold text-coffee">₹{totalPrice}</div>
              </div>
              
              <div className="d-flex justify-content-center">
                <button 
                  className="btn btn-coffee py-3 px-5 fw-bold d-flex align-items-center justify-content-center shadow-sm rounded-pill"
                  style={{ minWidth: '200px' }}
                  onClick={() => navigate('/checkout')}
                >
                  <CreditCard size={20} className="me-2" /> Buy Now <ArrowRight size={20} className="ms-2" />
                </button>
              </div>
              
              <div className="text-center mt-4">
                <p className="small mb-0 opacity-50">Secure payment processed by Bookstore Payments</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
