import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getStats } from '../api';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { getStats().then(r => setStats(r.data)); }, []);

  const STATUS_COLOR = { placed:'#C9A84C', confirmed:'#4CAF50', processing:'#2196F3', shipped:'#9C27B0', delivered:'#4CAF50', cancelled:'#f44336' };

  const sidebarStyle = { background: '#1a1410', minHeight: '100vh', width: '220px', flexShrink: 0, display: 'flex', flexDirection: 'column' };

  return (
    <div style={{ fontFamily: 'Georgia, serif', display: 'flex', minHeight: '100vh', background: '#F9F5EE' }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: '#C9A84C', fontSize: '16px' }}>Shamil Shoe Palace</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '1px', marginTop: '2px' }}>Admin Panel</div>
        </div>
        <nav style={{ padding: '1rem 0', flex: 1 }}>
          {[
            { label: '📊 Dashboard', to: '/admin' },
            { label: '👟 Products', to: '/admin/products' },
            { label: '📦 Orders', to: '/admin/orders' },
          ].map(link => (
            <Link key={link.to} to={link.to}
              style={{ display: 'block', padding: '10px 1.5rem', color: window.location.pathname === link.to ? '#C9A84C' : 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '14px', background: window.location.pathname === link.to ? 'rgba(201,168,76,0.1)' : 'transparent' }}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '8px' }}>{admin?.name}</div>
          <button onClick={() => { logout(); navigate('/admin/login'); }}
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontFamily: 'inherit' }}>
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '2rem' }}>
        <h1 style={{ fontWeight: 'normal', fontSize: '24px', color: '#1a1410', marginBottom: '1.5rem' }}>Dashboard</h1>

        {stats ? (
          <>
            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '2rem' }}>
              {[
                { label: 'Total Orders', value: stats.totalOrders, icon: '📦' },
                { label: 'Revenue', value: `Rs. ${stats.totalRevenue.toLocaleString()}`, icon: '💰' },
                { label: 'Products', value: stats.totalProducts, icon: '👟' },
                { label: 'Pending Orders', value: stats.pendingOrders, icon: '⏳' },
              ].map(card => (
                <div key={card.label} style={{ background: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{card.icon}</div>
                  <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a1410' }}>{card.value}</div>
                  <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>{card.label}</div>
                </div>
              ))}
            </div>

            {/* Recent orders */}
            <div style={{ background: '#fff', border: '1px solid #e8e0d0', borderRadius: '8px', overflow: 'hidden', marginBottom: '2rem' }}>
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f0e8d8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', color: '#1a1410' }}>Recent Orders</span>
                <Link to="/admin/orders" style={{ fontSize: '13px', color: '#C9A84C' }}>View all →</Link>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#f9f5ee' }}>
                    {['Order #', 'Customer', 'Total', 'Status', 'Date'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', color: '#999', fontWeight: 'normal', fontSize: '12px' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map(order => (
                    <tr key={order._id} style={{ borderTop: '1px solid #f0e8d8' }}>
                      <td style={{ padding: '10px 16px', color: '#C9A84C', fontFamily: 'monospace' }}>{order.orderNumber}</td>
                      <td style={{ padding: '10px 16px' }}>{order.customer.name}</td>
                      <td style={{ padding: '10px 16px' }}>Rs. {order.totalAmount.toLocaleString()}</td>
                      <td style={{ padding: '10px 16px' }}>
                        <span style={{ background: `${STATUS_COLOR[order.orderStatus]}22`, color: STATUS_COLOR[order.orderStatus], padding: '3px 10px', borderRadius: '12px', fontSize: '12px' }}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td style={{ padding: '10px 16px', color: '#999' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Low stock alert */}
            {stats.lowStock?.length > 0 && (
              <div style={{ background: '#fff8e8', border: '1px solid #f0d888', borderRadius: '8px', padding: '1.25rem' }}>
                <div style={{ fontWeight: 'bold', color: '#8a6000', marginBottom: '0.5rem' }}>⚠️ Low Stock Alert</div>
                {stats.lowStock.map(p => (
                  <div key={p._id} style={{ fontSize: '13px', color: '#8a6000', padding: '2px 0' }}>
                    {p.name} ({p.brand}) — {p.sizes.filter(s => s.stock <= 3).map(s => `Size ${s.size}: ${s.stock} left`).join(', ')}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : <div style={{ color: '#999' }}>Loading stats...</div>}
      </div>
    </div>
  );
}
