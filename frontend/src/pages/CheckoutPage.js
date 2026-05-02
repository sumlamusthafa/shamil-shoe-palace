import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../api';
import Navbar from '../components/Navbar';

const PROVINCES = ['Western','Central','Southern','Northern','Eastern','North Western','North Central','Uva','Sabaragamuwa'];

export default function CheckoutPage() {
  const { cart, total, dispatch } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', phone:'', street:'', city:'', province:'Western', postalCode:'' });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.street || !form.city) return setError('Please fill all required fields.');
    setLoading(true); setError('');
    try {
      const { data } = await placeOrder({
        customer: { name: form.name, email: form.email, phone: form.phone, address: { street: form.street, city: form.city, province: form.province, postalCode: form.postalCode } },
        items: cart.map(i => ({ productId: i.productId, size: i.size, quantity: i.quantity })),
        paymentMethod
      });
      dispatch({ type: 'CLEAR' });
      navigate(`/track?order=${data.order.orderNumber}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  if (cart.length === 0) return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#F9F5EE', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '4rem', color: '#999' }}>
        <div style={{ fontSize: '48px', marginBottom: '1rem' }}>🛒</div>
        <p>Your cart is empty.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: '1rem', background: '#1a1410', color: '#C9A84C', border: 'none', padding: '10px 24px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit' }}>Browse products</button>
      </div>
    </div>
  );

  const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', fontFamily: 'Georgia, serif', boxSizing: 'border-box' };
  const labelStyle = { fontSize: '12px', color: '#666', marginBottom: '4px', display: 'block' };

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#F9F5EE', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>

        {/* Customer Details */}
        <div>
          <h2 style={{ fontWeight: 'normal', fontSize: '22px', marginBottom: '1.5rem', color: '#1a1410' }}>Delivery Details</h2>
          <div style={{ background: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', padding: '1.5rem', display: 'grid', gap: '1rem' }}>
            <div><label style={labelStyle}>Full Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" style={inputStyle} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div><label style={labelStyle}>Email *</label><input name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" style={inputStyle} /></div>
              <div><label style={labelStyle}>Phone *</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="07X XXX XXXX" style={inputStyle} /></div>
            </div>
            <div><label style={labelStyle}>Street Address *</label><input name="street" value={form.street} onChange={handleChange} placeholder="House no, street name" style={inputStyle} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div><label style={labelStyle}>City *</label><input name="city" value={form.city} onChange={handleChange} placeholder="City" style={inputStyle} /></div>
              <div>
                <label style={labelStyle}>Province *</label>
                <select name="province" value={form.province} onChange={handleChange} style={inputStyle}>
                  {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div><label style={labelStyle}>Postal Code</label><input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="Optional" style={inputStyle} /></div>
          </div>

          <h2 style={{ fontWeight: 'normal', fontSize: '22px', margin: '1.5rem 0 1rem', color: '#1a1410' }}>Payment</h2>
          <div style={{ background: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', padding: '1.5rem', display: 'flex', gap: '12px' }}>
            {[{ v:'cod', label:'💵 Cash on Delivery' }, { v:'card', label:'💳 Card (Coming soon)', disabled: true }].map(opt => (
              <label key={opt.v} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: opt.disabled ? 'not-allowed' : 'pointer', fontSize: '14px', color: opt.disabled ? '#ccc' : '#1a1410' }}>
                <input type="radio" value={opt.v} checked={paymentMethod === opt.v} onChange={() => !opt.disabled && setPaymentMethod(opt.v)} disabled={opt.disabled} />
                {opt.label}
              </label>
            ))}
          </div>

          {error && <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '4px', padding: '12px', marginTop: '1rem', fontSize: '13px', color: '#c00' }}>{error}</div>}

          <button onClick={handleSubmit} disabled={loading}
            style={{ width: '100%', background: '#C9A84C', color: '#1a1410', border: 'none', padding: '15px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '1.5rem', fontFamily: 'inherit', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Placing order...' : `Place Order · Rs. ${total.toLocaleString()}`}
          </button>
        </div>

        {/* Order Summary */}
        <div>
          <h2 style={{ fontWeight: 'normal', fontSize: '22px', marginBottom: '1.5rem', color: '#1a1410' }}>Order Summary</h2>
          <div style={{ background: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', overflow: 'hidden' }}>
            {cart.map(item => (
              <div key={`${item.productId}-${item.size}`} style={{ display: 'flex', gap: '12px', padding: '12px 16px', borderBottom: '1px solid #f0e8d8' }}>
                <div style={{ width: '48px', height: '48px', background: '#f5f0e8', borderRadius: '4px', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.image ? <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '24px' }}>👞</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: '#999' }}>Size {item.size} × {item.quantity}</div>
                </div>
                <div style={{ fontSize: '14px', color: '#C9A84C' }}>Rs. {(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
            <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px' }}>
              <span>Total</span>
              <span style={{ color: '#C9A84C', fontFamily: 'Georgia, serif' }}>Rs. {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
