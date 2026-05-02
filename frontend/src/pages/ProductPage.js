import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct } from '../api';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImg, setSelectedImg] = useState(0);
  const [toast, setToast] = useState('');
  const { dispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(id).then(r => { setProduct(r.data); setSelectedSize(r.data.sizes.find(s => s.stock > 0)?.size || null); });
  }, [id]);

  const addToCart = () => {
    if (!selectedSize) return setToast('Please select a size');
    dispatch({ type: 'ADD', item: { productId: product._id, name: product.name, brand: product.brand, size: selectedSize, price: product.price, image: product.images[0] } });
    setToast('Added to cart!');
    setTimeout(() => setToast(''), 2000);
  };

  if (!product) return <div style={{ fontFamily: 'Georgia, serif', padding: '2rem' }}><Navbar /><div style={{ padding: '3rem', textAlign: 'center', color: '#999' }}>Loading...</div></div>;

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#F9F5EE', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '14px', marginBottom: '1.5rem', fontFamily: 'inherit' }}>← Back</button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', background: '#fff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e8e0d0' }}>
          {/* Images */}
          <div>
            <div style={{ height: '340px', background: '#f5f0e8', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {product.images?.[selectedImg]
                ? <img src={product.images[selectedImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: '100px' }}>👞</span>}
            </div>
            {product.images?.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', padding: '12px' }}>
                {product.images.map((img, i) => (
                  <div key={i} onClick={() => setSelectedImg(i)}
                    style={{ width: '56px', height: '56px', border: `2px solid ${i === selectedImg ? '#C9A84C' : '#ddd'}`, borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div style={{ padding: '2rem' }}>
            <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#999', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{product.brand}</div>
            <h1 style={{ fontSize: '24px', fontWeight: 'normal', color: '#1a1410', marginBottom: '0.5rem' }}>{product.name}</h1>
            <div style={{ fontSize: '22px', color: '#C9A84C', marginBottom: '1rem' }}>Rs. {product.price.toLocaleString()}</div>
            {product.description && <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.7', marginBottom: '1.25rem' }}>{product.description}</p>}

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#1a1410' }}>Select Size</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.sizes.map(s => (
                  <button key={s.size} onClick={() => s.stock > 0 && setSelectedSize(s.size)}
                    disabled={s.stock === 0}
                    style={{ width: '44px', height: '44px', border: `2px solid ${selectedSize === s.size ? '#C9A84C' : '#ddd'}`, borderRadius: '4px', background: s.stock === 0 ? '#f5f5f5' : selectedSize === s.size ? '#1a1410' : '#fff', color: selectedSize === s.size ? '#C9A84C' : s.stock === 0 ? '#ccc' : '#1a1410', cursor: s.stock > 0 ? 'pointer' : 'not-allowed', fontSize: '13px', fontFamily: 'inherit' }}>
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={addToCart}
              style={{ width: '100%', background: '#1a1410', color: '#C9A84C', border: 'none', padding: '14px', borderRadius: '4px', fontSize: '15px', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '12px' }}>
              Add to Cart
            </button>
            <div style={{ fontSize: '12px', color: '#999', textAlign: 'center' }}>🚚 Island-wide delivery · 🔒 Secure payment</div>
          </div>
        </div>
      </div>
      {toast && <div style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#1a1410', color: '#C9A84C', border: '1px solid #C9A84C', padding: '12px 20px', borderRadius: '4px', fontSize: '13px' }}>✓ {toast}</div>}
    </div>
  );
}
