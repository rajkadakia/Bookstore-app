import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import { User, Mail, Lock, Phone, Plus } from 'lucide-react';

const Profile = () => {
  const { user, fetchUser } = useAuth();
  const [personalDetails, setPersonalDetails] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const generatedPhone = user.phone || `${Math.floor(7 + Math.random() * 3)}${Math.floor(100000000 + Math.random() * 900000000)}`;
      setPersonalDetails({
        name: user.name || '',
        email: user.email || '',
        password: '',
        phone: generatedPhone
      });
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const response = await api.get('/addresses');
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalChange = (e) => {
    setPersonalDetails({ ...personalDetails, [e.target.name]: e.target.value });
  };

  const savePersonalDetails = async () => {
    try {
      const updateData = { ...personalDetails };
      if (!updateData.password) delete updateData.password;
      await api.put('/auth/profile', updateData);
      await fetchUser();
      setIsEditingPersonal(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleAddNewAddress = () => {
    setAddresses([...addresses, { _id: 'new', name: '', phone: '', street: '', city: '', state: '', addressType: 'Home', isEditing: true }]);
  };

  const handleAddressAction = async (addrId, action, data) => {
    try {
      if (action === 'save') {
        if (addrId === 'new') {
          await api.post('/addresses', data);
        } else {
          await api.put(`/addresses/${addrId}`, data);
        }
      } else if (action === 'delete') {
        await api.delete(`/addresses/${addrId}`);
      }
      fetchAddresses();
    } catch (error) {
      console.error(`Error during address ${action}:`, error);
    }
  };

  if (!user) return null;

  return (
    <div style={{ backgroundColor: '#F9F9F9', minHeight: '100vh', paddingTop: '40px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-4" style={{ fontSize: '13px' }}>
            <li className="breadcrumb-item"><Link to="/home" className="text-muted text-decoration-none">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Profile</li>
          </ol>
        </nav>

        {/* Personal Details Section */}
        <div className="bg-white p-4 rounded shadow-sm mb-5 border">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0" style={{ fontSize: '18px', color: '#333' }}>Personal Details</h5>
            <button 
              className="btn btn-link p-0 text-decoration-none" 
              style={{ color: '#A94442', fontSize: '14px', fontWeight: '500' }}
              onClick={() => isEditingPersonal ? savePersonalDetails() : setIsEditingPersonal(true)}
            >
              {isEditingPersonal ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className="row g-4">
            <div className="col-12">
              <label className="form-label small mb-1 fw-bold" style={{ color: '#666' }}>Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={personalDetails.name}
                onChange={handlePersonalChange}
                disabled={!isEditingPersonal}
                style={{ backgroundColor: isEditingPersonal ? '#fff' : '#F9F9F9', borderColor: '#DDD', fontSize: '14px', padding: '10px 15px' }}
              />
            </div>
            <div className="col-12">
              <label className="form-label small mb-1 fw-bold" style={{ color: '#666' }}>Email Id</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={personalDetails.email}
                onChange={handlePersonalChange}
                disabled={!isEditingPersonal}
                style={{ backgroundColor: isEditingPersonal ? '#fff' : '#F9F9F9', borderColor: '#DDD', fontSize: '14px', padding: '10px 15px' }}
              />
            </div>
            <div className="col-12">
              <label className="form-label small mb-1 fw-bold" style={{ color: '#666' }}>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder={isEditingPersonal ? "Enter new password" : "************"}
                value={personalDetails.password}
                onChange={handlePersonalChange}
                disabled={!isEditingPersonal}
                style={{ backgroundColor: isEditingPersonal ? '#fff' : '#F9F9F9', borderColor: '#DDD', fontSize: '14px', padding: '10px 15px' }}
              />
            </div>
            <div className="col-12">
              <label className="form-label small mb-1 fw-bold" style={{ color: '#666' }}>Mobile Number</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                value={personalDetails.phone}
                onChange={handlePersonalChange}
                disabled={!isEditingPersonal}
                style={{ backgroundColor: isEditingPersonal ? '#fff' : '#F9F9F9', borderColor: '#DDD', fontSize: '14px', padding: '10px 15px' }}
              />
            </div>
          </div>
        </div>

        {/* Address Details Section */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0" style={{ fontSize: '18px', color: '#333' }}>Address Details</h5>
            <button 
              className="btn btn-outline-danger px-4" 
              style={{ fontSize: '13px', fontWeight: '500', borderRadius: '2px', borderColor: '#A94442', color: '#A94442' }}
              onClick={handleAddNewAddress}
            >
              Add New Address
            </button>
          </div>

          {addresses.map((addr, index) => (
            <AddressCard 
              key={addr._id} 
              address={addr} 
              index={index} 
              onAction={handleAddressAction}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const AddressCard = ({ address, index, onAction }) => {
  const [isEditing, setIsEditing] = useState(address.isEditing || false);
  const [formData, setFormData] = useState({
    name: address.name || '',
    phone: address.phone || '',
    street: address.street || '',
    city: address.city || '',
    state: address.state || '',
    addressType: address.addressType || 'Home'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onAction(address._id, 'save', formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm border mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="fw-bold" style={{ fontSize: '15px' }}>{index + 1}. {formData.addressType.toUpperCase()}</span>
        <div className="d-flex gap-3">
          <button 
            className="btn btn-link p-0 text-decoration-none" 
            style={{ color: '#A94442', fontSize: '14px', fontWeight: '500' }}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          {!isEditing && address._id !== 'new' && (
            <button 
              className="btn btn-link p-0 text-decoration-none text-muted" 
              style={{ fontSize: '14px' }}
              onClick={() => onAction(address._id, 'delete')}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="row g-4">
        {isEditing ? (
          <>
            <div className="col-12">
              <label className="form-label small mb-1 fw-bold" style={{ color: '#666' }}>Full Name</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} style={{ fontSize: '14px' }} />
            </div>
            <div className="col-12">
              <label className="form-label small mb-1 fw-bold" style={{ color: '#666' }}>Mobile Number</label>
              <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleChange} style={{ fontSize: '14px' }} />
            </div>
            <div className="col-12">
              <label className="form-label small mb-1 fw-bold" style={{ color: '#666' }}>Address</label>
              <textarea name="street" className="form-control" rows="3" value={formData.street} onChange={handleChange} style={{ fontSize: '14px' }}></textarea>
            </div>
            <div className="col-md-6">
              <label className="form-label small mb-1 fw-bold" style={{ color: '#666' }}>City/Town</label>
              <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} style={{ fontSize: '14px' }} />
            </div>
            <div className="col-md-6">
              <label className="form-label small mb-1 fw-bold" style={{ color: '#666' }}>State</label>
              <input type="text" name="state" className="form-control" value={formData.state} onChange={handleChange} style={{ fontSize: '14px' }} />
            </div>
            <div className="col-12">
              <label className="form-label small mb-2 d-block fw-bold" style={{ color: '#666' }}>Type</label>
              <div className="d-flex gap-4">
                {['Home', 'Work', 'Other'].map(type => (
                  <label key={type} className="d-flex align-items-center gap-2 cursor-pointer" style={{ cursor: 'pointer', fontSize: '14px' }}>
                    <input 
                      type="radio" 
                      name="addressType" 
                      value={type} 
                      checked={formData.addressType === type} 
                      onChange={handleChange} 
                      className="form-check-input"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="col-12">
            <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
              <p className="mb-1 fw-bold text-dark">{address.name} <span className="ms-4 fw-normal text-muted">{address.phone}</span></p>
              <p className="mb-0">{address.street}, {address.city}, {address.state}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
