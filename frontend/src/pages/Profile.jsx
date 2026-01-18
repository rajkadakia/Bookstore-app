import React from 'react';
import { useAuth } from '../context/AuthContext';
import AddressManager from '../components/AddressManager';
import { User, Mail, MapPin, BookOpen } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="container py-5 mt-5">
      <div className="row g-5">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 bg-white rounded-4 text-center">
            <div className="bg-coffee-soft p-4 rounded-circle d-inline-block mb-3 mx-auto" style={{ width: '100px', height: '100px' }}>
              <User className="text-coffee" size={48} />
            </div>
            <h3 className="fw-bold mb-1 font-serif text-coffee">{user.name}</h3>
            <p className="text-muted small mb-4 d-flex align-items-center justify-content-center gap-2">
              <Mail size={14} /> {user.email}
            </p>
            <hr className="opacity-10" />
            <div className="text-start mt-4">
              <h6 className="text-uppercase x-small fw-bold text-muted mb-3 tracking-widest">Library Stats</h6>
              <div className="d-flex align-items-center gap-3 mb-2">
                <BookOpen size={18} className="text-coffee opacity-50" />
                <span className="small">Active Borrower since 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4 bg-white rounded-4 mb-4">
            <h4 className="fw-bold mb-4 d-flex align-items-center text-coffee font-serif">
              <MapPin className="text-coffee me-2" size={24} /> My Address Book
            </h4>
            <p className="text-muted small mb-4">Manage your delivery locations for faster checkout.</p>
            <AddressManager />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
