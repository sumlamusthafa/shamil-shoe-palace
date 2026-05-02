import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav style={{ background: '#1a1410', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 2rem', height: '64px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Shop</Link>
          <Link to="/track" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Track Order</Link>
        </div>
      </nav>

      {/* Floating Cart Button - Bottom Right */}
      <button onClick={() => setCartOpen(true)}
        style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#C9A84C', color: '#1a1410', border: 'none', padding: '12px 20px', borderRadius: '50px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 999, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
        🛒 Cart {count > 0 && <span style={{ background: 'rgba(26,20,16,0.3)', borderRadius: '10px', padding: '1px 7px', fontSize: '11px' }}>{count}</span>}
      </button>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}