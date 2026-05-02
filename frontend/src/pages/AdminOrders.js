import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders, updateOrderStatus } from '../api';

const STATUSES = ['placed','confirmed','processing','shipped','delivered','cancelled'];
const STATUS_COLOR = { placed:'#C9A84C', confirmed:'#4CAF50', processing:'#2196F3', shipped:'#9C27B0', delivered:'#4CAF50', cancelled:'#f44336' };

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchOrders = () => getOrders(filter ? { status: filter } : {}).then(r => setOrders(r.data.orders));
  useEffect(() => { fetchOrders(); }, [filter]);

  const changeStatus = async (id, orderStatus, message) => {
    setLoading(true);
    await updateOrderStatus(id, { orderStatus, message });
    fetchOrders();
    setSelected(prev => prev && prev._id === id ? { ...prev, orderStatus } : prev);
    setLoading(false);
  };

  return (
    <div style={{ fontFamily: 'Georgia, serif', display: 'flex', minHeight: '100vh', background: '#F9F5EE' }}>
      <div style={{ background: '#1a1410', width: '220px', flexShrink: 0, padding: '1.5rem 0' }}>
        <div style={{ padding: '0 1.5rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1rem' }}>
          <div style={{ color: '#C9A84C', fontSize: '16px' }}>Shamil Shoe Palace</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '1px' }}>Admin Panel</div>
        </div>
        {[{ label: '📊 Dashboard', to: '/admin' }, { label: '👟 Products', to: '/admin/products' }, { label: '📦 Orders', to: '/admin/orders' }].map(l => (
          <Link key={l.to} to={l.to} style={{ display: 'block', padding: '10px 1.5rem', color: l.to === '/admin/orders' ? '#C9A84C' : 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px', background: l.to === '/admin/orders' ? 'rgba(201,168,76,0.1)' : 'transparent' }}>{l.label}</Link>
        ))}
      </div>

      <div style={{ flex: 1, padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{ fontWeight: 'normal', fontSize: '24px', color: '#1a1410' }}>Orders</h1>
          <select value={filter} onChange={e => setFilter(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '13px', fontFamily: 'inherit', background: '#fff' }}>
            <option value="">All orders</option>
            {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f9f5ee' }}>
                {['Order #','Customer','Phone','Total','Payment','Status','Date','Action'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#999', fontWeight: 'normal', fontSize: '12px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id} style={{ borderTop: '1px solid #f0e8d8', cursor: 'pointer' }} onClick={() => setSelected(order)}>
                  <td style={{ padding: '10px 14px', color: '#C9A84C', fontFamily: 'monospace', fontSize: '12px' }}>{order.orderNumber}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 'bold' }}>{order.customer.name}</td>
                  <td style={{ padding: '10px 14px', color: '#666' }}>{order.customer.phone}</td>
                  <td style={{ padding: '10px 14px' }}>Rs. {order.totalAmount.toLocaleString()}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ background: order.paymentStatus === 'paid' ? '#e8f5e9' : '#fff8e8', color: order.paymentStatus === 'paid' ? '#388e3c' : '#8a6000', padding: '3px 8px', borderRadius: '12px', fontSize: '11px' }}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ background: `${STATUS_COLOR[order.orderStatus]}22`, color: STATUS_COLOR[order.orderStatus], padding: '3px 10px', borderRadius: '12px', fontSize: '11px' }}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#999' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '10px 14px' }} onClick={e => e.stopPropagation()}>
                    <select value={order.orderStatus}
                      onChange={e => changeStatus(order._id, e.target.value, `Order ${e.target.value}`)}
                      style={{ padding: '5px 8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px', fontFamily: 'inherit', cursor: 'pointer' }}>
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={8} style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order detail drawer */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', justifyContent: 'flex-end' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: '380px', background: '#fff', height: '100%', overflowY: 'auto', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '18px', color: '#1a1410' }}>{selected.orderNumber}</div>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#999' }}>✕</button>
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.8', marginBottom: '1rem', color: '#444' }}>
              <strong>Customer:</strong> {selected.customer.name}<br />
              <strong>Email:</strong> {selected.customer.email}<br />
              <strong>Phone:</strong> {selected.customer.phone}<br />
              <strong>Address:</strong> {selected.customer.address.street}, {selected.customer.address.city}, {selected.customer.address.province}
            </div>
            <div style={{ borderTop: '1px solid #f0e8d8', paddingTop: '1rem', marginBottom: '1rem' }}>
              {selected.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0' }}>
                  <span>{item.name} / Size {item.size} × {item.quantity}</span>
                  <span style={{ color: '#C9A84C' }}>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '15px', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #f0e8d8' }}>
                <span>Total</span>
                <span style={{ color: '#C9A84C' }}>Rs. {selected.totalAmount.toLocaleString()}</span>
              </div>
            </div>
            {selected.trackingUpdates?.length > 0 && (
              <div style={{ borderTop: '1px solid #f0e8d8', paddingTop: '1rem' }}>
                <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>Tracking history</div>
                {[...selected.trackingUpdates].reverse().map((u, i) => (
                  <div key={i} style={{ fontSize: '12px', padding: '4px 0', borderBottom: '1px solid #f9f5ee', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#C9A84C' }}>●</span>
                    <div><div>{u.message}</div><div style={{ color: '#ccc', fontSize: '11px' }}>{new Date(u.timestamp).toLocaleString()}</div></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
