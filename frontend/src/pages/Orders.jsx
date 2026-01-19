import React, { useState, useEffect } from 'react';
import api from '../api/client';
import { Package, CheckCircle2, ShoppingBag, ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 mt-5 text-center">
        <div className="spinner-border text-coffee"></div>
      </div>
    );
  }

  return (
    <div className="container py-5 mt-5" style={{ minHeight: '80vh' }}>
      <div className="d-flex align-items-center gap-3 mb-5">
        <div className="bg-coffee-soft p-3 rounded-circle text-coffee">
          <ShoppingBag size={32} />
        </div>
        <div>
          <h2 className="fw-bold mb-1 font-serif text-coffee">My Orders</h2>
          <p className="text-muted mb-0">Track and manage your order history</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm border border-secondary border-opacity-10">
          <div className="mb-4 opacity-25">
             <Package size={80} strokeWidth={1} className="text-coffee" />
          </div>
          <h4 className="fw-bold text-dark">No orders found</h4>
          <p className="text-muted mb-4">It looks like you haven't placed any orders yet.</p>
          <Link to="/home" className="btn btn-coffee px-5 py-3 rounded-pill fw-bold shadow-sm">
             Browse Books
          </Link>
        </div>
      ) : (
        <div className="d-flex flex-column gap-4">
          {orders.map((order) => (
            <div key={order._id} className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
              <div className="card-header bg-coffee-soft border-0 p-3 px-4 d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div className="d-flex gap-4">
                  <div>
                    <div className="x-small text-muted text-uppercase fw-bold mb-1 tracking-wider">Order Placed</div>
                    <div className="small fw-semibold text-coffee">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </div>
                  <div>
                    <div className="x-small text-muted text-uppercase fw-bold mb-1 tracking-wider">Total</div>
                    <div className="small fw-semibold text-coffee">₹{order.totalAmount + 50}</div>
                  </div>
                </div>
                <div>
                   <div className="x-small text-muted text-uppercase fw-bold mb-1 tracking-wider text-end">Order ID</div>
                   <div className="small text-muted">#{order._id.substring(order._id.length - 12).toUpperCase()}</div>
                </div>
              </div>
              <div className="card-body p-4">
                 <div className="d-flex align-items-center gap-2 mb-4">
                    <CheckCircle2 size={18} className="text-success" />
                    <span className="fw-bold text-success" style={{ fontSize: '15px' }}>Placed</span>
                    <span className="text-muted mx-2">•</span>
                    <span className="small text-muted">Estimated delivery: {new Date(new Date(order.createdAt).getTime() + 5*24*60*60*1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}</span>
                 </div>

                 <div className="row g-4 align-items-center">
                    <div className="col-lg-8">
                       <div className="d-flex flex-column gap-3">
                          {order.items.map((item) => (
                             <div key={item._id} className="d-flex align-items-center gap-3">
                                <Link to={`/books/${item.bookId?._id}`}>
                                   <img 
                                      src={item.bookId?.imageUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=100'} 
                                      alt={item.title} 
                                      className="rounded bg-light object-fit-cover shadow-sm"
                                      style={{ width: '60px', height: '80px' }}
                                   />
                                </Link>
                                <div>
                                   <Link to={`/books/${item.bookId?._id}`} className="text-decoration-none text-dark fw-bold d-block mb-1">{item.title}</Link>
                                   <div className="text-muted small">Qty: {item.quantity}  •  ₹{item.price} each</div>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                    <div className="col-lg-4 text-lg-end">
                       <Link to={`/books/${order.items[0].bookId?._id}`} className="btn btn-outline-coffee rounded-2 px-4 small fw-bold text-uppercase" style={{ fontSize: '12px' }}>
                          View Details
                       </Link>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
