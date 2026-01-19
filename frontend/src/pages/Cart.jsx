import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Edit2 } from 'lucide-react';
import api from '../api/client';

const AddressForm = ({ customerDetails, handleInputChange }) => (
  <div className="row g-4">
    <div className="col-md-6">
      <label className="form-label small mb-1 fw-bold" style={{ fontSize: '12px', color: '#333' }}>Full Name</label>
      <input
        type="text"
        name="fullName"
        className="form-control"
        placeholder="Enter Name"
        value={customerDetails.fullName || ''}
        onChange={handleInputChange}
        style={{ borderColor: '#DDD', fontSize: '14px', padding: '10px 12px', borderRadius: '2px' }}
      />
    </div>
    <div className="col-md-6">
      <label className="form-label small mb-1 fw-bold" style={{ fontSize: '12px', color: '#333' }}>Mobile Number</label>
      <input
        type="tel"
        name="mobile"
        className="form-control"
        placeholder="Enter Phone Number"
        value={customerDetails.mobile || ''}
        onChange={handleInputChange}
        style={{ borderColor: '#DDD', fontSize: '14px', padding: '10px 12px', borderRadius: '2px' }}
      />
    </div>
    
    <div className="col-12">
      <label className="form-label small mb-1 fw-bold" style={{ fontSize: '12px', color: '#333' }}>Address</label>
      <textarea
        name="address"
        className="form-control"
        rows="3"
        placeholder="Enter your full address"
        value={customerDetails.address || ''}
        onChange={handleInputChange}
        style={{ borderColor: '#DDD', fontSize: '14px', padding: '10px 12px', borderRadius: '2px', backgroundColor: '#fff' }}
      ></textarea>
    </div>
    
    <div className="col-md-6">
      <label className="form-label small mb-1 fw-bold" style={{ fontSize: '12px', color: '#333' }}>City/Town</label>
      <input
        type="text"
        name="city"
        className="form-control"
        placeholder="Enter City"
        value={customerDetails.city || ''}
        onChange={handleInputChange}
        style={{ borderColor: '#DDD', fontSize: '14px', padding: '10px 12px', borderRadius: '2px', backgroundColor: '#fff' }}
      />
    </div>
    <div className="col-md-6">
      <label className="form-label small mb-1 fw-bold" style={{ fontSize: '12px', color: '#333' }}>State</label>
      <input
        type="text"
        name="state"
        className="form-control"
        placeholder="Enter State"
        value={customerDetails.state || ''}
        onChange={handleInputChange}
        style={{ borderColor: '#DDD', fontSize: '14px', padding: '10px 12px', borderRadius: '2px', backgroundColor: '#fff' }}
      />
    </div>

    <div className="col-12 mt-4">
      <label className="d-flex align-items-center gap-2 cursor-pointer" style={{ cursor: 'pointer' }}>
        <input
          type="checkbox"
          name="isDefault"
          checked={customerDetails.isDefault || false}
          onChange={(e) => handleInputChange({ target: { name: 'isDefault', value: e.target.checked } })}
          className="form-check-input"
          style={{ 
            marginTop: '0', 
            width: '18px', 
            height: '18px',
            borderColor: '#A94442',
            cursor: 'pointer'
          }}
        />
        <span style={{ fontSize: '14px', color: '#333', fontWeight: '500' }}>Set as default address</span>
      </label>
    </div>
  </div>
);

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [customerDetails, setCustomerDetails] = useState({
    fullName: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    addressType: 'Home',
    isDefault: false
  });

  const [customerSectionOpen, setCustomerSectionOpen] = useState(false);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('new');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get('/addresses');
        const addressData = Array.isArray(response.data) ? response.data : [];
        setAddresses(addressData);
        const defaultAddr = addressData.find(a => a.isDefault);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr._id);
          setCustomerDetails({
            fullName: defaultAddr.name,
            mobile: defaultAddr.phone,
            address: defaultAddr.street,
            city: defaultAddr.city,
            state: defaultAddr.state,
            addressType: defaultAddr.addressType,
            isDefault: defaultAddr.isDefault
          });
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  }, []);

  const handleAddressSelect = (addr) => {
    setSelectedAddressId(addr._id);
    setCustomerDetails({
      fullName: addr.name,
      mobile: addr.phone,
      address: addr.street,
      city: addr.city,
      state: addr.state,
      addressType: addr.addressType,
      isDefault: addr.isDefault
    });
  };

  const handleInputChange = (e) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckout = () => {
    if (!customerDetails.fullName || !customerDetails.mobile || !customerDetails.address) {
      alert('Please fill in all required fields');
      return;
    }
    navigate('/checkout', { state: { customerDetails } });
  };

  const cartItems = cart?.items || [];
  const totalPrice = cartItems.reduce((sum, item) => {
    const book = item.bookId;
    return sum + (book?.price || 0) * item.quantity;
  }, 0);

  if (!cart || cartItems.length === 0) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
        <h3 className="mb-4">Your cart is empty</h3>
        <Link to="/home" className="btn text-white" style={{ backgroundColor: '#A94442' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      <div className="container py-4" style={{ maxWidth: '600px' }}>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <Link to="/home" style={{ color: '#666', textDecoration: 'none' }}>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page" style={{ color: '#333' }}>
              My cart
            </li>
          </ol>
        </nav>

        {/* Cart Items Card */}
        <div className="bg-white rounded shadow-sm p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0 fw-bold" style={{ fontFamily: 'Roboto', fontSize: '18px' }}>
              My cart ({cartItems.length})
            </h5>
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your cart?')) {
                  clearCart();
                }
              }}
              className="btn btn-link text-decoration-none p-0"
              style={{ color: '#A94442', fontSize: '13px' }}
            >
              Clear Cart
            </button>
          </div>

          {/* Cart Items */}
          {cartItems.map((item, index) => {
            const book = item.bookId;
            return (
              <div key={book._id}>
                <div className="d-flex gap-3 py-3">
                  <img
                    src={book.imageUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=100'}
                    alt={book.title}
                    style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1" style={{ fontSize: '15px', fontWeight: '500', color: '#333' }}>{book.title}</h6>
                    <p className="text-muted mb-2" style={{ fontSize: '12px' }}>by {book.author}</p>
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <span className="fw-bold" style={{ fontSize: '16px', color: '#333' }}>Rs. {book.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Quantity and Remove */}
                <div className="d-flex align-items-center gap-3 pb-3">
                  <div className="d-flex align-items-center gap-2 border rounded" style={{ padding: '4px 8px' }}>
                    <button
                      onClick={() => updateQuantity(book._id, Math.max(1, item.quantity - 1))}
                      className="btn btn-sm p-0 border-0"
                      style={{ width: '20px', height: '20px', fontSize: '16px', lineHeight: '1' }}
                    >
                      -
                    </button>
                    <span className="fw-500 mx-2" style={{ minWidth: '20px', textAlign: 'center', fontSize: '14px' }}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(book._id, item.quantity + 1)}
                      className="btn btn-sm p-0 border-0"
                      style={{ width: '20px', height: '20px', fontSize: '16px', lineHeight: '1' }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(book._id)}
                    className="btn btn-link text-decoration-none p-0"
                    style={{ color: '#666', fontSize: '13px' }}
                  >
                    Remove
                  </button>
                </div>
                {index < cartItems.length - 1 && <hr style={{ borderColor: '#E5E5E5', margin: 0 }} />}
              </div>
            );
          })}
        </div>

        {/* Customer Details Card */}
        <div className="bg-white rounded shadow-sm mb-4">
          <div 
            className="p-4 cursor-pointer d-flex justify-content-between align-items-center"
            onClick={() => setCustomerSectionOpen(!customerSectionOpen)}
            style={{ cursor: 'pointer' }}
          >
            <h5 className="mb-0 fw-bold" style={{ fontFamily: 'Roboto', fontSize: '18px', color: '#333' }}>Customer Details</h5>
            {!customerSectionOpen && (
              <button className="btn btn-sm btn-outline-secondary py-1 px-3" style={{ fontSize: '12px' }}>Edit</button>
            )}
          </div>
          
          {customerSectionOpen && (
            <div className="px-4 pb-4">
              {/* Type Selection at Top */}
              <div className="mb-4">
                <label className="form-label small mb-3 d-block fw-bold" style={{ fontSize: '12px', color: '#333' }}>Select Address Type</label>
                <div className="d-flex gap-3">
                  {['Home', 'Work', 'Other'].map(type => (
                    <div
                      key={type}
                      onClick={() => {
                        const existing = addresses.find(a => a.addressType === type);
                        if (existing) {
                          handleAddressSelect(existing);
                        } else {
                          setSelectedAddressId('new');
                          setCustomerDetails({
                            fullName: '',
                            mobile: '',
                            address: '',
                            city: '',
                            state: '',
                            addressType: type,
                            isDefault: false
                          });
                          setIsEditing(true);
                        }
                      }}
                      className={`px-4 py-2 border cursor-pointer transition-all d-flex align-items-center justify-content-center`}
                      style={{ 
                        fontSize: '13px', 
                        cursor: 'pointer',
                        borderRadius: '2px',
                        backgroundColor: customerDetails.addressType === type ? '#f0f0f0' : '#fff',
                        borderColor: customerDetails.addressType === type ? '#333' : '#DDD',
                        color: customerDetails.addressType === type ? '#333' : '#777',
                        minWidth: '100px',
                        fontWeight: customerDetails.addressType === type ? '600' : '400'
                      }}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>

              {/* Single Address Form */}
              <AddressForm 
                customerDetails={customerDetails} 
                handleInputChange={handleInputChange} 
              />

              <div className="text-end mt-4">
                <button 
                  className="btn text-white px-4 py-2" 
                  style={{ backgroundColor: '#A94442', fontSize: '13px', fontWeight: '500' }}
                  onClick={async () => {
                    try {
                      const addrData = {
                        name: customerDetails.fullName,
                        phone: customerDetails.mobile,
                        street: customerDetails.address,
                        city: customerDetails.city,
                        state: customerDetails.state,
                        addressType: customerDetails.addressType,
                        isDefault: customerDetails.isDefault
                      };
                      if (selectedAddressId === 'new') {
                        await api.post('/addresses', addrData);
                      } else {
                        await api.put(`/addresses/${selectedAddressId}`, addrData);
                      }
                      const resp = await api.get('/addresses');
                      setAddresses(resp.data);
                    } catch (error) {
                      console.error('Error saving address:', error);
                    }
                    setCustomerSectionOpen(false);
                    setOrderSummaryOpen(true);
                  }}
                >
                  {selectedAddressId === 'new' ? 'SAVE AND CONTINUE' : 'CONTINUE'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded shadow-sm mb-4">
          <div 
            className="p-4 cursor-pointer"
            onClick={() => cartItems.length > 0 && setOrderSummaryOpen(!orderSummaryOpen)}
            style={{ cursor: cartItems.length > 0 ? 'pointer' : 'default' }}
          >
            <h5 className="mb-0 fw-bold" style={{ fontFamily: 'Roboto', fontSize: '18px', color: '#333' }}>Order summary</h5>
          </div>
          
          {orderSummaryOpen && (
            <div className="px-4 pb-4">
              {cartItems.map((item) => {
                const book = item.bookId;
                return (
                  <div key={book._id} className="d-flex gap-3 mb-3">
                    <img
                      src={book.imageUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=60'}
                      alt={book.title}
                      style={{ width: '50px', height: '65px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1" style={{ fontSize: '14px', fontWeight: '500' }}>{book.title}</h6>
                      <p className="text-muted mb-0" style={{ fontSize: '12px' }}>by {book.author}</p>
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <span className="text-muted" style={{ fontSize: '12px' }}>Qty: {item.quantity}</span>
                        <span className="fw-bold" style={{ fontSize: '14px', color: '#333' }}>
                          Rs. {book.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <hr style={{ borderColor: '#E5E5E5' }} />
              
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fw-bold" style={{ fontSize: '16px' }}>Total</span>
                <span className="fw-bold" style={{ fontSize: '18px', color: '#A94442' }}>Rs. {totalPrice}</span>
              </div>

              <div className="text-end">
                <button
                  onClick={handleCheckout}
                  className="btn text-white px-5"
                  style={{ backgroundColor: '#4A90E2', padding: '10px 40px', fontSize: '14px', fontWeight: '500', borderRadius: '4px' }}
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default Cart;
