import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

const CATEGORIES = ['all','school','office','athletic','casual','ladies','slippers','sandals','bata'];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [size, setSize] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const { dispatch, count } = useCart();
  const [toast, setToast] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category !== 'all') params.category = category;
      if (size) params.size = size;
      if (maxPrice) params.maxPrice = maxPrice;
      const { data } = await getProducts(params);
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, [category]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const quickAdd = (product) => {
    const firstSize = product.sizes.find(s => s.stock > 0);
    if (!firstSize) return showToast('Out of stock');
    dispatch({ type: 'ADD', item: { productId: product._id, name: product.name, brand: product.brand, size: firstSize.size, price: product.price, image: product.images[0] } });
    showToast(`${product.name} added to cart!`);
  };

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#F9F5EE', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: '#1a1410', padding: '3rem 2rem', textAlign: 'center' }}>
        <p style={{ color: '#C9A84C', letterSpacing: '3px', fontSize: '12px', marginBottom: '0.75rem' }}>ODDAMAVADI · EST. 2003 · ISLAND-WIDE DELIVERY</p>
        <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '0.75rem', fontWeight: 'normal' }}>
          Shamil <span style={{ color: '#C9A84C' }}>Shoe Palace</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
          22 years of quality footwear — now available online across Sri Lanka
        </p>
        <Link to="/track" style={{ background: 'transparent', border: '1px solid #C9A84C', color: '#C9A84C', padding: '10px 24px', borderRadius: '4px', textDecoration: 'none', fontSize: '13px' }}>
          Track your order →
        </Link>
      </div>

      {/* Search & Filters */}
      <div style={{ background: '#fff', padding: '1rem 2rem', display: 'flex', gap: '12px', flexWrap: 'wrap', borderBottom: '1px solid #e8e0d0' }}>
        <input
          placeholder="Search shoes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && fetchProducts()}
          style={{ flex: 1, minWidth: '200px', padding: '10px 14px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', fontFamily: 'inherit' }}
        />
        <select value={size} onChange={e => { setSize(e.target.value); fetchProducts(); }}
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', fontFamily: 'inherit' }}>
          <option value="">All sizes</option>
          {[36,37,38,39,40,41,42,43,44,45].map(s => <option key={s} value={s}>Size {s}</option>)}
        </select>
        <select value={maxPrice} onChange={e => { setMaxPrice(e.target.value); fetchProducts(); }}
          style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', fontFamily: 'inherit' }}>
          <option value="">All prices</option>
          <option value="2000">Under Rs. 2,000</option>
          <option value="5000">Under Rs. 5,000</option>
          <option value="10000">Under Rs. 10,000</option>
        </select>
        <button onClick={fetchProducts}
          style={{ background: '#1a1410', color: '#C9A84C', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>
          Search
        </button>
      </div>

      {/* Category Pills */}
      <div style={{ padding: '1rem 2rem 0.5rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            style={{ padding: '6px 16px', borderRadius: '20px', border: '1px solid #ddd', background: category === cat ? '#1a1410' : '#fff', color: category === cat ? '#C9A84C' : '#666', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit', textTransform: 'capitalize' }}>
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div style={{ padding: '1rem 2rem 3rem' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'normal', color: '#1a1410', marginBottom: '1rem' }}>
          {loading ? 'Loading...' : `${products.length} products`}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
          {products.map(p => (
            <div key={p._id} style={{ background: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', overflow: 'hidden' }}>
              <Link to={`/product/${p._id}`} style={{ textDecoration: 'none' }}>
                <div style={{ height: '180px', background: '#f5f0e8', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  {p.images?.[0]
                    ? <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ fontSize: '64px' }}>👞</span>}
                </div>
                <div style={{ padding: '12px' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '1.5px', color: '#999', textTransform: 'uppercase' }}>{p.brand}</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a1410', margin: '4px 0' }}>{p.name}</div>
                  <div style={{ fontSize: '15px', color: '#C9A84C' }}>Rs. {p.price.toLocaleString()}</div>
                </div>
              </Link>
              <div style={{ padding: '0 12px 12px' }}>
                <button onClick={() => quickAdd(p)}
                  style={{ width: '100%', background: '#1a1410', color: '#C9A84C', border: 'none', padding: '9px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit' }}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
        {!loading && products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>No products found.</div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#1a1410', color: '#C9A84C', border: '1px solid #C9A84C', padding: '12px 20px', borderRadius: '4px', fontSize: '13px', zIndex: 999 }}>
          ✓ {toast}
        </div>
      )}
    </div>
  );
}
