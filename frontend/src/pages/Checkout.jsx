import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/client';
import { CreditCard, Lock, CheckCircle, ArrowLeft, ShoppingBag } from 'lucide-react';

const Checkout = () => {
  const { cart, clearCart, fetchCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const cartItems = cart?.items || [];
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.bookId?.price || 0) * item.quantity, 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/orders');
      setSuccess(true);
      await fetchCart(); // Refresh cart state (should be empty now)
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container py-5 mt-5 text-center">
        <div className="glass-card bg-white p-5 shadow-lg rounded-4 max-w-500 mx-auto">
          <div className="bg-emerald-soft p-4 rounded-circle d-inline-block mb-4">
            <CheckCircle className="text-emerald" size={64} />
          </div>
          <h2 className="fw-bold mb-3">Order Placed Successfully!</h2>
          <p className="text-muted mb-5">Your books are being prepared for shipment. Thank you for choosing Ink & Soul.</p>
          <button className="btn btn-primary px-5 py-3 rounded-pill fw-bold" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container py-5 mt-5 text-center">
        <h2 className="fw-bold mb-4">Your cart is empty</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Back Home</button>
      </div>
    );
  }

  return (
    <div className="container py-5 mt-5">
      <button className="btn btn-link text-decoration-none text-muted p-0 mb-4 d-flex align-items-center" onClick={() => navigate('/cart')}>
        <ArrowLeft size={18} className="me-1" /> Back to Cart
      </button>

      <div className="row g-5">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4 bg-white rounded-4">
            <h4 className="fw-bold mb-4 d-flex align-items-center">
              <CreditCard className="text-emerald me-2" size={24} /> Payment Information
            </h4>
            
            <form onSubmit={handlePlaceOrder}>
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted uppercase">Cardholder Name</label>
                <input type="text" className="form-control py-3" placeholder="John Doe" required />
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted uppercase">Card Number</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0">
                    <Lock size={16} className="text-muted" />
                  </span>
                  <input type="text" className="form-control py-3 border-start-0 ps-0" placeholder="0000 0000 0000 0000" required />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <label className="form-label small fw-bold text-muted uppercase">Expiry Date</label>
                  <input type="text" className="form-control py-3" placeholder="MM/YY" required />
                </div>
                <div className="col-md-6 mb-4">
                  <label className="form-label small fw-bold text-muted uppercase">CVV</label>
                  <input type="password" size="3" className="form-control py-3" placeholder="•••" required />
                </div>
              </div>

              <div className="bg-light p-3 rounded-3 mb-4 d-flex align-items-center">
                <Lock size={16} className="text-emerald me-2" />
                <span className="small text-muted">Your payment information is encrypted and secure.</span>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Confirm Payment: $${totalPrice}`}
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-4 bg-white rounded-4 sticky-top" style={{ top: '100px' }}>
            <h4 className="fw-bold mb-4 d-flex align-items-center">
              <ShoppingBag className="text-emerald me-2" size={24} /> Order Summary
            </h4>
            
            <div className="mb-4">
              {cartItems.map((item) => (
                <div key={item.bookId?._id} className="d-flex justify-content-between mb-3 align-items-center">
                  <div className="d-flex align-items-center">
                    <img 
                      src={item.bookId?.imageUrl || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=50'} 
                      alt={item.bookId?.title} 
                      className="rounded me-2"
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                    <div>
                      <div className="small fw-bold text-truncate" style={{ maxWidth: '150px' }}>{item.bookId?.title}</div>
                      <div className="text-muted x-small">Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <span className="fw-semibold small">${(item.bookId?.price || 0) * item.quantity}</span>
                </div>
              ))}
            </div>

            <hr className="opacity-10 mb-4" />

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span className="fw-semibold">${totalPrice}</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span className="text-muted">Shipping</span>
              <span className="text-emerald fw-bold">FREE</span>
            </div>

            <div className="d-flex justify-content-between mb-0 border-top pt-4">
              <h5 className="fw-bold">Total</h5>
              <h4 className="fw-bold text-emerald">${totalPrice}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
