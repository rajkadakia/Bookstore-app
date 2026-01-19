import React, { useState, useEffect } from 'react';
import api from '../api/client';
import AddressForm from './AddressForm';
import { CheckCircle2 } from 'lucide-react';

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
                  className={`card h-100 transition-all border-1 rounded-2 pointer-event ${selectedId === address._id ? 'border-maroon' : 'border-secondary border-opacity-10 bg-white'}`}
                  style={{ 
                    cursor: readOnly ? 'default' : 'pointer',
                    backgroundColor: selectedId === address._id ? '#FFF9F9' : 'white',
                    borderColor: selectedId === address._id ? '#A94442' : '#EEE'
                  }}
                  onClick={() => !readOnly && onAddressSelect && onAddressSelect(address._id)}
                >
                  <div className="card-body p-3">
                    <div className="mb-2">
                      <span className="fw-bold" style={{ fontSize: '15px', color: '#333' }}>{address.name}</span>
                      {address.isDefault && <span className="ms-2 px-2 py-0 border rounded-pill" style={{ fontSize: '10px', color: '#A94442', borderColor: '#A94442' }}>Default</span>}
                    </div>
                    <p className="small mb-1 lh-sm" style={{ fontSize: '13px' }}>{address.street}</p>
                    <p className="small mb-1 lh-sm" style={{ fontSize: '13px' }}>{address.city}, {address.state} - {address.pincode}</p>
                    <p className="small mb-0 lh-sm" style={{ fontSize: '13px' }}>{address.phone}</p>
                    
                    {selectedId === address._id && (
                      <div className="position-absolute top-0 end-0 m-2">
                        <CheckCircle2 size={16} className="text-coffee" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Removed Add New Address block as requested */}
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
