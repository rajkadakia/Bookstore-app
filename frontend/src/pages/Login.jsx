import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Chrome, BookOpen } from 'lucide-react';
import api from '../api/client';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    window.location.href = `${api.defaults.baseURL}/auth/google`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-4">
      <div className="row w-100 shadow-book rounded-4 overflow-hidden" style={{ maxWidth: '1000px', minHeight: '600px' }}>
        
        {/* Left Side: The "Book Cover" */}
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-center p-5 text-white position-relative" 
             style={{ 
               background: '#4E342E', 
               backgroundImage: 'linear-gradient(45deg, #3E2723 0%, #5D4037 100%)',
               borderRight: '4px solid #3E2723' 
             }}>
          {/* Simple Decorative Border */}
          <div className="position-absolute top-0 start-0 w-100 h-100 border border-secondary border-opacity-25 m-3 rounded-3" style={{ pointerEvents: 'none' }}></div>
          
          <div className="mb-4">
             <BookOpen size={64} style={{ color: '#F9F5F0' }} className="opacity-75" />
          </div>
          <h1 className="display-4 fw-bold mb-3 brand-font" style={{ color: '#F9F5F0' }}>किताबkhana</h1>
          <p className="lead font-serif fst-italic opacity-75">"A room without books is like a body without a soul."</p>
          <div className="mt-5 border-top border-secondary border-opacity-25 pt-4 w-50">
             <small className="text-white-50 text-uppercase tracking-widest">Est. 2026</small>
          </div>
        </div>

        {/* Right Side: The "Paper" Form */}
        <div className="col-md-6 bg-white p-5 d-flex align-items-center position-relative">
          <div className="w-100" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2 className="text-coffee font-serif fw-bold mb-4">Welcome Back</h2>
            {error && <div className="alert alert-danger py-2 small">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small text-muted text-uppercase fw-bold">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-control border-0 border-bottom border-secondary rounded-0 px-0 shadow-none bg-transparent" 
                  placeholder="name@example.com"
                  style={{ background: 'transparent' }} 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="form-label small text-muted text-uppercase fw-bold">Password</label>
                <input 
                  type="password" 
                  name="password"
                  className="form-control border-0 border-bottom border-secondary rounded-0 px-0 shadow-none bg-transparent" 
                  placeholder="••••••••" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-coffee w-100 py-2 mb-3 fw-bold"
              >
                Sign In
              </button>
            </form>

            <div className="d-flex align-items-center my-4">
               <hr className="flex-grow-1 border-secondary opacity-25" />
               <span className="mx-2 small text-muted font-serif">or</span>
               <hr className="flex-grow-1 border-secondary opacity-25" />
            </div>

            <button 
              onClick={handleGoogleLogin} 
              disabled={googleLoading}
              className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2 border-secondary border-opacity-25 text-coffee hover-shadow-sm"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" height="20" />
              {googleLoading ? 'Connecting...' : 'Continue with Google'}
            </button>

            <p className="text-center mt-5 small text-muted">
              Don't have an account? <Link to="/register" className="text-coffee fw-bold text-decoration-none">Create Library Card</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
