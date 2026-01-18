import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Chrome } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4 border-0 shadow-lg">
            <div className="text-center mb-4">
              <div className="bg-coffee-soft p-3 rounded-circle d-inline-block mb-3">
                <UserPlus className="text-coffee" size={32} />
              </div>
              <h2 className="fw-bold">Create a Library Card</h2>
              <p className="text-muted">Join our community of book lovers</p>
            </div>

            {error && <div className="alert alert-danger mb-4 small">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold small">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0">
                    <User size={18} className="text-muted" />
                  </span>
                  <input 
                    name="name"
                    type="text" 
                    className="form-control border-start-0 ps-0" 
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0">
                    <Mail size={18} className="text-muted" />
                  </span>
                  <input 
                    name="email"
                    type="email" 
                    className="form-control border-start-0 ps-0" 
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
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
                    name="password"
                    type="password" 
                    className="form-control border-start-0 ps-0" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-coffee w-100 py-2 mb-3 fw-bold"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>

              <div className="text-center mb-3">
                <span className="text-muted small px-3 bg-white position-relative" style={{ zIndex: 1 }}>Or continue with</span>
                <hr className="mt-n2 opacity-10" style={{ marginTop: '-10px' }} />
              </div>

              <a 
                href="http://localhost:5000/api/auth/google" 
                className="btn btn-outline-light border text-coffee w-100 py-2 rounded mb-4 fw-semibold d-flex align-items-center justify-content-center"
              >
                <Chrome size={18} className="me-2" /> Sign up with Google
              </a>

              <div className="text-center">
                <p className="text-muted small mb-0">
                  Already have an account? <Link to="/login" className="text-coffee fw-bold text-decoration-none">Sign In</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
