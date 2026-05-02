import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { trackOrder } from '../api';
import Navbar from '../components/Navbar';

const STEPS = ['placed','confirmed','processing','shipped','delivered'];

export default function OrderTrackPage() {
  const [searchParams] = useSearchParams();
  const [orderNum, setOrderNum] = useState(searchParams.get('order') || '');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get('order')) handleTrack();
  }, []);

  const handleTrack = async () => {
    if (!orderNum.trim()) return setError('Please enter an order number.');
    setLoading(true); setError(''); setOrder(null);
    try {
      const { data } = await trackOrder(orderNum.trim());
      setOrder(data);
    } catch {
      setError('Order not found. Please check your order number.');
    }
    setLoading(false);
  };

  const stepIndex = order ? STEPS.indexOf(order.orderStatus) : -1;

  return (
    <div style={{ fontFamily: 'Georgia, serif', background: '#F9F5EE', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '0 1.5rem' }}>
        <h1 style={{ fontWeight: 'normal', fontSize: '28px', color: '#1a1410', marginBottom: '0.5rem' }}>Track Your Order</h1>
        <p style={{ color: '#999', fontSize: '14px', marginBottom: '2rem' }}>Enter your order number (e.g. SSP-00001)</p>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '2rem' }}>
          <input value={orderNum} onChange={e => setOrderNum(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleTrack()}
            placeholder="SSP-00001"
            style={{ flex: 1, padding: '12px 16px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '15px', fontFamily: 'Georgia, serif' }} />
          <button onClick={handleTrack} disabled={loading}
            style={{ background: '#1a1410', color: '#C9A84C', border: 'none', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}>
            {loading ? '...' : 'Track'}
          </button>
        </div>

        {error && <div style={{ background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: '4px', padding: '12px', fontSize: '13px', color: '#c00', marginBottom: '1rem' }}>{error}</div>}

        {order && (
          <div style={{ background: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{ background: '#1a1410', padding: '1.25rem 1.5rem' }}>
              <div style={{ color: '#C9A84C', fontFamily: 'Georgia, serif', fontSize: '18px' }}>{order.orderNumber}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '4px' }}>Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}</div>
            </div>

            {/* Progress steps */}
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '1.5rem' }}>
                <div style={{ position: 'absolute', top: '14px', left: '0', right: '0', height: '2px', background: '#f0e8d8', zIndex: 0 }} />
                <div style={{ position: 'absolute', top: '14px', left: '0', height: '2px', background: '#C9A84C', zIndex: 0, width: `${Math.max(0, stepIndex / (STEPS.length - 1)) * 100}%`, transition: 'width 0.5s' }} />
                {STEPS.map((step, i) => (
                  <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, gap: '6px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: i <= stepIndex ? '#C9A84C' : '#f0e8d8', border: `2px solid ${i <= stepIndex ? '#C9A84C' : '#e0d8c8'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: i <= stepIndex ? '#1a1410' : '#ccc' }}>
                      {i < stepIndex ? '✓' : i === stepIndex ? '●' : '○'}
                    </div>
                    <span style={{ fontSize: '10px', color: i <= stepIndex ? '#1a1410' : '#ccc', textTransform: 'capitalize', textAlign: 'center' }}>{step}</span>
                  </div>
                ))}
              </div>

              {/* Order items */}
              <div style={{ borderTop: '1px solid #f0e8d8', paddingTop: '1rem' }}>
                <div style={{ fontSize: '13px', color: '#999', marginBottom: '8px' }}>Items ordered</div>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '4px 0', color: '#1a1410' }}>
                    <span>{item.name} (Size {item.size}) × {item.quantity}</span>
                    <span style={{ color: '#C9A84C' }}>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '15px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #f0e8d8' }}>
                  <span>Total</span>
                  <span style={{ color: '#C9A84C' }}>Rs. {order.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Tracking history */}
              {order.trackingUpdates?.length > 0 && (
                <div style={{ borderTop: '1px solid #f0e8d8', paddingTop: '1rem', marginTop: '1rem' }}>
                  <div style={{ fontSize: '13px', color: '#999', marginBottom: '8px' }}>Updates</div>
                  {[...order.trackingUpdates].reverse().map((u, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', padding: '6px 0', fontSize: '13px' }}>
                      <span style={{ color: '#C9A84C', flexShrink: 0 }}>●</span>
                      <div>
                        <div style={{ color: '#1a1410' }}>{u.message}</div>
                        <div style={{ color: '#ccc', fontSize: '11px' }}>{new Date(u.timestamp).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
