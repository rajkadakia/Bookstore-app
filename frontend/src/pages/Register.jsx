import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#E8E8E8' }}>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-10 col-lg-8">
            <div className="row bg-white rounded-4 shadow-lg overflow-hidden">
              
              {/* Left Side - Illustration */}
              <div className="col-md-5 d-flex align-items-center justify-content-center p-5" style={{ backgroundColor: '#F5F5F5' }}>
                <div className="text-center">
                  <div className="mb-4">
                    <div style={{ 
                      width: '250px', 
                      height: '250px', 
                      borderRadius: '50%', 
                      background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                      position: 'relative'
                    }}>
                      <svg width="180" height="180" viewBox="0 0 200 200" fill="none">
                        <circle cx="100" cy="100" r="80" fill="#2E5C8A" opacity="0.3"/>
                        <path d="M60 120 L80 100 L100 120 L140 80" stroke="white" strokeWidth="4" fill="none"/>
                        <rect x="70" y="140" width="60" height="40" rx="4" fill="white" opacity="0.9"/>
                        <circle cx="100" cy="70" r="20" fill="white"/>
                      </svg>
                      <div style={{
                        position: 'absolute',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: '#4A90E2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h3 className="fw-bold" style={{ color: '#333', fontFamily: 'Roboto' }}>ONLINE BOOK SHOPPING</h3>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="col-md-7 p-5">
                {/* Tabs */}
                <div className="d-flex mb-4 border-bottom">
                  <Link
                    to="/login"
                    className="btn btn-link text-decoration-none flex-fill pb-3 text-muted"
                    style={{ 
                      color: '#999',
                      fontSize: '18px',
                      fontFamily: 'Roboto',
                      borderRadius: 0
                    }}
                  >
                    LOGIN
                  </Link>
                  <button
                    className="btn btn-link text-decoration-none flex-fill pb-3 border-bottom border-3 border-dark fw-bold"
                    style={{ 
                      color: '#000',
                      fontSize: '18px',
                      fontFamily: 'Roboto',
                      borderRadius: 0
                    }}
                  >
                    SIGNUP
                  </button>
                </div>

                {error && (
                  <div className="alert alert-danger small mb-3">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-500" style={{ color: '#333' }}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{ 
                        borderColor: '#DDD',
                        padding: '10px 12px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-500" style={{ color: '#333' }}>Email Id</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ 
                        borderColor: '#DDD',
                        padding: '10px 12px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-500" style={{ color: '#333' }}>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{ 
                        borderColor: '#DDD',
                        padding: '10px 12px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-500" style={{ color: '#333' }}>Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      className="form-control"
                      placeholder="+91 1234567890"
                      value={formData.mobile}
                      onChange={handleChange}
                      style={{ 
                        borderColor: '#DDD',
                        padding: '10px 12px',
                        fontSize: '14px'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn w-100 text-white fw-500"
                    style={{
                      backgroundColor: '#A94442',
                      padding: '12px',
                      fontSize: '16px',
                      border: 'none'
                    }}
                  >
                    {loading ? 'Creating Account...' : 'Signup'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
