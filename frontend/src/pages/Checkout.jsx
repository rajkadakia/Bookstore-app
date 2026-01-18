import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/client';
import { CreditCard, Lock, CheckCircle, ArrowLeft, ShoppingBag, MapPin, Banknote, Smartphone, Send } from 'lucide-react';
import AddressManager from '../components/AddressManager';

const Checkout = () => {
  const { cart, clearCart, fetchCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const navigate = useNavigate();

  const cartItems = cart?.items || [];
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.bookId?.price || 0) * item.quantity, 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!selectedAddressId) {
      alert('Please select or add a delivery address.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/orders', { addressId: selectedAddressId });
      setSuccess(true);
      await fetchCart();
    } catch (error) {
      console.error('Error placing order:', error);
      alert(error.response?.data?.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container py-5 mt-5 text-center">
        <div className="glass-card bg-white p-5 shadow-lg rounded-4 max-w-500 mx-auto">
          <div className="bg-coffee-soft p-4 rounded-circle d-inline-block mb-4">
            <CheckCircle className="text-coffee" size={64} />
          </div>
          <h2 className="fw-bold mb-3">Order Placed Successfully!</h2>
          <p className="text-muted mb-5">Your books are being prepared for shipment. Thank you for choosing किताबkhana.</p>
          <button className="btn btn-coffee px-5 py-3 rounded-pill fw-bold" onClick={() => navigate('/')}>
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
        <button className="btn btn-coffee" onClick={() => navigate('/')}>Back Home</button>
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
          <div className="card border-0 shadow-sm p-4 bg-white rounded-4 mb-4">
            <h4 className="fw-bold mb-4 d-flex align-items-center text-coffee font-serif">
              <MapPin className="text-coffee me-2" size={24} /> Delivery Address
            </h4>
            <AddressManager 
              onAddressSelect={setSelectedAddressId} 
              selectedId={selectedAddressId} 
            />
          </div>

          <div className="card border-0 shadow-sm p-4 bg-white rounded-4">
            <h4 className="fw-bold mb-4 d-flex align-items-center text-coffee font-serif">
              <CreditCard className="text-coffee me-2" size={24} /> Select Payment Method
            </h4>
            
            <div className="row g-3 mb-4">
              {[
                { id: 'cod', name: 'Cash on Delivery', icon: <Banknote size={20} /> },
                { id: 'upi', name: 'UPI Payment', icon: <Smartphone size={20} /> },
                { id: 'card', name: 'Card Payment', icon: <CreditCard size={20} /> },
                { id: 'transfer', name: 'Account Transfer', icon: <Send size={20} /> },
              ].map((method) => (
                <div key={method.id} className="col-6">
                  <div 
                    className={`p-3 border rounded-3 text-center cursor-pointer transition-all ${paymentMethod === method.id ? 'border-coffee bg-coffee-light' : 'border-light font-serif'}`}
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: paymentMethod === method.id ? '#F9F5F0' : 'white',
                      borderColor: paymentMethod === method.id ? 'var(--text-coffee)' : 'rgba(0,0,0,0.1)'
                    }}
                    onClick={() => setPaymentMethod(method.id)}
                  >
                    <div className={`mb-2 ${paymentMethod === method.id ? 'text-coffee' : 'text-muted'}`}>
                      {method.icon}
                    </div>
                    <div className={`x-small fw-bold ${paymentMethod === method.id ? 'text-coffee' : 'text-muted'}`}>
                      {method.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handlePlaceOrder}>
              <button 
                type="submit" 
                className="btn btn-coffee w-100 py-3 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center mt-3"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Confirm Order: ₹${totalPrice + 50}`}
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-4 bg-white rounded-4 sticky-top" style={{ top: '100px', border: '1px solid #E6DCCD' }}>
            <h4 className="fw-bold mb-4 d-flex align-items-center text-coffee font-serif">
              <ShoppingBag className="text-coffee me-2" size={24} /> Order Summary
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
                  <span className="fw-semibold small">₹{(item.bookId?.price || 0) * item.quantity}</span>
                </div>
              ))}
            </div>

            <hr className="opacity-10 mb-4" />

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span className="fw-semibold">₹{totalPrice}</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span className="text-muted">Shipping</span>
              <span className="text-coffee fw-bold">₹50</span>
            </div>

            <div className="d-flex justify-content-between mb-0 border-top pt-4">
              <div className="fw-bold text-coffee fs-5" style={{ letterSpacing: '0.5px' }}>Total Amount</div>
              <div className="fw-bold text-coffee fs-4">₹{totalPrice + 50}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
