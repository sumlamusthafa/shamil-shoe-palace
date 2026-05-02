import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api';

const CATEGORIES = ['school','office','athletic','casual','ladies','slippers','sandals','bata','mens-slippers'];
const EMPTY_FORM = { name:'', brand:'', category:'school', price:'', description:'', color:'', featured: false, sizes: [{size:36,stock:0},{size:37,stock:0},{size:38,stock:0},{size:39,stock:0},{size:40,stock:0},{size:41,stock:0},{size:42,stock:0},{size:43,stock:0},{size:44,stock:0},{size:45,stock:0}] };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = () => getProducts({ isActive: 'true' }).then(r => setProducts(r.data));
  useEffect(() => { fetchProducts(); }, []);

  const openAdd = () => { setForm(EMPTY_FORM); setImages([]); setEditId(null); setShowForm(true); setError(''); };
  const openEdit = (p) => {
    setForm({ name: p.name, brand: p.brand, category: p.category, price: p.price, description: p.description, color: p.color, featured: p.featured, sizes: p.sizes });
    setEditId(p._id); setImages([]); setShowForm(true); setError('');
  };

  const handleSizeStock = (size, stock) => {
    setForm(f => ({ ...f, sizes: f.sizes.map(s => s.size === size ? { ...s, stock: Number(stock) } : s) }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.brand || !form.price) return setError('Name, brand and price are required.');
    setLoading(true); setError('');
    try {
      const fd = new FormData();
      fd.append('data', JSON.stringify({ ...form, price: Number(form.price) }));
      images.forEach(img => fd.append('images', img));
      if (editId) await updateProduct(editId, fd);
      else await createProduct(fd);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving product');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this product?')) return;
    await deleteProduct(id);
    fetchProducts();
  };

  const inputStyle = { width: '100%', padding: '8px 10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', fontFamily: 'Georgia, serif', boxSizing: 'border-box' };

  return (
    <div style={{ fontFamily: 'Georgia, serif', display: 'flex', minHeight: '100vh', background: '#F9F5EE' }}>
      {/* Sidebar */}
      <div style={{ background: '#1a1410', width: '220px', flexShrink: 0, padding: '1.5rem 0' }}>
        <div style={{ padding: '0 1.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1rem' }}>
          <div style={{ color: '#C9A84C', fontSize: '16px' }}>Shamil Shoe Palace</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '1px' }}>Admin Panel</div>
        </div>
        {[{ label: '📊 Dashboard', to: '/admin' }, { label: '👟 Products', to: '/admin/products' }, { label: '📦 Orders', to: '/admin/orders' }].map(l => (
          <Link key={l.to} to={l.to} style={{ display: 'block', padding: '10px 1.5rem', color: l.to === '/admin/products' ? '#C9A84C' : 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px', background: l.to === '/admin/products' ? 'rgba(201,168,76,0.1)' : 'transparent' }}>{l.label}</Link>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontWeight: 'normal', fontSize: '24px', color: '#1a1410' }}>Products</h1>
          <button onClick={openAdd} style={{ background: '#1a1410', color: '#C9A84C', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}>+ Add Product</button>
        </div>

        {/* Product table */}
        <div style={{ background: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f9f5ee' }}>
                {['Image','Name','Brand','Category','Price','Stock','Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: '#999', fontWeight: 'normal', fontSize: '12px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} style={{ borderTop: '1px solid #f0e8d8' }}>
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{ width: '44px', height: '44px', background: '#f5f0e8', borderRadius: '4px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {p.images?.[0] ? <img src={p.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '22px' }}>👞</span>}
                    </div>
                  </td>
                  <td style={{ padding: '10px 16px', fontWeight: 'bold' }}>{p.name}</td>
                  <td style={{ padding: '10px 16px', color: '#666' }}>{p.brand}</td>
                  <td style={{ padding: '10px 16px' }}><span style={{ background: '#f5f0e8', padding: '3px 10px', borderRadius: '12px', fontSize: '11px', textTransform: 'capitalize' }}>{p.category}</span></td>
                  <td style={{ padding: '10px 16px', color: '#C9A84C' }}>Rs. {p.price.toLocaleString()}</td>
                  <td style={{ padding: '10px 16px' }}>{p.sizes.reduce((s, sz) => s + sz.stock, 0)} pairs</td>
                  <td style={{ padding: '10px 16px', display: 'flex', gap: '8px' }}>
                    <button onClick={() => openEdit(p)} style={{ background: 'none', border: '1px solid #ddd', borderRadius: '4px', padding: '5px 12px', cursor: 'pointer', fontSize: '12px', fontFamily: 'inherit' }}>Edit</button>
                    <button onClick={() => handleDelete(p._id)} style={{ background: 'none', border: '1px solid #ffcccc', color: '#c00', borderRadius: '4px', padding: '5px 12px', cursor: 'pointer', fontSize: '12px', fontFamily: 'inherit' }}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit modal */}
      {showForm && (
        <div onClick={() => setShowForm(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '8px', padding: '2rem', width: '560px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontWeight: 'normal', marginBottom: '1.5rem', color: '#1a1410' }}>{editId ? 'Edit Product' : 'Add Product'}</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div><label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>Name *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} /></div>
                <div><label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>Brand *</label><input value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} style={inputStyle} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>Category *</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={inputStyle}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div><label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>Price (Rs.) *</label><input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} style={inputStyle} /></div>
              </div>
              <div><label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} style={{...inputStyle, resize: 'vertical'}} /></div>
              <div>
                <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '8px' }}>Stock by Size</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                  {form.sizes.map(s => (
                    <div key={s.size} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', color: '#999', marginBottom: '2px' }}>Size {s.size}</div>
                      <input type="number" min="0" value={s.stock} onChange={e => handleSizeStock(s.size, e.target.value)}
                        style={{ width: '100%', padding: '6px', border: '1px solid #ddd', borderRadius: '4px', textAlign: 'center', fontSize: '13px', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '4px' }}>Product Images</label>
                <input type="file" multiple accept="image/*" onChange={e => setImages(Array.from(e.target.files))} style={{ fontSize: '13px' }} />
                <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>Upload up to 5 images (JPG, PNG, WEBP — max 5MB each)</div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer' }}>
                <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} />
                Feature this product on homepage
              </label>
            </div>
            {error && <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '4px', padding: '10px', fontSize: '13px', color: '#c00', marginTop: '1rem' }}>{error}</div>}
            <div style={{ display: 'flex', gap: '12px', marginTop: '1.5rem' }}>
              <button onClick={handleSubmit} disabled={loading}
                style={{ flex: 1, background: '#1a1410', color: '#C9A84C', border: 'none', padding: '12px', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '14px', fontFamily: 'inherit', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Saving...' : editId ? 'Save Changes' : 'Add Product'}
              </button>
              <button onClick={() => setShowForm(false)} style={{ padding: '12px 20px', border: '1px solid #ddd', borderRadius: '4px', background: 'none', cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
