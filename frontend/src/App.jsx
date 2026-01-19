import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import { Instagram, Github, Linkedin } from 'lucide-react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookDetails from './pages/BookDetails';
import Collection from './pages/Collection';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
          <div className="app-wrapper min-vh-100 d-flex flex-column">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/books" element={<Collection />} />
                <Route path="/books/:id" element={<BookDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/orders" element={<Orders />} />
              </Routes>
            </main>
            <footer className="py-4 bg-white border-top mt-auto">
              <div className="container text-center">
                <div className="d-flex justify-content-center gap-4 mb-2">
                  <a href="https://www.instagram.com/rajkadakia_7/?hl=en" target="_blank" rel="noopener noreferrer" className="text-coffee hover-lift">
                    <Instagram size={20} strokeWidth={1.5} />
                  </a>
                  <a href="https://github.com/rajkadakia" target="_blank" rel="noopener noreferrer" className="text-coffee hover-lift">
                    <Github size={20} strokeWidth={1.5} />
                  </a>
                  <a href="https://www.linkedin.com/in/raj-kadakia-787056256/" target="_blank" rel="noopener noreferrer" className="text-coffee hover-lift">
                    <Linkedin size={20} strokeWidth={1.5} />
                  </a>
                </div>
                <p className="text-muted small mb-0">किताबkhana by Raj Kadakia</p>
              </div>
            </footer>
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  </AuthProvider>
  );
}

export default App;
