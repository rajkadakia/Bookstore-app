import React, { useState } from 'react';
import { MapPin, Phone, User as UserIcon } from 'lucide-react';

const AddressForm = ({ initialData, onSave, onCancel, loading }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-3 shadow-sm border border-secondary border-opacity-10">
      <div className="row g-3">
        <div className="col-md-6 text-start">
          <label className="form-label x-small fw-bold text-coffee text-uppercase opacity-75">Full Name</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-transparent border-0 ps-0"><UserIcon size={14} className="text-coffee opacity-50" /></span>
            <input 
              type="text" 
              name="name"
              className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent" 
              placeholder="Recipient name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
        </div>
        
        <div className="col-md-6 text-start">
          <label className="form-label x-small fw-bold text-coffee text-uppercase opacity-75">Phone Number</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-transparent border-0 ps-0"><Phone size={14} className="text-coffee opacity-50" /></span>
            <input 
              type="tel" 
              name="phone"
              className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent" 
              placeholder="10-digit number" 
              value={formData.phone}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className="col-12 text-start">
          <label className="form-label x-small fw-bold text-coffee text-uppercase opacity-75">Street Address</label>
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-transparent border-0 ps-0"><MapPin size={14} className="text-coffee opacity-50" /></span>
            <input 
              type="text" 
              name="street"
              className="form-control border-0 border-bottom rounded-0 px-0 shadow-none bg-transparent" 
              placeholder="House/Plot No., Locality" 
              value={formData.street}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className="col-md-4 text-start">
          <label className="form-label x-small fw-bold text-coffee text-uppercase opacity-75">City</label>
          <input 
            type="text" 
            name="city"
            className="form-control form-control-sm border-0 border-bottom rounded-0 px-1 shadow-none bg-transparent" 
            placeholder="City" 
            value={formData.city}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="col-md-4 text-start">
          <label className="form-label x-small fw-bold text-coffee text-uppercase opacity-75">State</label>
          <input 
            type="text" 
            name="state"
            className="form-control form-control-sm border-0 border-bottom rounded-0 px-1 shadow-none bg-transparent" 
            placeholder="State" 
            value={formData.state}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="col-md-4 text-start">
          <label className="form-label x-small fw-bold text-coffee text-uppercase opacity-75">Pincode</label>
          <input 
            type="text" 
            name="pincode"
            className="form-control form-control-sm border-0 border-bottom rounded-0 px-1 shadow-none bg-transparent" 
            placeholder="6-digit PIN" 
            value={formData.pincode}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="col-12 mt-4 d-flex align-items-center gap-3">
          <div className="form-check small p-0 m-0">
            <input 
              className="form-check-input ms-0 me-2" 
              type="checkbox" 
              name="isDefault" 
              id="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
            />
            <label className="form-check-label text-coffee opacity-75" htmlFor="isDefault">
              Set as default address
            </label>
          </div>
        </div>

        <div className="col-12 mt-4 d-flex gap-2 justify-content-end">
          <button type="button" className="btn btn-sm btn-outline-secondary px-4 rounded-pill" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-sm btn-coffee px-4 rounded-pill" disabled={loading}>
            {loading ? 'Saving...' : (initialData ? 'Update Address' : 'Save Address')}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddressForm;
