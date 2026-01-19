import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderDetails = location.state?.orderDetails || {};

  return (
    <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="bg-white rounded shadow-sm p-5 text-center">
              {/* Celebration Icon */}
              <div className="mb-4">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Confetti */}
                  <circle cx="30" cy="20" r="3" fill="#FF6B6B"/>
                  <circle cx="90" cy="25" r="3" fill="#4ECDC4"/>
                  <circle cx="20" cy="50" r="3" fill="#FFE66D"/>
                  <circle cx="100" cy="45" r="3" fill="#95E1D3"/>
                  <rect x="15" y="30" width="6" height="6" fill="#F38181" transform="rotate(45 18 33)"/>
                  <rect x="95" y="35" width="6" height="6" fill="#AA96DA" transform="rotate(45 98 38)"/>
                  
                  {/* Stars */}
                  <path d="M60 35L63 45L73 45L65 51L68 61L60 55L52 61L55 51L47 45L57 45L60 35Z" fill="#FFD93D"/>
                  <path d="M45 50L47 56L53 56L48 60L50 66L45 62L40 66L42 60L37 56L43 56L45 50Z" fill="#FFD93D"/>
                  <path d="M75 50L77 56L83 56L78 60L80 66L75 62L70 66L72 60L67 56L73 56L75 50Z" fill="#FFD93D"/>
                  
                  {/* Streamers */}
                  <path d="M25 15 Q30 25 28 35" stroke="#FF6B6B" strokeWidth="2" fill="none"/>
                  <path d="M95 15 Q90 25 92 35" stroke="#4ECDC4" strokeWidth="2" fill="none"/>
                  <path d="M35 70 Q40 80 38 90" stroke="#FFE66D" strokeWidth="2" fill="none"/>
                  <path d="M85 70 Q80 80 82 90" stroke="#95E1D3" strokeWidth="2" fill="none"/>
                </svg>
              </div>

              {/* Success Message */}
              <h2 className="mb-3" style={{ fontFamily: 'Roboto', fontSize: '24px', fontWeight: '500', color: '#333' }}>
                Order Placed Successfully
              </h2>

              {/* Confetti decoration */}
              <div className="mb-4">
                <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
                  <circle cx="10" cy="10" r="2" fill="#FF6B6B"/>
                  <circle cx="20" cy="8" r="2" fill="#4ECDC4"/>
                  <circle cx="30" cy="12" r="2" fill="#FFE66D"/>
                  <circle cx="40" cy="10" r="2" fill="#95E1D3"/>
                  <circle cx="50" cy="8" r="2" fill="#F38181"/>
                  <circle cx="60" cy="12" r="2" fill="#AA96DA"/>
                  <circle cx="70" cy="10" r="2" fill="#FFD93D"/>
                </svg>
              </div>

              {/* Order Confirmation Text */}
              <p className="mb-1" style={{ fontSize: '14px', color: '#666' }}>
                hurray!!! your order is confirmed
              </p>
              <p className="mb-4" style={{ fontSize: '14px', color: '#666' }}>
                the order id is <strong>#{orderDetails.orderId || '123456'}</strong> save the order id for further communication.
              </p>

              {/* Contact Details */}
              <div className="row g-3 mb-4 text-start">
                <div className="col-md-4">
                  <div className="p-3 border rounded" style={{ backgroundColor: '#FAFAFA' }}>
                    <p className="small text-muted mb-1" style={{ fontSize: '12px' }}>Email us</p>
                    <p className="mb-0" style={{ fontSize: '13px', color: '#333' }}>admin@bookstore.com</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border rounded" style={{ backgroundColor: '#FAFAFA' }}>
                    <p className="small text-muted mb-1" style={{ fontSize: '12px' }}>Contact us</p>
                    <p className="mb-0" style={{ fontSize: '13px', color: '#333' }}>+91 8143478881</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 border rounded" style={{ backgroundColor: '#FAFAFA' }}>
                    <p className="small text-muted mb-1" style={{ fontSize: '12px' }}>Address</p>
                    <p className="mb-0" style={{ fontSize: '13px', color: '#333' }}>
                      {orderDetails.address || 'Bengaluru, Karnataka'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Continue Shopping Button */}
              <button
                onClick={() => navigate('/home')}
                className="btn text-white px-5"
                style={{ 
                  backgroundColor: '#4A90E2', 
                  padding: '12px 40px', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  borderRadius: '4px'
                }}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
