import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ open, onClose }) {
  const { cart, dispatch, total } = useCart();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '340px', background: '#fff', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#1a1410', color: '#C9A84C', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'Georgia, serif', fontSize: '18px' }}>
          Your Cart
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#C9A84C', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem' }}>
          {cart.length === 0
            ? <p style={{ color: '#999', textAlign: 'center', marginTop: '2rem', fontSize: '14px' }}>Your cart is empty</p>
            : cart.map(item => (
              <div key={`${item.productId}-${item.size}`} style={{ display: 'flex', gap: '12px', padding: '12px 0', borderBottom: '1px solid #f0e8d8' }}>
                <div style={{ width: '52px', height: '52px', background: '#f5f0e8', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                  {item.image ? <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>👞</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#1a1410' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>Size {item.size} · {item.brand}</div>
                  <div style={{ fontSize: '13px', color: '#C9A84C', marginTop: '2px' }}>Rs. {item.price.toLocaleString()}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                    <button onClick={() => item.quantity > 1 ? dispatch({ type: 'UPDATE_QTY', productId: item.productId, size: item.size, quantity: item.quantity - 1 }) : dispatch({ type: 'REMOVE', productId: item.productId, size: item.size })}
                      style={{ width: '24px', height: '24px', borderRadius: '3px', border: '1px solid #ddd', background: '#f5f0e8', cursor: 'pointer', fontSize: '14px' }}>−</button>
                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{item.quantity}</span>
                    <button onClick={() => dispatch({ type: 'UPDATE_QTY', productId: item.productId, size: item.size, quantity: item.quantity + 1 })}
                      style={{ width: '24px', height: '24px', borderRadius: '3px', border: '1px solid #ddd', background: '#f5f0e8', cursor: 'pointer', fontSize: '14px' }}>+</button>
                  </div>
                </div>
                <button onClick={() => dispatch({ type: 'REMOVE', productId: item.productId, size: item.size })}
                  style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '16px', alignSelf: 'flex-start' }}>✕</button>
              </div>
            ))
          }
        </div>

        <div style={{ padding: '1.25rem', borderTop: '1px solid #f0e8d8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '1rem', fontSize: '15px' }}>
            <span>Total</span>
            <span style={{ color: '#C9A84C', fontFamily: 'Georgia, serif' }}>Rs. {total.toLocaleString()}</span>
          </div>
          <button
            onClick={() => { onClose(); navigate('/checkout'); }}
            disabled={cart.length === 0}
            style={{ width: '100%', background: '#C9A84C', color: '#1a1410', border: 'none', padding: '13px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', cursor: cart.length ? 'pointer' : 'not-allowed', fontFamily: 'inherit', opacity: cart.length ? 1 : 0.5 }}>
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
}
