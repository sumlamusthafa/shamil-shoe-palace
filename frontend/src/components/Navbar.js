import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav style={{ background: '#1a1410', display: 'flex', alignItems: 'center', justifyContent: 'space-end', padding: '0 2rem', height: '64px', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Shop</Link>
          <Link to="/track" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Track Order</Link>
          <button onClick={() => setCartOpen(true)}
            style={{ background: '#C9A84C', color: '#1a1410', border: 'none', padding: '8px 18px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🛒 Cart {count > 0 && <span style={{ background: 'rgba(26,20,16,0.2)', borderRadius: '10px', padding: '1px 7px', fontSize: '11px' }}>{count}</span>}
          </button>
        </div>
      </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
