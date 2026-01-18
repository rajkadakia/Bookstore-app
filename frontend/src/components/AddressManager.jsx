import React, { useState, useEffect } from 'react';
import api from '../api/client';
import AddressForm from './AddressForm';
import { Plus, Edit2, Trash2, CheckCircle2, Phone } from 'lucide-react';

const AddressManager = ({ onAddressSelect, selectedId, readOnly = false }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchAddresses = async () => {
    try {
      const response = await api.get('/addresses');
      setAddresses(response.data);
      
      if (onAddressSelect && response.data.length > 0 && !selectedId) {
        const defaultAddr = response.data.find(a => a.isDefault) || response.data[0];
        onAddressSelect(defaultAddr._id);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSave = async (addressData) => {
    setSubmitting(true);
    try {
      if (editingAddress) {
        await api.put(`/addresses/${editingAddress._id}`, addressData);
      } else {
        await api.post('/addresses', addressData);
      }
      setShowAddForm(false);
      setEditingAddress(null);
      fetchAddresses();
    } catch (error) {
      console.error('Error saving address:', error);
      alert(error.response?.data?.message || 'Failed to save address. Please check your input.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    try {
      await api.delete(`/addresses/${id}`);
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  if (loading) return <div className="text-center py-4"><div className="spinner-border spinner-border-sm text-coffee opacity-50"></div></div>;

  return (
    <div className="address-manager">
      {!showAddForm && !editingAddress ? (
        <>
          <div className="row g-3 mb-3">
            {addresses.map((address) => (
              <div key={address._id} className="col-12 col-md-6">
                <div 
                  className={`card h-100 transition-all border-1 rounded-3 pointer-event ${selectedId === address._id ? 'border-coffee bg-coffee-light' : 'border-secondary border-opacity-10 bg-white'}`}
                  style={{ 
                    cursor: readOnly ? 'default' : 'pointer',
                    backgroundColor: selectedId === address._id ? '#F9F5F0' : 'white',
                    borderColor: selectedId === address._id ? 'var(--text-coffee)' : 'rgba(0,0,0,0.1)'
                  }}
                  onClick={() => !readOnly && onAddressSelect && onAddressSelect(address._id)}
                >
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <span className="fw-bold text-coffee">{address.name}</span>
                        {address.isDefault && <span className="ms-2 px-2 py-0 x-small bg-coffee text-white rounded-pill">Default</span>}
                      </div>
                      {!readOnly && (
                        <div className="d-flex gap-2">
                          <button className="btn btn-link p-0 text-muted hover-text-coffee" onClick={(e) => { e.stopPropagation(); setEditingAddress(address); }}>
                            <Edit2 size={14} />
                          </button>
                          <button className="btn btn-link p-0 text-muted hover-text-coffee" onClick={(e) => handleDelete(e, address._id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="small text-muted mb-1 mb-0 lh-sm">{address.street}</p>
                    <p className="small text-muted mb-1 lh-sm">{address.city}, {address.state} - {address.pincode}</p>
                    <p className="small text-muted mb-0 lh-sm"><Phone size={12} className="me-1" /> {address.phone}</p>
                    
                    {selectedId === address._id && (
                      <div className="position-absolute top-0 end-0 m-2">
                        <CheckCircle2 size={16} className="text-coffee" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {!readOnly && (
              <div className="col-md-6">
                <button 
                  className="btn btn-outline-coffee w-100 h-100 py-4 d-flex flex-column align-items-center justify-content-center gap-2 rounded-3 text-coffee opacity-75 hover-opacity-100"
                  style={{ border: '1px solid var(--text-coffee)', minHeight: '120px', backgroundColor: 'transparent' }}
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus size={20} />
                  <span className="small fw-bold text-uppercase">Add New Address</span>
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <AddressForm 
          initialData={editingAddress} 
          onSave={handleSave} 
          onCancel={() => { setShowAddForm(false); setEditingAddress(null); }}
          loading={submitting}
        />
      )}
    </div>
  );
};

export default AddressManager;
