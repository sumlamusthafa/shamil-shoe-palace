import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await login(form);
      loginAdmin(data.token, data.user);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#1a1410', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: '8px', padding: '2.5rem', width: '360px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '22px', color: '#1a1410' }}>Shamil Shoe Palace</div>
          <div style={{ fontSize: '12px', color: '#999', letterSpacing: '2px', marginTop: '4px' }}>ADMIN PANEL</div>
        </div>
        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>Email</label>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            required placeholder="admin@email.com"
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', fontFamily: 'inherit', marginBottom: '1rem', boxSizing: 'border-box' }} />
          <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>Password</label>
          <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
            required placeholder="••••••••"
            style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', fontFamily: 'inherit', marginBottom: '1.5rem', boxSizing: 'border-box' }} />
          {error && <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '4px', padding: '10px', fontSize: '13px', color: '#c00', marginBottom: '1rem' }}>{error}</div>}
          <button type="submit" disabled={loading}
            style={{ width: '100%', background: '#1a1410', color: '#C9A84C', border: 'none', padding: '13px', borderRadius: '4px', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
