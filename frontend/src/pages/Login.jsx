import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Chrome } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4 border-0 shadow-lg">
            <div className="text-center mb-4">
              <div className="bg-emerald-soft p-3 rounded-circle d-inline-block mb-3">
                <LogIn className="text-emerald" size={32} />
              </div>
              <h2 className="fw-bold">Welcome Back</h2>
              <p className="text-muted">Enter your details to access your account</p>
            </div>

            {error && <div className="alert alert-danger mb-4 small">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-semibold small">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0">
                    <Mail size={18} className="text-muted" />
                  </span>
                  <input 
                    type="email" 
                    className="form-control border-start-0 ps-0" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold small">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0">
                    <Lock size={18} className="text-muted" />
                  </span>
                  <input 
                    type="password" 
                    className="form-control border-start-0 ps-0" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100 py-2 mb-3 fw-bold"
                disabled={loading}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>

              <div className="text-center mb-3">
                <span className="text-muted small px-3 bg-white position-relative" style={{ zIndex: 1 }}>Or continue with</span>
                <hr className="mt-n2 opacity-10" style={{ marginTop: '-10px' }} />
              </div>

              <a 
                href="http://localhost:5000/api/auth/google" 
                className="btn btn-outline-light border text-dark w-100 py-2 rounded mb-4 fw-semibold d-flex align-items-center justify-content-center"
              >
                <Chrome size={18} className="me-2 text-primary" /> Sign in with Google
              </a>

              <div className="text-center">
                <p className="text-muted small mb-0">
                  Don't have an account? <Link to="/register" className="text-emerald fw-bold text-decoration-none">Sign Up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
